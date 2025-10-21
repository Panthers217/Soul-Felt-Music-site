import React, { useEffect, useState } from "react";
import { useApiData } from "../context/ApiDataContext.jsx";
import ReactPlayer from "react-player";

const VideoPlayerComponent = () => {
  const { dbSnapshot } = useApiData();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playerError, setPlayerError] = useState(false);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  // Get thumbnail URL for a video
  const getThumbnailUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Handle clicking on the thumbnail/play button
  const handlePlayClick = () => {
    if (videos[currentIndex]) {
      window.open(videos[currentIndex], "_blank");
    }
  };

  // Navigate to previous video
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
    setPlayerError(false);
  };

  // Navigate to next video
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    setPlayerError(false);
  };

  useEffect(() => {
    if (dbSnapshot && dbSnapshot.videos && dbSnapshot.videos.records) {
      const videoUrls = dbSnapshot.videos.records.map((v) => v.video_url);
      setVideos(videoUrls);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [dbSnapshot]);

  const currentVideo = videos[currentIndex];
  const currentThumbnail = currentVideo ? getThumbnailUrl(currentVideo) : null;

  return (
    <div className="w-full max-w-[75rem] mx-auto bg-black rounded-lg shadow-lg p-4 flex flex-col items-center">
      {/* Video Counter */}
      {!loading && videos.length > 0 && (
        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-white text-sm">
            Video {currentIndex + 1} of {videos.length}
          </div>
        </div>
      )}

      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center w-full h-full text-white text-xl font-bold">
            Loading videos...
          </div>
        ) : videos.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-white text-xl font-bold">
            No videos available
          </div>
        ) : playerError && currentThumbnail ? (
          // Show thumbnail as fallback if ReactPlayer fails to load
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={handlePlayClick}
          >
            <img
              src={currentThumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to lower quality thumbnail if maxres doesn't exist
                e.target.src = currentThumbnail.replace(
                  "maxresdefault",
                  "hqdefault"
                );
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-red-600 bg-opacity-80 hover:bg-opacity-100 transition-all duration-300 rounded-full p-6 shadow-2xl">
                <svg
                  className="w-16 h-16 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        ) : (
          <ReactPlayer
            src={currentVideo}
            controls
            width="100%"
            height="100%"
            className="react-player"
            playing={false}
            onError={() => {
              console.error("ReactPlayer failed to load video");
              setPlayerError(true);
            }}
          />
        )}

        {/* Navigation Arrows */}
        {!loading && videos.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 transition-all duration-300 z-10"
              aria-label="Previous video"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 transition-all duration-300 z-10"
              aria-label="Next video"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {!loading && videos.length > 1 && (
        <div className="flex gap-2 mt-4">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setPlayerError(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-600 w-8"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPlayerComponent;
