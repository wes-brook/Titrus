# Titrus | Your Personalized Pomodoro Timer | React JS

This is a customizable Pomodoro timer I made that also lets you set a YouTube video as a background to build your own unique study environment. It dynamically fetches video titles using the YouTube API, displays them in the app, and includes a "Play/Pause" button to control the video background. 

**Try it out [here](https://wes-brook.github.io/Titrus/)!**

## Table of Contents
- [Features](#features)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Prerequisites](#Prerequisites)
- [Configuration](#Configuration)
- [Installation](#installation)

## Features
- **YouTube Background Video**: Plays a YouTube video as a background with a blurred overlay.
- **Dynamic Title Fetching**: Uses the YouTube API to retrieve and display the title of the video.
- **Play/Pause Button**: Easily toggle video play/pause by clicking anywhere on the web page.

## Usage
When using the website, you can use Titrus with the following features:

1. **Start the Timer**: 
   - Launch the app and click the "Start" button to begin your Pomodoro timer
   - The timer will switch between work and break intervals as configured.

2. **Play/Pause Video**: 
   - Click anywhere on the web page to activate the "Play/Pause" to control the background video playback.

3. **Timer Configuration**:
   - To adjust work and break durations, update the `workDuration` and `breakDuration` values in the settings that appear above the timer.

4. **End of Interval**:
   - The timer will automatically switch to a break interval at the end of each work period.

Feel free to customize the video background & timer settings display to fit your ideal productivity setup.

## Technologies Used
- **React**: Frontend framework for building user interfaces.
- **JavaScript (ES6)**: Primary language for application logic.
- **CSS**: Styling for the background, title, and visualizer.
- **YouTube IFrame API**: For embedding and controlling the YouTube video.
- **YouTube Data API v3**: To fetch video titles.
- **HTML**: Structure for the app.

## Prerequisites
For if you want to develop this project on your device.

- **Node.js**: Make sure you have Node.js (version 14 or higher) installed. [Download Node.js](https://nodejs.org/)
- **YouTube Data API Key**: Required for fetching video titles. Follow the steps in [Configuration](#configuration) to set it up.

## Configuration
For if you want to develop this project on your device.

1. Obtain a YouTube Data API Key from [Google Cloud Console](https://console.cloud.google.com/).
2. Replace `YOUR_API_KEY` in `src/components/YouTubeBackground.js`:
   ```javascript
   const API_KEY = "YOUR_API_KEY";

## Installation
For if you want to develop this project on your device.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
