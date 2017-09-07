var TrainTable = new tableDataOperation();
var dynamicData = [];
var Train_id = $("#Train_id").val();
//信息组添加事件
var studentGroup = {};
var SerialNumber = [];
/*存放加载选项卡内容序列 遍历所对应的数据*/
/* initZtree();*/
//初始化ztree，这里的初始化还用的以前的方法，给最子节点的id添加users用来区分节点id相同，将被选中的最子节点回显到树插件中
function initZtree() {
	$.getJSON(contextPath + "/exam/zTreeSelectUser?id=" + $("#exam_id").val(), function (data) {
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
			/*回显选中的成员*/
			if (dynamicData.data.studentGroup[SerialNumber[0]].users!=undefined) {
				for (var f = 0; f < newTreeNode.length; f++) {
					if (typeof(newTreeNode[f].id) == "string") {
						for (var h = 0; h < dynamicData.data.studentGroup[SerialNumber[0]].users.length; h++) {
							if (newTreeNode[f].id.replace(/users/, "") == dynamicData.data.studentGroup[SerialNumber[0]].users[h].id) {//先替换树插件最子节点数据去除users之后和返回的数据比对，为被选中的节点添加checked属性
								newTreeNode[f].checked = true;
								newTreeNode[f].open = true;
							}
						}

					}
				}
			}
			$.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
		}
	});
}//初始化ztree end
if (Train_id != null && Train_id != "") {/*数据回显*/
	$.ajax({
		type: "post",
		url: contextPath + "/training/detail",
		data: {id: Train_id},
		async: false,
		dataType: "json",
		success: function (data) {
			dynamicData = data;
			console.dir(dynamicData);
			$("#title").val(dynamicData.data.name);
			$("#digest").val(dynamicData.data.digest);
			$("#imgupload").attr("src", dynamicData.data.showImg).show();
			var list = [];
			if (dynamicData.data.exams!=undefined) {
				for (var i = 0; i < dynamicData.data.exams.length; i++) {
					var a = {};
					a.name = dynamicData.data.exams[i].name
					list.push(a);
				}
				addTable(list);
				$("#examListTable").show();
				tableEditFn();
				tabledel()
			}
			$("input[name='publishStatus']").each(function () {
				if ($(this).val() == dynamicData.data.publishStatus) {
					$(this).prop("checked", true);
				}
			});
			if (dynamicData.data.hashExam == null || dynamicData.data.hashExam == undefined || dynamicData.data.hashExam == 0) {
				$("#composetest_exam_no").prop("checked", true);
			} else {
				$("#composetest_exam_ok").prop("checked", true);
				$("#composetest_examadd").show();
				$("#addTrain_del").show();
			}
			//信息组保存按钮事件
			/*信息组数据动态加载*/
			var infogroup = dynamicData.data.studentGroup;
			if (infogroup == undefined || infogroup.length == undefined || infogroup.length == 0) {
				return false
			} else {
				var str = "";
				for (var i = 0; i < infogroup.length; i++) {
					str += "<div class='info_list dis-inline' onclick='getIndex(this)'><input type='radio' name='radio'><div class='info_title'>" + infogroup[i].basicInfo.name + "</div></div>";
				}
				$("#infogroup_tab").append(str);
				$(".infogroup_tab_content").show();
				$("#infogroup_del").on("click", function () {
					$("#infogroup_tab .info_list input").each(function (index) {
						var self = $(this)
						if (self.prop("checked") == true) {
							self.parents(".info_list").remove();
							dynamicData.data.studentGroup.splice(index, 1)
							console.log(dynamicData)
						}
					})
					var a = $(".info_list").length;
					if (a <= 0) {
						$("#infogroup_del").hide();
						$("#infogroup_edit").hide();
						$(".infogroup_tab_content").hide();
					}
				})
				/*信息组编辑*/
				$("#infogroup_del").on("click", function () {
					$("#infogroup_tab .info_list input").each(function (index) {
						var self = $(this)
						if (self.prop("checked") == true) {
							self.parents(".info_list").remove();
							dynamicData.data.studentGroup.splice(index, 1)
							console.log(dynamicData)
						}
					})
					var a = $(".info_list").length;
					if (a <= 0) {
						$("#infogroup_del").hide();
						$("#infogroup_edit").hide();
						$(".infogroup_tab_content").hide();
					}
				})
				$("#infogroup_del").show();
				$("#infogroup_edit").show();
				/*组成员编辑*/
				$("#treeEdit").on("click", function () {
					$(".userInfoContList").empty();
					$(".treeUserInfo").empty();
					$(".userInfoCont").hide();
					$(".treeInfoCont").hide();
					$(".managepage_tree").show();

					/* if (exam_id != null && exam_id != "") {
					 delete dynamicData.data.studentGroup[SerialNumber[0]].users;
					 } else {
					 delete data.studentGroup[SerialNumber[0]].users;
					 }*/
					initZtree();
					/* var treeUers = modalUserName();*/
					var str = "";
					for (var i = 0; i <dynamicData.data.studentGroup[SerialNumber[0]].users.length; i++) {
						str += "<div class='userinFoList  dis-inline'> <label data-id='" +dynamicData.data.studentGroup[SerialNumber[0]].users[i].id + "'>" + dynamicData.data.studentGroup[SerialNumber[0]].users[i].name + "</label></div>"
					}
					$(".treeUserInfo").append(str);

				});
			}
		}
	});
}
/*信息组添加*/
$("#infogroup_div_save").on("click", function () {
	studentGroup={};
	var infogroup_title = $("#infogroup_title").val(); //组名称
	var infogroup_describe = $("#infogroup_describe").val(); //组描述
	var infogroup_start = $("#infogroup_start").val(); //组开始时间
	var infogroup_end = $("#infogroup_stop").val(); //组结束时间
	var infoList = {};
	var basicInfo = {};
	/*信息组信息*/
	basicInfo.name = infogroup_title;
	basicInfo.digest = infogroup_describe;
	basicInfo.startTime = infogroup_start;
	basicInfo.endTime = infogroup_end;
	infoList.basicInfo = basicInfo
	studentGroup.basicInfo = basicInfo;
	if (SerialNumber.length == 0) {/*信息组创建*/
		var str = "<div class='info_list dis-inline'  onclick='getIndex(this)'><input type='radio' name='radio'><div class='info_title'>" + basicInfo.name + "</div></div>";
		$("#infogroup_tab").append(str);
	}
	if (studentGroup.length == 0) {
		$("#infogroup_del").hide()
		$("#infogroup_edit").hide();
	} else {
		$("#infogroup_del").show();
		$("#infogroup_edit").show();
	}
	if (dynamicData.data.studentGroup == undefined) {/*么有用户组创建*/
		dynamicData.data.studentGroup = [];
		dynamicData.data.studentGroup.push(studentGroup);
	} else {/*有用户组添加*/
		if (SerialNumber.length != 0) {/*有用户组编辑*/
			delete  dynamicData.data.studentGroup[SerialNumber].basicInfo
			dynamicData.data.studentGroup[SerialNumber].basicInfo = basicInfo;
			$("#infogroup_tab").empty();
			var str=""
			for (var i=0;i< dynamicData.data.studentGroup.length; i++){
				str+="<div class='info_list dis-inline' onclick='getIndex(this)'><input type='radio' name='radio'><div class='info_title'>" + dynamicData.data.studentGroup[i].basicInfo.name + "</div></div>";
			}
			$("#infogroup_tab").append(str);
		} else {
			dynamicData.data.studentGroup.push(studentGroup);
		}
	}
	a = {};
	console.log(studentGroup)
	console.log(dynamicData.data)
	$("#infogroup_tabs_content").hide();
	layer.closeAll();
});
//$("#title").val(dynamicData.data.training.name);
/*获取信息组名称的下标 并且显示对应的数据*/
function getIndex(item) {
	SerialNumber.length = 0;
	var index = $("#infogroup_tab .info_list").index(item);
	SerialNumber.push(index);
	$("#infogroup_tabs_content").hide();
}

