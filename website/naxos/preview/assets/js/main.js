(function ($) {
    "use strict";
	
	//Hide preloader
	$(window).on("load", function() {
		$(".page-loader").fadeOut();
    });
	
	//Smoothscroll effect for custom links
    var btn = $(".smooth-scroll, .smooth-scroll a");
    
	btn.on("click", function() {
        if (location.pathname.replace(/^\//, "")==this.pathname.replace(/^\//, "") && location.hostname==this.hostname) {
			var target = jQuery(this.hash);
			target = target.length ? target : jQuery("[name="+this.hash.slice(1)+"]");
			
			if (target.length) {
				$("html, body").animate({
					scrollTop: target.offset().top
				}, 900);
				
				return false;
			}
        }
    });
	
	//Fade effect for demo items
	var democol = $('.demo .item');
	democol.on({
		mouseenter:function() {
			$(this).siblings().stop().fadeTo(300, 0.8);
		},
		mouseleave:function() {
			$(this).siblings().stop().fadeTo(300, 1);
		}
	});

})(jQuery);