const videoPlayer = document.getElementById('videoPlayer');

// List of video file paths
const playlist = [
  'videos/video1.mp4',
  'videos/video4.mp4',
  'videos/video3.mp4',
  'videos/video2.mp4',
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

// Reload the page every 12 hours to ensure stability
setInterval(() => {
  console.log('12 hours passed. Reloading the page...');
  location.reload();
}, 43200000); // 12 hours = 43,200,000 milliseconds

// Start playing the first video
playVideo(currentIndex);

// When the video ends, play the next one in the playlist
videoPlayer.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  playVideo(currentIndex);
});
