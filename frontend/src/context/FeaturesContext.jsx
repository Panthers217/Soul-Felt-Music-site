import React, { createContext, useContext, useState, useEffect } from 'react';

const FeaturesContext = createContext();

export const useFeatures = () => {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeaturesProvider');
  }
  return context;
};

export const FeaturesProvider = ({ children }) => {
  const [features, setFeatures] = useState({
    enable_merchandise: true,
    enable_videos: true,
    enable_artist_profiles: true,
    enable_newsletter: true,
    enable_cart: true,
    enable_user_accounts: true,
    enable_promotional_tracks: true,
    enable_promotional_videos: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/settings/features`);
      if (response.ok) {
        const data = await response.json();
        setFeatures(data);
      }
    } catch (error) {
      console.error('Error fetching features:', error);
      // Use default features (all enabled)
    } finally {
      setLoading(false);
    }
  };

  const isEnabled = (featureName) => {
    return features[featureName] ?? true; // Default to true if not found
  };

  return (
    <FeaturesContext.Provider value={{ features, isEnabled, loading }}>
      {children}
    </FeaturesContext.Provider>
  );
};
