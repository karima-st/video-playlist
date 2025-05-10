const videoPlayer = document.getElementById('videoPlayer');

// list of video files
const playlist = [
  'videos/video1.mp4',
  'videos/video2.mp4',
  'videos/video3.mp4',
  'videos/video4.mp4'
];

let currentIndex = 0;

function playVideo(index) {
  videoPlayer.src = playlist[index];
  videoPlayer.load();
  videoPlayer.play();
}

videoPlayer.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  playVideo(currentIndex);
});

// Start
playVideo(currentIndex);
