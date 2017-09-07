$(document).ready(function() {
    var pageNowNo = 1,
        pageAfterNo = 1,
        flag1 = true,
        flag2 = true;
    /*窗口高度*/
    var height = $(window).height() - $('.header').height() - $('.footer').height() + 'px';
    $('.course-box').css('min-height', height);
    /*获取通知公告列表数据*/
    courseNowData(pageNowNo);

    /*进入培训课程详情*/
    $(document).on('click','.hotmews-recommend-transition',function(){
         location.href=contextPath+"/train/simpleCourse?href=train/detail&id="+$(this).attr('data-id');
    })

    /*tab切换*/
    $('.course-tab-proceed').on('click', function() {
        $(this).addClass('course-tab-active')
            .siblings('li').removeClass('course-tab-active');
        $('.course-list-now').show().siblings('.course-list-after').hide();
        $('.course-list').attr('data-type', 1)
    })
    $('.course-tab-beginning').on('click', function() {
        if($(this).attr('data-ok')==1){
            courseAfterData(pageAfterNo);
            $(this).attr('data-ok',0);
        }
        $(this).addClass('course-tab-active')
            .siblings('li').removeClass('course-tab-active');
        $('.course-list-after').show().siblings('.course-list-now').hide();
        $('.course-list').attr('data-type', 2)
    })
        /*上拉加载*/
        var tabTop = $('.course-box').offset().top;
        $(window).on('scroll', function() {
            var viewH = $(this).height(),
                contentH = $('.course-box').height(),
                scrollTop = $(this).scrollTop();
            if (contentH + tabTop - viewH - scrollTop <= 0 ) {
                if($('.course-list').attr('data-type')==1){
                    if(flag1==true){
                        pageNowNo++;
                        courseNowData(pageNowNo)
                    }
                }else{
                    if(flag2==true){
                        pageAfterNo++;
                        courseAfterData(pageNowNo)
                    }
                }
            }
        });

    function courseNowData(pageNowNo) {
        $.ajax({
            type: "post",
            url: contextPath+"/train/list",
            dataType: "json",
            data: {pageSize:16,currentPage:pageNowNo,status:1},
            success: function(data) {

                if(!data.data||data.data.total==0){
                    $('.course-list-now').html('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '><p class="no-course-msg">暂无相关培训,请耐心等待</p>')
                    //$('.course-list-now').append('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '>')
                    //$('.course-list-now').append('<p class="no-course-msg">暂无相关培训,请耐心等待</p>')
                    $('.course-list-now').css('text-align','center');
                    return;
                }
                    if(data.data.data){
                        var str = loadData(data.data.data);
                        $('.course-list-now').append(str);
                    }
                    if(data.data.total<=(data.data.currentPage+1)*16){
                        flag1=false
                    }
            }
        });
    }

    function courseAfterData(pageAfterNo) {
        $.ajax({
            type: "post",
            url: contextPath+"/train/list",
            dataType: "json",
            data: {pageSize:16,currentPage:pageAfterNo,status:0},
            success: function(data) {
                if(!data.data||data.data.total==0){
                    $('.course-list-after').html('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '><p class="no-course-msg">暂无相关培训,请耐心等待</p>')
                    //$('.course-list-after').append('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '>')
                    //$('.course-list-after').append('<p class="no-course-msg">暂无相关培训,请耐心等待</p>')
                    $('.course-list-after').css('text-align','center');
                    return;
                }
                if(data.data.data){
                     var  str = loadData(data.data.data);
                    $('.course-list-after').append(str);
                }
                if(data.data.total<=(data.data.currentPage+1)*16){
                    flag2=false;
                }
            }
        });
    }

    function loadData(data) {
        var str = ""
        for (var i = 0, len = data.length; i < len; i++) {
            str += '<li class="hotmews-recommend-transition" data-id="' + data[i].id + '">'
             if(data[i].coverImg[0].accessUrl){
                 str +=  '<img src="' + data[i].coverImg[0].accessUrl + '">'
             }else{
                 str +=  '<img src=' + contextPath+"/resources/edcapp/img/right.png"+ '>'
             }
            str +=   '<p class="coruse-list-title ellipsis" title="' + data[i].name + '">' + data[i].name + '</p>' +
                //'<span class="course-list-collect pos-absolute course-list-span ">' + data[i].like + '</span>' +
                '<span class="course-list-watch pos-absolute course-list-span">' + data[i].visitCount + '</span>' +
                '<span class="course-list-date pos-absolute course-list-span">' + data[i].createTime + '</span>' +
                '</li>'
        }
        return str;
    }
})