//树插件基础配置参数
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
//开始时间结束时间
laydate.skin('huanglv');
var infogroup_start = {
	elem: '#infogroup_start',
	format: 'YYYY-MM-DD hh:mm:ss',
	min: laydate.now(), //设定最小日期为当前日期
	max: '2099-06-16 23:59:59', //最大日期
	istime: true,
	istoday: true,
	/*  choose: function (datas) {
	 infogroup_stop.min = datas; //开始日选好后，重置结束日的最小日期
	 infogroup_stop.start = datas; //将结束日的初始值设定为开始日
	 }*/
};
var infogroup_stop = {
	elem: '#infogroup_stop',
	format: 'YYYY-MM-DD hh:mm:ss',
	min: laydate.now(), //设定最小日期为当前日期
	max: '2099-06-16 23:59:59', //最大日期
	istime: true,
	istoday: true,
	/* choose: function (datas) {
	 infogroup_start.max = datas; //结束日选好后，重置开始日的最大日期
	 }*/
};
laydate(infogroup_start);
laydate(infogroup_stop);

//手动组卷分值变化、试题选择，这里的自动组卷和手动组卷改成你现在改的那个样式吧！JS你也改掉吧！这个我还是用的我以前的我没有动这里，具体注释就不写了
var singlenum = multinum = 0;
$("#totalnum").text($('#selected_test li').length);
if ($("#selected_test li").length == 0) {
	$("#singlenum").text(singlenum);
	$("#multinum").text(multinum);
} else {
	$("#selected_test li").each(function () {
		if ($(this).attr("data-type") == "0") {
			singlenum++;
		} else {
			multinum++;
		}
		$("#singlenum").text(singlenum);
		$("#multinum").text(multinum);
	});
}
$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text() + $('#questtest').val() * $("#questnum").text());
var reg = new RegExp("^[0-9]*$");
$("#singletest").on("blur", function () {
    var index=null;
    if (!reg.test($(this).val())){
        layer.tips('请输入正确的数字！', '#singletest', {time: 0, tipsMore: false});
        index=layer.tips();
    }else {
        if (index!=null){
            layerColse(index);
        }
        $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text() + $('#questtest').val() * $("#questnum").text());
    }

});
$("#multitest").on("blur", function () {
    var index=null;
    if (!reg.test($(this).val())){
        layer.tips('请输入正确的数字！', '#multitest', {time: 0, tipsMore: true});
        index=layer.tips();
        return;
    }else {

        if (index!=null){
            layerColse(index);
        }
        $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text() + $('#questtest').val() * $("#questnum").text());
    }

});
$("#questtest").on("blur", function () {
    var index=null;
    if (!reg.test($(this).val())){
        layer.tips('请输入正确的数字！', '#questtest', {time: 0, tipsMore: true});
        index=layer.tips();
        return;
    }else {
        if (index!=null){
            layerColse(index);
        }
        $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text() + $('#questtest').val() * $("#questnum").text());
    }


});
$("#singletest").on("click",function(){
	$('#singletest').val('');
});
$("#multitest").on("click",function(){
	$('#multitest').val('');
});
$("#questtest").on("click",function(){
	$('#questtest').val('');
});
$("#unselected_test").on("click", "ul li", function () {
	var txt = $(this).text();
	var dataflag = $(this).attr("data-type");
	var itemId = $(this).attr("id");
	var flag = flagnum = 0;
	if ($("#selected_test li").length == 0) {
		var newLi = $("<li/>").html("<a>×</a>" + txt).attr({
			"data-type": dataflag,
			"id": itemId
		}).appendTo($("#selected_test ul"));
	} else {
		$("#selected_test li").each(function () {
			if ($(this).attr("id") != itemId) {
				flagnum++;
			}
		});
		if (flagnum == $("#selected_test li").length) {
			flag = 1;
			flagnum = 0;
		} else {
			flag = 0;
		}
		if (flag == 1) {
			var newLi = $("<li/>").html("<a>×</a>" + txt).attr({
				"data-type": dataflag,
				"id": itemId
			}).appendTo($("#selected_test ul"));
		}
	}
	$("#totalnum").text($('#selected_test li').length);
	singlenum = multinum = questnum = 0;
	$("#selected_test li").each(function () {
		if ($(this).attr("data-type") == "0") {
			singlenum++;
		} else if ($(this).attr("data-type") == "1") {
			multinum++;
		} else if ($(this).attr("data-type") == "3") {
			questnum++;
		}
		$("#singlenum").text(singlenum);
		$("#multinum").text(multinum);
		$("#questnum").text(questnum);
	});
	$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text() + $('#questtest').val() * $("#questnum").text());
});
//手动组卷删除已选试题
$("#selected_test").on("mouseover", "ul li", function () {
	$(this).find("a").show();
});
$("#selected_test").on("mouseleave", "ul li", function () {
	$(this).find("a").hide();
});
$("#course_selected_test").on("mouseover", "ul li", function () {
	$(this).find("a").show();
});
$("#course_selected_test").on("mouseleave", "ul li", function () {
	$(this).find("a").hide();
});
$("#selected_test").on("click", "ul li a", function () {
	$(this).parents("li").remove();
	$("#totalnum").text($('#selected_test li').length);
	singlenum = multinum = 0;
	if ($("#selected_test li").length == 0) {
		$("#singlenum").text(singlenum);
		$("#multinum").text(multinum);
	} else {
		$("#selected_test li").each(function () {
			if ($(this).attr("data-type") == "0") {
				singlenum++;
			} else {
				multinum++;
			}
			$("#singlenum").text(singlenum);
			$("#multinum").text(multinum);
		});
	}
	$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text());
});
$("#addTrain_del").on("click", function () {
	$("#addTrain_id tbody tr").each(function (index) {
		if ($(this).find("input").prop('checked')) {
			var index = $('#addTrain_id tbody tr').index(this);
			dynamicData.data.exams.splice(index, 1);
			$(this).remove();
		}
	});
	if ($("#addTrain_id tbody tr").length == 0) {
		$("#addTrain_id").hide();
	}
	console.log(dynamicData.data.exams)
})
/*下拉列表加载*/
function downList() {
	$.ajax({
		type: "post",
		url: contextPath + "/itemsubject/select",
		async: true,
		dataType: "json",
		success: function (data) {
			var str = ''
			if (data.code == 1) {
				for (var i = 0; i < data.data.length; i++) {
					str += "<li ><a href='#' data-value='" + data.data[i].id + "'>" + data.data[i].name + "</a></li>";
				}
				$("#operation-gangwei ul").append(str);
				$("#post-infosel-item ul").append(str);
			}
		}
	});
}
downList()
/*手动组件加载待选列表方法*/
function listAll(param) {
	$.ajax({
		type: "POST",
		url: contextPath + "/testItem/listAll",
		dataType: "json",
		data: param,
		success: function (data) {
			if (data != null) {
				var str = "";
				for (var i = 0; i < data.length; i++) {
					var it = data[i].itemType;
					var itStr = "";
					if (it == 0) {
						itStr = "(单)";
					} else if (it == 1) {
						itStr = "(多)";
					}
					str += "<li id='" + data[i].id + "' data-value='" + data[i].itemType + "'>" + itStr + data[i].question + "</li>";
				}
				if (str.length > 0) {
					$("#unselected_test ul").html(str);
				}
			}

		}
	});
}
//考试手动组卷查询事件
$("#operation_search_btn").on("click", function () {
	operationSearch();
});
/*查询事件*/
function operationSearch() {
	var question = $.trim($("#topic").val());
	var valStr = $("#operation-infosel p").text();
	var itemType = null;
	if (valStr == "单选") {
		itemType = 0;
	} else if (valStr == "多选") {
		itemType = 1;
	}
	var jopzInfosel = $("#operation-gangwei p").attr('data-value');
	var param = {
		"question": question,
		"itemType": itemType,
		"subjectId": jopzInfosel
	};
	/*查询条件*/
	listAll(param);
}
//考试添加事件
$("input[name='hasExam']").on("focus", function () {
	$(this).prop("checked", true);
	if ($("input[name='hasExam']:checked").val() == 0) {
		$("#composetest_examadd").hide();
		$("#addTrain_del").hide();
	} else if ($("input[name='hasExam']:checked").val() == 1) {
		$("#composetest_examadd").show();
		$("#addTrain_del").show();
	}
})
/*考试添加事件弹出框*/
var Train_id = $("#Train_id").val()
/*标示ID 用于判断数据回显*/
var exam = [];
/*考试所有信息*/
var editData = [];
var data = {};
/*页面所有信息*/
/*如果长度为0弹窗说明是添加如果不为0说明是编辑*/
/*存放手动组卷或者自动组卷 提交后的数据  也用于判断新增考试是数据编辑还是添加*/
function examAddModal() {
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: ["试卷", "font-size:18px"],
		area: ['1000px', '760px'],
		shadeClose: false,
		content: $('#infogroup_exam'),
		cancel: function () {
			clearData();
		},
		success: function () {
			operationSearch();
			console.log(editData)
			$("input[name='composetest_examtest']").prop("checked", false);
			if (editData.length == 0) {/*添加数据*/
				$("#manualcompose").hide();
				$("#autocompose").hide();
				$("#infogroup_exam_title").val("");
				$("#infogroup_exam_passCount").val("");
				$("input[name='composetest_examtest']").on("focus", function () {
					$(this).prop("checked", true);
					if ($(this).val() == 0) { /*手动组卷*/
						/*加载下拉类别  并且加载手动试卷列表*/
						operationSearch();
						/*加载待选列表数据*/
						$("#autocompose").hide();
						$("#manualcompose").show();
						/*如果为0 清空数据说明是数据添加 否则就是数据编辑*/
						$("#selected_test ul").empty();
						$("#totalnum").text(0);
						/*已选*/
						$("#singlenum").text(0);
						/*单选题数量*/
						$("#singletest").val("");
						/*单选题每题的分值*/
						$("#multinum").text(0);
						/*多选选题数量*/
						$("#multitest").val('');
						/*多选题每题的分值*/
						$("#totalscore").text(0);
						/*总分*/
					} else if ($(this).val() == 1) {/*自动组卷*/
						$("#autocompose").show();
						$("#manualcompose").hide();
					}
				})
			} else if (editData.length > 0) {
				console.log(editData)
				console.log(exam)
				var examEdit = dynamicData.data.exams[editData[0]];
				/*获取编回显的数据*/
				console.log(examEdit)
				$("#infogroup_exam_title").val();
				$("#infogroup_exam_passCount").val();
				$("#infogroup_exam_title").val(examEdit.name);
				$("#examDescribe").val(examEdit.note);
				$("#infogroup_exam_passCount").val(examEdit.passScore);
				if (examEdit.createPaperMode == 0) {/*手动组卷还是自动组卷*/
					/* 手动*/
					$("#manual_radio").prop("checked", true);
					$("#autocompose").hide();
					$("#manualcompose").show();
					if (examEdit.paperStructure.length == 2) {
						$("#totalnum").text(Number(examEdit.paperStructure[0].itemCount) + Number(examEdit.paperStructure[1].itemCount));
						$("#totalscore").text(Number(examEdit.paperStructure[0].itemCount) * Number(examEdit.paperStructure[0].scorePerItem) + Number(examEdit.paperStructure[1].itemCount) * Number(examEdit.paperStructure[1].scorePerItem));
						for (var i = 0; i < examEdit.paperStructure.length; i++) {
							if (examEdit.paperStructure[i].itemType == 0) {
								$("#singlenum").text(examEdit.paperStructure[i].itemCount);
								$("#singletest").val(examEdit.paperStructure[i].scorePerItem)
							} else if (examEdit.paperStructure[i].itemType == 1) {
								$("#multinum").text(examEdit.paperStructure[i].itemCount);
								$("#multitest").val(examEdit.paperStructure[i].scorePerItem)
							}
						}
					} else if (examEdit.paperStructure.length == 1) {
						if (examEdit.paperStructure[0].itemType == 0) {
							$("#singlenum").text(Number(examEdit.paperStructure[0].itemCount));
							$("#singletest").val(examEdit.paperStructure[0].scorePerItem)
						} else if (examEdit.paperStructure[0].itemType == 1) {
							$("#multinum").text(Number(examEdit.paperStructure[0].itemCount));
							$("#multitest").val(examEdit.paperStructure[0].scorePerItem);
						}
						$("#totalnum").text(Number(examEdit.paperStructure[0].itemCount));
						$("#totalscore").text(examEdit.paperStructure[0].itemCount * examEdit.paperStructure[0].scorePerItem);
					}

					var str1 = '';
					for (var i = 0; i < examEdit.selectedItems.length; i++) {
						str1 += "<li data-type='" + examEdit.selectedItems[i].type + "' id='" + examEdit.selectedItems[i].id + "'><a>×</a>" + examEdit.selectedItems[i].question + "</li>";
					}
					$("#selected_test ul").append(str1);
				} else {
					$("#auto_radio").prop("checked", true);
					$("#autocompose").show();
					$("#manualcompose").hide();
					var str = '';
					for (var i = 0; i < examEdit.paperStructure.length; i++) {
						var changeType = '';
						if (examEdit.paperStructure[i].itemType == 1) {
							changeType = "多选";
						} else if (examEdit.paperStructure[i].itemType == 0) {
							changeType = "单选";
						}
						str += "<div class='questions_item' data-types='" + examEdit.paperStructure[i].itemType + "'>" +
							"<div class='managepage_group dis-inline'>" +
							"<label>题型：</label>" +
							"<input type='text' data-value='" + examEdit.paperStructure[i].itemType + "'name='itemType' class='question__types' value='" + changeType + "' disabled='true' style='width:77px;background-color: #FFFFFF' />" +
							"</div>" +
							"<div class='managepage_group dis-inline'>" +
							"<label>类别：</label>" +
							"<input type='text' name='subject' data_subjectType='" + examEdit.paperStructure[i].subject + "' class='post_infosel_item' value='" + examEdit.paperStructure[i].subjectName + "' disabled='true' style='width:74px;background-color: #FFFFFF' />" +
							"</div>" +
							"<div class='managepage_group dis-inline'>" +
							"<label style='width: 74px'>数量：</label>" +
							"<input type='text'name='itemCount' class='questions_num' value=" + examEdit.paperStructure[i].itemCount + " disabled='true' style='width:50px;background-color: #FFFFFF'/>" +
							"</div>" +
							"<div class='managepage_group dis-inline'>" +
							"<label style='width: 108px'>分值：</label>" +
							"<input type='text'  name='scorePerItem' class='scorePerItem' value='" + examEdit.paperStructure[i].scorePerItem + "' disabled='true' style='width:50px;background-color: #FFFFFF' />" +
							"</div>" +
							"<div class='managepage_group dis-inline'>" +
							"<label>总分：</label>" +
							"<input type='text' class='total_Points' value='" + Number(examEdit.paperStructure[i].scorePerItem) * Number(examEdit.paperStructure[i].itemCount) + "' disabled='true' style='width:60px; background-color: #FFFFFF' />" +
							"</div>" +
							"<span class='questions_del spanBg1 hover' onclick='delAuto(this)' style='color: #FFFFFF;'>删除</span>" +
							"</div>"
					}
					$("#questions_cont").append(str);
					calculate_num();
				}
			}
		}
	});
}
$("#composetest_examadd").on("click", function () {
	examAddModal();
});
$("#add_auto_questions").on("click", function () {
	add_single_quest();
});
/*考试弹出框保存按钮事件，保存后将添加的内容填充到table表格*/
/*自动组卷单选题增加方法*/
function add_single_quest() {
	var question__types_data = null;
	var question_data = $("#qusstion-types p").text();
	if (question_data == "单选") {
		question__types_data = 0
	} else {
		question__types_data = 1
	}
	var post_infosel_item = $("#post-infosel-item p").text();
	/*类别*/
	var post_infosel_value = $("#post-infosel-item p").attr("data-value");
	/*类别ID*/
	var questions_num = $("#multinum2").val();
	/*题目的数量*/
	var questions_score = $("#singletest2").val();
	/*每道题的分值*/
	/*未写下拉的标示ID*/
	var questions_str = "<div class='questions_item' data-types='" + question__types_data + "'>" +
		"<div class='managepage_group dis-inline'>" +
		"<label>题型：</label>" +
		"<input type='text' data-value='" + question__types_data + "'name='itemType' class='question__types' value='" + question_data + "' disabled='true' style='width:77px;background-color: #FFFFFF' />" +
		"</div>" +
		"<div class='managepage_group dis-inline'>" +
		"<label>类别：</label>" +
		"<input type='text' name='subject' data_subjectType='" + post_infosel_value + "' class='post_infosel_item' value='" + post_infosel_item + "' disabled='true' style='width:74px;background-color: #FFFFFF' />" +
		"</div>" +
		"<div class='managepage_group dis-inline'>" +
		"<label style='width: 74px'>数量：</label>" +
		"<input type='text'name='itemCount' class='questions_num' value=" + questions_num + " disabled='true' style='width:50px;background-color: #FFFFFF'/>" +
		"</div>" +
		"<div class='managepage_group dis-inline'>" +
		"<label style='width: 108px'>分值：</label>" +
		"<input type='text'  name='scorePerItem' class='scorePerItem' value='" + questions_score + "' disabled='true' style='width: 50px;px;background-color: #FFFFFF' />" +
		"</div>" +
		"<div class='managepage_group dis-inline'>" +
		"<label>总分：</label>" +
		"<input type='text' class='total_Points' value='" + calculate() + "' disabled='true' style='width:60px; background-color: #FFFFFF' />" +
		"</div>" +
		"<span class='questions_del spanBg1 hover' onclick='delAuto(this)' style='color: #FFFFFF;'>删除</span>" +
		"</div>"
	$("#questions_cont").append(questions_str);
	calculate_num() /*计算总分数*/;
	$("#multinum2").val("");
	$("#singletest2").val("");
	$("#singlescore2").text("0");
}
/*自动组卷计算总分方法*/
function calculate_num() {
	var summation = 0;
	$(".total_Points").each(function () {
		var a = $(this).val()
		summation += Number(a);
	})
	$("#summation").val(summation)
}
//自动组卷分值变化
function calculate() {
	var questions_num = $("#multinum2").val();
	/*题目的数量*/
	var questions_score = $("#singletest2").val();
	/*每道题的分值*/
	var num = 0;
	if (questions_num == "" || questions_score == "") {
		num = 0;
	} else {
		num = questions_num * questions_score;
	}
	return Number(num);
}
$("#multinum2").keyup(function () {
	$("#singlescore2").text(calculate());
})
$("#singletest2").keyup(function () {
	$("#singlescore2").text(calculate());
})
/*删除自动组卷的当前列*/
function delAuto(item) {
	$(item).parents(".questions_item").remove();
	calculate_num();
}

