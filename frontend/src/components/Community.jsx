
import React, { useState } from 'react';

// Example dynamic data (replace with API or props as needed)
const newsEvents = [
  {
    title: 'Soul Felt Music at Summer Fest 2025',
    date: 'August 28, 2025',
    description: 'Join us for live performances and exclusive artist meetups at Summer Fest! Soul Felt Music will be hosting a special showcase featuring our top artists.',
    link: '#',
  },
  {
    title: 'Community Fundraiser: Music for All',
    date: 'September 10, 2025',
    description: 'We are proud to support local music education. Attend our fundraiser and help us bring music to every child in our community.',
    link: '#',
  },
  {
    title: 'Soul Felt Music Podcast Launch',
    date: 'September 20, 2025',
    description: 'Tune in to our new podcast series featuring interviews, behind-the-scenes stories, and more from the Soul Felt Music family.',
    link: '#',
  },
];

const Community = () => {
  const [expanded, setExpanded] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);

  const handleExpand = idx => {
    setExpanded(expanded === idx ? null : idx);
  };

  const handleLearnMore = event => {
    setModalEvent(event);
  };

  const closeModal = () => setModalEvent(null);

  return (
    <section className="w-full min-h-screen bg-[#1a1b22] flex flex-col items-center py-10 px-4 md:px-12">
      <div className="w-full max-w-3xl bg-[#21212b] rounded-lg shadow-lg p-6 md:p-10 flex flex-col gap-8">
        <h2 className="text-[#fffced] text-4xl md:text-5xl font-extrabold font-['Roboto'] mb-2 drop-shadow-lg">Community News & Events</h2>
        <p className="text-[#fffced] text-lg md:text-xl lg:text-2xl xl:text-xl font-semibold font-['Roboto'] mb-6 drop-shadow">Stay up to date with the latest news and events Soul Felt Music is involved in. Join us and be part of our vibrant community!</p>
        <div className="flex flex-col gap-6">
          {newsEvents.map((event, idx) => (
            <div key={idx} className="bg-[#1d1e26] rounded-md shadow-md p-5 flex flex-col gap-2 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer" onClick={() => handleExpand(idx)}>
                <h3 className="text-[#aa2a46] text-2xl md:text-3xl font-bold font-['Public_Sans'] drop-shadow">{event.title}</h3>
                <span className="text-[#fffced] text-base md:text-lg font-semibold font-['Public_Sans'] drop-shadow-sm">{event.date}</span>
              </div>
              <p className="text-[#fffced] text-base md:text-lg font-medium font-['Public_Sans'] drop-shadow-sm">{event.description}</p>
              <button
                onClick={e => {e.stopPropagation(); handleLearnMore(event);}}
                className="text-[#aa2a46] text-base font-bold font-['Public_Sans'] underline hover:text-[#fffced] transition-colors mt-2 self-start"
              >Learn more</button>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-[#21212b] rounded-lg shadow-2xl p-8 max-w-md w-full flex flex-col gap-4">
            <h3 className="text-[#aa2a46] text-2xl font-bold font-['Public_Sans'] drop-shadow">{modalEvent.title}</h3>
            <span className="text-[#fffced] text-base font-semibold font-['Public_Sans'] drop-shadow-sm">{modalEvent.date}</span>
            <p className="text-[#fffced] text-lg font-medium font-['Public_Sans'] drop-shadow-sm">{modalEvent.description}</p>
            <button onClick={closeModal} className="mt-4 py-2 px-4 bg-[#aa2a46] text-[#fffced] rounded font-bold hover:bg-[#fffced] hover:text-[#aa2a46] transition-colors">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Community;
