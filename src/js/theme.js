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
	var header = document.querySelector('.site-header');
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
		document.body.classList.toggle('overflow-hidden');
		menuToggle.classList.toggle('active');
		menuInner.classList.toggle('active');
	});
}

/** Hero slider */

const swiperMainHome = new Swiper(".hero-slider", {
	effect: "coverflow",
	slidesPerView: 6.5,
	grabCursor: true,
	spaceBetween: 30,
	autoHeight: true,
	speed: 1000,
	loop: true,
	centeredSlides: true,
	slideToClickedSlide: false,
	pagination: {
		el: ".swiper-pagination",
		clickable: true
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev"
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
	slidesPerView: 4.5,
	// slidesPerView: 'auto',
	spaceBetween: 35,
	speed: 700,
	loop: true,
	centeredSlides: true,
	navigation: {
		nextEl: ".events-button-next",
		prevEl: ".events-button-prev"
	},
	// breakpoints: {
	// 	320: {
	// 		slidesPerView: 3.5,
	// 		spaceBetween: 14,
	// 	},
	// 	1024: {
	// 		slidesPerView: 4.5,
	// 		spaceBetween: 35,
	// 	}
	// },
	on: {
		init: function () {
			swiperHomeClassTweak(this.slides, this.activeIndex);
		},
	},
});

swiperEvents.on('slideChange', function () {
	swiperHomeClassTweak(this.slides, this.activeIndex);
});

/** Studio slider */

const swiperStudio = new Swiper(".studio-slider", {
	slidesPerView: 1,
	speed: 700,
	loop: true,
	pagination: {
		clickable: true,
		el: ".studio-pagination",
	},
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
};


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
	// navigation: {
	// 	nextEl: '.blog-button-next',
	// 	prevEl: '.blog-button-prev',
	// },

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
		if (blogSidebarSlider !== undefined) blogSidebarSlider.destroy(true, true);

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

// kickstart
breakpointChecker();




// var blogSwiper = new Swiper(".latest-slider", {
// 	slidesPerView: 1,
// 	spaceBetween: 10,
// 	loop: true,
// });

// function blogSectionPaddingHack() {

// 	if (document.querySelector('.blog-slider')) {
// 		let sectionWidth = document.querySelector('.blog-slider').offsetWidth;
// 		let containerWidth = document.querySelector('.container').offsetWidth;
// 		let blogOffset = (sectionWidth - containerWidth) / 2;
// 		let blogContent = document.querySelector('.blog-slider__content');

// 		blogContent.style.paddingLeft = blogOffset + 'px';

// 		blogSwiper.update();
// 	}

// };

// blogSectionPaddingHack();

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

function checkForWindowResize() {
	if (document.querySelector('.projects-slider__btn')) {
		sliderArrowPosition();
	}
}

window.addEventListener('resize', checkForWindowResize);
