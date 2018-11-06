
var LM = {
    alert: {}
}
LM.alert.Wechat = function(t){
    var t = t || '已收藏'
    $('#alertWechat,#alertLoading').remove();
    clearTimeout(LM.alert.Time);
    var alertWechat = '<div id="alertWechat" style=" position:fixed;left:50%;top:45%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%);text-align:center"><span style="background-color:rgba(0,0,0,.6);padding:10px 15px;min-width:100px;color:#fff;border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,.6);display:inline-block;">'+t+'</span></div>'
    $('body').append(alertWechat);
    LM.alert.Time = setTimeout(function(){
        $('#alertWechat').fadeOut(500)
    }, 1500)
}
var Load = {
	alert : {}
}
Load.alert.Loading = function(x){
	var x = x || '努力加载中';
	$('#alertLoading,#alertWechat').remove();
	clearTimeout(Load.alert.Time);
	var alertLoading = '<div id="alertLoading" style="padding:1rem .5rem .5rem;background:rgba(0,0,0,.6);position: fixed;top: 45%;left: 50%;transform: translate(-50%,-50%);border-radius: 1rem;"><div style="width:2.75rem;height: 2.75rem;margin: 0 auto;background: url(img/loading.gif) no-repeat;background-size: 100% 100%;"></div><p style="margin: .5rem auto .2rem;text-align: center;color: #fff;font-size: 1rem;">'+x+'</p></div>';
	$('body').append(alertLoading);
	Load.alert.Time = setTimeout(function(){
		$('#alertLoading').fadeOut(500)
	},1500);
}
function isIdcard(Idcard){
	var searchStr = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
    if (!searchStr.test(Idcard)) {
       	return false;
    }else{
    	return true;
    }
};
function isMobile(mobile) {
    var searchStr = /^(1+\d{10})$/;
    if (!searchStr.test(mobile)) {
        return false;
    }
    return true;
}
function isName(Name){
	var searchStr = /^[\u4e00-\u9fa5]{2,}$/;
	if (!searchStr.test(Name)) {
       	return false;
    }else{
    	return true;
    }  
};
	var countdown = 60;
	function settime(obj) {
		if(countdown == 0) {
		obj.removeAttribute('disabled'); 
		obj.value = "获取验证码";
		countdown = 60;
		return;
		} else {
			obj.setAttribute("disabled", "disabled");
			obj.value = countdown + "秒后重试";
			countdown--;
		}
			setTimeout(function() {
				settime(obj)
			}, 1000)
	};


  /*
            * @Author 兔爷
            * @function 实现单指拖动图片，双指缩放图片
            * @marks 参数one是为了区分屏幕上现在是一根手指还是两根手指，因为在滑动的时候两根手指先离开一根会触发一根手指移动图片位置这个方法
            */
           var touchScale = function(seletor, bg) {
            var startX, endX, scale, x1, x2, y1, y2, imgLeft, imgTop, imgWidth, imgHeight,
                one = false, 
                $touch = $(seletor),
                originalWidth = $touch.width(),
                originalHeight = $touch.height(),
                baseScale = parseFloat(originalWidth/originalHeight),
                imgData = [],
                bgTop = parseInt($(bg).css('top'));
            function siteData(name) {
                imgLeft = parseInt(name.css('left'));
                imgTop = parseInt(name.css('top'));
                imgWidth = name.width();
                imgHeight = name.height();
            }
            $(document).on('touchstart touchmove touchend', $(seletor).parent().selector, function(event){
                var $me = $(seletor),
                    touch1 = event.originalEvent.targetTouches[0],  // 第一根手指touch事件
                    touch2 = event.originalEvent.targetTouches[1],  // 第二根手指touch事件
                    fingers = event.originalEvent.touches.length;   // 屏幕上手指数量
                //手指放到屏幕上的时候，还没有进行其他操作
                if (event.type == 'touchstart') {
                    if (fingers == 2) {
                        // 缩放图片的时候X坐标起始值
                        startX = Math.abs(touch1.pageX - touch2.pageX);
                        one = false;
                    }
                    else if (fingers == 1) {
                        x1 = touch1.pageX;
                        y1 = touch1.pageY;
                        one = true;
                    }
                    siteData($me);
                }
                //手指在屏幕上滑动
                else if (event.type == 'touchmove') {
                    if (fingers == 2) {
                        // 缩放图片的时候X坐标滑动变化值
                        endX = Math.abs(touch1.pageX - touch2.pageX);
                        scale = endX - startX;
                        $me.css({
                            'width' : originalWidth + scale,
                            'height' : (originalWidth + scale)/baseScale,
                            'left' : imgLeft,
                            'top' : imgTop
                        });
                        
                    }else if (fingers == 1) {
                        x2 = touch1.pageX;
                        y2 = touch1.pageY;
                        if (one) {
                            $me.css({
                                'left' : imgLeft + (x2 - x1),
                                'top' : imgTop + (y2 - y1)
                            });
                        }
                    }
                }
                //手指移开屏幕
                else if (event.type == 'touchend') {
                    // 手指移开后保存图片的宽
                    originalWidth = $touch.width(),
                    siteData($me);
                    imgData = [[imgLeft, imgTop-bgTop, imgWidth, imgHeight],[0, 0, 640, 640]];
                }
            });
            var getData = function(){
                return imgData;
            };
            return {
                imgData : getData
            }
        };
        