// Settings Controller - Handles website configuration
import pool from '../../config/db.js';

/**
 * Get all website settings
 * @route GET /api/settings
 */
export async function getSettings(req, res) {
  try {
    const [settings] = await pool.query(
      'SELECT * FROM website_settings ORDER BY id DESC LIMIT 1'
    );
    
    if (settings.length === 0) {
      return res.status(404).json({ error: 'Settings not found' });
    }
    
    // Parse JSON fields if they're strings
    if (settings[0].social_media_links && typeof settings[0].social_media_links === 'string') {
      settings[0].social_media_links = JSON.parse(settings[0].social_media_links);
    }
    
    res.json(settings[0]);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get theme settings (public endpoint)
 * @route GET /api/settings/theme
 */
export async function getTheme(req, res) {
  try {
    const [settings] = await pool.query(
      `SELECT 
        primary_color,
        secondary_color,
        accent_color,
        background_color,
        card_background,
        text_primary,
        text_secondary,
        business_name,
        logo_url
      FROM website_settings 
      ORDER BY id DESC 
      LIMIT 1`
    );
    
    if (settings.length === 0) {
      // Return defaults if no settings exist
      return res.json({
        primary_color: '#aa2a46',
        secondary_color: '#d63c65',
        accent_color: '#fffced',
        background_color: '#1a1b22',
        card_background: '#21212b',
        text_primary: '#fffced',
        text_secondary: '#ffffff',
        business_name: 'Soul Felt Music',
        logo_url: null
      });
    }
    
    res.json(settings[0]);
  } catch (error) {
    console.error('Error fetching theme:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Get feature toggles (public endpoint)
 * @route GET /api/settings/features
 */
export async function getFeatures(req, res) {
  try {
    const [settings] = await pool.query(
      `SELECT 
        enable_merchandise,
        enable_videos,
        enable_artist_profiles,
        enable_newsletter,
        enable_cart,
        enable_user_accounts,
        enable_promotional_tracks,
        enable_promotional_videos,
        enable_stripe
      FROM website_settings 
      ORDER BY id DESC 
      LIMIT 1`
    );
    
    if (settings.length === 0) {
      // Return defaults
      return res.json({
        enable_merchandise: true,
        enable_videos: true,
        enable_artist_profiles: true,
        enable_newsletter: true,
        enable_cart: true,
        enable_user_accounts: true,
        enable_promotional_tracks: true,
        enable_promotional_videos: true,
        enable_stripe: true
      });
    }
    
    // Convert TINYINT to boolean
    const features = settings[0];
    Object.keys(features).forEach(key => {
      features[key] = features[key] === 1 || features[key] === true;
    });
    
    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: error.message });
  }
}

/**
 * Update website settings (Admin only)
 * @route PUT /api/settings
 */
export async function updateSettings(req, res) {
  try {
    const {
      business_name,
      logo_url,
      favicon_url,
      primary_color,
      secondary_color,
      accent_color,
      background_color,
      card_background,
      text_primary,
      text_secondary,
      contact_email,
      contact_phone,
      contact_address,
      social_media_links,
      cloudinary_cloud_name,
      cloudinary_audio_folder,
      cloudinary_image_folder,
      cloudinary_video_folder,
      cloudinary_merch_folder,
      enable_merchandise,
      enable_videos,
      enable_artist_profiles,
      enable_newsletter,
      enable_cart,
      enable_user_accounts,
      enable_promotional_tracks,
      enable_promotional_videos,
      enable_stripe,
      hero_title,
      hero_subtitle,
      featured_section_title,
      about_us_text,
      payment_currency,
      tax_rate,
      site_title,
      site_description,
      site_keywords,
      items_per_page,
      max_upload_size_mb
    } = req.body;

    // Build dynamic update query
    const updates = [];
    const values = [];

    if (business_name !== undefined) { updates.push('business_name = ?'); values.push(business_name); }
    if (logo_url !== undefined) { updates.push('logo_url = ?'); values.push(logo_url); }
    if (favicon_url !== undefined) { updates.push('favicon_url = ?'); values.push(favicon_url); }
    if (primary_color !== undefined) { updates.push('primary_color = ?'); values.push(primary_color); }
    if (secondary_color !== undefined) { updates.push('secondary_color = ?'); values.push(secondary_color); }
    if (accent_color !== undefined) { updates.push('accent_color = ?'); values.push(accent_color); }
    if (background_color !== undefined) { updates.push('background_color = ?'); values.push(background_color); }
    if (card_background !== undefined) { updates.push('card_background = ?'); values.push(card_background); }
    if (text_primary !== undefined) { updates.push('text_primary = ?'); values.push(text_primary); }
    if (text_secondary !== undefined) { updates.push('text_secondary = ?'); values.push(text_secondary); }
    if (contact_email !== undefined) { updates.push('contact_email = ?'); values.push(contact_email); }
    if (contact_phone !== undefined) { updates.push('contact_phone = ?'); values.push(contact_phone); }
    if (contact_address !== undefined) { updates.push('contact_address = ?'); values.push(contact_address); }
    if (social_media_links !== undefined) { 
      updates.push('social_media_links = ?'); 
      values.push(JSON.stringify(social_media_links)); 
    }
    if (cloudinary_cloud_name !== undefined) { updates.push('cloudinary_cloud_name = ?'); values.push(cloudinary_cloud_name); }
    if (cloudinary_audio_folder !== undefined) { updates.push('cloudinary_audio_folder = ?'); values.push(cloudinary_audio_folder); }
    if (cloudinary_image_folder !== undefined) { updates.push('cloudinary_image_folder = ?'); values.push(cloudinary_image_folder); }
    if (cloudinary_video_folder !== undefined) { updates.push('cloudinary_video_folder = ?'); values.push(cloudinary_video_folder); }
    if (cloudinary_merch_folder !== undefined) { updates.push('cloudinary_merch_folder = ?'); values.push(cloudinary_merch_folder); }
    if (enable_merchandise !== undefined) { updates.push('enable_merchandise = ?'); values.push(enable_merchandise); }
    if (enable_videos !== undefined) { updates.push('enable_videos = ?'); values.push(enable_videos); }
    if (enable_artist_profiles !== undefined) { updates.push('enable_artist_profiles = ?'); values.push(enable_artist_profiles); }
    if (enable_newsletter !== undefined) { updates.push('enable_newsletter = ?'); values.push(enable_newsletter); }
    if (enable_cart !== undefined) { updates.push('enable_cart = ?'); values.push(enable_cart); }
    if (enable_user_accounts !== undefined) { updates.push('enable_user_accounts = ?'); values.push(enable_user_accounts); }
    if (enable_promotional_tracks !== undefined) { updates.push('enable_promotional_tracks = ?'); values.push(enable_promotional_tracks); }
    if (enable_promotional_videos !== undefined) { updates.push('enable_promotional_videos = ?'); values.push(enable_promotional_videos); }
    if (enable_stripe !== undefined) { updates.push('enable_stripe = ?'); values.push(enable_stripe); }
    if (hero_title !== undefined) { updates.push('hero_title = ?'); values.push(hero_title); }
    if (hero_subtitle !== undefined) { updates.push('hero_subtitle = ?'); values.push(hero_subtitle); }
    if (featured_section_title !== undefined) { updates.push('featured_section_title = ?'); values.push(featured_section_title); }
    if (about_us_text !== undefined) { updates.push('about_us_text = ?'); values.push(about_us_text); }
    if (payment_currency !== undefined) { updates.push('payment_currency = ?'); values.push(payment_currency); }
    if (tax_rate !== undefined) { updates.push('tax_rate = ?'); values.push(tax_rate); }
    if (site_title !== undefined) { updates.push('site_title = ?'); values.push(site_title); }
    if (site_description !== undefined) { updates.push('site_description = ?'); values.push(site_description); }
    if (site_keywords !== undefined) { updates.push('site_keywords = ?'); values.push(site_keywords); }
    if (items_per_page !== undefined) { updates.push('items_per_page = ?'); values.push(items_per_page); }
    if (max_upload_size_mb !== undefined) { updates.push('max_upload_size_mb = ?'); values.push(max_upload_size_mb); }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Get the first settings row (or create if doesn't exist)
    const [existing] = await pool.query('SELECT id FROM website_settings LIMIT 1');
    
    if (existing.length === 0) {
      // Insert new settings
      const insertFields = updates.map(u => u.split(' = ')[0]).join(', ');
      const insertPlaceholders = updates.map(() => '?').join(', ');
      await pool.query(
        `INSERT INTO website_settings (${insertFields}) VALUES (${insertPlaceholders})`,
        values
      );
    } else {
      // Update existing settings
      const updateQuery = `UPDATE website_settings SET ${updates.join(', ')} WHERE id = ?`;
      values.push(existing[0].id);
      await pool.query(updateQuery, values);
    }

    // Fetch and return updated settings
    const [updated] = await pool.query('SELECT * FROM website_settings LIMIT 1');
    
    if (updated[0].social_media_links && typeof updated[0].social_media_links === 'string') {
      updated[0].social_media_links = JSON.parse(updated[0].social_media_links);
    }
    
    res.json({ 
      message: 'Settings updated successfully',
      settings: updated[0]
    });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: error.message });
  }
}
