
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
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [likes, setLikes] = useState(() => {
    const obj = {};
    videosData.forEach(v => { obj[v.id] = 0; });
    return obj;
  });

  const genreVideos = videosData.filter(v => v.genre === selectedGenre);
  const featuredVideos = genreVideos.filter(v => v.featured);
  // Video player shows first featured or first genre video
  const activeGenreVideo = genreVideos.find(v => v.featured) || genreVideos[0];

  // Modal for video details/playback
  const VideoModal = ({ open, video, onClose, onLike, likes }) => {
    if (!open || !video) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
        <div className="bg-[#21212b] rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fadeIn">
          <button className="absolute top-2 right-2 text-[#fffced] text-2xl" onClick={onClose}>&times;</button>
          <div className="flex flex-col items-center">
            <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 border-4 border-[#aa2a46] shadow-lg">
              <iframe
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ borderRadius: '0.75rem' }}
              />
            </div>
            <div className="w-full flex flex-col items-center">
              <span className="text-[#fffced] text-2xl font-bold font-['Public_Sans'] mb-1">{video.title}</span>
              <span className="text-[#aa2a46] text-lg font-semibold font-['Public_Sans'] mb-2">{video.artist}</span>
              <button onClick={() => onLike(video.id)} className="mt-2 px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Like ({likes[video.id]})</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Like handler
  const handleLike = (id) => {
    setLikes(l => ({ ...l, [id]: l[id] + 1 }));
  };

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
              className={`px-5 py-2 rounded-full font-bold text-lg transition-colors border-2 border-[#aa2a46] focus:outline-none ${selectedGenre === genre.value ? 'bg-[#aa2a46] text-[#fffced] scale-105' : 'bg-[#1d1e26] text-[#aa2a46] hover:bg-[#aa2a46] hover:text-[#fffced]'}`}
              tabIndex={0}
            >
              {genre.label}
            </button>
          ))}
        </div>
        {/* Feature Section (filtered by genre) */}
        <div className="mb-8">
          <h3 className="text-[#aa2a46] text-2xl font-bold mb-4 font-['Public_Sans']">Featured {genres.find(g => g.value === selectedGenre).label} Videos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredVideos.length === 0 ? (
              <div className="text-[#fffced] text-lg font-bold">No featured videos in this genre.</div>
            ) : featuredVideos.map(video => (
              <div
                key={video.id}
                className={`bg-[#1d1e26] rounded-lg shadow-md p-4 flex flex-col items-center transition-all duration-150 ${hoveredVideo === video.id ? 'ring-4 ring-[#aa2a46] scale-105 z-10' : ''}`}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                tabIndex={0}
                onFocus={() => setHoveredVideo(video.id)}
                onBlur={() => setHoveredVideo(null)}
              >
                <img src={video.thumbnail} alt={video.title} className="rounded-lg mb-3 w-full h-48 object-cover cursor-pointer" onClick={() => { setActiveVideo(video); setModalOpen(true); }} />
                <div className="w-full flex flex-col items-center">
                  <span className="text-[#fffced] text-lg font-bold font-['Public_Sans']">{video.title}</span>
                  <span className="text-[#aa2a46] text-base font-semibold font-['Public_Sans']">{video.artist}</span>
                </div>
                <button onClick={() => { setActiveVideo(video); setModalOpen(true); }} className="mt-2 px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Play</button>
                <button onClick={() => handleLike(video.id)} className="mt-2 px-3 py-1 bg-[#fffced] text-[#aa2a46] rounded-full font-bold hover:bg-[#aa2a46] hover:text-[#fffced] transition-colors">Like ({likes[video.id]})</button>
              </div>
            ))}
          </div>
        </div>
        {/* Stylish Video Player (filtered by genre) */}
        <div className="w-full flex flex-col items-center mb-8">
          <div className="w-full max-w-2xl bg-[#1d1e26] rounded-xl shadow-xl p-4 flex flex-col items-center">
            {activeGenreVideo ? (
              <>
                <div className="w-full aspect-video rounded-lg overflow-hidden mb-4 border-4 border-[#aa2a46] shadow-lg transition-all duration-300">
                  <iframe
                    src={activeGenreVideo.url}
                    title={activeGenreVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                    style={{ borderRadius: '0.75rem' }}
                  />
                </div>
                <div className="w-full flex flex-col items-center">
                  <span className="text-[#fffced] text-xl font-bold font-['Public_Sans']">{activeGenreVideo.title}</span>
                  <span className="text-[#aa2a46] text-base font-semibold font-['Public_Sans']">{activeGenreVideo.artist}</span>
                  <button onClick={() => handleLike(activeGenreVideo.id)} className="mt-2 px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Like ({likes[activeGenreVideo.id]})</button>
                </div>
              </>
            ) : (
              <div className="text-[#fffced] text-lg font-bold">No videos in this genre.</div>
            )}
          </div>
        </div>
        {/* Genre Videos */}
        <div>
          <h3 className="text-[#aa2a46] text-2xl font-bold mb-4 font-['Public_Sans']">{genres.find(g => g.value === selectedGenre).label} Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {genreVideos.map(video => (
              <div
                key={video.id}
                className={`bg-[#1d1e26] rounded-lg shadow-md p-4 flex flex-col items-center transition-all duration-150 ${hoveredVideo === video.id ? 'ring-4 ring-[#aa2a46] scale-105 z-10' : ''}`}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                tabIndex={0}
                onFocus={() => setHoveredVideo(video.id)}
                onBlur={() => setHoveredVideo(null)}
              >
                <img src={video.thumbnail} alt={video.title} className="rounded-lg mb-3 w-full h-40 object-cover cursor-pointer" onClick={() => { setActiveVideo(video); setModalOpen(true); }} />
                <div className="w-full flex flex-col items-center">
                  <span className="text-[#fffced] text-lg font-bold font-['Public_Sans']">{video.title}</span>
                  <span className="text-[#aa2a46] text-base font-semibold font-['Public_Sans']">{video.artist}</span>
                </div>
                <button onClick={() => { setActiveVideo(video); setModalOpen(true); }} className="mt-2 px-4 py-1 bg-[#aa2a46] text-[#fffced] rounded-full font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Play</button>
                <button onClick={() => handleLike(video.id)} className="mt-2 px-3 py-1 bg-[#fffced] text-[#aa2a46] rounded-full font-bold hover:bg-[#aa2a46] hover:text-[#fffced] transition-colors">Like ({likes[video.id]})</button>
              </div>
            ))}
          </div>
        </div>
        <VideoModal open={modalOpen} video={activeVideo} onClose={() => setModalOpen(false)} onLike={handleLike} likes={likes} />
      </div>
    </section>
  );
};

export default Videos;
