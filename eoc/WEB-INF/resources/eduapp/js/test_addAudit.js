/*树选中的数据*/
var selectedUsers = null;
//编辑
function tableEditFn() {
    $(".table-edit").on("click", editFn);
    function editFn(e) {
        e.stopPropagation();
        if ($(this).parent().siblings('#StatusName').text()== '通过' ) {
            layer.msg('该数据已审核通过 不可编辑', {
                icon: 1,
                time: 3000
            });
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            return;
        }
        toAdd()
        var self = this;
        var getId = singleId(self, "id");
        /*编辑某一个返回的这行的标识ID*/
        $.ajax({
            type: "post",
            url: contextPath + "/exam/detailConfig",
            /*编辑表格的某一行的时候 传递这行的标识ID地址*/
            data: {
                id: getId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    $("#exam_id").val(data.data.id);//考试唯一的id
                    $("#title").val(data.data.name); //考试的题目
                    if(data.data.targetUserIds!=""){
                        selectedUsers = JSON.parse(data.data.targetUserIds);
                        var targetLength = JSON.parse(data.data.targetUserIds).length || '';
                        $("#targetUserIds").val("已选择" + targetLength + "人")//考试对象的人数.
                    }else {
                        $("#targetUserIds").val("已选择0人")//考试对象的人数.
                    }
                    $("#examination_start").val(data.data.startTime);//考试开始时间
                    $("#examination_stop").val(data.data.endTime);//考试结束时间
                    $("#note").val(data.data.note);//考试须知
                    if (data.data.createPaperMode == 0) {//考试添加的试卷(自动或者手动)
                        $("input[value='0']").prop('checked', true);
                        var exTestItemList = data.data.selectedItems;
                        var paperStructure = JSON.parse(data.data.paperStructure);
                        showHandZjv12(exTestItemList, paperStructure);
                    } else if (data.data.createPaperMode == 1) {
                        $("input[value='1']").prop('checked', true);
                        var itemType,//自动组卷题型
                            subject,//试题类别
                            itemCount,//试题数量
                            scorePerItem,//试题分值
                            subjectName,//试题题目
                            questions_str = '';//试题列表
                        var autotest = JSON.parse(data.data.paperStructure)
                        for (var x in autotest) {
                            var tmp_data = autotest[x];
                            questions_str +=
                                "<div class='questions_item' data-types='" + tmp_data.itemType + "'>" +
                                "<div class='managepage_group dis-inline'>" +
                                "<label>题型类型：</label>" +
                                "<input type='text'name='itemType' class='question__types' value='" + (tmp_data.itemType == 0 ? "单选" : (tmp_data.itemType == 1 ? "多选" : "问答")) + "' disabled='true' style='width:80px;' />" +
                                "</div>" +
                                "<div class='managepage_group dis-inline'>" +
                                "<label>类别：</label>" +
                                "<input type='text' name='subject' data_subjectType='" + tmp_data.subject + "' class='post_infosel_item' value='" + (tmp_data.subjectName ? tmp_data.subjectName : '') + "' disabled='true' style='width:80px;' />" +
                                "</div>" +
                                "<div class='managepage_group dis-inline'>" +
                                "<label>数量：</label>" +
                                "<input type='text'name='itemCount' class='questions_num' value='" + tmp_data.itemCount + "' disabled='true' style='width:75px;'/>" +
                                "</div>" +
                                "<div class='managepage_group dis-inline'>" +
                                "<label>分值：</label>" +
                                "<input type='text'  name='scorePerItem' class='scorePerItem' value='" + tmp_data.scorePerItem + "' disabled='true' style='width:80px;' />" +
                                "</div>" +
                                "<div class='managepage_group dis-inline'>" +
                                "<label>总分：</label>" +
                                "<input type='text' class='total_Points' value='" + calculate(tmp_data.itemCount, tmp_data.scorePerItem) + "' disabled='true' style='width:58px;' />" +
                                "</div>" +
                                "<span class='questions_del managepage_group_btn' onclick='delAuto(this)' style='color: #FFFFFF;'>删除</span>" +
                                "</div>";
                        }
                        $("#questions_cont").empty();
                        $("#questions_cont").append(questions_str);
                        calculate_num();
                    }
                    $("#passCount").val(data.data.passScore);//及格分数
                } else {
                    layer.msg(data.msg);
                }
            }
        });
    };
}
function calculate(questions_num, questions_score) {
    var num = 0
    if (questions_num == "" || questions_score == "") {
        num = 0;
    } else {
        num = questions_num * questions_score
    }
    return num;
}
function delAuto(item) {
    $(item).parent(".questions_item").remove();
    calculate_num();
}
function calculate_num() {
    var summation = 0;
    $(".total_Points").each(function () {
        var a = $(this).val()
        summation += Number(a);
    })
    $("#summation").val(summation)
}
function showHandZjv12(exTestItemList, paperStructure) {
    //清空
    $("#selected_test ul").empty();
    $("#totalnum").text(0);
    $("#singlenum").text(0);
    $("#singletest").val(0);
    $("#multinum").text(0);
    $("#multitest").val(0);
    $("#questnum").text(0);
    $("#questtest").val(0);
    for (var i = 0; i < paperStructure.length; i++) {
        var itemType = paperStructure[i].itemType;
        if (itemType == 0) {
            $("#singlenum").text(parseInt(paperStructure[i].itemCount));
            $("#singletest").val(paperStructure[i].scorePerItem);
        } else if (itemType == 1) {
            $("#multinum").text(parseInt(paperStructure[i].itemCount));
            $("#multitest").val(paperStructure[i].scorePerItem);
        } else if (itemType == 3) {
            $("#questnum").text(parseInt(paperStructure[i].itemCount));
            $("#questtest").val(paperStructure[i].scorePerItem);
        }
    }
    ;
    /*如果题型数量为0是时候对于的分值input为无法选择*/
    if ($("#singlenum").text() == 0) {
        $("#singletest").attr("disabled", true)
    } else {
        $("#singletest").attr("disabled", false)
    }
    if ($("#multinum").text() == 0) {
        $("#multitest").attr("disabled", true)
    } else {
        $("#multitest").attr("disabled", false)
    }
    if ($("#questnum").text() == 0) {
        $("#questtest").attr("disabled", true)
    } else {
        $("#questtest").attr("disabled", false)
    }

    $("#totalscore").text(parseInt($("#multinum").text()) * parseInt($("#multitest").val()) + parseInt($("#singlenum").text()) * parseInt($("#singletest").val()) + parseInt($("#questnum").text()) * parseInt($("#questtest").val()));
    $("#totalnum").text(parseInt($("#multinum").text()) + parseInt($("#singlenum").text()) + parseInt($("#questnum").text()));
    for (var i = 0; i < exTestItemList.length; i++) {
        var pStr = "";
        if (exTestItemList[i].type == 0) {
            pStr = "(单)";
        } else if (exTestItemList[i].type == 1) {
            pStr = "(多)";
        } else if (exTestItemList[i].type == 3) {
            pStr = "(问)";
        }
        $("<li/>").html("<a>×</a>" + pStr + exTestItemList[i].question).attr({
            "data-type": exTestItemList[i].type,
            "id": exTestItemList[i].id
        }).appendTo($("#selected_test ul"));
    }

}
//添加跳转
function toAdd() {
    $(".questionCont").hide()
    $(".managepage").show()
}
$("#operation_search_btn").on('click', function () {
    operationSearch()
})
//搜索列表
function operationSearch() {
    var question = $.trim($("#input_focus").val());
    var valStr = $("#infosel_type p").text();
    var itemType = null;
    if (valStr == "单选") {
        itemType = 0;
    } else if (valStr == "多选") {
        itemType = 1;
    } else if (valStr == "问答") {
        itemType = 3;
    }
    var param = {
        "question": question,
        "itemType": itemType
    };
    if ($("#id_job_type p").attr("data-value") > 0) {
        param.subjectId = $("#id_job_type p").attr("data-value");
    } else {
        param.subjectId = "";
    }

    listAll(param);
}
listAll();
function listAll(param) {
    $.ajax({
        type: "POST",
        url: contextPath + "/tib/listAll",
        dataType: "json",
        data: param,
        success: function (data) {
            var data = data.data;
            if (data != null) {
                var str = "";
                for (var i = 0; i < data.length; i++) {
                    var it = data[i].type;
                    var itStr = "";
                    if (it == 0) {
                        itStr = "(单)";
                    } else if (it == 1) {
                        itStr = "(多)";
                    } else if (it == 3) {
                        itStr = "(问)";
                    }
                    str += "<li id='" + data[i].id + "' data-type='" + data[i].type + "'>" + itStr + data[i].question + "</li>";
                }
                $("#unselected_test ul").html(str);
            }

        }
    });
};
//课程编辑
//获取树插件所有已选择的子节点
getSelectByAnsy($("#id_job_type ul"));
getSelectByAnsy($("#auto_post-infosel-item ul"), $("#auto_post-infosel-item p"));
//异步获取select列表
function getSelectByAnsy(selDom, initSelectP, pValue) {
    $.ajax({
        type: "post",
        url: contextPath + "/tib/subjectSelectList",
        data: {},
        success: function (msg) {
            if (msg.code == 1) {
                var data = msg.data;
                var html_str = "";
                for (var x in  data) {
                    if (initSelectP) {
                        if (pValue) {
                            initSelectP.attr('data-value', pValue.id).html(pValue.name + "<i></i>");
                        } else {
                            if (x == 0) {
                                initSelectP.attr('data-value', data[x].id).html(data[x].name + "<i></i>");
                            }
                        }
                    }
                    html_str += '<li><a data-value="' + data[x].id + '" href="#">' + data[x].name + '</a></li>';
                }
                selDom.append(html_str);
            }
        }
    });
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
    var selectNode = []; //使用类json格式数据返回selectNode = [{"id":1,"name":"1"},{"id":2,"name":"2"}]
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].isParent == false && typeof(nodes[i].id) == "string") { //判断该选中节点是否是父节点判断是不是最子节点，因为初始化的时候给最子节点的id添加了users，所以匹配是不是字符串类型
                var selectList = {}
                selectList.id = nodes[i].id.replace(/users/, ""); //替换id中的users返回给后台
                selectNode.push(nodes[i].id.replace(/users/, ""));
            }
        }
    }
    return selectNode;
};
function treeData(data, UserIds) {
    var orgId = $("#modalOrgName").attr("data-id");
    $("#treeData").attr("data-id");
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
            },
            chkDisabledInherit: false
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
        for (var h = 0; h < newTreeNode.length; h++) {
            if (data.data.users.length == 0) {
                newTreeNode[h].chkDisabled = true;
            } else {
                for (var n = 0; n < data.data.users.length; n++) {
                    if (newTreeNode[h].superId != 0) {
                        if (newTreeNode[h].superId != data.data.users[n].orgId) {
                            newTreeNode[h].chkDisabled = false;
                        }
                    }

                }
            }
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
            for (var f = 0; f < newTreeNode.length; f++) {
                if (typeof(newTreeNode[f].id) == "string") {
                    for (var h = 0; h < UserIds.length; h++) {
                        if (newTreeNode[f].id.replace(/users/, "") == parseInt(UserIds[h])) {
                            newTreeNode[f].checked = true;
                            newTreeNode[f].open = true;
                        }
                    }

                }
            }
        }
        $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
    }
};
//开始时间结束时间
laydate.skin('huanglv');
var examination_start = {
    elem: '#examination_start',
    format: 'YYYY-MM-DD hh:mm:ss',
    min: '1985-00-00', //设定最小日期为当前日期
    max: '2222-12-31', //最大日期
    istime: true,
    istoday: true,
    choose: function (datas) {
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
    choose: function (datas) {
        examination_start.max = datas; //结束日选好后，重置开始日的最大日期
    }
};
laydate(examination_start);
laydate(examination_stop);
/*组卷弹出层*/
var index = 0;
$("input[name='composetest_status']").on("focus", function () {
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
            area: ['1000px', '600px'],
            shadeClose: false,
            content: $('#manualcompose'),
            cancel: function (index) {
            },
            success: function (layero, index) {

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
            cancel: function (index) {
            },
            success: function (layero, index) {

            }
        });
    }
});
//考试对象弹出层
$("#targetUserIds").on("click", function () {
    var UserIds = selectedUsers;
    $.ajax({
        type: "post",
        url: basecontextPath + "/uuc/orgTreeWithSlaves",
        data: {userId: 0},
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                layer.open({
                    type: 1,
                    skin: 'layui-layer-molv', //皮肤
                    title: ['考试对象', "font-size:18px"],
                    area: ['450px', '450px'],
                    shadeClose: false,
                    content: $('#learn_object'),
                    cancel: treeData(data, UserIds),
                });
            }
        }
    });
});
//手动组卷分值变化、试题选择
var singlenum = multinum = questnum = 0;
$("#totalnum").text($('#selected_test li').length);
if ($("#selected_test li").length == 0) {
    $("#singlenum").text(singlenum);
    $("#multinum").text(multinum);
    $("#questnum").text(questnum);
} else {
    $("#selected_test li").each(function () {
        if ($(this).attr("data-type") == "0") {
            $("#singletest").attr("disabled", false)
            singlenum++;
        } else if ($(this).attr("data-type") == "1") {
            $("#multitest").attr("disabled", false)
            multinum++;
        } else if ($(this).attr("data-type") == "3") {
            $("#questtest").attr("disabled", false)
            questnum++;
        }
        $("#singlenum").text(singlenum);
        $("#multinum").text(multinum);
        $("#questnum").text(questnum);
        if (singlenum == 0) {
            $("#singletest").attr("disabled", true)
        } else {
            $("#singletest").attr("disabled", false)
        }
        if (multinum == 0) {
            $("#multitest").attr("disabled", true)
        } else {
            $("#multitest").attr("disabled", false)
        }
        if (questnum == 0) {
            $("#questtest").attr("disabled", true)
        } else {
            $("#questtest").attr("disabled", false)
        }
    });
}
var reg = new RegExp("^[0-9]+([.][0-9]){0,1}$");
//var reg = new RegExp("^[0-9]*$");
$("#totalscore").text(fomatFloat($('#singletest').val() * $("#singlenum").text()+ $('#multitest').val() * $("#multinum").text()+$('#questtest').val() * $("#questnum").text()));
$("#singletest").on("blur", function () {
    var index=null;
    if (!reg.test($(this).val())){
        layer.tips('请输入正确的数字！', '#singletest', {time: 1000, tipsMore: false});
        index=layer.tips();
    }else {
        if (index!=null){
            layerColse(index);
        }
        $("#totalscore").text(fomatFloat($('#singletest').val() * $("#singlenum").text()+ $('#multitest').val() * $("#multinum").text()+$('#questtest').val() * $("#questnum").text()));
    }

});
$("#multitest").on("blur", function () {
    var index=null;
    if (!reg.test($(this).val())){
        layer.tips('请输入正确的数字！', '#multitest', {time: 1000, tipsMore: true});
        index=layer.tips();
        return;
    }else {

        if (index!=null){
            layerColse(index);
        }
        $("#totalscore").text(fomatFloat($('#singletest').val() * $("#singlenum").text()+ $('#multitest').val() * $("#multinum").text()+$('#questtest').val() * $("#questnum").text()));
    }

});
$("#questtest").on("blur", function () {
    var index=null;
    if (!reg.test($(this).val())){
        layer.tips('请输入正确的数字！', '#questtest', {time: 1000, tipsMore: true});
        index=layer.tips();
        return;
    }else {
        if (index!=null){
            layerColse(index);
        }
        $("#totalscore").text(fomatFloat($('#singletest').val() * $("#singlenum").text()+ $('#multitest').val() * $("#multinum").text()+$('#questtest').val() * $("#questnum").text()));
    }
});
function fomatFloat(num){
    var f = parseFloat(num);
    if (isNaN(f)) {
        return;
    }
    return Math.round(f*Math.pow(10,1))/Math.pow(10,1);
}
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
            $("#singletest").attr("disabled", false)
            singlenum++;
        } else if ($(this).attr("data-type") == "1") {
            $("#multitest").attr("disabled", false)
            multinum++;
        } else if ($(this).attr("data-type") == "3") {
            $("#questtest").attr("disabled", false)
            questnum++;
        }
        $("#singlenum").text(singlenum);
        $("#multinum").text(multinum);
        $("#questnum").text(questnum);
    });
    $("#totalscore").text(parseInt($("#multinum").text()) * parseInt($("#multitest").val()) + parseInt($("#singlenum").text()) * parseInt($("#singletest").val()) + parseInt($("#questnum").text()) * parseInt($("#questtest").val()));});
