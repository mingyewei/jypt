/*搜索框隐藏显示*/
$(".search-hd-btn ").click(function(ev) {
    var ev = ev || event, // enent做兼容
        isTrue = $(".head_search ").is(".on "); // 判断.search-hd是否是展开状态
    ev.stopPropagation(); // 阻止冒泡
    $('.search-hd-btn').hide();
    if ($(".head_search ").addClass('on').find('input').val() == " ") { // 在输入框没有文字时执行
        if (isTrue) { // isTrue等于 true 移除on，false就添加on
            $(".head_search ").removeClass('on').find('input').blur();
        } else {
            $(".head_search ").addClass('on').find('input').focus();
        }
    } else { //提交事件search-hd
        $(".head_search ").find('input').focus();
    }

});

/*按钮*/
function btnGetDownClass(obj) {
    $(obj).on({
        mouseover: function () {
            $(this).addClass("btndown");
        },
        mouseout: function () {
            $(this).removeClass("btndown");
        }
    });
}
$(document).click(function(event) {
    var tar = $(event.target).attr("class");
    if (tar != "search-val") {
        $(".head_search ").removeClass('on').find('input').blur();
        $(".search-hd-btn ").show();
    }
});
   /*回到顶部显示*/
$(window).on('scroll', function(e) {
    //var windowHeight = $(document).height();
    //var scrollTop = $(document).scrollTop();
    //var opacity = parseInt(scrollTop / windowHeight * 100) / 100+0.3;
    var docHeight = $(document).height();//页面总高
    var scrollTop = $(window).scrollTop();//滚动条距顶部高度
    var  winHeight=$(window).height();
    if(scrollTop-winHeight>0){
        $('.back-to-top').show();
    }else{
        $('.back-to-top').hide();
    }
})
/*搜索*/
$(document).on('keyup',function(e){
    var e = event ? event : (window.event ? window.event : null);
    if(e.keyCode==13){
        //执行的方法
        var searchList=$('.search-val').val();
        $('.search-val').val('')
        if(!searchList==""){
           location.href=contextPath+'/cms/searchList?title='+searchList;
        }
    }
})
$(document).ready(function() {
    btnGetDownClass($('#login_btn'))
    /*初始返回顶部按钮高度*/
    $('.back-to-top').css('opacity', 0);
    /*点击返回到顶部*/
    $('.back-to-top').on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, 200);
    })

    /*导航栏页面跳转*/
    var href = getUrlParamByName('href');
    if (href === "") {
        $('.header-nav li:eq(0)').addClass('active');
    }

        /*匹配添加avtive*/
    $('.header-nav li').each(function() {
        var dataHref = $(this).attr('data-href').split('.')[0];
        if (href == dataHref) {
            $(this).addClass('active');
        }
    })

})
$('.head-personal-center li:eq(0)').on('click',function(){
    location.href=contextPath+"/homePage/personal?href=person";

})
/*获取url数据*/
function getUrlParamByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(window.location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(
        /\+/g, " "));
};

/*未登录提示信息*/
function globalTip(obj) {
    var scrollTopHeigth, scrollWindow;
    scrollTopHeigth = $(document).scrollTop();
    scrollWindow = $(window);
    var setTime = obj.setTime;
    var URL = obj.URL;
    var jump = obj.jump;
    var msg = obj.msg;
    var tipHtml;
    tipHtml = '<div id="" class="globalInfoTip">';
    tipHtml += '<div class="infoTipBack"></div>';
    tipHtml += '<p id="wait">' + msg + '</p>';
    tipHtml += '</div>';
    $('#ajax-hook .globalInfoTip').remove();
    $('#ajax-hook').prepend(tipHtml);
    if (scrollTopHeigth > 60) {
        $('.globalInfoTip').css({ position: 'fixed', top: -70 }).animate({ top: 0 });
    } else {
        $('.globalInfoTip').css({ top: -70, height: 0 }).animate({ top: 0, height: '60px' });
    }
    scrollWindow.scroll(function() {
        if (scrollWindow.scrollTop() > 60) {
            $('.globalInfoTip').css({ position: 'fixed', });
        } else if (scrollWindow.scrollTop() < 60) {
            $('.globalInfoTip').css({
                position: 'relative',
            });
        }
    });
    var interval = setInterval(function() {
        clearInterval(interval);
        $('.globalInfoTip').css({ top: 0, height: '60px' }).animate({ top: -70, height: 0 }, function() {
            $('#ajax-hook .globalInfoTip').remove();
            if (jump) {
                if (URL) {
                    window.location.href = URL;
                } else {
                    window.location.href = document.referrer ? document.referrer : './';
                }
            }
        });
    }, 1500);
};


