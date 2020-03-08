const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//play and pause video
function toggleVideoStatus () {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update the play/pause Icon
function updatePlayIcon () {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
  }
}

// update the progress and timestamp
function updateProgress () {
  //getting the percentage of the video and streaming it to the range input
  progress.value = (video.currentTime / video.duration) * 100;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let seconds = Math.floor(video.currentTime % 60);
  if (seconds < 10) {
    seconds = "0" + String(seconds);
  }

  timestamp.innerHTML = `${mins} : ${seconds}`;
}

//set video progress
function setVideoProgress () {
  //setting start point on the range input
  video.currentTime = (+progress.value * video.duration) / 100;
}

//stop video
function stopVideo () {
  video.currentTime = 0;
  video.pause();
}


//event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);