$(document).ready(function() {
	var tab = $('[role="tab"]')
	tab.keyup(function(e){
		var keyCode = e.keyCode || e.which;// 키보드 코드값
		if(keyCode == 39 || keyCode == 40){// 오른쪽방향키 이거나
			// 아래쪽 방향키
			// 브라우저의 기본 동작을 취소한다.
			e.preventDefault();
			// 다음 tab 요소에 aria-selected=true로 지정하고
			// 형제요소중에 자신 tab 이외의 나머지 tab 요소들을
			// aria-selected=false로 지정한다.
			// 자신은 보이게하고 다른 tabpanel은 보이지 않게 지정한다.
			active($(this).next().attr('id'),$(this).next().attr('aria-controls'))
			// 다음요소로 포커스를 이동한다.
			$(this).next().focus();
			// 마지막요소에서 오른쪽 방향키나 아래쪽 방향키를 눌렀을 경우
			if($(this).next().prevObject.attr('aria-controls')=='srPanel5'){
				// tab, tabpanel, focus 모두 처음으로 이동
				active('srTab1','srPanel1')
				$('#srTab1').focus();
			}
		}
		if(keyCode == 37 || keyCode ==38){// 왼쪽방향키 이거나
			// 위쪽 방향키
			e.preventDefault();
			// 이전 tab 요소에 aria-selected=true로 지정하고
			// 형제요소중에 자신 tab 이외의 나머지 tab 요소들을
			// aria-selected=false로 지정한다.
			active($(this).prev().attr('id'),$(this).prev().attr('aria-controls'))
			// 이전요소로 포커스를 이동한다.
			$(this).prev().focus();
			// 처음요소에서 왼쪽 방향키나 위쪽 방향키를 눌렀을 경우
			if($(this).prev().prevObject.attr('aria-controls')=='srPanel1'){
				// tab, tabpanel, focus 모두 마지막으로 이동
				active('srTab5','srPanel5')
				$('#srTab5').focus();
			}
		}
		if(keyCode == 35){// end 키를 눌렀을 때
			e.preventDefault();
			// tab, tabpanel, focus 모두 마지막으로 이동
			active('srTab5','srPanel5')
			$('#srTab5').focus();
		}
		if(keyCode == 36){// home키를 눌렀을 때
			e.preventDefault();
			// tab, tabpanel, focus 모두 처음으로 이동
			active('srTab1','srPanel1')
			$('#srTab1').focus();
		}
	});
	tab.keydown(function(e){
		var keyCode = e.keyCode || e.which;// 키보드 코드값
		if (keyCode == 9 && e.shiftKey) {// shift+tab 키
		}else if(keyCode == 9){// 탭키를 눌렀을 때
			e.preventDefault();
			active($(this).attr('id'),$(this).attr('aria-controls'))
			var selectedId = "#"+$(this).attr('aria-controls');
			$(selectedId).find('a:first').focus();
			// console.log($(selectedId).find('a').first());
		}
	});
	$('.panel a').keydown(function(e){
		var keyCode = e.keyCode || e.which;// 키보드 코드값
		if (keyCode == 9 && e.shiftKey) {// shift+tab 키
			$('.tablist li').each(function( index ) {
				if($( this ).attr('aria-selected') == 'true'){
					$( this ).next().focus();
					// console.log($(this))
					return false;
				}
			});
		}
	});
	// tab 요소에 클릭 이벤트를 추가한다.
	tab.on('click', function(e) {
		e.preventDefault();
		// 클릭한 tab 요소에 aria-selected=true로 지정하고
		// 형제요소중에 자신 tab 이외의 나머지 tab 요소들을
		// aria-selected=false로 지정한다.
		// 자신은 보이게하고 다른 tabpanel은 보이지 않게 지정한다.
		active($(this).attr('id'),$(this).attr('aria-controls'))
	});
	function active(tabid,panelid) {
		$('#'+tabid)
			.addClass('on').attr('aria-selected', true)
			.siblings().removeClass('on').attr('aria-selected', false);
		$('#'+panelid)
			.addClass('on').attr('aria-hidden', false)
			.siblings().removeClass('on').attr('aria-hidden', true);
	}
});