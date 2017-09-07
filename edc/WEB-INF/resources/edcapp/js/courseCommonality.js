$(document).ready(function() {

    var id=getUrlParamByName('id');
    /*跳转培训内容详情页*/
    $(document).on('click','.courseInfo-intrduction-catalog-detial li',function(){
        if( $('.courseInfo-introduction-list').attr('data-state')==0){
            layer.msg("不在培训期间内")
            return
        }
        var type=$(this).find('img').attr('data-type');
        var courseId= $('.courseInfo-introduction-list').attr('data-course-id');
        var itemId=$(this).attr('data-item-id');
        var teamId=$(this).parent().parent().parent().attr('data-id');
      if(type=='file'){
        location.href=contextPath+'/train/pdfCourse?href=train/detail&path=cou&state=0&type=3&id='+courseId+'&itemId='+itemId+'&teamId='+teamId;
      }else{
        location.href=contextPath+'/train/videoCourse?href=train/detail&path=cou&state=1&type=3&id='+courseId+'&itemId='+itemId+'&teamId='+teamId;
      }
    })
    $(document).on('click','.toExam',function(){
        if( $('.courseInfo-introduction-list').attr('data-state')==0){
            layer.msg("不在考试期间内")
            return
        }
        var commit=$(this).attr('data-commit');
        var mark=$(this).attr('data-mark');
        var examId=$(this).attr('data-id');
         if(commit==0&&mark==0){
             location.href=contextPath+'/exam/detail?href=exam/exam&status=0&id='+examId;
         }else if(commit==1&&mark==0){
             location.href=contextPath+'/exam/detail?href=exam/exam&status=1&id='+examId;
         }else{
             location.href=contextPath+'/exam/detail?href=exam/exam&status=2&id='+examId;
         }
    })
    /*课程目录收缩和展开*/
    $(document).on('click', '.courseInfo-intrduction-catalog-shrink', function() {
        var icionX=contextPath+'/resources/edcapp/img/btn_xl_nor.png';
        var icionF=contextPath+'/resources/edcapp/img/btn_sl_nor.png';
            if ($(this).attr('data-active') == 'false') {
                $(this).parent().find('li:gt(3)').show();
                $(this).find('img').attr('src', icionF)
                $(this).attr('data-active', 'true')
            } else {
                $(this).parent().find('li:gt(3)').hide();
                $(this).find('img').attr('src', icionX)
                $(this).attr('data-active', 'false')
            }

        })
        /*tab切换*/
    $('.courseInfo-introtion-catalogTab').on('click', function() {
        $(this).addClass('courseInfo-introtion-tab-active')
            .siblings('li').removeClass('courseInfo-introtion-tab-active');
        $('.courseInfo-introduction-catalog').show().siblings('.courseInfo-introduction-exam').hide();
        $('.courseInfo-introduction-list').attr('data-type', 1)
    })
    $('.courseInfo-introtion-examTab').on('click', function() {
            $(this).addClass('courseInfo-introtion-tab-active')
                .siblings('li').removeClass('courseInfo-introtion-tab-active');
            $('.courseInfo-introduction-exam').show().siblings('.courseInfo-introduction-catalog ').hide();
            $('.courseInfo-introduction-list').attr('data-type', 2)
            if($(this).attr('data-ok')==1){
                /*相关考试*/
                relativeExam();
                $(this).attr('data-ok',0);
            }

        })
    /*简介和课程目录*/
    courseCatalog();


    function relativeExam(){
        $.ajax({
            type: "get",
            url: contextPath+'/train/exam',
            dataType: "json",
            data: {'id':id},
            success: function(data) {
                if(!data.data.trainExams&&!data.data.courseExams){
                    $('.courseInfo-introduction-exam ').append('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '>')
                    $('.courseInfo-introduction-exam ').append('<p class="no-course-msg">暂无相关考试,请耐心等待</p>')
                    $('.courseInfo-introduction-exam ').css('text-align','center');
                    $('.courseInfo-introduction-exam .no-course').css('margin-top','80px')
                    return;
                }
                var str1,str2;
                var trainList=data.data.trainExams;
                var courseList=data.data.courseExams;
                /*培训考试*/
                if(trainList){
                    str1='<h4 class="courseInfo-introduction-exam-title">培训考试</h4>'
                    str1+='<ul class="courseInfo-introduction-exam-list">'
                        for(var i= 0,len1=trainList.length;i<len1;i++){
                            str1+='<li class="toExam"  data-id='+trainList[i].id+' data-mark='+trainList[i].markStatus+' data-commit='+trainList[i].commitStatus+'>'+
                                '<span class="courseInfo-introduction-exam-text">'+trainList[i].name+'</span>'
                            if(trainList[i].markStatus==1){
                                str1+='<span class="courseInfo-introduction-exam-score">'+trainList[i].score+'分</span>'
                            }
                            if(trainList[i].commitStatus==1){
                                str1+='<span class="courseInfo-introduction-exam-date">'+trainList[i].commitTime+'</span>'
                            }else{
                                str1+='<span class="courseInfo-introduction-exam-date">未参加</span>'
                            }
                            str1+='</li>'
                        }
                    str1+='</ul>'
                    $('.courseInfo-introduction-exam li').eq(0).append(str1);
                }
                /*课程考试*/
                if(courseList){
                  str2='<h4 class="courseInfo-introduction-exam-title">课程考试</h4>'
                  str2+='<ul class="courseInfo-introduction-exam-list">'
                    for(var i= 0,len2=courseList.length;i<len2;i++) {
                        str2 += '<li class="toExam" data-id=' + courseList[i].id + ' data-mark='+courseList[i].markStatus+' data-commit='+courseList[i].commitStatus+'>' +
                            '<span class="courseInfo-introduction-exam-text">' + courseList[i].name + '</span>' +
                            '<span class="courseInfo-introduction-exam-name">' + courseList[i].typeInstanceName + '</span>'
                        if(courseList[i].markStatus==1) {
                            str2 += '<span class="courseInfo-introduction-exam-score">'+courseList[i].score+'分</span>'
                        }
                        if(courseList[i].commitStatus==1) {
                            str2 += '<span class="courseInfo-introduction-exam-date">'+courseList[i].commitTime+'</span>'
                        }else{
                            str2 += '<span class="courseInfo-introduction-exam-date">未参加</span>'
                        }
                        str2 +='</li>'
                    }
                    '</ul>'
                    $('.courseInfo-introduction-exam li').eq(0).append(str2);
                }
            }
        });
    }

    function courseCatalog() {
        $.ajax({
            type: "get",
            url: contextPath+'/train/simpleDetail',
            dataType: "json",
            data: {'id':id},
            success: function(data) {
                if($('.courseInfo-introduction')){
                    introData(data.data)
                }
                $('.courseInfo-introduction-list').attr('data-state',data.data.status)
                if(!data.data.courses){
                    $('.courseInfo-introduction-catalog ').append('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '>')
                    $('.courseInfo-introduction-catalog ').append('<p class="no-course-msg">暂无相关课程,请耐心等待</p>')
                    $('.courseInfo-introduction-catalog ').css('text-align','center');
                    $('.courseInfo-introduction-catalog .no-course').css('margin-top','30px')
                    return;
                }
                if(data.data.courses){
                    str = loadCatalogData(data.data.courses);
                    $('.courseInfo-introduction-catalog').append(str);
                }

            }
        });
    }
    /*课程简介*/
    function  introData(data){
        var imgSrc=data.coverImg[0].accessUrl;
        $('.courseInfo-introduction-img').find('img').attr('src',imgSrc);
        $('.courseInfo-introduction-detial-title').text(data.name);
        $('.courseInfo-introduction-detial-msg').text(data.digest);
        $('.courseInfo-introduction-detial-collect').text(data.like);
        $('.courseInfo-introduction-detial-watch').text(data.visitCount);
        $('.courseInfo-introduction-detial-date').text(data.createTime);
        $('.courseInfo-introduction-list').attr('data-course-id',data.id)

    }
   /*课程目录数据*/
    function loadCatalogData(data) {
        var str = "";
        for (var i = 0, len = data.length; i < len; i++) {
            str += '<li data-id=' + data[i].id + ' class="course-list-box">' +
                '<div class="courseInfo-introduction-catalog-img">'

            if(data[i].coverImg.length==0||!data[i].coverImg||!data[i].coverImg[0].accessUrl){
                str +=' <img >'
            }else{
                str +=' <img src=' + data[i].coverImg[0].accessUrl + '>'
            }
            str +='</div>' +
                ' <div class="courseInfo-intrduction-catalog-detial">' +
                ' <h5 class="ellipsis" title=' + data[i].name + '>' + data[i].name + '</h5>' +
                '<ul>'
            for (var j = 0, leng = data[i].items.length; j < leng; j++) {
                if (j > 3) {
                    str += '<li class="ellipsis dis-none " data-item-id='+data[i].items[j].id+'>'
                } else {
                    str += '<li class="ellipsis " data-item-id='+data[i].items[j].id+'>'
                }
                str += '<span class="courseInfo-intrduction-catalog-detial-icon">'
                if (data[i].items[j].type == "0") {
                    var src1=contextPath+'/resources/edcapp/img/icon_file.png';
                    str += '<img src='+src1+' data-type="file">'
                } else {
                    var src2=contextPath+'/resources/edcapp/img/icon_video.png';
                    str += '<img src='+src2+' data-type="vedio">'
                }
                str += '</span>' +
                    '<span> ' + data[i].items[j].name + ' </span>' +
                    '</li>'
            }
            str += '</ul>'
            if (data[i].items.length > 4) {
                var icionSrc=contextPath+'/resources/edcapp/img/btn_xl_nor.png';
                str += '<div class="courseInfo-intrduction-catalog-shrink hand" data-active="false">' +
                    '<img src='+icionSrc+'  >' +
                    '</div>'
            }
            str += '</li>'
        }
        return str;
    }
})
