// Dynamic GetMusic component

import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

/**
 * ArtistOverview.jsx
 *
 * Responsive breakpoints
 * - Mobile: default styles (320px–767px)
 * - Tablet: md: (768px–1023px)
 * - Desktop: lg: (1024px+)
 */
function GetMusic({ artistName, musicText, buttonText, supportText }) {
  return (
    <section className="mx-auto mt-6 md:mt-10 lg:mt-12 mb-16 w-[92%] md:w-[90%] lg:w-[86%]">
      <div className="rounded-xl bg-white/[0.035] ring-1 ring-white/10 p-4 md:p-6 lg:p-8">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          Get {artistName}&apos;s Music
        </h2>
        <p className="mt-3 text-sm md:text-[15px] text-white/80 xl:text-lg">
          {musicText ||
            `Stream or purchase ${artistName}'s music on your favorite platform`}
        </p>

        <div className="mt-5 md:mt-6">
          <button className="w-full md:w-[320px] rounded-md border border-white/10 bg-white/[0.03] px-4 py-4 text-sm md:text-[15px] font-medium text-white/90 hover:bg-white/[0.06]">
            {buttonText || "Stream & Purchase"}
          </button>
        </div>

        <div className="mt-6 rounded-md border border-white/10 bg-white/[0.02] p-4 md:p-5 flex items-start gap-3">
          <span className="i-lucide-flame mt-0.5" aria-hidden />
          <div>
            <p className="text-sm md:text-[15px] font-semibold text-white">
              Support Independent Music
            </p>
            <p className="mt-1 text-xs md:text-sm text-white/70 xl:text-lg">
              {supportText ||
                "When you purchase directly from artists, more of your money goes to supporting their creative work and future projects."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
// Dynamic FeaturedTracks component
function FeaturedTracks({ tracks }) {
  const [playingTrack, setPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("Featured Tracks:", tracks?.[0]?.img);

  const handleTrackClick = (idx) => {
    console.log("Clicking track:", idx, "URL:", tracks[idx]?.promo_audio_url);
    if (playingTrack === idx) {
      setIsPlaying(false);
      setTimeout(() => setPlayingTrack(null), 100);
    } else {
      setPlayingTrack(idx);
      setIsPlaying(true);
    }
  };

  return (
    <section className="mx-auto mt-6 md:mt-10 lg:mt-12 w-[92%] md:w-[90%] lg:w-[86%]">
      <div className="rounded-xl bg-white/[0.035] ring-1 ring-white/10 p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Featured Tracks
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
          {(tracks && tracks.length > 0
            ? tracks
            : [
                { title: "Track 1", artist_name: "Artist 1" },
                { title: "Track 2", artist_name: "Artist 2" },
              ]
          ).map((track, idx) => (
            <div
              key={idx}
              className="group relative bg-[#181818] rounded-lg overflow-hidden ring-1 ring-white/5 hover:bg-[#282828] transition-all duration-300"
            >
              {/* Track Image - Square Album Cover */}
              <div className="relative w-full aspect-square overflow-hidden bg-[#282828]">
                <img
                  src={
                    track.img ||
                    "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                {/* Play overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${
                    playingTrack === idx
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <button
                    onClick={() => handleTrackClick(idx)}
                    className="w-12 h-12 rounded-full bg-[#1ed760] flex items-center justify-center shadow-xl hover:scale-105 hover:bg-[#1fdf64] transition-all duration-200"
                  >
                    {playingTrack === idx && isPlaying ? (
                      <div className="flex gap-1">
                        <div className="w-1 h-4 bg-black rounded-sm"></div>
                        <div className="w-1 h-4 bg-black rounded-sm"></div>
                      </div>
                    ) : (
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-black border-b-[8px] border-b-transparent ml-1"></div>
                    )}
                  </button>
                </div>
                {/* Playing indicator */}
                {playingTrack === idx && isPlaying && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-[#1ed760] rounded-full text-black text-[10px] font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Track Info */}
              <div className="p-3">
                <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1 hover:underline cursor-pointer">
                  {track.title}
                </h3>
                <p className="text-white/60 text-xs mb-3 line-clamp-1">
                  {track.artist_name || track.artist || "Unknown Artist"}
                </p>

                {/* Audio Player - shown when playing */}
                {track.promo_audio_url && playingTrack === idx && (
                  <div className="mb-3 -mx-3 px-3 py-2 bg-black/30">
                    <ReactPlayer
                      src={track.promo_audio_url}
                      playing={isPlaying}
                      controls={true}
                      volume={0.5}
                      width="100%"
                      height="32px"
                      onEnded={() => {
                        setIsPlaying(false);
                        setPlayingTrack(null);
                      }}
                      config={{
                        file: {
                          forceAudio: true,
                          attributes: {
                            controlsList: "nodownload",
                            preload: "auto",
                          },
                        },
                      }}
                    />
                  </div>
                )}

                {/* Action Button */}
                <button className="w-full py-2 px-3 bg-white hover:bg-white/90 rounded-full text-black text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md hover:scale-105">
                  <span className="i-lucide-shopping-cart text-xs" />
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Dynamic Influences component
function Influences({ influences }) {
  return (
    <ul className="mt-3 space-y-2 md:text-[15px] text-white/85 list-disc list-inside marker:text-white/40 text-xl">
      {(influences && influences.length > 0
        ? influences
        : ["Vangelis", "Jean-Michel Jarre", "Boards of Canada", "Aphex Twin"]
      ).map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
// Dynamic ArtistBio component
function ArtistBio({ bio }) {
  return (
    <div className="mt-4 space-y-4 text-[13.5px] leading-6 md:text-lg md:leading-7 text-white/85 xl:text-xl ">
      {bio ? bio : "No biography available."}
    </div>
  );
}
// Dynamic CareerHighlights component
function CareerHighlights({ highlights }) {
  return (
    <ul className="mt-3 space-y-2 text-sm md:text-[15px] text-white/85 list-disc list-inside marker:text-white/40 xl:text-xl">
      {(highlights && highlights.length > 0
        ? highlights
        : [
            "Grammy nomination for Best Electronic Album (2023)",
            "Headlined Synthwave Festival 2022",
            "Featured in Cyberpunk 2077 soundtrack",
            "Over 100M streams worldwide",
          ]
      ).map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-[13px] font-medium text-white/80">
    {children}
  </span>
);

// const Stat = ({ icon, children }) => (
//   <div className="flex items-center gap-2 text-white/80 text-sm md:text-[15px]">
//     <span className="i-lucide-star text-white/70" aria-hidden />
//     {children}
//   </div>
// );

function ArtistOverview() {
  const { id } = useParams();
  const { state } = useLocation(); // { art: {...}, albumImage: {...} } if navigated via Link
  const album =
    state?.art ?? JSON.parse(sessionStorage.getItem(`album:${id}`) || "null"); //This keeps the page working on reloads (until the session ends).
  const artistPics =
    state?.albumImage ??
    JSON.parse(sessionStorage.getItem(`album:${id}`) || "null"); //Fallback
  
  // Follow artist state
  const [isFollowing, setIsFollowing] = useState(false);
  
  console.log("State passed to ArtistOverview", state);
  // Use artist image_url from the artists table (passed as art.img)
  const artistImageUrl = album?.img || artistPics?.cover_photo?.urls?.regular;

  const artistName = album?.name ?? "Unknown Artist";

  // Extract bio, career_highlights, and influences from the passed artist data
  const artistBio = album?.bio || null;
  const careerHighlights = album?.career_highlights || null;
  const artistInfluences = album?.influences || null;
  console.log("Artist bio:", artistBio);
  console.log("Career highlights:", careerHighlights);
  console.log("Artist influences:", artistInfluences);
  // Parse career_highlights if it's a newline-separated string
  const parsedHighlights = careerHighlights
    ? careerHighlights.split("\n").filter((line) => line.trim())
    : null;

  // Parse influences if it's a comma-separated string
  const parsedInfluences = artistInfluences
    ? artistInfluences
        .split(",")
        .map((inf) => inf.trim())
        .filter((inf) => inf)
    : null;

  // Parse genre if it's a comma-separated string
  const genre = album?.genre
    ? album.genre
        .split(",")
        .map((g) => g.trim())
        .filter((g) => g)
    : [];

  // Extract stats with fallback values
  const rating = album?.rating || "4.8";
  const monthlyListeners = album?.monthly_listeners || "2.3M";
  const albumsReleased = album?.albums_released || "47";

  console.log("Genre parsed from database:", genre);
  console.log("Artist rating:", album);

  // Handle follow/unfollow artist
  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    // TODO: Add API call to save follow status to database
    // Example: await followArtist(album.id, !isFollowing);
    console.log(isFollowing ? "Unfollowed artist" : "Followed artist");
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0f1116] text-white">
      {/* Header block */}
      <div className="mx-auto w-[92%] md:w-[90%] lg:w-[86%]">
        {/* Mobile: image above, info below */}
        <div className="block md:hidden">
          <div className="inline-block w-80 h-80 sm:w-72 sm:h-72 mx-auto">
            <img
              src={artistImageUrl}
              alt={artistName}
              className="w-full h-full object-cover rounded-lg shadow-2xl ring-2 ring-white/10"
            />
          </div>
          <h1 className="mt-6 md:mt-8 lg:mt-10 text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            {artistName}
          </h1>
          {/* Genre pills */}
          <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2 md:gap-3">
            {genre.length > 0 ? genre.map((g, idx) => (
              <Pill key={idx}>{g}</Pill>
            )) : null}
          </div>
          {/* Stats row */}
          <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="i-lucide-star" aria-hidden />
              <span>{rating}/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="i-lucide-disc" aria-hidden />
              <span>{monthlyListeners} Monthly Listeners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="i-lucide-library" aria-hidden />
              <span>{albumsReleased} Albums Released</span>
            </div>
          </div>
          {/* CTA buttons */}
          <div className="mt-5 md:mt-6 flex items-center gap-3">
            <button className="rounded-md bg-[#d63c65] px-4 py-2 text-sm md:text-[15px] font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#d63c65]/60">
              Biography
            </button>
            <button 
              onClick={handleFollowClick}
              className={`rounded-md border px-4 py-2 text-sm md:text-[15px] font-semibold transition-all duration-200 focus:outline-none focus:ring-2 ${
                isFollowing 
                  ? 'border-white/20 bg-white/10 text-white hover:bg-white/15 focus:ring-white/30' 
                  : 'border-white/10 bg-white/[0.03] text-white/90 hover:bg-white/[0.06] focus:ring-white/20'
              }`}
            >
              <span className="flex items-center gap-2">
                {isFollowing ? (
                  <>
                    <span className="i-lucide-check text-sm" />
                    Following
                  </>
                ) : (
                  <>
                    <span className="i-lucide-user-plus text-sm" />
                    Follow Artist
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
        {/* Laptop & desktop: image wraps around info section */}
        <div className="hidden md:flex md:flex-row md:items-center md:gap-8 lg:gap-12">
          <div className="w-56 h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 flex-shrink-0">
            <img
              src={artistImageUrl}
              alt={artistName}
              className="w-full h-full object-cover rounded-lg shadow-2xl ring-2 ring-white/10"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="mt-0 text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
              {artistName}
            </h1>
            {/* Genre pills */}
            <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2 md:gap-3">
              {genre.length > 0 ? genre.map((g, idx) => (
                <Pill key={idx}>{g}</Pill>
              )) : null}
            </div>
            {/* Stats row */}
            <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="i-lucide-star" aria-hidden />
                <span>{rating}/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="i-lucide-disc" aria-hidden />
                <span>{monthlyListeners} Monthly Listeners</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="i-lucide-library" aria-hidden />
                <span>{albumsReleased} Albums Released</span>
              </div>
            </div>
            {/* CTA buttons */}
            <div className="mt-5 md:mt-6 flex items-center gap-3">
              <button className="rounded-md bg-[#d63c65] px-4 py-2 text-sm md:text-[15px] font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#d63c65]/60">
                Biography
              </button>
              <button 
                onClick={handleFollowClick}
                className={`rounded-md border px-4 py-2 text-sm md:text-[15px] font-semibold transition-all duration-200 focus:outline-none focus:ring-2 ${
                  isFollowing 
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/15 focus:ring-white/30' 
                    : 'border-white/10 bg-white/[0.03] text-white/90 hover:bg-white/[0.06] focus:ring-white/20'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isFollowing ? (
                    <>
                      <span className="i-lucide-check text-sm" />
                      Following
                    </>
                  ) : (
                    <>
                      <span className="i-lucide-user-plus text-sm" />
                      Follow Artist
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <section className="mx-auto mt-6 md:mt-10 lg:mt-12 w-[92%] md:w-[90%] lg:w-[86%] ">
        <div className="rounded-xl md:rounded-2xl bg-white/[0.035] p-4 md:p-6 lg:p-8 ring-1 ring-white/10">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            About {artistName}
          </h2>
          <ArtistBio bio={artistBio} />

          {/* Two info cards (static for now, replace with dynamic if available) */}
          <div className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-lg bg-white/[0.03] p-4 md:p-5 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">Career Highlights</h3>
              <CareerHighlights highlights={parsedHighlights} />
            </div>
            <div className="rounded-lg bg-white/[0.03] p-4 md:p-5 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">Influences</h3>
              <Influences influences={parsedInfluences} />
            </div>
          </div>
        </div>
      </section>

      <FeaturedTracks tracks={album.featured_tracks} />

      <GetMusic
        artistName={artistName}
        musicText={album.music_text}
        buttonText={album.button_text}
        supportText={album.support_text}
      />
    </div>
  );
}

export default ArtistOverview;
