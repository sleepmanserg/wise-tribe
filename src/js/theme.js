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
	slideToClickedSlide: true,
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

/** Blog slider mobile (sidebar desktop) */

const breakpoint = window.matchMedia('(min-width:1024px)');

// keep track of swiper instances to destroy later
let blogSidebarSlider;

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

const breakpointChecker = function () {

	// if larger viewport and multi-row layout needed
	if (breakpoint.matches === true) {

		// clean up old instances and inline styles when available
		if (blogSidebarSlider && blogSidebarSlider !== undefined) blogSidebarSlider.destroy(true, true);

		// or/and do nothing
		return;

		// else if a small viewport and single column layout needed
	} else if (breakpoint.matches === false) {

		// fire small viewport version of swiper
		return enableSwiper();

	}

};

//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

const enableSwiper = function () {

	blogSidebarSlider = new Swiper('.blog-sidebar-slider', {
		slidesPerView: 1.2,
		spaceBetween: 20,
		a11y: true,
		speed: 500,
		keyboardControl: true,
		grabCursor: true,
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
		},
	});
};

// keep an eye on viewport size changes

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

/** Audio player */

let allMusic = [
	{
		name: "Deftones - Elite",
		artist: "Deftones",
		img: "../img/covers/white-pony.jpg",
		src: "../songs/Elite.mp3"
	},
	{
		name: "Deftones - Diamond eyes",
		artist: "Deftones",
		img: "../img/covers/diamond-eyes.jpg",
		src: "../songs/Diamond Eyes.mp3"
	},
	{
		name: "Deftones - Minerva",
		artist: "Deftones",
		img: "../img/covers/minerva.jpg",
		src: "../songs/Minerva.mp3"
	},
]

const
	playerWrapper = document.querySelector('.player-wrapper'),
	trackImg = playerWrapper.querySelector('.player-track__img img'),
	trackName = playerWrapper.querySelector('.player-controls-song-details .song-name'),
	trackArtist = playerWrapper.querySelector('.player-controls-song-details .song-media'),
	trackMain = playerWrapper.querySelector('#main-audio'),
	playPauseBtn = playerWrapper.querySelector('#play-song'),
	playerPrevBtn = playerWrapper.querySelector('#prev-song'),
	playerNextBtn = playerWrapper.querySelector('#next-song'),
	playerProgressBar = playerWrapper.querySelector('.progress_bar'),
	playerProgressArea = playerWrapper.querySelector('.progress-area')

let musicIndex = 1;

window.addEventListener('load', () => {
	loadMusic(musicIndex);
});

// Load music function
function loadMusic(indexNumb) {
	trackName.innerText = allMusic[indexNumb - 1].name;
	trackArtist.innerText = allMusic[indexNumb - 1].artist;
	trackImg.src = `${allMusic[indexNumb - 1].img}`;
	trackMain.src = `${allMusic[indexNumb - 1].src}`;
}

// Play music function
function playMusic() {
	playerWrapper.classList.add('paused');
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
});

playerNextBtn.addEventListener('click', () => {
	nextMusic();
});

playerPrevBtn.addEventListener('click', () => {
	prevMusic();
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
repeatBtn.addEventListener('click', () => {
	switch (repeatBtn.className) {
		case 'bottom-controls-btn repeat':
			repeatBtn.classList.remove('repeat');
			repeatBtn.classList.add('repeat-one');
			repeatBtn.setAttribute('title', 'Repeat one song');
			break;
		case 'bottom-controls-btn repeat-one':
			repeatBtn.classList.remove('repeat-one');
			repeatBtn.classList.add('repeat-all');
			repeatBtn.setAttribute('title', 'Repeat playlist');
			break;
		case 'bottom-controls-btn repeat-all':
			repeatBtn.classList.remove('repeat-all');
			repeatBtn.classList.add('repeat');
			repeatBtn.setAttribute('title', 'Repeat one song');
			break;
	}
});