import pool from "../../config/db.js";
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

// Configure Cloudinary (replace with your actual credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "your_cloud_name",
  api_key: process.env.CLOUDINARY_API_KEY || "your_api_key",
  api_secret: process.env.CLOUDINARY_API_SECRET || "your_api_secret"
});
// import { uploadAlbumImage, uploadArtistImage, uploadTrackAudio } from '../cloudinaryAsyncUploadController.js';
// Delete a record by id


export async function deleteRecord(req, res) {
  const { table, id } = req.params;
  try {
    // Map of table to file field
    const fileFieldMap = {
      albums: 'cover_url',
      artist_images: 'image_url',
      promotional_tracks: 'promo_audio_url',
      promotional_videos: 'promo_video_url',
      tracks: 'audio_url',
      videos: 'video_url',
    };
    const fileField = fileFieldMap[table];
    let publicId;
    if (fileField) {
      // Get the file URL from the DB
      const [rows] = await pool.query(`SELECT \`${fileField}\` FROM \`${table}\` WHERE id = ?`, [id]);
      if (rows.length && rows[0][fileField]) {
        const fileUrl = rows[0][fileField];
        // Extract public_id from the URL (assuming format .../folder/public_id.ext)
        // This logic may need to be adjusted if your URLs are structured differently
        const urlParts = fileUrl.split('/');
        const fileNameWithExt = urlParts[urlParts.length - 1];
        const [publicIdBase] = fileNameWithExt.split('.');
        // Remove extension, keep folder path for public_id
        publicId = urlParts.slice(urlParts.length - 2).join('/').replace(/\.[^/.]+$/, '');
        // Try to delete from Cloudinary
        try {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'auto' });
        } catch (cloudErr) {
          console.error('Cloudinary delete error:', cloudErr);
        }
      }
    }
    const sql = `DELETE FROM \`${table}\` WHERE id = ?`;
    const [result] = await pool.query(sql, [id]);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Insert a new record
