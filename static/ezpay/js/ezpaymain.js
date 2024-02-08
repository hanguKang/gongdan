$(function() {
	
	// tabMenu on / off
	$.fn.noticetab = function(options, configs) {
		var tabtitlist = $(this);
		var list_type = (tabtitlist.find('ul').length)?'ul':'ol';
		var a_type = 'a.more';

		tabtitlist.find(list_type).hide().end().find(list_type+':first').show();
		tabtitlist.find(a_type).hide().end().find(a_type+':first').show();
		var tablink = tabtitlist.find('h3 a');
		$(tabtitlist).each(function(){
			//mouseover
			$(this).find('h3 a').bind('click' , function(){
				tabtitlist.removeClass("on");
				tablink.removeClass("on");
				$(this).addClass("on");
				$(tabtitlist).find(list_type).hide();
				$(tabtitlist).find(a_type).hide();
				var index = $(tablink).index(this);
				var temp = $(tabtitlist).find(list_type);
				$(temp[index]).show()
				$($(tabtitlist).find(a_type)[index]).show()
			});
		});
	};
	// $(".noticeTabs").noticetab();

	//visualSlide
	var visualSlide = $(".visualSlide").slick({
		accessibility : true,
		autoplay: false,
		autoplaySpeed:4000,
		//speed:500,
		//dots: true,
		touchMove:false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows:true,
		prevArrow  : '.visualSlideLt',
		nextArrow : '.visualSlideRt',
		//slickPlay : '.b-play',
		//slickStop : '.b-stop',
		pauseOnFocus: true,
		pauseOnHover : true,
		responsive: [
			 {
				breakpoint: 1023,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		//fade : true
		// draggable: false,
		//focusOnSelect: true
		]
	});

	$(".visualSlidePlay").click(function(){
		visualSlide.slick('slickPlay');
		$(this).hide();
		$(".visualSlideStop").show();
	})
	$(".visualSlideStop").click(function(){
		visualSlide.slick('slickPause');
		$(this).hide();
		$(".visualSlidePlay").show();
	})



	var popupZone = $(".popupZone").slick({
		accessibility : true,
		autoplay: true,
		autoplaySpeed:4000,
		//speed:500,
		//dots: true,
		touchMove:true,
		// touchMove:false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows:true,
		prevArrow  : '.popupZoneLt',
		nextArrow : '.popupZoneRt',
		//slickPlay : '.b-play',
		//slickStop : '.popupZoneStop',
		
		stopArrow : '.popupZoneStop',
		
		
		pauseOnFocus: true,
		pauseOnHover : true,
		responsive: [
			 {
				breakpoint: 1023,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1
				}
			}
		//fade : true
		// draggable: false,
		//focusOnSelect: true
		]
	});

	// 키보드 포커스 정지 기능 추가 
	$(".popupZone .items a").on("focus", function(){
		popupZone.slick('slickPause');
	})
	
	$(".popupZonePlay").click(function(){
		popupZone.slick('slickPlay');
		$(this).hide();
		$(".popupZoneStop").show();
	})
	$(".popupZoneStop").click(function(){
		popupZone.slick('slickPause');
		$(this).hide();
		$(".popupZonePlay").show();
	})


	var footerAdList = $(".footerAd-list").slick({
		accessibility : true,
		autoplay: true,
		autoplaySpeed:4000,
		//speed:500,
		//dots: true,
		touchMove:false,
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows:true,
		prevArrow  : '.footerAd_pre',
		nextArrow : '.footerAd_next',
		//slickPlay : '.b-play',
		//slickStop : '.b-stop',
		pauseOnFocus: true,
		pauseOnHover : true,
		responsive: [
			 {
				breakpoint: 1023,
				settings: {
					slidesToShow: 5
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2
				}
			}
		//fade : true
		// draggable: false,
		//focusOnSelect: true
		]
	});

	$(".footerAd_play").click(function(){
		footerAdList.slick('slickPlay');
		$(this).hide();
		$(".footerAd_stop").show();
	})
	$(".footerAd_stop").click(function(){
		footerAdList.slick('slickPause');
		$(this).hide();
		$(".footerAd_play").show();
	})






});
