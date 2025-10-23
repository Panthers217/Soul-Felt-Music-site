-- Add columns to artists table for external API monthly listeners
ALTER TABLE artists
ADD COLUMN IF NOT EXISTS spotify_monthly_listeners INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS apple_music_monthly_listeners INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS youtube_monthly_listeners INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS soundcloud_monthly_listeners INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS website_monthly_listeners INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_monthly_listeners INT DEFAULT 0,
ADD COLUMN IF NOT EXISTS stats_last_updated TIMESTAMP NULL;

-- Create index for stats queries
CREATE INDEX IF NOT EXISTS idx_stats_updated ON artists(stats_last_updated);
