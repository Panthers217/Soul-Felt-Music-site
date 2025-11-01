import React, { useState, useEffect } from "react";
import { useApiData } from "../context/ApiDataContext";
import { useCart } from "../context/CartContext";
import { useFeatures } from "../context/FeaturesContext";
import { useNavigate } from "react-router-dom";
import TrackCard from "./TrackCard";
import AlbumCard from "./AlbumCard";
import SearchBar from "./SearchBar";
import CartSummary from "./CartSummary";
import axios from "axios";

const Music = () => {
  const { dbSnapshot } = useApiData();
  const { cart } = useCart();
  const { isEnabled } = useFeatures();
  const navigate = useNavigate();
  const [activeTabs, setActiveTabs] = useState(["all"]);
  const [genres, setGenres] = useState([]);
  const [viewMode, setViewMode] = useState("tracks"); // "tracks" or "albums"
  const [searchResults, setSearchResults] = useState(null);
  
  const isStripeEnabled = isEnabled('enable_stripe');

  // Fetch active genres from database
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/genres/active`);
        setGenres(response.data.genres || []);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
    fetchGenres();
  }, []);

  // Static tabs (non-genre filters)
  const staticTabs = [
    { key: "all", label: "All" },
    { key: "featured", label: "Featured" },
    { key: "new", label: "New Releases" },
    { key: "popular", label: "Popular" },
    { key: "recommended", label: "Recommended" },
  ];

  // Combine static tabs with genres from database
  const menuTabs = [
    ...staticTabs,
    ...genres.map(genre => ({
      key: genre.name.toLowerCase().replace(/\s+/g, ''),
      label: genre.name,
      genreName: genre.name // Store original name for matching
    }))
  ];

  // Get promotional tracks and albums from database
  const tracks = dbSnapshot?.promotional_tracks?.records || [];
  const albums = dbSnapshot?.albums?.records || [];
  const artistImages = dbSnapshot?.artist_images?.records || [];
  const artists = dbSnapshot?.artists?.records || [];

  // Helper function to get artist name by artist_id
  const getArtistName = (artistId) => {
    const artist = artists.find((a) => a.id === artistId);
    return artist?.artist_name || artist?.name || 'Unknown Artist';
  };

  // Helper function to get album cover URL by album_id
  const getAlbumCoverUrl = (albumId) => {
    const album = albums.find((a) => a.id === albumId);
    return album?.cover_url;
  };

  // Helper function to get artist image for promotional track
  const getTrackImage = (track) => {
    // Try artist_image_id first
    if (track.artist_image_id) {
      const artistImage = artistImages.find((img) => img.id === track.artist_image_id);
      if (artistImage?.image_url) {
        return artistImage.image_url;
      }
    }
    // Fallback to album cover
    return getAlbumCoverUrl(track.album_id);
  };

  // Debug logging
  console.log("Albums:", albums);
  console.log("Promotional Tracks:", tracks);

  // Toggle tab selection
  const handleTabClick = (key) => {
    if (key === "all") {
      setActiveTabs(["all"]);
    } else {
      setActiveTabs((prev) => {
        const isActive = prev.includes(key);
        let next;
        if (isActive) {
          next = prev.filter((tab) => tab !== key);
        } else {
          next = prev.filter((tab) => tab !== "all").concat(key);
        }
        return next.length === 0 ? ["all"] : next;
      });
    }
  };

  // Section definitions - combine static sections with genre sections
  const allSections = [
    { key: "all", label: viewMode === "tracks" ? "All Tracks" : "All Albums" },
    { key: "featured", label: viewMode === "tracks" ? "Featured Tracks" : "Featured Albums" },
    { key: "new", label: "New Releases" },
    { key: "popular", label: "Popular" },
    { key: "recommended", label: "Recommended For You" },
    ...genres.map(genre => ({
      key: genre.name.toLowerCase().replace(/\s+/g, ''),
      label: genre.name,
      genreName: genre.name
    }))
  ];

  // Get sections to display
  const sectionsToShow = activeTabs.includes("all")
    ? allSections.map((s) => s.key)
    : activeTabs;

  return (
    <section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-7xl bg-[#21212b] rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-12">
        <h1 className="text-[#fffced] text-5xl md:text-6xl font-extrabold font-['Roboto'] mb-4 text-center drop-shadow-lg">
          Stream & Discover Soul Felt Music
        </h1>
        <p className="text-[#fffced] text-lg md:text-xl font-semibold text-center mb-8">
          Play samples, discover new artists, and purchase your favorite tracks
          and albums.
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg bg-[#1d1e26] p-1 border-2 border-[#aa2a46]">
            <button
              onClick={() => setViewMode("tracks")}
              className={`px-6 py-2 rounded-md font-bold text-base transition-all duration-200 ${
                viewMode === "tracks"
                  ? "bg-[#aa2a46] text-[#fffced] shadow-lg"
                  : "text-[#aa2a46] hover:text-[#fffced]"
              }`}
            >
              Tracks
            </button>
            <button
              onClick={() => setViewMode("albums")}
              className={`px-6 py-2 rounded-md font-bold text-base transition-all duration-200 ${
                viewMode === "albums"
                  ? "bg-[#aa2a46] text-[#fffced] shadow-lg"
                  : "text-[#aa2a46] hover:text-[#fffced]"
              }`}
            >
              Albums
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar 
          onSearchResults={setSearchResults} 
          viewMode={viewMode}
        />

        {/* Menu Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          {menuTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`px-5 py-2 rounded-full font-bold text-lg transition-colors border-2 border-[#aa2a46] focus:outline-none ${
                activeTabs.includes(tab.key)
                  ? "bg-[#aa2a46] text-[#fffced]"
                  : "bg-[#1d1e26] text-[#aa2a46] hover:bg-[#aa2a46] hover:text-[#fffced]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Cart display - only show when Stripe is enabled */}
        {isStripeEnabled && (
          <div className="w-full flex justify-center">
            <CartSummary />
          </div>
        )}
        
        {/* Display selected sections */}
        {allSections
          .filter((section) => sectionsToShow.includes(section.key))
          .map((section) => {
            let sectionItems;
            
            // Use search results if search is active
            const sourceData = {
              tracks: searchResults ? searchResults.tracks : tracks,
              albums: searchResults ? searchResults.albums : albums
            };
            
            if (viewMode === "tracks") {
              // Track filtering
              if (section.key === "all") {
                sectionItems = sourceData.tracks;
              } else if (section.key === "featured") {
                sectionItems = sourceData.tracks.filter(
                  (track) => track.featured === 1
                );
              } else if (section.key === "new") {
                sectionItems = sourceData.tracks.filter((track) => track.new_release === 1);
              } else if (section.key === "popular") {
                sectionItems = sourceData.tracks.filter((track) => track.popular === 1);
              } else if (section.key === "recommended") {
                sectionItems = sourceData.tracks.filter((track) => track.recommended === 1);
              } else {
                // Genre filtering for tracks
                const genreName = section.genreName || section.label;
                sectionItems = sourceData.tracks.filter((track) => {
                  if (!track.genre) return false;
                  const trackGenres = track.genre.split(',').map(g => g.trim().toLowerCase());
                  return trackGenres.includes(genreName.toLowerCase());
                });
              }
            } else {
              // Album filtering
              if (section.key === "all") {
                sectionItems = sourceData.albums;
              } else if (section.key === "featured") {
                sectionItems = sourceData.albums.filter(
                  (album) => album.featured === 1
                );
              } else if (section.key === "new") {
                sectionItems = sourceData.albums.filter((album) => album.new_release === 1);
              } else if (section.key === "popular") {
                sectionItems = sourceData.albums.filter((album) => album.popular === 1);
              } else if (section.key === "recommended") {
                sectionItems = sourceData.albums.filter((album) => album.recommended === 1);
              } else {
                // Genre filtering for albums
                const genreName = section.genreName || section.label;
                sectionItems = sourceData.albums.filter((album) => {
                  if (!album.genre) return false;
                  const albumGenres = album.genre.split(',').map(g => g.trim().toLowerCase());
                  return albumGenres.includes(genreName.toLowerCase());
                });
              }
            }
            
            return sectionItems.length > 0 ? (
              <div key={section.key} className="mb-8">
                <h2 className="text-[#aa2a46] text-3xl font-bold mb-6 font-['Public_Sans'] text-center">
                  {section.label}
                </h2>
                <div className="flex flex-wrap gap-8 justify-center">
                  {viewMode === "tracks" ? (
                    sectionItems.map((track) => (
                      <TrackCard
                        key={track.id}
                        track={track}
                        purchaseLink={track.purchase_link}
                        albumCoverUrl={getTrackImage(track)}
                        artistName={getArtistName(track.artist_id)}
                      />
                    ))
                  ) : (
                    sectionItems.map((album) => (
                      <AlbumCard
                        key={album.id}
                        album={{
                          ...album,
                          artist_name: getArtistName(album.artist_id)
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            ) : null;
          })}
        <div className="w-full flex flex-col items-center mt-8">
          <h2 className="text-[#aa2a46] text-2xl font-bold mb-2 font-['Public_Sans'] text-center">
            Why Buy Soul Felt Music?
          </h2>
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
};
export default Music;