/*课程课件表格加载方法*/
function addTable(data) {
	var tableList = ["name"];
	var tableListNone = ["id"];
	var operation = ["table-edit"];
	var title = ["编辑"];
	TrainTable.dataAdd(data, "addTrain_id", "itm", tableList, tableListNone, operation, title);
};

/*手动数据按钮提交*/
$("#infogroup_exam_save").on("click", function () {
	var createPaperMode = $("input[name='composetest_examtest']:checked").val() //组卷方式
	var exam_name_title = $("#infogroup_exam_title").val(); //试卷名称
	var passScore = $("#infogroup_exam_passCount").val(); //及格分数
	var note = $("#examDescribe").val(); //考试说明
	/*	数据提交空值校验*/
	console.log(createPaperMode)
	if (createPaperMode == 0) {
		/*手动组卷*/
		var singletest = $("#singletest").val(); //单选题分数
		var singlenum = $("#singlenum").text();
		/*单选题数量*/
		var multitest = $("#multitest").val(); //多选题分数
		var multinum = $("#multinum").text();
		/*多选题数量*/
		var totalscore = $("#totalscore").text();
		/*总分*/
		var questionTypesNum = $("#totalnum").text();
		/*总题数*/
		switch ("") {
			case exam_name_title:
				layer.msg("请输入试卷名称！");
				return false;
				break;
			case passScore:
				layer.msg("请输入及格分数！");
				return false;
				break;
			case note:
				layer.msg("请输入考试说明！");
				return false;
			default:
				break;
		}
		var singItemType = [];
		var multinumType = [];
		var testItemIdsData = [];
		var ExamsSelectedItems = [];
		/*已选试题 试题ID 和 内容*/
		if (editData.length > 0) {/*编辑的数据增加*/
			ExamsSelectedItems = dynamicData.data.exams[editData[0]].selectedItems;
			dynamicData.data.exams[editData[0]].selectedItems.length = 0;
			$("#selected_test ul li").each(function () {
				var b = {};
				b.id = $(this).attr("id");
				b.type = $(this).attr("data-type");
				b.question = $(this).text().substr(1, $(this).text().length);
				ExamsSelectedItems.push(b);
			});
			for (var i = 0; i < ExamsSelectedItems.length; i++) {
				if (ExamsSelectedItems[i].type == 0) {
					singItemType.push(ExamsSelectedItems[i].type)
				} else if (ExamsSelectedItems[i].type == 1) {
					multinumType.push(ExamsSelectedItems[i].type)
				}
			}
			if (singItemType.length != 0) {
				var c = {};
				c.itemType = 0;
				c.itemCount = Number(singlenum);
				c.scorePerItem = singletest;
				testItemIdsData.push(c)

			} else {
				var c = {};
				c.itemType = 0;
				c.itemCount = 0;
				c.scorePerItem = 0;
				testItemIdsData.push(c)
			}
			if (multinumType.length != 0) {
				var e = {};
				e.itemType = 1;
				e.itemCount = Number(multinum);
				e.scorePerItem = multitest;
				testItemIdsData.push(e)
			} else {
				var e = {};
				e.itemType = 1;
				e.itemCount = Number(multinum);
				e.scorePerItem = multitest;
				testItemIdsData.push(e)
			}
		}

		if (editData.length == 0) {
			$("#selected_test ul li").each(function () {
				var b = {};
				b.id = $(this).attr("id");
				b.type = $(this).attr("data-type");
				b.question = $(this).text().substr(1, $(this).text().length);
				ExamsSelectedItems.push(b);
			});
			if (Number(singlenum) != 0) {
				var e = {};
				e.itemType = 0,
					e.itemCount = Number(singlenum),
					e.scorePerItem = singletest
				testItemIdsData.push(e)
			}
			if (Number(multinum) != 0) {
				var c = {};
				c.itemType = 1;
				c.itemCount = Number(multinum);
				c.scorePerItem = multitest;
				testItemIdsData.push(c)
			}
		}

		var a = {
			name: exam_name_title, /*考试题目*/
			note: note, /*考试说明1*/
			createPaperMode: Number(createPaperMode),//组卷方式
			passScore: passScore,//及格分数
			selectedItems: ExamsSelectedItems,
			paperStructure: testItemIdsData
		};
		/*当标示ID存在的时候数据保存在dynamicData 并且判断editData的值来决定是新数据插入还是修改数据*/
		if (editData.length > 0) {/*说明是编辑替换数据删除原对应的数据在插入*/
			dynamicData.data.exams.splice(editData[0], 1);
			dynamicData.data.exams.push(a)
		} else {
			if (dynamicData.data.exams == undefined) {
				dynamicData.data.exams = [];
				dynamicData.data.exams.push(a)

			} else {
				dynamicData.data.exams.push(a);
			}
			/*dynamicData新增数据*/

		}
		console.dir(dynamicData);
		$("#table_Train").show();

	} else {  /*提交时自动卷数据*/
		var paperStructure = [];
		/* var auto_title = $("#auto_title").val();*/
		/*自动组卷考试名*/
		/*自动考试说明*/
		$(".questions_item").each(function () {
			var b = {};
			b.itemType = Number($(this).attr("data-types"));
			b.typeTitle = $(this).find(".question__types").val();
			b.itemCount =Number( $(this).find(".questions_num").val());
			b.subject = $(this).find(".post_infosel_item").attr("data_subjecttype");
			b.subjectName = $(this).find(".post_infosel_item").val();
			b.scorePerItem = $(this).find(".scorePerItem").val();
			b.totalPoints = $(this).find(".total_Points").val();
			paperStructure.push(b);
		})
		var a = {
			name: exam_name_title, /*考试题目*/
			note: note, /*考试说明1*/
			createPaperMode: Number(createPaperMode),//组卷方式
			passScore: passScore,//及格分数
			paperStructure: paperStructure
		};
		if (exam_id != null && exam_id != "") {
			/*当标示ID存在的时候数据保存在dynamicData 并且判断editData的值来决定是新数据插入还是修改数据*/
			if (editData.length > 0) {/*说说明是编辑替换数据删除原来对应的数据在插入*/
				dynamicData.data.exams.splice(editData[0], 1);
				dynamicData.data.exams.push(a)
			} else {
				if (dynamicData.data.exams == undefined) {
					dynamicData.data.exams = [];
					dynamicData.data.exams.push(a)
				} else {
					dynamicData.data.exams.push(a);
				}
				/*dynamicData新增数据*/

			}
		}
		console.log(dynamicData)
	}
	/*重新加载表格数据*/
	var TrainList = [];
	if (exam_id != null && exam_id != "") {
		for (var i = 0; i < dynamicData.data.exams.length; i++) {
			var o = {};
			o.name = dynamicData.data.exams[i].name
			TrainList.push(o);
		}
	} else {
		for (var i = 0; i < exam.length; i++) {
			var c = {};
			c.name = exam[i].name;
			TrainList.push(c);
		}
	}
	if ($("#toby").children().length > 0) {
		$("#toby").children().remove()
	}
	layer.closeAll();
	$("#examListTable").show();
	clearData();
	console.log(TrainList);
	addTable(TrainList);
	tableEditFn();
	tabledel()
	editData.length = 0;
	$("input[name='composetest_examtest']").prop("checked", false);
	$("#addTrain_del").show();
});
/*表格编辑方法*/
function tableEditFn() {
	$(".table-edit").each(function (index) {
		$(this).on("click", function () {
			editData.push(index);
			console.log(editData)
			examAddModal();
		})
	})

}
function tabledel() {
	$(".table-delete").each(function (index) {
		$(this).on("click", function () {
			editData.push(index);
			$(this).parents("tr").empty();
			delete dynamicData.data.exams[editData[0]];
		})
	})

}
//考试弹出框返回按钮事件
$("#infogroup_exam_returnback").on("click", function () {
	layer.closeAll();
	clearData();
})

