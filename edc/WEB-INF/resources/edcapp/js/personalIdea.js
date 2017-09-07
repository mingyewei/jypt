/*单选*/
$('.personal-post-suggest li').on('click', function(e) {
    var index=$(this).index();
    $('.personal-post-suggest').attr('data-type',index);
    var evt = window.event || arguments.callee.caller.arguments[0]; //
    evt.preventDefault();
    $(this).addClass('personal-post-suggest-checked');
    $(this).siblings().removeClass('personal-post-suggest-checked');


})

/*tab切换*/
$('.share-suggest-tab li').on('click', function() {
    $(this).addClass('suggest-tab-active');
    $(this).siblings().removeClass('suggest-tab-active');
    var inedx = $(this).index();
    if (inedx == 0) {
        $('.personal-post-suggest').show();
        $('.personal-my-suggest').hide();
    } else {
        $('.personal-post-suggest').hide();
        $('.personal-my-suggest').show();
        //我的反馈
        myFeedBack(1)
    }
    if($('.personal-suggest-btn').attr('data-hide')=='true'){
        $('.personal-suggest-btn').hide();
        $('.personal-suggest-btn').attr('data-hide','false')
    }else{
        $('.personal-suggest-btn').show();
    }
})
$('.personal-suggest-btn').on('click',function(){
    var type= $('.personal-post-suggest').attr('data-type')||0;
    var content=$('.personal-suggest-text').val().trim();
    if(content==""){
        layer.msg("请填写反馈信息")
    }else{
        $.ajax({
            type: "post",
            url: contextPath +"/feedBack/add",
            dataType: "json",
            data:{'askContent':content,'type':type},
            success: function(data) {
                var content=$('.personal-suggest-text').val('');
            }
        })
    }
})
$(document).on('click','.personal-my-suggest-box li',function(){
    var type=$(this).attr('data-type');
    var id=$(this).attr('data-id');
    $.ajax({
        type: "post",
        url: contextPath +"/feedBack/detail",
        dataType: "json",
        data:{'id':id},
        success: function(data) {
         var content=data.data.askContent;
            $('.personal-suggest-btn').attr('data-hide','true')
            $('.personal-suggest-text').val(content);
            $('.share-suggest-tab li').eq(0).click();
            $('.personal-post-suggest li').eq(type).addClass('personal-post-suggest-checked');
            $('.personal-post-suggest li').eq(type).siblings('li').removeClass('personal-post-suggest-checked');

        }
    })

})
$(document).ready(function() {
    btnGetDownClass($('.personal-suggest-btn'));

})
/*分页加载*/
function myFeedBack(pageNo){
    $.ajax({
        type: "post",
        url: contextPath +"/feedBack/list",
        dataType: "json",
        data: {start:pageNo,end:9},
        success: function(data) {
            if (data.code == 1) {
                dataPageSize = data.data.pageSize;
                /*每页显示列表数量*/
                laypage({
                    cont: 'personal-suggest-page',
                    pages: Math.ceil(data.data.total / data.data.pageSize),
                    /*总页数*/
                    curr: data.data.currentPage || 1,
                    /*当前页*/
                    skin: '#21a6e4',
                    jump: pageCallback
                })

            }
            function pageCallback(obj, first) {
                var currentPage = obj.curr;
                $.ajax({
                    type: "post",
                    url:contextPath +"/feedBack/list",
                    dataType: "json",
                    data: {start:currentPage,end:9},
                    traditional:true,
                    success: function (data) {
                        if (data.code == 1) {
                            var str = '';
                            var datalist = data.data.data;
                            for (var i = 0, len = datalist.length; i < len; i++) {
                                str += '<li data-type='+datalist[i].type+' data-id='+datalist[i].id+'>' +
                                    '<span class="personal-feedback-detial ellipsis">'+datalist[i].askContent+'</span>'+
                                   '<span class="personal-suggest-date float-rt">'+datalist[i].askTime+'</span>'+
                                '</li>'
                            }
                            $('.personal-my-suggest-box').html(str);
                        }

                    }
                })

            }
        }
    });
}
