$(document).on('click','.hotmews-list li', function(){
    var id=$(this).attr('data-id');
    location.href=contextPath+"/homePage/detail?href=homePage/hotNewList&type=0&id="+id;
} )
$(document).on('click','.main-hotnews', function(){
    var id=$(this).attr('data-id');
    location.href=contextPath+"/homePage/detail?href=homePage/hotNewList&type=0&id="+id;
} )
$(document).ready(function() {
    var pageNo = 1,
        flag = true;
    /*新闻列表数据*/
    hotNewsList(pageNo);
    //热点新闻主推
    //mainHotNews();
    /*上拉加载*/
    var tabTop = $('.hotmews-list').offset().top;
    var height = $(window).height() - $('.header').height() - $('.footer').height()-10+ 'px';
    $('.hotnews-wrap').css('min-height', height);
    $(window).on('scroll', function() {
        var viewH = $(this).height(),
            contentH = $(".hotmews-list").height(),
            scrollTop = $(this).scrollTop();
        if (contentH + tabTop - viewH - scrollTop <= 0 && flag == true) {
            pageNo++;
            hotNewsList(pageNo)
        }
    });
    //function mainHotNews(){
    //    $.ajax({
    //        type: "post",
    //        url: contextPath +"/cms/hotNewList",
    //        dataType: "json",
    //        data: {start:pageNo,end:5},
    //        success: function(data) {
    //            var data = data.data.data;
    //            var html = "";
    //            var len = data.length;
    //            var mainTitle=data[0].title;
    //            var mainId=data[0].contentId;
    //            var mainSrc=data[0].cover_img_url;
    //            var str="";
    //            $('.hotmews-recommend-left img').attr('src',mainSrc);
    //            $('.hotmews-recommend-left .hotmews-recommend-title').attr('title',mainTitle);
    //            $('.hotmews-recommend-left .hotmews-recommend-title').text(mainTitle);
    //            $('.hotmews-recommend-left').attr('data-id',mainId);
    //            for(var i= 1;i<data.length;i++){
    //            str+='<li class="hotmews-recommend-transition main-hotnews" data-id='+data[i].pid+'>'+
    //                        '<img src='+data[i].cover_img_url+'>'+
    //                        '<span class="hotmews-recommend-title ellipsis" title='+data[i].title+'>'+data[i].title+'</span>'+
    //                     '</li>'
    //            }
    //            $('.hotmews-recommend-right').append(str);
    //
    //        }
    //    });
    //}

        /*热点新闻列表数据*/
    function hotNewsList(pageNo) {
        var dataParam = {start:pageNo,end:10};
        /*获取热点新闻列表数据*/
        $.ajax({
            type: "post",
            url: contextPath +"/cms/hotNewList",
            dataType: "json",
            data: dataParam,
            success: function(data) {
                var data = data.data.data;
                var html = "";
                len = data.length;
                if(len==0){
                    flag=false;
                    return false;
                }
                var statrNo;
                if(pageNo==1){
                    statrNo=5;
                    var html = "";
                    var len = data.length;
                    var mainTitle=data[0].title;
                    var mainId=data[0].contentId;
                    var mainSrc=data[0].cover_img_url;
                    var str="";
                    var mainLen;
                    $('.hotmews-recommend-left img').attr('src',mainSrc);
                    $('.hotmews-recommend-left .hotmews-recommend-title').attr('title',mainTitle);
                    $('.hotmews-recommend-left .hotmews-recommend-title').text(mainTitle);
                    $('.hotmews-recommend-left').attr('data-id',mainId);
                    if(len>5){
                        mainLen=5;
                    }else{
                        mainLen=len;
                    }
                    for(var i= 1;i<mainLen;i++){
                        str+='<li class="hotmews-recommend-transition main-hotnews" data-id='+data[i].contentId+'>'+
                            '<img src='+data[i].cover_img_url+'>'+
                            '<span class="hotmews-recommend-title ellipsis" title='+data[i].title+'>'+data[i].title+'</span>'+
                            '</li>'
                    }
                    $('.hotmews-recommend-right').append(str);
                }else{
                    statrNo=0;
                }
                for (var i = statrNo; i < len; i++) {
                    html += '<li data-id=' + data[i].contentId + ' class="hotmews-recommend-transition">' +
                        '<div class="float-lt hotmews-list-img">' +
                        ' <img src="' + data[i].cover_img_url + '">' +
                        '</div>' +
                        '<div class="hotmews-list-msg">' +
                        ' <h4 class="hotmews-list-title ellipsis">' + data[i].title + '</h4>' +
                        '<p>' + data[i].org_name + '</p>' +
                        //' <span class="hotmews-list-collect pos-absolute hotmews-list-span">' + data[i].collect + '</span>' +
                        '<span class="hotmews-list-watch pos-absolute hotmews-list-span">' + data[i].count + '</span>' +
                        '<span class="hotmews-list-date pos-absolute hotmews-list-span">' + data[i].create_time + '</span>' +
                        '</div>' +
                        ' </li>'
                }
                $('.hotmews-list').append(html);
            }
        });
    }

});
