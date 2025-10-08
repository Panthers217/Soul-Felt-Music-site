import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useUserLogin } from "../hooks/useUserLogin.js";

const ApiDataContext = createContext();

export const useApiData = () => useContext(ApiDataContext);

export const ApiDataProvider = ({ children }) => {
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [refreshSqlViewerTable, setRefreshSqlViewerTable] = useState(false);
  const triggerRefreshSqlViewerTable = () =>
    setRefreshSqlViewerTable((prev) => !prev);

  // Mode state for admin dashboard
  const [mode, setMode] = useState("live");
  

  

  // Persist mode changes to localStorage
  useEffect(() => {
    localStorage.setItem("soulFeltMode", mode);
    console.log("Mode set to:", mode);
   
  }, [mode]);

  useEffect(() => {
    axios
      .get("/api/artists")
      .then((res) => setArtists(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching artists:", err);
      });
    axios
      .get("/api/albums")
      .then((res) => setAlbums(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching albums:", err);
      });
    axios
      .get("/api/tracks")
      .then((res) => setTracks(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching tracks:", err);
      });
    axios
      .get("/api/users")
      .then((res) => setUsers(res.data))
      .catch((err) => {
        setError(err);
        console.error("Error fetching users:", err);
      });
  }, []);

  //admin data fetch
  // Admin related state
  const [dbSnapshot, setDbSnapshot] = useState(null);
  const { user } = useUserLogin();

  useEffect(() => {
    async function fetchAdminData() {
      try {
        let config = {};
        if (user && user.getIdToken) {
          const token = await user.getIdToken();
          config.headers = { Authorization: `Bearer ${token}` };
        }
        const res = await axios.get(
          "/api/admin/tables-with-fields-records",
          config
        );
        setDbSnapshot(res.data);
        console.log("DB Snapshot:", res.data);
      } catch (err) {
        console.error("Error fetching DB snapshot:", err);
      }
    }
    fetchAdminData();
  }, [refreshSqlViewerTable, user]);

  return (
    <ApiDataContext.Provider
      value={{
        artists,
        albums,
        tracks,
        users,
        error,
        dbSnapshot,
        setDbSnapshot,
        mode,
        setMode,
        refreshSqlViewerTable,
        triggerRefreshSqlViewerTable,
      }}
    >
      {children}
    </ApiDataContext.Provider>
  );
};
