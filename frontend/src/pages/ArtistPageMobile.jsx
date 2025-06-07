import React from "react";
import {trackcardImage,topTrackcardImage,trackHeaderPic} from '/workspaces/Soul-Felt-Music-site/frontend/src/assets/artist_mockup_pics /artistImages.js';
import bannerImage from "/workspaces/Soul-Felt-Music-site/frontend/src/assets/artist_mockup_pics /artist_banner_pic/Image+Overlay.png";

// --- DUMMY DATA ---
const countries = [
  "All countries", "Australia", "Canada", "France", "Germany", "Ireland",
  "Netherlands", "New Zealand", "United Kingdom", "USA"
];

const artistNames = [
  "Panic! At The Disco", "Lukas Graham", "Marshmello & Bastille", "XXXTENTACION & Lil",
  "Gucci Mane, Bruno", "Loud Luxury Feat.", "Lil Wayne", "Silk City & Dua Lipa",
  "Khalid", "Bad Bunny Feat.", "Dynoro & Gigi", "Benny Blanco, Halsey",
  "Rita Ora", "Ariana Grande", "Clean Bandit Feat.", "DJ Snake Feat.",
  "Don Diablo Feat.", "The Prince Karma"
];

const artists = artistNames.map((name, idx) => ({
  name,
  img: trackcardImage[idx] // assign image by index
}));






const artistTabletPositions = [
  { left: 0, top: 0 }, { left: 188, top: 0 }, { left: 376, top: 0 }, { left: 564, top: 0 },
  { left: 0, top: 244 }, { left: 188, top: 244 }, { left: 376, top: 244 }, { left: 564, top: 244 },
  { left: 0, top: 488 }, { left: 188, top: 488 }, { left: 376, top: 488 }, { left: 564, top: 488 },
  { left: 0, top: 732 }, { left: 188, top: 732 }, { left: 376, top: 732 }, { left: 564, top: 732 },
  { left: 0, top: 976 }, { left: 188, top: 976 }
];

const artistMobilePositions = [
  { left: 0, top: 0 }, { left: 129.98, top: 0 }, { left: 259.97, top: 0 },
  { left: 0, top: 185.99 }, { left: 129.98, top: 185.99 }, { left: 259.97, top: 185.99 },
  { left: 0, top: 371.97 }, { left: 129.98, top: 371.97 }, { left: 259.97, top: 371.97 },
  { left: 0, top: 557.96 }, { left: 129.98, top: 557.96 }, { left: 259.97, top: 557.96 },
  { left: 0, top: 743.94 }, { left: 129.98, top: 743.94 }, { left: 259.97, top: 743.94 },
  { left: 0, top: 929.93 }, { left: 129.98, top: 929.93 }, { left: 259.97, top: 929.93 }
];

const artistDesktopPositions = [
  { left: 0, top: 0 }, { left: 184, top: 0 }, { left: 368, top: 0 }, { left: 552, top: 0 },
  { left: 0, top: 240 }, { left: 184, top: 240 }, { left: 368, top: 240 }, { left: 552, top: 240 },
  { left: 0, top: 480 }, { left: 184, top: 480 }, { left: 368, top: 480 }, { left: 552, top: 480 },
  { left: 0, top: 720 }, { left: 184, top: 720 }, { left: 368, top: 720 }, { left: 552, top: 720 },
  { left: 0, top: 960 }, { left: 184, top: 960 }
];

const topTracks = [
  {
    title: "Woman Like Me",
    artist: "Little Mix Feat. Nicki Minaj",
    img: topTrackcardImage[0]
  },
  {
    title: "Later Bitches",
    artist: "The Prince Karma",
    img: topTrackcardImage[1]
  },
  {
    title: "Happier",
    artist: "Marshmello & Bastille",
    img: topTrackcardImage[2]
  },
  {
    title: "ZEZE",
    artist: "Kodak Black Feat. Offset &",
    img: topTrackcardImage[3]
  },
  {
    title: "Electricity",
    artist: "Silk City & Dua Lipa Feat.",
    img: topTrackcardImage[4]
  },
  {
    title: "In My Mind",
    artist: "Dynoro & Gigi D’Agostino",
    img: topTrackcardImage[5]
  },
];


