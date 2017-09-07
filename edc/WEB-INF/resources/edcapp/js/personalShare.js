//附件浏览
$(".share-choice-btn").on("click", function () {

    //打开预览
    getUploadFileFun.call(this);
    //附件上传  参数一点击上传按钮   参数二上传formdata的id
});
/*tab切换*/
$('.share-upload-tab li').on('click', function() {
    var index = $(this).index();
    $(this).siblings().removeClass('share-tab-active');
    $(this).addClass('share-tab-active');
    if (index == 0) {
        $('.share-upload').show();
        $('.share-myshare-box').hide();
        $('.share-myshare-detial').hide();
    } else {
        $('.share-upload').hide();
        $('.share-myshare-box').show();
        $('.share-myshare-detial').hide();
        //我的分享
        myShare(1)
    }
})
/*选择上传类型*/
$('.share-file-type').on('click', function() {
    var index=$(this).index();
    $('.share-upload-btn').attr('share-type',index);
    $(this).addClass('share-file-active');
    $(this).siblings().removeClass('share-file-active');
})
/*分享详情*/
$(document).on('click','.myshare-list li',function(){
    var id=$(this).attr('data-id');
    $('.share-myshare-box').hide();
    $('.share-myshare-detial').show();
    $.ajax({
        type: "post",
        url: contextPath +"/shareDocument/detail",
        dataType: "json",
        data: {id:id},
        success: function(data) {
            var data=data.data;
            //if(data.type==0){
            //    $('.share-type').text("文档资料")
            //}else{
            //    $('.share-type').text("视频资料")
            //}
            $('.my-share-name').attr("placeholder",data.name);
            $('.my-share-introduce').attr("placeholder",data.digest);
            $('.my-share-content').attr("placeholder",data.content);
            var fileName=(JSON.parse(data.attachments))[0].name;
            $('.my-file-name').text(fileName);
            $('.my-file-name').show();

        }
    })

})
$(document).ready(function() {
    var  uploadData=[];
    $('.share-upload-btn').addClass('active-color');
   //视频上传
    fileup($(".share-choice-upload-btn"), $(".upload-form"))||[];

    $('.share-upload-btn').on('click',function(){
        if($('.share-file-name').val()==""){
            layer.msg('请填写文件名称');
            return ;
        }
        if($('.share-file-introduce').val()==""){
            layer.msg('请填写资料简介');
            return ;
        }
        if($('.share-file-content').val()==""){
            layer.msg('请填写资料内容');
            return ;
        }
        //if(!$('.share-choice-input').attr('haveLoad')==1){
        //    layer.msg('请先上传文件');
        //    return ;
        //}
        var type=$(this).attr('share-type')||0;
        var fileName=$('.share-file-name').val().trim();
        var fileDigest=$('.share-file-introduce').val().trim();
        var fileContent=$('.share-file-content').val().trim();
        uploadData=JSON.stringify(uploadData);
        var param={"type":type,"name":fileName,"digest":fileDigest,"content":fileContent,"attachments":uploadData};
        $.ajax({
            url: basecontextPath + "/shareDocument/add",
            type: 'POST',
            data: param,
            dataType: 'json',
            traditional:true,
            success: function (resData) {
                if(resData.code==1){
                    layer.msg('提交成功');
                    $('.share-file-name').val("");
                    $('.share-file-introduce').val("");
                    $('.share-file-content').val("");
                    $('.share-choice-input').empty();
                    $('.share-file-upload-name').text('').hide().empty();
                    uploadData=[];
                }
            }
        })

    })

    function fileup(inp, formdata) {
        //点击上传按钮
        inp.on("click", function () {
            var fileVal=$(this).siblings("input[name='toUpload']").val();
            if (fileVal==''){
                layer.msg('请选择上传文件');
                return;
            }else {
               doUpload(formdata);
                $(this).siblings("input[type=file]").empty();
            }
        })
    }
    function doUpload(formdata) {
        var formData = new FormData(formdata[0]);
        $.ajax({
            url: basecontextPath + "/file/upload",
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function (resData) {
                if (resData.code == 1) {
                    layer.msg('文件上传成功！')
                    //$('.share-file-upload-name').text('').hide().empty();
                    //$('.share-upload-btn').addClass('active-color');
                    $('.share-choice-input').val('');
                    uploadData.push(resData.data);
                } else {
                    layer.msg('附件文件上传失败，请重试！')
                }
            },
            error: function (returndata) {
            }
        })
    }

})
/*分页加载*/
function myShare(pageNo){
    $.ajax({
        type: "post",
        url: contextPath +"/shareDocument/myListItem",
        dataType: "json",
        data: {start:pageNo,end:8},
        success: function(data) {
            $('.collect-cancel-btn').attr('pageNum',pageNo)
            if (data.code == 1) {
                dataPageSize = data.data.pageSize;
                /*每页显示列表数量*/
                laypage({
                    cont: 'myshare-change-page',
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
                    url:contextPath +"/shareDocument/myListItem",
                    dataType: "json",
                    data: {start:currentPage,end:8},
                    traditional:true,
                    success: function (data) {
                        if (data.code == 1) {
                            var str = '';
                            var datalist = data.data.data;
                            for (var i = 0, len = datalist.length; i < len; i++) {
                            str+='<li data-id='+datalist[i].id+'>'+
                                '<div class="myshare-name">'+datalist[i].name+'</div>'
                                if(datalist[i].reviewStatus==0){
                                    str+= '<div style="color:#767676" class="myshare-status statue-reviewing">审核中'
                                }else if(datalist[i].reviewStatus==1){
                                    str+= '<div  class="myshare-status myshare-status-pass">审核通过'
                                }else{
                                    str+= '<div  class="myshare-status">审核未通过<i></i>'+
                                        '<div class="myshare-status-reason "> <span>'+datalist[i].reviewSuggestion+'</span></div>'
                                }
                                    str+='</div>'+
                                          '<div class="myshare-date">'+datalist[i].uploadTime+'</div>'+
                                '</li>'
                            }
                            $('.myshare-list').html(str);
                        }

                    }
                })

            }
        }
    });
}

function getUploadFileFun() {
    var filelistName = '';
    var obj = $(this).siblings("input[name='toUpload']").click();
    var obj2 = $(this).siblings(".share-file-upload-name")
    $(this).siblings(".share-file-upload-name").show();
    $(obj).on("change", function () {
        var fileList = this.files[0];
        filelistName = fileList.name
        if (fileList == undefined) {
            obj2.text("");
        } else {
            obj2.text(fileList.name);
        }
    });

}
