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

	/** Video player big */

	let allVideo = [
		{
			name: "In the end",
			artist: "Linkin Park",
			youtubeId: "eVTXPUF4Oz4",
		},
		{
			name: "Show Me How To Live",
			artist: "Audioslave",
			youtubeId: "vVXIK1xCRpY",
		},
	]

	/* PLAYLIST  */
	var myPlaylist = [
		{
			type: "vimeo",
			title: "SLOVENIA - Cinematic Video",
			author: "Erik Hedenfalk",
			sources: [{
				src: "https://youtu.be/1bwovDOke_4",
				type: "youtube"
			}],
			poster: ""
		},
		{
			type: "vimeo",
			title: "SPACE by gnarly bay",
			author: "gnarly bay",
			sources: [{
				src: "https://vimeo.com/146782320",
				type: "vimeo"
			}],
			poster: ""
		},
		{
			type: "vimeo",
			title: "SLOVENIA",
			author: "",
			sources: [{
				src: "https://vimeo.com/466558674",
				type: "vimeo"
			}],
			poster: ""
		},
	];

	var target = ".js-playerx";
	var players = Plyr.setup(target, {
		fullscreen: {
			iosNative: true
		}
	});
	var id = '#video-main';
	var listclass = "col-sm-12 col-md-5";
	var limit = 30;

	$(document).ready(function () {
		loadPlaylist(target, myPlaylist, id, listclass);  // LOAD VIDEO LIST

	});

	function loadPlaylist(target, myPlaylist, id, listclass) {

		$("li.pls-playing").removeClass("pls-playing");
		$(".plyr-playlist-wrapper").remove();


		limit = limit - 1;


		if (myPlaylist) {

			PlyrPlaylist(".plyr-playlist", myPlaylist, limit, id, listclass);
			//return
		}

		function PlyrPlaylist(target, myPlaylist, limit, id, listclass) {
			$('<div class="plyr-playlist-wrapper  ' + listclass + '"><ul class="plyr-playlist"></ul></div>').insertAfter(id);


			var startwith = 0; // Maybe a playlist option to start with choosen video

			var playingclass = "";
			var items = [];
			$.each(myPlaylist, function (id, val) {

				if (0 === id) playingclass = "pls-playing";
				else playingclass = "";


				items.push(
					'<li class="' + playingclass + '"><a href="#" data-plyr-provider="' + val.sources[0].type + '" data-plyr-embed-id="' + val.sources[0].src + '"><img class="plyr-miniposter" src="' + val.poster + '"> ' +
					val.title + " - " + val.author + "</a></li> ");

				if (id == limit)
					return false;

			});
			$(target).html(items.join(""));



			players[0].on("ended", function (event) {
				var $next = $(".plyr-playlist .pls-playing")
					.next()
					.find("a")
					.trigger("click");
			});

		}

		$(document).on("click", "ul.plyr-playlist li a", function (event) {
			event.preventDefault();
			$("li.pls-playing").removeClass("pls-playing");
			$(this)
				.parent()
				.addClass("pls-playing");
			var video_id = $(this).data("plyr-embed-id");

			var video_type = $(this).data("plyr-provider");
			var video_title = $(this).text();
			players[0].source = {
				type: 'video',
				title: "video_title",
				sources: [{ provider: video_type, src: video_id, type: video_type }]
			};

			players[0].on("ready", function (event) {
				players[0].play();
			});


			$(".plyr-playlist").scrollTo(".pls-playing", 300);

		});

		players[0].on("ready", function (event) {


		});

	}


	/****** GC ScrollTo **********/
	jQuery.fn.scrollTo = function (elem, speed) {
		jQuery(this).animate(
			{
				scrollTop:
					jQuery(this).scrollTop() -
					jQuery(this).offset().top +
					jQuery(elem).offset().top
			},
			speed === undefined ? 1000 : speed
		);
		return this;
	};

	// const videoPlayerWrapper = document.querySelector('.video-player-big');

	// if (videoPlayerWrapper) {

	// 	const videoPlayersBig = Plyr.setup(".video-player__video");
	// 	const
	// 		videoImg = videoPlayerWrapper.querySelector('.player-track__img img'),
	// 		videoName = videoPlayerWrapper.querySelector('.video-list .player-list__item-media'),
	// 		videoArtist = videoPlayerWrapper.querySelector('.video-list .player-list__item-artist'),
	// 		videoMain = videoPlayerWrapper.querySelector('#main-video .plyr'),
	// 		videoPlayPauseBtn = videoPlayerWrapper.querySelector('#play-video'),
	// 		videoPrevBtn = videoPlayerWrapper.querySelector('#prev-video'),
	// 		videoNextBtn = videoPlayerWrapper.querySelector('#next-video'),
	// 		videoProgressBar = videoPlayerWrapper.querySelector('.progress_bar'),
	// 		videoProgressArea = videoPlayerWrapper.querySelector('.progress-area'),
	// 		videoVolumeBtn = videoPlayerWrapper.querySelector('#song-sound'),
	// 		videoVolumeSliderContainer = videoPlayerWrapper.querySelector('.sound-input'),
	// 		videoVolumeSlider = videoPlayerWrapper.querySelector('.sound-container .sound-control'),
	// 		videoBottomControlsSongThumb = videoPlayerWrapper.querySelector('.player-controls-song-details img');

	// 	let videoIndex = 1;

	// 	function loadVideo(indexNumb) {
	// 		videoName.innerText = allVideo[indexNumb - 1].name;
	// 		videoArtist.innerText = allVideo[indexNumb - 1].artist;
	// 		videoImg.src = 'https://i.ytimg.com/vi/' + `${allVideo[indexNumb - 1].youtubeId}` + '/maxresdefault.jpg';
	// 	}

	// 	window.addEventListener('load', () => {
	// 		loadVideo(videoIndex);
	// 		console.log(videoMain);
	// 		// videoPlayingNow();
	// 	});

	// 	// // Play music function
	// 	// function playVideo() {
	// 	// 	// playerWrapper.classList.add('paused');
	// 	// 	// playerProgressArea.classList.add('is-visible');
	// 	// 	videoMain.play();
	// 	// }

	// 	// videoPlayPauseBtn.addEventListener('click', () => {
	// 	// 	// const isMusicPaused = playerWrapper.classList.contains('paused');
	// 	// 	// isVideoPaused ? pauseVideo() : playVideo();
	// 	// 	playVideo();
	// 	// 	// playingNow();
	// 	// });


	// }



});

