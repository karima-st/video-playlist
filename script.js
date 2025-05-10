// List of video files in the playlist
const videos = [
  "videos/video1.mp4",
  "videos/video2.mp4",
  "videos/video3.mp4",
  "videos/video4.mp4",
  "videos/video5.mp4"
];

let currentVideo = 0;  // Current video index
const videoPlayer = document.getElementById("videoPlayer");  // Get the video player element

// Function to preload the next video to minimize delay when switching
function preloadNextVideo() {
  const nextVideo = new Video();
  nextVideo.src = videos[(currentVideo + 1) % videos.length];  // Preload the next video
  nextVideo.preload = "auto";  // Preload the video in advance
}

// Function to change the video
function changeVideo() {
  // Update the current video index to the next one in the array
  currentVideo = (currentVideo + 1) % videos.length;

  // Update the video source
  const videoSource = document.getElementById("videoSource");
  videoSource.src = videos[currentVideo];

  // Reload and play the new video
  videoPlayer.load();  // Reload the video element
  videoPlayer.play();  // Start playing the video

  // Preload the next video to reduce delays
  preloadNextVideo();
}

// Automatically change the video every 30 seconds (you can adjust the interval)
setInterval(changeVideo, 30000);  // 30 seconds

// Initial preload for the next video
preloadNextVideo();
