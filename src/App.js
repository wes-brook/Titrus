// App.js
import React, { useState } from "react";
import YouTubeBackground from "./components/YouTubeBackground";
import Timer from "./components/timer";
import Footer from "./components/Footer";
import Settings from "./components/Settings";
import MessageBubble from "./components/MessageBubble"; // Import MessageBubble
import "./App.css";

function App() {
  const [workTime, setWorkTime] = useState(25); // default 25 minutes
  const [breakTime, setBreakTime] = useState(5); // default 5 minutes
  const [videoId, setVideoId] = useState("_r0vlyp33pw"); // default video (replace with any video ID)
  const [isPaused, setIsPaused] = useState(false); // New paused state

  // Define the array of messages to display
  const welcomeMessage = [
    "Hey, it's Wes! Welcome to your personalized Pomodoro timer!",
    "Double-click anywhere on the screen to play or pause your background music",
    "But like, you can use any YouTube video really...",
    "Set your work and break times and let's get started!",
  ];

  return (
    <div className="App">
      <MessageBubble messages={welcomeMessage} typingDelay={1000} clearDelay={5000} /> 
      <YouTubeBackground videoId={videoId} onPause={setIsPaused} />
      <div className="content">
        <Settings workTime={workTime} setWorkTime={setWorkTime} breakTime={breakTime} setBreakTime={setBreakTime} setVideoId={setVideoId} />
        <Timer workTime={workTime} breakTime={breakTime} isPaused={isPaused} />
      </div>
      {/*<Footer />*/}
    </div>
  );
}

export default App;
