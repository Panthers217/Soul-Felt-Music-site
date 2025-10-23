import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { auth } from '../../firebase';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const { updateTheme } = useTheme();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('branding');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('Not authenticated');
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        const errorText = await response.text();
        console.error('Settings fetch failed:', response.status, errorText);
        toast.error(`Failed to load settings: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Error loading settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error('Not authenticated');
        setSaving(false);
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      if (response.ok) {
        const updatedSettings = await response.json();
        setSettings(updatedSettings);
        
        // Update theme context if colors changed
        updateTheme({
          primary_color: updatedSettings.primary_color,
          secondary_color: updatedSettings.secondary_color,
          accent_color: updatedSettings.accent_color,
          background_color: updatedSettings.background_color,
          card_background: updatedSettings.card_background,
          text_primary: updatedSettings.text_primary,
          text_secondary: updatedSettings.text_secondary,
          business_name: updatedSettings.business_name,
          logo_url: updatedSettings.logo_url
        });
        
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Error saving settings');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setSettings(prev => ({
      ...prev,
      social_media_links: {
        ...prev.social_media_links,
        [platform]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-accent text-xl">Loading settings...</div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-accent text-xl">Failed to load settings. Please try again.</div>
      </div>
    );
  }

  const tabs = [
    { id: 'branding', label: '🎨 Branding', icon: '🎨' },
    { id: 'theme', label: '🌈 Theme Colors', icon: '🌈' },
    { id: 'contact', label: '📞 Contact Info', icon: '📞' },
    { id: 'cloudinary', label: '☁️ Cloudinary', icon: '☁️' },
    { id: 'features', label: '🔧 Features', icon: '🔧' },
    { id: 'homepage', label: '🏠 Homepage', icon: '🏠' },
    { id: 'other', label: '⚙️ Other', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">Website Settings</h1>
          <p className="text-text-secondary">Configure your website's appearance and features</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-card-bg pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? 'bg-primary text-accent'
                  : 'bg-card-bg text-text-secondary hover:bg-primary/30'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-card-bg rounded-lg p-8">
          
          {/* Branding Tab */}
          {activeTab === 'branding' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Branding</h2>
              
              <div>
                <label className="block text-accent font-medium mb-2">Business Name</label>
                <input
                  type="text"
                  value={settings.business_name || ''}
                  onChange={(e) => handleInputChange('business_name', e.target.value)}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Logo URL</label>
                <input
                  type="text"
                  value={settings.logo_url || ''}
                  onChange={(e) => handleInputChange('logo_url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {settings.logo_url && (
                  <img src={settings.logo_url} alt="Logo preview" className="mt-2 h-20 object-contain" />
                )}
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Favicon URL</label>
                <input
                  type="text"
                  value={settings.favicon_url || ''}
                  onChange={(e) => handleInputChange('favicon_url', e.target.value)}
                  placeholder="https://example.com/favicon.ico"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Theme Colors Tab */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Theme Colors</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'primary_color', label: 'Primary Color', desc: 'Main brand color' },
                  { key: 'secondary_color', label: 'Secondary Color', desc: 'Secondary accent' },
                  { key: 'accent_color', label: 'Accent Color', desc: 'Text accent color' },
                  { key: 'background_color', label: 'Background Color', desc: 'Page background' },
                  { key: 'card_background', label: 'Card Background', desc: 'Card/section background' },
                  { key: 'text_primary', label: 'Primary Text', desc: 'Main text color' },
                  { key: 'text_secondary', label: 'Secondary Text', desc: 'Secondary text color' }
                ].map(color => (
                  <div key={color.key} className="flex items-center gap-4">
                    <input
                      type="color"
                      value={settings[color.key] || '#000000'}
                      onChange={(e) => handleInputChange(color.key, e.target.value)}
                      className="w-20 h-20 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <label className="block text-accent font-medium">{color.label}</label>
                      <p className="text-text-secondary text-sm">{color.desc}</p>
                      <code className="text-primary text-xs">{settings[color.key]}</code>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview */}
              <div className="mt-8 p-6 rounded-lg" style={{ backgroundColor: settings.background_color }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: settings.accent_color }}>
                  Theme Preview
                </h3>
                <div className="flex gap-4">
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{ 
                      backgroundColor: settings.primary_color,
                      color: settings.accent_color 
                    }}
                  >
                    Primary Button
                  </button>
                  <button 
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{ 
                      backgroundColor: settings.secondary_color,
                      color: settings.accent_color 
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Contact Information</h2>
              
              <div>
                <label className="block text-accent font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={settings.contact_email || ''}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                  placeholder="contact@example.com"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.contact_phone || ''}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Address</label>
                <textarea
                  value={settings.contact_address || ''}
                  onChange={(e) => handleInputChange('contact_address', e.target.value)}
                  placeholder="123 Main St, City, State 12345"
                  rows="3"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="border-t border-background pt-6">
                <h3 className="text-xl font-semibold text-accent mb-4">Social Media</h3>
                
                {['twitter', 'instagram', 'facebook', 'youtube'].map(platform => (
                  <div key={platform} className="mb-4">
                    <label className="block text-accent font-medium mb-2 capitalize">{platform}</label>
                    <input
                      type="url"
                      value={settings.social_media_links?.[platform] || ''}
                      onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                      placeholder={`https://${platform}.com/your-profile`}
                      className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cloudinary Tab */}
          {activeTab === 'cloudinary' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Cloudinary Configuration</h2>
              
              <div>
                <label className="block text-accent font-medium mb-2">Cloud Name</label>
                <input
                  type="text"
                  value={settings.cloudinary_cloud_name || ''}
                  onChange={(e) => handleInputChange('cloudinary_cloud_name', e.target.value)}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Audio Folder</label>
                <input
                  type="text"
                  value={settings.cloudinary_audio_folder || ''}
                  onChange={(e) => handleInputChange('cloudinary_audio_folder', e.target.value)}
                  placeholder="YourBusiness/Audio"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Image Folder</label>
                <input
                  type="text"
                  value={settings.cloudinary_image_folder || ''}
                  onChange={(e) => handleInputChange('cloudinary_image_folder', e.target.value)}
                  placeholder="YourBusiness/Images"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Video Folder</label>
                <input
                  type="text"
                  value={settings.cloudinary_video_folder || ''}
                  onChange={(e) => handleInputChange('cloudinary_video_folder', e.target.value)}
                  placeholder="YourBusiness/Videos"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Merchandise Folder</label>
                <input
                  type="text"
                  value={settings.cloudinary_merch_folder || ''}
                  onChange={(e) => handleInputChange('cloudinary_merch_folder', e.target.value)}
                  placeholder="YourBusiness/Merch"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Feature Toggles</h2>
              <p className="text-text-secondary mb-6">Enable or disable features across your website</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: 'enable_merchandise', label: 'Merchandise Store', desc: 'Show merchandise section' },
                  { key: 'enable_videos', label: 'Videos', desc: 'Show videos section' },
                  { key: 'enable_artist_profiles', label: 'Artist Profiles', desc: 'Show artist pages' },
                  { key: 'enable_newsletter', label: 'Newsletter', desc: 'Newsletter signup' },
                  { key: 'enable_cart', label: 'Shopping Cart', desc: 'Cart functionality' },
                  { key: 'enable_user_accounts', label: 'User Accounts', desc: 'User registration/login' },
                  { key: 'enable_promotional_tracks', label: 'Promotional Tracks', desc: 'Show promo tracks' },
                  { key: 'enable_promotional_videos', label: 'Promotional Videos', desc: 'Show promo videos' }
                ].map(feature => (
                  <div key={feature.key} className="flex items-center justify-between p-4 bg-background rounded-lg">
                    <div className="flex-1">
                      <label className="block text-accent font-medium">{feature.label}</label>
                      <p className="text-text-secondary text-sm">{feature.desc}</p>
                    </div>
                    <button
                      onClick={() => handleInputChange(feature.key, !settings[feature.key])}
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                        settings[feature.key] ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                          settings[feature.key] ? 'translate-x-7' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Homepage Tab */}
          {activeTab === 'homepage' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Homepage Settings</h2>
              
              <div>
                <label className="block text-accent font-medium mb-2">Hero Title</label>
                <input
                  type="text"
                  value={settings.hero_title || ''}
                  onChange={(e) => handleInputChange('hero_title', e.target.value)}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Hero Subtitle</label>
                <textarea
                  value={settings.hero_subtitle || ''}
                  onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Featured Section Title</label>
                <input
                  type="text"
                  value={settings.featured_section_title || ''}
                  onChange={(e) => handleInputChange('featured_section_title', e.target.value)}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">About Us Text</label>
                <textarea
                  value={settings.about_us_text || ''}
                  onChange={(e) => handleInputChange('about_us_text', e.target.value)}
                  rows="5"
                  placeholder="Tell visitors about your business..."
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Site Title (SEO)</label>
                <input
                  type="text"
                  value={settings.site_title || ''}
                  onChange={(e) => handleInputChange('site_title', e.target.value)}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Site Description (SEO)</label>
                <textarea
                  value={settings.site_description || ''}
                  onChange={(e) => handleInputChange('site_description', e.target.value)}
                  rows="3"
                  placeholder="Brief description for search engines..."
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Site Keywords (SEO)</label>
                <input
                  type="text"
                  value={settings.site_keywords || ''}
                  onChange={(e) => handleInputChange('site_keywords', e.target.value)}
                  placeholder="music, artist, store, etc."
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Other Tab */}
          {activeTab === 'other' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Other Settings</h2>
              
              <div>
                <label className="block text-accent font-medium mb-2">Payment Currency</label>
                <select
                  value={settings.payment_currency || 'USD'}
                  onChange={(e) => handleInputChange('payment_currency', e.target.value)}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.tax_rate || 0}
                  onChange={(e) => handleInputChange('tax_rate', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Items Per Page</label>
                <input
                  type="number"
                  value={settings.items_per_page || 20}
                  onChange={(e) => handleInputChange('items_per_page', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">Max Upload Size (MB)</label>
                <input
                  type="number"
                  value={settings.max_upload_size_mb || 50}
                  onChange={(e) => handleInputChange('max_upload_size_mb', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => fetchSettings()}
            className="px-6 py-3 bg-card-bg text-text-secondary rounded-lg font-semibold hover:bg-background transition"
          >
            Reset Changes
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-primary hover:bg-secondary text-accent rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
