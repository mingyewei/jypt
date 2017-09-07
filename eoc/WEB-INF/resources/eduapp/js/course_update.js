//课程页添加编辑
//树插件基础配置参数
var setting = {
	view: {
		selectedMulti: false
	},
	check: {
		enable: true,
		chkStyle: "radio",
		chkboxType: {
			"Y": "ps",
			"N": "ps"
		},
		radioType:"all"
	},
	data: {
		simpleData: {
			enable: true,
			pIdKey: "superId"
		}
	}
};

var modalUserName =function (){
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getCheckedNodes(true);
	var selectNode ={};
	debugger;
	if (nodes.length > 0) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].checked == true) {
				selectNode.id= nodes[i].id;
				selectNode.name=nodes[i].name;
			}
		}
	}
	return selectNode;
}
//考试对象弹出层

function getZtree(getId){
	$.ajax({
		type: "post",
		url:basecontextPath+"/cp/bindedTree",
		data: {
			id: getId
		},
		dataType: "json",
		success: function (data) {
			//console.log(data)
			if (data.code == 1) {
				var newTreeNode = [];
				for (var i = 0; i < data.data.subjectTree.length; i++) {
					var treeNodeData = {};
					if (data.data.subjectTree.superId == "0") {
						treeNodeData.open = true;
					}
					for (var key in data.data.subjectTree[i]) {
						treeNodeData[key] = data.data.subjectTree[i][key];
					}
					newTreeNode[i] = treeNodeData;
				}
				if (data.data.selectedSubjectId) {
					for (var f = 0; f<newTreeNode.length; f++) {
							if (newTreeNode[f].id==data.data.selectedSubjectId) {
								$("#modalOrgName").val(newTreeNode[f].name)
								newTreeNode[f].checked=true;
								newTreeNode[f].open=true;
						}
					}
				}

				//console.log(newTreeNode);
				$.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
			}
		}
	})
};
//回显数据
function init(){
var getId=$("#id").val();
	//console.log(getId)
	getZtree(getId)

}
init();

//考试对象确定按钮事件
$("#treeSubmit").on("click", function() {
	$("#modalOrgName").val(modalUserName().name);
	$("#subjectId").val(modalUserName().id);
	$(".zTreeDemoBackground").css("display", "none")
});

//附件
$("#fileupload1").on("click",function(){
	$("#attachments1").click();
	getUploadFile("#attachments1","#filetips1")
});
$("#fileupload2").on("click",function(){
	$("#attachments2").click();
	getUploadFile("#attachments2","#filetips2")
});
$("#fileupload3").on("click",function(){
	$("#attachments3").click();
	getUploadFile("#attachments3","#filetips3")
});


////上传图片
//$("#imgfileupload").on("click",function(){
//	$("#imgFile").click();
//	getUploadFile("#imgFile","#imgfiletips")
//});

function getUploadFile(obj,obj2){
	$(obj).on("change",function(){
		var fileList = this.files[0];
		if (fileList==undefined){
			$(obj2).text("");
		}else {
			$(obj2).text(fileList.name);
		}
	});
}
//附件删除
$("#filetips1").on("click","#delFile1",function(){
	var fileId1=$("#fileId1").val();
	$.ajax({
		type: "post",
		url:basecontextPath+"/course/delCourseFile.do",
		data:{id:fileId1},
		dataType: "json",
		success: function(data) {
			console.log(data);
			/*location.reload();*/
			$("#filetips1").html("");
		}
	});
});

$("#filetips2").on("click","#delFile1",function(){
	var fileId2=$("#fileId2").val();
	$.ajax({
		type: "post",
		url:basecontextPath+"/course/delCourseFile.do",
		data:{id:fileId2},
		dataType: "json",
		success: function(data) {
			console.log(data);
			/*location.reload();*/
			$("#filetips1").html("");
		}
	});
});

$("#filetips3").on("click","#delFile1",function(){
	var fileId3=$("#fileId3").val();
	$.ajax({
		type: "post",
		url:basecontextPath+"/course/delCourseFile.do",
		data:{id:fileId3},
		dataType: "json",
		success: function(data) {
			console.log(data);
			/*location.reload();*/
			$("#filetips1").html("");
		}
	});
});
//endDelfile
//保存按钮事件
$("#personn_submit").on("click", function() {

	var oEditor = CKEDITOR.instances.editor01.getData();
	$("#content").val(oEditor);
	$("#subjectId").val(modalUserName().id);
	/*var crTypeName= $("input[name='crTypeId']:checked").next("a").html(); //课程类别
	$("#crTypeName").val(crTypeName);*/
	$("#formId").ajaxSubmit({
		success : showResponse
		//提交后的回调函数
	});

});

