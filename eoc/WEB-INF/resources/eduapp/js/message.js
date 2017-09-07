/*弹窗方法*/
$("#operation-infosel-modal p").bind("click", function() {
	var ul = $("#operation-infosel-modal ul");
	$("#operation-infosel-modal p i").addClass("current");
	if (ul.css("display") == "none") {
		ul.slideDown("fast");
	} else {
		ul.slideUp("fast");
	};
});
//$("#operation-infosel-modal ul li a").on("click", function() {
//	var txt = $(this).text();
//	$("#operation-infosel-modal p").html(txt + "<i></i>");
//	$("#operation-infosel-modal ul").hide();
//	createHtml(txt);
//});
function modal(title) {
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: [title, "font-size:18px"],
		area: ['650px', '600px'],
		shadeClose: false,
		content: $('#message_modal'),
		cancel: empitData
	});
}
$("#question_add").on("click", function() {
	modal("添加通知");
	/*树插件*/
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



	var modalUserName =function  (){
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = treeObj.getCheckedNodes(true);
		var selectNode = selectNodeName = [];
		if (nodes.length > 0) {
			for (var i = 0; i < nodes.length; i++) {
				if (nodes[i].isParent == false) {
					var nodesId = nodes[i].id.replace(/users/, "");
					selectNode.push(nodesId);
				}
			}
		}
		return selectNode;
	}

	$.getJSON("ajaxdata/orguser.txt", function(data) {
		if (data.code == 1) {
			var newTreeNode = [];
			for (var i = 0; i < data.data.orgs.length; i++) {
				var treeNodeData = {};
				if (data.data.orgs[i].superId == "0") {
					treeNodeData.open = true;
				}
				for (var key in data.data.orgs[i]) {
					treeNodeData[key] = data.data.orgs[i][key];
				}
				newTreeNode[i] = treeNodeData;
			}
			for (var j = data.data.orgs.length; j < data.data.users.length + data.data.orgs.length; j++) {
				var treeNodeData = {};
				for (var key in data.data.users[j - data.data.orgs.length]) {
					if (key == "id") {
						treeNodeData[key] = data.data.users[j - data.data.orgs.length][key] + "users";
					} else if (key == "orgId") {
						treeNodeData.superId = data.data.users[j - data.data.orgs.length][key];
					} else if (key == "username") {
						treeNodeData.name = data.data.users[j - data.data.orgs.length][key];
					} else {
						treeNodeData[key] = data.data.users[j - data.data.orgs.length][key];
					}
				}
				newTreeNode[j] = treeNodeData;
			}
			if (data.data.selectedUsers) {
				for (var f = 0; f<newTreeNode.length; f++) {
					if (typeof(newTreeNode[f].id)=="string") {
						for (var h = 0; h < data.data.selectedUsers.length; h++) {
							if (newTreeNode[f].id.substring(0,1)==data.data.selectedUsers[h].id) {
								newTreeNode[f].checked=true;
								newTreeNode[f].open=true;
							}
						}
					}
				}
			}

			console.log(newTreeNode);
			$.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
		}
	});
	$("#treeSubmit").on("click", function() {
		$("#modalOrgName").val("已选择" + modalUserName().length + "人");
		$(".zTreeDemoBackground").css("display", "none")
	});
	/*树下拉*/
	$(".down").on("click", function() {
		if ($(".zTreeDemoBackground").css("display") == "none") {
			$(".zTreeDemoBackground").css("display", "block")
		} else {
			$(".zTreeDemoBackground").css("display", "none")
		}
	});
});

$("#personn_submit").on("click",function(){
	//栏目ID和文件
	var externalLink= $("input[name='externalLink']:checked").val();
	$("#linkStatus").val(externalLink);
	var stauts=$("input[name='course_elaborate']:checked").val();
	$("#status_radio").val(stauts);

	$("#subForm").submit();

});
$("#operation-infosel-modal ul li a").on("click",function(){
	var txt = $(this).text();
	//cs修改，txtid
	var txtid = $(this).attr("data-id");
	$("#hiddenId").val(txtid);

	$("#operation-infosel-modal p").html(txt + "<i></i>");
	$("#operation-infosel-modal ul").hide();
	if (txt=="热点新闻"||txt=="培训公告报道"){
		$("#pic").css('display','none');
		$("#hotNew").css('display','block');
	}else if (txt=="轮播图"){
		var externalLink= $("input[name='externalLink']:checked").val();
		if(externalLink=="1"){
			$("#imgContent").css('display','none');
			$("#linkCkediter").css('display','block');
		}else{
			$("#imgContent").css('display','block');
			$("#linkCkediter").css('display','none');
		}
		$("#hotNew").css('display','none');
		$("#pic").css('display','block');
	}


});
$("input[name='externalLink']").on("click",function(){
	var externalLink= $("input[name='externalLink']:checked").val();
	$("#linkStatus").val(externalLink);
	if(externalLink=="1"){
		$("#imgContent").css('display','none');
		$("#linkCkediter").css('display','block');
	}else if(externalLink=="0"){
		$("#imgContent").css('display','block');
		$("#linkCkediter").css('display','none');
	}
});

