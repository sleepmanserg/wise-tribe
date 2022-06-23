import { menuToggle } from './theme.min.js';
import { allSliders } from './theme.min.js';
import { innerSliders } from './theme.min.js';
import { lazyImages } from './theme.min.js';
import { preloaderFunction } from './theme.min.js';
import { videoPlayerPage } from './theme.min.js';
import { formsFunction } from './theme.min.js';
import { coreFunctions } from './theme.min.js';
import { getData } from './player.js';
import { init } from './player.js';
import { modalAudioPlayer } from './player.js';
import { heroAudioPlayer } from './player.js';

$(function(){
	
	var loadMore = function() {
		if ($(".events-grid").data('all') == $(".events-card").length) {
			$(".events-load-more").addClass("_hidden");
		}

		if ($(".artists-grid").data('all') == $(".artists-card").length) {
			$(".artists-load-more").addClass("_hidden");
		}

		$(".events-load-more").on("click", function () {
			var items = $(".events-card").length;
			var lang = $(".events-grid").data('lang');
			$.ajax({
				url: "/events/load-more",
				data: {'items': items, 'lang': lang},
				method: 'POST',
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				success: function (data) {
					$(".events-grid").append(data['html']);
					var all_items = $(".events-grid").data('all');
					var items = $(".events-card").length;
					if (parseInt(items) == parseInt(all_items)) {
						$(".events-load-more").addClass("_hidden");
					}
					imagesLoading();
				}
			});
		});

		$(".artists-load-more").on("click", function () {
			var items = $(".artists-card").length;
			var lang = $(".artists-grid").data('lang');
			$.ajax({
				url: "/artists/load-more",
				data: {'items': items, 'lang': lang},
				method: 'POST',
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				},
				success: function (data) {
					$(".artists-grid").append(data);
					var all_items = $(".artists-grid").data('all');
					var items = $(".artists-card").length;
					if (parseInt(items) == parseInt(all_items)) {
						$(".artists-load-more").addClass("_hidden");
					}
					imagesLoading();
				}
			});
		});
	}
	
	loadMore();
	
	

	$(document.body).on('click', "a[data-ajax-link]", function(e){
		var lang = $("html").attr('lang');
		var action = $(this).attr("href");
		
		var stateObj = { foo: action };
		history.pushState(stateObj, "page", action);
		
		$.ajax({
			url: action,
			data: {'lang': lang},
			method: 'POST',
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			},
			success: function (data) {
				$("main").html(data['html']);
				allSliders();
				innerSliders();
				lazyImages();
				preloaderFunction();
				videoPlayerPage();
				formsFunction();
				loadMore();

				getData();
				init();
				modalAudioPlayer();
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
						document.body.classList.add('overflow-hidden');
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
					document.body.classList.remove('overflow-hidden');
					document.body.style.paddingRight = '0';
				}
				if (audioModalBackBtn && audioModalexitFullscreenBtn) {
					audioModalBackBtn.addEventListener('click', audioModalFullScreenExit);
					audioModalexitFullscreenBtn.addEventListener('click', audioModalFullScreenExit);
				}
			}
		});

		return false;
	});
});