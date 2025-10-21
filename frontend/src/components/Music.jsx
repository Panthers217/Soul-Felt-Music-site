import React, { useState } from 'react';
import { useApiData } from '../context/ApiDataContext';
import TrackCard from './TrackCard';

const menuTabs = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Featured' },
  { key: 'new', label: 'New Releases' },
  { key: 'popular', label: 'Popular' },
  { key: 'recommended', label: 'Recommended' },
  { key: 'pop', label: 'Pop' },
  { key: 'jazz', label: 'Jazz' },
  { key: 'soul', label: 'Soul' },
  { key: 'rnb', label: 'RnB' },
  { key: 'easylistening', label: 'Easy Listening' },
];

const Music = () => {
  const { dbSnapshot } = useApiData();
  const [activeTabs, setActiveTabs] = useState(['all']);

  // Get tracks and albums from database
  const tracks = dbSnapshot?.tracks?.records || [];
  const albums = dbSnapshot?.albums?.records || [];

  // Helper function to get album cover URL by album_id
  const getAlbumCoverUrl = (albumId) => {
    const album = albums.find(a => a.id === albumId);
    return album?.cover_url;
  };

  // Debug logging
  console.log('Albums:', albums);
  console.log('Tracks:', tracks);

  // Toggle tab selection
  const handleTabClick = (key) => {
    if (key === 'all') {
      setActiveTabs(['all']);
    } else {
      setActiveTabs((prev) => {
        const isActive = prev.includes(key);
        let next;
        if (isActive) {
          next = prev.filter(tab => tab !== key);
        } else {
          next = prev.filter(tab => tab !== 'all').concat(key);
        }
        return next.length === 0 ? ['all'] : next;
      });
    }
  };

  // Section definitions
  const allSections = [
    { key: 'all', label: 'All Tracks' },
    { key: 'featured', label: 'Featured Tracks' },
    { key: 'new', label: 'New Releases' },
    { key: 'popular', label: 'Popular' },
    { key: 'recommended', label: 'Recommended For You' },
    { key: 'pop', label: 'Pop' },
    { key: 'jazz', label: 'Jazz' },
    { key: 'soul', label: 'Soul' },
    { key: 'rnb', label: 'RnB' },
    { key: 'easylistening', label: 'Easy Listening' },
  ];

  // Get sections to display
  const sectionsToShow = activeTabs.includes('all') ? allSections.map(s => s.key) : activeTabs;

  return (
    <section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-7xl bg-[#21212b] rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-12">
        <h1 className="text-[#fffced] text-5xl md:text-6xl font-extrabold font-['Roboto'] mb-4 text-center drop-shadow-lg">Stream & Discover Soul Felt Music</h1>
        <p className="text-[#fffced] text-lg md:text-xl font-semibold text-center mb-8">Play samples, discover new artists, and purchase your favorite tracks and albums.</p>
        {/* Menu Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {menuTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`px-5 py-2 rounded-full font-bold text-lg transition-colors border-2 border-[#aa2a46] focus:outline-none ${activeTabs.includes(tab.key) ? 'bg-[#aa2a46] text-[#fffced]' : 'bg-[#1d1e26] text-[#aa2a46] hover:bg-[#aa2a46] hover:text-[#fffced]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {/* Display selected sections */}
        {allSections.filter(section => sectionsToShow.includes(section.key)).map(section => {
          let sectionTracks;
          if (section.key === "all") {
            // Show all tracks
            sectionTracks = tracks;
          } else if (section.key === "featured") {
            // Featured could show popular OR recommended tracks
            sectionTracks = tracks.filter(track => track.is_popular || track.is_recommended);
          } else if (section.key === "new") {
            sectionTracks = tracks.filter(track => track.is_new);
          } else if (section.key === "popular") {
            sectionTracks = tracks.filter(track => track.is_popular);
          } else if (section.key === "recommended") {
            sectionTracks = tracks.filter(track => track.is_recommended);
          } else {
            // Genre filtering
            sectionTracks = tracks.filter(track => 
              track.genre?.toLowerCase() === section.key.toLowerCase()
            );
          }
          return sectionTracks.length > 0 ? (
            <div key={section.key} className="mb-8">
              <h2 className="text-[#aa2a46] text-3xl font-bold mb-6 font-['Public_Sans'] text-center">{section.label}</h2>
              <div className="flex flex-wrap gap-8 justify-center">
                {sectionTracks.map(track => (
                  <TrackCard key={track.id} track={track} albumCoverUrl={getAlbumCoverUrl(track.album_id)} />
                ))}
              </div>
            </div>
          ) : null;
        })}
        <div className="w-full flex flex-col items-center mt-8">
          <h2 className="text-[#aa2a46] text-2xl font-bold mb-2 font-['Public_Sans'] text-center">Why Buy Soul Felt Music?</h2>
          <ul className="text-[#fffced] text-base md:text-lg font-medium text-center list-disc list-inside">
            <li>Support your favorite artists directly</li>
            <li>Get high-quality audio downloads</li>
            <li>Exclusive access to bonus tracks and content</li>
            <li>Join a passionate music community</li>
          </ul>
        </div>
      </div>
    </section>
  );


}
export default Music;