//将添加保存的信息回显到考试添加页。
function editTr(obj) {
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: ['考试', "font-size:18px"],
		area: ['980px', '760px'],
		shadeClose: false,
		content: $('#infogroup_exam'),
		success: function () {
			//写入对存储的信息在弹出框的回显
		}
	});
}
//将添加保存的信息清空并删除table这一行
function delTr(obj) {
	$(obj).parents("tr").remove();
	$("").remove; //清空保存的信息，空余部分是存储信息的地方
}
//清空考试添加弹出框的内容
function clearData() {
	editData.length = 0;
	$("#infogroup_exam_title , #infogroup_exam textarea,#examName,#infogroup_exam_passCount,#auto_title,#auto_digest,#examDescribe").val("");
	$("#selected_test ul").html("");
	$(".test_result p span b").text("");
	$(".test_result p span input").val("");
	$("#questions_cont").empty();
	$("input[name='composetest_examtest']").prop("checked", false)
	editData.length = 0;
}

//缩略图上传，用span模拟input[file]的点击事件
$("#fileimgupload").on("click", function () {
	$("#fileimg").click();
	getUploadImg("#fileimg", "#imgupload");
});
//判断选中文件是否是图片格式，以及是图片格式时的回显，obj是input[file]的id，obj2是展示的图片的id
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

