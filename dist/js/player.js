/** Audio player */
const trackMain = document.querySelector('.player-controls .main-audio');
let musicIndex = 1;

const getData = (playlist) => {
	let url = playlist;

	return fetch(url).then(response => response.json());
};

const init = async (url) => {
	const artistData = await getData(url);

	return await artistData.music;
};

function fetchAudioPlay() {
	fetch(trackMain.src)
		.then(response => response.blob())
		.then(blob => {
			return trackMain.play();
		})
		.catch(e => { })
};

function next(musics) {
	musicIndex++;
	musicIndex > musics.length ? musicIndex = 1 : musicIndex = musicIndex;
}

function prev(musics) {
	musicIndex--;
	musicIndex < 1 ? musicIndex = musics.length : musicIndex = musicIndex;
}

function renderViewPlaylist(i, artist, src, img, name, songId) {
	let playlist = `
		<li li-index="${i + 1}" class="player-playlist__list-item player-list__item">
			<div class="player-list__item-rating"><img src="img/icons/arrow-rating.svg"></div>
			<div class="player-list__item-img">
				<img src="${img}">
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
				<div class="player-list__item-artist">${artist}</div>
				<div class="player-list__item-media">${name}</div>
			</div>
			<audio class="${songId}" src="${src}"></audio>
			<div class="player-list__item-duration"><span id="${songId}" class="player-list__item-end">3:20</span></div>
		</li>`;

	return playlist;
}

function currentSongDuration(songId, playList) {
	let liAudioDuration = playList.querySelector(`#${songId}`);
	let liAudioTag = playList.querySelector(`.${songId}`);

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

function currentPlayingSong(allPlayListItems) {
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
	}
}










