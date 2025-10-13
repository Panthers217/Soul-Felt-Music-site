

-- ALTER TABLE videos DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE promotional_videos DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE artist_images DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE promotional_tracks DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE tracks DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE albums DROP COLUMN Cloudinary_public_id TEXT;

-- SHOW COLUMNS FROM albums;
-- SHOW COLUMNS FROM artist_images;
-- SHOW COLUMNS FROM promotional_tracks;
-- SHOW COLUMNS FROM promotional_videos;
-- SHOW COLUMNS FROM tracks;
-- SHOW COLUMNS FROM videos;

-- ALTER TABLE albums DROP COLUMN cover_url_public_id;
-- ALTER TABLE artist_images DROP COLUMN image_url_public_id;
-- ALTER TABLE promotional_tracks DROP COLUMN promo_audio_url_public_id;
-- ALTER TABLE promotional_videos DROP COLUMN promo_video_url_public_id;
-- ALTER TABLE tracks DROP COLUMN audio_url_public_id;
-- ALTER TABLE videos DROP COLUMN video_url_public_id;

-- ALTER TABLE albums ADD COLUMN cover_url_public_identifier VARCHAR(255);
-- ALTER TABLE artist_images ADD COLUMN image_url_public_identifier VARCHAR(255);
-- ALTER TABLE promotional_tracks ADD COLUMN promo_audio_url_public_identifier VARCHAR(255);
-- ALTER TABLE promotional_videos ADD COLUMN promo_video_url_public_identifier VARCHAR(255);
-- ALTER TABLE tracks ADD COLUMN audio_url_public_identifier VARCHAR(255);
-- ALTER TABLE videos ADD COLUMN video_url_public_identifier VARCHAR(255);

CREATE TABLE website_mode (
  id INT AUTO_INCREMENT PRIMARY KEY,
  demo BOOLEAN NOT NULL
);