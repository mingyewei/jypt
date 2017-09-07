/*弹窗框下拉列表*/
$("#operation-infosel-modal p").bind("click", function() {
	var ul = $("#operation-infosel-modal ul");
	$("#operation-infosel-modal p i").addClass("current");
	if (ul.css("display") == "none") {
		ul.slideDown("fast");
	} else {
		ul.slideUp("fast");
	};
});
$("#operation-infosel-modal ul li a").on("click", function() {
	var txt = $(this).text();
	$("#operation-infosel-modal p").html(txt + "<i></i>");
	$("#operation-infosel-modal ul").hide();
	$(".option").empty();
	flage = 0 /*序号归0*/
});
/* end 下拉列表*/
var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {}; /*查询的条件 （对象）*/
questTable.checkBoxAll("table-dataallcheck");
/*编辑返回的选中树的数据*/
var selectedUsers=null;
/*搜索查询事件*/
$("#question_search_btn").on("click", function() {
		/*题目*/
		var topicVal = $.trim($("#topic").val()); /*$.trim去除收尾空格*/
		var subjectType = $("#operation-infosel p").text(); /*查询类型*/
		if(subjectType=="未发布"){
			subjectType=0;
		}else if (subjectType=="已发布"){
			subjectType=1;
		}else{
			subjectType="";
		}
		searchTrime.title = topicVal;
		searchTrime.publishStatus = subjectType;
		$.ajax({
			type:"post",
			url:contextPath+"/notice/listByPage",
			data:searchTrime,
			dataType:"json",
			success:function(data){
				if (data.code==1) {
					laypage({
					cont:'question_page',
					pages:Math.ceil(data.data.total/data.data.pageSize),/*总页数*/
					curr:data.data.currentPage||1,/*当前页*/
					jump:pageCallback
					})
				}
				}
			})
		});
function pageCallback(obj,first){
    var  currentPage= obj.curr;
    var dataPageSize=10;
    searchTrime.currentPage=currentPage;
    searchTrime.pageSize=dataPageSize;
    $.ajax({
        type:"post",
        url:contextPath+"/notice/listByPage",
        data:searchTrime,
        dataType:"json",
        success:function(data){
            sccFunction(data);
            $("#table-dataallcheck").removeClass("check-current");
            $("#table-dataallcheck").attr("data-check","");
        }
    });
}
function sccFunction(data) {
	$("tbody").empty();
	/*表格展示数据的List*/
	var sun_page=data.data.total;
	$("#sum_page span").text(sun_page);
	var dataList = data.data.data?data.data.data:[];
	for(var i=0;i<dataList.length;i++){
		if(dataList[i].publishStatus==1){
			dataList[i].publishStatus="已发布";
		}else{
			dataList[i].publishStatus="未发布";
		}
	}
	/*显示数据的ID*/
	var tableList = ["title", "publishStatus", "createTime","publishTime"];
	/*隐藏数据的ID*/
	var tableListNone = ["id"];
	/*添加数据*/
	var operation=["table-edit"]
	var title=["编辑"]
	questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone,operation,title);
	/*全选*/
    tableFn()
}

