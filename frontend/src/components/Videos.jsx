
import React, { useState } from 'react';

const genres = [
  { label: 'Pop', value: 'pop' },
  { label: 'Rnb', value: 'rnb' },
  { label: 'Soul', value: 'soul' },
  { label: 'Jazz', value: 'jazz' },
  { label: 'Easy Listening', value: 'easylistening' },
];

const videosData = [
  {
    id: '1',
    title: 'Soul Felt Anthem',
    genre: 'soul',
    url: 'https://www.youtube.com/embed/2Vv-BfVoq4g',
    featured: true,
    artist: 'Soul Felt Collective',
    thumbnail: 'https://img.youtube.com/vi/2Vv-BfVoq4g/hqdefault.jpg',
  },
  {
    id: '2',
    title: 'Pop Vibes',
    genre: 'pop',
    url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ',
    featured: false,
    artist: 'Pop Star',
    thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
  },
  {
    id: '3',
    title: 'Smooth Jazz Night',
    genre: 'jazz',
    url: 'https://www.youtube.com/embed/DSGyEsJ17cI',
    featured: false,
    artist: 'Jazz Ensemble',
    thumbnail: 'https://img.youtube.com/vi/DSGyEsJ17cI/hqdefault.jpg',
  },
  {
    id: '4',
    title: 'RnB Groove',
    genre: 'rnb',
    url: 'https://www.youtube.com/embed/ktvTqknDobU',
    featured: true,
    artist: 'RnB Sensation',
    thumbnail: 'https://img.youtube.com/vi/ktvTqknDobU/hqdefault.jpg',
  },
  {
    id: '5',
    title: 'Easy Listening Escape',
    genre: 'easylistening',
    url: 'https://www.youtube.com/embed/09R8_2nJtjg',
    featured: false,
    artist: 'Chill Artist',
    thumbnail: 'https://img.youtube.com/vi/09R8_2nJtjg/hqdefault.jpg',
  },
];

const Videos = () => {
  const [selectedGenre, setSelectedGenre] = useState('pop');
  const [activeVideo, setActiveVideo] = useState(videosData.find(v => v.featured) || videosData[0]);

  const genreVideos = videosData.filter(v => v.genre === selectedGenre);
  const featuredVideos = videosData.filter(v => v.featured);

  return (
    <section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-5xl bg-[#21212b] rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-8">
        <h2 className="text-[#fffced] text-4xl md:text-5xl font-extrabold font-['Roboto'] mb-2 drop-shadow-lg">Soul Felt Music Videos</h2>
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
        {/* Feature Section */}
        <div className="mb-8">
          <h3 className="text-[#aa2a46] text-2xl font-bold mb-4 font-['Public_Sans']">Featured Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredVideos.map(video => (
              <div key={video.id} className="bg-[#1d1e26] rounded-lg shadow-md p-4 flex flex-col items-center">
                <img src={video.thumbnail} alt={video.title} className="rounded-lg mb-3 w-full h-48 object-cover cursor-pointer" onClick={() => setActiveVideo(video)} />
                <div className="w-full flex flex-col items-center">
                  <span className="text-[#fffced] text-lg font-bold font-['Public_Sans']">{video.title}</span>
                  <span className="text-[#aa2a46] text-base font-semibold font-['Public_Sans']">{video.artist}</span>
                </div>
                <button onClick={() => setActiveVideo(video)} className="mt-2 px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Play</button>
              </div>
            ))}
          </div>
        </div>
        {/* Stylish Video Player */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-full max-w-2xl bg-[#1d1e26] rounded-xl shadow-xl p-4 flex flex-col items-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 border-4 border-[#aa2a46] shadow-lg">
              <iframe
                src={activeVideo.url}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ borderRadius: '0.75rem' }}
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <span className="text-[#fffced] text-xl font-bold font-['Public_Sans']">{activeVideo.title}</span>
              <span className="text-[#aa2a46] text-base font-semibold font-['Public_Sans']">{activeVideo.artist}</span>
            </div>
          </div>
        </div>
        {/* Genre Videos */}
        <div>
          <h3 className="text-[#aa2a46] text-2xl font-bold mb-4 font-['Public_Sans']">{genres.find(g => g.value === selectedGenre).label} Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {genreVideos.map(video => (
              <div key={video.id} className="bg-[#1d1e26] rounded-lg shadow-md p-4 flex flex-col items-center">
                <img src={video.thumbnail} alt={video.title} className="rounded-lg mb-3 w-full h-40 object-cover cursor-pointer" onClick={() => setActiveVideo(video)} />
                <div className="w-full flex flex-col items-center">
                  <span className="text-[#fffced] text-lg font-bold font-['Public_Sans']">{video.title}</span>
                  <span className="text-[#aa2a46] text-base font-semibold font-['Public_Sans']">{video.artist}</span>
                </div>
                <button onClick={() => setActiveVideo(video)} className="mt-2 px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Play</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Videos;
