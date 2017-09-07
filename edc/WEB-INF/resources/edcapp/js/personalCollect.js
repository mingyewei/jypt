//$(document).on('click','.collect-checkbox', function(e) {
//    console.log(11111)
//    var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
//    evt.preventDefault();
//    $(this).toggleClass('collect-checkbox-checked');
//})
$(document).on('click','.collect-list-name',function(){

    var type=$(this).parent('li').attr('data-type');
    var id=$(this).parent('li').attr('data-id');

    if(type==0){
        location.href=contextPath+"/homePage/detail?href=homePage/hotNewList&type=0&id="+id;
    }else if(type==1){
        location.href=contextPath+"/homePage/detail?href=homePage/noticeList&type=1&id="+id;
    }else if(type==2){

    }else if(type==3){

    }else if(type==4){
        var status=$(this).parent('li').attr('data-status');
        if(status==0){
            location.href=contextPath+'/kb/libraryFile?href=kb/library&path=lib&state=0&type=4&id='+id;
        }else{
            location.href=contextPath+'/kb/libraryVideo?href=kb/library&path=lib&state=1&type=4&id='+id;
        }

    }
})
/*全选*/
$('.collect-cancel-all').on('click', function(e) {
    var evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
    evt.preventDefault();
    $(this).toggleClass('collect-checkbox-checked');
    if ($(this).hasClass('collect-checkbox-checked')) {
        $('.collect-checkbox').each(function(index, el) {
            $(this).addClass('collect-checkbox-checked')
        })
    } else {
        $('.collect-checkbox').each(function(index, el) {
            $(this).removeClass('collect-checkbox-checked')
        })
    }
})
/*取消收藏*/
$('.collect-cancel-btn').on('click',function(){
    var cancelList=[];
    $('.collect-checkbox').each(function(index, el) {
        if($(this).hasClass('collect-checkbox-checked')){
           var  cancelId=$(this).parent().attr('data-id');
                cancelList.push(cancelId)
        }
    })
    if(cancelList.length>0){
        $.ajax({
            type: "post",
            url: contextPath +"/collection/noCollection",
            dataType: "json",
            data: {collectionIds:cancelList},
            traditional:true,
            success: function(data) {
                var  pageNum=$('.collect-cancel-btn').attr('pageNum');
                collection(pageNum)
            }
        })
    }
})

$(document).ready(function() {
    btnGetDownClass($('.collect-cancel-btn'));
        collection(1)
        /*多选框*/

})
/*分页加载*/
function collection(pageNo){
    $.ajax({
        type: "post",
        url: contextPath +"/collection/list",
        dataType: "json",
        data: {start:pageNo,end:9},
        success: function(data) {
            $('.collect-cancel-btn').attr('pageNum',pageNo)
            if (data.code == 1) {
                dataPageSize = data.data.pageSize;
                /*每页显示列表数量*/
                laypage({
                    cont: 'collect-paging',
                    pages: Math.ceil(data.data.total / data.data.pageSize),
                    /*总页数*/
                    curr: data.data.currentPage || 1,
                    /*当前页*/
                    skin: '#21a6e4',
                    jump: pageCallback
                })

            }
            function pageCallback(obj, first) {
                $('.collect-cancel-all').removeClass('collect-checkbox-checked')
                var currentPage = obj.curr;
                $.ajax({
                    type: "post",
                    url:contextPath +"/collection/list",
                    dataType: "json",
                    data: {start:currentPage,end:9},
                    traditional:true,
                    success: function (data) {
                        if (data.code == 1) {
                            var str = '';
                            var datalist = data.data.data;
                            for (var i = 0, len = datalist.length; i < len; i++) {
                                str +=  '<li class="collect-list ellipsis" data-id='+datalist[i].resourceKey+' data-type='+datalist[i].type+' data-status='+datalist[i].status+'>'+
                                    '<label class="collect-checkbox hand" >'+
                                    '<input type="checkbox"> '+
                                    '</label><span class="collect-list-name">'+datalist[i].title+'</span>'+
                                    '<span class="collect-list-date float-rt">'+datalist[i].createTime+'</span>'+
                                    '</li>'
                            }
                            $('.collect-box ul').html(str);
                        }

                    }
                })

            }
        }
    });
}

