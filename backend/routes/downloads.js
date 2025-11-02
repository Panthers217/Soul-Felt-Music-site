import { Router } from 'express';
import db from '../config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import archiver from 'archiver';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// Configure Cloudinary (using existing env vars)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * POST /api/downloads/generate-url
 * Generate a temporary signed download URL for a purchased item
 * Verifies that the user has purchased the item before generating the URL
 */
router.post('/generate-url', async (req, res) => {
  try {
    const { itemType, itemId, userEmail } = req.body;

    if (!itemType || !itemId || !userEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: itemType, itemId, userEmail' 
      });
    }

    // Step 1: Verify user exists and get their user_id
    const [users] = await db.query(
      'SELECT id FROM user WHERE email = ?',
      [userEmail]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = users[0].id;

    // Step 2: Verify the user has purchased this item
    const [purchaseCheck] = await db.query(
      `SELECT oi.id, oi.item_title 
       FROM order_items oi
       JOIN purchases p ON oi.purchase_id = p.id
       WHERE p.user_id = ? 
       AND oi.item_type = ? 
       AND oi.item_id = ?
       AND p.payment_status = 'succeeded'
       LIMIT 1`,
      [userId, itemType, itemId]
    );

    if (purchaseCheck.length === 0) {
      return res.status(403).json({ 
        error: 'Access denied. You have not purchased this item.' 
      });
    }

    // Step 3: Get the audio URL(s) from the database
    let downloadUrls = [];
    let itemTitle = purchaseCheck[0].item_title;

    if (itemType === 'Track') {
      // Get single track audio URL
      const [tracks] = await db.query(
        'SELECT id, title, audio_url FROM tracks WHERE id = ?',
        [itemId]
      );

      if (tracks.length === 0 || !tracks[0].audio_url) {
        return res.status(404).json({ error: 'Track audio file not found' });
      }

      downloadUrls.push({
        url: tracks[0].audio_url,
        title: tracks[0].title,
        type: 'track'
      });

    } else if (itemType === 'Digital Album') {
      // Get all tracks for the album
      const [tracks] = await db.query(
        'SELECT id, title, audio_url FROM tracks WHERE album_id = ? AND audio_url IS NOT NULL ORDER BY id',
        [itemId]
      );

      if (tracks.length === 0) {
        return res.status(404).json({ error: 'No tracks found for this album' });
      }

      downloadUrls = tracks.map(track => ({
        url: track.audio_url,
        title: track.title,
        type: 'track',
        trackId: track.id
      }));
    } else {
      return res.status(400).json({ 
        error: 'Invalid item type. Only Track and Digital Album can be downloaded.' 
      });
    }

    // Step 4: Generate signed URLs for each file
    const signedUrls = downloadUrls.map(item => {
      try {
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/{cloud_name}/video/upload/{version}/{public_id}.mp3
        const urlParts = item.url.split('/upload/');
        if (urlParts.length < 2) {
          console.error('Invalid Cloudinary URL format:', item.url);
          return null;
        }

        const pathAfterUpload = urlParts[1];
        // Remove version number (e.g., v1760301374/)
        const publicIdWithExtension = pathAfterUpload.replace(/^v\d+\//, '');
        
        // Generate signed URL that expires in 1 hour
        const signedUrl = cloudinary.url(publicIdWithExtension, {
          resource_type: 'video',
          type: 'upload',
          sign_url: true,
          secure: true,
          expires_at: Math.floor(Date.now() / 1000) + 3600 // Expires in 1 hour
        });

        return {
          title: item.title,
          downloadUrl: signedUrl,
          trackId: item.trackId
        };
      } catch (error) {
        console.error('Error generating signed URL for:', item.title, error);
        return null;
      }
    }).filter(item => item !== null); // Remove any failed URLs

    if (signedUrls.length === 0) {
      return res.status(500).json({ error: 'Failed to generate download URLs' });
    }

    // Step 5: Log the download for analytics (optional)
    try {
      await db.query(
        `INSERT INTO download_logs (user_id, item_type, item_id, download_at) 
         VALUES (?, ?, ?, NOW())`,
        [userId, itemType, itemId]
      ).catch(() => {
        // Ignore if download_logs table doesn't exist yet
        console.log('Download logging skipped (table may not exist)');
      });
    } catch (logError) {
      // Don't fail the request if logging fails
      console.log('Download logging failed:', logError.message);
    }

    res.json({
      itemTitle: itemTitle,
      itemType: itemType,
      downloads: signedUrls,
      expiresIn: 3600, // seconds
      message: signedUrls.length === 1 
        ? 'Download URL generated successfully' 
        : `${signedUrls.length} track download URLs generated successfully`
    });

  } catch (error) {
    console.error('Error generating download URL:', error);
    res.status(500).json({ 
      error: 'Failed to generate download URL',
      details: error.message 
    });
  }
});

