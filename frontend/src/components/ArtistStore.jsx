// Demo merch products
import React, { useState } from "react";
import { useApiData } from "../context/ApiDataContext.jsx";
import SearchBar from "./SearchBar.jsx";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const demoMerchProducts = [
  {
    type: "Digital Album",
    title: "Neon Dreams - Digital Album",
    price: "$12.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Vinyl Record",
    title: "Synthwave Nights Vinyl",
    price: "$29.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Apparel",
    title: "Luna Starlight T-Shirt",
    price: "$24.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Apparel",
    title: "Retro Wave Hoodie",
    price: "$49.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Limited Edition",
    title: "Cosmic Journey - Limited Edition",
    price: "$19.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Posters & Art",
    title: "Synthwave Poster Set",
    price: "$15.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Digital Album",
    title: "Midnight Frequencies EP",
    price: "$8.99",
    img: "https://placehold.co/265x265",
  },
  {
    type: "Accessories",
    title: "Neon Keychain",
    price: "$9.99",
    img: "https://placehold.co/265x265",
  },
];

function ArtistStoreNav({
  storeName,
  cartCount,
  tabs,
  activeTab,
  setActiveTab,
}) {
  return (
    <nav className="w-full bg-[#21212b] outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 flex flex-col pb-[0.04rem]">
      <div className="flex justify-between items-center w-full py-[1rem] px-[6%]">
        <span className="text-white text-[1.2rem] md:text[1.5rem] lg:text-[2rem] xl:text-[2rem] font-bold font-['Roboto'] ">
          {storeName}
        </span>
        <div className="px-[0.7rem] py-[0.5rem] bg-[#1d1e26] rounded-xs outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 flex items-center">
          <span className="text-[#fffced] text-[0.7rem] lg:text-[1rem] xl:text-[2rem] font-medium font-['Roboto']">
            Cart ({cartCount})
          </span>
        </div>
      </div>
      <div className="flex sm:flex-col justify-center items-center gap-3 px-[6%] pb-[0.7rem]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full font-bold text-base transition-all duration-200 shadow-sm border-2 border-[#aa2a46] focus:outline-none
              ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#aa2a46] to-[#ff6b81] text-white scale-105 shadow-lg"
                  : "bg-[#1d1e26] text-[#fffced] hover:bg-[#aa2a46] hover:text-white"
              }
            `}
            style={{ minWidth: "120px" }}
          >
            <span className="text-[0.9rem] sm:text-[1.1rem] lg:text-[1.2rem] xl:text-[1.3rem] font-normal font-['Roboto'] leading-tight tracking-wide">
              {tab}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}

function ArtistStoreHeader({
  title = "Official Music & Merchandise",
  description = "Support Luna Starlight directly by purchasing official music releases and exclusive merchandise. All proceeds help fund future creative projects.",
}) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 px-[5%] pt-[0.5rem] pb-[0.2rem]">
      <div className="w-full text-center text-transparent bg-clip-text bg-gradient-to-r from-[#aa2a46] via-[#ff6b81] to-[#fffced] text-[1.7rem] lg:text-[2.2rem] xl:text-[2.7rem] font-extrabold font-['Roboto'] leading-[2.2rem] drop-shadow-lg">
        {title}
      </div>
      <div className="w-full text-center text-[#fffced] text-opacity-80 text-[1.1rem] lg:text-[1.3rem] xl:text-[1.5rem] font-semibold font-['Roboto'] leading-[1.7] px-2 py-2 rounded-lg bg-[#21212b]/60 shadow-md">
        {description}
      </div>
    </div>
  );
}

function ArtistMerchCard({
  type,
  title,
  price,
  img,
  buttonLabel = "Add to Cart",
  onAddToCart,
  artistId,
}) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (artistId) {
      navigate(`/store/${artistId}`);
    }
  };

  return (
    <div
      className="flex flex-col w-full max-w-[17rem] h-[23rem] bg-[#21212b] rounded-md outline outline-[0.04rem] outline-offset-[-0.04rem] outline-[#6e5049]/20 overflow-hidden flex-grow transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#aa2a46]/50 hover:-translate-y-2"
      style={{ minWidth: "220px", minHeight: "320px" }}
    >
      <div 
        className="flex-shrink-0 w-full h-[65%] flex items-center justify-center relative cursor-pointer group"
        onClick={handleImageClick}
      >
        <img
          className="w-[95%] h-[95%] object-cover rounded-t-md transition-transform duration-300 group-hover:scale-110"
          src={img}
          alt={title}
        />
        {artistId && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Store
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-start gap-2 w-full h-[35%] px-[6%] pt-[5%] pb-[6%]">
        <div className="text-[#aa2a46] text-[0.5rem] font-medium font-['Roboto'] uppercase leading-3 tracking-tight">
          {type}
        </div>
        <div className="text-white text-[1rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-none">
          {title}
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="text-white text-sm xl:text-[1.2rem]  font-bold font-['Roboto'] leading-tight">
            {price}
          </div>
          <button
            className="px-[0.7rem] py-[0.35rem] bg-[#aa2a46] rounded-xs flex flex-col justify-center items-center hover:bg-[#d94a6a] transition-colors duration-200"
            onClick={onAddToCart}
          >
            <span className="text-center text-white text-[0.8rem] xl:text-[1.2rem] font-medium font-['Roboto'] leading-[0.9rem]">
              {buttonLabel}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

const ArtistStore = ({ artistId = null, artistName = "Artist" }) => {
  const { dbSnapshot } = useApiData();
  const { cart, addToCart, removeFromCart, getCartCount, getCartTotal } = useCart();
  const tabs = ["All Products", "Music", "Merchandise"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [viewMode, setViewMode] = useState("all"); // "all", "albums", "tracks"
  const [searchResults, setSearchResults] = useState(null);

  // Use search results if available, otherwise use full data
  const sourceAlbums = searchResults ? searchResults.albums : (dbSnapshot?.albums?.records || []);
  const sourceTracks = searchResults ? searchResults.tracks : (dbSnapshot?.tracks?.records || []);
  const sourceMerchandise = searchResults ? searchResults.merchandise : (dbSnapshot?.merchandise?.records || []); // Merch not included in search yet

  // Get albums from database, optionally filtered by artist
  let albumProducts = [];
  if (dbSnapshot && dbSnapshot.albums && dbSnapshot.albums.records) {
    const filteredAlbums = artistId 
      ? sourceAlbums.filter(album => album.artist_id === parseInt(artistId))
      : sourceAlbums;
    
    albumProducts = filteredAlbums.map((album) => {
      // Parse price - handle both string and number formats
      let parsedPrice = 0;
      if (album.album_pricing != null && album.album_pricing !== '') {
        const priceValue = typeof album.album_pricing === 'string' 
          ? parseFloat(album.album_pricing) 
          : Number(album.album_pricing);
        
        // Check if conversion was successful
        if (!isNaN(priceValue)) {
          parsedPrice = priceValue / 100; // Convert cents to dollars
        }
      }
      
      return {
        type: album.album_type === "digital" ? "Digital Album" : album.album_type === "vinyl" ? "Vinyl Record" : "Limited Edition",
        title: album.title || "Untitled Album",
        price: parsedPrice > 0 
          ? `$${parsedPrice.toFixed(2)}`
          : "$0.00",
        img: album.cover_url || "https://placehold.co/265x265",
        album_type: album.album_type,
        artistId: album.artist_id,
      };
    });
  }

  // Get tracks from database, optionally filtered by artist
  let trackProducts = [];
  if (dbSnapshot && dbSnapshot.tracks && dbSnapshot.tracks.records) {
    const filteredTracks = artistId
      ? sourceTracks.filter(track => track.artist_image_id === parseInt(artistId))
      : sourceTracks;
    
    trackProducts = filteredTracks.map((track) => {
      // Parse price - handle both string and number formats
      let parsedPrice = 0;
      if (track.track_pricing != null && track.track_pricing !== '') {
        const priceValue = typeof track.track_pricing === 'string' 
          ? parseFloat(track.track_pricing) 
          : Number(track.track_pricing);
        
        if (!isNaN(priceValue)) {
          parsedPrice = priceValue / 100; // Convert cents to dollars
        }
      }
      
      // Get album cover from album_id
      const album = dbSnapshot.albums.records.find(a => a.id === track.album_id);
      
      return {
        type: "Track",
        title: track.title || "Untitled Track",
        price: parsedPrice > 0 
          ? `$${parsedPrice.toFixed(2)}`
          : "$0.00",
        img: album?.cover_url || "https://placehold.co/265x265",
        isTrack: true,
        artistId: track.artist_image_id,
      };
    });
  }

  // Get merchandise from database, optionally filtered by artist
  let merchandiseProducts = [];
  if (dbSnapshot && dbSnapshot.merchandise && dbSnapshot.merchandise.records) {
    const filteredMerch = artistId
      ? sourceMerchandise.filter(merch => merch.artist_id === parseInt(artistId))
      : sourceMerchandise;
    
    merchandiseProducts = filteredMerch.map((merch) => {
      // Parse price - NUMERIC format (already in dollars)
      let parsedPrice = 0;
      if (merch.price != null && merch.price !== '') {
        parsedPrice = typeof merch.price === 'string' 
          ? parseFloat(merch.price) 
          : Number(merch.price);
      }
      
      return {
        type: merch.merch_type || "Merchandise",
        title: merch.title || "Untitled Item",
        price: parsedPrice > 0 
          ? `$${parsedPrice.toFixed(2)}`
          : "$0.00",
        img: merch.image_url || "https://placehold.co/265x265",
        merch_type: merch.merch_type,
        artistId: merch.artist_id,
      };
    });
  }

  // Combine all products: albums, tracks, merchandise from DB, and demo products (only if no artistId)
  const allProducts = [...albumProducts, ...trackProducts, ...merchandiseProducts, ...(artistId ? [] : demoMerchProducts)];

  // Filter products by tab and view mode
  const filteredProducts = allProducts.filter((product) => {
    // First filter by tab
    let tabMatch = false;
    
    if (activeTab === "All Products") {
      tabMatch = true;
    } else if (activeTab === "Music") {
      // For tracks
      if (product.isTrack) {
        tabMatch = true;
      }
      // For albums from database, check album_type
      else if (product.album_type) {
        tabMatch = product.album_type === "digital" || product.album_type === "vinyl";
      }
      // For demo products, check type
      else {
        tabMatch = (
          product.type === "Digital Album" ||
          product.type === "Vinyl Record" ||
          product.type === "Limited Edition"
        );
      }
    } else if (activeTab === "Merchandise") {
      // For merchandise from database, check merch_type exists
      if (product.merch_type) {
        tabMatch = true;
      }
      // For demo products, filter by type
      else {
        tabMatch = (
          product.type === "Apparel" ||
          product.type === "Accessories" ||
          product.type === "Posters & Art"
        );
      }
    }
    
    if (!tabMatch) return false;
    
    // Then filter by view mode (only applies when Music tab is active)
    if (activeTab === "Music") {
      if (viewMode === "albums") {
        return product.album_type || product.type === "Digital Album" || product.type === "Vinyl Record" || product.type === "Limited Edition";
      } else if (viewMode === "tracks") {
        return product.isTrack;
      }
    }
    
    return true;
  });

  // Add to cart using CartContext
  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Helper function to determine grid columns for lg/xl
  const getMerchCardGridClass = () => {
    if (filteredProducts.length <= 1) {
      return "MerchCardDiv w-full flex flex-wrap justify-center ";
    }
    return "MerchCardDiv w-full flex flex-wrap justify-center items-stretch gap-8 lg:grid lg:grid-cols-4 xl:grid xl:grid-cols-4 ";
  };

  return (
    <>
      <div className="w-full bg-[#1a1b22] flex flex-col items-center">
        <ArtistStoreNav
          storeName={artistId ? `${artistName} Store` : "Luna Starlight Store"}
          cartCount={cart.length}
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <div className="w-full max-w-6xl px-[6%] py-[2.5rem] flex flex-col items-center gap-10">
          <ArtistStoreHeader 
            title={artistId ? `${artistName} Official Store` : "Official Music & Merchandise"}
            description={artistId ? `Support ${artistName} directly by purchasing official music releases and exclusive merchandise. All proceeds help fund future creative projects.` : "Support Luna Starlight directly by purchasing official music releases and exclusive merchandise. All proceeds help fund future creative projects."}
          />
          
          {/* Search Bar */}
          <SearchBar 
            onSearchResults={setSearchResults}
            viewMode="all"
          />
          
          {/* View Mode Toggle - Only show when Music tab is active */}
          {activeTab === "Music" && (
            <div className="flex justify-center mb-6">
              <div className="inline-flex rounded-lg bg-[#1d1e26] p-1 border-2 border-[#aa2a46]">
                <button
                  onClick={() => setViewMode("all")}
                  className={`px-6 py-2 rounded-md font-bold text-base transition-all duration-200 ${
                    viewMode === "all"
                      ? "bg-[#aa2a46] text-[#fffced] shadow-lg"
                      : "text-[#aa2a46] hover:text-[#fffced]"
                  }`}
                >
                  All Music
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
              </div>
            </div>
          )}
          {/* Cart display */}
          {cart.length > 0 && (
            <div className="w-full max-w-lg bg-[#21212b] rounded-md shadow-md p-4 mb-6">
              <h3 className="text-[#aa2a46] text-lg font-bold mb-2">
                Your Cart
              </h3>
              <ul className="mb-2">
                {cart.map((item) => (
                  <li
                    key={item.cartId}
                    className="flex justify-between items-center py-1 border-b border-[#aa2a46]/20"
                  >
                    <span className="text-white text-sm">{item.title}</span>
                    <span className="text-white text-sm">{item.price}</span>
                    <button
                      className="ml-2 px-2 py-1 bg-[#aa2a46] text-white rounded text-xs hover:bg-[#d94a6a] transition-colors"
                      onClick={() => removeFromCart(item.cartId)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-white font-bold">
                Total:{" "}
                {getCartTotal().toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
            </div>
          )}
          <div className={`${getMerchCardGridClass()}`}>
            {filteredProducts.map((item, idx) => (
              <ArtistMerchCard
                key={idx}
                {...item}
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ArtistStore;