// --- DESKTOP COMPONENT ---
const ArtistDesktopPage = () => (
  <div className="w-full inline-flex justify-start items-center gap-2.5 overflow-hidden">
    <div className="flex-1 min-h-[900px] bg-zinc-900 inline-flex flex-col justify-start items-start">
      <div className="self-stretch min-h-[900px] flex flex-col justify-start items-start">
        <div className="self-stretch bg-zinc-800 flex flex-col justify-start items-center">
          <div className="w-[1152px] max-w-[1152px] flex flex-col justify-start items-start">
            <div className="self-stretch p-8 flex flex-col justify-start items-start">
              {/* Banner */}
              <div className="self-stretch h-72 relative">
                <div className="w-[1440px] h-[720px] left-[-176px] top-[-32px] absolute">
                  <img className="w-[1440px] h-[720px] left-0 top-0 absolute" src={bannerImage} alt="Artists" />
                  <div className="w-[1440px] h-[720px] left-0 top-0 absolute bg-gradient-to-r from-zinc-900 from-10% to-black/0" />
                </div>
                <div className="w-[1088px] left-0 top-[127px] absolute inline-flex flex-col justify-start items-start">
                  <div className="self-stretch justify-start text-white text-7xl font-bold font-['Roboto'] leading-[86.40px]">Artists</div>
                </div>
              </div>
              {/* Countries */}
              <div className="self-stretch inline-flex justify-start items-start z-10">
                <div className="flex-1 self-stretch inline-flex flex-col justify-start items-center">
                  <div className="self-stretch pb-6 inline-flex justify-start items-start">
                    <div className="self-stretch py-2 inline-flex flex-col justify-center items-start">
                      <div className="h-16 flex flex-col justify-start items-start">
                        <div className="justify-start text-white text-base font-normal font-['Roboto'] leading-normal">Countries</div>
                      </div>
                    </div>
                    <div className="self-stretch px-4 inline-flex flex-col justify-center items-start">
                      <div className="w-[605.72px] h-20 relative">
                        {countries.map((country, idx) => {
                          const lefts = [4, 116.56, 204.64, 284.81, 360.10, 449.83, 4, 115.02, 231.10, 367.42];
                          const left = lefts[idx % lefts.length];
                          const top = idx < 6 ? 4 : 43;
                          return (
                            <div
                              key={country}
                              style={{ left, top }}
                              className="px-2 py-[5px] absolute bg-neutral-800 rounded-sm shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] inline-flex justify-center items-start"
                            >
                              <div className="text-center justify-start text-white/60 text-sm font-medium font-['Roboto'] leading-tight">{country}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  {/* Artists */}
                  <div className="w-[736px] h-[1200px] relative">
                    {artists.map((art, idx) => (
                      <div
                        key={art.name}
                        style={artistDesktopPositions[idx]}
                        className="w-44 h-60 max-w-44 p-4 absolute inline-flex flex-col justify-start items-start"
                      >
                        <div className="self-stretch rounded-[3px] flex flex-col justify-start items-start">
                          <div className="self-stretch h-36 relative rounded-[500px]">
                            <img className="size-36 left-0 top-0 absolute rounded-[500px]" src={art.img} alt={art.name} />
                          </div>
                          <div className="self-stretch flex-1 py-4 flex flex-col justify-center items-start">
                            <div className="self-stretch flex-1 flex flex-col justify-start items-start">
                              <div className="self-stretch h-6 flex flex-col justify-start items-center overflow-hidden">
                                <div className="self-stretch text-center justify-start text-white/60 text-base font-normal font-['Roboto'] leading-normal">{art.name}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="self-stretch pt-4 pb-8 inline-flex justify-center items-start">
                    <div className="self-stretch rounded-sm flex justify-start items-start">
                      <div className="self-stretch inline-flex flex-col justify-start items-start">
                        <div className="self-stretch px-2 py-1 bg-fuchsia-500 rounded-sm outline outline-1 outline-offset-[-1px] outline-fuchsia-500 flex flex-col justify-start items-start">
                          <div className="justify-start text-white text-base font-normal font-['Inter'] leading-normal">1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-16 self-stretch min-w-16" />
                {/* Top Tracks */}
                <div className="w-80 self-stretch inline-flex flex-col justify-start items-start">
                  <div className="self-stretch h-[815.19px] relative">
                    <div className="w-80 left-0 top-0 absolute rounded-[3px] inline-flex flex-col justify-center items-start">
                      <div className="w-80 h-52 left-0 top-0 absolute rounded-[3px]">
                        <img className="w-80 h-52 left-0 top-0 absolute rounded-[3px]" src={trackHeaderPic} alt="Top Tracks" />
                        <div className="w-80 h-52 left-0 top-0 absolute bg-black/25 rounded-[3px]" />
                      </div>
                      <div className="self-stretch flex-1 p-12 flex flex-col justify-center items-start z-10">
                        <div className="self-stretch flex-1 flex flex-col justify-start items-start">
                          <div className="self-stretch flex-1 min-h-20 pb-2 flex flex-col justify-end items-start">
                            <div className="self-stretch flex flex-col justify-start items-center">
                              <div className="self-stretch text-center justify-start text-white text-2xl font-bold font-['Roboto'] leading-10">Hip-Hop Chart<br />100</div>
                            </div>
                          </div>
                          <div className="self-stretch h-6 flex flex-col justify-start items-center overflow-hidden">
                            <div className="self-stretch text-center justify-start text-white/50 text-base font-normal font-['Roboto'] leading-normal">The hottest rap right now.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-80 left-0 top-[259px] absolute inline-flex flex-col justify-start items-start">
                      <div className="justify-start text-white/60 text-base font-medium font-['Roboto'] leading-tight">Top tracks</div>
                    </div>
                    <div className="w-80 left-[-16px] top-[287.19px] absolute inline-flex flex-col justify-center items-start">
                      {topTracks.map((track) => (
                        <div key={track.title} className="w-full h-20 max-w-80 px-4 flex flex-col justify-start items-start">
                          <div className="self-stretch px-2.5 py-3 rounded-[3px] inline-flex justify-start items-center">
                            <div className="size-16 min-w-16 relative rounded-[3px]">
                              <img className="size-16 left-0 top-0 absolute rounded-[3px]" src={track.img} alt={track.title} />
                            </div>
                            <div className="flex-1 px-5 inline-flex flex-col justify-center items-start">
                              <div className="self-stretch flex-1 flex flex-col justify-start items-start">
                                <div className="self-stretch h-6 flex flex-col justify-start items-start overflow-hidden">
                                  <div className="self-stretch justify-start text-white text-base font-medium font-['Roboto'] leading-normal">{track.title}</div>
                                </div>
                                <div className="self-stretch h-6 flex flex-col justify-start items-start overflow-hidden">
                                  <div className="self-stretch justify-start text-white/60 text-base font-normal font-['Roboto'] leading-normal">{track.artist}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* End Top Tracks */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- TABLET COMPONENT ---
const ArtistPageTablet = () => (
  <div className="w-full  bg-zinc-900 inline-flex flex-col justify-start items-start">
    <div className="self-stretch  min-h-[1536px] flex flex-col justify-start items-start">
      <div className="self-stretch p-6 flex flex-col justify-start items-start">
        {/* Banner */}
        <div className="self-stretch pt-32 pb-16 relative flex flex-col justify-start items-start">
          <div className="w-[768px] h-96 left-[-24px] top-[-24px] absolute">
            <img className="w-[768px] h-96 left-0 top-0 absolute" src={bannerImage} />
            <div className="w-[768px] h-96 left-0 top-0 absolute bg-gradient-to-r from-zinc-900 from-10% to-black/0" />
          </div>
          <div className="w-[1088px] left-0 top-[127px] absolute inline-flex flex-col justify-start items-start">
            <div className="self-stretch justify-start text-white text-5xl font-bold font-['Roboto'] leading-[57.60px]">Artists</div>
          </div>
        </div>
        {/* Countries */}
        <div className="self-stretch flex flex-col justify-start items-center z-10 ">
          <div className="self-stretch pb-6 inline-flex justify-start items-start">
            <div className="self-stretch py-2 inline-flex flex-col justify-center items-start">
              <div className="h-16 flex flex-col justify-start items-start">
                <div className="justify-start text-white text-base font-normal font-['Roboto']  leading-normal">Countries</div>
              </div>
            </div>
            <div className="self-stretch px-4 inline-flex flex-col justify-center items-start">
              <div className="w-[621.72px] h-20 relative">
                {countries.map((country, idx) => {
                  const lefts = [4, 116.56, 204.64, 284.81, 360.10, 449.83, 4, 115.02, 231.10, 367.42];
                  const left = lefts[idx % lefts.length];
                  const top = idx < 6 ? 4 : 43;
                  return (
                    <div
                      key={country}
                      style={{ left, top }}
                      className="px-2 py-[5px] absolute bg-neutral-800 rounded-sm shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] inline-flex justify-center items-start"
                    >
                      <div className="text-center justify-start text-white/60 text-sm font-medium font-['Roboto'] leading-tight">{country}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Artists */}
          <div className="w-[752px] h-[1220px] relative">
            {artists.map((art, idx) => (
              <div
                key={art.name}
                style={artistTabletPositions[idx]}
                className="w-48 h-60 max-w-48 p-4 absolute inline-flex flex-col justify-start items-start"
              >
                <div className="self-stretch rounded-[3px] flex flex-col justify-start items-start">
                  <div className="self-stretch h-40 relative rounded-[500px]">
                    <img className="size-40 left-0 top-0 absolute rounded-[500px]" src={art.img} alt={art.name} />
                  </div>
                  <div className="self-stretch flex-1 py-4 flex flex-col justify-center items-start">
                    <div className="self-stretch flex-1 flex flex-col justify-start items-start">
                      <div className="self-stretch h-6 flex flex-col justify-start items-center overflow-hidden">
                        <div className="self-stretch text-center justify-start text-white/60 text-base font-normal font-['Roboto'] leading-normal">{art.name}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Top Tracks */}
        <div className="w-80 flex flex-col justify-start items-start">
          <div className="self-stretch h-[815.19px] relative">
            <div className="w-80 left-0 top-0 absolute rounded-[3px] inline-flex flex-col justify-center items-start">
              <div className="w-80 h-52 left-0 top-0 absolute rounded-[3px]">
                <img className="w-80 h-52 left-0 top-0 absolute rounded-[3px]" src={trackHeaderPic} />
                <div className="w-80 h-52 left-0 top-0 absolute bg-black/25 rounded-[3px]" />
              </div>
              <div className="self-stretch flex-1 p-12 flex flex-col justify-center items-start z-10">
                <div className="self-stretch flex-1 flex flex-col justify-start items-start">
                  <div className="self-stretch flex-1 min-h-20 pb-2 flex flex-col justify-end items-start">
                    <div className="self-stretch flex flex-col justify-start items-center">
                      <div className="self-stretch text-center justify-start text-white text-2xl font-bold font-['Roboto'] leading-10">Hip-Hop Chart<br />100</div>
                    </div>
                  </div>
                  <div className="self-stretch h-6 flex flex-col justify-start items-center overflow-hidden">
                    <div className="self-stretch text-center justify-start text-white/50 text-base font-normal font-['Roboto'] leading-normal">The hottest rap right now.</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-80 left-0 top-[259px] absolute inline-flex flex-col justify-start items-start">
              <div className="justify-start text-white/60 text-base font-medium font-['Roboto'] leading-tight">Top tracks</div>
            </div>
            <div className="w-80 left-[-16px] top-[287.19px] absolute inline-flex flex-col justify-center items-start">
              {topTracks.map((track, idx) => (
                <div key={track.title} className="w-full h-20 max-w-80 px-4 flex flex-col justify-start items-start">
                  <div className="self-stretch px-2.5 py-3 rounded-[3px] inline-flex justify-start items-center">
                    <div className="size-16 min-w-16 relative rounded-[3px]">
                      <img className="size-16 left-0 top-0 absolute rounded-[3px]" src={track.img} alt={track.title} />
                    </div>
                    <div className="flex-1 px-5 inline-flex flex-col justify-center items-start">
                      <div className="self-stretch flex-1 flex flex-col justify-start items-start">
                        <div className="self-stretch h-6 flex flex-col justify-start items-start overflow-hidden">
                          <div className="self-stretch justify-start text-white text-base font-medium font-['Roboto'] leading-normal">{track.title}</div>
                        </div>
                        <div className="self-stretch h-6 flex flex-col justify-start items-start overflow-hidden">
                          <div className="self-stretch justify-start text-white/60 text-base font-normal font-['Roboto'] leading-normal">{track.artist}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MOBILE COMPONENT ---
const ArtistMobilePage = () => (
  <div className="w-full max-w-[767px] min-h-screen bg-zinc-900 flex flex-col items-center overflow-x-hidden">
    <div className="w-full flex-1  flex flex-col items-center">
      <div className="w-full p-4 flex flex-col items-center">
        {/* Banner */}
        <div className="w-full pt-0 pb-0 relative flex flex-col items-start">
          <div className="w-full max-w-[390px] aspect-square left-[50%] -translate-x-1/2 top-[-16px] relative">
            <img className="w-full h-full object-cover rounded-lg" src={bannerImage} alt="Artists" />
            <div className="w-full h-full absolute top-0 left-0 bg-gradient-to-r from-zinc-900 from-10% to-black/0 rounded-lg" />
          </div>
          <div className="w-full pt-[127px] absolute z-10">
            <div className="text-white text-5xl font-bold font-['Roboto'] leading-[57.60px]">Artists</div>
          </div>
        </div>
        {/* Countries */}
        <div className="w-full flex flex-col items-center">
          <div className="w-full pb-6 flex flex-row items-start">
            <div className="py-2 flex flex-col justify-center items-start">
              <div className="h-12 flex flex-col justify-start items-start">
                <div className="text-white text-base font-normal font-['Roboto'] leading-normal">Countries</div>
              </div>
            </div>
            <div className="flex-1 px-4 flex flex-col justify-center items-start">
              <div className="w-full grid grid-cols-3 gap-2">
                {countries.map((country, idx) => (
                  <div
                    key={country}
                    className="px-2 py-[5px] bg-neutral-800 rounded-sm shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex justify-center items-center"
                  >
                    <div className="text-center text-white/60 text-sm font-medium font-['Roboto'] leading-tight">{country}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Artists */}
          <div className="w-full grid grid-cols-3 gap-y-2 gap-x-[1.5rem]">
            {artists.map((art, idx) => (
              <div
                key={art.name}
                className="flex flex-col items-center p-2"
              >
                <div className="rounded-[3px] flex flex-col items-center gap-[0.01px]">
                  <div className="h-24 w-24 relative rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover rounded-full" src={art.img} alt={art.name} />
                  </div>
                  <div className="py-2 flex flex-col items-center">
                    <div className=" flex flex-col justify-center items-center overflow-hidden">
                      <div className="text-center text-white/60 text-base font-normal font-['Roboto'] leading-normal">{art.name}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Top Tracks */}
        <div className="w-full mt-8 flex flex-col items-center">
          <div className="w-full rounded-[3px] flex flex-col items-center relative">
            <div className="w-full aspect-[358/170] rounded-[3px] overflow-hidden relative">
              <img className="w-full h-full object-cover rounded-[3px]" src={trackHeaderPic} alt="Hip-Hop Chart" />
              <div className="absolute inset-0 bg-black/25 rounded-[3px]" />
            </div>
            <div className="w-full flex flex-col items-start p-6 absolute">
              <div className="w-full flex flex-col items-center">
                <div className="text-center text-white text-2xl font-bold font-['Roboto'] leading-10">Hip-Hop Chart 100</div>
                <div className="text-center text-white/50 text-base font-normal font-['Roboto'] leading-normal mt-1">The hottest rap right now.</div>
              </div>
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col items-start">
            <div className="text-white/60 text-base font-medium font-['Roboto'] leading-tight mb-2">Top tracks</div>
            {topTracks.map((track) => (
              <div key={track.title} className="w-full flex flex-row items-center px-2 py-2 rounded-[3px] mb-2 bg-neutral-900">
                <div className="w-16 h-16 rounded-[3px] overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover rounded-[3px]" src={track.img} alt={track.title} />
                </div>
                <div className="flex-1 px-4 flex flex-col justify-center">
                  <div className="text-white text-base font-medium font-['Roboto'] leading-normal">{track.title}</div>
                  <div className="text-white/60 text-base font-normal font-['Roboto'] leading-normal">{track.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export {ArtistDesktopPage, ArtistMobilePage, ArtistPageTablet };