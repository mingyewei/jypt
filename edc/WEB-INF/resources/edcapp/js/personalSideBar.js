//我的收藏 单选
$(document).on('click','.collect-checkbox', function(e) {
    var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
    evt.preventDefault();
    $(this).toggleClass('collect-checkbox-checked');
})
$(document).ready(function() {
    var height = $(window).height() - $('.header').height() - $('.footer').height() + 'px';
    $('.personal-box').css('min-height', height);
    $('.person-content-box').load(contextPath+'/homePage/personalData?href=person');
    $('.person-sidebar li').on('click', function() {
        $(this).addClass('personal-sidebar-active');
        $(this).siblings().removeClass('personal-sidebar-active');
        var index = $(this).index();
        switch (index) {
            case 0:

                $('.person-content-box').load(contextPath+'/homePage/personalData?href=person');
                break;
            case 1:
                $('.person-content-box').load(contextPath+'/homePage/personalCollect?href=person');
                break;
            case 2:
                $('.person-content-box').load(contextPath+'/homePage/personalShare?href=person');
                break;
            case 3:
                $('.person-content-box').load(contextPath+'/homePage/personalIdea?href=person');
                break;
            case 4:
                $('.person-content-box').load(contextPath+'/homePage/personalPassWord?href=person');
                break;

        }
    })
})
