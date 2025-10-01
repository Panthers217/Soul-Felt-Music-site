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

  // const { fields, rows, formData } = req.body;
  console.log('Form Data on line 28:', { body: req.body, file: req.file, files: req.files });

  // Retrieve xmode from header (case-insensitive)
  const fieldValues = { ...req.body.fields };

  // Unified logic for live and demo modes
  if (req.files && Array.isArray(req.files) && (mode === "live" || mode === "demo")) {
    // Prepare an object to hold field values for SQL insert
  
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
      // Upload to Cloudinary
      let result;
      if (file.path) {
        result = await cloudinary.uploader.upload(file.path, {
          folder: folderPath,
          public_id: `upload_${file.originalname}`,
        });
      } else if (file.buffer) {
        result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: folderPath, public_id: `upload_${file.originalname}` },
            (error, result) => error ? reject(error) : resolve(result)
          );
          stream.end(file.buffer);
        });
      } else {
        throw new Error("File object missing path and buffer");
      }
      // Use Cloudinary URL for the matching field
      fieldValues[fieldKey] = result.secure_url;
      // Alter table to add field if not exists
      // const alterSql = `ALTER TABLE \`${table}\` ADD COLUMN IF NOT EXISTS \`${fieldKey}\` VARCHAR(255)`;
      // await pool.query(alterSql);
    }
    // Build SQL insert statement
    // const columns = Object.keys(fieldValues).map(f => `\`${f}\``).join(", ");
    // const placeholders = Object.keys(fieldValues).map(() => "?").join(", ");
    // const values = Object.values(fieldValues);
    // const insertSql = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;
    // await pool.query(insertSql, values);
    // res.json({ success: true, inserted: fieldValues });
  } else {
    // Build columns and values from fieldValues
    const columns = Object.keys(fieldValues).map(key => `\`${key}\``);
    const values = Object.values(fieldValues);
    const placeholders = columns.map(() => '?');
    if (columns.length > 0) {
    //   console.log("Prepared to insert record with fields:", fieldValues);
      console.log("Columns:", columns);
      console.log("Values:", values);
      console.log("Placeholders:", placeholders);
      // Fix: log req.body as JSON string if it's an object
     
      // Uncomment below to actually perform the insert
      // const insertSql = `INSERT INTO \`${table}\` (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
      // await pool.query(insertSql, values);
      // res.json({ success: true, inserted: fieldValues });
    } else {
      console.log("No valid fields to insert.");
      res.status(400).json({ success: false, message: "No valid fields to insert." });
    }
    console.log("No files uploaded or multer not configured.");
  }
// upload to database
    
    const columns = Object.keys(req.body).map(key => `\`${key}\``);
    const values = Object.values(req.body);
    const placeholders = columns.map(() => '?');
    //   console.log("Prepared to insert record with fields:", fieldValues);
      console.log(`Columns: ${columns}`);
      console.log(`Values: ${values}`);
      console.log(`Placeholders: ${placeholders}`);
      // Uncomment below to actually perform the insert
      // const insertSql = `INSERT INTO \`${table}\` (${columns.join(", ")}) VALUES (${placeholders.join(", ")})`;
      // await pool.query(insertSql, values);
      // res.json({ success: true, inserted: fieldValues });
    
      console.log("No valid fields to insert.");
      // res.status(400).json({ success: false, message: "No valid fields to insert." });


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
  const updates = req.body; // { field1: value1, field2: value2, ... }
  try {
    const setClause = Object.keys(updates)
      .map((field) => `\`${field}\` = ?`)
      .join(", ");
    const values = Object.values(updates);
    values.push(id); // id for WHERE clause
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
