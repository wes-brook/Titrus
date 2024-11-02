// components/Timer.js
import React, { useEffect, useState } from "react";
import "./Timer.css"; // Import the CSS for the Timer component
import gameStartSound from "../sounds/game-start-6104.mp3"; // Import the sound file

function Timer({ workTime, breakTime }) {
  const [time, setTime] = useState(workTime * 60); // Initial time in seconds
  const [isActive, setIsActive] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);

  // Function to play the start/stop sound
  const playSound = () => {
    const audio = new Audio(gameStartSound);
    audio.play();
  };

  useEffect(() => {
    let interval = null;

    // Timer logic
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (!isActive || time === 0) {
      clearInterval(interval);
      if (time === 0) {
        setIsActive(false);
        setIsWorkPhase(prev => !prev); // Switch to break or work phase

        // Set the next phase time
        setTime(isWorkPhase ? breakTime * 60 : workTime * 60);
        setIsActive(true); // Automatically start the next phase
        playSound(); // Play sound when phase switches
      }
    }

    return () => clearInterval(interval);
  }, [isActive, time, workTime, breakTime, isWorkPhase]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
  };

  const startTimer = () => {
    if (!isActive) {
      setTime(workTime * 60); // Reset time to initial work time if not active
      setIsActive(true); // Activate the timer
      playSound(); // Play sound when timer starts
    }
  };

  const resetTimer = () => {
    setTime(workTime * 60); // Reset time to initial work time
    setIsActive(false); // Deactivate the timer
    setIsWorkPhase(true); // Reset phase to work phase
    playSound(); // Play sound when timer resets
  };

  // Calculate the progress as a percentage
  const totalTime = isWorkPhase ? workTime * 60 : breakTime * 60;
  const progressPercentage = ((totalTime - time) / totalTime) * 100;

  return (
    <div className="timer">
      <h2>{formatTime(time)}</h2>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <button onClick={startTimer}>
        Start
      </button>
      <button onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

export default Timer;
