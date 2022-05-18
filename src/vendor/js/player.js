
/** Audio player */

let allMusic = [
	{
		name: "Elite",
		artist: "Deftones",
		img: "../img/covers/white-pony.jpg",
		src: "Elite"
	},
	{
		name: "In the End",
		artist: "Linkin Park",
		img: "../img/covers/hybrid-theory.jpg",
		src: "In the End"
	},
	{
		name: "Sleep Now In The Fire",
		artist: "Rage Against the Machine",
		img: "../img/covers/rage-against.jpg",
		src: "Sleep Now In The Fire"
	},
	{
		name: "Minerva",
		artist: "Deftones",
		img: "../img/covers/minerva.jpg",
		src: "Minerva"
	},
	{
		name: "Faint",
		artist: "Linkin Park",
		img: "../img/covers/meteora.jpg",
		src: "Faint"
	},
	{
		name: "Diamond eyes",
		artist: "Deftones",
		img: "../img/covers/diamond-eyes.jpg",
		src: "Diamond Eyes"
	},
	{
		name: "Renegades Of Funk",
		artist: "Rage Against the Machine",
		img: "../img/covers/renegades.jpg",
		src: "Renegades Of Funk"
	},

]

const playerWrapper = document.querySelector('.audio-player-wrapper');


if (playerWrapper) {
	const
		trackImg = playerWrapper.querySelector('.player-track__img img'),
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


	let musicIndex = 1;

	// Load music function
	function loadMusic(indexNumb) {
		trackName.innerText = allMusic[indexNumb - 1].name;
		trackArtist.innerText = allMusic[indexNumb - 1].artist;
		trackImg.src = `${allMusic[indexNumb - 1].img}`;
		trackMain.src = `../songs/${allMusic[indexNumb - 1].src}.mp3`;
		bottomControlsSongThumb.src = trackImg.src;
	}

	window.addEventListener('load', () => {
		loadMusic(musicIndex);
		playingNow();
	});

	// Play music function
	function playMusic() {
		playerWrapper.classList.add('paused');
		playerProgressArea.classList.add('is-visible');
		trackMain.play();
	}

	// Pause music function
	function pauseMusic() {
		playerWrapper.classList.remove('paused');
		trackMain.pause();
	}

	// Next music function
	function nextMusic() {
		musicIndex++;
		musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
		loadMusic(musicIndex);
		playMusic();
	}

	// Prev music function
	function prevMusic() {
		musicIndex--;
		musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
		loadMusic(musicIndex);
		playMusic();
	}

	playPauseBtn.addEventListener('click', () => {
		const isMusicPaused = playerWrapper.classList.contains('paused');
		isMusicPaused ? pauseMusic() : playMusic();
		playingNow();
	});

	playerNextBtn.addEventListener('click', () => {
		nextMusic();
		playingNow();
	});

	playerPrevBtn.addEventListener('click', () => {
		prevMusic();
		playingNow();
	});

	trackMain.addEventListener('timeupdate', (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;

		let musicCurrentTime = document.querySelector('.player-timer__current');
		let musicDuration = document.querySelector('.player-timer__end');

		let progressWidth = (currentTime / duration) * 100;
		playerProgressBar.style.width = `${progressWidth}%`;

		trackMain.addEventListener('loadeddata', getData);

		if (trackMain.readyState >= 2) {
			getData();
			trackMain.volume = 0.1;
		}

		function getData() {
			let audioDuration = trackMain.duration;
			// Update song duration
			let totalMin = Math.floor(audioDuration / 60);
			let totalSec = Math.floor(audioDuration % 60);
			if (totalSec < 10) {
				totalSec = `0${totalSec}`;
			}
			musicDuration.innerText = `${totalMin}:${totalSec}`;
		}

		// Update song current time

		let currentMin = Math.floor(currentTime / 60);
		let currentSec = Math.floor(currentTime % 60);
		if (currentSec < 10) {
			currentSec = `0${currentSec}`;
		}
		musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
		playerProgressBar.querySelector('span').innerText = `${currentMin}:${currentSec}`;


	});

	// Song time update on progress bar width

	playerProgressArea.addEventListener('click', (e) => {
		let progressWidthVal = playerProgressArea.clientWidth;
		let clickedOffsetX = e.offsetX;
		let songDuration = trackMain.duration;

		trackMain.currentTime = (clickedOffsetX / progressWidthVal) * songDuration;
		playMusic();
	});

	const repeatBtn = document.querySelector('#repeat-plist');
	const shuffleBtn = document.querySelector('#shuffle-plist');

	repeatBtn.addEventListener('click', () => {
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

	shuffleBtn.addEventListener('click', () => {
		shuffleBtn.classList.toggle('active');

		let ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
		console.log(ranIndex);
		do {
			ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
		} while (musicIndex == ranIndex)
		musicIndex = ranIndex;
	});

	trackMain.addEventListener('ended', () => {
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
		playingNow();

		// let ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
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

	let playList = document.querySelector('.player-list');

	for (let i = 0; i < allMusic.length; i++) {
		let audioClassName = capitalizeFirstLetter(allMusic[i].artist.split(" ").join("") + allMusic[i].src.split(" ").join(""));
		let playListItem =
			`<li li-index="${i + 1}" class="player-playlist__list-item player-list__item">
			<div class="player-list__item-rating"><img src="img/icons/arrow-rating.svg"></div>
			<div class="player-list__item-img">
				<img src="${allMusic[i].img}">
				<svg class="play-icon" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path opacity="0.8" d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 2.12948e-06 14.7358 2.19678e-06 13.1962L2.65104e-06 2.80385C2.71834e-06 1.26425 1.66667 0.301996 3 1.0718L12 6.26795Z" fill="white"></path>
				</svg>
				<svg class="pause-icon" width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g opacity="0.9">
						<rect x="0.190796" y="0.428528" width="2.17678" height="9.14286" rx="1.08839" fill="white"></rect>
						<rect x="5.63269" y="0.428406" width="2.17678" height="9.14286" rx="1.08839" fill="white"></rect>
					</g>
				</svg>
			</div>
			<div class="player-list__item-info">
				<div class="player-list__item-artist">${allMusic[i].artist}</div>
				<div class="player-list__item-media">${allMusic[i].name}</div>
			</div>
			<audio class="${audioClassName}" src="../songs/${allMusic[i].src}.mp3"></audio>
			<div class="player-list__item-duration"><span id="${audioClassName}" class="player-list__item-end">3:20</span></div>
		</li>`;

		playList.insertAdjacentHTML("beforeend", playListItem);

		function capitalizeFirstLetter(string) {
			return string.charAt(0).toLowerCase() + string.slice(1);
		}

		let liAudioDuration = playList.querySelector(`#${audioClassName}`);
		let liAudioTag = playList.querySelector(`.${audioClassName}`);

		liAudioTag.addEventListener('loadeddata', () => {
			let playlistAudioDuration = liAudioTag.duration;

			// Update song duration
			let totalMin = Math.floor(playlistAudioDuration / 60);
			let totalSec = Math.floor(playlistAudioDuration % 60);
			if (totalSec < 10) {
				totalSec = `0${totalSec}`;
			}
			liAudioDuration.innerText = `${totalMin}:${totalSec}`;
			liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);

		});
	}

	// Playlist item click to play song

	const allPlayListItems = document.querySelectorAll('.player-list__item');

	function playingNow() {
		for (let j = 0; j < allPlayListItems.length; j++) {
			let audioTag = allPlayListItems[j].querySelector('.player-list__item-end');
			if (allPlayListItems[j].classList.contains('playing')) {
				allPlayListItems[j].classList.remove('playing');
				let adDuration = audioTag.getAttribute("t-duration");
				audioTag.innerText = adDuration;
			}

			if (allPlayListItems[j].getAttribute("li-index") == musicIndex) {
				allPlayListItems[j].classList.add('playing');
				audioTag.innerText = "playing...";
			}
			// allPlayListItems[j].setAttribute('onclick', "clicked(this)");
			allPlayListItems[j].addEventListener('click', () => {
				// console.log(allPlayListItems[]);
				clicked();
			});
			function clicked(element) {
				let getLiIndex = allPlayListItems[j].getAttribute('li-index');
				musicIndex = getLiIndex;
				loadMusic(musicIndex);
				playMusic();
				playingNow();
			}
		}
	}

	playerVolumeBtn.addEventListener('click', () => {
		playerVolumeBtn.classList.toggle('active');
		toggleMute();
		// playerVolumeBtn.nextElementSibling(playerVolumeSliderContainer)
		// playerVolumeSliderContainer.classList.toggle('active');
	});
	playerVolumeSlider.addEventListener('input', e => {
		trackMain.volume = e.target.value;
		trackMain.muted = e.target.value === 0;
	});

	function toggleMute() {
		trackMain.muted = !trackMain.muted;
	}

	trackMain.addEventListener('volumechange', () => {
		trackMain.volume;
	});
}
