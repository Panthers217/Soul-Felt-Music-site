
import React, { useState, useRef } from 'react';

const genres = [
  { label: 'Pop', value: 'pop' },
  { label: 'Rnb', value: 'rnb' },
  { label: 'Soul', value: 'soul' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Easy Listening', value: 'easylistening' },
];

const artists = [
  {
    id: 'a1',
    name: 'Soul Felt Collective',
    bio: 'Soul Felt Collective is a group of passionate musicians blending soul, jazz, and RnB. Their music inspires and connects people through heartfelt lyrics and smooth melodies.',
    genre: 'soul',
    featured: true,
    popular: true,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=400&facepad=2',
    tracks: [
      {
        id: 't1',
        title: 'Soul Felt Anthem',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      },
      {
        id: 't2',
        title: 'Heartstrings',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      },
    ],
  },
  {
    id: 'a2',
    name: 'Pop Star',
    bio: 'Pop Star brings energetic pop hits and catchy hooks to the stage, making every show a dance party.',
    genre: 'pop',
    featured: false,
    popular: true,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400&facepad=2',
    tracks: [
      {
        id: 't3',
        title: 'Pop Vibes',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      },
    ],
  },
  {
    id: 'a3',
    name: 'Jazz Ensemble',
    bio: 'Jazz Ensemble delivers smooth jazz tunes and improvisational brilliance, perfect for relaxing evenings.',
    genre: 'jazz',
    featured: false,
    popular: false,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&facepad=2',
    tracks: [
      {
        id: 't4',
        title: 'Smooth Jazz Night',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      },
    ],
  },
  {
    id: 'a4',
    name: 'RnB Sensation',
    bio: 'RnB Sensation creates soulful RnB tracks with powerful vocals and emotional depth.',
    genre: 'rnb',
    featured: true,
    popular: false,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=400&h=400&facepad=2',
    tracks: [
      {
        id: 't5',
        title: 'RnB Groove',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      },
    ],
  },
  {
    id: 'a5',
    name: 'Chill Artist',
    bio: 'Chill Artist specializes in easy listening music, perfect for unwinding after a long day.',
    genre: 'easylistening',
    featured: false,
    popular: false,
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=400&h=400&facepad=2',
    tracks: [
      {
        id: 't6',
        title: 'Easy Listening Escape',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      },
    ],
  },
];

function Wavelength({ playing }) {
  // Use a fixed set of Tailwind height classes
  const heights = ['h-2', 'h-3', 'h-4', 'h-5'];
  return (
    <div className="flex gap-1 items-end h-6 mt-2">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded bg-[#aa2a46] transition-all duration-300 ${playing ? heights[i % heights.length] : 'h-2'} animate-pulse`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
}

function TrackCard({ track, artist, bio }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setPlaying(true);
  };
  const handlePause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };
  return (
    <div className="bg-[#1d1e26] rounded-xl shadow-lg p-6 flex flex-col items-center w-full max-w-xs min-w-[220px]">
      <h4 className="text-[#aa2a46] text-xl font-bold mb-2 font-['Public_Sans'] text-center">{track.title}</h4>
      <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
      </div>
      <div className="w-full h-16 overflow-y-auto mb-2 px-2 scrollbar-thin scrollbar-thumb-[#aa2a46] scrollbar-track-[#21212b]">
        <p className="text-[#fffced] text-sm font-medium font-['Roboto'] text-center">{bio}</p>
      </div>
      <audio ref={audioRef} src={track.url} onEnded={handlePause} />
      <div className="flex gap-4 mt-2">
        {!playing ? (
          <button onClick={handlePlay} className="px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Play</button>
        ) : (
          <button onClick={handlePause} className="px-4 py-1 bg-[#fffced] text-[#aa2a46] rounded-full font-bold hover:bg-[#aa2a46] hover:text-[#fffced] transition-colors">Stop</button>
        )}
      </div>
      <Wavelength playing={playing} />
    </div>
  );
}

const Music = () => {
  const [selectedGenre, setSelectedGenre] = useState('pop');

  const featureArtists = artists.filter(a => a.featured && a.genre === selectedGenre);
  const popularArtists = artists.filter(a => a.popular && a.genre === selectedGenre);
  const generalArtists = artists.filter(a => !a.featured && !a.popular && a.genre === selectedGenre);

  return (
    <section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-6xl bg-[#21212b] rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-10">
        <h2 className="text-[#fffced] text-4xl md:text-5xl font-extrabold font-['Roboto'] mb-2 drop-shadow-lg">Soul Felt Music</h2>
        {/* Genre Tabs */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          {genres.map(genre => (
            <button
              key={genre.value}
              onClick={() => setSelectedGenre(genre.value)}
              className={`px-5 py-2 rounded-full font-bold text-lg transition-colors border-2 border-[#aa2a46] focus:outline-none ${selectedGenre === genre.value ? 'bg-[#aa2a46] text-[#fffced]' : 'bg-[#1d1e26] text-[#aa2a46] hover:bg-[#aa2a46] hover:text-[#fffced]'}`}
            >
              {genre.label}
            </button>
          ))}
        </div>
        {/* Feature Artist Section */}
        {featureArtists.length > 0 && (
          <div>
            <h3 className="text-[#aa2a46] text-2xl font-bold mb-4 font-['Public_Sans']">Feature Artist</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {featureArtists.map(artist => (
                artist.tracks.map(track => (
                  <TrackCard key={track.id} track={track} artist={artist} bio={artist.bio} />
                ))
              ))}
            </div>
          </div>
        )}
        {/* Popular Section */}
        {popularArtists.length > 0 && (
          <div>
            <h3 className="text-[#aa2a46] text-2xl font-bold mb-4 font-['Public_Sans']">Popular</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {popularArtists.map(artist => (
                artist.tracks.map(track => (
                  <TrackCard key={track.id} track={track} artist={artist} bio={artist.bio} />
                ))
              ))}
            </div>
          </div>
        )}
        {/* General Section */}
        {generalArtists.length > 0 && (
          <div>
            <h3 className="text-[#aa2a46] text-2xl font-bold mb-4 font-['Public_Sans']">General</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              {generalArtists.map(artist => (
                artist.tracks.map(track => (
                  <TrackCard key={track.id} track={track} artist={artist} bio={artist.bio} />
                ))
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Music;
