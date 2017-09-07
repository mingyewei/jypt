
$(document).on('click','.inform-box li', function(){
    var id=$(this).attr('data-id');
    var url=$(this).attr('data-url')
    location.href=contextPath+"/homePage/detail?href=searchList&path=sear&id="+id;
} )

$(document).ready(function() {
    var pageNo = 1,
        flag = true;
    /*窗口高度*/
    var height = $(window).height() - $('.header').height() - $('.footer').height()-20+ 'px';
    $('.inform-box').css('min-height', height);
    /*获取通知公告列表数据*/
    informData(pageNo);
    $('.more-btn').on('click', function() {
        pageNo++;
        informData(pageNo)
    })
    /*上拉加载*/
    var tabTop = $('.inform-box').offset().top;
    $(window).on('scroll', function() {
        var viewH = $(this).height(),
            contentH = $('.inform-box').height(),
            scrollTop = $(this).scrollTop();

        if (contentH + tabTop - viewH - scrollTop <= 0 && flag==true) {
            pageNo++;
            informData(pageNo)
        }
    });

    /*获取通知公告列表数据*/
    function informData(pageNo) {
        var title=getUrlParamByName('title');
        $.ajax({
            type: "post",
            url: contextPath +"/message/noticeList",
            dataType: "json",
            data: {currentPage:pageNo,pageSize:15,title:title},
            success: function(data) {
                var data = data.data.data,
                    str = "";
                if(data==""){
                    flag=false;
                    return false;
                }
                for (var i = 0, len = data.length; i < len; i++) {
                    str += '<li data-id="' + data[i].id + '">'
                    if(data[i].readFlag==0){
                        str += '<span class="inform-listname msg-unread">' + data[i].title + '</span>'+
                               '<span class="inform-date msg-unread">' + data[i].createTime + '</span>'
                    }else{
                        str += '<span class="inform-listname">' + data[i].title + '</span>'+
                               '<span class="inform-date">' + data[i].createTime + '</span>'
                    }

                      str +=   '</li>'
                }
                $('.inform-box ul').append(str);
            }
        });
    }
})
