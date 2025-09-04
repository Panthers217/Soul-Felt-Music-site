import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  trackcardImage,
  topTrackcardImage,
  trackHeaderPic,
} from "/workspaces/Soul-Felt-Music-site/frontend/src/assets/artist_mockup_pics /artistImages.js";
import bannerImage from "/workspaces/Soul-Felt-Music-site/frontend/src/assets/artist_mockup_pics /artist_banner_pic/Image+Overlay.png";

// --- DUMMY DATA ---
const countries = [
  "All countries",
  "Australia",
  "Canada",
  "France",
  "Germany",
  "Ireland",
  "Netherlands",
  "New Zealand",
  "United Kingdom",
  "USA",
];

const artistNames = [
  "Panic! At The Disco",
  "Lukas Graham",
  "Marshmello & Bastille",
  "XXXTENTACION & Lil",
  "Gucci Mane, Bruno",
  "Loud Luxury Feat.",
  "Lil Wayne",
  "Silk City & Dua Lipa",
  "Khalid",
  "Bad Bunny Feat.",
  "Dynoro & Gigi",
  "Benny Blanco, Halsey",
  "Rita Ora",
  "Ariana Grande",
  "Clean Bandit Feat.",
  "DJ Snake Feat.",
  "Don Diablo Feat.",
  "The Prince Karma",
];

const artists = artistNames.map((name, idx) => ({
  name,
  img: trackcardImage[idx],
}));

// THIS IS FOR THE SQL DEMO
const artistJsonInfo = [...artists];
export const ArtistJsonInfo = () => {
  return [...artistJsonInfo];
};

// const m = JSON.parse(JSON.stringify([...artistJsonInfo])i);
// console.log(m);



const topTracks = [
  {
    title: "Woman Like Me",
    artist: "Little Mix Feat. Nicki Minaj",
    img: topTrackcardImage[0],
  },
  {
    title: "Later Bitches",
    artist: "The Prince Karma",
    img: topTrackcardImage[1],
  },
  {
    title: "Happier",
    artist: "Marshmello & Bastille",
    img: topTrackcardImage[2],
  },
  {
    title: "ZEZE",
    artist: "Kodak Black Feat. Offset &",
    img: topTrackcardImage[3],
  },
  {
    title: "Electricity",
    artist: "Silk City & Dua Lipa Feat.",
    img: topTrackcardImage[4],
  },
  {
    title: "In My Mind",
    artist: "Dynoro & Gigi D’Agostino",
    img: topTrackcardImage[5],
  },
];
console.log("Top Track Cards", [...topTracks]);

const artistSqldemo = artistNames.map((name, idx) => ({
  name,
  artist_country: countries[idx % countries.length],
  img: trackcardImage[idx],
  track: topTracks[idx % topTracks.length]?.title || "",
  demo: true,
}));

console.log(artistSqldemo);

// --- POSITION DATA ---
const artistTabletPositions = [
  { left: 0, top: 0 },
  { left: 188, top: 0 },
  { left: 376, top: 0 },
  { left: 564, top: 0 },
  { left: 0, top: 244 },
  { left: 188, top: 244 },
  { left: 376, top: 244 },
  { left: 564, top: 244 },
  { left: 0, top: 488 },
  { left: 188, top: 488 },
  { left: 376, top: 488 },
  { left: 564, top: 488 },
  { left: 0, top: 732 },
  { left: 188, top: 732 },
  { left: 376, top: 732 },
  { left: 564, top: 732 },
  { left: 0, top: 976 },
  { left: 188, top: 976 },
];

const artistDesktopPositions = [
  { left: 0, top: 0 },
  { left: 184, top: 0 },
  { left: 368, top: 0 },
  { left: 552, top: 0 },
  { left: 0, top: 240 },
  { left: 184, top: 240 },
  { left: 368, top: 240 },
  { left: 552, top: 240 },
  { left: 0, top: 480 },
  { left: 184, top: 480 },
  { left: 368, top: 480 },
  { left: 552, top: 480 },
  { left: 0, top: 720 },
  { left: 184, top: 720 },
  { left: 368, top: 720 },
  { left: 552, top: 720 },
  { left: 0, top: 960 },
  { left: 184, top: 960 },
];

