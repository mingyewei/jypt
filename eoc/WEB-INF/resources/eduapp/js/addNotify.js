/*弹窗方法*/
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
			$.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
		}
	});


	/*树下拉*/
	$(".down").on("click", function() {
		if ($(".zTreeDemoBackground").css("display") == "none") {
			$(".zTreeDemoBackground").css("display", "block")
		} else {
			$(".zTreeDemoBackground").css("display", "none")
		}
	});
	/**
	 * 富文本编译器
	 */
	var um = UM.getEditor("myEditor");
	/*数据提交*/
});

$("#personn_submit").on("click",function(){

	var messageId=$("#noticeId").val();
	var personne_OrgNames = [];
	var orgNames = [];
	if (getCheckNode().length==0){
		alert("请先选择一个人员");
	}else {
		for (var i=0; i<getCheckNode().length; i++){
			personne_OrgNames.push(getCheckNode()[i].id);
		}
		personne_OrgNames = personne_OrgNames.join();
		for (var i=0; i<getCheckNode().length; i++){
			orgNames.push(getCheckNode()[i].name);
		}
		orgNames = orgNames.join();
	}
	//cs修改
	//给id隐藏域input框赋值
	//给name隐藏域input框赋值
	$("#orgId").val(personne_OrgNames);
	$("#modalOrgName").val(orgNames);

	var oEditor = CKEDITOR.instances.editor01.getData();
	//cs修改
	//上面注释了获取发布状态的input radio的值，下面是取值方法，具体传给什么名字你来定
	var statusBack=$("input[name='course_elaborate']:checked").val();
	//alert(typeback);
	$("#statusBack").val(statusBack);
	//alert(oEditor);
	$("#subForm").submit();
});
$(".downs").on("click", function() {
	if ($(".zTreeDemoBackground").css("display") == "none") {
		$(".zTreeDemoBackground").css("display", "block");
		$.ajax({
			type: "post",
			url:basecontextPath+"/NotifyController/showOrg.do",
			dataType: "json",
			success: function(data) {
				/*设置数据名称*/
				treeData(data)
				/*加载树插件数据*/
			}
		});

	} else {
		$(".zTreeDemoBackground").css("display", "none")
	}
});
function treeData(data){
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
		$.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
	}
	$("#treeSubmit").on("click", function() {
		getCheckNode()
		if (getCheckNode().length==0){
			alert("请先选择一个人员");
		}else {
			$("#modalOrgName").val("已选择" + getCheckNode().length + "人");
		}
		$(".zTreeDemoBackground").css("display", "none");
	});

	var modalUserName =function  (){
		var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		var nodes = treeObj.getCheckedNodes();
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
}

/*返回选中中的数据*/
function getCheckNode() {
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	//console.log(treeObj)
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
	} else {

	}
	console.log(selectNode);
	return selectNode;
}
$("#addContent").on("click","#fileupload1",function(){
	$("#attachments1").click();
	getUploadFile("#attachments1","#filetips1")
});
$("#addContent").on("click","#fileupload2",function(){
	$("#attachments2").click();
	getUploadFile("#attachments2","#filetips2");
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
$(document).ready(function(){

	$("#org_notice_menu").addClass('leftmenu-title-down');
	$("#personn_reset").on("click",function(){
		window.location.href=basecontextPath+"/NotifyController/notifyList";
	});

});