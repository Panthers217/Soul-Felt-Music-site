import React,{useState} from "react";
import { useParams, useLocation} from "react-router-dom";

/**
 * ArtistOverview.jsx
 *
 * Responsive breakpoints
 * - Mobile: default styles (320px–767px)
 * - Tablet: md: (768px–1023px)
 * - Desktop: lg: (1024px+)
 */

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs md:text-[13px] font-medium text-white/80">
    {children}
  </span>
);

const Stat = ({ icon, children }) => (
  <div className="flex items-center gap-2 text-white/80 text-sm md:text-[15px]">
    <span className="i-lucide-star text-white/70" aria-hidden />
    {children}
  </div>
);

function ArtistOverview() {
  const { id } = useParams();
  const { state } = useLocation();            // { album: {...} } if navigated via Link
  const album = state?.art ?? JSON.parse(sessionStorage.getItem(`album:${id}`) || "null"); //This keeps the page working on reloads (until the session ends).
  const artistPics = state?.albumImage ?? JSON.parse(sessionStorage.getItem(`album:${id}`) || "null"); //This keeps the page working on reloads (until the session ends).

  const [artistPICS,setArtistPICS] = useState(artistPics.cover_photo.urls.regular);
  
  // If user refreshed, state is gone. Fallback: fetch by ID / read from store.
  // const album = state?.album ?? albumsStore.get(id);


  // TODO: Replace with real artist data lookup
  const artistName = album.name ?? "Unknown Artist";
  const artistImage = album.img ?? "default_artist_image.jpg";
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0f1116] text-white">
     

      {/* Header block */}
      <div className="mx-auto w-[92%] md:w-[90%] lg:w-[86%]">
        {/* Mobile: image above, info below */}
        <div className="block md:hidden">
          <img
            src={artistPICS}
            alt={artistName}
            className="mx-auto lg:h-48 object-cover rounded-sm shadow-lg border-4 border-white/10"
          />
          <h1 className="mt-6 md:mt-8 lg:mt-10 text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{artistName}</h1>
          {/* Genre pills */}
          <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2 md:gap-3">
            <Pill>Electronic</Pill>
            <Pill>Synthwave</Pill>
            <Pill>Ambient</Pill>
          </div>
          {/* Stats row */}
          <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <span className="i-lucide-star" aria-hidden />
              <span>4.8/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="i-lucide-disc" aria-hidden />
              <span>2.3M Monthly Listeners</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="i-lucide-library" aria-hidden />
              <span>47 Albums Released</span>
            </div>
          </div>
          {/* CTA buttons */}
          <div className="mt-5 md:mt-6 flex items-center gap-3">
            <button className="rounded-md bg-[#d63c65] px-4 py-2 text-sm md:text-[15px] font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#d63c65]/60">
              Biography
            </button>
            <button className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-sm md:text-[15px] font-semibold text-white/90 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/20">
              Follow Artist
            </button>
          </div>
        </div>
        {/* Laptop & desktop: image wraps around info section */}
        <div className="hidden md:flex md:flex-row md:items-center md:gap-8 lg:gap-16">
          <img
            src={artistPICS}
            alt={artistName}
            className="w-40 h-40 lg:w-56 lg:h-56 rounded-full object-cover shadow-lg border-4 border-white/10 flex-shrink-0"
          />
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="mt-0 text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">{artistName}</h1>
            {/* Genre pills */}
            <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-2 md:gap-3">
              <Pill>Electronic</Pill>
              <Pill>Synthwave</Pill>
              <Pill>Ambient</Pill>
            </div>
            {/* Stats row */}
            <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="i-lucide-star" aria-hidden />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="i-lucide-disc" aria-hidden />
                <span>2.3M Monthly Listeners</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="i-lucide-library" aria-hidden />
                <span>47 Albums Released</span>
              </div>
            </div>
            {/* CTA buttons */}
            <div className="mt-5 md:mt-6 flex items-center gap-3">
              <button className="rounded-md bg-[#d63c65] px-4 py-2 text-sm md:text-[15px] font-semibold text-white shadow-sm hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#d63c65]/60">
                Biography
              </button>
              <button className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-2 text-sm md:text-[15px] font-semibold text-white/90 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/20">
                Follow Artist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About section */}
      <section className="mx-auto mt-6 md:mt-10 lg:mt-12 w-[92%] md:w-[90%] lg:w-[86%] ">
        <div className="rounded-xl md:rounded-2xl bg-white/[0.035] p-4 md:p-6 lg:p-8 ring-1 ring-white/10">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">About {artistName}</h2>
          <div className="mt-4 space-y-4 text-[13.5px] leading-6 md:text-lg md:leading-7 text-white/85 xl:text-xl ">
            {/* TODO: Replace with dynamic artist bio */}
            <p>
              {artistName} is a visionary electronic music producer and composer who has been pushing the boundaries of synthwave and ambient music for over a decade. Born in the neon-lit streets of Tokyo and raised between Los Angeles and Berlin, {artistName}&apos;s multicultural background deeply influences their ethereal soundscapes.
            </p>
            <p>
              Their music combines nostalgic 80s synthesizers with modern production techniques, creating immersive sonic journeys that transport listeners to otherworldly dimensions. {artistName}&apos;s breakthrough album "Echoes of Tomorrow" garnered critical acclaim and established them as a leading voice in the neo-synthwave movement.
            </p>
            <p>
              With over 2.3 million monthly listeners across streaming platforms and collaborations with renowned artists like Midnight Collective and Neon Dreams, {artistName} continues to evolve their sound while staying true to their cosmic aesthetic. Their live performances are legendary, featuring stunning visual displays that complement their atmospheric compositions.
            </p>
          </div>

          {/* Two info cards (static for now, replace with dynamic if available) */}
          <div className="mt-5 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-lg bg-white/[0.03] p-4 md:p-5 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">Career Highlights</h3>
              <ul className="mt-3 space-y-2 text-sm md:text-[15px] text-white/85 list-disc list-inside marker:text-white/40 xl:text-xl">
                <li>Grammy nomination for Best Electronic Album (2023)</li>
                <li>Headlined Synthwave Festival 2022</li>
                <li>Featured in Cyberpunk 2077 soundtrack</li>
                <li>Over 100M streams worldwide</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white/[0.03] p-4 md:p-5 ring-1 ring-white/10">
              <h3 className="font-semibold text-white">Influences</h3>
              <ul className="mt-3 space-y-2 md:text-[15px] text-white/85 list-disc list-inside marker:text-white/40 text-xl">
                <li>Vangelis</li>
                <li>Jean-Michel Jarre</li>
                <li>Boards of Canada</li>
                <li>Aphex Twin</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tracks (static for now, replace with dynamic if available) */}
      <section className="mx-auto mt-6 md:mt-10 lg:mt-12 w-[92%] md:w-[90%] lg:w-[86%]">
        <div className="rounded-xl bg-white/[0.035] ring-1 ring-white/10 p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Featured Tracks</h2>
            <span className="text-xs md:text-sm text-white/60">Click any track to preview</span>
          </div>
          <div className="mt-4 md:mt-6 rounded-lg bg-[#11131a] ring-1 ring-white/10 p-4 md:p-5">
            <div className="relative h-20 md:h-24 w-full rounded-md bg-white/[0.03] ring-1 ring-white/10">
              <div className="absolute right-4 bottom-4 h-6 w-6 md:h-8 md:w-8 rounded-full bg-[#d63c65]" />
            </div>
          </div>
        </div>
      </section>

      {/* Get Music (static for now, replace with dynamic if available) */}
      <section className="mx-auto mt-6 md:mt-10 lg:mt-12 mb-16 w-[92%] md:w-[90%] lg:w-[86%]">
        <div className="rounded-xl bg-white/[0.035] ring-1 ring-white/10 p-4 md:p-6 lg:p-8">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">Get {artistName}&apos;s Music</h2>
          <p className="mt-3 text-sm md:text-[15px] text-white/80 xl:text-lg">
            Stream or purchase {artistName}&apos;s music on your favorite platform
          </p>

          <div className="mt-5 md:mt-6">
            <button className="w-full md:w-[320px] rounded-md border border-white/10 bg-white/[0.03] px-4 py-4 text-sm md:text-[15px] font-medium text-white/90 hover:bg-white/[0.06]">
              Stream &amp; Purchase
            </button>
          </div>

          <div className="mt-6 rounded-md border border-white/10 bg-white/[0.02] p-4 md:p-5 flex items-start gap-3">
            <span className="i-lucide-flame mt-0.5" aria-hidden />
            <div>
              <p className="text-sm md:text-[15px] font-semibold text-white">Support Independent Music</p>
              <p className="mt-1 text-xs md:text-sm text-white/70 xl:text-lg">
                When you purchase directly from artists, more of your money goes to supporting their creative work and future projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArtistOverview;
