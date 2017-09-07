//课程编辑
//获取树插件所有已选择的子节点
getSelectByAnsy($("#id_job_type ul")) ;
getSelectByAnsy($("#auto_post-infosel-item ul") , $("#auto_post-infosel-item p")) ;
//异步获取select列表
function getSelectByAnsy(selDom,initSelectP,pValue){
    $.ajax({
        type:"post" ,
        url:contextPath+"/tib/subjectSelectList" ,
        data:{} ,
        success:function(msg){
            if(msg.code == 1) {
                var data = msg.data ;
                var html_str = "" ;
                for(var x in  data) {
                    if(initSelectP){
                        if(pValue){
                            initSelectP.attr('data-value' ,pValue.id).html(pValue.name+"<i></i>") ;
                        }else {
                            if(x == 0){
                                initSelectP.attr('data-value' ,data[x].id).html(data[x].name+"<i></i>") ;
                            }
                        }
                    }
                    html_str += '<li><a data-value="'+data[x].id+'" href="#">'+data[x].name+'</a></li>'  ;
                }
                selDom.append(html_str);
            }
        }
    }) ;
}
/*树下拉*/
$(".downs").on("click", function () {
    if ($(".ztree_donws").css("display") == "none") {
        $(".ztree_donws").css("display", "block");
    } else {
        $(".ztree_donws").css("display", "none")
    }
});
/*返回选中中的数据*/
function getCheckNode() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var selectNode = [];
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            if (typeof(nodes[i].id) == "string" || typeof(nodes[i].id) == "number") {
                var selectList = {}
                selectList.id = (nodes[i].id);
                selectList.name = (nodes[i].name);
                selectNode.push(selectList);
            }
        }
    }
    return selectNode;
};
function treeData(data,UserIds) {
    var treeId=$("#treeData").attr("data-id");
    var orgId=$("#modalOrgName").attr("data-id");
    //var roleId=$("#roleId").val();
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
                            //if (newTreeNode[f].id.substring(0,1)==data.data.selectedUsers[h].id) {
                            newTreeNode[f].checked=true;
                            newTreeNode[f].open=true;
                        }
                    }

                }
            }
        }
    /*    if (treeId == "") {
                    $("#modalOrgName").val(newTreeNode[0].name);
                    newTreeNode[0].checked = true;
                    newTreeNode[0].open = true;
                }else {
                    for (var f = 0; f < newTreeNode.length; f++) {
                        if (newTreeNode[f].id == treeId) {
                            $("#modalOrgName").val(newTreeNode[f].name);
                            newTreeNode[f].checked = true;
                            newTreeNode[f].open = true;
                        }
                    }
        }*/
        $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
    }
}
//开始时间结束时间
laydate.skin('huanglv');
var examination_start = {
	elem: '#examination_start',
	format: 'YYYY-MM-DD hh:mm:ss',
	min: '1985-00-00', //设定最小日期为当前日期
	max: '2222-12-31', //最大日期
	istime: true,
	istoday: true,
	choose: function(datas) {
		examination_stop.min = datas; //开始日选好后，重置结束日的最小日期
		examination_stop.start = datas; //将结束日的初始值设定为开始日
	}
};
var examination_stop = {
	elem: '#examination_stop',
	format: 'YYYY-MM-DD hh:mm:ss',
	min: '1985-00-00',
	max: '2222-12-31',
	istime: true,
	istoday: true,
	choose: function(datas) {
		examination_start.max = datas; //结束日选好后，重置开始日的最大日期
	}
};
laydate(examination_start);
laydate(examination_stop);
/*组卷弹出层*/
var index = 0;
$("input[name='composetest_status']").on("focus", function() {
	$(this).prop("checked", true);
	if ($("input[name='composetest_status']:checked").val() == 0) {
		//$("#autocompose").hide();
		$("#autocompose .test_result input").val("");
		$("#singlescore2").text(0);
		$("#multiscore2").text(0);
		$("#totalscore2").text(0);
		index = layer.open({
			type: 1,
			skin: 'layui-layer-molv', //皮肤
			title: ['手动组卷', "font-size:18px"],
			area: ['980px', '600px'],
			shadeClose: false,
			content: $('#manualcompose'),
			cancel: function(index) {
				//alert(1)
				//$("#selected_test ul").empty();
			},
			success: function(layero, index) {

			}
		});
	} else if ($("input[name='composetest_status']:checked").val() == 1) {
		//$("#autocompose").show();
		$("#totalnum").text(0);
		$("#singlenum").text(0);
		$("#multinum").text(0);
		$("#totalscore").text(0);
		$("#manualcompose .test_result input").val("");
		$("#selected_test ul li").remove();
        layer.open({
            type: 1,
            skin: 'layui-layer-molv', //皮肤
            title: ['自动组卷', "font-size:18px"],
            area: ['1000px', '600px'],
            shadeClose: false,
            content: $('#autocompose'),
            cancel: function(index) {
                //alert(1)
                //$("#selected_test ul").empty();
            },
            success: function(layero, index) {

            }
        });
	}
});
//回显手动组卷
showHandZj();
function showHandZj(){
	//清空
	$("#selected_test ul").empty();
	$("#totalnum").text(0);
	$("#singlenum").text(0);
	$("#singletest").val("");
	var exam_id = $("#exam_id").val();
	if(exam_id !=null && exam_id !=""){
		$.ajax({
			type: "post",
			url: contextPath+"/exam/toUpdate" + "",
			data: {id:$("#exam_id").val()},
			dataType: "json",
			success: function(data) {
				if (data.code == 1) {
                    console.log(data);
					var exam = data.data;
					if(exam.createPaperMode == 0){
						for (var i=0;i<exam.exTestItemList.length;i++){
							var pStr="";
							if(exam.exTestItemList[i].type ==0){
								pStr="(单)";
							}else if(exam.exTestItemList[i].type==1){
								pStr="(多)";
							}else if(exam.exTestItemList[i].type==3){
                                pStr="(问)";
                            }
							$("<li/>").html("<a>×</a>"+pStr+exam.exTestItemList[i].question ).attr({
								"data-type": exam.exTestItemList[i].itemType,
								"id": exam.exTestItemList[i].id
							}).appendTo($("#selected_test ul"));
						}

						$("#totalnum").text(exam.singleChoiceCount+exam.multipleChoiceCount+exam.questionChoiceCount);
						$("#singlenum").text(exam.singleChoiceCount);
						$("#singletest").val(exam.singleChoiceScore);
						$("#multinum").text(exam.multipleChoiceCount);
						$("#multitest").val(exam.multipleChoiceScore);
						$("#questnum").text(exam.questionChoiceCount);
						$("#questtest").val(exam.questionChoiceScore);
						var totalscore=exam.singleChoiceCount*exam.singleChoiceScore+exam.multipleChoiceCount*exam.multipleChoiceScore+exam.questionChoiceCount*exam.questionChoiceScore;
						$("#totalscore").text(totalscore);
					}
				} else {
					layer.msg(data.msg);

				}
			}
		});//end contextPath+"/exam/toUpdate.do"
	}
}//回显手动组卷 end
//考试对象弹出层
$("#targetUserIds").on("click", function() {
    var UserIds=selectedUser();
    $.ajax({
        type: "post",
        url:  basecontextPath + "/uuc/orgTreeWithSlaves",
        data: {userId:0},
        dataType: "json",
        success: function (data) {
            treeData(data,UserIds);
            layer.open({
                type: 1,
                skin: 'layui-layer-molv', //皮肤
                title: ['考试对象', "font-size:18px"],
                area: ['450px', '450px'],
                shadeClose: false,
                content: $('#learn_object'),
                cancel: function(index) {
                },
                success: function() {
                    //树插件数据绑定
                    //initZtree();
                }
            });
        }
    });
});
//手动组卷分值变化、试题选择
var singlenum = multinum =questnum= 0;
$("#totalnum").text($('#selected_test li').length);
if ($("#selected_test li").length == 0) {
	$("#singlenum").text(singlenum);
	$("#multinum").text(multinum);
	$("#questnum").text(questnum);
} else {
	$("#selected_test li").each(function() {
		if ($(this).attr("data-type") == "0") {
			singlenum++;
		} else  if($(this).attr("data-type") == "1"){
			multinum++;
		}else if($(this).attr("data-type") == "3"){
            questnum++;
        }
		$("#singlenum").text(singlenum);
		$("#multinum").text(multinum);
		$("#questnum").text(questnum);
	});
}
$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text()+ $('#questtest').val() * $("#questnum").text());
$("#singletest").on("blur", function() {
	$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text()+ $('#questtest').val() * $("#questnum").text());
});
$("#multitest").on("blur", function() {
	$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text()+ $('#questtest').val() * $("#questnum").text());
});
$("#questtest").on("blur", function() {
    $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text()+ $('#questtest').val() * $("#questnum").text());
});
$("#unselected_test").on("click", "ul li", function() {
	var txt = $(this).text();
	var dataflag = $(this).attr("data-type");
	var itemId = $(this).attr("id");
	var flag = flagnum = 0;
	if ($("#selected_test li").length == 0) {
		var newLi = $("<li/>").html( "<a>×</a>"+txt).attr({
			"data-type": dataflag,
			"id": itemId
		}).appendTo($("#selected_test ul"));
	} else {
		$("#selected_test li").each(function() {
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
			var newLi = $("<li/>").html("<a>×</a>"+txt ).attr({
				"data-type": dataflag,
				"id": itemId
			}).appendTo($("#selected_test ul"));
		}
	}
	$("#totalnum").text($('#selected_test li').length);
	singlenum = multinum = questnum=0;
	$("#selected_test li").each(function() {
		if ($(this).attr("data-type") == "0") {
			singlenum++;
		} else if ($(this).attr("data-type") == "1"){
			multinum++;
		}else if ($(this).attr("data-type") == "3"){
            questnum++;
        }
		$("#singlenum").text(singlenum);
		$("#multinum").text(multinum);
		$("#questnum").text(questnum);
	});
	$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text()+$('#questtest').val() * $("#questnum").text());
});
//手动组卷删除已选试题
$("#selected_test").on("mouseover", "ul li", function() {
	$(this).find("a").show();
});
$("#selected_test").on("mouseleave", "ul li", function() {
	$(this).find("a").hide();
});
$("#selected_test").on("click", "ul li a", function() {
	$(this).parents("li").remove();
	$("#totalnum").text($('#selected_test li').length);
	singlenum = multinum =questnum= 0;
	if ($("#selected_test li").length == 0) {
		$("#singlenum").text(singlenum);
		$("#multinum").text(multinum);
        $("#questnum").text(questnum);
	} else {
		$("#selected_test li").each(function() {
			if ($(this).attr("data-type") == "0") {
				singlenum++;
			} else if ($(this).attr("data-type") == "1"){
				multinum++;
			}else if ($(this).attr("data-type") == "3"){
                questnum++
            }
			$("#singlenum").text(singlenum);
			$("#multinum").text(multinum);
            $("#questnum").text(questnum);
		});
	}
	$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text());
});
//手动组卷确定按钮事件
$("#manualSubmit").on("click", function() {
	var testItemIds= [];
	$("#selected_test li").each(function() {
		testItemIds.push($(this).attr("id"));
	});
	if(testItemIds.length == 0){
		layer.alert("选择要添加的考试题目");
		return;
	}
	layer.close(index);
});
//考试对象确定按钮事件
$("#treeSubmit").on("click", function() {
	layer.closeAll();
	$("#targetUserIds").val("已选择" + getCheckNode().length + "人");
});
//v1.2
$("#submitsave").on("click", function() {
	var data = {
		name: $("#title").val(), //题目
		startTime: $("#examination_start").val() !=""?$("#examination_start").val():undefined, //开始时间
		endTime: $("#examination_stop").val() !=""? $("#examination_stop").val():undefined, //结束时间
		note: $("#note").val(), //考试须知
		createPaperMode: $("input[name='composetest_status']:checked").val(), //试卷类型
		passScore:$("#passCount").val()//及格分数
	};
	var composetestData = {}; //
	var testItemIds = [];
	var autoTestItems = [] ;
	//组卷数据
	if (data.createPaperMode == 0) {
		$("#selected_test li").each(function() {
			testItemIds.push($(this).attr("id"));
		});
		if(testItemIds.length<0){
			layer.alert("请选择添加的试题!");
			return;
		}
		var paperStructure = []  ;
		if($("#singlenum").text() && parseInt($("#singlenum").text()) > 0 ) {
			var siglePaperStructure = {} ;
			siglePaperStructure.itemType = 0;
			siglePaperStructure.scorePerItem = $("#singletest").val() ? $("#singletest").val() : 0;
			siglePaperStructure.itemCount = $("#singlenum").text()  ;
			paperStructure.push(siglePaperStructure) ;
		}
		if($("#multinum").text() &&  parseInt($("#multinum").text()) > 0){
			var multiPaperStructure = {} ;
			multiPaperStructure.itemType = 1 ;
			multiPaperStructure.scorePerItem = $("#multitest").val() ?  $("#multitest").val() : 0 ;
			multiPaperStructure.itemCount = $("#multinum").text() ;
			paperStructure.push(multiPaperStructure) ;
		}
        if($("#questnum").text() && parseInt($("#questnum").text()) > 0 ) {
            var questionPaperStructure = {} ;
            questionPaperStructure.itemType = 3;
            questionPaperStructure.scorePerItem = $("#questtest").val() ? $("#questtest").val() : 0;
            questionPaperStructure.itemCount = $("#questnum").text()  ;
            paperStructure.push(questionPaperStructure) ;
        }
		data.paperStructure = JSON.stringify(paperStructure);
	} else {
		$("#questions_cont .questions_item").each(function(index){
			var tmp_data = {} ;
			tmp_data.itemType = $(this).attr('data-types') ;
			tmp_data.subject = $(this).find('input[name="subject"]').attr('data_subjecttype') ;
			tmp_data.itemCount = $(this).find('input[name="itemCount"]').val() ;
			tmp_data.scorePerItem = $(this).find('input[name="scorePerItem"]').val() ;
			autoTestItems.push(tmp_data) ;
		});
		data.paperStructure = JSON.stringify(autoTestItems);
	}
	data.testItemIds = testItemIds;
	$("input[name='publishStatus']").each(function(index){
		if($(this).prop('checked')) {
			data.publishStatus = $(this).val();
		}
	}) ;
        if ($("#targetUserIds").val() != "") {
            var userIds = getCheckNode();
            console.log(userIds);
            var uIds = [];
            for(var i=0;i<userIds.length;i++){
                uIds.push(parseInt(userIds[i].id));
            }
            if(userIds.length==0){
                layer.alert("请先选择要添加的考试对象");
                return;
            }
            data.targetUserIds = JSON.stringify(uIds); //考试对象
            console.log(data)
	} else {
		layer.alert("请先选择要添加的考试对象");
		return;
	}
	var url = null;
	var exam_id = $("#exam_id").val();
	if(exam_id !=null && exam_id !=''){
		url = contextPath+'/exam/update';
		data.id=exam_id;
		data.examPaperId = $("#examPaperId").val();
		data.reviewResult=0;
	}else{
		url = contextPath+'/exam/add';
	}
	$.ajax({
		type: "POST",
		url: url,
		dataType:"json",
		traditional:true ,
		data: data,
		success: function(data){
			if(data.code ==1){
				layer.msg(data.msg);

			}else {
				layer.msg(data.msg);
			}
		}
	});
    //$(".questionCont").show();
    //$(".managepage").hide();
    returnback();
    $("#question_search_btn").click();
});
$("#add_questions").on("click", function() {
    var question__types_data = 0;
    var question_data = $("#qusstion-types p").text();
    if (question_data == "单选") {
        question__types_data = 0;
    } else if(question_data == "多选") {
        question__types_data = 1;
    }else  if(question_data == "问答") {
        question__types_data = 3;
    }
    var post_infosel_item = $("#auto_post-infosel-item p").text(); /*类别*/
    var post_infosel_value = $("#auto_post-infosel-item p").attr("data-value"); /*类别ID*/
    var questions_num = $("#multinum2").val(); /*题目的数量*/
    var questions_score = $("#singletest2").val(); /*每道题的分值*/
    /*未写下拉的标示ID*/
    var questions_num = $("#multinum2").val(); /*题目的数量*/
    var questions_score = $("#singletest2").val(); /*每道题的分值*/
    var title_score = calculate(questions_num,questions_score) ;

    //=======================
    var questions_str = "<div class='questions_item' data-types='" + question__types_data + "'>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>题型类型：</label>" +
        "<input type='text'name='itemType' class='question__types' value='" + question_data + "' disabled='true' style='width:80px;' />" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>类别：</label>" +
        "<input type='text' name='subject' data_subjectType='" + post_infosel_value + "' class='post_infosel_item' value='" + post_infosel_item + "' disabled='true' style='width:80px;' />" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>数量：</label>" +
        "<input type='text'name='itemCount' class='questions_num' value='" + questions_num + "' disabled='true' style='width:75px;'/>" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>分值：</label>" +
        "<input type='text'  name='scorePerItem' class='scorePerItem' value='" + questions_score + "' disabled='true' style='width:80px;' />" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>总分：</label>" +
        "<input type='text' class='total_Points' value='" + title_score + "' disabled='true' style='width:58px;' />" +
        "</div>" +
        "<span class='questions_del managepage_group_btn' onclick='delAuto(this)' style='color: #FFFFFF;'>删除</span>" +
        "</div>"
    $("#questions_cont").append(questions_str);
    calculate_num() /*计算总分数*/
}) ;
function calculate(questions_num,questions_score) {
	var num = 0
	if (questions_num == "" || questions_score == "") {
		num = 0;
	} else {
		num = questions_num * questions_score
	}
	return num;
}
function calculate_num() {
	var summation = 0;
	$(".total_Points").each(function() {
		var a = $(this).val()
		summation += Number(a);
	})
	$("#summation").val(summation)
}
function delAuto(item){
	$(item).parent(".questions_item").remove();
	calculate_num();
}
$("#returnback").on('click',returnback);
function returnback(){
   $(".questionCont").show();
   $(".managepage").hide();
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
    $("#title").val(''); //考试的题目
    $("#targetUserIds").val('')//考试对象的人数.
    $("#examination_start").val('');//考试开始时间
    $("#examination_stop").val('');//考试结束时间
    $("#note").val('');//考试须知
    //考试添加的试卷(自动或者手动)
    $("input[name='composetest_status']").prop('checked',false);
    $("#passCount").val('');
    $("#questions_cont").empty();
    $("#autocompose").hide();
    $("#autocompose .test_result input").val("");
    $("#singlescore2").text(0);
    $("#multiscore2").text(0);
    $("#totalscore2").text(0);
    $("#summation").val('');
}