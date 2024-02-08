function windowOpen () {
	var nUrl; var nWidth; var nHeight; var nLeft; var nTop; var nScroll;
	nUrl = arguments[0];
	nWidth = arguments[1];
	nHeight = arguments[2];
	nScroll = (arguments.length > 3 ? arguments[3] : "no");
	nLeft = (arguments.length > 4 ? arguments[4] : (screen.width/2 - nWidth/2));
	nTop = (arguments.length > 5 ? arguments[5] : (screen.height/2 - nHeight/2));

	winopen=window.open(nUrl, 'sns_win', "left="+nLeft+",top="+nTop+",width="+nWidth+",height="+nHeight+",scrollbars="+nScroll+",toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no");
}

function _getArticleTitle(strSubject) {
	var url = location.href;
	var titl = document.title;
	if ( (url.indexOf("bbsId") > -1) && (url.indexOf("selectBoardArticle.do") > -1) )
	{
		titl = "[성북구 도시관리공단] " + strSubject;
	}
	return titl;
}
function _getArticleLink() {
	var link = location.protocol + "//" + location.hostname + "" + (location.port!="" ? ":"+location.port : "") + location.pathname;
	return link;
}

function facebookOpen(strSubject) {
	var strSubject = strSubject
	var titl = _getArticleTitle(strSubject);
	var link = encodeURIComponent(location.href);
	var url = "http://www.facebook.com/sharer.php?u=" + link + "&t=" + titl;
	//windowOpen (url, 500, 300, 'no');
	windowOpen (url, 900, 450, 'no');
}
//twitter

function twitterOpen(strSubject) {
	var strSubject = strSubject
	var titl = _getArticleTitle(strSubject);
	titl = titl.replace (/'/gi,"´");
	titl = titl.replace (/"/gi,"˝");
	titl = encodeURIComponent(titl);

	var link = encodeURIComponent(location.href);

	var url = "http://twitter.com/share?text=" + titl + "&url=" + link;
	windowOpen (url, 800, 400, 'yes');
}
//미투데이
function me2dayOpen(strSubject) {
	var strSubject = strSubject
	var titl = encodeURIComponent(_getArticleTitle(strSubject));
	var link = encodeURIComponent(location.href);
	var url = "http://me2day.net/posts/new?new_post[body]=\"" + titl + "\":" + link;
	windowOpen (url, 1000, 600, 'no');
}
//요즘
function yozmOpen() {
	var titl = _getArticleTitle();
	titl = titl.replace (/'/gi,"´");
	titl = titl.replace (/"/gi,"˝");
	titl = encodeURIComponent(titl);

	var link = encodeURIComponent(_getArticleLink() + "?outlink=yozm");
	var url = "http://yozm.daum.net/api/popup/prePost?prefix=" + titl + "&link=" + link;
	windowOpen (url, 400, 364, 'no');
	(new Image).src = _getHitlogLink("sec_00013");
}
//싸이월드
function cyworldOpen() {
	var link = encodeURIComponent(_getArticleLink() + "?outlink=cy_sharing");
	var url = "http://csp.cyworld.com/bi/bi_recommend_pop.php?url=" + link;
	windowOpen (url, 400, 364, 'no');
	(new Image).src = _getHitlogLink("sec_00014");
}
//카카오스토리
function kakaoOpen(strSubject) {
	var strSubject = strSubject
	var titl = strSubject;
	titl = titl.replace (/'/gi,"´");
	titl = titl.replace (/"/gi,"˝");
	titl = encodeURIComponent(titl);
	var link = encodeURIComponent(_getArticleLink());
	var url = "http://story.kakao.com/s/share?url=" + link;
	windowOpen (url, 800, 400, 'yes');
}
