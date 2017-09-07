/*培训考试或课程考试*/
$(document).on('click', '.exam-bannerList-box  span', function() {
    if (!($(this).attr('data-class') && $(this).attr('data-class') == 'none')) {
        $('.exam-train-detial').show();
        var index=$(this).index();
        var id=$(this).parent('li').attr('data-id');
        loadExamData(index,id)
    }
})
$(document).on('click', '.exam-train-detial  img', function() {
    $('.exam-train-detial').hide();
})
$(document).on('click','.exam-bannerList-box  img',function(e){
    var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        evt.preventDefault();
    var id=$(this).parent().attr('data-id');
    location.href=contextPath+"/train/simpleCourse?href=train/detail&id="+id;
})
$(document).on('click','.exam-train-detial li',function(){
    var commit=$(this).attr('data-commit');
    var mark=$(this).attr('data-mark');
    var examId=$(this).attr('data-id');
    var state= $('.exam-train-tab').attr('state');
    if(state==0){
        if(commit==0&&mark==0){
            location.href=contextPath+'/exam/detail?href=exam/exam&status=0&id='+examId;
        }else if(commit==1&&mark==0){
            location.href=contextPath+'/exam/detail?href=exam/exam&status=1&id='+examId;
        }else{
            location.href=contextPath+'/exam/detail?href=exam/exam&status=2&id='+examId;
        }
    }
    if(state==1){
            layer.msg("考试暂未考试")
    }
    if(state==2){
        if(commit==0&&mark==0){
            layer.msg("考试已过期")
        }
        if(commit==1&&mark==0){
            location.href=contextPath+'/exam/detail?href=exam/exam&status=1&id='+examId;
            return;
        }
        if(commit==1&&mark==1){
            location.href=contextPath+'/exam/detail?href=exam/exam&status=2&id='+examId;
        }
    }


})
$(document).ready(function() {
    var pageNow = 1,
        pageAfter= 1,
        pageBefore= 1,
        flag1 = true,
        flag2=true,
        flag3=true;
    /*下拉加载*/
    var tabTop = $('.exam-else-box').offset().top;
    var moreBtnHeight = $('.load-more').height();
    $(window).on('scroll', function() {
        var viewH = $(this).height(),
            contentH = $(".exam-else-box").height(),
            scrollTop = $(this).scrollTop();

        if (contentH + tabTop - viewH - scrollTop - moreBtnHeight <= 0) {
            var dataTab = $('.exam-else-tab').attr('data-tab');
            if(dataTab==0&&flag1==true){
                pageNow++;
                elseExamList(1, pageNow);
            }else if(dataTab==1&&flag2==true){
                pageAfter++;
                elseExamList(0,pageAfter);
            }else if(dataTab==3&&flag3==true){
                pageBefore++;
                elseExamList(2,pageBefore);
            }else{

            }

        }
    });
    /*banner数据*/
    /*传入状态值 正在进行：1，即将开始：0，已过期：2*/
    banner(1,1);
    //banner(0);
    //banner(2);
    //其他考试数据
    elseExamList(1,1);

    $(document).on('click','.exam-else-list',function(){
        var id=$(this).attr('data-id');
        var commit=$(this).attr('data-commit');
        var code=$(this).attr('data-code');
        if(code==1||code==2){
            if(commit==0){
                if(code==1){
                    location.href=contextPath+'/exam/detail?href=exam/exam&status=0&id='+id;
                }
                if(code==2){
                    layer.msg('考试已过期')
                }
            }else{
                var status=$(this).find('.exam-list-location').attr('data-status')
                location.href=contextPath+'/exam/detail?href=exam/exam&status='+status+'&id='+id;
            }
        }else{
            layer.msg('考试未开始')
        }

    })
    /*培训考试tab切换*/
    $('.exam-else-tab li').on('click', function() {
            var trainTab = $(this).index();
            $(this).addClass('exam-active');
            $(this).siblings('li').removeClass('exam-active');
            $('.exam-else-list-box:eq(' + trainTab + ')').show();
            $('.exam-else-list-box:eq(' + trainTab + ')').siblings('.exam-else-list-box').hide();
            $('.exam-else-tab').attr('data-tab', trainTab)

        if(trainTab==1&&$(this).attr('data-first')=="true"){
            elseExamList(0,1);
            $(this).attr('data-first',false)
        }
        if(trainTab==2&&$(this).attr('data-first')=="true"){
            elseExamList(2,1);
            $(this).attr('data-first',false)
        }
    })
        /*其他考试tab切换*/
    $('.exam-train-tab li').on('click', function() {
        var tabIndex = $(this).index();
        $('.exam-train-tab').attr('state',tabIndex)
        $(this).addClass('exam-active');
        $(this).siblings('li').removeClass('exam-active');
        $('.exam-bannerList:eq(' + tabIndex + ')').show();
        $('.exam-bannerList:eq(' + tabIndex + ')').siblings().hide();
        $('.exam-swiper').attr('data-current', tabIndex);

        if(tabIndex==1){
            if($(this).attr('data-ok')==1){
                banner(0,1);
                $(this).attr('data-ok',0)
            }
        }

        if(tabIndex==2){
            if($(this).attr('data-ok')==1){
                banner(2,1);
                $(this).attr('data-ok',0)
            }
        }

    })


        /*培训考试*/
        /*banner 向左翻页*/

    $('.exam-right-btn').on('click', function() {
        /*获取tab项*/
        var current = $('.exam-swiper').attr('data-current');

        /*获取显示的是第几页*/
        var nowPage = $('.exam-bannerList:eq(' + current + ')').attr('now-page');

        /*数据总共有几页*/
        var totalPage = $('.exam-bannerList:eq(' + current + ')').attr('pageSize');
        /*获取了几页*/
        var pageSize = $('.exam-bannerList:eq(' + current + ') .exam-bannerList-box ').length;
        /*如果目前有的页数小于总共的页数 则添加数据*/
        if(pageSize<totalPage){
            pageSize++
            if(current==0){
                banner(1,pageSize);
            }else if(current==1){
                banner(0,pageSize);
            }else{
                banner(2,pageSize);
            }
        }
        /*如果现在展示的页数小于总共有的页数 则翻页*/
        if (nowPage < pageSize) {
            $('.exam-bannerList:eq(' + current + ')').animate({
                left: -1160 * nowPage + 'px'
            }, 'slow')
            nowPage++;
             $('.exam-bannerList:eq(' + current + ')').attr('now-page', nowPage);
        }

    })
    $('.exam-left-btn').on('click', function() {
            var current = $('.exam-swiper').attr('data-current');
            var nowPage = $('.exam-bannerList:eq(' + current + ')').attr('now-page');
            if (nowPage > 1) {
                $('.exam-bannerList:eq(' + current + ')').animate({
                    left: '+=' + '1160px'
                }, 'slow')
                nowPage--;
               $('.exam-bannerList:eq(' + current + ')').attr('now-page', nowPage);
            }
        })
        /*获取banner数据*/
    function banner(status,pageNo) {
        /*根据不同的status 请求不同状态的数据*/
        $.ajax({
            type: "post",
            url: contextPath+"/train/simpleExamList",
            dataType: "json",
            data: { "status": status,"currentPage":pageNo,"pageSize":8 },
            success: function(data) {
                if(!data.data.data||data.data.data.length<8){
                    $('.exam-left-btn').hide();
                    $('.exam-right-btn').hide();
                }
                if (status == 1) {
                    var pageSize1=Math.ceil(data.data.total/8);
                    var boxWidth =  pageSize1 * 1160 + 'px';
                    $('.exam-bannerList-underway').css('width', boxWidth);
                    $('.exam-bannerList-underway').attr('pageSize',pageSize1);
                    if(!data.data.data||data.data.data.length==0){
                        $('.exam-bannerList-underway').append('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '>')
                        $('.exam-bannerList-underway').append('<p class="no-course-msg">暂无相关培训,请耐心等待</p>')
                        $('.exam-bannerList-underway').css('text-align','center');
                        return
                    }
                    var str1 = getBannerData({
                        'data': data.data.data,
                        'index': 1

                    })
                    $('.exam-bannerList-underway').append(str1);
                } else if (status == 0) {
                    var pageSize2=Math.ceil(data.data.total/8);
                    var boxWidth =  pageSize2 * 1160 + 'px';
                    $('.exam-bannerList-aboutbegin').css('width', boxWidth);
                    $('.exam-bannerList-aboutbegin').attr('pageSize',pageSize2)
                    if(!data.data.data||data.data.data.length==0){
                        $('.exam-bannerList-aboutbegin').append('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '>')
                        $('.exam-bannerList-aboutbegin').append('<p class="no-course-msg">暂无相关培训,请耐心等待</p>')
                        $('.exam-bannerList-aboutbegin').css('text-align','center');
                        return
                    }
                    var str2 = getBannerData({
                        'data': data.data.data,
                        'index': 2
                    })
                    $('.exam-bannerList-aboutbegin').append(str2);
                } else {
                    var pageSize3=Math.ceil(data.data.total/8);
                    var boxWidth =  pageSize3 * 1160 + 'px';
                    $('.exam-bannerList-expired').css('width', boxWidth);
                    $('.exam-bannerList-expired').attr('pageSize',pageSize3)
                    console.log(1111)
                    if(!data.data.data||data.data.data.length==0){
                        $('.exam-bannerList-expired').append('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_couse.png"+ '>')
                        $('.exam-bannerList-expired').append('<p class="no-course-msg">暂无相关培训,请耐心等待</p>')
                        $('.exam-bannerList-expired').css('text-align','center');
                        return
                    }
                    var str3 = getBannerData({
                        'data': data.data.data,
                        'index': 3
                    })
                    $('.exam-bannerList-expired').append(str3);
                }
            }
        });
    }

    /*其他考试数据*/
    function elseExamList(code,pageNo) {
        $.ajax({
            type: "get",
            url: contextPath+'/exam/list',
            dataType: "json",
            data: { "status": code,"start":pageNo,"end":10 },
            success: function(data) {
                if(3*pageNo>=data.data.total){
                    if(code==1){
                        flag1=false;
                    }else if(code==0){
                        flag2=false;
                    }else{
                        flag3=false;
                    }
                }

                if (code == 1) {
                    if(data.data.data.length==0&&pageNo==1){
                        $('.exam-else-list-box:eq(0)').html('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '><p class="no-course-msg">暂无相关考试,请耐心等待</p>')
                        $('.exam-else-list-box:eq(0)').css('text-align','center');
                        return;
                    }
                    var str = examListData(data.data.data,code);
                    $('.exam-else-list-box:eq(0)').append(str);
                } else if (code == 0) {
                    if(data.data.data.length==0&&pageNo==1){
                        $('.exam-else-list-box:eq(1)').html('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '><p class="no-course-msg">暂无相关考试,请耐心等待</p>')
                        $('.exam-else-list-box:eq(1)').css('text-align','center');
                        return;
                    }
                    var str1 = examListData(data.data.data,code);
                     $('.exam-else-list-box:eq(1)').append(str1);
                } else {
                    if(data.data.data.length==0&&pageNo==1){
                        $('.exam-else-list-box:eq(2)').html('<img  class="no-course" src=' + contextPath+"/resources/edcapp/img/no_class.png"+ '><p class="no-course-msg">暂无相关考试,请耐心等待</p>')
                        $('.exam-else-list-box:eq(2)').css('text-align','center');
                        return;
                    }
                    var str2 = examListData(data.data.data,code);
                    $('.exam-else-list-box:eq(2)').append(str2);
                }
            }
        })
    }
});

function examListData(data,code) {
    var str = ""
    for (var i = 0, len = data.length; i < len; i++) {
        str += '<li class="exam-else-list" data-id=' + data[i].exam_id + ' data-commit='+data[i].commit_status+' data-code='+code+'>' +
                      '<span class="exam-list-title">' + data[i].exam_name + '</span>'
                        if(data[i].commit_status==1&&data[i].mark_status==1){
                            str += '<span class="exam-list-location" data-status=2>' + data[i].total_score + '</span>'
                        }else if(data[i].commit_status==1&&data[i].mark_status==0){
                            str += '<span class="exam-list-location" data-status=1>评分中</span>'
                        }
                  str +=  '<span class="exam-list-date">' + data[i].start_time + '</span>' +
               '</li>';
    }
    return str;
}

function getBannerData(paramData) {
    var data = paramData.data;
    if(!data){return false};
    var index = paramData.index;
    var len = data.length,
        pageSize = (Math.ceil(len / 8));
    var str = "";
    for (var i = 1; i <= pageSize; i++) {
        str += '<li class="exam-bannerList-box " >' +
            '<ul>'
        for (var j = 1 + (i - 1) * 8; j <= 8 * i; j++) {
            if (!data[j - 1]) {
                break;
            }
            if(data[j - 1].hasTrainExam == 0&&data[j - 1].hasCourseExam == 0){
                str += '<li data-id=' + data[j - 1].id + ' class="dis-none">'

            }else{
                str += '<li data-id=' + data[j - 1].id + '>'
            }
            str += '<img src="' + data[j - 1].coverImg[0].accessUrl + '">' +
                '<h5 class="exam-bannerList-title">' + data[j - 1].name + '</h5>'
            if (data[j - 1].hasTrainExam == 1) {
                str += '<span >培训考试</span>'
            } else {
                str += '<span class="exam-bannerList-without" data-class="none">培训考试</span>'
            }
            if (data[j - 1].hasCourseExam == 1) {
                str += '<span >课程考试</span>'
            } else {
                str += '<span class="exam-bannerList-without" data-class="none">课程考试</span>'
            }
            str += '</li>'
        }
        str += '</ul>' +
            '</li>'
    }
    return str;
}
function  loadExamData(index,id){
    $.ajax({
        type: "get",
        url: contextPath+'/train/exam',
        dataType: "json",
        data: {'id':id},
        success: function(data) {
            var str1,str2;
            var trainList=data.data.trainExams;
            var courseList=data.data.courseExams;
            if(index==2){
                $('.exam-train-detial-title span').text('培训考试');
                for(var i= 0,len1=trainList.length;i<len1;i++){
                str1='<li data-id='+trainList[i].id+' data-commit='+trainList[i].commitStatus+' data-mark='+trainList[i].markStatus+'>'+
                        '<span>'+trainList[i].name+'</span>'
                    if(trainList[i].commitStatus==0){
                        str1+= '<span class="exam-train-detial-middle">未考试</span>'
                    }else{
                        if(!trainList[i].markStatus==0){
                            str1+= '<span class="exam-train-detial-middle">'+trainList[i].score+'分</span>'
                        }
                        str1+= '<span class="float-rt exam-train-detial-date">'+trainList[i].commitTime+'</span>'
                    }
                    str1+= '</li>'
                    $('.exam-train-detial ul').html(str1);
                }
            }
            if(index==3){
                $('.exam-train-detial-title span').text('课程考试');
                for(var i= 0,len2=courseList.length;i<len2;i++) {
                    str2 = '<li data-id=' + courseList[i].id + ' data-commit=' + courseList[i].commitStatus + ' data-mark=' + courseList[i].markStatus + '>' +
                        '<span>' + courseList[i].name + '</span>'
                    if (courseList[i].commitStatus == 0) {
                        str2 += '<span class="exam-train-detial-middle">未考试</span>'
                    } else {
                        if (!courseList[i].markStatus == 0) {
                            str2 += '<span class="exam-train-detial-middle">' + courseList[i].score + '分</span>'
                        }
                        str2 += '<span class="float-rt exam-train-detial-date">' + courseList[i].commitTime + '</span>'
                    }
                    str2 += '</li>'
                }
                $('.exam-train-detial ul').html(str2);
            }
        }
    })

}
