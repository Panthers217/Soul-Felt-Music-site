import React, { useState, useRef, useEffect } from 'react';

const ProjectWalkthroughVideo = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Handle drag start (mouse and touch)
  const handleDragStart = (e) => {
    e.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    
    setDragOffset({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
    setIsDragging(true);
  };

  // Handle drag move (mouse and touch)
  useEffect(() => {
    const handleDragMove = (e) => {
      if (!isDragging) return;
      
      const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
      
      const newX = clientX - dragOffset.x;
      const newY = clientY - dragOffset.y;
      
      // Keep within viewport bounds
      const maxX = window.innerWidth - (containerRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (containerRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleDragMove);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchmove', handleDragMove, { passive: false });
      document.addEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchmove', handleDragMove);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, dragOffset]);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const closeVideo = () => {
    setIsVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed z-[999] transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${isMinimized ? 'w-80' : 'w-[90vw] max-w-[600px]'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Container with shadow and rounded corners */}
      <div className="bg-[#21212b] rounded-lg shadow-2xl overflow-hidden border border-[#aa2a46]/30">
        {/* Header */}
        <div
          className="bg-gradient-to-r from-[#aa2a46] to-[#d63c65] px-4 py-3 flex items-center justify-between cursor-grab active:cursor-grabbing touch-none"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#fffced] rounded-full animate-pulse" />
            <h3 className="text-[#fffced] font-bold text-sm sm:text-base">
              🎬 Project Walkthrough
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {/* Minimize button */}
            <button
              onClick={toggleMinimize}
              className="text-[#fffced] hover:text-white transition-colors p-1 rounded hover:bg-white/10"
              aria-label={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              )}
            </button>
            {/* Close button */}
            <button
              onClick={closeVideo}
              className="text-[#fffced] hover:text-white transition-colors p-1 rounded hover:bg-white/10"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Video content */}
        {!isMinimized && (
          <div className="relative bg-black aspect-video">
            {/* Replace this with your actual video source */}
            <video
              ref={videoRef}
              className="w-full h-full"
              controls
              poster="/path-to-thumbnail.jpg"
            >
              <source src="/path-to-your-walkthrough-video.mp4" type="video/mp4" />
              {/* Alternative: YouTube embed */}
              {/* <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                title="Project Walkthrough"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              /> */}
              Your browser does not support the video tag.
            </video>
            
            {/* Overlay text for employers */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-[#fffced] text-xs sm:text-sm">
                <span className="font-bold">For Employers:</span> Quick walkthrough of Soul Felt Music's features and architecture
              </p>
            </div>
          </div>
        )}

        {/* Minimized preview */}
        {isMinimized && (
          <div className="p-3 bg-[#1a1b22]">
            <p className="text-[#fffced] text-xs">Click to expand walkthrough video</p>
          </div>
        )}
      </div>

      {/* Drag hint */}
      {!isDragging && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[#fffced]/50 text-xs whitespace-nowrap pointer-events-none">
          Drag to reposition
        </div>
      )}
    </div>
  );
};

export default ProjectWalkthroughVideo;
