import React, { createContext, useContext, useState, useEffect } from 'react';

const ApiDataContext = createContext();

export const useApiData = () => useContext(ApiDataContext);

export const ApiDataProvider = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Example fetches
    fetch('/api/artists').then(res => res.json()).then(setArtists);
    fetch('/api/albums').then(res => res.json()).then(setAlbums);
    fetch('/api/tracks').then(res => res.json()).then(setTracks);
    fetch('/api/users').then(res => res.json()).then(setUsers);
  }, []);

  return (
    <ApiDataContext.Provider value={{ artists, albums, tracks, users }}>
      {children}
    </ApiDataContext.Provider>
  );
};
