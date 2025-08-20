// import React from 'react';
// import image2 from '../assets/image 2.png';
// // then


// const albums = [
//   {
//     title: 'Daft Punk - Random Access Memories',
//     image: image2,
//   },
//   {
//     title: 'Post Malone - Better Now',
//     image: image2,
//   },
//   {
//     title: 'The Weeknd - Starboy',
//     image: image2,
//   },
//   {
//     title: 'Imagine Dragons - Evolve',
//     image: image2,
//   },
//   {
//     title: 'Unknown Album',
//     image: image2,
//   },
// ];

// export default function PopularAlbums() {
//   return (
//     <section className="bg-gradient-to-r from-slate-800 to-slate-700 py-12 px-4 text-center">
//       <h2 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-10">Popular Albums</h2>
//       <div className="flex flex-wrap justify-center items-end gap-4">
//         {albums.map((album, index) => (
//           <div
//             key={index}
//             className={`relative transition-transform duration-300 ${
//               index === 2
//                 ? 'scale-110 z-10'
//                 : 'scale-95 hover:scale-100 opacity-80 hover:opacity-100'
//             }`}
//           >
//             <img
//               src={album.image}
//               alt={album.title}
//               className="w-40 sm:w-48 md:w-56 rounded-lg shadow-lg"
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



import image2 from '../assets/image 2.png';
import React, { useState } from "react";

// Replace these with your actual album images and titles
const albums = [
  {
    title: "Album 1",
    image: image2,
    className: "z-0 w-24 md:w-36 lg:w-48 aspect-[3/4] rounded-xl shadow-lg [transform:rotateY(20deg)] -translate-x-10 opacity-70",
  },
  {
    title: "Album 2",
    image: image2,
    className: "z-10 w-28 md:w-44 lg:w-56 aspect-[1/1] rounded-2xl shadow-xl [transform:rotateY(10deg)] -translate-x-4",
  },
  {
    title: "Album 3",
    image: image2,
    className: "z-20 w-36 md:w-56 lg:w-72 aspect-[1/1] rounded-2xl shadow-2xl border-4 border-yellow-400 bg-yellow-300 [transform:rotateY(0deg)]",
  },
  {
    title: "Album 4",
    image: image2,
    className: "z-10 w-28 md:w-44 lg:w-56 aspect-[1/1] rounded-2xl shadow-xl [transform:rotateY(-10deg)] translate-x-4",
  },
  {
    title: "Album 5",
    image: image2,
    className: "z-0 w-24 md:w-36 lg:w-48 aspect-[3/4] rounded-xl shadow-lg [transform:rotateY(-20deg)] translate-x-10 opacity-70",
  },
];

const clamp = (num, min, max) => Math.max(min, Math.min(num, max));

const PopularAlbumsCarousel = () => {
  const [centerIdx, setCenterIdx] = useState(2);

  const handlePrev = () => setCenterIdx((idx) => clamp(idx - 1, 0, albums.length - 1));
  const handleNext = () => setCenterIdx((idx) => clamp(idx + 1, 0, albums.length - 1));

  // Calculate visible albums (always show 5 if possible)
  const getVisibleAlbums = () => {
    if (albums.length <= 5) return albums;
    const start = clamp(centerIdx - 2, 0, albums.length - 5);
    return albums.slice(start, start + 5);
  };

  const visibleAlbums = getVisibleAlbums();

  return (
    <section className=" w-full flex flex-col items-center py-8 bg-gradient-to-b from-[#232b2d] to-[#4d5c5f] [perspective:1000px] overflow-hidden">
      <div className="[transform:scale(1.2)] transition-transform duration-500">
        <h2 className="text-3xl md:text-5xl font-bold text-[#8b9697] mb-8 tracking-wide text-center">
        POPULAR ALBUMS
      </h2>
      <div className="relative w-full flex justify-center items-end">
        {/* Carousel Controls */}
        <button
          onClick={handlePrev}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30 transition"
          aria-label="Previous"
          disabled={centerIdx === 0}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-row justify-center items-end gap-0 md:gap-0 lg:gap-0 w-full max-w-5xl">
          {visibleAlbums.map((album, i) => (
            <img
              key={album.title}
              src={album.image}
              alt={album.title}
              className={`transition-all duration-500 ${album.className} ${
                i === 2 ? "scale-110" : "scale-100"
              }`}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center z-30 transition"
          aria-label="Next"
          disabled={centerIdx === albums.length - 1}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      </div>
      
    </section>
  );
};

export default PopularAlbumsCarousel;