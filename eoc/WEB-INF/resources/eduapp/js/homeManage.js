/*弹窗框下拉列表*/
$("#operation-infosel-modal p").bind("click", function () {
    var ul = $("#operation-infosel-modal ul");
    $("#operation-infosel-modal p i").addClass("current");
    if (ul.css("display") == "none") {
        ul.slideDown("fast");
    } else {
        ul.slideUp("fast");
    }
    ;
});
var linkStatus=1;
/* end 下拉列表*/
$("#operation-infosel-modal ul li a").on("click",function(){
    //var selectText = $("#operation-infosel-modal p").text();
    var txt = $(this).text();
    $("#operation-infosel-modal p").html(txt + "<i></i>");
    $("#operation-infosel-modal ul").hide();
    if (txt=="热点新闻"){
        $("#pic").show();
        $(".outLink").css('display','none');
        $("#imgContent").css('display','none');
        $("#content_editor").show();
        $(".attachments").css('display','block')
        $("#hotNew").css('display','block');
    }else if (txt=="轮播图"){
        $("#pic").show();
        $(".outLink").css('display','block');
        $("#imgContent").css('display','none');
        $("#hotNew").css('display','none');
        $(".attachments").hide();
        $("input[name='externalLink']"&&"input[value='1']").prop("checked", true);
    }else if(txt=="培训公告"){
        $("#pic").hide();
        $(".outLink").css('display','none');
        $("#imgContent").css('display','none');
        $("#content_editor").show();
        $(".attachments").css('display','block')
        $("#hotNew").css('display','block');
    }
});
$("input[name='externalLink']").on("click",function(){
    var externalLink= $("input[name='externalLink']:checked").val();
    $("#linkStatus").val(externalLink);
    if(externalLink=="1"){
        linkStatus=1;
        $("#imgContent").hide();//外部链接 否
        $("#content_editor").css('display','block');
        $(".attachments").hide();
    }else if(externalLink=="0"){//外部链接 是
        linkStatus=0;
        $("#imgContent").css('display','block');
        $(".attachments").hide();
        $("#content_editor").css('display','none');
    }
});
var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {};
/*搜索查询事件*/
$("#question_search_btn").on("click",searchBtn);
function searchBtn() {
    /*题目*/
    var topicVal = $.trim($("#topic").val());
    /*$.trim去除收尾空格*/
    var subjectType = $("#operation-infosel p").text();
    /*查询类型*/
    if (subjectType == "热点新闻") {
        subjectType = 0;
    } else if (subjectType == "轮播图") {
        subjectType = 2;
    } else if (subjectType == "培训公告") {
        subjectType = 1;
    } else {
        subjectType = '';
    }
    searchTrime.title = topicVal;
    searchTrime.name = subjectType;
    $.ajax({
        type: "post",
        url: contextPath + "/cms/Lists",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                laypage({
                    cont: 'homeManage_page',
                    pages: Math.ceil(data.data.total / data.data.pageSize), /*总页数*/
                    curr: data.data.currentPage || 1, /*当前页*/
                    jump: pageCallback
                })
            }
        }
    })
}
/*分页回调函数*/
function pageCallback(obj, first) {
    var currentPage = obj.curr;
    var dataPageSize = 10;
    searchTrime.currentPage = currentPage;
    searchTrime.pageSize = dataPageSize;
    $.ajax({
        type: "post",
        url: contextPath + "/cms/Lists",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            sccFunction(data);
            $("#table-dataallcheck").removeClass("check-current");
            $("#table-dataallcheck").attr("data-check", "");
        }
    });
}
/*
 * 动态添加数据方法
 */