//手动组卷删除已选试题
$("#selected_test").on("mouseover", "ul li", function () {
    $(this).find("a").show();
});
$("#selected_test").on("mouseleave", "ul li", function () {
    $(this).find("a").hide();
});
$("#selected_test").on("click", "ul li a", function () {
    $(this).parents("li").remove();
    $("#totalnum").text($('#selected_test li').length);
    var singlenum = multinum = questnum = 0;
    if ($("#selected_test li").length == 0) {
        $("#singlenum").text(singlenum);
        $("#multinum").text(multinum);
        $("#questnum").text(questnum);
    } else {
        $("#selected_test li").each(function () {
            if ($(this).attr("data-type") == "0") {
                singlenum++;
            } else if ($(this).attr("data-type") == "1") {
                multinum++;
            } else if ($(this).attr("data-type") == "3") {
                questnum++
            }
            $("#singlenum").text(singlenum);
            $("#multinum").text(multinum);
            $("#questnum").text(questnum);
        });
    };
    if (singlenum == 0) {
        $("#singletest").attr("disabled", true)
    } else {
        $("#singletest").attr("disabled", false)
    }
    if (multinum == 0) {
        $("#multitest").attr("disabled", true)
    } else {
        $("#multitest").attr("disabled", false)
    }
    if (questnum == 0) {
        $("#questtest").attr("disabled", true)
    } else {
        $("#questtest").attr("disabled", false)
    }
    $("#totalscore").text(parseInt($("#multinum").text()) * parseInt($("#multitest").val()) + parseInt($("#singlenum").text()) * parseInt($("#singletest").val()) + parseInt($("#questnum").text()) * parseInt($("#questtest").val()));});
