jQuery(document).ready(function(){

	// Secondary nav menu
	jQuery("a.sec-trigger").click(function(){
        jQuery("div.cd-secondary-nav > ul").toggle();
    });
	jQuery("#content, #primary-nav").click(function(){
		if (isTablet()) {
			jQuery("div.cd-secondary-nav > ul").css('display', 'none');
		}
	});
});

jQuery(document).ready(function($){
	var mainHeader = $('.cd-auto-hide-header'),
		secondaryNavigation = $('.cd-secondary-nav'),
		//this applies only if secondary nav is below intro section
		belowNavHeroContent = $('.sub-nav-hero'),
		headerHeight = mainHeader.height();
	
	//set scrolling variables
	var scrolling = false,
		previousTop = 0,
		currentTop = 0,
		scrollDelta = 10,
		scrollOffset = 150;

	mainHeader.on('click', '.nav-trigger', function(event){
		// open primary navigation on mobile
		event.preventDefault();
		mainHeader.toggleClass('nav-open');
	});

	$(window).on('scroll', function(){
		if( !scrolling ) {
			scrolling = true;
			(!window.requestAnimationFrame)
				? setTimeout(autoHideHeader, 250)
				: requestAnimationFrame(autoHideHeader);
		}
	});

	$(window).on('resize', function(){
		headerHeight = mainHeader.height();
	});

	function autoHideHeader() {
		var currentTop = $(window).scrollTop();

		( belowNavHeroContent.length > 0 ) 
			? checkStickyNavigation(currentTop) // secondary navigation below intro
			: checkSimpleNavigation(currentTop);

	   	previousTop = currentTop;
		scrolling = false;
	}

	function checkSimpleNavigation(currentTop) {
		//there's no secondary nav or secondary nav is below primary nav
	    if (previousTop - currentTop > scrollDelta) {
	    	//if scrolling up...
	    	mainHeader.removeClass('is-hidden');
	    } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
	    	//if scrolling down...
	    	mainHeader.addClass('is-hidden');
	    }
	}

	function checkStickyNavigation(currentTop) {
		//secondary nav below intro section - sticky secondary nav
		var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();
		
		if (previousTop >= currentTop ) {
	    	//if scrolling up... 
	    	if( currentTop < secondaryNavOffsetTop ) {
	    		//secondary nav is not fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('fixed slide-up');
	    		belowNavHeroContent.removeClass('secondary-nav-fixed');
	    	} else if( previousTop - currentTop > scrollDelta ) {
	    		//secondary nav is fixed
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.removeClass('slide-up').addClass('fixed'); 
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    	
	    } else {
	    	//if scrolling down...	
	 	  	if( currentTop > secondaryNavOffsetTop + scrollOffset ) {
	 	  		//hide primary nav
	    		mainHeader.addClass('is-hidden');
	    		secondaryNavigation.addClass('fixed slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	} else if( currentTop > secondaryNavOffsetTop ) {
	    		//once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset 
	    		mainHeader.removeClass('is-hidden');
	    		secondaryNavigation.addClass('fixed').removeClass('slide-up');
	    		belowNavHeroContent.addClass('secondary-nav-fixed');
	    	}
	    }
	}

	//expand text
	jQuery('.rest').addClass('hidden');
	jQuery(".expand-text").click(function() {
		jQuery(this).siblings('.rest').removeClass('hidden');
		jQuery(this).addClass('hidden');
	});
});

jQuery(document).ready(function(){
    jQuery("div.pf-hero-cnt , div.pf-video-row").click(function(event){
    	var vid = document.getElementById("video_html5_api"); 
    	var class_string = event.target.getAttribute("class");

    	if (class_string.indexOf('vjs') == -1 ) {
        	jQuery("div.pf-video-row").toggle();

        	//pause video
        	vid.pause(); 
    	}
    });

    //comparison chart
    $(".panel-heading").click(function() {
      const	mq = window.matchMedia( "(max-width: 768px)" );

      var id = $(this).parent().attr('data-target');
      var anchor = $(id);
      setTimeout(function(){ 
      	if (mq.matches) {
	      	$('html').animate({scrollTop: (anchor.offset().top - 170)},'slow');
	      } else {
	      	$('html').animate({scrollTop: (anchor.offset().top - 220)},'slow');
	      }
      }, 300);
    });

    //tab buttons
    $(".tab-button a").click(function() {
    	$('html, body').animate({ scrollTop: 80 }, "350");

	    var href = $(this).attr('href');
    	setTimeout(function(){
	    	$('.vc_tta-tab a[href="' + href.slice(0, -1) + '"]').click();
		}, 370);
    });
    if (!isMobile()) {
    	// Show the tab on desktop
    	$('.vc_tta-tabs-list li').first().addClass('vc_active');
    	$('.vc_tta-panels-container .vc_tta-panel').first().addClass('vc_active');
    } else {

	    // On mobile, close panel when clicked if it's open
	    $(".clients-tabs .vc_tta-panel-heading a").click(function() {
			var $panel = $(this).closest('.vc_tta-panel');
			var $body = $panel.find('.vc_tta-panel-body');
	    	
	    	if ($(this).hasClass('active') && $body.css('display') != 'none') {
	    		$body.css("display", "none");

	    	} else if ( $(this).hasClass('active') && $body.css('display') == 'none' ) {
	    		$body.css("display", "block");
	    	}
	    });
    }

    // IE flex box sizing
    if (detectIE()) {
    	$('.software-row .vc_column-inner').css('height', '100%');
    }
});

// jQuerydocument.addEventListener( 'wpcf7mailsent', function( event ) {
//     location = 'http://enautics.wp/request-success-beta/';
// }, false );


/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

function isMobile() {
	var mq = window.matchMedia( "(max-width: 767px)" );
	return mq.matches;
}
function isTablet() {
	var mq = window.matchMedia( "(max-width: 1024px)" );
	return mq.matches;
}