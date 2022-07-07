//
// Custom Scripts
// --------------------------------------------------

/** All sliders function */

const allSliders = function () {

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
	/** Events slider */

	const swiperEvents = new Swiper(".events-slider", {
		effect: "coverflow",
		slidesPerView: 'auto',
		grabCursor: true,
		speed: 500,
		loop: true,
		loopFillGroupWithBlank: true,
		centeredSlides: true,
		slideToClickedSlide: true,
		preloadImages: false,
		lazy: true,
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
	});

	/** Mixes slider */

	const swiperMixes = new Swiper(".mixes-slider", {
		grabCursor: true,
		speed: 500,
		preloadImages: false,
		lazy: true,
		navigation: {
			nextEl: ".mixes-button-next",
			prevEl: ".mixes-button-prev"
		},
		breakpoints: {
			320: {
				slidesPerView: 2.1,
				centeredSlides: true,
				spaceBetween: 20,
				slidesPerGroup: 1,
				loop: true
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 20,
				slidesPerGroup: 3,
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 30,
				slidesPerGroup: 3,
			},
			1366: {
				slidesPerView: 4,
				spaceBetween: 40,
				slidesPerGroup: 4,
			},
			1700: {
				slidesPerView: 'auto',
				spaceBetween: 40,
				// slidesPerGroup: 4,
				centeredSlides: true,
				loop: true
			},
		},
	});

	/** Releases slider */

	const swiper = new Swiper(".releases-slider", {
		effect: "cards",
		grabCursor: true,
		preloadImages: false,
		lazy: true,
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
			nextEl: '.circle-button-next.popular-slider__btn',
			prevEl: '.circle-button-prev.popular-slider__btn',
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
		// preloadImages: false,
		// lazy: true,
		pagination: {
			clickable: true,
			el: ".studio-pagination",
		},
	});

	/** Tiktok slider */

	/** Check for resize */

	function checkForWindowResize() {
		function sliderPaddingHack() {

			let offsetSliders = document.querySelectorAll('.offset-slider');

			offsetSliders.forEach(slider => {
				let sliderContent = slider.closest('.offset-slider__content');
				let sliderWidth = sliderContent.offsetWidth;
				let containerWidth = document.querySelector('.container').offsetWidth;
				let sliderOffset = (sliderWidth - containerWidth) / 2;

				// console.log(sliderWidth);
				// console.log(containerWidth);
				// console.log(sliderOffset);

				sliderContent.style.paddingLeft = sliderOffset + 'px';
				// console.log(slider);
			});

		};

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

	const swiperTiktok = new Swiper(".tiktok-slider", {
		slidesPerView: 'auto',
		spaceBetween: 15,
		speed: 500,
		preloadImages: false,
		lazy: true,
		navigation: {
			nextEl: '.circle-button-next.tiktok-slider__btn',
			prevEl: '.circle-button-prev.tiktok-slider__btn',
		},
		breakpoints: {
			575: {
				spaceBetween: 20,
			},
			1024: {
				spaceBetween: 30,
			},
			// 1366: {
			// 	spaceBetween: 30,
			// },
			// 1700: {
			// 	spaceBetween: 30,
			// },
			// 1921: {
			// 	spaceBetween: 30,
			// },
		},
		on: {
			init: function () {
				tiktokSliderBtnPosition();
			},
		}
	});

	/** Projects slider */

	const projectsSlider = new Swiper('.projects-slider', {
		slidesPerView: 'auto',
		spaceBetween: 20,
		grabCursor: true,
		speed: 500,
		navigation: {
			nextEl: '.circle-button-next.projects-slider__btn',
			prevEl: '.circle-button-prev.projects-slider__btn',
		},

		breakpoints: {
			320: {
				spaceBetween: 15,
			},
			575: {
				spaceBetween: 20,
			},
			768: {
				spaceBetween: 20,
			},
			1024: {
				spaceBetween: 30,
			},
			1366: {
				spaceBetween: 40,
			},
			1700: {
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
		let projectsSliderArrow = document.querySelector('.projects-slider__nav');
		let projectsSliderArrowHeight = projectsSliderArrow.offsetHeight / 2;
		let projectsSliderImgHeight = projectsSLiderImg.offsetHeight / 2 - projectsSliderArrowHeight;

		projectsSliderArrow.style.top = projectsSliderImgHeight + 'px';
	}

	if (document.querySelector('.projects-slider__btn')) {
		sliderArrowPosition();
	}
}

/** Inner sliders function */

const innerSliders = function () {
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

	/** Projects slider */

	const videosSlider = new Swiper('.video-slider', {
		slidesPerView: 1.2,
		spaceBetween: 20,
		grabCursor: true,
		speed: 500,
		slideToClickedSlide: true,
		slidesPerGroup: 1,
		navigation: {
			nextEl: ".video-button-next",
			prevEl: ".video-button-prev"
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
			// console.log(slider);
		});

	};

	sliderPaddingHack();
}

/** Lazy images function */

const lazyImages = function () {
	const images = Array.from(document.querySelectorAll('img[data-src]'));

	if ('IntersectionObserver' in window) {
		const imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const image = entry.target;
					const imageSiblingSource = entry.target.previousElementSibling;

					// console.log(imageSiblingSource);

					if (imageSiblingSource) {
						if (imageSiblingSource.hasAttribute('data-srcset')) {
							imageSiblingSource.srcset = imageSiblingSource.dataset.srcset;
							imageSiblingSource.removeAttribute('data-srcset');
						}
					}


					image.src = image.dataset.src;
					image.removeAttribute('data-src');

					image.onload = () => image.style.opacity = '1';

					imageObserver.unobserve(image);
				}
			});
		});

		images.forEach(img => imageObserver.observe(img));
	}

	const lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

	if ("IntersectionObserver" in window) {
		let lazyBackgroundObserver = new IntersectionObserver(function (entries, observer) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("visible");
					lazyBackgroundObserver.unobserve(entry.target);
				}
			});
		});

		lazyBackgrounds.forEach(function (lazyBackground) {
			lazyBackgroundObserver.observe(lazyBackground);
		});
	}
}

/** Preloader function */

const preloaderFunction = function () {
	/** Preloader */

	window.addEventListener('DOMContentLoaded', (event) => {
		const preloadHome = document.querySelector('.preloader-home');
		const preloadSite = document.querySelector('.preloader-site');

		if (preloadHome) {
			setTimeout(function () {
				document.body.style.overflow = '';
				document.body.style.paddingRight = '';
				preloadHome.classList.add('loaded');
			}, 0);
		}
		if (preloadSite) {
			setTimeout(function () {
				document.body.style.overflow = '';
				document.body.style.paddingRight = '';
				preloadSite.classList.add('loaded');
			}, 1500);
		}
	});
}

/** Forms function */

const formsFunction = function () {
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


	document.addEventListener('DOMContentLoaded', () => {

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

	});

}

/** Core function */

const coreFunctions = function () {
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

	/** Decorations parallax */

	const rellax = new Rellax('.rellax');
}

coreFunctions();
allSliders();
innerSliders();
lazyImages();
preloaderFunction();
formsFunction();
