// mobileCheck
var UserAgent = navigator.userAgent;
var isM = UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null;

jQuery(document).ready(function($) {
	if (isM) {
		$(".sdate, .brthdy, .edate, .date").attr("type", "date");
	}
	$(".sdate, .brthdy, .edate, .date").attr("autocomplete","off");	
	var gnbDepth1=$('#gnb>ul a')
	gnbDepth1.click(function(event) {
		if ($(window).width()<992) {
			if ($(this).next().has('ul').length>0){
				if ($(this).parent().hasClass('active')) {
					$(this).parent().removeClass('active')
				}else{
					$(this).parent().addClass('active').siblings().removeClass('active')
				}
				event.preventDefault();
			}else{
				if ($(this).next().has('ul').length){
					$(this).parent().toggleClass('on');
					event.preventDefault();
				}
			}
		}
	});
	
	$('.iframepopuponen').click(function(event) {
		window.open($(this).attr('href'),"gtobe","width=840, height=880, scroll=auto ,scrollbars=1")
		event.preventDefault();
	});
	$('.fileList').each(function(index, el) {
		if ($(this).find('a').length) {$(this).addClass('nofiles')}
	});
	//키보드 접근성 추가
	$('.agg-set .set').attr('tabindex', '0');
});
jQuery(document).ready(function($) {
	// 인기검색어 접근성
	$('.favkeyword a').on('focusin', function(event) {
		$(this).parents('.favkeyword').addClass('keyboardfocusIn')
	}).last().focusout(function(event) {
		$(this).parents('.favkeyword').removeClass('keyboardfocusIn').find('dd').scrollLeft(0)
	});
	// 모바일에서 이미지 원본보기
	$('.iv').click(function(event) {
		// console.log($(this).data().ori)
		if ($(window).width()<767) {
			_this = $(this).find('img')
			if (_this.data().ori!=undefined) {
				window.open(_this.data().ori, 'ivimg')
			}else{
				window.open(_this.attr('src'), 'ivimg')
			}
		}
	});
	
	// 달력
	try { // statements to try
	  $('input.sdate,input.edate,input.date').datepicker({
	  	format: "yyyy-mm-dd",
	  	language: "ko",
	  	forceParse: false
	  });
	}
	catch (e) {
		// console.log(e)
	}
	//검색 상세보기 기능
	$('.b-detail').click(function(event) {
		$('[class^=sh]').toggleClass('detailon');
		$(this).toggleClass('on');
	});
	// 모바일 랭귀지 
	$('.global .lang button').click(function(event) {
		if ($(window).width()<992){
			$(this).parent().toggleClass('on');
			event.preventDefault();
		}
	});

	$('.familySet>ul>li, .global .lang').mouseenter(function(event) {
		if ($(window).width()>992) $(this).addClass('on');
	}).mouseleave(function(event) {
		if ($(window).width()>992) $(this).removeClass('on');
	});
	$('.familySet>ul>li, .global .lang').keyup(function(event) {
		$('.familySet>ul>li').removeClass('on')
		$(this).addClass('on');
	});
	$('.familySet>ul>li:last a:last, .global .lang a:last').bind('focusout', function(event) {
		$('.familySet>ul>li,.global .lang').removeClass('on')
	});

	$('.familySet>ul>li>a').click(function(event) {
		if ($(window).width()<992) {
			// console.log($(this).next('>div'))
			// console.log($(this).parent().hasClass('on'))
			if ($(this).parent().hasClass('on')) {
				// console.log($(this).parent().hasClass('on'))
				$(this).parent().removeClass('on');
			}else{
				$(this).parent().addClass('on');
			}
			event.preventDefault();
		}
	});
	
	$('.familySetOpen').click(function(event) {
		$('.familySet').addClass('mobileOn')
	});
	$('.familySetClose').click(function(event) {
		$('.familySet').removeClass('mobileOn')
	});

	$('.utilSet .btn-print').click(function(event) {
		window.print()
	});

	$('.gnbOpen').click(function(event) {
		if ($(window).width()>992) {
			$('#allNav').addClass('on');
			$('#allNav .set').css('top', ($(window).height()-$('#allNav .set').height())/2);
			$('#gnb>ul>li').removeClass('active');
		}else{
			$('#gnb').addClass('mobileOn');
			$('#allNav').removeClass('on');
		}
	}).focusin(function(event) {
		if ($(window).width()>992) $('#gnb>ul>li').removeClass('active')
	});
	$('.gnbClose').click(function(event) {
		$('#gnb').removeClass('mobileOn')
	});

	$('.filesToggle').click(function(event) {
		$('.fileListSet').hide();
		$(this).next('.fileListSet').toggle()
	});
	$('.fileListClose').click(function(event) {
		$(this).parent().hide().prev().focus();
	});
});
// 푸터 배너
$(function(){
	var owl_foot = $('.footerAd-list')
	if (owl_foot.length){
		owl_foot.owlCarousel({
			loop:true,
			margin:10,
			nav:false,
			autoplay:true,
			autoplaySpeed:1000,
			navSpeed:1000,
			responsive:{
				0:{
					items:2
				},
				639:{
					items:3
				},
				1024:{
					items:7
				}
			}
			// autoWidth:true
		})
	}
	$('.footerAd_pre').click(function(event) {
		owl_foot.trigger('prev.owl.carousel');
	});
	$('.footerAd_next').click(function(event) {
		owl_foot.trigger('next.owl.carousel');
	});

	 $('.footerAd_play').on('click', function() {
		 owl_foot.trigger('play.owl.autoplay');
		 $(this).hide();
		 $('.footerAd_stop').show();
			 //console.log('play');
	 })
	 $('.footerAd_stop').on('click', function() {
		 owl_foot.trigger('stop.owl.autoplay');
		 $(this).hide();
		 $('.footerAd_play').show();
			//console.log('stop');
	 });
})
//UNIQUENESS & PEOPLE UI/UX DEPT.
//PAGINGRESPONES VER 1.5
/*
버그수정
var pagingBtnWidth = 34;//페이징 숫자버튼 너비
var pagingCtrlWidth = 34*4;//페이징컨트롤 이전,다음,처음,마지막 너비
var totalPaging = 10;// 한번에 나오는 페이징 개수
마지막줄 100 // 갱신 시간 단위 1/1000
*/
$(function() {
	if ($('.pagination').length) {
	var pagination = $('.pagination');
	var pagingBtnWidth = 40;//페이징 숫자버튼 너비
	var pagingCtrlWidth = 160+24;//페이징컨트롤 이전,다음,처음,마지막 너비
	var minimumPaging = 3;
	var pagingCtrlView = true;
	var pagingType; // 디버그용도
	var visiblePagingNum;//보여줄 페이징 개수
	var item = pagination.find('li').not('.i');//페이징 중 컨트롤을 제외 한 숫자
	var totalPaging = item.length;// 한번에 나오는 페이징 개수
	var currentPage = item.index(item.parent().find('.active')); //활성화된 페이징
	var prevBtn = pagination.find('.prev')//이전버튼
	var nextBtn = pagination.find('.next')//다음버튼
	var firstBtn = pagination.find('.first')//처음
	var endBtn = pagination.find('.end');//마지막
	var paginationClone = pagination.clone()
	var href=item.find('a').eq(0).attr('href')
	var lastpage
	if (endBtn.hasClass('disabled')) {
		lastpage=item.eq(-1).text()
	}else{
		var pt = /(pageIndex\=)\d+/i;
		lastpage = pt.exec(endBtn.find('a').attr('href'));
		pt=/\d+/i;
		lastpage = pt.exec(lastpage)
	}

	//실제 동작 함수
	function resizeDiv(){
		var windowWith = $('.paginationSet').width();
		if (windowWith<=360) {
			visiblePagingNum=minimumPaging;
		}else{
			visiblePagingNum = Math.floor((windowWith-pagingCtrlWidth)/pagingBtnWidth);
			if (visiblePagingNum>totalPaging) {visiblePagingNum=totalPaging}
		}

		if (currentPage<minimumPaging) {
			pagingType = 'A';
			from = 0;
			to = visiblePagingNum;
		}else if(currentPage<totalPaging-2 ) {
			pagingType = 'B';
			from = Math.floor(currentPage-(visiblePagingNum/2))
			to = Math.floor(currentPage+(visiblePagingNum/2))
		}else{
			pagingType = 'C';
			from = totalPaging-visiblePagingNum;
			to = totalPaging;
		}
		if (from>item.length) {from=0}
		item.hide();
		for (var i = 0; i < totalPaging; i++) {
			if (i>=from&&i<=to) {
				item.eq(i).show()
			}
		}
		function linkreplace(target,argument) {
					target.find('a').attr('href',href.replace(/(pageIndex=)\w+/,'pageIndex='+argument))
					target.removeClass('disabled')
		}
		if (item.find('a').length>0) {
			//이전 페이지 링크변경
			if (currentPage>0 && item.eq(0).css('display')=='none') {
				prevBtn.html(item.find('a').eq(0).clone().html('<span class="s"><span>이전 <span class="t">목록으로 이동</span></span></span>'));
				linkreplace(prevBtn,Number(item.eq(from).text())-1);
			}else{
				prevBtn.html(paginationClone.find('.prev').html());
			}
			//다음버튼
			if (item.eq(-1).css('display')=='none') {
				nextBtn.html(item.find('a').eq(0).clone().html('<span class="s"><span>다음 <span class="t">목록으로 이동</span></span></span>'));
				linkreplace(nextBtn,Number(item.find('a:visible').eq(-1).text())+1)
			}else{
				nextBtn.html(paginationClone.find('.next').html());
			}

			//처음버튼
			if (item.eq(0).css('display')=='none') {
				firstBtn.html(item.find('a').eq(0).clone().html('<span class="s"><span>처음 <span class="t">목록으로 이동</span></span></span>'));
				linkreplace(firstBtn,1)
			}else{
				firstBtn.html(paginationClone.find('.first').html())
			}
			//마지막버튼
			if (item.eq(-1).css('display')=='none') {
				endBtn.html(item.find('a').eq(0).clone().html('<span class="s"><span>끝 <span class="t">목록으로 이동</span></span></span>'));
				linkreplace(endBtn,lastpage)
			}else{
				endBtn.html(paginationClone.find('.end').html())
			}
		}
		// pagination.find('.i').addClass('disabled').has('a').removeClass('disabled');
	}
	resizeDiv();
	(function($,sr){
		var debounce = function (func, threshold, execAsap) {
				var timeout;
				return function debounced () {
						var obj = this, args = arguments;
						function delayed () {
								if (!execAsap)
									func.apply(obj, args);
								timeout = null;
						};
						if (timeout)
								clearTimeout(timeout);
						else if (execAsap)
								func.apply(obj, args);
						timeout = setTimeout(delayed, threshold || 100);
				};
		}
		jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	})(jQuery,'smartresize');
	$(window).smartresize(function(){
		resizeDiv();
	});
	}
});

