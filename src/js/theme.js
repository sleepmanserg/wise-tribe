//
// Custom Scripts
// --------------------------------------------------

/* Check if webp available */

function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
// Добавление класса _webp или _no-webp для HTML
testWebP(function (support) {
	let className = support === true ? 'webp' : 'no-webp';
	document.documentElement.classList.add(className);
});

/* Sticky header  */

window.addEventListener('scroll', function () {
	let header = document.querySelector('.site-header');
	header.classList.toggle("sticky", window.scrollY > 50);
})

/** toggle btn */

document.addEventListener('click', e => {
	const isTargetButton = e.target.matches('[data-target]');
	if (!isTargetButton && e.target.closest('[data-active]') != null) return;
	let currentTarget;
	if (isTargetButton) {
		currentTarget = e.target.closest('[data-active]');
		currentTarget.classList.toggle('active');
	}
	document.querySelectorAll('[data-active].active').forEach(item => {
		if (item == currentTarget) return;
		item.classList.remove('active');
	});
});

/** Menu toggle */

const menuToggle = document.querySelector('.header-menu__toggle');

if (menuToggle) {
	const menuInner = document.querySelector('.header-inner');
	menuToggle.addEventListener('click', () => {
		document.documentElement.classList.toggle('overflow-hidden');
		menuToggle.classList.toggle('active');
		menuInner.classList.toggle('active');
	});
}

/** Hero slider */

// const swiperMainHome = new Swiper(".hero-slider", {
// 	effect: "coverflow",
// 	slidesPerView: 'auto',
// 	grabCursor: true,
// 	// autoHeight: true,
// 	speed: 500,
// 	loop: true,
// 	centeredSlides: true,
// 	slideToClickedSlide: false,
// 	allowTouchMove: false,
// 	navigation: {
// 		nextEl: ".swiper-btn-next",
// 		prevEl: ".swiper-btn-prev"
// 	},
// 	coverflowEffect: {
// 		rotate: 0,
// 		stretch: 0,
// 		depth: 0,
// 		modifier: 3,
// 		slideShadows: false,
// 	},
// 	on: {
// 		init: function () {
// 			swiperHomeClassTweak(this.slides, this.activeIndex);
// 		},
// 	},
// });

// swiperMainHome.on('slideChange', function () {
// 	swiperHomeClassTweak(this.slides, this.activeIndex);
// });

/** Events slider */

