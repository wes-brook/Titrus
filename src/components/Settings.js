// components/Settings.js 
import React, { useState, useEffect } from "react";
import './Settings.css';

function Settings({ workTime, setWorkTime, breakTime, setBreakTime, setVideoId }) {
  const [isHovered, setIsHovered] = useState(false);
  const [activeInput, setActiveInput] = useState(null); // Track which input is active

  useEffect(() => {
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      setActiveInput(null); // Reset active input on mouse leave
    };

    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleVideoChange = (e) => {
    const url = e.target.value;
    const videoId = url.split("v=")[1]?.split("&")[0];
    setVideoId(videoId || "dQw4w9WgXcQ");
  };

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent the default scrolling behavior
    const delta = Math.sign(e.deltaY); // Determine scroll direction
    if (activeInput === 'workTime') {
      setWorkTime((prev) => Math.max(0, prev - delta)); // Update work time
    } else if (activeInput === 'breakTime') {
      setBreakTime((prev) => Math.max(0, prev - delta)); // Update break time
    }
  };

  return (
    <div className={`settings-wrapper ${isHovered ? "show" : ""}`}>
      <div className="settings">
        <div 
          className="chat-bubble received" 
          onMouseEnter={() => setActiveInput('workTime')} 
          onMouseLeave={() => setActiveInput(null)}
          onWheel={handleWheel} // Add wheel event listener
        >
          <label className="settings-label">Work Time (minutes)</label>
          <input 
            type="number" 
            className="chat-input" 
            value={workTime} 
            onChange={(e) => setWorkTime(Number(e.target.value))} 
          />
        </div>
        <div 
          className="chat-bubble sent" 
          onMouseEnter={() => setActiveInput('breakTime')} 
          onMouseLeave={() => setActiveInput(null)}
          onWheel={handleWheel} // Add wheel event listener
        >
          <label className="settings-label">Break Time (minutes)</label>
          <input 
            type="number" 
            className="chat-input" 
            value={breakTime} 
            onChange={(e) => setBreakTime(Number(e.target.value))} 
          />
        </div>
        <div className="chat-bubble received">
          <label className="settings-label">YouTube Video URL</label>
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Paste YouTube URL" 
            onBlur={handleVideoChange} 
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