function sccFunction(data) {
    $("tbody").empty();
    /*表格展示数据的List*/
    var dataList = data.data.data;
    var sun_page = data.data.total;
    $("#sum_page span").text(sun_page);
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].pid == 0) {
            dataList[i].pid = "热点新闻";
        } else if (dataList[i].pid == 1) {
            dataList[i].pid = "培训公告";
        } else if (dataList[i].pid == 2) {
            dataList[i].pid = "轮播图";
        } else {
            dataList[i].pid = "";
        }
    }
    /*显示数据的ID*/
    var tableList = ["name", "title", "create_time"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];

    /*添加数据*/
    var operation = ["table-edit"]
    var title = ["编辑"]
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
    /*全选*/
    tableEditFn();
};
searchBtn();
questTable.checkBoxAll("table-dataallcheck");
var dataUrl='';
/*编辑*/
var  Presentation=[];
function tableEditFn() {
    $(".table-edit").on("click",editFn)
    function editFn(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked', true);
        var self = this;
        var getId =singleId(self, "id"); /*编辑某一个返回的这行的标识ID*/
        $("#id").text(getId);
        $.ajax({
            type: "post",
            url:contextPath + "/cms/detail",
            data: {
                id: getId
            },
            dataType: "json",
            success: function(data) {
                if (data.code == 1) {
                    $("#id").val(data.data.id);//唯一标识IDar
                    var pidType=0;//栏目的类型
                    pidType==data.data.pid;
                    $("#modalUserName").val(data.data.title)//题目
                    //type
                    if (data.data.pid == 0) {//栏目
                        $('#operation-infosel-modal p').text('热点新闻');
                        $("#imgContent").addClass('dis-none');
                        $(".outLink").css('display','none');
                        $("#content_editor").show();
                        $(".attachments").css('display','block')
                        $("#hotNew").css('display','block');
                    } else if(data.data.pid == 1){
                        $('#operation-infosel-modal p').text('培训公告');
                        $(".outLink").css('display','none');
                        $("#imgContent").css('display','none');
                        $("#content_editor").show();
                        $(".attachments").css('display','block')
                        $("#hotNew").css('display','block');
                    }else if(data.data.pid == 2){
                        $('#operation-infosel-modal p').text('轮播图');
                        $(".outLink").css('display','block');
                        $("#imgContent").css('display','none');
                        $("#hotNew").css('display','none');
                        $(".attachments").css('display','none');
                        $("input[name='externalLink']"&&"input[value='1']").prop("checked", true);
                    }else{
                        $('#operation-infosel-modal p').text('全部');
                    }
                    $('#operation-infosel-modal p i').toggleClass('current');
                    CKEDITOR.instances.editor01.setData(data.data.content);//content内容
                    $(".questionCont").hide();
                    $("#message_modal").show();
                    if(data.data.publishStatus==0){
                        $("input[name='course_elaborate']"&&"input[value='0']").prop("checked", true);
                        $("input[name='course_elaborate']"&&"input[value='1']").prop("checked", false);
                    }else{
                        $("input[name='course_elaborate']"&&"input[value='0']").prop("checked", false);
                        $("input[name='course_elaborate']"&&"input[value='1']").prop("checked", true);
                        if(data.data.linkStatus==0){//隐藏富文本框
                            $("#links").val(data.data.linkUrl);
                            linkStatus=0;
                            $("#imgContent").show()//链接输入框显示
                            $("#content_editor").hide()
                            $("input[name='externalLink']"&&"input[value='0']").prop("checked", true)
                        }else if(data.data.linkStatus==1){//显示富文本框
                            linkStatus=1
                            $("#imgContent").hide()
                            $("#content_editor").show();
                            $("input[name='externalLink']"&&"input[value='1']").prop("checked", true)
                        }
                    }
                    if(data.data.attachments!=null&&data.data.attachments!=undefined&&data.data.attachments!=""){
                        Presentation=JSON.parse(data.data.attachments);
                        uploaddata($("#uploadForm"));
                    }
                    if(data.data.coverImgUrl==''||typeof data.data.coverImgUrl=='undefined'){
                        $(".img-view").hide();
                    }else{
                        $(".img-view").show();
                        imgArr=[];
                        imgArr=imgArr.concat(JSON.parse(data.data.coverImgUrl))//上传的图片
                        if(imgArr.length!=0){
                            $(".img-view").show();
                            $("#imgupload").attr('src',imgArr[0].accessUrl).show();
                            getUploadImg("#fileimg", "#imgupload");
                        }else {
                            $(".image_close").hide();
                        }
                    }
                }
            }
        })
    };
    dataUrl =  basecontextPath + "/cms/edit";/*新增的数据ID地址*/

};
///!*多个删除*!/
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length <= 0) {
        layer.msg('请选择删除的列表！');
        return;
    }
    layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        },function () {
            var ids=[];
            for (var i = 0; i < idArray.length; i++) {
                ids[i] = idArray[i];
            }
            $.ajax({
                type: "post",
                url: basecontextPath + "/cms/delete",
                data:  {
                    ids:idArray
                },
                traditional: true,
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        layer.close();
                        layer.msg('已删除', {
                            icon: 1,
                            time: 600
                        });
                        $("#question_search_btn").click();
                        idArray = null;
                    }
                }
            });
            layer.closeAll();
        }, function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
    )


});
//=添加=
$("#question_add").on("click", function () {
    $(".questionCont").hide();
    $("#message_modal").show();
    $(".img-view").hide();
    $("#hotNew").show();
    $("#pic").show();
    $("#imgContent").hide()
    $("#content_editor").show();
    $(".outLink").hide();
    $(".attachments").show();
    dataUrl =basecontextPath + "/cms/add";/*修改的数据ID地址*/
    $("#id").text('')
});
//图片上传
$("#pic").on("click", "#fileimgupload", function () {
    $("#fileimg").click();
    getUploadImg("#fileimg", "#imgupload");
});
function getUploadImg(obj, obj2) {
    $(obj).on("change", function () {
        var fileList = this.files[0];
        if (fileList == undefined) {
            $(obj2).attr("src", "");
            $(obj2).hide();
            return false;
        }
        if (!/image\/\w+/.test(fileList.type)) {
            alert("请选择图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(fileList);
        reader.onload = function (e) {
            $(obj2).attr("src", e.target.result);
            $(obj2).show();
            $(".img-view").show();
            $(".img-view a").show();
        }
    })
}
var imgArr=[];
$("#img_upload").on("click",function(){//input的file name必须为toUpload,否则拿不到值.....
    imgArr=[];
    var formData = new FormData($('#imgloadForm')[0]);
    $.ajax({
        url: basecontextPath + "/file/upload",
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
    }).done(function(res) {
        layer.msg('上传成功');
        imgArr.push(res.data);
    });
});
//删除上传的图片
$(".image_close").on('click',function(e){
    e.stopPropagation();
    e.preventDefault();
    $(".img-view").hide();
    $("#imgupload").attr('src','');
    imgArr=[];

})
fileup($("#cp_upload"), $("#uploadForm"));
//附件浏览
$(".browse").on("click", function () {
    //打开预览
    getUploadFileFun.call(this);
    //附件上传  参数一点击上传按钮   参数二上传formdata的id
});
//视频上传
function fileup(inp, formdata) {
    //点击上传按钮
    inp.on("click", function () {
        var fileVal=$(this).siblings("input[name='toUpload']").val();
        if (fileVal==''){
            layer.msg('请选择上传文件');
            return;
        }else {
            doUpload(formdata);
            $(this).siblings("input[name='toUpload']").val('');
            $(this).siblings(".fileupload_tips").html('').hide();
            $("input[type=reset]").trigger("click");
            $(this).siblings("input[type=file]").empty();
            uploaddata(formdata);
        }
    })
}
var strPres='';
function uploaddata(formdata){
    //操作展示上传之后的数据
    for (var i=0;i<Presentation.length;i++){
        strPres+='<li><i>'+Presentation[i].name+'</i><a>X</a></li>';
    }
    formdata.siblings(".data-display").find('ul').html(strPres).show();
    operate(formdata);
}
function operate(formdata){
    formdata.siblings(".data-display").find('a').on("click",function(e){
        e.stopPropagation();
        var f= Presentation.splice($(this).parent('li').index(),1);
        $(this).parent().remove();
        if(Presentation.length==''){
            formdata.siblings(".data-display").find('ul').hide().css('border','none');
        }
    })
    strPres='';
}
function getUploadFileFun() {
    var filelistName = '';
    var obj = $(this).siblings("input[name='toUpload']").click();
    var obj2 = $(this).siblings(".fileupload_tips")
    $(this).siblings(".fileupload_tips").show();
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
                formdata.siblings('.filetips').text('').hide().empty();
                Presentation.push(resData.data);

            } else {
                layer.msg('附件文件上传失败，请重试！')
            }
        },
        error: function (returndata) {
            console.log(returndata);
        }
    })
}
/*数据提交*/
$("#personn_submit").on("click",function(){
    if($("#modalUserName").val()==''){
        layer.msg('请添写题目');
        return
    }
    var pid=0;
    if($("#operation-infosel-modal p").text()=='热点新闻'){
        pid=0;
    }else if($("#operation-infosel-modal p").text()=='培训公告'){
        pid=1
    }else if($("#operation-infosel-modal p").text()=='轮播图'){
        pid=2;
    }else {
        pid='';
    }
    if(imgArr.length==0&&(pid==0||pid==2)){
        layer.msg('请上传图片');
        return;
    }
	var messageData={
        id:$("#id").text()||'',
		title:$("#modalUserName").val(),
        pid:pid,
        content: CKEDITOR.instances.editor01.getData(),
        publishStatus:parseInt($("input[name='course_elaborate']"&&"input[value='1']").prop("checked", true).val()),//发布状态
		attachments: JSON.stringify(Presentation),//附件
        coverImgUrl:JSON.stringify(imgArr),//上传的图片
        linkUrl:$("#links").val(),
        linkStatus: linkStatus,
        type:0
	}
    if(linkStatus==0){
        messageData.content='';
    }else if(linkStatus==1){
        messageData.linkUrl='';
    }
	$.ajax({
		type:"post",
		url:dataUrl,
		data: messageData,
		dataType: "json",
		success:function(data){
			if (data.code==1) {
                $("#question_search_btn").on('click');
                $(".questionCont").show();
                $("#message_modal").hide();
                $("#id").text('');
                layer.msg('内容提交成功！');
			}
		}

	});
    $("#personn_reset").trigger('click');
});
$("#personn_reset").on('click', function () {
    $(".questionCont").show();
    $("#message_modal").hide();
    searchBtn();
    $("#modalUserName").val('');
    $("#operation-infosel-modal p").text('热点新闻');
    $("input[name='course_elaborate']"&&"input[value='0']").prop("checked", true);
    $("#operation-infosel-modal p i").addClass("current");
    Presentation=[];
    CKEDITOR.instances.editor01.setData('');
    $(".fileupload_tips").text('');
    $(".data-display ul").empty();
    $("#links").text('');
    $("#imgupload").attr('src','').hide();
    $(".img-view").hide();
    $("#content_editor").show();
    $("#outLink").hide();
    $("#attachments").show();
    linkStatus=1;
})