/**
 * POST /api/downloads/generate-album-zip
 * Generate a ZIP file containing all tracks from a purchased album
 * Creates temporary ZIP, uploads to Cloudinary, returns signed URL
 */
router.post('/generate-album-zip', async (req, res) => {
  try {
    const { albumId, userEmail } = req.body;

    if (!albumId || !userEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields: albumId, userEmail' 
      });
    }

    // Step 1: Verify user exists and get their user_id
    const [users] = await db.query(
      'SELECT id FROM user WHERE email = ?',
      [userEmail]
    );

    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = users[0].id;

    // Step 2: Verify the user has purchased this album
    const [purchaseCheck] = await db.query(
      `SELECT oi.id, oi.item_title 
       FROM order_items oi
       JOIN purchases p ON oi.purchase_id = p.id
       WHERE p.user_id = ? 
       AND oi.item_type = 'Digital Album' 
       AND oi.item_id = ?
       AND p.payment_status = 'succeeded'
       LIMIT 1`,
      [userId, albumId]
    );

    if (purchaseCheck.length === 0) {
      return res.status(403).json({ 
        error: 'Access denied. You have not purchased this album.' 
      });
    }

    const albumTitle = purchaseCheck[0].item_title;

    // Step 3: Get all tracks for the album
    const [tracks] = await db.query(
      'SELECT id, title, audio_url FROM tracks WHERE album_id = ? AND audio_url IS NOT NULL ORDER BY id',
      [albumId]
    );

    if (tracks.length === 0) {
      return res.status(404).json({ error: 'No tracks found for this album' });
    }

    console.log(`📦 Creating ZIP for album "${albumTitle}" with ${tracks.length} tracks`);

    // Step 4: Create temporary directory for ZIP
    const tempDir = path.join(__dirname, '..', 'temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const zipFileName = `${albumTitle.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.zip`;
    const zipFilePath = path.join(tempDir, zipFileName);

    // Step 5: Create ZIP file
    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    // Handle archive events
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      throw err;
    });

    archive.pipe(output);

    // Step 6: Download each track and add to ZIP
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      console.log(`⬇️  Downloading track ${i + 1}/${tracks.length}: ${track.title}`);

      try {
        // Download track from Cloudinary
        const response = await axios({
          method: 'get',
          url: track.audio_url,
          responseType: 'stream'
        });

        // Add to ZIP with sanitized filename
        const fileName = `${String(i + 1).padStart(2, '0')}_${track.title.replace(/[^a-z0-9]/gi, '_')}.mp3`;
        archive.append(response.data, { name: fileName });

      } catch (downloadError) {
        console.error(`Failed to download track ${track.title}:`, downloadError.message);
        // Continue with other tracks even if one fails
      }
    }

    // Finalize the archive
    await archive.finalize();

    // Wait for the output stream to finish
    await new Promise((resolve, reject) => {
      output.on('close', resolve);
      output.on('error', reject);
    });

    console.log(`✅ ZIP created: ${zipFilePath} (${archive.pointer()} bytes)`);

    // Step 7: Upload ZIP to Cloudinary
    console.log('☁️  Uploading ZIP to Cloudinary...');
    
    const cloudinaryResult = await cloudinary.uploader.upload(zipFilePath, {
      resource_type: 'raw',
      folder: 'SoulFeltMusic/AlbumZips',
      public_id: `album_${albumId}_${Date.now()}`,
      type: 'authenticated', // Requires signed URL to download
    });

    console.log('✅ ZIP uploaded to Cloudinary:', cloudinaryResult.secure_url);

    // Step 8: Generate signed URL that expires in 2 hours
    const signedUrl = cloudinary.url(cloudinaryResult.public_id, {
      resource_type: 'raw',
      type: 'authenticated',
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 7200 // 2 hours
    });

    // Step 9: Clean up local ZIP file
    fs.unlink(zipFilePath, (err) => {
      if (err) console.error('Error deleting temp ZIP:', err);
      else console.log('🗑️  Temp ZIP deleted');
    });

    // Step 10: Schedule Cloudinary ZIP deletion after 3 hours
    setTimeout(async () => {
      try {
        await cloudinary.uploader.destroy(cloudinaryResult.public_id, { resource_type: 'raw' });
        console.log('🗑️  Cloudinary ZIP deleted:', cloudinaryResult.public_id);
      } catch (err) {
        console.error('Error deleting Cloudinary ZIP:', err);
      }
    }, 3 * 60 * 60 * 1000); // 3 hours

    res.json({
      albumTitle: albumTitle,
      trackCount: tracks.length,
      downloadUrl: signedUrl,
      expiresIn: 7200, // seconds (2 hours)
      fileSize: archive.pointer(),
      message: `ZIP file created with ${tracks.length} tracks`
    });

  } catch (error) {
    console.error('Error generating album ZIP:', error);
    res.status(500).json({ 
      error: 'Failed to generate album ZIP',
      details: error.message 
    });
  }
});

export default router;
