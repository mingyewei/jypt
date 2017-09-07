$('.more-hotnews').on('click',function(){
    var  href = $(this).attr('data-href').split('.')[0];
    location.href=contextPath+"/"+$(this).attr('data-href')+'?href='+href;
})

$(document).on('click','.hotNews-post li', function(){
    var id=$(this).attr('data-id');
    location.href=contextPath+"/homePage/detail?href=homePage/hotNewList&type=0&id="+id;
} )
/*更多培训*/
$('.toCourse').on('click',function(){
    var isLogin = $('.head_oper ').attr('isLogin')||false;
    if(!isLogin){
        globalTip({
            'msg': '您还未登录，请您登录后再查看!',
            'setTime': 5,
            'jump': false
        });
    }else{
        location.href=contextPath+'/train/detail?href=train/detail';

    }
})
/*banner 跳转*/
$(document).on('click','.bannerList',function(){
    var type=$(this).attr('data-type');
    if(type==3){
        var href=$(this).attr('data-href');
        location.href=href;
    }
    if(type==0){
        var id=$(this).attr('data-id');
        location.href=contextPath+"/homePage/detail?href=banner&id="+id;
    }
})
$(document).ready(function() {

    /*获取轮播图数据*/
    bannerList();
    /*获取热点新闻数据*/
    hotNewsData();
    /*获取培训课程数据*/
    mainCourseList()
    /*获取考试专区数据*/
    mainExam();
    /*获取通知公告数据*/
    mainNotice();
})
$('.exam-msg').mouseover(function(){
    if($('.main-exam').attr('no-msg')&&$('.main-exam').attr('no-msg')==1){
        return
    }
    $(this).hide();
    $(this).next().css('display','block');
})

