const videoPlayer = document.getElementById('videoPlayer');

// List of video file paths
const playlist = [
  'videos/video1.mp4',
  //'videos/video2.mp4',
  'videos/video3.mp4',
  'videos/video4.mp4',
  'videos/video5.mp4',
  'videos/video6.mp4',
  'videos/video7.mp4',
  //'videos/video8.mp4',
  //'videos/video9.mp4'
];

let currentIndex = 0;

// Function to load and play the current video
function playVideo(index) {
  videoPlayer.src = playlist[index];
  videoPlayer.load();

  // Try to play the video, retry on failure instead of reloading
  videoPlayer.play().catch(err => {
    console.warn('Playback error. Retrying in 2 seconds:', err);
    setTimeout(() => playVideo(index), 2000); // Retry after delay
  });
}

let preloadedVideo = null;

// Function to preload the next video in the playlist
function preloadNextVideo() {
  // Remove previous preloaded video if exists
  if (preloadedVideo) {
    document.body.removeChild(preloadedVideo);
    preloadedVideo = null;
  }

  // Create and preload the next video
  preloadedVideo = document.createElement('video');
  preloadedVideo.src = playlist[(currentIndex + 1) % playlist.length];
  preloadedVideo.preload = "auto";
  preloadedVideo.style.display = "none";
  document.body.appendChild(preloadedVideo);
}

// Reload the page every 12 hours to ensure stability
setInterval(() => {
  console.log('12 hours passed. Reloading the page...');
  location.reload();
}, 43200000); // 12 hours = 43,200,000 milliseconds

// Check for new GitHub commit SHA to detect updated version
let lastCommitSHA = null;

function checkForUpdateByCommitSHA() {
  const apiURL = 'https://api.github.com/repos/karima-st/video-playlist/commits/main';

  fetch(apiURL, { cache: 'no-store' })
    .then(response => response.json())
    .then(data => {
      const latestSHA = data.sha;
      if (lastCommitSHA && latestSHA !== lastCommitSHA) {
        console.log('New version detected from GitHub. Reloading...');
        location.reload();
      }
      lastCommitSHA = latestSHA;
    })
    .catch(err => {
      console.warn('GitHub update check failed:', err);
    });
}

// Check GitHub for updates every 60 seconds
setInterval(checkForUpdateByCommitSHA, 60000);

// Start playing the first video
playVideo(currentIndex);

// Preload the next video
preloadNextVideo();

// When the video ends, play the next one and preload after switching
videoPlayer.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  playVideo(currentIndex);
  
  // Preload the next video after switching
  preloadNextVideo();
});
