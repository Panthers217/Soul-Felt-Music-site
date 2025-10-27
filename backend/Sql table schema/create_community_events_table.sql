-- Create community_events table for managing community news and events
CREATE TABLE IF NOT EXISTS community_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  image_public_identifier VARCHAR(255),
  link VARCHAR(500),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_event_date (event_date),
  INDEX idx_is_active (is_active)
);

-- Insert sample community events
INSERT INTO community_events (title, event_date, description, image_url, link) VALUES
('Soul Felt Music at Summer Fest 2025', '2025-08-28', 'Join us for live performances and exclusive artist meetups at Summer Fest! Soul Felt Music will be hosting a special showcase featuring our top artists.', 'https://via.placeholder.com/120x120?text=Summer+Fest', '#'),
('Community Fundraiser: Music for All', '2025-09-10', 'We are proud to support local music education. Attend our fundraiser and help us bring music to every child in our community.', 'https://via.placeholder.com/120x120?text=Fundraiser', '#'),
('Soul Felt Music Podcast Launch', '2025-09-20', 'Tune in to our new podcast series featuring interviews, behind-the-scenes stories, and more from the Soul Felt Music family.', 'https://via.placeholder.com/120x120?text=Podcast', '#');

-- Verify the table was created and data inserted
SELECT * FROM community_events;
