import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ApiDataContext = createContext();

export const useApiData = () => useContext(ApiDataContext);

export const ApiDataProvider = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/artists')
      .then(res => setArtists(res.data))
      .catch(err => {
        setError(err);
        console.error('Error fetching artists:', err);
      });
    axios.get('/api/albums')
      .then(res => setAlbums(res.data))
      .catch(err => {
        setError(err);
        console.error('Error fetching albums:', err);
      });
    axios.get('/api/tracks')
      .then(res => setTracks(res.data))
      .catch(err => {
        setError(err);
        console.error('Error fetching tracks:', err);
      });
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(err => {
        setError(err);
        console.error('Error fetching users:', err);
      });
  }, []);

  return (
    <ApiDataContext.Provider value={{ artists, albums, tracks, users, error }}>
      {children}
    </ApiDataContext.Provider>
  );
};