// Unsplash API call to fetch artist image by name
async function fetchArtistImage() {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const url = `https://api.unsplash.com/users/marlorouse109/collections/?client_id=${accessKey}`;
  try {
    const response = await axios.get(url);
    // Return the first image URL or null if not found
    return response.data[0] || null;
  } catch (error) {
    console.error("Unsplash API error:", error);
    return null;
  }
}

const ArtistPageComponent = () => {
  // --- INTERACTIVE STATE ---
  const [selectedCountry, setSelectedCountry] = useState("All countries");
  const [hoveredArtist, setHoveredArtist] = useState(null);
  const [trackModal, setTrackModal] = useState({ open: false, track: null });
  // Custom hook for media queries
  function useMediaQuery(query) {
    const [matches, setMatches] = React.useState(
      () => window.matchMedia(query).matches
    );

    React.useEffect(() => {
      const media = window.matchMedia(query);
      if (media.matches !== matches) setMatches(media.matches);
      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);
      return () => media.removeEventListener("change", listener);
    }, [matches, query]);

    return matches;
  }

  const [albumImage, setAlbumImage] = useState(null);
  console.log(albumImage);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await fetchArtistImage();
      setAlbumImage(imageUrl);
      console.log("Fetched image URL:", imageUrl);
    };
    fetchImage();
  }, []);
  // --- FILTER ARTISTS BY COUNTRY (dummy logic) ---
  // For demo, assign countries randomly to artists
  const artistCountryMap = React.useMemo(() => {
    const map = {};
    artists.forEach((a, i) => {
      map[a.name] = countries[i % countries.length];
    });
    return map;
  }, []);
  const filteredArtists =
    selectedCountry === "All countries"
      ? artists
      : artists.filter((a) => artistCountryMap[a.name] === selectedCountry);

  // --- REUSABLE COMPONENTS ---
  const Banner = ({ image, title, className = "" }) => (
    <div className={`relative w-full ${className}`}>
      <img
        className="w-full h-full object-cover absolute top-0 left-0"
        src={image}
        alt={title}
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zinc-900 from-10% to-black/0" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex flex-col items-start px-8">
        <div className="text-white font-bold font-['Roboto'] text-5xl md:text-7xl leading-tight">
          {title}
        </div>
      </div>
    </div>
  );

  const CountryTags = ({
    countries,
    lefts,
    topFirstRow,
    topSecondRow,
    selected,
    onSelect,
  }) => (
    <div className="relative w-full h-20">
      {countries.map((country, idx) => {
        const left = lefts[idx % lefts.length];
        const top = idx < lefts.length / 2 ? topFirstRow : topSecondRow;
        const isActive = selected === country;
        return (
          <button
            key={country}
            type="button"
            style={{ left, top, position: "absolute" }}
            className={`px-2 py-[5px] rounded-sm flex justify-center items-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:outline-none transition-all duration-150
            ${
              isActive
                ? "bg-yellow-700 text-white font-bold scale-105"
                : "bg-neutral-800 text-white/60 font-medium"
            }`}
            onClick={() => onSelect(country)}
          >
            <span className="text-sm font-['Roboto'] leading-tight">
              {country}
            </span>
          </button>
        );
      })}
    </div>
  );

  const ArtistGrid = ({
    artists,
    positions,
    cardClass = "",
    hovered,
    setHovered,
  }) => {
    return (
      <div className="relative w-full h-[1200px]">
        {artists.map((art, idx) => (
          <Link
            key={art.name}
            to={`/artist/${encodeURIComponent([art.name])}`}
            state={{ art, albumImage }}
            onClick={() =>
              sessionStorage.setItem(`album:${art.id}`, JSON.stringify(art))
            }
            style={{ ...positions[idx], position: "absolute" }}
            className={`w-44 h-60 p-4 transition-all duration-150 ${cardClass} ${
              hovered === art.name
                ? "ring-4 ring-yellow-500 scale-105 z-10"
                : ""
            }`}
            onMouseEnter={() => setHovered(art.name)}
            onMouseLeave={() => setHovered(null)}
            tabIndex={0}
            onFocus={() => setHovered(art.name)}
            onBlur={() => setHovered(null)}
          >
            <div className="rounded-[3px] flex flex-col items-center">
              <div className="h-36 w-36 relative rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={art.img}
                  alt={art.name}
                />
              </div>
              <div className="py-4 flex flex-col items-center">
                <div className="text-center text-white/60 text-base font-normal font-['Roboto']">
                  {art.name}
                </div>
                {hovered === art.name && (
                  <div className="mt-2 text-yellow-300 text-xs">
                    Country: {artistCountryMap[art.name]}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  const TopTracks = ({ tracks, headerPic, onTrackClick }) => (
    <div className="w-80 flex flex-col items-start">
      <div className="relative w-80 h-52 rounded-[3px] mb-4">
        <img
          className="w-full h-full object-cover rounded-[3px] absolute top-0 left-0"
          src={headerPic}
          alt="Top Tracks"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/25 rounded-[3px]" />
        <div className="absolute w-full h-full flex flex-col justify-center items-center p-12 z-10">
          <div className="text-center text-white text-2xl font-bold font-['Roboto'] leading-10">
            Hip-Hop Chart 100
          </div>
          <div className="text-center text-white/50 text-base font-normal font-['Roboto'] leading-normal">
            The hottest rap right now.
          </div>
        </div>
      </div>
      <div className="mb-2 text-white/60 text-base font-medium font-['Roboto']">
        Top tracks
      </div>
      <div>
        {tracks.map((track) => (
          <button
            key={track.title}
            className="w-full h-20 px-4 flex items-center mb-2 bg-transparent hover:bg-yellow-900/10 rounded transition-all duration-150 focus:outline-none"
            onClick={() => onTrackClick(track)}
          >
            <div className="w-16 h-16 rounded-[3px] overflow-hidden flex-shrink-0">
              <img
                className="w-full h-full object-cover rounded-[3px]"
                src={track.img}
                alt={track.title}
              />
            </div>
            <div className="flex-1 px-5 flex flex-col justify-center">
              <div className="text-white text-base font-medium font-['Roboto']">
                {track.title}
              </div>
              <div className="text-white/60 text-base font-normal font-['Roboto']">
                {track.artist}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // --- DESKTOP COMPONENT ---
  const ArtistDesktopPage = () => (
    <div className="w-full flex justify-center items-center bg-zinc-900 overflow-hidden">
      <div className="w-[1152px] flex flex-col items-start">
        <Banner image={bannerImage} title="Artists" className="h-72 mb-8" />
        <div className="flex flex-row w-full">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full pb-6 flex flex-row items-start">
              <div className="py-2 flex flex-col justify-center items-start">
                <div className="h-16 flex flex-col justify-start items-start">
                  <div className="text-white text-base font-normal font-['Roboto']">
                    Countries
                  </div>
                </div>
              </div>
              <div className="px-4 flex flex-col justify-center items-start w-full">
                <CountryTags
                  countries={countries}
                  lefts={[
                    4, 116.56, 204.64, 284.81, 360.1, 449.83, 4, 115.02, 231.1,
                    367.42,
                  ]}
                  topFirstRow={4}
                  topSecondRow={43}
                  selected={selectedCountry}
                  onSelect={setSelectedCountry}
                />
              </div>
            </div>
            <ArtistGrid
              artists={filteredArtists}
              positions={artistDesktopPositions}
              hovered={hoveredArtist}
              setHovered={setHoveredArtist}
            />
          </div>
          <div className="w-16" />
          <TopTracks
            tracks={topTracks}
            headerPic={trackHeaderPic}
            onTrackClick={(track) => setTrackModal({ open: true, track })}
          />
        </div>
      </div>
    </div>
  );

  // --- TABLET COMPONENT ---
  const ArtistPageTablet = () => (
    <div className="w-full bg-zinc-900 flex flex-col items-center">
      <div className="w-[768px] flex flex-col items-start">
        <Banner image={bannerImage} title="Artists" className="h-96 mb-8" />
        <div className="w-full pb-6 flex flex-row items-start">
          <div className="py-2 flex flex-col justify-center items-start">
            <div className="h-16 flex flex-col justify-start items-start">
              <div className="text-white text-base font-normal font-['Roboto']">
                Countries
              </div>
            </div>
          </div>
          <div className="px-4 flex flex-col justify-center items-start w-full">
            <CountryTags
              countries={countries}
              lefts={[
                4, 116.56, 204.64, 284.81, 360.1, 449.83, 4, 115.02, 231.1,
                367.42,
              ]}
              topFirstRow={4}
              topSecondRow={43}
              selected={selectedCountry}
              onSelect={setSelectedCountry}
            />
          </div>
        </div>
        <ArtistGrid
          artists={filteredArtists}
          positions={artistTabletPositions}
          cardClass="max-w-48"
          hovered={hoveredArtist}
          setHovered={setHoveredArtist}
        />
        <TopTracks
          tracks={topTracks}
          headerPic={trackHeaderPic}
          onTrackClick={(track) => setTrackModal({ open: true, track })}
        />
      </div>
    </div>
  );

  // --- MOBILE COMPONENT ---
  const ArtistMobilePage = () => (
    <div className="w-full max-w-[767px] min-h-screen bg-zinc-900 flex flex-col items-center overflow-x-hidden">
      <div className="w-full flex-1 flex flex-col items-center">
        <div className="w-full p-4 flex flex-col items-center">
          <Banner
            image={bannerImage}
            title="Artists"
            className="max-w-[390px] aspect-square mb-8"
          />
          <div className="w-full pb-6 flex flex-row items-start">
            <div className="py-2 flex flex-col justify-center items-start">
              <div className="h-12 flex flex-col justify-start items-start">
                <div className="text-white text-base font-normal font-['Roboto']">
                  Countries
                </div>
              </div>
            </div>
            <div className="flex-1 px-4 flex flex-col justify-center items-start">
              <div className="w-full grid grid-cols-3 gap-2">
                {countries.map((country) => (
                  <button
                    key={country}
                    type="button"
                    className={`px-2 py-[5px] rounded-sm flex justify-center items-center shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:outline-none transition-all duration-150
                    ${
                      selectedCountry === country
                        ? "bg-yellow-700 text-white font-bold scale-105"
                        : "bg-neutral-800 text-white/60 font-medium"
                    }`}
                    onClick={() => setSelectedCountry(country)}
                  >
                    <span className="text-center text-sm font-['Roboto'] leading-tight">
                      {country}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-y-2 gap-x-[1.5rem]">
            {filteredArtists.map((art) => (
              <div key={art.name} className="flex flex-col items-center p-2">
                <div className="rounded-[3px] flex flex-col items-center">
                  <div className="h-24 w-24 relative rounded-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={art.img}
                      alt={art.name}
                    />
                  </div>
                  <div className="py-2 flex flex-col items-center">
                    <div className="text-center text-white/60 text-base font-normal font-['Roboto']">
                      {art.name}
                    </div>
                    <div className="mt-1 text-yellow-300 text-xs">
                      Country: {artistCountryMap[art.name]}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <TopTracks
            tracks={topTracks}
            headerPic={trackHeaderPic}
            onTrackClick={(track) => setTrackModal({ open: true, track })}
          />
        </div>
      </div>
    </div>
  );

  // Media queries
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  // --- TRACK MODAL ---
  const TrackModal = ({ open, track, onClose }) => {
    if (!open || !track) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-zinc-900 rounded-lg shadow-lg p-8 max-w-md w-full relative">
          <button
            className="absolute top-2 right-2 text-white text-xl"
            onClick={onClose}
          >
            &times;
          </button>
          <div className="flex flex-col items-center">
            <img
              src={track.img}
              alt={track.title}
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <div className="text-white text-2xl font-bold mb-2">
              {track.title}
            </div>
            <div className="text-white/70 text-lg mb-2">{track.artist}</div>
            <div className="text-yellow-400 text-base">
              Chart position:{" "}
              {topTracks.findIndex((t) => t.title === track.title) + 1}
            </div>
            <div className="mt-4 text-white/80 text-sm">
              More info coming soon...
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {isDesktop && <ArtistDesktopPage artisImage={albumImage} />}
      {isTablet && <ArtistPageTablet artisImage={albumImage} />}
      {isMobile && <ArtistMobilePage artisImage={albumImage} />}
      <TrackModal
        open={trackModal.open}
        track={trackModal.track}
        onClose={() => setTrackModal({ open: false, track: null })}
      />
    </div>
  );
};

export default ArtistPageComponent;
