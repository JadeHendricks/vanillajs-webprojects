const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

//keep track of song
let songIndex = 2;

//intial load song details into DOM
loadSong(songs[songIndex]);

// update song details
function loadSong (song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

//play song
function playSong () {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
}

//pause song
function pauseSong () {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
}

//eventlisteners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// play previous song
function prevSong () {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length -1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// play next song
function nextSong () {
  songIndex++;

  if (songIndex > songs.length -1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

//update the progress of the song
function updateProgress (e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`
}

//set progress bar
function setProgress (e) {
  //gets the total width
  const width = this.clientWidth;
  //get where we are clicking
  const clickX = e.offsetX;
  const duration = audio.duration;

  //set the time
  audio.currentTime = (clickX / width) * duration;
}

//change song 
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//time/song update event
audio.addEventListener("timeupdate", updateProgress);

//click on progress bar
progressContainer.addEventListener("click", setProgress);
// song ends
audio.addEventListener("ended", nextSong);