$('.notice-msg').mouseover(function(){
    if($('.main-notice').attr('no-msg')&&$('.main-notice').attr('no-msg')==1){
        return
    }
    $(this).hide();
    $(this).next().css('display','block');
})
$('.more-top').mouseout(function(){

    $(this).hide();
    $(this).prev().show();
})
$('.to-notice').on('click',function(){
    location.href=contextPath+'/homePage/noticeList?href=homePage/noticeList'
})
$('.to-exam').on('click',function(){
    var isLogin = $('.head_oper ').attr('isLogin')||false;
    if(!isLogin){
        globalTip({
            'msg': '您还未登录，请您登录后再查看!',
            'setTime': 5,
            'jump': false
        });
    }else{
        location.href=contextPath+'/exam/exam?href=exam/exam'
    }

})
/*跳转培训课程*/
$(document).on('click','.train-list-right li',function(){
    var id=$(this).attr('data-id')
    var isLogin = $('.head_oper ').attr('isLogin')||false;
    if(!isLogin){
        globalTip({
            'msg': '您还未登录，请您登录后再查看!',
            'setTime': 5,
            'jump': false
        });
    }else{
        location.href=contextPath+"/train/simpleCourse?href=train/detail&id="+id;
    }

})
//$(document).on('click','.train-list-left',function(){
//    var id=$(this).attr('data-id')
//    var isLogin = $('.head_oper ').attr('isLogin')||false;
//    if(!isLogin){
//        globalTip({
//            'msg': '您还未登录，请您登录后再查看!',
//            'setTime': 5,
//            'jump': false
//        });
//    }else{
//        location.href=contextPath+"/train/simpleCourse?href=train/detail&id="+id;
//    }
//
//})
/*考试专区*/
$(document).on('click','.main-exam li',function(){
    var id=$(this).attr('data-id')
    var isLogin = $('.head_oper ').attr('isLogin')||false;
    var commit=$(this).attr('data-commit');
    var mark=$(this).attr('data-mark');
    if(!isLogin){
        globalTip({
            'msg': '您还未登录，请您登录后再查看!',
            'setTime': 5,
            'jump': false
        });
    }else{
        if(commit==0&&mark==0){
            location.href=contextPath+'/exam/detail?href=exam/exam&status=0&id='+id;
        }else if(commit==1&&mark==0){
            location.href=contextPath+'/exam/detail?href=exam/exam&status=1&id='+id;
        }else{
            location.href=contextPath+'/exam/detail?href=exam/exam&status=2&id='+id;
        }
    }
})
/*通知公告*/
$(document).on('click','.main-notice li',function(){
    var id=$(this).attr('data-id')
    location.href=contextPath+"/homePage/detail?href=homePage/noticeList&type=1&id="+id;

})
function mainNotice(){
    $.ajax({
        type: "post",
        url: contextPath + "/portal/notice",
        dataType: "json",
        data: {count:6},
        success: function(data) {
            if(!data.data||data.data.length==0){
                $('.main-notice').append('<img  class="no-hotnews" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '>')
                $('.main-notice').append('<p class="no-course-msg">暂无公告消息,请耐心等待</p>')
                $('.main-notice').css('text-align','center');
                $('.main-notice').attr('no-msg',1)
                return;
            }
            var data=data.data;
            var  str='';
            for(var i= 0,len=data.length;i<len;i++){
                str+='<li data-id='+data[i].id+'  class="hand">'+
                    '<a >'+
                    '<div class="exam_showd">'+
                    '<div class="exam_info float-lt"><span class="ellipsis">'+data[i].title+'</span></div>'+
                    '<div class="exam_time float-rt">'+data[i].createTime+' </div>'+
                    '</div>'+
                    '</a >'+
                    '</li>'
            }
            $('.main-notice').append(str);
        }
    });
}
/*获取考试专区数据*/
function mainExam(){
    $.ajax({
        type: "post",
        url: contextPath + "/portal/exam",
        dataType: "json",
        data: {count:6},
        success: function(data) {
            if(!data.data||data.data.length==0){
                $('.main-exam').append('<img  class="no-hotnews" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '>')
                $('.main-exam').append('<p class="no-course-msg">暂无考试,请耐心等待</p>')
                $('.main-exam').css('text-align','center');
                $('.main-exam').attr('no-msg',1)
                return;
            }
            var data=data.data;
            var  str='';
            for(var i= 0,len=data.length;i<len;i++){

             str+='<li data-id='+data[i].id+'  data-commit='+data[i].commitStatus+' data-mark='+data[i].markStatus+' class="hand">'+
                        '<a >'+
                            '<div class="exam_showd">'+
                                '<div class="exam_info float-lt"><span class="ellipsis">'+data[i].name+'</span></div>'+
                                '<div class="exam_time float-rt">'+data[i].createTime+' </div>'+
                            '</div>'+
                        '</a >'+
                  '</li>'
            }
            $('.main-exam').append(str);
        }
    });
}
/*获取培训课程数据*/
function   mainCourseList(){
    $.ajax({
        type: "post",
        url: contextPath + "/portal/train",
        dataType: "json",
        data: {count:7},
        success: function(data) {
            if(!data.data||data.data.length==0){
                $('.train-list .train-list-left').remove();
                $('.train-list .train-list-right').remove();
                $('.train-list').append('<img class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '>')
                $('.train-list').append('<p class="no-course-msg">暂无培训课程,请耐心等待</p>')
                $('.toCourse').hide();
                return;
            }
            $('.train-list .train-list-left').show();
            //$('.train-list-left').attr('data-id',data.data[0].id)
            //if(data.data[0].coverImg[0]){
            //    $('.train-list-left img').attr('src',data.data[0].coverImg[0].accessUrl);
            //}
            //$('.train-list-left div span').text(data.data[0].name);
            //$('.train-list-left div p').text(data.data[0].createTime)

            var param=data.data;
            var str="";
            var len=param.length;
            if(len>6){
                len=6;
            }else{
                len=param.length;
            }
            for(var i= 0;i<len;i++){
                str+='<li data-id='+param[i].id+'  class="hand">'+
                        '<div class="cover">'
                if(param[i].coverImg[0]) {
                    str+='<a  title=' + param[i].name + ' ><img src=' + param[i].coverImg[0].accessUrl + '></a>'
                }else{
                    str+='<a  title=' + param[i].name + ' ><img ></a>'
                }
                str+='</div>'+
                        '<div class="info">'+
                            '<p class="title ellipsis">'+param[i].name+'</p>'+
                            '<p class="date ellipsis">'+param[i].createTime+'</p>'+
                        '</div>'+
                    '</li>'
            }
            $('.train-list-right ul').append(str);
        }
    });
}
/*热点新闻数据*/
function hotNewsData(){
    $.ajax({
        type: "post",
        url: contextPath + "/homePage/hotTop",
        dataType: "json",
        data: {},
        success: function(data) {
            if(!data.data||data.data.hotNews.length==0){
                $('.train-title-hotNews-list .hotNews-post').remove();
                $('.train-title-hotNews-list').append('<img  class="no-hotnews" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '>')
                $('.train-title-hotNews-list').append('<p class="no-course-msg">暂无新问消息,请耐心等待</p>')
                $('.more-hotnews').hide();
                $('.train-title-hotNews-list').css('text-align','center')
                return;
            }
            var data=data.data.hotNews;
            var str = "";
            if(data.length>5){
                var len=5
            }else{
                var len=data.length;
            }
            for (var i = 0; i < len; i++) {
                str+= '<li data-id='+data[i].contentId+'  class="hand">'+
                    '<div class="cover">'+
                    '<img src='+data[i].cover_img_url+'>'+
                    '</div>'+
                    '<div class="info">'+
                    '<p class="title ellipsis">'+data[i].title+'</p>'+
                    '<p class="date ellipsis">'+data[i].create_time+'</p>'+
                    '</div>'
                '</li>'
            }
            $('.hotNews-post').append(str);
        }
    });
}
/*swiper 数据*/
function bannerList() {
    $.ajax({
        type: "post",
        url: contextPath + "/portal/carousel",
        dataType: "json",
        data: {},
        success: function(data) {
            var data=data.data;
            var str = "";
            for (var i = 0, len = data.length; i < len; i++) {
                if(data[i].type==3){
                    str += '<li class="bannerList hand" data-id=' + data[i].id + '  data-type='+data[i].type+' data-href='+data[i].href+'>'
                }else{
                    str += '<li class="bannerList hand" data-id=' + data[i].id + '  data-type='+data[i].type+'>'
                }
                str += '<a ><img src=' + data[i].coverImg[0].accessUrl + ' ></a>' +
                        '</li>'
            }
            $('.swiper ul').append(str);
            /*定义swiper*/
            bannerListFn(
                $(".swiper "),
                $(".img-btn-list "),
                $(".left-btn "),
                $(".right-btn "),
                3000,
                true
            );

        }
    });


}
