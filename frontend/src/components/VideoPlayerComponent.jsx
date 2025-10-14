import React, { useEffect, useState } from "react";
import { useApiData } from "../context/ApiDataContext.jsx";
import ReactPlayer from "react-player";

const VideoPlayerComponent = () => {
  const { dbSnapshot } = useApiData();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dbSnapshot && dbSnapshot.videos && dbSnapshot.videos.records) {
      setVideos(dbSnapshot.videos.records.map((v) => v.video_url));
      setLoading(false);
    } else {
      setLoading(true);
    }
    console.log("Videos from dbSnapshot:", videos[0]);
  }, [dbSnapshot]);

  return (
    <div className="w-full max-w-[75rem] mx-auto bg-black rounded-lg shadow-lg p-4 flex flex-col items-center">
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full text-white text-xl font-bold">
            Loading video...
          </div>
        ) : (
          <ReactPlayer
            src={videos[0]} // Play the first video in the list
            controls
            width="100%"
            height="100%"
            className="react-player"
            onError={() =>
              alert("Error loading video. Please check the video URL.")
            }
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayerComponent;