//手动组卷确定按钮事件
var paperStructure = [];
$("#manualSubmit").on("click", function () {
    var testItemIds = [];
    $("#selected_test li").each(function () {
        testItemIds.push($(this).attr("id"));
    });
    if (testItemIds.length == 0) {
        layer.alert("选择要添加的考试题目");
        return;
    }
    if ($("#singlenum").text() && parseInt($("#singlenum").text()) > 0) {
        var siglePaperStructure = {};
        siglePaperStructure.itemType = 0;
        siglePaperStructure.scorePerItem = $("#singletest").val() ? parseInt($("#singletest").val()): 0;
        siglePaperStructure.itemCount = $("#singlenum").text();
        paperStructure.push(siglePaperStructure);
    }
    if ($("#multinum").text() && parseInt($("#multinum").text()) > 0) {
        var multiPaperStructure = {};
        multiPaperStructure.itemType = 1;
        multiPaperStructure.scorePerItem = $("#multitest").val() ? parseInt($("#multitest").val()) : 0;
        multiPaperStructure.itemCount = $("#multinum").text();
        paperStructure.push(multiPaperStructure);
    }
    if ($("#questnum").text() && parseInt($("#questnum").text()) > 0) {
        var questionPaperStructure = {};
        questionPaperStructure.itemType = 3;
        questionPaperStructure.scorePerItem = $("#questtest").val() ? parseInt($("#questtest").val()) : 0;
        questionPaperStructure.itemCount = $("#questnum").text();
        paperStructure.push(questionPaperStructure);
    }
    layer.close(index);
});
/*自动组卷提交*/
$("#autoSubmit").on("click", function () {
    layer.closeAll();
});

