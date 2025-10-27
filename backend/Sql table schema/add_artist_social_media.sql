-- Add social media URL columns to artists table
-- Note: Run each ALTER statement separately if some columns already exist
-- ALTER TABLE artists ADD COLUMN apple_music_url VARCHAR(255);
-- ALTER TABLE artists ADD COLUMN tiktok_url VARCHAR(255);
-- ADD COLUMN spotify_url VARCHAR(255);
-- ADD COLUMN instagram_url VARCHAR(255);
-- ADD COLUMN twitter_url VARCHAR(255);
-- ADD COLUMN youtube_url VARCHAR(255);
-- ADD COLUMN facebook_url VARCHAR(255);

-- Insert demo social media data for existing artists
-- UPDATE artists SET 
--   spotify_url = CONCAT('https://open.spotify.com/artist/', LOWER(REPLACE(name, ' ', ''))),
--   instagram_url = CONCAT('https://instagram.com/', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
--   twitter_url = CONCAT('https://x.com/', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
--   youtube_url = CONCAT('https://youtube.com/@', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
--   apple_music_url = CONCAT('https://music.apple.com/artist/', LOWER(REPLACE(name, ' ', '-'))),
--   tiktok_url = CONCAT('https://tiktok.com/@', LOWER(REPLACE(REPLACE(name, ' ', ''), '.', ''))),
--   facebook_url = CONCAT('https://facebook.com/', LOWER(REPLACE(name, ' ', '')))
-- WHERE id IS NOT NULL;

-- Update specific popular artists with real social media links (examples)
-- UPDATE artists SET 
--   spotify_url = 'https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we',
--   instagram_url = 'https://instagram.com/whitneyhouston',
--   twitter_url = 'https://x.com/whitneyhouston',
--   youtube_url = 'https://youtube.com/@whitneyhouston',
--   apple_music_url = 'https://music.apple.com/us/artist/whitney-houston/472054',
--   tiktok_url = 'https://tiktok.com/@whitneyhouston',
--   facebook_url = 'https://facebook.com/whitneyhouston'
-- WHERE name LIKE '%Whitney Houston%';

-- UPDATE artists SET 
--   spotify_url = 'https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm',
--   instagram_url = 'https://instagram.com/michaeljackson',
--   twitter_url = 'https://x.com/michaeljackson',
--   youtube_url = 'https://youtube.com/@michaeljackson',
--   apple_music_url = 'https://music.apple.com/us/artist/michael-jackson/32940',
--   tiktok_url = 'https://tiktok.com/@michaeljackson',
--   facebook_url = 'https://facebook.com/michaeljackson'
-- WHERE name LIKE '%Michael Jackson%';

-- UPDATE artists SET 
--   spotify_url = 'https://open.spotify.com/artist/2wY79sveU1sp5g7SokKOiI',
--   instagram_url = 'https://instagram.com/samsmith',
--   twitter_url = 'https://x.com/samsmith',
--   youtube_url = 'https://youtube.com/@samsmith',
--   apple_music_url = 'https://music.apple.com/us/artist/sam-smith/156488786',
--   tiktok_url = 'https://tiktok.com/@samsmith',
--   facebook_url = 'https://facebook.com/samsmith'
-- WHERE name LIKE '%Sam Smith%';

-- UPDATE artists SET 
--   spotify_url = 'https://open.spotify.com/artist/7bXgB6jMjp9ATFy66eO08Z',
--   instagram_url = 'https://instagram.com/chrisbrown',
--   twitter_url = 'https://x.com/chrisbrown',
--   youtube_url = 'https://youtube.com/@chrisbrown',
--   apple_music_url = 'https://music.apple.com/us/artist/chris-brown/95705522',
--   tiktok_url = 'https://tiktok.com/@chrisbrown',
--   facebook_url = 'https://facebook.com/chrisbrown'
-- WHERE name LIKE '%Chris Brown%';

-- UPDATE artists SET 
--   spotify_url = 'https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ',
--   instagram_url = 'https://instagram.com/theweeknd',
--   twitter_url = 'https://x.com/theweeknd',
--   youtube_url = 'https://youtube.com/@theweeknd',
--   apple_music_url = 'https://music.apple.com/us/artist/the-weeknd/479756766',
--   tiktok_url = 'https://tiktok.com/@theweeknd',
--   facebook_url = 'https://facebook.com/theweeknd'
-- WHERE name LIKE '%Weeknd%';

-- Create index for social media queries (limit columns to avoid key length issues)
CREATE INDEX idx_artists_social ON artists(spotify_url(100), instagram_url(100), twitter_url(100));

-- Verify changes
SELECT id, name, spotify_url, instagram_url, twitter_url, youtube_url, apple_music_url, tiktok_url, facebook_url
FROM artists
LIMIT 10;
