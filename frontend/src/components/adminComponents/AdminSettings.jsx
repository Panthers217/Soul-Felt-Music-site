import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useFeatures } from "../../context/FeaturesContext";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaTiktok,
  FaSpotify,
  FaSoundcloud,
  FaDiscord,
  FaTwitch,
  FaRedditAlien,
  FaPinterest,
  FaSnapchatGhost,
  FaTelegram,
  FaWhatsapp,
  FaGithub,
  FaBandcamp,
  FaDeezer,
  FaApple,
  FaAmazon,
  FaPatreon,
} from "react-icons/fa";
import { SiTidal, SiNapster } from "react-icons/si";

const AdminSettings = () => {
  const { updateTheme } = useTheme();
  const { refreshFeatures } = useFeatures();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("branding");

  // Custom time picker state for office hours
  const [customTimeMode, setCustomTimeMode] = useState({
    weekday: false,
    saturday: false,
    sunday: false,
  });

  // Time picker states for each day
  const [weekdayTime, setWeekdayTime] = useState({
    startHour: "9",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "6",
    endMinute: "00",
    endPeriod: "PM",
  });
  const [saturdayTime, setSaturdayTime] = useState({
    startHour: "10",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "4",
    endMinute: "00",
    endPeriod: "PM",
  });
  const [sundayTime, setSundayTime] = useState({
    startHour: "10",
    startMinute: "00",
    startPeriod: "AM",
    endHour: "2",
    endMinute: "00",
    endPeriod: "PM",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  // Initialize time picker values when settings load or custom mode is activated
  useEffect(() => {
    if (settings) {
      // Initialize weekday time
      const weekdayParsed = parseTimeString(settings.office_hours_weekday);
      if (weekdayParsed) setWeekdayTime(weekdayParsed);

      // Initialize saturday time
      const saturdayParsed = parseTimeString(settings.office_hours_saturday);
      if (saturdayParsed) setSaturdayTime(saturdayParsed);

      // Initialize sunday time
      const sundayParsed = parseTimeString(settings.office_hours_sunday);
      if (sundayParsed) setSundayTime(sundayParsed);
    }
  }, [
    settings?.office_hours_weekday,
    settings?.office_hours_saturday,
    settings?.office_hours_sunday,
  ]);

  const fetchSettings = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not authenticated");
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      } else {
        const errorText = await response.text();
        console.error("Settings fetch failed:", response.status, errorText);
        toast.error(`Failed to load settings: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Error loading settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not authenticated");
        setSaving(false);
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(settings),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const updatedSettings = data.settings || data;
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
          logo_url: updatedSettings.logo_url,
        });

        // Refresh features to update feature toggles across the app
        refreshFeatures();

        toast.success("Settings saved successfully!");
      } else {
        toast.error("Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Generate hour options (1-12)
  const generateHours = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  // Generate minute options (00, 15, 30, 45)
  const generateMinutes = () => {
    return ["00", "15", "30", "45"];
  };

  // Parse time string to components
  const parseTimeString = (timeString) => {
    if (!timeString || timeString === "Closed" || timeString === "24/7")
      return null;
    const match = timeString.match(
      /^(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)$/
    );
    if (!match) return null;
    return {
      startHour: match[1],
      startMinute: match[2],
      startPeriod: match[3],
      endHour: match[4],
      endMinute: match[5],
      endPeriod: match[6],
    };
  };

  // Build time string from components
  const buildTimeString = (
    startHour,
    startMinute,
    startPeriod,
    endHour,
    endMinute,
    endPeriod
  ) => {
    return `${startHour}:${startMinute} ${startPeriod} - ${endHour}:${endMinute} ${endPeriod}`;
  };

  // Get the time state and setter for a specific day
  const getTimeState = (day) => {
    if (day === "weekday") return [weekdayTime, setWeekdayTime];
    if (day === "saturday") return [saturdayTime, setSaturdayTime];
    if (day === "sunday") return [sundayTime, setSundayTime];
  };

  // Render custom time picker
  const renderCustomTimePicker = (day, fieldName) => {
    const [timeState, setTimeState] = getTimeState(day);

    const applyCustomTime = () => {
      const timeString = buildTimeString(
        timeState.startHour,
        timeState.startMinute,
        timeState.startPeriod,
        timeState.endHour,
        timeState.endMinute,
        timeState.endPeriod
      );
      handleInputChange(fieldName, timeString);
      setCustomTimeMode((prev) => ({ ...prev, [day]: false }));
    };

    return (
      <div className="bg-card-background p-4 rounded-lg border border-primary/30 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Start Time */}
          <div>
            <label className="block text-accent text-sm font-medium mb-2">
              Start Time
            </label>
            <div className="flex gap-2">
              <select
                value={timeState.startHour}
                onChange={(e) =>
                  setTimeState({ ...timeState, startHour: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateHours().map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={timeState.startMinute}
                onChange={(e) =>
                  setTimeState({ ...timeState, startMinute: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateMinutes().map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={timeState.startPeriod}
                onChange={(e) =>
                  setTimeState({ ...timeState, startPeriod: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          {/* End Time */}
          <div>
            <label className="block text-accent text-sm font-medium mb-2">
              End Time
            </label>
            <div className="flex gap-2">
              <select
                value={timeState.endHour}
                onChange={(e) =>
                  setTimeState({ ...timeState, endHour: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateHours().map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={timeState.endMinute}
                onChange={(e) =>
                  setTimeState({ ...timeState, endMinute: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                {generateMinutes().map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={timeState.endPeriod}
                onChange={(e) =>
                  setTimeState({ ...timeState, endPeriod: e.target.value })
                }
                className="flex-1 px-2 py-2 bg-background text-text-primary border border-primary/50 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={applyCustomTime}
            className="px-4 py-2 bg-primary text-accent rounded hover:bg-primary/80 transition text-sm font-medium"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={() =>
              setCustomTimeMode((prev) => ({ ...prev, [day]: false }))
            }
            className="px-4 py-2 bg-background text-text-primary border border-primary/50 rounded hover:bg-background/80 transition text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  // Available social media platforms with icons
  const availablePlatforms = [
    { id: "facebook", name: "Facebook", icon: FaFacebookF, color: "#1877F2" },
    { id: "twitter", name: "Twitter/X", icon: FaTwitter, color: "#1DA1F2" },
    { id: "instagram", name: "Instagram", icon: FaInstagram, color: "#E4405F" },
    { id: "youtube", name: "YouTube", icon: FaYoutube, color: "#FF0000" },
    { id: "tiktok", name: "TikTok", icon: FaTiktok, color: "#000000" },
    { id: "spotify", name: "Spotify", icon: FaSpotify, color: "#1DB954" },
    {
      id: "soundcloud",
      name: "SoundCloud",
      icon: FaSoundcloud,
      color: "#FF5500",
    },
    { id: "bandcamp", name: "Bandcamp", icon: FaBandcamp, color: "#629AA9" },
    { id: "applemusic", name: "Apple Music", icon: FaApple, color: "#FA243C" },
    { id: "tidal", name: "Tidal", icon: SiTidal, color: "#000000" },
    { id: "deezer", name: "Deezer", icon: FaDeezer, color: "#FF0092" },
    {
      id: "amazonmusic",
      name: "Amazon Music",
      icon: FaAmazon,
      color: "#FF9900",
    },
    { id: "napster", name: "Napster", icon: SiNapster, color: "#000000" },
    { id: "linkedin", name: "LinkedIn", icon: FaLinkedinIn, color: "#0A66C2" },
    { id: "discord", name: "Discord", icon: FaDiscord, color: "#5865F2" },
    { id: "twitch", name: "Twitch", icon: FaTwitch, color: "#9146FF" },
    { id: "reddit", name: "Reddit", icon: FaRedditAlien, color: "#FF4500" },
    { id: "pinterest", name: "Pinterest", icon: FaPinterest, color: "#E60023" },
    {
      id: "snapchat",
      name: "Snapchat",
      icon: FaSnapchatGhost,
      color: "#FFFC00",
    },
    { id: "telegram", name: "Telegram", icon: FaTelegram, color: "#26A5E4" },
    { id: "whatsapp", name: "WhatsApp", icon: FaWhatsapp, color: "#25D366" },
    { id: "github", name: "GitHub", icon: FaGithub, color: "#181717" },
    { id: "patreon", name: "Patreon", icon: FaPatreon, color: "#FF424D" },
  ];

  // Handle social media link changes with enabled/disabled state
  const handleSocialMediaChange = (platform, field, value) => {
    setSettings((prev) => {
      const currentLinks = prev.social_media_links || {};
      const platformData = currentLinks[platform] || {
        url: "",
        enabled: false,
      };

      return {
        ...prev,
        social_media_links: {
          ...currentLinks,
          [platform]: {
            ...platformData,
            [field]: value,
          },
        },
      };
    });
  };

  // Add custom social media platform
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customPlatform, setCustomPlatform] = useState({
    name: "",
    url: "",
    icon: "",
  });

  const addCustomSocialMedia = () => {
    if (!customPlatform.name || !customPlatform.url) {
      toast.error("Please provide both name and URL");
      return;
    }

    const customId = `custom_${Date.now()}`;
    handleSocialMediaChange(customId, "url", customPlatform.url);
    handleSocialMediaChange(customId, "enabled", true);
    handleSocialMediaChange(customId, "name", customPlatform.name);
    handleSocialMediaChange(customId, "icon", customPlatform.icon || "FaLink");

    setCustomPlatform({ name: "", url: "", icon: "" });
    setShowAddCustom(false);
    toast.success("Custom social media link added!");
  };

  // Remove social media platform
  const removeSocialMedia = (platform) => {
    setSettings((prev) => {
      const currentLinks = { ...prev.social_media_links };
      delete currentLinks[platform];
      return {
        ...prev,
        social_media_links: currentLinks,
      };
    });
  };

  const handleResetToDefaults = async () => {
    if (
      !window.confirm(
        "⚠️ Are you sure you want to reset ALL settings to default Soul Felt Music values? This cannot be undone!"
      )
    ) {
      return;
    }

    const defaultSettings = {
      business_name: "Soul Felt Music",
      logo_url: null,
      favicon_url: null,
      primary_color: "#aa2a46",
      secondary_color: "#d63c65",
      accent_color: "#fffced",
      background_color: "#1a1b22",
      card_background: "#21212b",
      text_primary: "#fffced",
      text_secondary: "#ffffff",
      contact_email: null,
      contact_phone: null,
      contact_address: null,
      office_hours_weekday: "9:00 AM - 6:00 PM",
      office_hours_saturday: "10:00 AM - 4:00 PM",
      office_hours_sunday: "Closed",
      office_hours_timezone: "EST",
      social_media_links: {
        twitter: "",
        instagram: "",
        facebook: "",
        youtube: "",
      },
      cloudinary_cloud_name: "webprojectimages",
      cloudinary_audio_folder: "SoulFeltMusic/SoulFeltMusicAudio",
      cloudinary_image_folder: "SoulFeltMusic/SoulFeltMusicImages",
      cloudinary_video_folder: "SoulFeltMusic/SoulFeltMusicVideos",
      cloudinary_merch_folder: "SoulFeltMusic/SoulFeltMusicMerch",
      enable_merchandise: true,
      enable_videos: true,
      enable_artist_profiles: true,
      enable_newsletter: true,
      enable_cart: true,
      enable_user_accounts: true,
      enable_promotional_tracks: true,
      enable_promotional_videos: true,
      enable_stripe: true,
      hero_title: "Stream & Discover Soul Felt Music",
      hero_subtitle:
        "Play samples, discover new artists, and purchase your favorite tracks and albums.",
      featured_section_title: "Featured Artists",
      about_us_text: null,
      payment_currency: "USD",
      tax_rate: 0.0,
      site_title: "Soul Felt Music",
      site_description: null,
      site_keywords: null,
      items_per_page: 20,
      max_upload_size_mb: 50,
    };

    setSaving(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        toast.error("Not authenticated");
        setSaving(false);
        return;
      }
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(defaultSettings),
        }
      );

      if (response.ok) {
        const updatedSettings = await response.json();
        setSettings(updatedSettings.settings || updatedSettings);

        // Update theme context
        updateTheme({
          primary_color: defaultSettings.primary_color,
          secondary_color: defaultSettings.secondary_color,
          accent_color: defaultSettings.accent_color,
          background_color: defaultSettings.background_color,
          card_background: defaultSettings.card_background,
          text_primary: defaultSettings.text_primary,
          text_secondary: defaultSettings.text_secondary,
          business_name: defaultSettings.business_name,
          logo_url: defaultSettings.logo_url,
        });

        toast.success("✅ Settings reset to defaults successfully!");
      } else {
        toast.error("Failed to reset settings");
      }
    } catch (error) {
      console.error("Error resetting settings:", error);
      toast.error("Error resetting settings");
    } finally {
      setSaving(false);
    }
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
        <div className="text-accent text-xl">
          Failed to load settings. Please try again.
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "branding", label: "🎨 Branding", icon: "🎨" },
    { id: "theme", label: "🌈 Theme Colors", icon: "🌈" },
    { id: "contact", label: "📞 Contact Info", icon: "📞" },
    { id: "email", label: "📧 Email Settings", icon: "📧" },
    { id: "cloudinary", label: "☁️ Cloudinary", icon: "☁️" },
    { id: "features", label: "🔧 Features", icon: "🔧" },
    { id: "homepage", label: "🏠 Homepage", icon: "🏠" },
    { id: "legal", label: "⚖️ Legal", icon: "⚖️" },
    { id: "other", label: "⚙️ Other", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-2">
            Website Settings
          </h1>
          <p className="text-text-secondary">
            Configure your website's appearance and features
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-card-bg pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeTab === tab.id
                  ? "bg-primary text-accent"
                  : "bg-card-bg text-text-secondary hover:bg-primary/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-card-bg rounded-lg p-8">
          {/* Branding Tab */}
          {activeTab === "branding" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">Branding</h2>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={settings.business_name || ""}
                  onChange={(e) =>
                    handleInputChange("business_name", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={settings.logo_url || ""}
                  onChange={(e) =>
                    handleInputChange("logo_url", e.target.value)
                  }
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {settings.logo_url && (
                  <img
                    src={settings.logo_url}
                    alt="Logo preview"
                    className="mt-2 h-20 object-contain"
                  />
                )}
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Favicon URL
                </label>
                <input
                  type="text"
                  value={settings.favicon_url || ""}
                  onChange={(e) =>
                    handleInputChange("favicon_url", e.target.value)
                  }
                  placeholder="https://example.com/favicon.ico"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Theme Colors Tab */}
          {activeTab === "theme" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Theme Colors
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    key: "primary_color",
                    label: "Primary Color",
                    desc: "Main brand color",
                  },
                  {
                    key: "secondary_color",
                    label: "Secondary Color",
                    desc: "Secondary accent",
                  },
                  {
                    key: "accent_color",
                    label: "Accent Color",
                    desc: "Text accent color",
                  },
                  {
                    key: "background_color",
                    label: "Background Color",
                    desc: "Page background",
                  },
                  {
                    key: "card_background",
                    label: "Card Background",
                    desc: "Card/section background",
                  },
                  {
                    key: "text_primary",
                    label: "Primary Text",
                    desc: "Main text color",
                  },
                  {
                    key: "text_secondary",
                    label: "Secondary Text",
                    desc: "Secondary text color",
                  },
                ].map((color) => (
                  <div key={color.key} className="flex items-center gap-4">
                    <input
                      type="color"
                      value={settings[color.key] || "#000000"}
                      onChange={(e) =>
                        handleInputChange(color.key, e.target.value)
                      }
                      className="w-20 h-20 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <label className="block text-accent font-medium">
                        {color.label}
                      </label>
                      <p className="text-text-secondary text-sm">
                        {color.desc}
                      </p>
                      <code className="text-primary text-xs">
                        {settings[color.key]}
                      </code>
                    </div>
                  </div>
                ))}
              </div>

              {/* Preview */}
              <div
                className="mt-8 p-6 rounded-lg"
                style={{ backgroundColor: settings.background_color }}
              >
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: settings.accent_color }}
                >
                  Theme Preview
                </h3>
                <div className="flex gap-4">
                  <button
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{
                      backgroundColor: settings.primary_color,
                      color: settings.accent_color,
                    }}
                  >
                    Primary Button
                  </button>
                  <button
                    className="px-6 py-3 rounded-lg font-semibold"
                    style={{
                      backgroundColor: settings.secondary_color,
                      color: settings.accent_color,
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Contact Info Tab */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Contact Information
              </h2>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.contact_email || ""}
                  onChange={(e) =>
                    handleInputChange("contact_email", e.target.value)
                  }
                  placeholder="contact@example.com"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.contact_phone || ""}
                  onChange={(e) =>
                    handleInputChange("contact_phone", e.target.value)
                  }
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Address
                </label>
                <textarea
                  value={settings.contact_address || ""}
                  onChange={(e) =>
                    handleInputChange("contact_address", e.target.value)
                  }
                  placeholder="123 Main St, City, State 12345"
                  rows="3"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="border-t border-background pt-6">
                <h3 className="text-xl font-semibold text-accent mb-4">
                  Office Hours
                </h3>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Monday - Friday
                  </label>
                  {!customTimeMode.weekday ? (
                    <div>
                      <select
                        value={settings.office_hours_weekday || ""}
                        onChange={(e) => {
                          if (e.target.value === "custom") {
                            setCustomTimeMode((prev) => ({
                              ...prev,
                              weekday: true,
                            }));
                          } else {
                            handleInputChange(
                              "office_hours_weekday",
                              e.target.value
                            );
                          }
                        }}
                        className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Closed">Closed</option>
                        <option value="8:00 AM - 5:00 PM">
                          8:00 AM - 5:00 PM
                        </option>
                        <option value="9:00 AM - 5:00 PM">
                          9:00 AM - 5:00 PM
                        </option>
                        <option value="9:00 AM - 6:00 PM">
                          9:00 AM - 6:00 PM
                        </option>
                        <option value="10:00 AM - 6:00 PM">
                          10:00 AM - 6:00 PM
                        </option>
                        <option value="8:00 AM - 8:00 PM">
                          8:00 AM - 8:00 PM
                        </option>
                        <option value="9:00 AM - 8:00 PM">
                          9:00 AM - 8:00 PM
                        </option>
                        <option value="24/7">24/7</option>
                        {settings.office_hours_weekday &&
                          ![
                            "Closed",
                            "8:00 AM - 5:00 PM",
                            "9:00 AM - 5:00 PM",
                            "9:00 AM - 6:00 PM",
                            "10:00 AM - 6:00 PM",
                            "8:00 AM - 8:00 PM",
                            "9:00 AM - 8:00 PM",
                            "24/7",
                          ].includes(settings.office_hours_weekday) && (
                            <option value={settings.office_hours_weekday}>
                              {settings.office_hours_weekday}
                            </option>
                          )}
                        <option value="custom">Custom Time...</option>
                      </select>
                      {settings.office_hours_weekday &&
                        ![
                          "Closed",
                          "8:00 AM - 5:00 PM",
                          "9:00 AM - 5:00 PM",
                          "9:00 AM - 6:00 PM",
                          "10:00 AM - 6:00 PM",
                          "8:00 AM - 8:00 PM",
                          "9:00 AM - 8:00 PM",
                          "24/7",
                        ].includes(settings.office_hours_weekday) && (
                          <button
                            type="button"
                            onClick={() =>
                              setCustomTimeMode((prev) => ({
                                ...prev,
                                weekday: true,
                              }))
                            }
                            className="mt-2 text-sm text-primary hover:underline"
                          >
                            Edit custom time
                          </button>
                        )}
                    </div>
                  ) : (
                    renderCustomTimePicker("weekday", "office_hours_weekday")
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Saturday
                  </label>
                  {!customTimeMode.saturday ? (
                    <div>
                      <select
                        value={settings.office_hours_saturday || ""}
                        onChange={(e) => {
                          if (e.target.value === "custom") {
                            setCustomTimeMode((prev) => ({
                              ...prev,
                              saturday: true,
                            }));
                          } else {
                            handleInputChange(
                              "office_hours_saturday",
                              e.target.value
                            );
                          }
                        }}
                        className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Closed">Closed</option>
                        <option value="8:00 AM - 12:00 PM">
                          8:00 AM - 12:00 PM
                        </option>
                        <option value="9:00 AM - 1:00 PM">
                          9:00 AM - 1:00 PM
                        </option>
                        <option value="10:00 AM - 2:00 PM">
                          10:00 AM - 2:00 PM
                        </option>
                        <option value="10:00 AM - 4:00 PM">
                          10:00 AM - 4:00 PM
                        </option>
                        <option value="9:00 AM - 5:00 PM">
                          9:00 AM - 5:00 PM
                        </option>
                        <option value="9:00 AM - 6:00 PM">
                          9:00 AM - 6:00 PM
                        </option>
                        <option value="24/7">24/7</option>
                        {settings.office_hours_saturday &&
                          ![
                            "Closed",
                            "8:00 AM - 12:00 PM",
                            "9:00 AM - 1:00 PM",
                            "10:00 AM - 2:00 PM",
                            "10:00 AM - 4:00 PM",
                            "9:00 AM - 5:00 PM",
                            "9:00 AM - 6:00 PM",
                            "24/7",
                          ].includes(settings.office_hours_saturday) && (
                            <option value={settings.office_hours_saturday}>
                              {settings.office_hours_saturday}
                            </option>
                          )}
                        <option value="custom">Custom Time...</option>
                      </select>
                      {settings.office_hours_saturday &&
                        ![
                          "Closed",
                          "8:00 AM - 12:00 PM",
                          "9:00 AM - 1:00 PM",
                          "10:00 AM - 2:00 PM",
                          "10:00 AM - 4:00 PM",
                          "9:00 AM - 5:00 PM",
                          "9:00 AM - 6:00 PM",
                          "24/7",
                        ].includes(settings.office_hours_saturday) && (
                          <button
                            type="button"
                            onClick={() =>
                              setCustomTimeMode((prev) => ({
                                ...prev,
                                saturday: true,
                              }))
                            }
                            className="mt-2 text-sm text-primary hover:underline"
                          >
                            Edit custom time
                          </button>
                        )}
                    </div>
                  ) : (
                    renderCustomTimePicker("saturday", "office_hours_saturday")
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Sunday
                  </label>
                  {!customTimeMode.sunday ? (
                    <div>
                      <select
                        value={settings.office_hours_sunday || ""}
                        onChange={(e) => {
                          if (e.target.value === "custom") {
                            setCustomTimeMode((prev) => ({
                              ...prev,
                              sunday: true,
                            }));
                          } else {
                            handleInputChange(
                              "office_hours_sunday",
                              e.target.value
                            );
                          }
                        }}
                        className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="Closed">Closed</option>
                        <option value="8:00 AM - 12:00 PM">
                          8:00 AM - 12:00 PM
                        </option>
                        <option value="9:00 AM - 1:00 PM">
                          9:00 AM - 1:00 PM
                        </option>
                        <option value="10:00 AM - 2:00 PM">
                          10:00 AM - 2:00 PM
                        </option>
                        <option value="10:00 AM - 4:00 PM">
                          10:00 AM - 4:00 PM
                        </option>
                        <option value="9:00 AM - 5:00 PM">
                          9:00 AM - 5:00 PM
                        </option>
                        <option value="9:00 AM - 6:00 PM">
                          9:00 AM - 6:00 PM
                        </option>
                        <option value="24/7">24/7</option>
                        {settings.office_hours_sunday &&
                          ![
                            "Closed",
                            "8:00 AM - 12:00 PM",
                            "9:00 AM - 1:00 PM",
                            "10:00 AM - 2:00 PM",
                            "10:00 AM - 4:00 PM",
                            "9:00 AM - 5:00 PM",
                            "9:00 AM - 6:00 PM",
                            "24/7",
                          ].includes(settings.office_hours_sunday) && (
                            <option value={settings.office_hours_sunday}>
                              {settings.office_hours_sunday}
                            </option>
                          )}
                        <option value="custom">Custom Time...</option>
                      </select>
                      {settings.office_hours_sunday &&
                        ![
                          "Closed",
                          "8:00 AM - 12:00 PM",
                          "9:00 AM - 1:00 PM",
                          "10:00 AM - 2:00 PM",
                          "10:00 AM - 4:00 PM",
                          "9:00 AM - 5:00 PM",
                          "9:00 AM - 6:00 PM",
                          "24/7",
                        ].includes(settings.office_hours_sunday) && (
                          <button
                            type="button"
                            onClick={() =>
                              setCustomTimeMode((prev) => ({
                                ...prev,
                                sunday: true,
                              }))
                            }
                            className="mt-2 text-sm text-primary hover:underline"
                          >
                            Edit custom time
                          </button>
                        )}
                    </div>
                  ) : (
                    renderCustomTimePicker("sunday", "office_hours_sunday")
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Timezone
                  </label>
                  <select
                    value={settings.office_hours_timezone || ""}
                    onChange={(e) =>
                      handleInputChange("office_hours_timezone", e.target.value)
                    }
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="EST">Eastern Standard Time (EST)</option>
                    <option value="CST">Central Standard Time (CST)</option>
                    <option value="MST">Mountain Standard Time (MST)</option>
                    <option value="PST">Pacific Standard Time (PST)</option>
                    <option value="AKST">Alaska Standard Time (AKST)</option>
                    <option value="HST">Hawaii Standard Time (HST)</option>
                    <option value="GMT">Greenwich Mean Time (GMT)</option>
                    <option value="UTC">
                      Coordinated Universal Time (UTC)
                    </option>
                    <option value="CET">Central European Time (CET)</option>
                    <option value="IST">India Standard Time (IST)</option>
                    <option value="JST">Japan Standard Time (JST)</option>
                    <option value="AEST">
                      Australian Eastern Standard Time (AEST)
                    </option>
                  </select>
                </div>
              </div>

              <div className="border-t border-background pt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-accent">
                    Social Media Links
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddCustom(!showAddCustom)}
                    className="px-4 py-2 bg-primary text-accent rounded-lg hover:bg-primary/80 transition text-sm font-medium"
                  >
                    {showAddCustom ? "Cancel" : "+ Add Custom Link"}
                  </button>
                </div>

                <p className="text-text-secondary mb-6 text-sm">
                  Select platforms and add your profile URLs. Toggle switches to
                  enable/disable links on your website.
                </p>

                {/* Add Custom Link Form */}
                {showAddCustom && (
                  <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
                    <h4 className="text-accent font-medium mb-3">
                      Add Custom Social Media Link
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-accent text-sm font-medium mb-1">
                          Platform Name
                        </label>
                        <input
                          type="text"
                          value={customPlatform.name}
                          onChange={(e) =>
                            setCustomPlatform({
                              ...customPlatform,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g., MySpace, Threads, etc."
                          className="w-full px-3 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-accent text-sm font-medium mb-1">
                          Profile URL
                        </label>
                        <input
                          type="url"
                          value={customPlatform.url}
                          onChange={(e) =>
                            setCustomPlatform({
                              ...customPlatform,
                              url: e.target.value,
                            })
                          }
                          placeholder="https://..."
                          className="w-full px-3 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={addCustomSocialMedia}
                        className="w-full px-4 py-2 bg-primary text-accent rounded-lg hover:bg-primary/80 transition text-sm font-medium"
                      >
                        Add Link
                      </button>
                    </div>
                  </div>
                )}

                {/* Social Media Platforms List */}
                <div className="space-y-3">
                  {availablePlatforms.map((platform) => {
                    const Icon = platform.icon;
                    const platformData = settings.social_media_links?.[
                      platform.id
                    ] || { url: "", enabled: false };
                    const isConfigured = Boolean(platformData.url);

                    return (
                      <div
                        key={platform.id}
                        className={`p-4 rounded-lg border transition-all ${
                          isConfigured
                            ? "border-primary/50 bg-primary/5"
                            : "border-background bg-background/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xl"
                            style={{ backgroundColor: platform.color }}
                          >
                            <Icon />
                          </div>

                          {/* Platform Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-accent font-medium">
                                {platform.name}
                              </h4>
                              {isConfigured && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                                  Configured
                                </span>
                              )}
                            </div>
                            <input
                              type="url"
                              value={platformData.url || ""}
                              onChange={(e) =>
                                handleSocialMediaChange(
                                  platform.id,
                                  "url",
                                  e.target.value
                                )
                              }
                              placeholder={`https://${platform.id}.com/your-profile`}
                              className="w-full px-3 py-1.5 bg-background text-text-primary border border-primary/30 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                          </div>

                          {/* Enable/Disable Toggle */}
                          <div className="flex flex-col items-center gap-1">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={platformData.enabled || false}
                                onChange={(e) =>
                                  handleSocialMediaChange(
                                    platform.id,
                                    "enabled",
                                    e.target.checked
                                  )
                                }
                                disabled={!isConfigured}
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                            </label>
                            <span className="text-xs text-text-secondary">
                              {platformData.enabled ? "Visible" : "Hidden"}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Custom Links */}
                  {settings.social_media_links &&
                    Object.keys(settings.social_media_links)
                      .filter((key) => key.startsWith("custom_"))
                      .map((customKey) => {
                        const customData =
                          settings.social_media_links[customKey];
                        return (
                          <div
                            key={customKey}
                            className="p-4 rounded-lg border border-primary/50 bg-primary/5"
                          >
                            <div className="flex items-center gap-4">
                              {/* Custom Icon */}
                              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white text-xl">
                                🔗
                              </div>

                              {/* Custom Platform Info */}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="text-accent font-medium">
                                    {customData.name || "Custom Link"}
                                  </h4>
                                  <span className="px-2 py-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 text-primary text-xs rounded">
                                    Custom
                                  </span>
                                </div>
                                <input
                                  type="url"
                                  value={customData.url || ""}
                                  onChange={(e) =>
                                    handleSocialMediaChange(
                                      customKey,
                                      "url",
                                      e.target.value
                                    )
                                  }
                                  placeholder="https://..."
                                  className="w-full px-3 py-1.5 bg-background text-text-primary border border-primary/30 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                                />
                              </div>

                              {/* Enable/Disable Toggle */}
                              <div className="flex flex-col items-center gap-1">
                                <label className="relative inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={customData.enabled || false}
                                    onChange={(e) =>
                                      handleSocialMediaChange(
                                        customKey,
                                        "enabled",
                                        e.target.checked
                                      )
                                    }
                                    className="sr-only peer"
                                  />
                                  <div className="w-11 h-6 bg-background peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                                <span className="text-xs text-text-secondary">
                                  {customData.enabled ? "Visible" : "Hidden"}
                                </span>
                              </div>

                              {/* Remove Button */}
                              <button
                                type="button"
                                onClick={() => removeSocialMedia(customKey)}
                                className="px-3 py-1 bg-red-500/20 text-red-500 rounded hover:bg-red-500/30 transition text-sm font-medium"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                </div>

                <div className="mt-4 p-3 bg-background/50 rounded-lg border border-primary/20">
                  <p className="text-sm text-text-secondary">
                    💡 <strong>Tip:</strong> Only enabled links with URLs will
                    appear on your website. Use the toggle switches to show/hide
                    links without deleting them.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Email Settings Tab */}
          {activeTab === "email" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Email Configuration
              </h2>
              <p className="text-text-secondary mb-6">
                Configure email service provider and settings
              </p>

              {/* Email Provider Selection */}
              <div className="border-t border-background pt-6">
                <h3 className="text-xl font-semibold text-accent mb-4">
                  Email Service Provider
                </h3>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Select Provider
                  </label>
                  <select
                    value={settings.email_provider || "smtp"}
                    onChange={(e) =>
                      handleInputChange("email_provider", e.target.value)
                    }
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="smtp">SMTP (Gmail, Outlook, Custom)</option>
                    <option value="resend">Resend</option>
                    <option value="sendgrid">SendGrid</option>
                    <option value="mailgun">Mailgun</option>
                    <option value="postmark">Postmark</option>
                    <option value="ses-smtp">Amazon SES (SMTP)</option>
                  </select>
                  <p className="text-sm text-text-secondary mt-1">
                    Choose your email service provider
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    value={settings.email_from_name || ""}
                    onChange={(e) =>
                      handleInputChange("email_from_name", e.target.value)
                    }
                    placeholder="Soul Felt Music"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Name displayed in "From" field
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Reply-To Email
                  </label>
                  <input
                    type="email"
                    value={settings.email_reply_to || ""}
                    onChange={(e) =>
                      handleInputChange("email_reply_to", e.target.value)
                    }
                    placeholder="contact@soulfeltmusic.com"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Email address for replies (optional)
                  </p>
                </div>
              </div>

              {/* API Key for API-based providers */}
              {settings.email_provider && 
               settings.email_provider !== "smtp" && 
               settings.email_provider !== "ses-smtp" && (
                <div className="border-t border-background pt-6">
                  <h3 className="text-xl font-semibold text-accent mb-4">
                    API Configuration
                  </h3>

                  <div className="mb-4">
                    <label className="block text-accent font-medium mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={settings.email_api_key || ""}
                      onChange={(e) =>
                        handleInputChange("email_api_key", e.target.value)
                      }
                      placeholder="Enter your API key"
                      className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-sm text-text-secondary mt-1">
                      {settings.email_provider === "resend" && "Get your API key from https://resend.com/api-keys"}
                      {settings.email_provider === "sendgrid" && "Get your API key from SendGrid dashboard"}
                      {settings.email_provider === "mailgun" && "Get your API key from Mailgun dashboard"}
                      {settings.email_provider === "postmark" && "Get your API key from Postmark account settings"}
                    </p>
                  </div>

                  {settings.email_provider === "resend" && (
                    <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                      <p className="text-sm text-blue-300">
                        <strong>Resend Setup:</strong><br/>
                        1. Sign up at <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline">resend.com</a><br/>
                        2. Verify your domain in the Resend dashboard<br/>
                        3. Create an API key<br/>
                        4. Use a verified domain email in "SMTP Username" field below
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* SMTP Settings - shown for SMTP and SES-SMTP */}
              {(!settings.email_provider || 
                settings.email_provider === "smtp" || 
                settings.email_provider === "ses-smtp" ||
                settings.email_provider === "mailgun") && (
              <div className="border-t border-background pt-6">
                <h3 className="text-xl font-semibold text-accent mb-4">
                  SMTP Server Settings
                </h3>

                {settings.email_provider === "smtp" && (
                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={settings.smtp_host || ""}
                    onChange={(e) =>
                      handleInputChange("smtp_host", e.target.value)
                    }
                    placeholder="smtp.gmail.com"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    e.g., smtp.gmail.com, smtp.sendgrid.net
                  </p>
                </div>
                )}

                {settings.email_provider === "smtp" && (
                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    SMTP Port
                  </label>
                  <input
                    type="number"
                    value={settings.smtp_port || ""}
                    onChange={(e) =>
                      handleInputChange("smtp_port", parseInt(e.target.value))
                    }
                    placeholder="587"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Common ports: 587 (TLS), 465 (SSL), 25 (unencrypted)
                  </p>
                </div>
                )}

                {settings.email_provider === "smtp" && (
                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.smtp_secure || false}
                      onChange={(e) =>
                        handleInputChange("smtp_secure", e.target.checked)
                      }
                      className="w-5 h-5 text-primary bg-background border-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-accent font-medium">Use SSL/TLS</span>
                  </label>
                  <p className="text-sm text-text-secondary mt-1 ml-7">
                    Enable for port 465, disable for port 587
                  </p>
                </div>
                )}

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    {settings.email_provider === "mailgun" ? "Mailgun Domain Username" : "SMTP Username"}
                  </label>
                  <input
                    type="text"
                    value={settings.smtp_user || ""}
                    onChange={(e) =>
                      handleInputChange("smtp_user", e.target.value)
                    }
                    placeholder={
                      settings.email_provider === "resend" 
                        ? "verified@yourdomain.com" 
                        : settings.email_provider === "mailgun"
                        ? "postmaster@your-domain.com"
                        : "your-email@gmail.com"
                    }
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    {settings.email_provider === "resend" && "Must be a verified domain email"}
                    {settings.email_provider === "mailgun" && "Your Mailgun SMTP username (e.g., postmaster@yourdomain.com)"}
                    {(!settings.email_provider || settings.email_provider === "smtp") && "Your email address or SMTP username"}
                    {settings.email_provider === "ses-smtp" && "AWS SES SMTP username"}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    {settings.email_provider === "mailgun" ? "API Key" : "SMTP Password"}
                  </label>
                  <input
                    type="password"
                    value={settings.smtp_password || ""}
                    onChange={(e) =>
                      handleInputChange("smtp_password", e.target.value)
                    }
                    placeholder="••••••••"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    {settings.email_provider === "resend" && "Your Resend API key"}
                    {settings.email_provider === "mailgun" && "Your Mailgun API key"}
                    {settings.email_provider === "ses-smtp" && "AWS SES SMTP password"}
                    {(!settings.email_provider || settings.email_provider === "smtp") && "For Gmail, use an App Password (not your regular password)"}
                  </p>
                </div>
              </div>
              )}

              <div className="border-t border-background pt-6">
                <h3 className="text-xl font-semibold text-accent mb-4">
                  Recipient Emails
                </h3>
                <p className="text-text-secondary mb-4">
                  Set different email addresses for each inquiry type
                </p>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    General Inquiry Recipient
                  </label>
                  <input
                    type="email"
                    value={settings.contact_form_recipient || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "contact_form_recipient",
                        e.target.value
                      )
                    }
                    placeholder="info@soulfeltmusic.com"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Receives general contact form submissions
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Artist Submission Recipient
                  </label>
                  <input
                    type="email"
                    value={settings.artist_submission_recipient || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "artist_submission_recipient",
                        e.target.value
                      )
                    }
                    placeholder="artists@soulfeltmusic.com"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Receives artist submission inquiries
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Press & Media Recipient
                  </label>
                  <input
                    type="email"
                    value={settings.press_media_recipient || ""}
                    onChange={(e) =>
                      handleInputChange("press_media_recipient", e.target.value)
                    }
                    placeholder="press@soulfeltmusic.com"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Receives press and media inquiries
                  </p>
                </div>
              </div>

              <div className="border-t border-background pt-6">
                <h3 className="text-xl font-semibold text-accent mb-4">
                  Email Options
                </h3>

                <div className="mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.contact_form_auto_reply || false}
                      onChange={(e) =>
                        handleInputChange(
                          "contact_form_auto_reply",
                          e.target.checked
                        )
                      }
                      className="w-5 h-5 text-primary bg-background border-primary rounded focus:ring-2 focus:ring-primary"
                    />
                    <span className="text-accent font-medium">
                      Send Auto-Reply to Customers
                    </span>
                  </label>
                  <p className="text-sm text-text-secondary mt-1 ml-7">
                    Automatically send a confirmation email to form submitters
                  </p>
                </div>

                {settings.contact_form_auto_reply && (
                  <div className="mb-4 ml-7 p-4 bg-background/50 rounded-lg border border-primary/30">
                    <label className="block text-accent font-medium mb-2">
                      Auto-Reply Message
                    </label>
                    <textarea
                      value={settings.auto_reply_message || ""}
                      onChange={(e) =>
                        handleInputChange("auto_reply_message", e.target.value)
                      }
                      placeholder="We have received your message and will get back to you as soon as possible."
                      rows="4"
                      className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-sm text-text-secondary mt-1">
                      Customize the message customers receive. Available
                      variables: {"{name}"}, {"{inquiry_type}"},{" "}
                      {"{business_name}"}
                    </p>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-accent font-medium mb-2">
                    Email Subject Prefix
                  </label>
                  <input
                    type="text"
                    value={settings.contact_form_subject_prefix || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "contact_form_subject_prefix",
                        e.target.value
                      )
                    }
                    placeholder="[Soul Felt Music]"
                    className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-sm text-text-secondary mt-1">
                    Prefix added to email subjects (e.g., [Soul Felt Music] New
                    Contact Form)
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mt-6">
                <h4 className="text-accent font-semibold mb-2">
                  📝 Setup Instructions
                </h4>
                <ul className="text-sm text-text-secondary space-y-2 ml-4 list-disc">
                  <li>
                    <strong>Gmail:</strong> Enable 2FA, then create an App
                    Password at myaccount.google.com/apppasswords
                  </li>
                  <li>
                    <strong>SendGrid:</strong> Use "apikey" as username and your
                    API key as password
                  </li>
                  <li>
                    <strong>Other providers:</strong> Check your email
                    provider's SMTP documentation
                  </li>
                  <li>
                    Test your settings by submitting a contact form after saving
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Cloudinary Tab */}
          {activeTab === "cloudinary" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Cloudinary Configuration
              </h2>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Cloud Name
                </label>
                <input
                  type="text"
                  value={settings.cloudinary_cloud_name || ""}
                  onChange={(e) =>
                    handleInputChange("cloudinary_cloud_name", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Audio Folder
                </label>
                <input
                  type="text"
                  value={settings.cloudinary_audio_folder || ""}
                  onChange={(e) =>
                    handleInputChange("cloudinary_audio_folder", e.target.value)
                  }
                  placeholder="YourBusiness/Audio"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Image Folder
                </label>
                <input
                  type="text"
                  value={settings.cloudinary_image_folder || ""}
                  onChange={(e) =>
                    handleInputChange("cloudinary_image_folder", e.target.value)
                  }
                  placeholder="YourBusiness/Images"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Video Folder
                </label>
                <input
                  type="text"
                  value={settings.cloudinary_video_folder || ""}
                  onChange={(e) =>
                    handleInputChange("cloudinary_video_folder", e.target.value)
                  }
                  placeholder="YourBusiness/Videos"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Merchandise Folder
                </label>
                <input
                  type="text"
                  value={settings.cloudinary_merch_folder || ""}
                  onChange={(e) =>
                    handleInputChange("cloudinary_merch_folder", e.target.value)
                  }
                  placeholder="YourBusiness/Merch"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === "features" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Feature Toggles
              </h2>
              <p className="text-text-secondary mb-6">
                Enable or disable features across your website
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    key: "enable_merchandise",
                    label: "Merchandise Store",
                    desc: "Show merchandise section",
                  },
                  {
                    key: "enable_videos",
                    label: "Videos",
                    desc: "Show videos section",
                  },
                  {
                    key: "enable_artist_profiles",
                    label: "Artist Profiles",
                    desc: "Show artist pages",
                  },
                  {
                    key: "enable_newsletter",
                    label: "Newsletter",
                    desc: "Newsletter signup",
                  },
                  {
                    key: "enable_cart",
                    label: "Shopping Cart",
                    desc: "Cart functionality",
                  },
                  {
                    key: "enable_user_accounts",
                    label: "User Accounts",
                    desc: "User registration/login",
                  },
                  {
                    key: "enable_promotional_tracks",
                    label: "Promotional Tracks",
                    desc: "Show promo tracks",
                  },
                  {
                    key: "enable_promotional_videos",
                    label: "Promotional Videos",
                    desc: "Show promo videos",
                  },
                  {
                    key: "enable_stripe",
                    label: "Stripe Payments",
                    desc: "Enable Stripe checkout",
                  },
                ].map((feature) => (
                  <div
                    key={feature.key}
                    className="flex items-center justify-between p-4 bg-background rounded-lg"
                  >
                    <div className="flex-1">
                      <label className="block text-accent font-medium">
                        {feature.label}
                      </label>
                      <p className="text-text-secondary text-sm">
                        {feature.desc}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        handleInputChange(feature.key, !settings[feature.key])
                      }
                      className={`relative inline-flex h-8 w-14 items-center rounded-full transition ${
                        settings[feature.key] ? "bg-green-600" : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${
                          settings[feature.key]
                            ? "translate-x-7"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Homepage Tab */}
          {activeTab === "homepage" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Homepage Settings
              </h2>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Hero Title
                </label>
                <input
                  type="text"
                  value={settings.hero_title || ""}
                  onChange={(e) =>
                    handleInputChange("hero_title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Hero Subtitle
                </label>
                <textarea
                  value={settings.hero_subtitle || ""}
                  onChange={(e) =>
                    handleInputChange("hero_subtitle", e.target.value)
                  }
                  rows="3"
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Featured Section Title
                </label>
                <input
                  type="text"
                  value={settings.featured_section_title || ""}
                  onChange={(e) =>
                    handleInputChange("featured_section_title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  About Us Text
                </label>
                <textarea
                  value={settings.about_us_text || ""}
                  onChange={(e) =>
                    handleInputChange("about_us_text", e.target.value)
                  }
                  rows="5"
                  placeholder="Tell visitors about your business..."
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Site Title (SEO)
                </label>
                <input
                  type="text"
                  value={settings.site_title || ""}
                  onChange={(e) =>
                    handleInputChange("site_title", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Site Description (SEO)
                </label>
                <textarea
                  value={settings.site_description || ""}
                  onChange={(e) =>
                    handleInputChange("site_description", e.target.value)
                  }
                  rows="3"
                  placeholder="Brief description for search engines..."
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Site Keywords (SEO)
                </label>
                <input
                  type="text"
                  value={settings.site_keywords || ""}
                  onChange={(e) =>
                    handleInputChange("site_keywords", e.target.value)
                  }
                  placeholder="music, artist, store, etc."
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}

          {/* Legal Tab */}
          {activeTab === "legal" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Legal & Terms
              </h2>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Terms of Service
                  <span className="text-sm text-text-secondary ml-2">
                    (Supports HTML formatting)
                  </span>
                </label>
                <textarea
                  value={settings.terms_of_service || ""}
                  onChange={(e) =>
                    handleInputChange("terms_of_service", e.target.value)
                  }
                  rows={20}
                  placeholder="Enter your Terms of Service content here. You can use HTML tags for formatting."
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                />
                <p className="text-sm text-text-secondary mt-2">
                  💡 Tip: Use HTML tags like &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt; for formatting.
                  This content will be displayed on the /terms page.
                </p>
              </div>
            </div>
          )}

          {/* Other Tab */}
          {activeTab === "other" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Other Settings
              </h2>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Payment Currency
                </label>
                <select
                  value={settings.payment_currency || "USD"}
                  onChange={(e) =>
                    handleInputChange("payment_currency", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                </select>
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.tax_rate || 0}
                  onChange={(e) =>
                    handleInputChange("tax_rate", parseFloat(e.target.value))
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Items Per Page
                </label>
                <input
                  type="number"
                  value={settings.items_per_page || 20}
                  onChange={(e) =>
                    handleInputChange(
                      "items_per_page",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-accent font-medium mb-2">
                  Max Upload Size (MB)
                </label>
                <input
                  type="number"
                  value={settings.max_upload_size_mb || 50}
                  onChange={(e) =>
                    handleInputChange(
                      "max_upload_size_mb",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-4 py-2 bg-background text-text-primary border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={handleResetToDefaults}
            disabled={saving}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ⚠️ Reset to Defaults
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => fetchSettings()}
              className="px-6 py-3 bg-card-bg text-text-secondary rounded-lg font-semibold hover:bg-background transition"
            >
              Discard Changes
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-primary hover:bg-secondary text-accent rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save All Settings"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