$("#infogroup_title").val();
$("#infogroup_describe").val();
$("#infogroup_start").val();
$("#infogroup_stop").val();
/*存放信息组所有关得数据*/
$("#infogroup_add").on("click", function () {
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: ['信息组', "font-size:18px"],
		area: ['635px', '340px'],
		shadeClose: false,
		content: $('#infogroup_div'),
		success: function () {
			SerialNumber.length=0;
			$("#infogroup_describe").val("");
			$("#information_group input[type='text']").each(function () {
				$(this).val("")
				console.log(dynamicData.data.studentGroup)
			})
		}
	});
});

/*信息组编辑*/
$("#infogroup_edit").on("click", function () {
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: ['信息组', "font-size:18px"],
		area: ['635px', '340px'],
		shadeClose: false,
		content: $('#infogroup_div'),
		success: function () {
			$("#infogroup_tab .info_list input").each(function (index) {
				var self = $(this)
				if (self.prop("checked") == true) {
					$("#infogroup_title").val(dynamicData.data.studentGroup[index].basicInfo.name);
					$("#infogroup_describe").val(dynamicData.data.studentGroup[index].basicInfo.digest);
					$("#infogroup_start").val(dynamicData.data.studentGroup[index].basicInfo.startTime);
					$("#infogroup_stop").val(dynamicData.data.studentGroup[index].basicInfo.endTime);
				}
			});

		}
	});

})
//信息组返回按钮事件
$("#infogroup_div_returnback").on("click", function () {
	layer.closeAll();
	$("#infogroup_div input, #infogroup_div textarea").val("");
})
//信息组选项卡切换
$("#infogroup_tabs span").on("click", function () {
	if (SerialNumber.length == 0) {
		layer.msg("请选择用户组！");
		return false;
	}
	$(this).addClass("spanBg1 hover").siblings().removeClass("spanBg1 hover");
	var index = $("#infogroup_tabs span").index(this);
	$("#infogroup_tabs_content .infogroup_tabs_detail").eq(index).show().siblings().hide();
	$("#infogroup_tabs_content").show();
	//这里==2是为了测试考试时间得位置，考试时间添加html应该写在组名称点击上
	/*数据回显*/
	/*组成员回显*/
	if (index == 0) {
		if (dynamicData.data.studentGroup[SerialNumber[0]].users == undefined) {/*无数据清空上次的 有数据加载*/
			$(".treeInfoCont").hide();
			$(".userInfoCont").hide()
			$(".userInfoContList").empty();
			$(".userinFoList").empty();
			$(".managepage_tree").show();
			initZtree();
		} else {/*有数据*/
			$(".treeInfoCont").show();
			$(".userInfoCont").show();
			$(".managepage_tree").hide()
			$(".userInfoContList").empty();

			var a = dynamicData.data.studentGroup[SerialNumber[0]].users;
			var str = ""
			for (var i = 0; i < a.length; i++) {
				str += "<div class='userinFoList dis-inline'> <label data-id='" + a[i].id + "'>" + a[i].name + "</label></div>"
			}
			$(".userInfoContList").append(str);
		}
	}
	/*课程回显*/
	if (index == 1) {
		selectAll(searchTrime);
		if (dynamicData.data.studentGroup[SerialNumber[0]].courseCollections == undefined) {
			$(".infogroup_tabs_detail_cont").show();
			$(".coursfoCont").hide();
			$(".course_ok").hide();
			$(".course_ok_select ul").empty();
			$(".course_selected_test ul").empty();
			$(".infogroup_tabs_detail_btn_cont").show();
		} else {
			$(".infogroup_tabs_detail_cont").hide();
			$(".coursfoCont").show();
			$(".course_ok").show();
			$(".course_ok_select ul").empty();
			$("#course_ok_select ul").empty();
			$(".infogroup_tabs_detail_btn_cont").hide();
			var b = dynamicData.data.studentGroup[SerialNumber[0]].courseCollections;
			var str = "";
			for (var i = 0; i < b.length; i++) {
				str += " <li id='" + b[i].id + "' data-type='" + b[i].useExam + "'>" + b[i].name + "</li>"
			}
			$(".course_ok_select ul").append(str);
		}
	}

	/*考试时间回显*/
	if (index == 2) {
		if (dynamicData.data.studentGroup[SerialNumber[0]].groupExams == undefined) {
			$("#examTimeConfirm").empty();
			$(".examTimeContItem").show();
			$(".examTimeCont").show();
			$(".examTimeEdit").hide();
			bindExamTime();
		} else {
			$("#examTimeConfirm").empty();
			$(".examTimeContItem").show();
			$(".examTimeCont").hide();
			$(".examTimeEdit").show();
			var html = "";
			var c = dynamicData.data.studentGroup[SerialNumber[0]].groupExams;
			for (var i = 0; i < c.length; i++) {
				html += '<li id="' + c[i].id + '">';
				html += '<span class="examTimeConfirm_item">' +'考试名称：'+ c[i].name + '</span>';
				//html += '<span class="examTimeConfirm_item">' + c[i].startTime + '</span>';
				//html += '<span style="width:10px;display:inline-block;color: #000000;margin-left: 0;margin-right: 0">至</span>';
				//html += '<span class="examTimeConfirm_item">' + c[i].endTime + '</span>';
				html += '</li>';
			}
			$("#examTimeConfirm").append(html);
		}
	}

})

