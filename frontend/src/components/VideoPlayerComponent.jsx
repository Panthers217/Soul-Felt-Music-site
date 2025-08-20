import React, { useRef, useState } from "react";

const VideoPlayerComponent = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleProgress = (e) => {
    const value = e.target.value;
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration * value) / 100;
      setProgress(value);
    }
  };

  const updateProgress = () => {
    if (videoRef.current) {
      const value =
        (videoRef.current.currentTime / videoRef.current.duration) * 100 || 0;
      setProgress(value);
    }
  };

  return (
    <div className="w-full max-w-[75rem] mx-auto bg-black rounded-lg shadow-lg p-4 flex flex-col items-center">
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          src="video.mp4"
          type="video/mp4"
          className="w-full h-full"
          onTimeUpdate={updateProgress}
          onEnded={() => setIsPlaying(false)}
        />
        {/* Overlay Controls */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 flex flex-col gap-2">
          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgress}
            className="w-full accent-[#aa2a46] h-2 rounded-lg"
          />
          {/* Play/Pause Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayPause}
              className="bg-[#aa2a46] text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-[#d94e6c] transition"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="24" height="24" fill="currentColor">
                  <rect x="6" y="5" width="4" height="14" rx="1" />
                  <rect x="14" y="5" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="24" height="24" fill="currentColor">
                  <polygon points="6,4 20,12 6,20" />
                </svg>
              )}
            </button>
            <span className="text-white text-sm font-mono">
              {videoRef.current
                ? `${Math.floor(videoRef.current.currentTime / 60)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(
                    videoRef.current.currentTime % 60
                  )
                    .toString()
                    .padStart(2, "0")}`
                : "00:00"}
              {" / "}
              {videoRef.current && videoRef.current.duration
                ? `${Math.floor(videoRef.current.duration / 60)
                    .toString()
                    .padStart(2, "0")}:${Math.floor(
                    videoRef.current.duration % 60
                  )
                    .toString()
                    .padStart(2, "0")}`
                : "00:00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerComponent;