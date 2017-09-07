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
/*清空数据*/
//function empitData() {
//	UM.getEditor('myEditor').setContent('');
//	$("input").each(function(){
//		$(this).val("");
//	})
//};
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
/**
 * 富文本编译器
 */
var um = UM.getEditor("myEditor");
/*数据提交*/
//$("#personn_submit").on("click",function(){
//	 console.log(modalUserName());
//	var messageId=$("#id").text();
//	var fileData=[]
//	$("input[type='file']").each(function(){
//		fileData.push($(this).val())
//	})
//	var a =modalUserName()
//	var messageData={
//		title:$("#modalUserName").val(),
//		targetUserIds:a,
//		content:UM.getEditor('myEditor').getContent(),
//		status: $("input[name='course_elaborate']:checked").val(),//发布状态
//		attachments: fileData//附件
//	}
//	console.log(messageData)
//	if(modalUserName().length==0){
//		layer.msg('请您选择接收对象！');
//		return;
//	}
//	var dataurl;
//	if (messageId == null) {
//		dataUrl = ""; /*新增的数据ID地址*/
//	} else {
//		dataUrl = ""; /*修改的数据ID地址*/
//	};
//	$.ajax({
//		type:"post",
//		url:dataUrl,
//		data: messageData,
//		dataType: "json",
//		success:function(data){
//			if (data.code==1) {
//				layer.msg('通知提交成功！');
//				empitData();
//			}
//		}
//
//	});
//})
	
});

$("#personn_submit").on("click",function(){
	var date=$("#subForm").submit();
	//alert(date);
	var messageId=$("#id").text();
	//var fileData=[];
	//$("input[type='file']").each(function(){
	//	fileData.push($(this).val());
	//});
	//var a =modalUserName()
	var messageData={
		title:$("#modalUserName").val(),
		content:$("#say").val(),
		status: $("input[name='course_elaborate']:checked").val(),//发布状态
	}
	//console.log(messageData);
	//if(modalUserName().length==0){
	//	layer.msg('请您选择接收对象！');
	//	return;
	//}
	var dataurl;
	if (messageId =="") {
		dataUrl = contextPath+"/HomeManager/addHomeResource"; /*新增的数据ID地址*/
	} else {
		dataUrl = ""; /*修改的数据ID地址*/
	};
	$.ajax({
		type:"post",
		url:dataUrl,
		data: messageData,
		dataType: "json",
		success:function(data){
			if (data.code==1) {
				$("#subForm").submit(function(e){
					return false;
				});
				layer.msg('通知提交成功！');
				//empitData();
			}
		}

	});
});


/*编辑*/
/*人员编辑*/

//function tableEditFn() {
//	$(".table-edit").on("click",editor)
//	function editFn() {
//		var self = this;
//		var getId =singleId(self, "id"); /*编辑某一个返回的这行的标识ID*/
//		$.ajax({
//			type: "post",
//			url: "url",
//			data: {
//				id: getId
//			},
//			dataType: "json",
//			success: function(data) {
//				if (data.code == 1) {
//					modal("编辑通知")
//					$("#id").text(data.data.data.id);
//					$("#modalUserName").val(data.data.title)
//					if (data.data.genderShow == 1) {
//					$('input:radio:last').attr('checked', 'true');
//
//					} else {
//					$('input:radio:first').attr('checked', 'true');
//					}
//					$("input[type='file']").each(function(){
//					})
//				}
//			}
//		})
//	};
//};
//tableEditFn();
