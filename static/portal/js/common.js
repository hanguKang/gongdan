if(!(window.console && console.log)) {
  console = {
    log: function(){},
    debug: function(){},
    info: function(){},
    warn: function(){},
    error: function(){}
  };
}
$(function() {
	$('.daummap').each(function(index, el) {
		maps($(this).data().location, $(this).attr('id'))
	});
});
function maps(addr,targetID) {
	if (targetID==null) {
		var mapContainer = document.getElementById('map') // 지도를 표시할 div
	}else{
		var mapContainer = document.getElementById(targetID) // 지도를 표시할 div
	}

	var mapOption = {
	        center: new daum.maps.LatLng(37.496982408306266,127.04100916915156), // 지도의 중심좌표
	        level: 3 // 지도의 확대 레벨
	    };

	// 지도를 생성합니다
	var map = new daum.maps.Map(mapContainer, mapOption);
	// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
	var mapTypeControl = new daum.maps.MapTypeControl();

	// 지도 타입 컨트롤을 지도에 표시합니다
	map.addControl(mapTypeControl, daum.maps.ControlPosition.TOPRIGHT);
	// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
	var zoomControl = new daum.maps.ZoomControl();
	map.addControl(zoomControl, daum.maps.ControlPosition.RIGHT);

	// 마우스 드래그로 지도 이동 가능여부를 설정합니다
	map.setDraggable(false);

	// 주소-좌표 변환 객체를 생성합니다
	var geocoder = new daum.maps.services.Geocoder();

	// 주소로 좌표를 검색합니다
	geocoder.addressSearch(addr, function(result, status) {

	    // 정상적으로 검색이 완료됐으면
	     if (status === daum.maps.services.Status.OK) {

	        var coords = new daum.maps.LatLng(result[0].y, result[0].x);
	        // 결과값으로 받은 위치를 마커로 표시합니다
	        var marker = new daum.maps.Marker({
	            map: map,
	            position: coords
	        });

	        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	        map.setCenter(coords);
	    }
	});
}

$(function() {
	// ptbox 높이가 126보다 크면 이미지 높이 재조정
	$('.ptbox').each(function(index, el) {
		if ($(this).height() > 130) {
			$(this).addClass('posy')
		}
	});
	// 레이어팝업 닫기 버튼
	$('.lpopwrap').on('click', '.b-cancel,.lpopwrapClose', function(event) {
		event.preventDefault();
		$('.lpopwrap').hide();
	});

	// 전체메뉴
	$('#allNav .s').html($('#gnb>ul').clone())
	$('.allNavClose').click(function(event) {
		$('#allNav').removeClass('on');
	});

	//공통 이미지 변경
	function imgOn(item){
			var image = item.children("img");
			var imgsrc = $(image).attr("src");
			var on;
		if ($(image).length){
			var on = imgsrc.replace(/_off.gif/,"_on.gif");
			$(image).attr("src",on);
		}
			$(image).attr("src",on);
	}
	function imgOff(item){
			//var image = item.children("img");
			var image = item.find("img");
			for(var i=0;i<image.length;i++){
					var imgsrc = $(image[i]).attr("src");
					var off = imgsrc.replace(/_on.gif/,"_off.gif");
					$(image[i]).attr("src",off);
			}
	}


	$('#gnb >ul>li').each(function(index, el) {
		if ($(this).has('ul').length<1) {
			$(this).addClass('nosub')
		}
	});

	// gnb
	var menuover=false; //메뉴가 활성화 되고있는지 파악
	var clearenter
	//gnb 시작
	var bgIndex;
	var gnb_link_depth1=$("#gnb>ul>li");				// 1depth
	var gnb_link_depth2=$("#gnb>ul>li>div>div>ul>li");			// 2depth
	var gnb_link_depth3=$("#gnb>ul>li>div>div>ul>li>ul>li");	// 3depth
	var gnbBg = $(".bg_gnb");

	function menuclear(){
		// console.log(menuover)
		if(!menuover){
			gnb_link_depth1.removeClass("on"); //지워야할 클래스위치
			gnb_link_depth2.removeClass("on"); //지워야할 클래스위치
			gnbBg.hide();
			$('#gnb').removeClass('active')
			$('#gnb').removeClass('on')
		}
	}
	gnb_link_depth1.each(function(){
		$(this).find('>a').on('touchstart', function(event) {
			if ($(this).has('ul').length>0) {
				if ($(window).width()>991) {
					$('#gnb').addClass('on');
					event.preventDefault();
				}
			}
		});
		$(this).on('mouseenter keyup' , function(event) {
			if ($(window).width()>991) {
				event.preventDefault();
				clearTimeout(clearenter)
				menuover=true;
				$('#gnb').addClass('on');
				gnbBg.show();
			}
		});

	});
	$('#gnb').on('mouseleave', function() {
		if ($(window).width()>991) {
			menuover = false;
			clearTimeout(clearenter);
			clearenter = setTimeout(function () {
				menuclear();
			}, 500)
		}
	});
	$('.visualSlideLt, .lnb>ul>li:first-child>a').on('focus', function(e) {
		//if(!(e.shiftKey && e.keyCode == 9) && e.keyCode == 9 ){
			menuover = false;
			clearTimeout(clearenter);
			clearenter = setTimeout(function () {
				menuclear();
			}, 500)
		//}
	});
});


// ---------------------------------------------------- //
// SLIDER GALLERY
// ---------------------------------------------------- //
var sliderGallery = function() {
	/*** Vars ***/
	var gallery = '.tab-list',
		slider = false;
	/*** Init ***/
	var init = function() {
		manage(); // On load (1*)
		$(window).on('resize', function(){ // On resize (2*)
			waitForFinalEvent(function(){
				manage();
			}, 200, "sliderGallery");
		});
	};
	/*** Manage slider ***/
	var manage = function() {
		var isMobile = $(window).width()<992 ? true:false;
		if( isMobile && !slider ) { // If mobile and slider not built yet = build
			build();
		}
		else if( !isMobile && slider ) { // Not mobile but slider built = destroy
			destroy();
		}
	};
	/*** Build slider ***/
	var build = function() {
		slider = $(gallery).addClass('owl-carousel'); // Add owl slider class (3*)
		// $(gallery).parent().removeClass('tab')
		slider.owlCarousel({ // Initialize slider
			items:2,
			slideBy:1,
			nav:true,
			loop:false,
			dots:false,
			autoWidth:true,
			margin:32,
		});
	};
	/*** Destroy slider ***/
	var destroy = function() {
		slider.trigger('destroy.owl.carousel'); // Trigger destroy event (4*)
		slider = false; // Reinit slider variable
		$(gallery).removeClass('owl-carousel'); // Remove owl slider class (3*)
		// $(gallery).parent().addClass('tab')
	};
	/*** Public methods***/
	return {
		init: init
	};
}();
// ---------------------------------------------------- //
// PREVENT MULTIPLE CALLS
// ---------------------------------------------------- //
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) {
			uniqueId = "Don't call this twice without a uniqueId";
		}
		if (timers[uniqueId]) {
			clearTimeout (timers[uniqueId]);
		}
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// 썸네일 게시판 컨트롤
$(function() {

	// 제목 버튼 클릭 시
	$('.type-title').click(function(event) {
		$(this).addClass('on').siblings().removeClass('on');
		$('.thumList').addClass('type-title').removeClass('type-photo');
		$(this).attr("title", "활성화됨");
		$('.type-photo').removeAttr("title");
	});

	// 포토 버튼 클릭 시
	$('.type-photo').click(function(event) {
		$(this).addClass('on').siblings().removeClass('on');
		$('.thumList').removeClass('type-title').addClass('type-photo');
		$(this).attr("title", "활성화됨");
		$('.type-title').removeAttr("title");
	});
});

// 글자수 제한
$(function() {
	$('.characterLen').each(function(index, el) {
		//$(this).parent().append('<p class="characterLenDeco">'+$(this).data().lensize+'자 남음'+'</p>')
		$(this).keyup(function (e){
			var selfintroduction = $(this).val();
			var str = $(this).val();
			var spacecount = count(str)
			var limit = $(this).data().lensize;
			$(this).next().html(limit-spacecount+'자 남음');
			if(limit < spacecount){
				alert("글자수는 "+limit+"자를 초과할수 없습니다.");
				// $(this).val(str.substring(0,limit))
			}
		})
		.next().html(count($(this).val())+'자 남음')
	});
});

