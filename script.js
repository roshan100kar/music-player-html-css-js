const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const music = document.querySelector("audio");

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];
//check iif playing
let isplaying = false;

// Play

function playSong() {
  isplaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}
function pauseSong() {
  isplaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

// Play or Pause EvenListener

playBtn.addEventListener("click", () => (isplaying ? pauseSong() : playSong()));



//Update the dom
function loadSong(song) {

    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current song
let songIndex = 0;

//previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}


// Next song
function nextSong() {

    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();
}




// on load - select first song
loadSong(songs[songIndex]);


//Update progress and time
function updateProgressBar(e) {
    if(isplaying) {
        const {duration, currentTime } = e.srcElement;
    
        //update progress bar
       const progressPercent = (currentTime / duration) * 100;
      progress.style.width = `${progressPercent}%`;  
      //Calculate display for duration 
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if(durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
      }
      console.log('seconds', durationSeconds);
     

      if(durationSeconds) {
        durationEl.textContent = `${durationMinutes} : ${durationSeconds}`;
      }

          //Calculate display for current 
          const currentMinutes = Math.floor(currentTime / 60);
          let currentSeconds = Math.floor(currentTime % 60);
          if(currentSeconds < 10) {
              currentSeconds = `0${currentSeconds}`;
          }
          console.log('seconds', currentSeconds);
          currentTimeEl.textContent = `${currentMinutes} : ${currentSeconds}`;
    }
}
//Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate', updateProgressBar);
