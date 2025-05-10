const videoPlayer = document.getElementById('videoPlayer');

// Specify the file names exactly as they are in the folder
const playlist = [
  'videos/video1.mp4',
  'videos/video2.mp4',
  'videos/video3.mp4',
  'videos/video4.mp4',
  'videos/video5.mp4'
];

let currentIndex = 0;

// Function to load and play the video
function playVideo(index) {
  videoPlayer.src = playlist[index];
  videoPlayer.load();
  videoPlayer.play().catch(err => {
    console.log('Error playing video:', err);
    location.reload();  // Reload the page in case of error
  });
}

// Check for new version every 60 seconds
setInterval(() => {
  fetch(window.location.href, { method: 'HEAD', cache: 'no-store' })
    .then(response => {
      if (response.ok) {
        console.log('New version detected. Reloading...');
        location.reload();
      }
    })
    .catch(err => console.log('Failed to check for updates:', err));
}, 60000); // Check every 60 seconds

// Reload the page every 12 hours (43200000 milliseconds)
setInterval(() => {
  console.log('12 hours passed. Reloading the page...');
  location.reload();
}, 43200000); // 12 hours = 43200000 milliseconds

// Start playing the first video
playVideo(currentIndex);

// Event listener for when the video ends
videoPlayer.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  playVideo(currentIndex);
});
