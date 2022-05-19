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

// /** Blog sidebar arrows handle */

// document.addEventListener('click', e => {
// 	let handle;
// 	if (e.target.matches('.article-sidebar__nav .arrow-button')) {
// 		handle = e.target
// 	} else {
// 		handle = e.target.closest('.article-sidebar__nav .arrow-button');
// 	}
// 	if (handle != null) {
// 		onHandleClick(handle);
// 	}

// 	function onHandleClick(handle) {
// 		const sidebarSlider = handle.closest('.article-sidebar__items').querySelector('.blog-sidebar-slider');
// 		const sliderIndex = parseInt(getComputedStyle(sidebarSlider).getPropertyValue('--slider-index'));
// 		if (handle.classList.contains('arrow-button__prev')) {
// 			sidebarSlider.style.setProperty('--slider-index', sliderIndex - 1);
// 			console.log(sliderIndex);
// 		}
// 		if (handle.classList.contains('arrow-button__next')) {
// 			sidebarSlider.style.setProperty('--slider-index', sliderIndex + 1);
// 			console.log(sliderIndex);
// 		}
// 	}
// });

/** Blog slider mobile (sidebar desktop) */

// const breakpoint = window.matchMedia('(min-width:1024px)');

// // keep track of swiper instances to destroy later
// let blogSidebarSlider;

// //////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////

// const breakpointChecker = function () {

// 	// if larger viewport and multi-row layout needed
// 	if (breakpoint.matches === true) {

// 		// clean up old instances and inline styles when available
// 		if (blogSidebarSlider && blogSidebarSlider !== undefined) blogSidebarSlider.destroy(true, true);

// 		// or/and do nothing
// 		return;

// 		// else if a small viewport and single column layout needed
// 	} else if (breakpoint.matches === false) {

// 		// fire small viewport version of swiper
// 		return enableSwiper();

// 	}

// };

// //////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////////////

// const enableSwiper = function () {

// 	blogSidebarSlider = new Swiper('.blog-sidebar-slider', {
// 		slidesPerView: 1.2,
// 		spaceBetween: 20,
// 		a11y: true,
// 		speed: 500,
// 		keyboardControl: true,
// 		grabCursor: true,
// 		navigation: {
// 			nextEl: '.blog-button-next',
// 			prevEl: '.blog-button-prev',
// 		},

// 		breakpoints: {
// 			320: {
// 				slidesPerView: 1.15,
// 				spaceBetween: 20,
// 			},
// 			575: {
// 				slidesPerView: 1.5,
// 				spaceBetween: 20,
// 			},
// 			768: {
// 				slidesPerView: 1.8,
// 				spaceBetween: 22,
// 			},
// 		},
// 	});
// };

// // keep an eye on viewport size changes

// breakpoint.addListener(breakpointChecker);

// breakpointChecker();

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
		artistHeroVideoplayer.pause();
	});



	// Expose
	// window.player = artistHeroVideoplayer;
	// Bind event listener
	// function onEvent(selector, type, callback) {
	// 	document.querySelector(selector).addEventListener(type, callback, false);
	// }

	// // Play
	// if (artistHeroVideoplayer) {

	// 	artistHeroVideoPause.addEventListener('click', () => {
	// 		artistHeroVideoplayer.pause();
	// 		artistHeroVideoPlay.classList.add('active');
	// 		artistHeroVideoPause.classList.remove('active');
	// 	});
	// 	artistHeroVideoplayer.on('ended', function (event) {
	// 		artistHeroVideoPlay.classList.add('active');
	// 		artistHeroVideoPause.classList.remove('active');
	// 	});
	// }


	const videPlayers = Plyr.setup('.video-card__video', {
		fullscreen: {
			iosNative: true
		}
	});
	if (videPlayers) {
		videPlayers.forEach(function (instance, index) {
			instance.volume = '0.5';
			instance.on('play', function () {
				instance.fullscreen.enter();
				videPlayers.forEach(function (instance1, index1) {
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
});

/** Video player big */