/**
 * 같은 값이 있는 열을 병합함
 * 사용법 : $('#테이블 ID').rowspan(0);
 */
$.fn.rowspan = function(colIdx, sumTxt , isStats) {
	var $this = $(this);
	return this.each(function(){
		var that;
		$('tr', this).each(function(row) {
			$('td:eq('+colIdx+')', this).filter(':visible').each(function(col) {
				if ($(this).html() == $(that).html()&& ((!isStats || isStats && $(this).prev().html() == $(that).prev().html()) && $(this).html() !=sumTxt )) { // 값이 '소계' 이면 rowspan 안함.
					rowspan = $(that).attr("rowspan") || 1;
					rowspan = Number(rowspan)+1;
					$(that).attr("rowspan",rowspan);
					// do your action for the colspan cell here
					$(this).hide();
					//$(this).remove();
					// do your action for the old cell here
				} else {
					that = this;
				}
				if($(this).html() == sumTxt) $this.colspan(row,sumTxt); // row 돌때 마다 colspan
				// set the that if not already set
				that = (that == null) ? this : that;
			});
		});
	});
};
/**
 * 같은 값이 있는 행을 병합함
 * 사용법 : $('#테이블 ID').colspan(0);
 */
$.fn.colspan = function(rowIdx,sumTxt) {
//   alert("col  :  "+rowIdx);
	return this.each(function(){
		var that;
		$('tr', this).filter(":eq("+rowIdx+")").each(function(row) {
			$(this).find('td').filter(':visible').each(function(col) {
				if ($(this).html() == $(that).html() && $(that).html() == sumTxt) {
					colspan = $(that).attr("colSpan") || 1;
					colspan = Number(colspan)+1;
					$(that).attr("colSpan",colspan).css({"text-align" :"center","font-weight": "bold"});
					$(this).hide(); // .remove();
				} else {
					that = this;
				}
				// set the that if not already set
				that = (that == null) ? this : that;
			});
		});
	});
};