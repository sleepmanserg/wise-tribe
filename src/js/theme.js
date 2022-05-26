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

const swiperMainHome = new Swiper(".hero-slider", {
	effect: "coverflow",
	slidesPerView: 'auto',
	grabCursor: true,
	// autoHeight: true,
	speed: 500,
	loop: true,
	centeredSlides: true,
	slideToClickedSlide: false,
	allowTouchMove: false,
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
});

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
	artistHeroVideoplayer.on('exitfullscreen', function () {
		// artistHeroVideoplayer.pause();
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

		// let videoControlsWrapper = document.querySelector('.video-controls-wrapper');
		const bigVideoPLayerControls = `
			<div class="video-controls player-controls__bottom">
				<div class="progress-area">
						<input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
						<progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
						<span role="tooltip" class="plyr__tooltip">00:00</span>
						<div class="progress_bar-time d-flex justify-content-between">
							<div class="plyr__time plyr__time--current" aria-label="Current time">00:00</div>
							<div class="plyr__time plyr__time--duration" aria-label="Duration">00:00</div>
						</div>
				</div>
				<div class="player-controls-song-details">
					<div class="player-controls__bottom-thumb"><img src="" /></div>
					<div>
						<p class="song-name"></p>
						<p class="song-media">Artist name name name name name</p>
					</div>
				</div>
				<div class="player-controls__bottom-main d-flex align-items-center">
					<div class="player-big__controls-btn" id="prev-video">
						<svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path opacity="0.6" d="M9.42847 10.7323C8.09513 9.96246 8.09513 8.03796 9.42847 7.26816L15.6428 3.68034C16.9761 2.91054 18.6428 3.87279 18.6428 5.41239L18.6428 12.588C18.6428 14.1276 16.9761 15.0899 15.6428 14.3201L9.42847 10.7323Z" fill="white"></path>
							<path opacity="0.9" d="M3.85718 10.7323C2.52384 9.96246 2.52385 8.03796 3.85718 7.26816L10.0715 3.68034C11.4048 2.91054 13.0715 3.87279 13.0715 5.41239L13.0715 12.588C13.0715 14.1276 11.4048 15.0899 10.0715 14.3201L3.85718 10.7323Z" fill="white"></path>
						</svg>
					</div>
					<div class="play-pause">
						<button type="button"id="play-video" class="player-big__controls-btn" aria-label="Play, {title}" data-plyr="play">
							<svg class="play-icon" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path opacity="0.8" d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 2.12948e-06 14.7358 2.19678e-06 13.1962L2.65104e-06 2.80385C2.71834e-06 1.26425 1.66667 0.301996 3 1.0718L12 6.26795Z" fill="white"></path>
							</svg>
							<svg class="pause-icon d-none" width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g opacity="0.9">
									<rect x="0.190796" y="0.428528" width="2.17678" height="9.14286" rx="1.08839" fill="white"></rect>
									<rect x="5.63269" y="0.428406" width="2.17678" height="9.14286" rx="1.08839" fill="white"></rect>
								</g>
							</svg>
							<span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
							<span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
						</button>
					</div>

					<div class="player-big__controls-btn" id="next-video">
						<svg width="23" height="18" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path opacity="0.6" d="M14.1428 7.26799C15.4762 8.03779 15.4762 9.96229 14.1428 10.7321L7.92853 14.3199C6.5952 15.0897 4.92853 14.1275 4.92853 12.5879L4.92854 5.41221C4.92854 3.87261 6.5952 2.91036 7.92854 3.68016L14.1428 7.26799Z" fill="white"></path>
							<path opacity="0.9" d="M19.7144 7.26799C21.0477 8.03779 21.0477 9.96229 19.7144 10.7321L13.5001 14.3199C12.1667 15.0897 10.5001 14.1275 10.5001 12.5879L10.5001 5.41221C10.5001 3.87261 12.1667 2.91036 13.5001 3.68016L19.7144 7.26799Z" fill="white"></path>
						</svg>
					</div>
				</div>
				<div class="video-like"><a class="bottom-controls-btn" href="#" id="video-like"><i class="icon-heart"></i></a></div>

				<div class="sound-container">
					<button type="button" class="plyr__control bottom-controls-btn" aria-label="Mute" data-plyr="mute">
						<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-muted"></use></svg>
						<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-volume"></use></svg>
						<span class="label--pressed plyr__tooltip" role="tooltip">Unmute</span>
						<span class="label--not-pressed plyr__tooltip" role="tooltip">Mute</span>
					</button>
					<div class="plyr__volume">
						<input data-plyr="volume" type="range" min="0" max="1" step="0.05" value="1" autocomplete="off" aria-label="Volume">
					</div>
				</div>
				<button type="button" id="repeat-video-plist" class="plyr__control bottom-controls-btn" data-plyr="restart">
					<svg role="presentation"><use xlink:href="#plyr-restart"></use></svg>
					<span class="plyr__tooltip" role="tooltip">Restart</span>
				</button>
			</div>
		`;

		// videoControlsWrapper.insertAdjacentHTML('afterbegin', bigVideoPLayerControls);



		var target = ".js-playerx";
		var players = Plyr.setup(target, {
			fullscreen: {
				iosNative: true
			},
		});
		var id = '#video-main';
		var listclass = "player-playlist";
		var limit = 30;

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
					videoMobilePlayBtn = videoPlayerWrapper.querySelector('.video-playlist-mobile .play-pause'),
					videoBottomControlsFullscreen = videoPlayerWrapper.querySelector('.video-controls #video-full-screen');


				// Timeline
				videoTimelineContainer.addEventListener("mousemove", handleTimelineUpdate)
				videoTimelineContainer.addEventListener("mousedown", toggleScrubbing)
				// videoTimelineContainer.addEventListener("touchmove", handleTimelineUpdate)
				// videoTimelineContainer.addEventListener("touchstart", toggleScrubbing)
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



				// function playVideo() {
				// 	videoPlayerWrapper.classList.add('playing');
				// 	videoPlayerWrapper.classList.remove('paused');
				// 	players[0].play();
				// }

				// function pauseVideo() {
				// 	videoPlayerWrapper.classList.remove('playing');
				// 	videoPlayerWrapper.classList.add('paused');
				// 	players[0].pause();
				// }

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
					// setTimeout(() => {
					// 	$('.video-player-wrapper').removeClass('active');
					// }, 350);
					// playVideo();
				});

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

				videoBottomControlsFullscreen.addEventListener('click', () => {
					players[0].fullscreen.enter();
					setTimeout(() => {
						$('#video-main .plyr').addClass('video-fullscreen');
					}, 200);
				});

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
					$('#video-main .plyr').css('pointer-events', 'none');
				});

				players[0].on('enterfullscreen', function () {
					$('#video-main .plyr').addClass('video-fullscreen');
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
				$('.video-playlist-mobile .song-name').html(`${playingVideoText}`);
				$('.video-playlist-mobile .song-media').html(`${playingVideoArtist}`);
			}

			players[0].on("play", () => {
				videoPlayerWrapper.classList.remove('paused');

				document.querySelector('.video-controls .pause-icon').classList.remove('d-none');
				document.querySelector('.video-controls .play-icon').classList.add('d-none');
				document.querySelector('.video-playlist-mobile .pause-icon').classList.remove('d-none');
				document.querySelector('.video-playlist-mobile .play-icon').classList.add('d-none');
			});
			players[0].on("pause", () => {
				videoPlayerWrapper.classList.add('paused');
				document.querySelector('.video-controls .pause-icon').classList.add('d-none');
				document.querySelector('.video-controls .play-icon').classList.remove('d-none');
				document.querySelector('.video-playlist-mobile .pause-icon').classList.add('d-none');
				document.querySelector('.video-playlist-mobile .play-icon').classList.remove('d-none');
			});

			players[0].on("ready", function (event) {
				players[0].volume = .5;
				let videoDuration = players[0].duration;
				let totalVideoMin = Math.floor(videoDuration / 60);
				let totalVideoSec = Math.floor(videoDuration % 60);

				$('.video-controls .plyr__time.plyr__time--duration').html(`${totalVideoMin}` + ':' + `${totalVideoSec}`);
				$('.video-controls .plyr__time.plyr__time--current').text('0:00');
				$('.timeline-current-time').text('0:00');

				$('.video-controls .player-controls__bottom-thumb').html(`<img src="${players[0].poster}"></img>`);
				$('.video-playlist-mobile .player-controls__bottom-thumb').html(`<img src="${players[0].poster}"></img>`);

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