const swiperEvents = new Swiper(".events-slider", {
	effect: "coverflow",
	slidesPerView: 'auto',
	grabCursor: true,
	speed: 500,
	loop: true,
	centeredSlides: true,
	slideToClickedSlide: true,
	navigation: {
		nextEl: ".events-button-next",
		prevEl: ".events-button-prev"
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

swiperEvents.on('slideChange', function () {
	swiperHomeClassTweak(this.slides, this.activeIndex);
});


/** Releases slider */

const swiper = new Swiper(".releases-slider", {
	effect: "cards",
	grabCursor: true,
	navigation: {
		nextEl: ".releases-button-next",
		prevEl: ".releases-button-prev",
		disabledClass: "swiper-button-disabled"
	},
});

/** Popular tracks slider */

let popularItem = document.querySelectorAll(".popular-slider .popular-item__number");

for (let i = 0; i < popularItem.length; i++) {
	popularItem[i].index = i;
	popularItem[i].innerHTML = i + 1;
}

const swiperPopular = new Swiper(".popular-slider", {
	slidesPerView: 1,
	speed: 500,
	navigation: {
		nextEl: '.popular-slider__btn',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
		},
		575: {
			slidesPerView: 1.8,
			spaceBetween: 70,
		},
		768: {
			slidesPerView: 1.8,
			spaceBetween: 70,
		},
		1024: {
			slidesPerView: 2.3,
			spaceBetween: 70,
		},
		1366: {
			slidesPerView: 2.8,
		},
		1700: {
			slidesPerView: 3,
			spaceBetween: 38,
		},
	},
});

/** Studio slider */

const swiperStudio = new Swiper(".studio-slider", {
	slidesPerView: 1,
	speed: 500,
	loop: true,
	pagination: {
		clickable: true,
		el: ".studio-pagination",
	},
});

/** Tiktok slider */

const swiperTiktok = new Swiper(".tiktok-slider", {
	slidesPerView: 3.5,
	spaceBetween: 15,
	loop: true,
	speed: 500,
	navigation: {
		nextEl: '.tiktok-slider__btn',
	},
	breakpoints: {
		320: {
			slidesPerView: 3.5,
			spaceBetween: 15,
		},
		768: {
			slidesPerView: 4.3,
			spaceBetween: 25,
		},
		1024: {
			slidesPerView: 4.5,
			spaceBetween: 30,
		},
		1366: {
			slidesPerView: 4.8,
			spaceBetween: 37,
		},
		1700: {
			slidesPerView: 6,
			spaceBetween: 30,
		},
	},
	on: {
		init: function () {
			tiktokSliderBtnPosition();
		},
	}
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


/** Circle Parallax */


// const parallaxItems = document.querySelectorAll('.parallax');

// if (parallaxItems) {
// 	let applyParallax = section => {

// 		section.addEventListener('mousemove', e => {

// 			let { width, height } = section.getBoundingClientRect();
// 			let offX = e.pageX - (width * 0.5);
// 			let offY = e.pageY - (height * 0.5);

// 			for (let layer of parallaxItems) {
// 				const speed = layer.getAttribute('data-speed')
// 				const x = (offX * speed) / 100;
// 				const y = (offY * speed) / 2000;
// 				layer.style.transform = `translateX(${x}px) translateY(${y}px)`
// 			}

// 		});

// 		section.addEventListener('mouseleave', e => {
// 			for (let layer of parallaxItems) {
// 				layer.style.transform = `translateX(${x}px) translateY(${y}px)`
// 			}

// 		});

// 	};

// 	// applyParallax(document.querySelector('.circle-section'));
// }

/** Blog slider */


const blogSlider = new Swiper('.blog-latest-slider', {
	slidesPerView: 1.2,
	spaceBetween: 20,
	grabCursor: true,
	speed: 500,
	navigation: {
		nextEl: '.blog-button-next',
		prevEl: '.blog-button-prev',
	},

	breakpoints: {
		320: {
			slidesPerView: 1.15,
			spaceBetween: 20,
		},
		575: {
			slidesPerView: 1.5,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 1.8,
			spaceBetween: 22,
		},
		1024: {
			slidesPerView: 2.1,
			spaceBetween: 22,
		},
		1366: {
			slidesPerView: 2.7,
			spaceBetween: 32,
		},
		1700: {
			slidesPerView: 3.2,
			spaceBetween: 36,
		},
		// 1920: {
		// 	slidesPerView: 4.2,
		// 	spaceBetween: 36,
		// }
	},
});


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

/** Slider padding hack */

function sliderPaddingHack() {

	let offsetSliders = document.querySelectorAll('.offset-slider');

	offsetSliders.forEach(slider => {
		let sliderContent = slider.closest('.offset-slider__content');
		let sliderWidth = sliderContent.offsetWidth;
		let containerWidth = document.querySelector('.container').offsetWidth;
		let sliderOffset = (sliderWidth - containerWidth) / 2;

		console.log(sliderWidth);
		console.log(containerWidth);
		console.log(sliderOffset);

		sliderContent.style.paddingLeft = sliderOffset + 'px';
		console.log(slider);
	});

};

sliderPaddingHack();

// function checkForWindowResize() {
// 	console.log(`Screen width: ${window.innerWidth}`);
// 	blogSectionPaddingHack();
// }

// window.addEventListener('resize', checkForWindowResize);

/** Projects slider */

const projectsSlider = new Swiper('.projects-slider', {
	slidesPerView: 1.2,
	spaceBetween: 20,
	grabCursor: true,
	speed: 500,
	navigation: {
		nextEl: '.projects-slider__btn',
	},

	breakpoints: {
		320: {
			slidesPerView: 1.35,
			spaceBetween: 15,
		},
		575: {
			slidesPerView: 1.5,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 2.1,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 2.2,
			spaceBetween: 30,
		},
		1366: {
			slidesPerView: 2.7,
			spaceBetween: 40,
		},
		1700: {
			slidesPerView: 3.2,
			spaceBetween: 36,
		},
	},
});

/** Slider circle arrow position */

function tiktokSliderBtnPosition() {
	let tiktokSliderItem = document.querySelectorAll('.titktok-slider__item');

	tiktokSliderItem.forEach((item) => {
		let tiktokSliderTitle = document.querySelectorAll('.tiktok-slider__name');

		tiktokSliderTitle.forEach((title) => {
			item.style.paddingBottom = title.offsetHeight + 'px';
		})
	});
}


function sliderArrowPosition() {
	let projectsSLiderImg = document.querySelector('.projects-slider__thumb');
	let projectsSliderArrow = document.querySelector('.projects-slider__btn');
	let projectsSliderArrowHeight = projectsSliderArrow.offsetHeight / 2;
	let projectsSliderImgHeight = projectsSLiderImg.offsetHeight / 2 - projectsSliderArrowHeight;

	projectsSliderArrow.style.top = projectsSliderImgHeight + 'px';
}

if (document.querySelector('.projects-slider__btn')) {
	sliderArrowPosition();
}

/** Projects slider */

const videosSlider = new Swiper('.video-slider', {
	slidesPerView: 1.2,
	spaceBetween: 20,
	grabCursor: true,
	speed: 500,
	slideToClickedSlide: true,
	breakpoints: {
		320: {
			slidesPerView: 1.35,
			spaceBetween: 15,
		},
		575: {
			slidesPerView: 1.5,
			spaceBetween: 20,
		},
		768: {
			slidesPerView: 2.1,
			spaceBetween: 20,
		},
		1024: {
			slidesPerView: 2.2,
			spaceBetween: 30,
		},
		1366: {
			slidesPerView: 2.7,
			slidesPerGroup: 2.7,
			spaceBetween: 40,
		},
		1700: {
			slidesPerView: 3.2,
			slidesPerGroup: 3.2,
			spaceBetween: 36,
		},
	},
});

/** Check for resize */

function checkForWindowResize() {
	if (document.querySelector('.projects-slider__btn')) {
		sliderArrowPosition();
	}
	if (document.querySelector('.tiktok-slider__btn')) {
		tiktokSliderBtnPosition();
	}

	if (document.querySelector('.offset-slider')) {
		sliderPaddingHack();
	}

}

window.addEventListener('resize', checkForWindowResize);

/** Decorations parallax */

const rellax = new Rellax('.rellax');

/** Random circles animation  */

let decorRandomCircles = document.querySelectorAll('.random-circles .decor-circle');

decorRandomCircles.forEach((el, i, ra) => {
	let to = {
		x: Math.random() * (i % 2 === 0 ? -11 : 11),
		y: Math.random() * 12
	};

	let anim = el.animate(
		[
			{ transform: "translate(0, 0)" },
			{ transform: `translate(${to.x}rem, ${to.y}rem)` }
		],
		{
			duration: (Math.random() + 1) * 5000, // random duration
			direction: "alternate",
			fill: "both",
			iterations: Infinity,
			easing: "ease-in-out"
		}
	);
});

/** Forms */

(function () {
	'use strict'
	const forms = document.querySelectorAll('.needs-validation')
	Array.from(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				if (!form.checkValidity()) {
					event.preventDefault();
					event.stopPropagation();
				}
				form.classList.add('was-validated');
			}, false)
		})
})();

document.querySelectorAll("textarea").forEach(function (el) {
	el.addEventListener("input", function () {
		var cs = window.getComputedStyle(this);
		// reset height to allow textarea to shrink again
		this.style.height = "auto";
		// when "box-sizing: border-box" we need to add vertical border size to scrollHeight
		this.style.height = (this.scrollHeight + parseInt(cs.getPropertyValue("border-top-width")) + parseInt(cs.getPropertyValue("border-bottom-width"))) + "px";
	});
});

let phoneInputs = document.querySelectorAll('.phone-input');

phoneInputs.forEach(phone => {
	phone.addEventListener('input', function (e) {
		var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
	});
});

/** Preloader */

window.addEventListener('DOMContentLoaded', (event) => {
	const preload = document.querySelector('.preloader');

	if (preload) {
		setTimeout(function () {
			preload.classList.add('loaded');
			document.documentElement.classList.remove('overflow-hidden');
		}, 8000);
	}
});

/** Artist main video */

document.addEventListener('DOMContentLoaded', () => {

	// const controls = [];
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

	const rangeInputs = document.querySelectorAll('input[type="range"]')

	function handleInputChange(e) {
		let target = e.target
		if (e.target.type !== 'range') {
			target = document.getElementById('range')
		}
		const min = target.min
		const max = target.max
		const val = target.value

		target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
	}

	rangeInputs.forEach(input => {
		input.addEventListener('input', handleInputChange)
	})


	/** Video player big */

	let allVideo = [
		{
			name: "In the end",
			artist: "Linkin Park",
			youtubeId: "eVTXPUF4Oz4",
			img: 'https://i.ytimg.com/vi/eVTXPUF4Oz4/maxresdefault.jpg'
		},
		{
			name: "Show Me How To Live",
			artist: "Audioslave",
			youtubeId: "vVXIK1xCRpY",
			img: 'https://i.ytimg.com/vi/vVXIK1xCRpY/maxresdefault.jpg'
		},
	]


	const videoPlayerWrapper = document.querySelector('.video-player-big');

	if (videoPlayerWrapper) {



		var allVideos = [
			{
				type: "youtube",
				title: "In the end",
				author: "Linkin Park",
				sources: [{
					src: "https://youtu.be/eVTXPUF4Oz4",
					type: "youtube"
				}],
				poster: "https://i.ytimg.com/vi/eVTXPUF4Oz4/maxresdefault.jpg"
			},
			{
				type: "youtube",
				title: "Show Me How To Live",
				author: "Audioslave",
				sources: [{
					src: "https://youtu.be/vVXIK1xCRpY",
					type: "youtube"
				}],
				poster: "https://i.ytimg.com/vi/vVXIK1xCRpY/maxresdefault.jpg"
			},
			{
				type: "youtube",
				title: "The Sound Of Silence",
				author: "Disturbed",
				sources: [{
					src: "https://youtu.be/u9Dg-g7t2l4",
					type: "youtube"
				}],
				poster: "https://i.ytimg.com/vi/u9Dg-g7t2l4/maxresdefault.jpg"
			},

		];

		const target = ".js-playerx";
		const players = Plyr.setup(target, {
			fullscreen: {
				// iosNative: true
			},
		});
		const id = '#video-main';
		const listclass = "player-playlist";
		let limit = 30;

		// players.forEach(function (instance, index) {
		// 	instance.volume = '0.1';
		// });

		$(document).ready(function () {
			loadPlaylist(target, allVideos, id, listclass);  // LOAD VIDEO LIST

		});

		function loadPlaylist(target, allVideos, id, listclass) {

			$("li.pls-playing").removeClass("pls-playing");
			// $('.video-list li:first-of-type').addClass("pls-playing");
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

					items.push(
						`
							<li class="player-playlist__list-item ${playingclass}">
								<a class="player-list__item w-100" href="#" data-plyr-provider="${val.sources[0].type}" data-plyr-embed-id="${val.sources[0].src}">
									<div class="player-list__item-rating"><img src="img/icons/arrow-rating.svg" /></div>
									<div class="player-list__item-img"><img src="${val.poster}" alt="" />
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
										<div class="player-list__item-artist">${val.author}</div>
										<div class="player-list__item-media">${val.title}</div>
									</div>

								</a>
							</li>
						`);

					if (id == limit)
						return false;

				});
				$(target).html(items.join(""));

				const videoList = document.querySelector('.video-list');
				const playListMobileControls = `
							<li class="video-player-playlist__actions">
								<div class="player-controls-song-details">
									<div class="player-controls__bottom-thumb"></div>
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
					videoBottomControlsFullscreen = videoPlayerWrapper.querySelector('.video-controls #video-full-screen');


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
				})

				players[0].on("ended", function (event) {
					$('#video-main .plyr').addClass('video-fullscreen');
					var $next = $(".player-playlist__list .pls-playing")
						.next()
						.find("a")
						.trigger("click");
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
					// players[0].play();
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
					sources: [{ provider: video_type, src: video_id, type: video_type }]
				};

				players[0].on("ready", function (event) {
					$('.video-player-wrapper').removeClass('active');
					players[0].play();
				});



			});

			function videoControlsMediaText() {
				let playingVideoArtist = $('li.pls-playing .player-list__item-artist').text();
				let playingVideoText = $('li.pls-playing .player-list__item-media').text();

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

				$('.video-controls .player-controls__bottom-thumb').html(`<img src="${players[0].poster}"></img>`);
				$('.video-player-playlist__actions .player-controls__bottom-thumb').html(`<img src="${players[0].poster}"></img>`);

				videoControlsMediaText();
			});

			players[0].on("timeupdate", function (event) {
				$('.video-controls .player-controls__bottom-thumb').html(`<img src="${players[0].poster}"></img>`);
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

});

