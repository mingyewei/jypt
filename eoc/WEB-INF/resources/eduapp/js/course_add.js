

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
function getZtree(){
    var treeHref=window.location.href;
    var treeIdNumber=treeHref.split("=")[1];
    /*treeIdNumbner 的值为0 默认显示的是根节点*/

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
	$.getJSON(basecontextPath+"/cp/subjectTree.do", function(data) {
		console.log(data);
		if (data.code == 1) {
			var newTreeNode = [];
			for (var i = 0; i < data.data.length; i++) {
				var treeNodeData = {};
				if (data.data[i].superId == "0") {
					treeNodeData.open = true;
				}
				for (var key in data.data[i]) {
					treeNodeData[key] = data.data[i][key];
				}
				newTreeNode[i] = treeNodeData;
			}
				for (var f = 0; f < newTreeNode.length; f++) {
					if (newTreeNode[f].id == treeIdNumber) {
						$("#modalOrgName").val(newTreeNode[f].name);
						newTreeNode[f].checked = true;
						newTreeNode[f].open = true;
					}
				}
			console.log(newTreeNode);
			$.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
		}
	});
}
getZtree();
//考试对象确定按钮事件
$("#treeSubmit").on("click", function() {
	$("#modalOrgName").val( modalUserName().name);
	$(".zTreeDemoBackground").css("display", "none");
	$("#subjectId").val(modalUserName().id);
	console.log(modalUserName())
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
//文档资料附件上传
$("#fileupload4").on("click",function(){
    $("#attachments4").click();
    getUploadFile("#attachments4","#filetips4")
});

//上传图片=========这个模块不要了
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

//保存按钮事件
$("#personn_submit").on("click", function() {
	var oEditor = CKEDITOR.instances.editor01.getData();
	$("#content").val(oEditor);
	$("#subjectId").val(modalUserName().id);
	var crTypeName= $("input[name='crTypeId']:checked").next("a").html(); //课程类别
	$("#crTypeName").val(crTypeName);
	$("#formId").ajaxSubmit({
		success : showResponse
		//提交后的回调函数
	});

});
//上传文件
function doUpload() {
    var formData = new FormData($( "#uploadForm" )[0]);
    $.ajax({
        url: 'http://localhost:7090/eoc/' ,
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        success: function (returndata) {
            console.log(returndata);
        },
        error: function (returndata) {
            console.log(returndata);
        }
    });
}
function showResponse(data) {
	debugger;
	if (data.code ==1) {
		window.location.href = contextPath+"/course/toList.action";
	} else {
		alert("未保存成功！");
	}
}
//取消
$("#personn_reset").on("click", function() {
	window.location.href = contextPath+"/course/toList.action";
});

$(".downs").on("click", function() {
	if ($(".zTreeDemoBackground").css("display") == "none") {
		$(".zTreeDemoBackground").css("display", "block")
	} else {
		$(".zTreeDemoBackground").css("display", "none")
	}
});




//选择视频上传、
$(function () {
	$("#course_manger_menu").addClass('leftmenu-title-down');

	var videoHtml = '<div class="managepage_group">' +
		'<label>上传视频：</label>' +
		'<input type="file" name="videoFile" id="videoFile" value=""/>' +
		'<span class="fileupload" id="videofileupload">浏览</span>' +
		'<a class="filetips" id="videofiletips"></a>' +
		'</div>';

	$("input[name='crTypeId']").on("click", function () {
		var checkFlag = $(this).prop("checked");
		if (checkFlag) {
			var value = $(this).val();
			if (value == 1) {
				$("#video_div").html(videoHtml);
                $("#mode-switch-data-content").hide();
                $("#mode-switch-doc-content").hide();
                $("#video-show-introduction").show();
				$("#img_file").hide();
				//上传视频
				$("#videofileupload").on("click", function () {
					$("#videoFile").click();
					getUploadFileFun("#videoFile", "#videofiletips")
				});
				function getUploadFileFun(obj, obj2) {
					$(obj).on("change", function () {
						var fileList = this.files[0];
						if (fileList == undefined) {
							$(obj2).text("");
						} else {
							$(obj2).text(fileList.name);
						}
					});
				}
			} else {
				$("#video_div").empty();
                $("#video-show-introduction").hide();
                $("#mode-switch-doc-content").hide();
                $("#mode-switch-data-content").show();
            }
		}
	});
    $("#mode_switch_doc_modal").on("click",function(){
        $("#mode-switch-data-content").show()
        $("#mode-switch-doc-content").hide()
    })
    $("#mode_switch_data_modal").on("click",function(){
        $("#mode-switch-data-content").hide()
        $("#mode-switch-doc-content").show()
    })


});