//考试对象确定按钮事件
$("#treeSubmit").on("click", function () {
    selectedUsers = getCheckNode();
    $("#targetUserIds").val("已选择" + getCheckNode().length + "人");
    layer.closeAll();
});
$("#passCount").click(function(){
    $(this).val('');
})
//v1.2
$("#submitsave").on("click", function () {
    var data = {
        name: $("#title").val(), //题目
        startTime: $("#examination_start").val() != "" ? $("#examination_start").val() : undefined, //开始时间
        endTime: $("#examination_stop").val() != "" ? $("#examination_stop").val() : undefined, //结束时间
        note: $("#note").val(), //考试须知
        createPaperMode: $("input[name='composetest_status']:checked").val(), //试卷类型
        passScore: $("#passCount").val()//及格分数
    };
    if (data.name == '') {
        layer.alert("请输入考试题目!");
        return;
    }
    if (data.startTime == undefined) {
        layer.alert("请输入考试开始时间!");
        return;
    }
    if (data.endTime == undefined) {
        layer.alert("请输入考试结束时间!");
        return;
    }
    if (data.note == '') {
        layer.alert("请输入考试须知!");
        return;
    }
    if (data.passScore == '') {
        layer.alert("请输入考试及格分数!");
        return;
    }
    if(data.createPaperMode==0){
        if(parseInt($("#passCount").val())>$("#totalscore").text()){
            layer.msg('及格分数大于总分啦');
            return
        }
    }else{
        if(parseInt($("#passCount").val())>parseInt($("#summation").val())){
            layer.msg('及格分数大于总分啦');
            return
        }
    }
    var testItemIds = [];
    var autoTestItems = [];
    //组卷数据
    if (data.createPaperMode == 0) {
        $("#selected_test li").each(function () {
            testItemIds.push($(this).attr("id"));
        });
        if (testItemIds.length < 0) {
            layer.alert("请选择添加的试题!");
            return;
        }
        data.paperStructure = JSON.stringify(paperStructure);
    } else {
        $("#questions_cont .questions_item").each(function (index) {
            var tmp_data = {};
            tmp_data.itemType = $(this).attr('data-types');
            tmp_data.subject = $(this).find('input[name="subject"]').attr('data_subjecttype');
            tmp_data.itemCount = $(this).find('input[name="itemCount"]').val();
            tmp_data.scorePerItem = $(this).find('input[name="scorePerItem"]').val();
            autoTestItems.push(tmp_data);
        });
        data.paperStructure = JSON.stringify(autoTestItems);
    }
    data.testItemIds = testItemIds;
    $("input[name='publishStatus']").each(function (index) {
        if ($(this).prop('checked')) {
            data.publishStatus = $(this).val();
        }
    });
    if ($("#targetUserIds").val() != "") {
        if (selectedUsers.length == 0) {
            layer.alert("请先选择要添加的考试对象");
            return;
        }
        var arrSelecter = [];
        for (var x = 0; x < selectedUsers.length; x++) {
            arrSelecter.push(selectedUsers[x]);
        }
        data.targetUserIds = JSON.stringify(arrSelecter); //考试对象
    } else {
        layer.alert("请先选择要添加的考试对象");
        return;
    }
    var url = null;
    var exam_id = $("#exam_id").val();
    if (exam_id != null && exam_id != '') {
        url = contextPath + '/exam/update';
        data.id = exam_id;
        data.examPaperId = $("#examPaperId").val();
        data.reviewResult = 0;
    } else {
        url = contextPath + '/exam/add';
    }
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        traditional: true,
        data: data,
        success: function (data) {
            if (data.code == 1) {
                layer.msg(data.msg);

            } else {
                layer.msg(data.msg);
            }
        }
    });
    returnback();
    $("#question_search_btn").click();
});
$("#add_questions").on("click", function () {
    var data = {};
    var question__types_data = 0;
    var question_data = $("#qusstion-types p").text();
    if (question_data == "单选") {
        question__types_data = 0;
    } else if (question_data == "多选") {
        question__types_data = 1;
    } else if (question_data == "问答") {
        question__types_data = 3;
    }
    var post_infosel_item = $("#auto_post-infosel-item p").text();
    /*类别*/
    var post_infosel_value = $("#auto_post-infosel-item p").attr("data-value");
    /*类别ID*/
    var questions_num = $("#multinum2").val();
    /*题目的数量*/
    /*未写下拉的标示ID*/
    var questions_score = $("#singletest2").val();
    /*每道题的分值*/
    var title_score = calculate(questions_num, questions_score);
    data.itemType = question__types_data;
    data.subjectId = post_infosel_value;
    data.itemCount = questions_num
    $.ajax({
        type: "POST",
        url: basecontextPath + "/tib/checkItemCountEnough",
        dataType: "json",
        data: data,
        success: function (data) {
            if (data.code == 1) {
                if (data.data.available == 1) {
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
                    calculate_num() /*计算总分数*/;
                    layer.msg('添加成功');
                } else {
                    layer.msg('该题型数量不足,请重新选择!');
                    return;
                }
            } else {
                layer.msg(data.msg);
                return;
            }
        }
    });


    $("#multinum2").val("");
    $("#singletest2").val("");
    $("#singlescore_auto").text("0");
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
    function calculate_num() {
        var summation = 0;
        $(".total_Points").each(function () {
            var a = $(this).val()
            summation += Number(a);
        })
        $("#summation").val(summation)
    }
    function delAuto(item) {
        $(item).parent(".questions_item").remove();
        calculate_num();
    }
    $("#multinum2").keyup(function () {
        $("#singlescore_auto").text(calculate());
    })
    $("#singletest2").keyup(function () {
        $("#singlescore_auto").text(calculate());
    })
});
$("#returnback").on('click', returnback);
function returnback() {
    $(".questionCont").show();
    $(".managepage").hide();
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
    $("#title").val(''); //考试的题目
    $("#targetUserIds").val('')//考试对象的人数.
    $("#examination_start").val('');//考试开始时间
    $("#examination_stop").val('');//考试结束时间
    $("#note").val('');//考试须知
    //考试添加的试卷(自动或者手动)
    $("input[name='composetest_status']").prop('checked', false);
    $("#passCount").val('');
    $("#questions_cont").empty();
    $("#autocompose").hide();
    $("#autocompose .test_result input").val("");
    $("#singlescore2").text(0);
    $("#multiscore2").text(0);
    $("#totalscore2").text(0);
    $("#summation").val('');
    $("#selected_test ul").empty();
    $("#singletest").val('')
    $("#multitest").val('')
    $("#questtest").val('')
}