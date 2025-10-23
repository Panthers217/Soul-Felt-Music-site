-- Add columns to artists table for external platform IDs
ALTER TABLE artists
ADD COLUMN IF NOT EXISTS spotify_artist_id VARCHAR(100) NULL,
ADD COLUMN IF NOT EXISTS apple_music_artist_id VARCHAR(100) NULL,
ADD COLUMN IF NOT EXISTS youtube_channel_id VARCHAR(100) NULL,
ADD COLUMN IF NOT EXISTS soundcloud_username VARCHAR(100) NULL;

-- Create indexes for external platform lookups
CREATE INDEX IF NOT EXISTS idx_spotify_id ON artists(spotify_artist_id);
CREATE INDEX IF NOT EXISTS idx_youtube_id ON artists(youtube_channel_id);