const modalAudioPlayer = async (firstOpenModal) => {
	const playerWrapper = document.querySelector('.audio-player-wrapper');
	const heroPlayerWrapper = document.querySelector('.hero');
	const playerWrapperMain = document.querySelector('[data-volume-level]');

	// if (playerWrapper) {
	const
		parentActiveSlideItem = document.querySelector('.swiper-slide-active .hero-slider__item'),
		trackImg = playerWrapper.querySelector('.player-track__img img'),
		trackName = playerWrapper.querySelector('.player-controls-song-details .song-name'),
		trackArtist = playerWrapper.querySelector('.player-controls-song-details .song-media'),
		// trackMain = heroPlayerWrapper.querySelector('.main-audio'),
		playPauseBtn = playerWrapper.querySelector('#play-song'),
		playerPrevBtn = playerWrapper.querySelector('#prev-song'),
		playerNextBtn = playerWrapper.querySelector('#next-song'),
		playerProgressBar = playerWrapper.querySelector('.progress_bar'),
		playerProgressArea = playerWrapper.querySelector('.progress-area'),
		playerVolumeBtn = playerWrapper.querySelector('#song-sound'),
		playerVolumeSlider = playerWrapper.querySelector('.sound-container .sound-control'),
		bottomControlsSongThumb = playerWrapper.querySelector('.player-controls-song-details img');

	let allMusic = await init(parentActiveSlideItem.dataset.playlist);

	renderAudioList(allMusic);

	firstOpenModal = true;

	// Load music function
	function loadMusic(indexNumb) {
		let artistInfo = allMusic[indexNumb - 1];
		trackName.innerText = artistInfo.name;
		trackArtist.innerText = artistInfo.artist;
		trackImg.src = artistInfo.img;
		if (firstOpenModal) {
			trackMain.src = artistInfo.src;
		}
		bottomControlsSongThumb.src = trackImg.src;
	}

	// Play music function
	function playMusic() {
		playerWrapper.classList.add('paused');

		if (trackMain.paused) {
			// console.log('play');
			fetchAudioPlay();
		}
	}

	// Pause music function
	function pauseMusic() {
		playerWrapper.classList.remove('paused');

		if (!trackMain.paused) {
			// console.log('pause');
			trackMain.pause();
		}
	}

	// Next music function
	function nextMusic(musics) {
		next(musics);
		loadMusic(musicIndex);
		playMusic();
	}

	// Prev music function
	function prevMusic(musics) {
		prev(musics);
		loadMusic(musicIndex);
		playMusic();
	}

	playPauseBtn.addEventListener('click', () => {
		const isMusicPaused = playerWrapper.classList.contains('paused');
		isMusicPaused ? pauseMusic() : playMusic();
		playingNow();
	});

	playerNextBtn.addEventListener('click', () => {
		nextMusic(allMusic);
		playingNow();
	});

	playerPrevBtn.addEventListener('click', () => {
		prevMusic(allMusic);
		playingNow();
	});

	trackMain.addEventListener('timeupdate', (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;

		let musicCurrentTime = document.querySelector('.audio-player-wrapper .player-timer__current');
		let musicDuration = document.querySelector('.audio-player-wrapper .player-timer__end');

		let progressWidth = (currentTime / duration) * 100;
		playerProgressBar.style.width = `${progressWidth}%`;

		trackMain.addEventListener('loadeddata', getData);

		if (trackMain.readyState >= 2) {
			getData();
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

		if (musicDuration.innerText === musicCurrentTime.innerText) {
			playerNextBtn.click();
		};

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
	// const shuffleBtn = document.querySelector('#shuffle-plist');

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

	// shuffleBtn.addEventListener('click', () => {
	// 	shuffleBtn.classList.toggle('active');

	// 	let ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
	// 	console.log(ranIndex);
	// 	do {
	// 		ranIndex = Math.floor((Math.random() * allMusic.length) + 1);
	// 	} while (musicIndex == ranIndex)
	// 	musicIndex = ranIndex;
	// });

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
	});


	function renderAudioList(musics) {
		loadMusic(musicIndex);
		playerProgressArea.classList.add('is-visible');
		let playList = document.querySelector('#player-list-modal');
		playList.innerHTML = '';

		playList.style.cssText = `
				opacity: 1;
				display: block !important;
			`;

		musics.forEach((music, i) => {
			const { artist, src, img, name, songId } = music;
			let playListItem = renderViewPlaylist(i, artist, src, img, name, songId);

			playList.insertAdjacentHTML("beforeend", playListItem);

			currentSongDuration(songId, playList);
		});
	}

	// Playlist item click to play song

	const allPlayListItems = document.querySelectorAll('.player-list__item');

	function playingNow() {
		currentPlayingSong(allPlayListItems);

		for (let j = 0; j < allPlayListItems.length; j++) {
			allPlayListItems[j].addEventListener('click', () => {
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
	setTimeout(() => {
		playingNow();
	}, 1000);

	playerVolumeBtn.addEventListener('click', () => {
		toggleMute();
	});

	function toggleMute() {
		trackMain.muted = !trackMain.muted;
	}

	playerVolumeSlider.addEventListener('input', e => {
		trackMain.volume = e.target.value;
		trackMain.muted = e.target === 0;
	});

	trackMain.addEventListener('volumechange', () => {
		playerVolumeSlider.value = trackMain.volume;
		let volumeLevel;
		if (trackMain.muted || trackMain.volume === 0) {
			playerVolumeSlider.value = 0;
			volumeLevel = 'muted';
		} else {
			volumeLevel = 'high';
		}
		playerWrapperMain.dataset.volumeLevel = volumeLevel;
	});
	// }
}




















/*~/ Hero slider audio /~*/
const heroAudioPlayer = async () => {
	const heroPlayerWrapper = document.querySelector('.hero');
	const playerWrapper = document.querySelector('.audio-player-wrapper');
	const playerWrapperMain = document.querySelector('[data-volume-level]');

	if (heroPlayerWrapper) {
		const
			parentActiveSlideItem = heroPlayerWrapper.querySelector('.swiper-slide-active .hero-slider__item'),
			trackImg = heroPlayerWrapper.querySelector('.swiper-slide-active .hero-slider__img img'),
			trackAllSlides = heroPlayerWrapper.querySelectorAll('.hero-slider__item'),
			trackName = heroPlayerWrapper.querySelector('.swiper-slide-active .hero-slider__item-name div'),
			trackControlImg = document.querySelector('.player-controls .track-img'),
			// trackMain = heroPlayerWrapper.querySelector('.hero-slider .main-audio'),
			playPauseBtnSlide = document.querySelector('.swiper-slide-active .player-play-pause-btn'),
			playPauseBtnControl = document.querySelector('.player-controls .player-play-pause-btn'),
			playerPrevBtn = document.querySelector('.player-prev-btn'),
			playerNextBtn = document.querySelector('.player-next-btn'),
			playerVolumeBtn = document.querySelector('.player-btn.sound-btn'),
			playerVolumeSlider = document.querySelector('.sound-container .sound-control');

		let artistData = await init(parentActiveSlideItem.dataset.playlist);

		function heroSliderFirstRender() {
			trackAllSlides.forEach(slide => {
				slide.children[0].children[0].src = slide.dataset.artist;
				slide.children[0].children[0].alt = slide.children[1].children[1].children[0].textContent;
			});
		};

		renderAudioList(artistData);

		// Load music function
		function loadMusic(indexNumb, musics) {
			heroSliderFirstRender();
			let artistInfo = musics[indexNumb - 1];
			trackName.innerText = artistInfo.name;
			trackImg.src = artistData[musicIndex - 1].img;
			trackImg.alt = artistInfo.artist;
			trackMain.src = artistInfo.src;
			trackControlImg.src = trackImg.src;
		}

		loadMusic(musicIndex, artistData);

		// Play music function
		function playMusic() {
			heroPlayerWrapper.classList.add('paused');
			const playerControlsSmall = document.querySelector('.player-controls');

			if (trackMain.paused) {
				console.log('play');
				playerControlsSmall.classList.add('active');
				fetchAudioPlay();
			}
		}

		// Pause music function
		function pauseMusic() {
			heroPlayerWrapper.classList.remove('paused');

			if (!trackMain.paused) {
				console.log('pause');
				trackMain.pause();
			}
		}

		// // Next music function
		function nextMusic(musics) {
			next(musics);
			loadMusic(musicIndex, artistData);
			playMusic();
		}

		// // Prev music function
		function prevMusic(musics) {
			prev(musics);
			loadMusic(musicIndex, artistData);
			playMusic();
		}

		function renderAudioList(musics) {
			let playList = document.querySelector('.player-list');
			playList.innerHTML = '';

			musics.forEach((music, i) => {
				const { artist, src, img, name, songId } = music;

				let playListItem = renderViewPlaylist(i, artist, src, img, name, songId);

				playList.insertAdjacentHTML("beforeend", playListItem);

				currentSongDuration(songId, playList);
			});
		}

		const allPlayListItems = document.querySelectorAll('.player-list__item');

		function playingNow() {
			currentPlayingSong(allPlayListItems);
		}

		function playPauseControls() {
			const isMusicPaused = heroPlayerWrapper.classList.contains('paused');
			isMusicPaused ? pauseMusic() : playMusic();
		}

		function heroSliderToggleBtnPlay() {
			playPauseBtnSlide.querySelector('.icon-play-rounded').classList.add('d-none');
			playPauseBtnSlide.querySelector('.icon-pause').classList.remove('d-none');
			playPauseBtnControl.querySelector('.play-icon').classList.add('d-none');
			playPauseBtnControl.querySelector('.pause-icon').classList.remove('d-none');
			playerWrapper.classList.add('paused');
		}

		function heroSliderToggleBtnPause() {
			playPauseBtnSlide.querySelector('.icon-play-rounded').classList.remove('d-none');
			playPauseBtnSlide.querySelector('.icon-pause').classList.add('d-none');
			playPauseBtnControl.querySelector('.play-icon').classList.remove('d-none');
			playPauseBtnControl.querySelector('.pause-icon').classList.add('d-none');
			playerWrapper.classList.remove('paused');
		}

		playPauseBtnSlide.addEventListener('click', () => {
			playPauseControls();
		});

		playPauseBtnControl.addEventListener('click', () => {
			playPauseControls();
		});

		playerNextBtn.addEventListener('click', () => {
			nextMusic(artistData);
			playingNow();
		});

		playerPrevBtn.addEventListener('click', () => {
			prevMusic(artistData);
			playingNow();
		});

		trackMain.addEventListener('playing', () => {
			heroSliderToggleBtnPlay();
		});

		trackMain.addEventListener('pause', () => {
			heroSliderToggleBtnPause();
		});

		trackMain.addEventListener('timeupdate', (e) => {
			const currentTime = e.target.currentTime;
			const duration = e.target.duration;

			let musicCurrentTime = document.querySelector('.player-timer__current');
			let musicDuration = document.querySelector('.player-timer__end');

			trackMain.addEventListener('loadeddata', getData);

			if (trackMain.readyState >= 2) {
				getData();
				// trackMain.volume = 0.1;
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

			if (musicDuration.innerText === musicCurrentTime.innerText) {
				playerNextBtn.click();
			};
		});

		playerVolumeBtn.addEventListener('click', () => {
			toggleMute();
		});

		function toggleMute() {
			trackMain.muted = !trackMain.muted;
		}

		playerVolumeSlider.addEventListener('input', e => {
			trackMain.volume = e.target.value;
			trackMain.muted = e.target === 0;
		});

		trackMain.addEventListener('volumechange', () => {
			playerVolumeSlider.value = trackMain.volume;
			let volumeLevel;
			if (trackMain.muted || trackMain.volume === 0) {
				playerVolumeSlider.value = 0;
				volumeLevel = 'muted';
			} else {
				volumeLevel = 'high';
			}
			document.body.dataset.volumeLevel = volumeLevel;
		});
	}
};

document.addEventListener('DOMContentLoaded', () => {
	const swiperMainHome = new Swiper(".hero-slider", {
		effect: "coverflow",
		slidesPerView: 'auto',
		grabCursor: true,
		// autoHeight: true,
		speed: 500,
		loop: true,
		centeredSlides: true,
		slideToClickedSlide: true,
		allowTouchMove: true,
		navigation: {
			nextEl: ".swiper-btn-next",
			prevEl: ".swiper-btn-prev"
		},
		coverflowEffect: {
			rotate: 0,
			stretch: 0,
			depth: 0,
			modifier: 3,
			slideShadows: false,
		},
		on: {
			init: function () {
				swiperHomeClassTweak(this.slides, this.activeIndex);
			},
		},
	});

	swiperMainHome.on('slideChange', function () {
		swiperHomeClassTweak(this.slides, this.activeIndex);
		swiperMainHome.updateSlidesClasses();
		const heroSliderPlayBtns = document.querySelectorAll('.hero .icon-play-rounded');
		const heroSliderPauseBtns = document.querySelectorAll('.hero .icon-pause');

		heroSliderPlayBtns.forEach(btn => {
			btn.classList.remove('d-none');
		});
		heroSliderPauseBtns.forEach(btn => {
			btn.classList.add('d-none');
		});
		document.querySelector('.hero').classList.remove('paused');

		document.querySelector('.player-controls .play-icon').classList.remove('d-none');
		document.querySelector('.player-controls .pause-icon').classList.add('d-none');
		heroAudioPlayer();
	});

	swiperMainHome.on('tap', function () {
		swiperHomeClassTweak(this.slides, this.activeIndex);
	});

	swiperMainHome.on('touchEnd', function () {
		swiperHomeClassTweak(this.slides, this.activeIndex);
	});

	// Detect and add condition classes to slides
	function swiperHomeClassTweak(slidesProp, activeSlide) {
		let slides = slidesProp
		let activeIndex = activeSlide

		// Remove classes
		for (let slide of slides) {
			slide.classList.remove(
				'swiper-slide-prev-n1',
				'swiper-slide-prev-n2',
				'swiper-slide-next-n1',
				'swiper-slide-next-n2'
			);
		}

		// Get an array of slides indexes. We need an array [0, 1, 2, 3, ..., n]
		// .keys() method return an ArrayIterator, so we have to use a loop
		let slideKeys = [];
		for (let key of slides.keys()) {
			slideKeys.push(key);
		}

		// Define active slide index
		// In our test this should be equal to element [8 => 'slide8']
		let activeSlideIndex = activeIndex;

		// Compute the indexes of three slides before the active one
		// In out test it should be [5, 6, 7]
		// How it works:
		// 1. get an array slice from the beginning of an array till the activeSlideIndex. .slice() returns a copy of an array
		// 2. get last n elements of sliced array
		let prevSlidesIndexes = slideKeys.slice(0, activeSlideIndex).slice(-3);
		slides[prevSlidesIndexes[1]].classList.add('swiper-slide-prev-n1');
		slides[prevSlidesIndexes[0]].classList.add('swiper-slide-prev-n2');

		// Same for slides after the active one. Result should be [9, 10, 11]
		// With on exception: get sliced elements starting from the activeSlideIndex till the end of an array
		let nextSlidesIndexes = slideKeys.slice(activeSlideIndex + 1, -1).slice(0, 3);
		slides[nextSlidesIndexes[1]].classList.add('swiper-slide-next-n1');
		slides[nextSlidesIndexes[2]].classList.add('swiper-slide-next-n2');
	}

	heroAudioPlayer();

	const playerControlContainer = document.querySelector('.player-fullscreen');
	const audioModalContainer = document.querySelector('.player-section.hero-player-section');
	const audioModalBackBtn = document.querySelector('#close-player-modal');
	const audioModalexitFullscreenBtn = document.querySelector('#player-fulllscreen-exit');
	const playerControlsSmall = document.querySelector('.player-controls');
	let firstOpenModal = false;
	try {
		playerControlContainer.addEventListener('click', () => {
			audioModalContainer.style.cssText = `
				opacity: 1;
				z-index: 11;
				pointer-events: all;
			`;
			playerControlsSmall.classList.remove('active');
			document.documentElement.classList.add('overflow-hidden');
			document.body.style.paddingRight = '15px';
			modalAudioPlayer(firstOpenModal);
		});
	} catch (error) {

	}
	function audioModalFullScreenExit() {
		audioModalContainer.style.cssText = `
				opacity: 0;
				z-index: -1;
				pointer-events: none;
			`;
		playerControlsSmall.classList.add('active');
		document.documentElement.classList.remove('overflow-hidden');
		document.body.style.paddingRight = '0';
		// heroAudioPlayer();
	}
	if (audioModalBackBtn && audioModalexitFullscreenBtn) {
		audioModalBackBtn.addEventListener('click', audioModalFullScreenExit);
		audioModalexitFullscreenBtn.addEventListener('click', audioModalFullScreenExit);
	}
});