//
// Custom Scripts
// --------------------------------------------------

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
		document.body.classList.toggle('overflow-hidden');
		menuToggle.classList.toggle('active');
		menuInner.classList.toggle('active');
	});
}

/** Hero slider */

const swiperMainHome = new Swiper(".hero-slider", {
	effect: "coverflow",
	slidesPerView: 'auto',
	grabCursor: true,
	autoHeight: true,
	speed: 500,
	loop: true,
	centeredSlides: true,
	slideToClickedSlide: false,
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
	// slidesPerView: 4.5,
	slidesPerView: 'auto',
	spaceBetween: 35,
	speed: 1000,
	loop: true,
	centeredSlides: true,
	slideToClickedSlide: true,
	navigation: {
		nextEl: ".events-button-next",
		prevEl: ".events-button-prev"
	},
	on: {
		init: function () {
			swiperHomeClassTweak(this.slides, this.activeIndex);
		},
	},
});

swiperEvents.on('slideChange', function () {
	swiperHomeClassTweak(this.slides, this.activeIndex);
	this.loopFix();
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