export async function insertRecord(req, res) {
  const { table } = req.params;
  const mode = req.headers['x-mode'] || req.headers['xmode'] || req.body.mode;

    const columns = Object.keys(req.body).map(key => `\`${key}\``);
    const values = Object.values(req.body);
    const placeholders = columns.map(() => '?');

    // Create an object from columns and values (columns as keys, values as values)
    // Remove backticks from column names for object keys
    const columnKeys = columns.map(col => col.replace(/`/g, ""));
    const columnValueObj = {};
    columnKeys.forEach((key, idx) => {
      columnValueObj[key] = values[idx];
    });
        
    // You can now use columnValueObj as needed

    const fieldValues = { ...req.body.fields };

  console.log(`Insert mode: ${mode}`);
  // const { fields, rows, formData } = req.body;
  console.log('Form Data on line 28:', { body: req.body, file: req.file, files: req.files });

  // Retrieve xmode from header (case-insensitive)
 

  // Unified logic for live and demo modes
  if (req.files && Array.isArray(req.files) && (mode === "live" || mode === "demo") && columns.length > 0) {
    // Prepare an object to hold field values for SQL insert
    
  
    for (const file of req.files) {
      let folderPath = "";
      let fieldKey = file.fieldname;
    // Set folderPath based on mode and fieldname
    if (mode === "live") {
      console.log(`mode is ${mode} and files are present`);
        switch (true) {
          case fieldKey.includes("cover_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicImages/AlbumCovers";
            break;
          case fieldKey.includes("image_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicImages/ArtistImages";
            break;
          case fieldKey.includes("audio_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicAudio/Tracks";
            break;
          case fieldKey.includes("promo_audio_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicAudio/PromoTracks";
            break;
          case fieldKey.includes("video_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicVideos/Videos";
            break;
          case fieldKey.includes("promo_video_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicVideos/PromoVideos";
            break;
          default:
            folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
        }
        
      } else {
        switch (true) {
          case fieldKey.includes("cover_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos";
            break;
          case fieldKey.includes("image_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo";
            break;
          case fieldKey.includes("audio_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack";
            break;
          case fieldKey.includes("promo_audio_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoPromoTrack";
            break;
          case fieldKey.includes("video_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoVideos";
            break;
          case fieldKey.includes("promo_video_url"):
            folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoPromoVideos";
            break;
          default:
            folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
        }
      }
      // Upload to Cloudinary
      let result;
      if (file.path) {
        result = await cloudinary.uploader.upload(file.path, {
          folder: folderPath,
          // public_id: `upload_${file.originalname}`,
        });
        // public_id: `upload_${file.originalname}`
      } else if (file.buffer) {
        result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: folderPath, /*public_id: `upload_${file.originalname}` */ },
            (error, result) => error ? reject(error) : resolve(result)
          );
          stream.end(file.buffer);
        });
      } else {
        throw new Error("File object missing path and buffer");
      }
      // Use Cloudinary URL and public_id for the matching field
      columnValueObj[fieldKey] = result.secure_url;
      // Also store public_id in a separate field if desired (e.g., `${fieldKey}_public_id`)
      columnValueObj[`${fieldKey}_public_identifier`] = result.public_id;
      console.log("hello from line 109");
      console.log(`columnValueObj${Object.values(columnValueObj)}`);

      const c = Object.keys(columnValueObj);
      const val = Object.values(columnValueObj);
      console.log(`col: ${c}`);
      console.log(`val: ${val}`);
      // Build SQL insert statement
      const col = c.map(f => `\`${f}\``).join(", ");
      const placeholders = c.map(() => "?").join(", ");
      const values = val;
      const insertSql = `INSERT INTO \`${table}\` (${col}) VALUES (${placeholders})`;
      await pool.query(insertSql, values);
      res.json({ success: true, inserted: columnValueObj });
      
     
    }
  } 
  else {
    // Build columns and values from fieldValues
    //   const columns = Object.keys(req.body).map(key => `\`${key}\``);
    //   const values = Object.values(req.body);
    // const placeholders = columns.map(() => '?');

    // if (columns.length > 0) {
    // //   console.log("Prepared to insert record with fields:", fieldValues);
    //   console.log("Columns:", columns);
    //   console.log("Values:", values);
    //   console.log("Placeholders:", placeholders);
    //   // Fix: log req.body as JSON string if it's an object
     
    //   // Uncomment below to actually perform the insert
    //   const insertSql = `INSERT INTO \`${table}\` (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
    //   await pool.query(insertSql, values);
    //   res.json({ success: true, inserted: fieldValues });
    // } else {
    //   console.log("No valid fields to insert.");
    //   res.status(400).json({ success: false, message: "No valid fields to insert." });
    // }
    // console.log("No files uploaded or multer not configured.");
  }
  // upload to database

   if (columns.length > 0) {
      const insertSql = `INSERT INTO \`${table}\` (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
      await pool.query(insertSql, values);
      res.json({ success: true, inserted: columnValueObj });
    } else {
      console.log("No valid fields to insert.");
      res.status(400).json({ success: false, message: "No valid fields to insert." });
    }
    return;

} // <-- Add this closing brace to properly end insertRecord function

// Admin controller: retrieve tables, fields, records, and update records

export async function getTables(req, res) {
  try {
    const [tables] = await pool.query("SHOW TABLES");
    res.json(tables);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getFields(req, res) {
  const { table } = req.params;
  try {
    const [fields] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
    res.json(fields);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
export async function getRecords(req, res) {
  const { table } = req.params;
  try {
    const [records] = await pool.query(`SELECT * FROM \`${table}\``);
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export async function updateRecord(req, res) {
  const { table, id } = req.params;
  const mode = req.headers['x-mode'] || req.headers['xmode'] || req.body.mode;
  try {
    let updates = {};
    if (req.is('multipart/form-data')) {
      updates = { ...req.body };
      delete updates.id;
    } else {
      updates = { ...req.body };
      delete updates.id;
    }
    // Handle file upload if file(s) present
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // Map of table to file field
      const fileFieldMap = {
        albums: 'cover_url',
        artist_images: 'image_url',
        promotional_tracks: 'promo_audio_url',
        promotional_videos: 'promo_video_url',
        tracks: 'audio_url',
        videos: 'video_url',
      };
      for (const file of req.files) {
        let folderPath = "";
        let fieldKey = file.fieldname;
        // Set folderPath based on mode and fieldname
        if (mode === "live") {
          switch (true) {
            case fieldKey.includes("cover_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/AlbumCovers";
              break;
            case fieldKey.includes("image_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/ArtistImages";
              break;
            case fieldKey.includes("audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/Tracks";
              break;
            case fieldKey.includes("promo_audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/PromoTracks";
              break;
            case fieldKey.includes("video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/Videos";
              break;
            case fieldKey.includes("promo_video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/PromoVideos";
              break;
            default:
              folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
          }
        } else {
          switch (true) {
            case fieldKey.includes("cover_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/AlbumCoversDemos";
              break;
            case fieldKey.includes("image_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicImages/DemoImages/ArtistImagesDemo";
              break;
            case fieldKey.includes("audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoTrack";
              break;
            case fieldKey.includes("promo_audio_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicAudio/DemoTracksWebdev/DemoPromoTrack";
              break;
            case fieldKey.includes("video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoVideos";
              break;
            case fieldKey.includes("promo_video_url"):
              folderPath = "SoulFeltMusic/SoulFeltMusicVideos/DemoVideosWebDev/DemoPromoVideos";
              break;
            default:
              folderPath = "SoulFeltMusic/SoulFeltMusicMisc";
          }
        }
        // If this field is a managed Cloudinary field, delete the old file first
        // Get the old public_id from the DB if the column exists
        const publicIdField = `${fieldKey}_public_identifier`;
        let oldPublicId = null;
        try {
          const [rows] = await pool.query(`SELECT \`${publicIdField}\` FROM \`${table}\` WHERE id = ?`, [id]);
          if (rows.length && rows[0][publicIdField]) {
            oldPublicId = rows[0][publicIdField];
          }
        } catch (e) {
          // Column may not exist, fallback to extracting from URL
        }
        if (!oldPublicId) {
          // Fallback: extract from file URL if public_id column doesn't exist
          const [rows] = await pool.query(`SELECT \`${fieldKey}\` FROM \`${table}\` WHERE id = ?`, [id]);
          if (rows.length && rows[0][fieldKey]) {
            const fileUrl = rows[0][fieldKey];
            const urlParts = fileUrl.split('/');
            const fileNameWithExt = urlParts[urlParts.length - 1];
            const [publicIdBase] = fileNameWithExt.split('.');
            oldPublicId = urlParts.slice(urlParts.length - 2).join('/').replace(/\.[^/.]+$/, '');
          }
        }
        if (oldPublicId) {
          // Determine resource_type based on field
          let resourceType = 'image';
          if (fieldKey.includes('audio_url') || fieldKey.includes('promo_audio_url')) {
            resourceType = 'raw';
          } else if (fieldKey.includes('video_url') || fieldKey.includes('promo_video_url')) {
            resourceType = 'video';
          }
          console.log(`Deleting old file with public_id: ${oldPublicId} and resource_type: ${resourceType}`);
          try {
            await cloudinary.uploader.destroy(oldPublicId, { resource_type: resourceType });
          } catch (cloudErr) {
            console.error('Cloudinary update delete error:', cloudErr);
          }
        }
        // Upload to Cloudinary
        let result;
        if (file.path) {
          result = await cloudinary.uploader.upload(file.path, {
            folder: folderPath,
            /*public_id: `upload_${file.originalname}`, */
          });
        } else if (file.buffer) {
          result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: folderPath, /*public_id: `upload_${file.originalname}` */ },
              (error, result) => error ? reject(error) : resolve(result)
            );
            stream.end(file.buffer);
          });
        } else {
          throw new Error("File object missing path and buffer");
        }
        // Use Cloudinary URL for the matching field
        //Reassign to updates for SQL update
        updates[fieldKey] = await result.secure_url;
        updates[`${fieldKey}_public_identifier`] = await result.public_id;
      }
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: "No fields to update." });
    }
     console.log("Updates to apply:", updates);
    // Use idField for the id param, and filter updates for SQL
    const idField = id; // Always use the id from params
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(
        ([field]) => field !== 'id' && !field.endsWith('_id')
      )
    );
    const filteredFields = Object.keys(filteredUpdates);
    const setClause = filteredFields
      .map((field) => `\`${field}\` = ?`)
      .join(", ");
    const values = filteredFields.map((field) => filteredUpdates[field]);
    values.push(idField); // id for WHERE clause
    const sql = `UPDATE \`${table}\` SET ${setClause} WHERE id = ?`;
    const [result] = await pool.query(sql, values);
    res.json({ success: true, affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



export async function getTablesWithFieldsAndRecords(req, res) {
  try {
    // Get all table names
    const [tables] = await pool.query("SHOW TABLES");
    const tableNames = tables.map((obj) => Object.values(obj)[0]);
    const result = {};
    for (const table of tableNames) {
      // Get fields
      const [fields] = await pool.query(`SHOW COLUMNS FROM \`${table}\``);
      // Get records
      const [records] = await pool.query(`SELECT * FROM \`${table}\``);
      result[table] = {
        fields: fields.map((f) => f.Field),
        records: records,
      };
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