/*多个删除*/
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    var ids = {};
    if (idArray.length <= 0) {
        layer.msg('请选择删除的列表！');
        return;
    }
    for (var i = 0; i < idArray.length; i++) {
        ids[i] = idArray[i];
    }
    layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/notice/deleteMulti",
                data: {ids: ids},
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        $("#question_search_btn").click();
                        layer.msg('已删除', {
                            icon: 1,
                            time: 600
                        });
                    }
                }
            });

        }, function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
    )
});
/*删除单个题目List*/
var flage = 0;
var numb = ["E", "A", "B", "C", "D", "E", "F", "G"]; /*题目列表序号*/
function del(obj) {
	var sinli = $(obj).parents("ul").siblings();
	$(obj).parents("ul").remove();
	$(sinli).each(function(index) {
		$(this).attr("id", numb[index + 1]);
		$(this).find("p").html(numb[index + 1])
	})
	flage--
}
/*弹窗窗口*/
/*弹窗方法*/
$(document).ready(function(){
	$("#org_notice_menu").addClass('leftmenu-title-down');
	document.getElementById("question_search_btn").click();
});
$("#question_add").on('click',function(){
    $(".questionCont").hide()
    $("#message_modal").show()
    tree();
})
$(".downs").on("click", function() {
    $(".zTreeDemoBackground").toggle("display");
});
function treeData(data,UserIds) {
    $("#treeData").attr("data-id");
    var orgId=$("#modalOrgName").attr("data-id");
    var setting = {
        view: {
            selectedMulti: false
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {
                "Y": "ps",
                "N": "ps"
            }
        },
        data: {
            simpleData: {
                enable: true,
                pIdKey: "superId"
            }
        }
    };
    if (data.code == 1) {
        var newTreeNode = [];
        for (var i = 0; i < data.data.orgs.length; i++) {//第一层循环给树插件添加组织结构节点
            var treeNodeData = {};
            if (data.data.orgs[i].superId == "0") {//使最根节点打开
                treeNodeData.open = true;
            }
            for (var key in data.data.orgs[i]) {
                treeNodeData[key] = data.data.orgs[i][key];
            }
            newTreeNode[i] = treeNodeData;
        }
        for (var j = data.data.orgs.length; j < data.data.users.length + data.data.orgs.length; j++) {//第二层循环给树插件添加最子节点人员信息
            var treeNodeData = {};
            for (var key in data.data.users[j - data.data.orgs.length]) {
                if (key == "id") {
                    treeNodeData[key] = data.data.users[j - data.data.orgs.length][key] + "users";//给id添加users
                } else if (key == "orgId") {//将返回最子节点的父节点orgId参数名转成通用的superId
                    treeNodeData.superId = data.data.users[j - data.data.orgs.length][key];
                } else if (key == "username") {//将返回最子节点的username参数名转成通用的name
                    treeNodeData.name = data.data.users[j - data.data.orgs.length][key];
                } else {//其余参数保持原属性不变
                    treeNodeData[key] = data.data.users[j - data.data.orgs.length][key];
                }
            }
            newTreeNode[j] = treeNodeData;
        }
        if (UserIds) {
            for (var f = 0; f<newTreeNode.length; f++) {
                if (typeof(newTreeNode[f].id)=="string") {
                    for (var h = 0; h < UserIds.length; h++) {
                        if (newTreeNode[f].id.replace(/users/, "")==UserIds[h]) {
                            newTreeNode[f].checked=true;
                            newTreeNode[f].open=true;
                        }
                    }

                }
            }
        }
        $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
    }
}
$("#treeSubmit").on("click", function() {
    selectedUsers=null;
    selectedUsers =getCheckNode();
    if (getCheckNode().length==0){
        layer.msg("请先选择一个人员");
    }else {
        $("#modalOrgName").val("已选择" + getCheckNode().length + "人");
    }
    $(".zTreeDemoBackground").css("display", "none");
});
/*返回选中中的数据*/
function getCheckNode() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var selectNode = [];
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].isParent == false&&typeof(nodes[i].id)=="string") {
                var selectList = {}
                selectList.id = (nodes[i].id).replace(/users/, "");
                selectList.name = (nodes[i].name);
                selectNode.push(selectList);
            } else {

            }
        }
    }
    return selectNode;
};
function tree(){
    $.ajax({
        type: "post",
        url:basecontextPath + "/uuc/orgTreeWithSlaves",
        dataType: "json",
        success: function(data) {
            var UserIds=selectedUsers;
            treeData(data,UserIds);
        }
    });
}
$("#addContent").on("click","#fileupload1",function(){
    $("#attachments1").click();
    getUploadFile("#attachments1","#filetips1")
});
function getUploadFile(obj,obj2){
    $(obj).on("change",function(){
        var fileList = this.files[0];
        if (fileList==undefined){
            $(obj2).text("");
            return false;
        }else {
            $(obj2).text(fileList.name);
        }
    });
}
//fileup($("#img_upload"), $("#imgloadForm"));
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
var  Presentation=[];
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
    console.log(formdata[0]);
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
$("#personn_submit").on('click',function(){
    //通知题目
    if ($("#modalUserName").val() == '') {
        layer.msg('请输入通知题目');
        return
    }
    var dataSub={};
    dataSub.title=$("#modalUserName").val();
    //通知对象
    if (getCheckNode().length==0){
        layer.msg('请选择接收对象');
        return;
    }
    var getcheckArr=[];
    for(var i=0;i< getCheckNode().length;i++){
        var user={};
        if (typeof( getCheckNode()[i].id)=="string"? getCheckNode()[i].id.replace(/users/,""): getCheckNode()[i].id) {
            user.id=getCheckNode()[i].id;
            getcheckArr.push( user);
        }else {
            user.id=getCheckNode()[i].id;
            getcheckArr.push( user);
        }
    };
    dataSub.targetUsers=getcheckArr;
    //上传附件
    if(Presentation.length==0){
        layer.msg('请上传附件');
        return;
    }
    dataSub.attachments=Presentation;
    //发布状态
    if($("input[name='course_elaborate']:checked").val()==1){
    dataSub.publishStatus=1;
    }else {
    dataSub.publishStatus=0;
    }
    //发布内容
    dataSub.content=CKEDITOR.instances.editor01.getData();//content内容
    //判断是编辑还是新镇
    var url
    if($("#notify").val()==''){
         url=contextPath + "/notice/add";
    }else{
        url=contextPath + "/notice/update";
        dataSub.id=$("#notify").val();
    }
    submit(dataSub,url)
});
function submit(data,url) {
    $.ajax({
        type: "post",
        url: url,
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(data),
        success: function (msg) {
            if (msg.code == 1) {
                layer.msg('请求成功');
                $("#question_search_btn").click();
                $(".questionCont").show();
                $("#message_modal").hide();
                $("#personn_reset").click();
            }
        }
    });
}
function tableFn(){
    /*表格编辑*/
    $(".table-edit").on("click",function(e){
        e.stopPropagation();
        var self=this;
        var getId =singleId(self, "id");
        $.ajax({
            type:"post",
            url:contextPath+"/notice/detail",
            data:{
                id:getId
            },
            dataType:"json",
            success:function(data){
                if (data.code==1) {
                    $("#notify").val(data.data.id);
                    $(".questionCont").hide();
                    $("#message_modal").show();
                    selectedUsers=JSON.parse(data.data.targetUserIds)|| '';//获取所有通知人员的id
                    $("#modalOrgName").val("已选择" + selectedUsers.length + "人")//考试对象的人数.
                    tree();//回显在树上.
                    CKEDITOR.instances.editor01.setData(data.data.content);//content内容
                    if(data.data.publishStatus==0){
                        $("input[name='course_elaborate']"&&"input[value='0']").prop('checked',true)
                    }else{
                        $("input[name='course_elaborate']"&&"input[value='1']").prop('checked',true)
                    }//发布状态
                    Presentation=[];
                    Presentation=Presentation.concat(data.data.attachments);
                    uploaddata($("#uploadForm"));
                    $("#modalUserName").val(data.data.title);
                }
            }
        })
    });
}
$("#personn_reset").on('click',function(){
    $(".questionCont").show();
    $("#message_modal").hide();
    $("#notify").val('');
    $("#modalOrgName").val("")//考试对象的人数.
    CKEDITOR.instances.editor01.setData('');//content内容
    $("input[name='course_elaborate']"&&"input[value='1']").prop('checked',true)
    Presentation=[];
    uploaddata($("#uploadForm"));
    $("#modalUserName").val('');
})