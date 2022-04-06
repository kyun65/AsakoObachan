(function ($, window, undefined) {

	var $window, $btnPtop;
	var wh, scrolled_top, fixed_pos;
	var PTOP_BOTTOM = 40;



	/*------------------------------------------------*/
	/*[MODULE]*/

	var anchorScroll = function () {
		$('a[href^="#"][class!="noJump"]').on('click', function () {
			var speed = 800;
			var href = $(this).attr('href');
			var target = $(href == '#' || href == '' ? 'html' : href);
			var position = target.offset().top;
			$('body,html').animate({
				scrollTop: position
			}, speed, 'swing');

			return false;
		});
	};

	var randomKv = function () {
		const el = $('.miniKv__box');
		const min = 1;
		const max = 1;
		const random = Math.floor(Math.random() * (max + 1 - min) + min);
		el.addClass('miniKv__box--0' + random);
	}

	var tab = function () {
		const recommend = $('.recommend');
		const osechi = $('.osechi');
		const btn = $('.tab__btn');
		btn.each(function (index, el) {
			btn.eq(index).on('click', function () {
				$('.show').removeClass('show');
				$('.inactive').removeClass('inactive');
				if (index == 0) {
					btn.eq(1).addClass('inactive');
					recommend.addClass('show');
				} else {
					btn.eq(0).addClass('inactive');
					osechi.addClass('show');
					// $('.btn').css('background-color','#gray')
				}
				if ($('.cnt .anime').hasClass('on')) {
					$('.cnt .anime').removeClass('on')
					onScrollHandler();
				}
			})
		})
	}

	/*------------------------------------------------*/
	/*[SCROLL HANDLER/RESIZE HANDLER]*/
	var onScrollHandler = function () {
		scrolled_top = $window.scrollTop();

		$('.anime').each(function () {
			var trigger_pos = $(this).offset().top - wh * 0.6;
			if (!$(this).hasClass('on') && trigger_pos < scrolled_top) $(this).addClass('on');
		});


		if (fixed_pos < scrolled_top && $('#wrap_ft01').offset().top > scrolled_top + $('.anchor__inner').outerHeight()) {
			$('.anchor__inner ul').addClass('fixed');
			$('.anchor__inner').css({
				'padding-bottom': nav_h
			});
		} 
		else {
			$('.anchor__inner ul').removeClass('fixed');
			$('.anchor__inner').css({
				'padding-bottom': 0
			});
		}


		// if(off_pos < scrolled_top) {
		// 	$('.anchor__inner ul').fadeOut();
		//   }else{
		// 	$('.anchor__inner ul').fadeIn();
		//   }


		if (scrolled_top > 150) {
			var footer_pos = $('.contents').offset().top + $('.contents').outerHeight() - wh;
			$btnPtop.addClass('on');
			if (footer_pos < scrolled_top) {
				$btnPtop.css({
					bottom: scrolled_top - footer_pos + PTOP_BOTTOM
				});
			} else {
				$btnPtop.css({
					bottom: PTOP_BOTTOM
				});
			}
		} else {
			$btnPtop.removeClass('on');
		}
	};

	var onResizeHandler = function () {
		wh = $window.innerHeight();
		fixed_pos = $('.anchor__inner ul').offset().top;
		nav_h = $('.anchor__inner ul').outerHeight();
		off_pos = $('#wrap_ft01').offset().top - nav_h / 3;
	};


	$(function () {
		$window = $(window);
		$btnPtop = $('.btn--ptop');

		onResizeHandler();
		$window.on('resize', onResizeHandler);

		onScrollHandler();
		$window.on('scroll', onScrollHandler);

		// anchorScroll();
		tab();
	});

	$(window).on('load', function () {
		// onScrollHandler();
		randomKv();
		$('.kv').addClass('on');
	});


})(jQuery, window);

$(function () {
	window.onscroll = function () {
	  var check = window.pageYOffset ;    
	  var docHeight = $(document).height();  
	  var dispHeight = $(window).height();  
  
	  if(check > docHeight-dispHeight-800){   
		  $('.anchor ul').fadeOut(400);
  
	  }else{
		  $('.anchor ul').fadeIn(400);	
	  }
  };
  });