function showResponse(data) {
	debugger;
	if (data.code ==1) {
		//var parent = window.opener;
		//parent.location.reload();
		//window.close();
		window.location.href = contextPath+"/course/toList.action";
	} else {
		alert("未保存成功！");
	}
}


//取消
$("#personn_reset").on("click", function() {
	//resetData();//清空添加框
	//layerColse(index);

	//CKEDITOR.instances.editor01.setData('');
	//$("#formId")[0].reset();

	window.location.href = contextPath+"/course/toList.action";

});

$(".downs").on("click", function() {
	if ($(".zTreeDemoBackground").css("display") == "none") {
		$(".zTreeDemoBackground").css("display", "block")
	} else {
		$(".zTreeDemoBackground").css("display", "none")
	}
});

//清空弹出框数据
function resetData(){
	$("#course_id").html('');
	$("#course_modal input[type='text']").val("");
	$("#course_modal input[type='radio']").eq(0).prop("checked",true);
	//UM.getEditor('myEditor').setContent('');
	$("#course_modal textarea").val("");
	$("#course_modal input[type='file']").val("");
	$("#filetips1").text("");
	$("#filetips2").text("");
	$("#filetips3").text("");
}


//资料库管理编辑数据
    function getEditCourse(editId){
        $.ajax({
            type: "get",
            url:basecontextPath+"/cp/bindedTree",
            data: {
                id: editId
            },
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data.code == 1) {
                    if(data.type=="文档资料"){
                        if(data.content==='文档打开模式'){

                        }else if(data.content==='内容编辑模式'){

                        }
                    }else if(data.type=="视频课程"){

                    }
                }else if(data.code==2){

                }
            }
        })
    }
        //展示数据模板
	//<div class="mode-switch" id="mode_switch_update">
	//	<div class="mode-switch-tab" id="mode_switch_tab">
	//	<span id="mode_switch_update_doc">文档打开模式</span>
	//	<span class="mode-switch-tab-wen" id="mode_switch_update_content">内容编辑模式</span>
	//	</div>
	//	<div>
	//	<label style="vertical-align: top;">课程简介：</label>
	//<textarea id="digest" name="digest" class="input-focus"
	//placeholder="">${course.crCourseResource.digest}</textarea>
	//	<div class="managepage_group1 dis-none" id="managepage_group1_content">
	//	<label style="vertical-align: top;">内容：</label>
	//<textarea id="editor01" class="input-focus" placeholder=""
	//name="editor01"
	//style="width: 475px;height: 100px;">${course.crCourseResource.content}</textarea>
	//	<input type="hidden" name="content" id="content" value="">
	//	<script type="text/javascript">
	//	CKEDITOR.replace('editor01', {width: '852px', height: '400px'});
	//</script>
	//</div>
	//<div class="managepage_group">
	//	<label>附件上传：</label>
	//<input value="" id="fileId1" style="display: none"/>
	//	<input type="file" name="myfiles" id="attachments1" value=""/>
	//	<span class="fileupload" id="fileupload1">浏览</span>
	//	<a class="filetips"
	//id="filetips1">${course.crCourseResourceAttachments[0].fileName}</a>
	//	<%--<span class="fileupload" id="delFile1">删除此附件</span>--%>
	//	</div>
	//	</div>
	//	</div>
	//	<div class="dis-none video-course-intro" id="video_course_intro">
	//	<label style="vertical-align: top;">课程简介：</label>
	//<textarea name="digest" class="input-focus"
	//placeholder="">${course.crCourseResource.digest}</textarea>
	//	</div>


$("#mode_switch_update_doc").on("click",function(){
    $("#managepage_group1_content").hide();
    $("#mode_switch_update_content").addClass("mode-switch-tab-wen");
    $("#mode_switch_update_doc").removeClass("mode-switch-tab-wen")
})
$("#mode_switch_update_content").on("click",function(){
    $("#managepage_group1_content").show();
    $("#mode_switch_update_content").removeClass("mode-switch-tab-wen");
    $("#mode_switch_update_doc").addClass("mode-switch-tab-wen");
})
$("input[id='File_manager']").on("focus", function() {
    $(this).prop("checked", true);
    $("#mode_switch_update").show();
    $("#video_course_intro").hide();
    });

$("input[id='video_course']").on("focus", function() {
    $(this).prop("checked", true);
    $("#mode_switch_update").hide();
    $("#video_course_intro").show();

});



//获取跳转页面id
get_search();
function  get_search(){
    var editId=window.location.search
    editId = ((editId.split('?'))[1].split('='))[1];
    //console.log(editId);
    getEditCourse(editId)

}
