
$(document).on('click','.inform-box li', function(){
    var id=$(this).attr('data-id');
    location.href=contextPath+"/homePage/detail?href=homePage/noticeList&type=1&id="+id;
} )

$(document).ready(function() {
     var pageNo = 1,
         flag = true;
    /*窗口高度*/
    var height = $(window).height() - $('.header').height() - $('.footer').height()+ 'px';
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
        $.ajax({
            type: "post",
            url: contextPath +"/cms/noticeList",
            dataType: "json",
            data: {start:pageNo,end:15},
            success: function(data) {
                var data = data.data.data,
                    str = "";
                if(data==""){
                    flag=false;
                    return false;
                }
                for (var i = 0, len = data.length; i < len; i++) {
                    str += '<li data-id="' + data[i].contentId + '">' +
                        '<span class="inform-listname">' + data[i].title + '</span>' +
                        '<span class="inform-location">' + data[i].org_name + '</span>' +
                        '<span class="inform-date">' + data[i].create_time + '</span>' +
                        '</li>'
                }
                $('.inform-box ul').append(str);
            }
        });
    }
})
