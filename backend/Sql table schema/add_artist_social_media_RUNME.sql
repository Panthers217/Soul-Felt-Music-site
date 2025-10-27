-- Step 1: Add social media URL columns to artists table
ALTER TABLE artists ADD COLUMN spotify_url VARCHAR(255);
ALTER TABLE artists ADD COLUMN instagram_url VARCHAR(255);
ALTER TABLE artists ADD COLUMN twitter_url VARCHAR(255);
ALTER TABLE artists ADD COLUMN youtube_url VARCHAR(255);
ALTER TABLE artists ADD COLUMN apple_music_url VARCHAR(255);
ALTER TABLE artists ADD COLUMN tiktok_url VARCHAR(255);
ALTER TABLE artists ADD COLUMN facebook_url VARCHAR(255);

-- Step 2: Insert demo social media data for all existing artists
UPDATE artists SET 
  spotify_url = CONCAT('https://open.spotify.com/artist/', LOWER(REPLACE(name, ' ', ''))),
  instagram_url = CONCAT('https://instagram.com/', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
  twitter_url = CONCAT('https://x.com/', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
  youtube_url = CONCAT('https://youtube.com/@', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
  apple_music_url = CONCAT('https://music.apple.com/artist/', LOWER(REPLACE(name, ' ', '-'))),
  tiktok_url = CONCAT('https://tiktok.com/@', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
  facebook_url = CONCAT('https://facebook.com/', LOWER(REPLACE(name, ' ', '')))
WHERE id IS NOT NULL;

-- Step 3: Create index for performance (optional but recommended)
CREATE INDEX idx_artists_social ON artists(spotify_url(100), instagram_url(100), twitter_url(100));

-- Step 4: Verify the changes
SELECT id, name, spotify_url, instagram_url, twitter_url, youtube_url, apple_music_url, tiktok_url, facebook_url
FROM artists
LIMIT 10;