//选择组成员保存按钮事件
$("#treeSubmit").on("click", function () {
	var treeUers = modalUserName();
	console.log(treeUers)
	var str = "";
	var list = "";
	var treeData = [];
	for (var i = 0; i < treeUers.length; i++) {
		str += "<div class='userinFoList dis-inline'> <a class='treeName' data-id='" + treeUers[i].id + "'>" + treeUers[i].name + "</a></div>"
		list += "<a class='treeName' data-id='" + treeUers[i].id + "'>" + treeUers[i].name + "</a>"
		treeData.push(treeUers[i].id);
	}
	$(".treeUserInfo").append(str);

	$(".userInfoContList").append(list);
	dynamicData.data.studentGroup[SerialNumber[0]].users = treeUers;
	//modalUserName().id是选中人员的id，modalUserName().name是选中人员的name
	$(".treeInfoCont").show();
	$(".userInfoCont").show();
	$(".managepage_tree").hide();
})

//获取树插件所有已选择的子节点
function modalUserName() {
	var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
	var nodes = treeObj.getCheckedNodes(true);
	var selectNode = []; //使用类json格式数据返回selectNode = [{"id":1,"name":"1"},{"id":2,"name":"2"}]
	if (nodes.length > 0) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].isParent == false && typeof(nodes[i].id) == "string") { //判断该选中节点是否是父节点判断是不是最子节点，因为初始化的时候给最子节点的id添加了users，所以匹配是不是字符串类型
				var selectList = {}
				selectList.id = nodes[i].id.replace(/users/, ""); //替换id中的users返回给后台
				selectList.name = (nodes[i].name); //获取选中节点的名称
				selectNode.push(selectList);
			}
		}
	}
	return selectNode;
};
//考试时间添加，根据考试那个表格获取当前考试名称，给名称填充事件
function bindExamTime() {
	$("#examTimeList").html(""); //先清空数据再把遍历获取到的数据append进dom节点，清空防止多次点击多次添加
	$("#addTrain_id tbody tr").each(function (index) {
		var html = "";
		html += '<li id="' + $(this).children("td").eq(2).text() + '">'
		html += '<input type="checkbox" name="" style="width: 16px;height: 16px;vertical-align: middle;">';
		html += '<span>' + $(this).children("td").eq(1).text() + '</span>';
		//html += '<input type="text" id="infogroup_start' + index + '" class="input-focus examtimestart" placeholder="请输入考试开始时间" value="" onclick="laydate({istime:true,istodat:false,min:laydate.now(),max:\'2099-06-16 23:59:59\',format:\'YYYY-MM-DD hh:mm:ss\'})"/>'; //onclick方法是无法给input绑定上laydate事件写在元素内部，现在无法实现开始时间必须小于结束时间
		//html += '<input type="text" id="infogroup_stop' + index + '" class="input-focus examtimestop" placeholder="请输入考试结束时间" value="" onclick="laydate({istime:true,istodat:false,min:laydate.now(),max:\'2099-06-16 23:59:59\',format:\'YYYY-MM-DD hh:mm:ss\'})"/>';
		html += '</li>';
		$("#examTimeList").append(html);
	});
};
//考试时间保存事件，具体值已经获取到了，试卷名称是$(this).find("span").text()，考试开始时间$(this).find("#infogroup_start"+index).val()，考试结束时间$(this).find("#infogroup_stop"+index).val()
//获取具体值的方法需要在遍历方法里取
$("#examTimeList_save").on("click", function () {
	$("#examTimeConfirm").html("");
	var studentGrouExams = []
	$("#examTimeList li").each(function (index) {
		if ($(this).find("input").prop("checked") == true) {
			var a = {
				id: $(this).find("span").attr("id"),
				name: $(this).find("span").text(),
			};
			studentGrouExams.push(a)
			var html = "";
			html += '<li id="' + $(this).attr("id") + '">';
			html += '<span class="examTimeConfirm_item">' + $(this).find("span").text() + '</span>';
			html += '</li>';
			$("#examTimeConfirm").append(html);
		}
		;
	});
	console.log(SerialNumber[0]);
	console.log(data.studentGroup);
	dynamicData.data.studentGroup[SerialNumber[0]].groupExams = studentGrouExams;
	console.log(data);
	$(".examTimeEdit").show();
	/*编辑按钮显示*/
	$(".examTimeCont").hide();
	$(".examTimeContItem").show()
});
/*考试时间编辑事件*/
$("#examTimeEdit").on("click", function () {
	bindExamTime()
	var checked = [];
	/*存放选中的数据ID*/
	$("#examTimeConfirm li").each(function () {
		checked.push($(this).attr("id"))
	});
	$("#examTimeList li").each(function () {
		if (jQuery.inArray($(this).attr("id"), checked) > -1) {
			$(this).find("input").prop("checked", true);
		}
	});
	$("#examTimeConfirm").empty();
	$(".examTimeCont").show();
	$(".examTimeEdit").hide();
	$(".examTimeContItem").hide();
	delete dynamicData.data.studentGroup[SerialNumber[0]].groupExams;
})


