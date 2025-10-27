-- Add image_public_identifier column to community_events table
-- This column stores the Cloudinary public_id for easier image management

ALTER TABLE community_events ADD COLUMN IF NOT EXISTS image_public_identifier VARCHAR(255);

-- Verify the column was added
DESCRIBE community_events;
