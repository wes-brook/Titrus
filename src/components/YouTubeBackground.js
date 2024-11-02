// src/components/YouTubeBackground.js
import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";
import "./YouTubeBackground.css";

// YouTube API Key
const API_KEY = "AIzaSyDU2LztcmcyHLoebwumkczZj-Xb1SDr2sI";

// Fetch video title using YouTube API
const fetchVideoTitle = async (videoId) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items[0]?.snippet.title || ""; // Use optional chaining
  } catch (error) {
    console.error("Failed to fetch video title:", error);
    return "";
  }
};

// Event Handlers
const handleMouseToggle = (overlayRef, isBright) => {
  if (overlayRef.current) {
    overlayRef.current.classList.toggle("bright", isBright);
  }
};

const handleClick = (togglePlayPause, excludedTags) => (event) => {
  // Check if the clicked target is not one of the excluded tags or its parent elements
  const isExcluded = excludedTags.includes(event.target.tagName) || event.target.closest('.excluded');

  if (!isExcluded) {
    togglePlayPause();
  }
};

const addEventListeners = (overlayRef, togglePlayPause) => {
  const excludedTags = ["BUTTON", "INPUT", "TEXTAREA"];
  const mouseEnterHandler = () => handleMouseToggle(overlayRef, true);
  const mouseLeaveHandler = () => handleMouseToggle(overlayRef, false);
  const clickHandler = handleClick(togglePlayPause, excludedTags);

  document.addEventListener("mouseenter", mouseEnterHandler);
  document.addEventListener("mouseleave", mouseLeaveHandler);
  document.addEventListener("click", clickHandler);

  // Return a cleanup function to remove event listeners
  return () => {
    document.removeEventListener("mouseenter", mouseEnterHandler);
    document.removeEventListener("mouseleave", mouseLeaveHandler);
    document.removeEventListener("click", clickHandler);
  };
};

// Main YouTubeBackground component
function YouTubeBackground({ videoId, onPause }) {
  const [title, setTitle] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const playerRef = useRef(null);
  const overlayRef = useRef(null);

  const videoOptions = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: videoId,
      mute: 0,
      rel: 0,
    },
  };

  useEffect(() => {
    const fetchTitle = async () => {
      const title = await fetchVideoTitle(videoId);
      setTitle(title);
    };
    fetchTitle();
  }, [videoId]);

  const togglePlayPause = () => {
    if (isPaused) {
      playerRef.current.playVideo();
      onPause(false);
    } else {
      playerRef.current.pauseVideo();
      onPause(true);
    }
    setIsPaused((prev) => !prev); // Toggle the paused state
  };

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
  };

  useEffect(() => {
    const cleanupEventListeners = addEventListeners(overlayRef, togglePlayPause);

    return () => {
      cleanupEventListeners();
    };
  }, [togglePlayPause]);

  return (
    <div className="youtube-background">
      <YouTube videoId={videoId} opts={videoOptions} onReady={onPlayerReady} />
      <div className="overlay" ref={overlayRef} />
      <div className="title-container">
        <p>{title}</p>
      </div>
    </div>
  );
}

export default YouTubeBackground;