/*选项卡课程条件搜索事件*/
var searchTrime={};
$("#infogroup_tabs_detail_search_btn").on("click", function () {
	var searchVal = $("#infogroup_val").val();
	searchTrime.name=searchVal;
	selectAll(searchTrime);
})
/*选项卡课程无条件搜索事件*/
function selectAll(param) {
	$.ajax({
		type: "POST",
		url: contextPath + "/courseCollection/collectionExamList",
		dataType: "json",
		data: param,
		success: function (data) {
			if (data != null) {
				var str = "";
				for (var i = 0; i < data.data.length; i++) {
					if (data.data[i].hasExam == 1) {
						str += " <li id='" + data.data[i].id + "' data-type='" + data.data[i].hasExam + "'>" + data.data[i].name + "<span><input type='checkbox'  class='select' /></span></li>";
					} else if (data.data[i].hasExam == 0) {
						str += " <li id='" + data.data[i].id + "' data-type='" + data.data[i].hasExam + "'>" + data.data[i].name + "<span></span></li>";
					}
				}
				if (str.length > 0) {
					$("#course_unselected_test ul").html(str);
				}
			}

		}
	});
}
/*选项卡课程选中事件*/
$("#course_unselected_test").on("click", "ul li", function () {
	var txt = $(this).text().substr(0, 28);
	var dataflag = $(this).find("input").prop("checked");
	console.log(dataflag)
	var useExam = 0;
	if (dataflag == false||dataflag==undefined) {
		useExam = 0;
	} else {
		useExam = 1;
	}
	var itemId = $(this).attr("id");
	var flag = flagnum = 0;
	if ($("#course_selected_test li").length == 0) {
		var newLi = $("<li/>").html("<a>×</a>" + txt).attr({
			"data-type": useExam,
			"id": itemId
		}).appendTo($("#course_selected_test ul"));
	} else {
		$("#course_selected_test li").each(function () {
			if ($(this).attr("id") != itemId) {
				flagnum++;
			}
		});
		if (flagnum == $("#course_selected_test li").length) {
			flag = 1;
			flagnum = 0;
		} else {
			flag = 0;
		}
		if (flag == 1) {
			var newLi = $("<li/>").html("<a>×</a>" + txt).attr({
				"data-type": useExam,
				"id": itemId
			}).appendTo($("#course_selected_test ul"));
		}
	}
});
/*已选课程删除事情*/
$("#course_selected_test").on("click", "ul li a", function () {
	$(this).parents("li").remove();
})
/*课程保存*/
$("#course_ok").on("click", function () {
	var courseCollections = []
	var str = "";
	$("#course_selected_test li").each(function () {
		console.log($(this).text())
		var a = {
			id: $(this).attr("id"),
			name: $(this).text().substring(1),
			useExam:Number($(this).attr("data-type"))
		};
		courseCollections.push(a);
		str += " <li id='" + $(this).attr("id") + "' data-type='" + $(this).attr("data-type") + "'>" + $(this).text().substring(1) + "</li>"
	});
	$(".course_ok_select ul").append(str);
	$("#course_selected_test ul").empty();
	dynamicData.data.studentGroup[SerialNumber[0]].courseCollections = courseCollections;
	$(".infogroup_tabs_detail_cont").hide();
	$(".coursfoCont").show();
	$(".course_ok").show();
});
/*课程编辑
 取到序列号后先删除对应的数据在添加
 * */