$(".downs").on("click", function() {
	if ($(".zTreeDemoBackground").css("display") == "none") {
		$(".zTreeDemoBackground").css("display", "block");
		$.ajax({
			type: "post",
			url:basecontextPath+"/NotifyController/showOrg.do",
			//data:{userId:dlgUserId} ,
			dataType: "json",
			success: function(data) {
				console.log(data)
				/*设置数据名称*/
				treeData(data)
				/*加载树插件数据*/
			}
		});

	} else {
		$(".zTreeDemoBackground").css("display", "none")
	}
});
function treeData(data) {
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
		console.log("is starting")
		console.log(data.data)
		console.log("is end")

		for (var i = 0; i < data.data.orgs.length; i++) {
			var treeNodeData = {};
			if (data.data.orgs[i].superId == "0") {
				treeNodeData.open = true;
			}
			for (var key in data.data.orgs[i]) {
				treeNodeData[key] = data.data.orgs[i][key];
			}
			newTreeNode[i] = treeNodeData;
		}
		for (var j = data.data.orgs.length; j < data.data.users.length + data.data.orgs.length; j++) {
			var treeNodeData = {};
			for (var key in data.data.users[j - data.data.orgs.length]) {
				if (key == "id") {
					treeNodeData[key] = data.data.users[j - data.data.orgs.length][key] + "users";
				} else if (key == "orgId") {
					treeNodeData.superId = data.data.users[j - data.data.orgs.length][key];
				} else if (key == "username") {
					treeNodeData.name = data.data.users[j - data.data.orgs.length][key];
				} else {
					treeNodeData[key] = data.data.users[j - data.data.orgs.length][key];
				}
			}
			newTreeNode[j] = treeNodeData;
		}
		//if (data.data.selectedOrgs.length>0) {
		//	for (var f = 0; f<newTreeNode.length; f++) {
		//
		//		for (var h = 0; h < data.data.selectedOrgs.length; h++) {
		//			if (newTreeNode[f].id==data.data.selectedOrgs[h].id) {
		//				newTreeNode[f].checked=true;
		//				newTreeNode[f].open=true;
		//			}
		//		}
		//
		//	}
		//}

		console.log(newTreeNode);
		$.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
	}

	$(document).ready(function () {
		$("#org_home_menu").addClass('leftmenu-title-down');
	})
}

$("#operation-infosel-modal ul li a").on("click",function(){
	//var selectText = $("#operation-infosel-modal p").text();
	var txt = $(this).text();
	$("#operation-infosel-modal p").html(txt + "<i></i>");
	$("#operation-infosel-modal ul").hide();
	//var text=$("#operation-infosel-modal p").text();
	if (txt=="热点新闻"||txt=="培训公告报道"){
		//$("#notify").css('display','none');
		$("#pic").css('display','none');
		$("#hotNew").css('display','block');
	}else if (txt=="轮播图"){
		//$("#notify").css('display','none');
		$("#hotNew").css('display','none');
		$("#pic").css('display','block');
	}
});

$("#addContent").on("click","#fileupload1",function(){
	$("#attachments1").click();
	getUploadFile("#attachments1","#filetips1")
});
$("#addContent").on("click","#fileupload2",function(){
	$("#attachments2").click();
	getUploadFile("#attachments2","#filetips2");
});
$("#addContent").on("click","#fileupload3",function(){
	$("#attachments3").click();
	getUploadFile("#attachments3","#filetips3");
});
function getUploadFile(obj, obj2) {
	$(obj).on("change", function () {
		var fileList = this.files[0];
		if (fileList == undefined) {
			$(obj2).text("");
			return false;
		} else {
			$(obj2).text(fileList.name);
		}
	});
}
//图片上传
$("#pic").on("click", "#fileimgupload", function () {
	$("#fileimg").click();
	getUploadImg("#fileimg", "#imgupload");
});

$("#picImg").on("click", "#fileimgupload1", function () {
	$("#fileimg1").click();
	getUploadImg("#fileimg1", "#imgupload1");
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
		}
	})
}
$(document).ready(function(){

	$("#org_home_menu").addClass('leftmenu-title-down');

});

//取消
$("#personn_reset").on("click", function() {
	window.location.href = contextPath+"/HomeManager/homeList";

});