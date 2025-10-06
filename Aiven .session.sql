-- -- Soul Felt Music PostgreSQL Schema
-- -- Run these commands in psql or a migration tool

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(50) UNIQUE NOT NULL,
--   email VARCHAR(100) UNIQUE NOT NULL,
--   password_hash VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE artists (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   bio TEXT,
--   image_url VARCHAR(255)
-- );

-- CREATE TABLE albums (
--   id SERIAL PRIMARY KEY,
--   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
--   title VARCHAR(100) NOT NULL,
--   release_date DATE,
--   cover_url VARCHAR(255)
-- );

-- CREATE TABLE tracks (
--   id SERIAL PRIMARY KEY,
--   album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
--   title VARCHAR(100) NOT NULL,
--   duration INTEGER, -- seconds
--   audio_url VARCHAR(255)
-- );

-- CREATE TABLE purchases (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE,
--   purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Add more tables for news, videos, community, etc. as needed


-- Table for audio URLs with references to artist and album



-- ALTER TABLE tracks ADD COLUMN promo_track VARCHAR(255);
-- ALTER TABLE users ADD COLUMN demos BOOLEAN;
-- ALTER TABLE artists ADD COLUMN demos BOOLEAN;

-- ALTER TABLE artists DROP COLUMN "featured_track"; --- IGNORE ---
-- ALTER TABLE tracks ADD COLUMN promo_track BOOLEAN;
-- ALTER TABLE tracks DROP COLUMN promo_track;

-- CREATE TABLE promotional_tracks (
--   id SERIAL PRIMARY KEY,
--   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
--   album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
--   audio_url VARCHAR(255),
--   promote_track BOOLEAN,
--   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- ALTER TABLE promotional_tracks ADD COLUMN title TEXT;
-- ALTER TABLE promotional_tracks ADD COLUMN duration TEXT;
-- ALTER TABLE promotional_tracks ADD COLUMN demos TEXT;
-- ALTER TABLE promotional_tracks ADD COLUMN top_track BOOLEAN;
-- ALTER TABLE promotional_tracks ADD COLUMN featured_track BOOLEAN;
-- ALTER TABLE promotional_tracks ADD COLUMN promo_audio_url VARCHAR(255);

-- CREATE TABLE promotional_videos (
--   id SERIAL PRIMARY KEY,
--   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
--   album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
--   promo_video_url VARCHAR(255),
--   activate_video BOOLEAN,
--   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- ALTER TABLE albums ADD COLUMN activate BOOLEAN;
-- ALTER TABLE artist_images ADD COLUMN activate BOOLEAN;
-- ALTER TABLE artists ADD COLUMN activate BOOLEAN;
-- ALTER TABLE promotional_tracks ADD COLUMN activate BOOLEAN;
-- ALTER TABLE purchases ADD COLUMN activate BOOLEAN;
-- ALTER TABLE tracks ADD COLUMN activate BOOLEAN;
-- ALTER TABLE videos ADD COLUMN activate BOOLEAN;
-- ALTER TABLE promotional_videos ADD COLUMN demos BOOLEAN;
-- ALTER TABLE videos ADD COLUMN demos BOOLEAN;
-- ALTER TABLE artist_images ADD COLUMN demos BOOLEAN;
-- ALTER TABLE users ADD COLUMN activate BOOLEAN;


-- ALTER TABLE promotional_tracks DROP COLUMN duration;
-- ALTER TABLE artist_images DROP COLUMN uploaded_at;
-- ALTER TABLE promotional_videos DROP COLUMN uploaded_at
-- ALTER TABLE promotional_tracks DROP COLUMN uploaded_at

-- ALTER TABLE tracks ADD COLUMN release_date Date;
-- ALTER TABLE videos ADD COLUMN release_date Date;
-- ALTER TABLE promotional_tracks ADD COLUMN duration INTEGER;
-- ALTER TABLE promotional_videos ADD COLUMN duration INTEGER;
-- ALTER TABLE promotional_tracks ADD COLUMN release_date Date;
-- ALTER TABLE promotional_videos ADD COLUMN release_date Date;

-- ALTER TABLE promotional_videos ADD COLUMN title TEXT;
-- ALTER TABLE videos ADD COLUMN title TEXT;



-- ALTER TABLE albums ADD COLUMN cover_url_public_id VARCHAR(255);
-- ALTER TABLE artist_images ADD COLUMN image_url_public_id VARCHAR(255);
-- ALTER TABLE promotional_tracks ADD COLUMN promo_audio_url_public_id VARCHAR(255);
-- ALTER TABLE promotional_videos ADD COLUMN promo_video_url_public_id VARCHAR(255);
-- ALTER TABLE tracks ADD COLUMN audio_url_public_id VARCHAR(255);
-- ALTER TABLE videos ADD COLUMN video_url_public_id VARCHAR(255);


-- ALTER TABLE videos DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE promotional_videos DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE artist_images DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE promotional_tracks DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE tracks DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE albums DROP COLUMN Cloudinary_public_id;-- -- Soul Felt Music PostgreSQL Schema
-- -- Run these commands in psql or a migration tool

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(50) UNIQUE NOT NULL,
--   email VARCHAR(100) UNIQUE NOT NULL,
--   password_hash VARCHAR(255) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE artists (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   bio TEXT,
--   image_url VARCHAR(255)
-- );

-- CREATE TABLE albums (
--   id SERIAL PRIMARY KEY,
--   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
--   title VARCHAR(100) NOT NULL,
--   release_date DATE,
--   cover_url VARCHAR(255)
-- );

-- CREATE TABLE tracks (
--   id SERIAL PRIMARY KEY,
--   album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
--   title VARCHAR(100) NOT NULL,
--   duration INTEGER, -- seconds
--   audio_url VARCHAR(255)
-- );

-- CREATE TABLE purchases (
--   id SERIAL PRIMARY KEY,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   track_id INTEGER REFERENCES tracks(id) ON DELETE CASCADE,
--   purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Add more tables for news, videos, community, etc. as needed


-- Table for audio URLs with references to artist and album



-- ALTER TABLE tracks ADD COLUMN promo_track VARCHAR(255);
-- ALTER TABLE users ADD COLUMN demos BOOLEAN;
-- ALTER TABLE artists ADD COLUMN demos BOOLEAN;

-- ALTER TABLE artists DROP COLUMN "featured_track"; --- IGNORE ---
-- ALTER TABLE tracks ADD COLUMN promo_track BOOLEAN;
-- ALTER TABLE tracks DROP COLUMN promo_track;

-- CREATE TABLE promotional_tracks (
--   id SERIAL PRIMARY KEY,
--   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
--   album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
--   audio_url VARCHAR(255),
--   promote_track BOOLEAN,
--   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- ALTER TABLE promotional_tracks ADD COLUMN title TEXT;
-- ALTER TABLE promotional_tracks ADD COLUMN duration TEXT;
-- ALTER TABLE promotional_tracks ADD COLUMN demos TEXT;
-- ALTER TABLE promotional_tracks ADD COLUMN top_track BOOLEAN;
-- ALTER TABLE promotional_tracks ADD COLUMN featured_track BOOLEAN;
-- ALTER TABLE promotional_tracks ADD COLUMN promo_audio_url VARCHAR(255);

-- CREATE TABLE promotional_videos (
--   id SERIAL PRIMARY KEY,
--   artist_id INTEGER REFERENCES artists(id) ON DELETE CASCADE,
--   album_id INTEGER REFERENCES albums(id) ON DELETE CASCADE,
--   promo_video_url VARCHAR(255),
--   activate_video BOOLEAN,
--   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- ALTER TABLE albums ADD COLUMN activate BOOLEAN;
-- ALTER TABLE artist_images ADD COLUMN activate BOOLEAN;
-- ALTER TABLE artists ADD COLUMN activate BOOLEAN;
-- ALTER TABLE promotional_tracks ADD COLUMN activate BOOLEAN;
-- ALTER TABLE purchases ADD COLUMN activate BOOLEAN;
-- ALTER TABLE tracks ADD COLUMN activate BOOLEAN;
-- ALTER TABLE videos ADD COLUMN activate BOOLEAN;
-- ALTER TABLE promotional_videos ADD COLUMN demos BOOLEAN;
-- ALTER TABLE videos ADD COLUMN demos BOOLEAN;
-- ALTER TABLE artist_images ADD COLUMN demos BOOLEAN;
-- ALTER TABLE users ADD COLUMN activate BOOLEAN;


-- ALTER TABLE promotional_tracks DROP COLUMN duration;
-- ALTER TABLE artist_images DROP COLUMN uploaded_at;
-- ALTER TABLE promotional_videos DROP COLUMN uploaded_at
-- ALTER TABLE promotional_tracks DROP COLUMN uploaded_at

-- ALTER TABLE tracks ADD COLUMN release_date Date;
-- ALTER TABLE videos ADD COLUMN release_date Date;
-- ALTER TABLE promotional_tracks ADD COLUMN duration INTEGER;
-- ALTER TABLE promotional_videos ADD COLUMN duration INTEGER;
-- ALTER TABLE promotional_tracks ADD COLUMN release_date Date;
-- ALTER TABLE promotional_videos ADD COLUMN release_date Date;

-- ALTER TABLE promotional_videos ADD COLUMN title TEXT;
-- ALTER TABLE videos ADD COLUMN title TEXT;

-- ALTER TABLE videos DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE promotional_videos DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE artist_images DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE promotional_tracks DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE tracks DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE albums DROP COLUMN Cloudinary_public_id;

-- ALTER TABLE videos DROP COLUMN Cloudinary_public_id;
-- ALTER TABLE promotional_videos DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE artist_images DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE promotional_tracks DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE tracks DROP COLUMN Cloudinary_public_id TEXT;
-- ALTER TABLE albums DROP COLUMN Cloudinary_public_id TEXT;