$("#courseEdit").on("click", function () {
	$(".course_ok_select ul").empty();
	$(".infogroup_tabs_detail_cont").show();
	$(".coursfoCont").hide();
	$(".course_ok").hide();
	$(".infogroup_tabs_detail_btn_cont").show();
	$("#course_selected_test ul").empty();
	/*数据回显*/
	selectAll();
	var a = dynamicData.data.studentGroup[SerialNumber[0]].courseCollections;
	for (var i = 0; i < a.length; i++) {
		var newLi = $("<li/>").html("<a>×</a>" + a[i].name).attr({
			"data-type": a[i].useExam,
			"id": a[i].id
		}).appendTo($("#course_selected_test ul"));
	}
	delete a;
})
$("#submitsave").on("click", function () {
	if (dynamicData.data.exams != undefined && dynamicData.data.exams != null) {
		for (var i = 0; i < dynamicData.data.exams.length; i++) {
			exam.push(dynamicData.data.exams[i]);
		}
	};

	for (var i = 0; i < exam.length; i++) {
		var testItemId = []
		if (exam[i].selectedItems != undefined) {
			for (var j = 0; j < exam[i].selectedItems.length; j++) {
				testItemId.push(Number(exam[i].selectedItems[j].id));
			}
			exam[i].testItemIds = testItemId;
			delete exam[i].selectedItems;
		}
	};

	for (var i = 0; i < exam.length; i++) {
		if (exam[i].createPaperMode == 1) {
			for (var j = 0; j < exam[i].paperStructure.length; j++) {
				delete exam[i].paperStructure[j].subjectName;
				delete exam[i].paperStructure[j].totalPoints;
				delete exam[i].paperStructure[j].typeTitle;
			}
		}else if (exam[i].createPaperMode == 0){
			for (var j = 0; j < exam[i].paperStructure.length; j++) {
				if(exam[i].paperStructure[j].itemCount==0){
					exam[i].paperStructure.splice(j,1);
				}
			}
		}
	}

	var datastring = JSON.stringify(exam);

	$("#exams").val(datastring);
	for (var i=0;i<dynamicData.data.studentGroup.length;i++){
		var userID=[];
		if (dynamicData.data.studentGroup[i].users!=undefined){
			for (var j=0;j<dynamicData.data.studentGroup[i].users.length;j++){
				userID.push(dynamicData.data.studentGroup[i].users[j].id);
			}
			dynamicData.data.studentGroup[i].userIds=userID;
			delete dynamicData.data.studentGroup[i].users;
		}

	}
	var datastrings = JSON.stringify(dynamicData.data.studentGroup);
	console.log(datastrings);
	$("#studentGroup").val(datastrings);
	var url = "";
	var exam_id = $("#Train_id").val();
	if (exam_id != null && exam_id != '') {
		url = contextPath + '/training/edit.do';
	} else {
		url = contextPath + '/training/add.do';
	};
	$("#editTrainForm").attr('action', url);
	$("#editTrainForm").submit();

	//接取的参数名name,hasExam,exams,showImg,studentGroup,这些数据都是通过form表单提交，如果有不一样的地方，修改input的name值，添加应该是OK的

});
$("#returnback").on("click", function () {
	window.location.href = basecontextPath + "/train/toList";
});