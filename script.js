const videoPlayer = document.getElementById('videoPlayer');

// List of video file paths
const playlist = [
  'videos/video1.mp4',
  'videos/video2.mp4',
  'videos/video3.mp4',
  'videos/video4.mp4',
  'videos/video5.mp4'
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

// Function to preload the next video in the playlist
function preloadNextVideo() {
  const nextVideo = new Video();
  nextVideo.src = playlist[(currentIndex + 1) % playlist.length];
  nextVideo.preload = "auto";  // Preload the next video
}

// Reload the page every 12 hours to ensure stability
setInterval(() => {
  console.log('12 hours passed. Reloading the page...');
  location.reload();
}, 43200000); // 12 hours = 43,200,000 milliseconds

// Check for updated version by comparing Last-Modified header
let lastModifiedCached = null;

setInterval(() => {
  fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
    .then(response => {
      const lastModified = response.headers.get('Last-Modified');
      if (lastModified && lastModified !== lastModifiedCached) {
        if (lastModifiedCached !== null) {
          console.log('New version detected. Reloading...');
          location.reload();
        }
        lastModifiedCached = lastModified;
      }
    })
    .catch(err => console.log('Update check failed:', err));
}, 60000); // Check every 60 seconds

// Start playing the first video
playVideo(currentIndex);

// Preload the next video
preloadNextVideo();

// When the video ends, play the next one in the playlist
videoPlayer.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  playVideo(currentIndex);

  // Preload the next video after switching
  preloadNextVideo();
});