function count(texts)
{
	var spacenum=0, total=0, linenum=0, minusnum=0, multibyte=0, singlebyte=0;

	for(i=0;i<texts.length;i++){

		if(texts.charAt(i)==' '){
			spacenum++;
		}
		if(texts.charCodeAt(i)==13 || texts.charCodeAt(i)==10){
			minusnum++;
		}
		if(texts.charCodeAt(i)==10){
			linenum++;

		}
		if(texts.charCodeAt(i)>255){
			multibyte++;
		}else{
			singlebyte++;
		}

	}
	total = (multibyte*2) + singlebyte - minusnum;
	return total = total + linenum;
}
$(function(){
	// 타겟뷰
	var tagetShow = $('.stv a')
	$(tagetShow).each(function(index) {
		$(this).bind('click', function(event) {
			console.log('a')
			$(this).attr('title','선택됨').parent().addClass('on')
				   .siblings().removeClass('on').find('a').removeAttr('title');
			for (var i = 0; i < tagetShow.length; i++) {
				$($(tagetShow[i]).attr('href')).hide();
			};
			$($(this).attr('href')).show();
			event.preventDefault();
		});
	});




	var _opner2;
	if($('a.prettyPhoto2').length > 0){
		$('a.prettyPhoto2')
			.prettyPhoto({social_tools:false})
			.click(function(event){
				_opner2=$(this);
				$('.pp_pic_holder').focus();
			});
	}
})


// 접근성 수정
$(function() {

	var keyboardchk = false;
	$('body').on('keydown', function(event) {
		if (event.keyCode==9) {
			keyboardchk=true;
		}
	});
	$('body').on('click', function(event) {
		keyboardchk=false;
		$('.keyboardControlActive').removeClass('keyboardControlActive')
	});
	$('.owl-prev,.owl-next').each(function(index, el) {
		$(this).attr('tabindex', '0');
		$(this).bind('click keydown', function(event) {
			if (event.keyCode==13 || event.type == 'click'){
				$('.owl-stage').removeClass('keyboardControlActive');
				$('.owl-stage-outer').scrollLeft(0);
				event.preventDefault();
			}
		});
	});
	$('.item a').on('focus', function(event) {
		if (keyboardchk) {
			$(this).parents('.owl-stage').addClass('keyboardControlActive');
			$(this).parents('.owl-carousel').trigger('stop.owl.autoplay');
		}
	});

});




$(function(){
	if ($("a[rel^='prettyPhoto[pp_gal]']").length>0) {
		$("a[rel^='prettyPhoto[pp_gal]']").prettyPhoto({
			animation_speed:'fast',
			slideshow:10000,
			social_tools:false
		}).click(function(event) {
			_opner=$(this)
			$('.pp_pic_holder').focus();
		});
	}
  var photoViewThumbs = $(".photoViewThumbs").slick({
    autoplay: false,
    autoplaySpeed:3000,
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows:true,
    prevArrow:'.prevphotosm',
    nextArrow:'.nextphotosm',
    // asNavFor: '.photoviewSlick',
    focusOnSelect:true,
    accessibility : true,
    responsive: [
    	 {
    		breakpoint: 1023,
    		settings: {
    			slidesToShow: 4
    		}
    	},
    	{
    		breakpoint: 769,
    		settings: {
    			slidesToShow: 3
    		}
    	},
    	{
    		breakpoint: 481,
    		settings: {
    			slidesToShow: 1
    		}
    	}
    	]
  });
});

//220926 련정추가
$(function () {
  $('#subtsh ul li:first-child').click(function () {
    $(this).siblings('li').slideToggle(300);
    // return false;
  });
});

/* 홈스트리 view 관련 버튼 추가 2023.04.05*/
// file_url : 파일경로
// file_name: 파일명 - 파일경로에서 파일명을 추출할 수 없는 경우 파일명을 입력해주십시오.
function preview(file_url, file_name) {
	var apiKey = "AIXYMMBKJMEEIFDXC0W8TW";
	var cc = "sb";

	file_url = 'https://www.gongdan.go.kr' + file_url;

	var fileUrl = encodeURIComponent(file_url);
	var fileName = encodeURIComponent(file_name);
	window.open("https://viewstory.net/previewAjax.do?apikey={0}&cc={1}&url={2}&fileName={3}".format(apiKey, cc, fileUrl, fileName),"a", "width=1200, height=1000, left=100, top=50");
}
function preListen(file_url, file_name) {
	var apiKey = "AIXYMMBKJMEEIFDXC0W8TW";
	var cc = "sb";

	file_url = 'https://www.gongdan.go.kr' + file_url;

	var fileUrl = encodeURIComponent(file_url);
	var fileName = encodeURIComponent(file_name);
	window.open("https://viewstory.net/voiceOverAjax.do?apikey={0}&cc={1}&url={2}&fileName={3}".format(apiKey, cc, fileUrl, fileName), "a", "width=1200, height=1000, left=100, top=50");
}
String.prototype.format = function() {
	var formatted = this;
	for( var arg in arguments ) {
		formatted = formatted.replace("{" +arg + "}", arguments[arg]);
	}
	return formatted;
};