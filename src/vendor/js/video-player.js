/** Video player function */

const videoPlayerPage = function () {
	/** Video player big */

	var simulateClick = function (elem) {
		var evt = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		// If cancelled, don't dispatch our event
		var canceled = !elem.dispatchEvent(evt);
	};



	const videoPlayerWrapper = document.querySelector('.video-player-big');

	if (videoPlayerWrapper) {


		const videoPlaylistJson = document.querySelector('.video-slider').dataset.videoPlaylist;

		const getJSON = async url => {
			const response = await fetch(url);
			if (!response.ok) // check if response worked (no 404 errors etc...)
				throw new Error(response.statusText);

			const data = response.json(); // get JSON from the response
			return data; // returns a promise, which resolves to this data value
		}

		console.log("Fetching data...");


		const target = ".js-playerx";
		const players = Plyr.setup(target, {
			fullscreen: {
				// iosNative: true
			},
		});
		const id = '#video-main';
		const listclass = "player-playlist";
		let limit = 30;

		getJSON(videoPlaylistJson)
			.then(data => {
				loadPlaylist(target, data, id, listclass);
			}).catch(error => {
				console.error(error);
			});


		function loadPlaylist(target, allVideos, id, listclass) {
			$(".plyr-playlist-wrapper").remove();
			limit = limit - 1;



			if (allVideos) {

				PlyrPlaylist(".player-playlist__list", allVideos, limit, id, listclass);
				//return
			}

			function PlyrPlaylist(target, allVideos, limit, id, listclass) {
				$('<div class="plyr-playlist-wrapper  ' + listclass + '"><ul class="player-playlist__list player-list video-list"></ul></div>').insertAfter($('.video-player-playlist__desktop'));

				var playingclass = "";
				var items = [];

				$.each(allVideos, function (id, val) {
					if (0 === id) playingclass = "pls-playing";
					else playingclass = "";
					val.forEach(item => {

						items.push(
							`
								<li class="player-playlist__list-item ${playingclass}" data-video-id="${item.videoId}">
									<a class="player-list__item w-100" href="#" data-plyr-provider="${item.type}" data-plyr-embed-id="${item.src}">
										<div class="player-list__item-rating"><img src="img/icons/arrow-rating.svg" /></div>
										<div class="player-list__item-img"><img src="${item.poster}" alt="" />
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
											<div class="player-list__item-artist">${item.author}</div>
											<div class="player-list__item-media">${item.title}</div>
										</div>

									</a>
								</li>
							`);

						const videoSliderItems = document.querySelectorAll('.video-slider .video-card__play-btn');
						videoSliderItems.forEach(video => {
							const videoId = video.dataset.videoId;

							video.addEventListener('click', () => {
								const playlistItems = document.querySelectorAll('.player-playlist__list-item');

								playlistItems.forEach(videoItem => {
									if (videoId === item.videoId && videoId === videoItem.dataset.videoId) {
										const playerListItem = videoItem.querySelector('.player-list__item');

										simulateClick(playerListItem);


										// $(".player-playlist__list li")
										// 	.next()
										// 	.find("a")
										// 	.trigger("click");
									}

								});
							});
						});
					});

					if (id == limit)
						return false;

				});
				$(target).html(items.join(""));
				const videoList = document.querySelector('.video-list');
				videoList.firstElementChild.classList.add('pls-playing');
				const playListMobileControls = `
							<li class="video-player-playlist__actions">
								<div class="player-controls-song-details">
									<div class="player-controls__bottom-thumb"><img src="" /></div>
									<div>
										<p class="song-name mb-0"></p>
										<p class="song-media mb-0"></p>
									</div>
									<div class="play-pause mobile-play-pause">
										<div class="player-big__controls-btn" id="play-video-playlist">
											<svg class="play-icon" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path opacity="0.8" d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 2.12948e-06 14.7358 2.19678e-06 13.1962L2.65104e-06 2.80385C2.71834e-06 1.26425 1.66667 0.301996 3 1.0718L12 6.26795Z" fill="white"></path>
											</svg>
											<svg class="pause-icon d-none" width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
												<g opacity="0.9">
													<rect x="0.190796" y="0.428528" width="2.17678" height="9.14286" rx="1.08839" fill="white"></rect>
													<rect x="5.63269" y="0.428406" width="2.17678" height="9.14286" rx="1.08839" fill="white"></rect>
												</g>
											</svg>
										</div>
									</div>
								</div>
							</li>
							<li class="video-player-playlist__header" data-target>
								<div class="video-player-playlist__header-text">Playlist</div>
								<div class="video-player-playlist__header-icon"><i class="icon-chevron-l"></i></div>
							</li>
						`;

				videoList.insertAdjacentHTML('afterbegin', playListMobileControls);

				const
					videoImg = videoPlayerWrapper.querySelector('.player-list__item-img img'),
					videoName = videoPlayerWrapper.querySelector('.video-list .player-list__item-media'),
					videoPlayPauseBtn = videoPlayerWrapper.querySelector('#play-video'),
					videoPrevBtn = videoPlayerWrapper.querySelector('#prev-video'),
					videoNextBtn = videoPlayerWrapper.querySelector('#next-video'),
					videoTimelineContainer = videoPlayerWrapper.querySelector('.timeline-container'),
					videoBottomControlsVideoTtime = videoPlayerWrapper.querySelector('.timeline-current-time'),
					videoBottomControlsVideoTimelineThumb = videoPlayerWrapper.querySelector('.timeline-thumb'),
					videoVolumeBtn = videoPlayerWrapper.querySelector('#video-sound'),
					videoVolumeSliderContainer = videoPlayerWrapper.querySelector('.sound-input'),
					videoVolumeSlider = videoPlayerWrapper.querySelector('.sound-container .sound-control'),
					videoBottomControlsSongThumb = videoPlayerWrapper.querySelector('.player-controls__bottom-thumb img'),
					videoMobilePlayBtn = videoPlayerWrapper.querySelector('.mobile-play-pause'),
					videoBottomControlsFullscreen = videoPlayerWrapper.querySelector('.video-controls #video-full-screen'),
					videoRepeatBtn = document.querySelector('#repeat-video-plist');

				// Repeat btn

				videoRepeatBtn.addEventListener('click', () => {
					videoRepeatBtn.classList.add('active');
					switch (videoRepeatBtn.className) {
						case 'bottom-controls-btn active':
							videoRepeatBtn.classList.remove('repeat');
							videoRepeatBtn.classList.add('repeat-one');
							videoRepeatBtn.setAttribute('title', 'Repeat one song');
							break;
						case 'bottom-controls-btn active repeat-one':
							videoRepeatBtn.classList.remove('active');
							videoRepeatBtn.classList.remove('repeat-one');
							videoRepeatBtn.setAttribute('title', 'Playlist looped');
							break;
					}
				});
				// Timeline
				videoTimelineContainer.addEventListener("mousemove", handleTimelineUpdate)
				videoTimelineContainer.addEventListener("mousedown", toggleScrubbing)
				document.addEventListener("mouseup", e => {
					if (isScrubbing) toggleScrubbing(e)
				})
				document.addEventListener("mousemove", e => {
					if (isScrubbing) handleTimelineUpdate(e)
				})

				let isScrubbing = false
				let wasPaused

				function toggleScrubbing(e) {
					const rect = videoTimelineContainer.getBoundingClientRect()
					const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
					isScrubbing = (e.buttons & 1) === 1
					videoTimelineContainer.classList.toggle("scrubbing", isScrubbing)
					if (isScrubbing) {
						wasPaused = players[0].paused
						players[0].pause()
						players[0].volume = 1
					} else {
						players[0].currentTime = percent * players[0].duration
						if (!wasPaused) players[0].play()
					}

					handleTimelineUpdate(e)
				}

				function handleTimelineUpdate(e) {
					const rect = videoTimelineContainer.getBoundingClientRect()
					const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
					videoTimelineContainer.style.setProperty("--preview-position", percent)

					if (isScrubbing) {
						e.preventDefault()
						videoTimelineContainer.style.setProperty("--progress-position", percent)
					}
				}

				function nextVideo() {
					$(".player-playlist__list .pls-playing")
						.next()
						.find("a")
						.trigger("click");
				}

				function prevVideo() {
					$(".player-playlist__list .pls-playing")
						.prev()
						.find("a")
						.trigger("click");
				}

				function toggleVideoMute() {
					players[0].muted = !players[0].muted;
				}

				var videoPlayerModal = document.getElementById('videoPlayerModal')
				videoPlayerModal.addEventListener('hide.bs.modal', function (event) {
					players[0].stop();
					document.body.classList.remove('video-player-visible');
				})
				videoPlayerModal.addEventListener('show.bs.modal', function (event) {
					document.body.classList.add('video-player-visible');
				})

				players[0].on('volumechange', () => {
					videoVolumeSlider.value = players[0].volume;
					let volumeLevel;
					if (players[0].muted || players[0].volume === 0) {
						videoVolumeSlider.value = 0;
						volumeLevel = 'muted';
					} else {
						volumeLevel = 'high';
					}
					videoPlayerWrapper.dataset.volumeLevel = volumeLevel;
				});

				function togglePlay() {
					players[0].paused ? players[0].play() : players[0].pause();
				}

				videoPlayPauseBtn.addEventListener('click', () => {
					togglePlay();
				});

				videoMobilePlayBtn.addEventListener('click', () => {
					togglePlay();
				});

				$('.video-player-playlist__header')

				videoNextBtn.addEventListener('click', () => {
					nextVideo();
				});

				videoPrevBtn.addEventListener('click', () => {
					prevVideo();
				});

				videoVolumeBtn.addEventListener('click', toggleVideoMute);
				videoVolumeSlider.addEventListener('input', e => {
					players[0].volume = e.target.value;
					players[0].muted = e.target === 0;
				});

				videoBottomControlsFullscreen.addEventListener("click", toggleFullScreenMode);

				function toggleFullScreenMode() {
					players[0].fullscreen.toggle();
					setTimeout(() => {
						$('#video-main .plyr').addClass('video-fullscreen');
					}, 200);
				}

				players[0].on("play", function () {
					$('.video-player-wrapper').removeClass('active');
				});

				players[0].on("ended", function (event) {
					$('#video-main .plyr').addClass('video-fullscreen');
					switch (videoRepeatBtn.className) {
						case 'bottom-controls-btn':
							nextVideo();
							break;
						case 'bottom-controls-btn active repeat-one':
							players[0].currentTime = 0;
							players[0].play();
							videoRepeatBtn.classList.remove('repeat');
							videoRepeatBtn.classList.add('repeat-one');
							videoRepeatBtn.setAttribute('title', 'Repeat one song');
							break;
					}
					if (videoList.lastChild.nextSibling === null) {
						console.log('last element null')
					}
				});

				players[0].on('exitfullscreen', function () {
					$('#video-main .plyr').removeClass('video-fullscreen');
					$('#video-main .plyr .plyr__controls').css('display', 'none');
					$('body').removeClass('video-fullscreen');
					// $('#video-main .plyr').css('pointer-events', 'none');
				});

				players[0].on('enterfullscreen', function () {
					$('#video-main .plyr').addClass('video-fullscreen');
					$('#video-main .plyr .plyr__controls').css('display', 'flex');
					$('body').addClass('video-fullscreen');
				});
			}

			$(document).on("click", "ul.player-playlist__list li a", function (event) {
				event.preventDefault();
				$("li.pls-playing").removeClass("pls-playing");
				$(this)
					.parent()
					.addClass("pls-playing");
				videoPlayerWrapper.classList.add('playing');
				videoPlayerWrapper.classList.remove('paused');
				var video_id = $(this).data("plyr-embed-id");

				var video_type = $(this).data("plyr-provider");
				var video_title = $(this).text();
				players[0].source = {
					type: 'video',
					title: "video_title",
					sources: [{
						provider: video_type,
						src: video_id,
						type: video_type
					}]
				};

				players[0].on("ready", function (event) {
					$('.video-player-wrapper').removeClass('active');
					players[0].play();
				});



			});

			function videoControlsMediaText() {
				let playingVideoArtist = $('li.pls-playing .player-list__item-artist').text();
				let playingVideoText = $('li.pls-playing .player-list__item-media').text();
				let playingVideoThumb = $('li.pls-playing .player-list__item-img img');

				console.log(playingVideoThumb);

				$('.video-controls .song-name').html(`<p>${playingVideoText}</p>`);
				$('.video-controls .song-media').html(`<p>${playingVideoArtist}</p>`);
				$('.video-player-playlist__actions .song-name').html(`${playingVideoText}`);
				$('.video-player-playlist__actions .song-media').html(`${playingVideoArtist}`);
			}

			players[0].on("play", () => {
				videoPlayerWrapper.classList.remove('paused');

				document.querySelector('.video-controls .pause-icon').classList.remove('d-none');
				document.querySelector('.video-controls .play-icon').classList.add('d-none');
				document.querySelector('.video-player-playlist__actions .pause-icon').classList.remove('d-none');
				document.querySelector('.video-player-playlist__actions .play-icon').classList.add('d-none');

				videoControlsMediaText();
			});
			players[0].on("pause", () => {
				videoPlayerWrapper.classList.add('paused');
				document.querySelector('.video-controls .pause-icon').classList.add('d-none');
				document.querySelector('.video-controls .play-icon').classList.remove('d-none');
				document.querySelector('.video-player-playlist__actions .pause-icon').classList.add('d-none');
				document.querySelector('.video-player-playlist__actions .play-icon').classList.remove('d-none');
			});

			players[0].on("ready", function (event) {
				let videoDuration = players[0].duration;
				let totalVideoMin = Math.floor(videoDuration / 60);
				let totalVideoSec = Math.floor(videoDuration % 60);

				$('.video-controls .plyr__time.plyr__time--duration').html(`${totalVideoMin}` + ':' + `${totalVideoSec}`);
				$('.video-controls .plyr__time.plyr__time--current').text('0:00');
				$('.timeline-current-time').text('0:00');

				$('.player-controls__bottom-thumb').html(`<img src="${players[0].poster}"></img>`);
				$('.video-controls .song-name').html(`<p>${allVideos.video[0].title}</p>`);
				$('.video-controls .song-media').html(`<p>${allVideos.video[0].author}</p>`);
				// console.log()



			});

			players[0].on("timeupdate", function (event) {
				let currentVideoMin = Math.floor(players[0].currentTime / 60);
				let currentVideoSec = Math.floor(players[0].currentTime % 60);
				if (currentVideoSec < 10) {
					currentVideoSec = `0${currentVideoSec}`;
				}
				$('.video-controls .plyr__time.plyr__time--current').html(`${currentVideoMin}` + ':' + `${currentVideoSec}`);
				$('.timeline-current-time').html(`${currentVideoMin}` + ':' + `${currentVideoSec}`);
				const timelinePercent = players[0].currentTime / players[0].duration;
				const videoTimelineContainer = document.querySelector('.timeline-container');
				videoTimelineContainer.style.setProperty("--progress-position", timelinePercent);

			});

		}
	}

	const artistHeroVideoPlay = document.querySelector('#artistVideoPlay');
	const artistHeroVideoPause = document.querySelector('#artistVideoPause');

	const artistHeroVideoplayer = new Plyr('#artist-video', {
		// controls,
		volume: 0.5
	});

	if (artistHeroVideoPlay) {
		artistHeroVideoPlay.addEventListener('click', () => {
			artistHeroVideoplayer.fullscreen.enter();
			artistHeroVideoplayer.play();
			// artistHeroVideoPlay.classList.remove('active');
			// artistHeroVideoPause.classList.add('active');
		});
	}

	artistHeroVideoplayer.on('ended', function () {
		artistHeroVideoplayer.fullscreen.exit();
	});
	artistHeroVideoplayer.on('play', function () {
		this.classList.add('is-visible');
		document.documentElement.classList.add('.video-fullscreen');
	});
	artistHeroVideoplayer.on('exitfullscreen', function () {
		artistHeroVideoplayer.pause();
		this.classList.remove('is-visible');
		document.documentElement.classList.remove('.video-fullscreen');
	});

	const videoPlayers = Plyr.setup('.video-card__video', {
		fullscreen: {
			iosNative: true
		}
	});
	if (videoPlayers) {
		videoPlayers.forEach(function (instance, index) {
			instance.volume = '0.5';
			instance.on('play', function () {
				instance.fullscreen.enter();
				videoPlayers.forEach(function (instance1, index1) {
					if (instance != instance1) {
						instance1.pause();
					}
				});
			});
			instance.on('ended', function () {
				instance.fullscreen.exit();
			});
			instance.on('exitfullscreen', function () {
				instance.pause();
			});

		});
	}

	const breakpoint = window.matchMedia('(min-width:1024px)');

	const breakpointChecker = function () {
		if (breakpoint.matches === true) {
			if (document.querySelector('.video-player-wrapper')) {
				document.querySelector('.video-player-wrapper').classList.remove('active');
			}

		} else if (breakpoint.matches === false) {
			console.log('min-width < 1024');
		}

	};

	breakpoint.addListener(breakpointChecker);

	breakpointChecker();
}

videoPlayerPage();