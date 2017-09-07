//收藏
$('.course-file-collect').on('click', function() {
    var collectionType= getUrlParamByName('type');
    var content_id=getUrlParamByName('id');
    var title= $('.course-file-title').text();
    var conlectionFlag=$('.course-file-collect').attr('clickFlag')||1;
    var status=getUrlParamByName('state')||0;
    var path=getUrlParamByName('path');
    if(path=='cou'){
        content_id=getUrlParamByName('itemId');
    }
    if(conlectionFlag==0){
        $('.course-file-collect').attr('clickFlag',1)
    }else{
        $('.course-file-collect').attr('clickFlag',0)
    }
    $('.course-file-collect').toggleClass('course-file-collect-s')
        $.ajax({
            type: "post",
            url: contextPath + "/collection/isCollection",
            dataType: "json",
            data: {'resourceKey':content_id,'type':collectionType,'title':title,'conlectionFlag':conlectionFlag,'status':status},
            success: function(data) {
            }
        });
})


    /*分享*/
//$('.course-file-share').on('click', function() {
//        $(this).addClass('course-file-share-s')
//    })



$(document).ready(function() {
    /*分享*/
    $(".share-list-box").hover(function() {
        $(this).find(".sharelist").css("display", "block");
        $(this).find(".sharelist").stop().animate({
            height: "24px"
        }, 300);
    }, function() {
        $(this).find(".sharelist").css("display", "none");
        $(this).find(".sharelist").stop().animate({
            height: "0"
        }, 300);
    });
    window._bd_share_config = {
        /*common : {
         bdText :"",//'自定义分享内容'
         bdDesc :"",//'自定义分享摘要'
         bdUrl : "",//'自定义分享url地址'
         bdPic : ""//'自定义分享图片'
         },*/
        //分享图标设置，tag是指定哪个data-tag，bdSize图标大小设置，尺寸有16,24,32三种
        share : {
            "bdSize" : 16
        },
        slide : [{
            bdImg : 0,
            bdPos : "right",
            bdTop : 100
        }]
    }
    //引入baidu分享js
    with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
    //var url = window.location.href;
    /*function bdshare1(text,desc,url,pic){

     }*/
    var height = $(window).height() - $('.header').height() - $('.footer').height()-80 + 'px';
    $('.course-file-box').css('min-height', height);
    var href=getUrlParamByName('href');
    if(href=='banner'||href=='searchList'){
        $('.course-file-collect').hide();
    }
    var content_id=getUrlParamByName('id');
    var path=getUrlParamByName('path')||'';
    if(path=='lib'){
        var url=contextPath + "/kb/detail"
        var param={'id':content_id};
    }else if(path=='cou'){
        var url=contextPath + "/train/courseDetail";
        var itemId=getUrlParamByName('itemId');
        var collectionId=getUrlParamByName('teamId');
        var param={'trainingId':content_id,'courseItemId':itemId,'collectionId':collectionId};
    }else if(path=='sear'){
        var url=contextPath + "/message/noticeDetail"
        var param={'id':content_id};
    }else{
        var url=contextPath + "/cms/detail"
        var param={'id':content_id};
    }
    $.ajax({
        type: "post",
        url: url,
        dataType: "json",
        data: param,
        success: function(data) {
            var data=data.data;
            $('.course-file-title').text(data.title);
            $('.course-file-lacation').text(data.orgName);
            $('.course-file-date').text(data.createTime);
            $('.course-file-text').html(data.content);
            var path=getUrlParamByName('path');
            if(data.videos){
                //if(path=='cou'){
                //    var src=(data.videos)[0].accessUrl;
                //}else{
                //    var src=(JSON.parse(data.videos))[0].accessUrl;
                //}

                if(path=="cou"){
                    var videos = data.videos;
                }else{
                    var videos = JSON.parse(data.videos);
                }
                var flag=false
                console.log(videos)
                //if(JSON.parse(videos)[0].accessUrl.match(/\.(flv)$/i)== null){

                if(videos[0].accessUrl.match(/\.(flv)$/i)== null){
                    flag=true;
                }else{
                    flag=false
                }
                var flashvars = {f:videos[0].accessUrl,c: 0,v: 40,wh: '12:9',e: 6,h: 4,st: 1,fc: 1,i:contextPath+'/resources/edcapp/img/right.png'};
                var  videoUrl=[videos[0].accessUrl];
                CKobject.embed('http://www.ckplayer.com/ckplayer/6.5/ckplayer.swf', 'videoFlv', 'ckplayer_a1', '955px', '530px',flag,flashvars,videoUrl);

            }
            if(data.pdfs&&!(data.type==0&&data.showType==0)){
                if(path=='cou'){
                    var pdf=(data.pdfs)[0].accessUrl;
                }else{
                    var pdf=(JSON.parse(data.pdfs))[0].url;
                }
                //location.href=contextPath+'/resources/HoneyComb1.1/pdfjs/web/viewer.html?file='+pdf
                $(".course-file-text").attr('href',pdf)
                $(".course-file-text").media({
                    width: 955,
                    height: 1200
                })
                $('.course-file-text').append('<div class="shadow"></div>')
                var shadowWidth=$('.course-file-text').width()-(window.innerWidth-$(window).width())+'px';
                $('.shadow').css('width',shadowWidth)

            }
            if((data.type==0&&data.showType==0)&&data.pdfs){

                if(path=='cou'){
                    var name=(data.pdfs)[0].name;
                    var href=(data.pdfs)[0].accessUrl;
                }else{
                    var name=(JSON.parse(data.pdfs))[0].name;
                    var href=(JSON.parse(data.pdfs))[0].accessUrl;
                }
                $('.course-file-link').text(name);
                $('.course-file-link').attr('href',href)
            }
            if(data.likeFlag==0||data.likeFlag==1){
                $('.course-file-praise').text(data.likeCount);
                $('.course-file-praise').attr('clickFlag',0);
               if(data.likeFlag==1){
                   $('.course-file-praise').addClass('course-file-collect-s')
                   $('.course-file-praise').attr('clickFlag',1);
                   $('.course-file-praise').css({'display':'inline-block','background-color':'#a8a8a8'});

               }
            }
        }
    });

    /*收藏*/
    if(!href=="banner"){
        var collectionType= getUrlParamByName('type');
        $.ajax({
            type: "post",
            url: contextPath + "/collection/collectionResult",
            dataType: "json",
            data: {'resourceKey':content_id,'type':collectionType},
            success: function(data) {
                if(data.data==true){
                    $('.course-file-collect').addClass('course-file-collect-s')
                    $('.course-file-collect').attr('clickFlag',0);
                }
            }
        });
    }
    /*点赞*/
    if(href=="kb/library"||href=="train/detail"){
        $('.course-file-praise').css({'display':'inline-block','background-color':'#efefef'});
    }
    /*点赞*/
    $('.course-file-praise').on('click', function() {
        $(this).toggleClass('course-file-praise-s');
        var clickFlag=$(this).attr('clickflag');
        var likeFlag;
        if(clickFlag==0){
            likeFlag=1;
            $('.course-file-praise').css({'display':'inline-block','background-color':'#a8a8a8'});
            $(this).attr('clickFlag',1)
            var num=Number($('.course-file-praise').text())
            $('.course-file-praise').text((num+1))
        }
        if(clickFlag==1){
            likeFlag=0;
            $('.course-file-praise').css({'display':'inline-block','background-color':'#efefef'});
            $(this).attr('clickFlag',0)
            var num=Number($('.course-file-praise').text())
            $('.course-file-praise').text((num-1))
        }
        $.ajax({
            type: "post",
            url: contextPath + "/course/like",
            dataType: "json",
            data: {'id':content_id,'like':likeFlag},
            success: function(data) {
                if(data.data==true){
                    $('.course-file-collect').addClass('course-file-collect-s')
                    $('.course-file-collect').attr('clickFlag',0);
                }
            }
        });
    })
})
