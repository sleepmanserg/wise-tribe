"use strict";

/** Audio player */
var allMusic = [{
  name: "Elite",
  artist: "Deftones",
  img: "../img/covers/white-pony.jpg",
  src: "Elite"
}, {
  name: "In the End",
  artist: "Linkin Park",
  img: "../img/covers/hybrid-theory.jpg",
  src: "In the End"
}, {
  name: "Sleep Now In The Fire",
  artist: "Rage Against the Machine",
  img: "../img/covers/rage-against.jpg",
  src: "Sleep Now In The Fire"
}, {
  name: "Minerva",
  artist: "Deftones",
  img: "../img/covers/minerva.jpg",
  src: "Minerva"
}, {
  name: "Faint",
  artist: "Linkin Park",
  img: "../img/covers/meteora.jpg",
  src: "Faint"
}, {
  name: "Diamond eyes",
  artist: "Deftones",
  img: "../img/covers/diamond-eyes.jpg",
  src: "Diamond Eyes"
}, {
  name: "Renegades Of Funk",
  artist: "Rage Against the Machine",
  img: "../img/covers/renegades.jpg",
  src: "Renegades Of Funk"
}];
var playerWrapper = document.querySelector('.audio-player-wrapper');

if (playerWrapper) {
  // Load music function
  var loadMusic = function loadMusic(indexNumb) {
    trackName.innerText = allMusic[indexNumb - 1].name;
    trackArtist.innerText = allMusic[indexNumb - 1].artist;
    trackImg.src = "".concat(allMusic[indexNumb - 1].img);
    trackMain.src = "../songs/".concat(allMusic[indexNumb - 1].src, ".mp3");
    bottomControlsSongThumb.src = trackImg.src;
  };

  // Play music function
  var playMusic = function playMusic() {
    playerWrapper.classList.add('paused');
    playerProgressArea.classList.add('is-visible');
    trackMain.play();
  }; // Pause music function


  var pauseMusic = function pauseMusic() {
    playerWrapper.classList.remove('paused');
    trackMain.pause();
  }; // Next music function


  var nextMusic = function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
  }; // Prev music function


  var prevMusic = function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
  };

  var playingNow = function playingNow() {
    var _loop2 = function _loop2(j) {
      var audioTag = allPlayListItems[j].querySelector('.player-list__item-end');

      if (allPlayListItems[j].classList.contains('playing')) {
        allPlayListItems[j].classList.remove('playing');
        var adDuration = audioTag.getAttribute("t-duration");
        audioTag.innerText = adDuration;
      }

      if (allPlayListItems[j].getAttribute("li-index") == musicIndex) {
        allPlayListItems[j].classList.add('playing');
        audioTag.innerText = "playing...";
      } // allPlayListItems[j].setAttribute('onclick', "clicked(this)");


      allPlayListItems[j].addEventListener('click', function () {
        // console.log(allPlayListItems[]);
        clicked();
      });

      function clicked(element) {
        var getLiIndex = allPlayListItems[j].getAttribute('li-index');
        musicIndex = getLiIndex;
        loadMusic(musicIndex);
        playMusic();
        playingNow();
      }
    };

    for (var j = 0; j < allPlayListItems.length; j++) {
      _loop2(j);
    }
  };

  var toggleMute = function toggleMute() {
    trackMain.muted = !trackMain.muted;
  };

  var trackImg = playerWrapper.querySelector('.player-track__img img'),
      trackName = playerWrapper.querySelector('.player-controls-song-details .song-name'),
      trackArtist = playerWrapper.querySelector('.player-controls-song-details .song-media'),
      trackMain = playerWrapper.querySelector('#main-audio'),
      playPauseBtn = playerWrapper.querySelector('#play-song'),
      playerPrevBtn = playerWrapper.querySelector('#prev-song'),
      playerNextBtn = playerWrapper.querySelector('#next-song'),
      playerProgressBar = playerWrapper.querySelector('.progress_bar'),
      playerProgressArea = playerWrapper.querySelector('.progress-area'),
      playerVolumeBtn = playerWrapper.querySelector('#song-sound'),
      playerVolumeSliderContainer = playerWrapper.querySelector('.sound-input'),
      playerVolumeSlider = document.querySelector('.sound-container .sound-control'),
      bottomControlsSongThumb = document.querySelector('.player-controls-song-details img');
  var musicIndex = 1;
  window.addEventListener('load', function () {
    loadMusic(musicIndex);
    playingNow();
  });
  playPauseBtn.addEventListener('click', function () {
    var isMusicPaused = playerWrapper.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
  });
  playerNextBtn.addEventListener('click', function () {
    nextMusic();
    playingNow();
  });
  playerPrevBtn.addEventListener('click', function () {
    prevMusic();
    playingNow();
  });
  trackMain.addEventListener('timeupdate', function (e) {
    var currentTime = e.target.currentTime;
    var duration = e.target.duration;
    var musicCurrentTime = document.querySelector('.player-timer__current');
    var musicDuration = document.querySelector('.player-timer__end');
    var progressWidth = currentTime / duration * 100;
    playerProgressBar.style.width = "".concat(progressWidth, "%");
    trackMain.addEventListener('loadeddata', getData);

    if (trackMain.readyState >= 2) {
      getData();
      trackMain.volume = 0.1;
    }

    function getData() {
      var audioDuration = trackMain.duration; // Update song duration

      var totalMin = Math.floor(audioDuration / 60);
      var totalSec = Math.floor(audioDuration % 60);

      if (totalSec < 10) {
        totalSec = "0".concat(totalSec);
      }

      musicDuration.innerText = "".concat(totalMin, ":").concat(totalSec);
    } // Update song current time


    var currentMin = Math.floor(currentTime / 60);
    var currentSec = Math.floor(currentTime % 60);

    if (currentSec < 10) {
      currentSec = "0".concat(currentSec);
    }

    musicCurrentTime.innerText = "".concat(currentMin, ":").concat(currentSec);
    playerProgressBar.querySelector('span').innerText = "".concat(currentMin, ":").concat(currentSec);
  }); // Song time update on progress bar width

  playerProgressArea.addEventListener('click', function (e) {
    var progressWidthVal = playerProgressArea.clientWidth;
    var clickedOffsetX = e.offsetX;
    var songDuration = trackMain.duration;
    trackMain.currentTime = clickedOffsetX / progressWidthVal * songDuration;
    playMusic();
  });
  var repeatBtn = document.querySelector('#repeat-plist');
  var shuffleBtn = document.querySelector('#shuffle-plist');
  repeatBtn.addEventListener('click', function () {
    repeatBtn.classList.add('active');

    switch (repeatBtn.className) {
      case 'bottom-controls-btn active':
        repeatBtn.classList.remove('repeat');
        repeatBtn.classList.add('repeat-one');
        repeatBtn.setAttribute('title', 'Repeat one song');
        break;

      case 'bottom-controls-btn active repeat-one':
        repeatBtn.classList.remove('active');
        repeatBtn.classList.remove('repeat-one');
        repeatBtn.setAttribute('title', 'Playlist looped');
        break;
    }
  });
  shuffleBtn.addEventListener('click', function () {
    shuffleBtn.classList.toggle('active');
    var ranIndex = Math.floor(Math.random() * allMusic.length + 1);
    console.log(ranIndex);

    do {
      ranIndex = Math.floor(Math.random() * allMusic.length + 1);
    } while (musicIndex == ranIndex);

    musicIndex = ranIndex;
  });
  trackMain.addEventListener('ended', function () {
    switch (repeatBtn.className) {
      case 'bottom-controls-btn':
        nextMusic();
        break;

      case 'bottom-controls-btn active repeat-one':
        trackMain.currentTime = 0;
        playMusic();
        repeatBtn.classList.remove('repeat');
        repeatBtn.classList.add('repeat-one');
        repeatBtn.setAttribute('title', 'Repeat one song');
        break;
    }

    playingNow(); // let ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
    // console.log(ranIndex);
    // do {
    // 	ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
    // } while (musicIndex == ranIndex)
    // musicIndex = ranIndex;
    // playMusic();
    // switch (shuffleBtn.className) {
    // 	case 'bottom-controls-btn':
    // 		nextMusic();
    // 		playingNow();
    // 		break;
    // 	case 'bottom-controls-btn shuffle':
    // 		let ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
    // 		console.log(ranIndex);
    // 		do {
    // 			ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
    // 		} while (musicIndex == ranIndex)
    // 		musicIndex = ranIndex;
    // 		loadMusic(musicIndex);
    // 		playMusic();
    // 		playingNow();
    // 		break;
    // }
  });
  var playList = document.querySelector('.player-list');

  var _loop = function _loop(i) {
    var audioClassName = capitalizeFirstLetter(allMusic[i].artist.split(" ").join("") + allMusic[i].src.split(" ").join(""));
    var playListItem = "<li li-index=\"".concat(i + 1, "\" class=\"player-playlist__list-item player-list__item\">\n\t\t\t<div class=\"player-list__item-rating\"><img src=\"img/icons/arrow-rating.svg\"></div>\n\t\t\t<div class=\"player-list__item-img\">\n\t\t\t\t<img src=\"").concat(allMusic[i].img, "\">\n\t\t\t\t<svg class=\"play-icon\" width=\"13\" height=\"16\" viewBox=\"0 0 13 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<path opacity=\"0.8\" d=\"M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 2.12948e-06 14.7358 2.19678e-06 13.1962L2.65104e-06 2.80385C2.71834e-06 1.26425 1.66667 0.301996 3 1.0718L12 6.26795Z\" fill=\"white\"></path>\n\t\t\t\t</svg>\n\t\t\t\t<svg class=\"pause-icon\" width=\"8\" height=\"10\" viewBox=\"0 0 8 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<g opacity=\"0.9\">\n\t\t\t\t\t\t<rect x=\"0.190796\" y=\"0.428528\" width=\"2.17678\" height=\"9.14286\" rx=\"1.08839\" fill=\"white\"></rect>\n\t\t\t\t\t\t<rect x=\"5.63269\" y=\"0.428406\" width=\"2.17678\" height=\"9.14286\" rx=\"1.08839\" fill=\"white\"></rect>\n\t\t\t\t\t</g>\n\t\t\t\t</svg>\n\t\t\t</div>\n\t\t\t<div class=\"player-list__item-info\">\n\t\t\t\t<div class=\"player-list__item-artist\">").concat(allMusic[i].artist, "</div>\n\t\t\t\t<div class=\"player-list__item-media\">").concat(allMusic[i].name, "</div>\n\t\t\t</div>\n\t\t\t<audio class=\"").concat(audioClassName, "\" src=\"../songs/").concat(allMusic[i].src, ".mp3\"></audio>\n\t\t\t<div class=\"player-list__item-duration\"><span id=\"").concat(audioClassName, "\" class=\"player-list__item-end\">3:20</span></div>\n\t\t</li>");
    playList.insertAdjacentHTML("beforeend", playListItem);

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toLowerCase() + string.slice(1);
    }

    var liAudioDuration = playList.querySelector("#".concat(audioClassName));
    var liAudioTag = playList.querySelector(".".concat(audioClassName));
    liAudioTag.addEventListener('loadeddata', function () {
      var playlistAudioDuration = liAudioTag.duration; // Update song duration

      var totalMin = Math.floor(playlistAudioDuration / 60);
      var totalSec = Math.floor(playlistAudioDuration % 60);

      if (totalSec < 10) {
        totalSec = "0".concat(totalSec);
      }

      liAudioDuration.innerText = "".concat(totalMin, ":").concat(totalSec);
      liAudioDuration.setAttribute("t-duration", "".concat(totalMin, ":").concat(totalSec));
    });
  };

  for (var i = 0; i < allMusic.length; i++) {
    _loop(i);
  } // Playlist item click to play song


  var allPlayListItems = document.querySelectorAll('.player-list__item');
  playerVolumeBtn.addEventListener('click', function () {
    playerVolumeBtn.classList.toggle('active');
    toggleMute(); // playerVolumeBtn.nextElementSibling(playerVolumeSliderContainer)
    // playerVolumeSliderContainer.classList.toggle('active');
  });
  playerVolumeSlider.addEventListener('input', function (e) {
    trackMain.volume = e.target.value;
    trackMain.muted = e.target.value === 0;
  });
  trackMain.addEventListener('volumechange', function () {
    trackMain.volume;
  });
}