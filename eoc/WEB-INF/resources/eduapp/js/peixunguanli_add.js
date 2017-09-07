var TrainTable = new tableDataOperation();
var dynamicData = null;
var exams=[];
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
//开始时间结束时间
laydate.skin('huanglv');
var infogroup_start = {
    elem : '#infogroup_start',
    format : 'YYYY-MM-DD hh:mm:ss',
    min : laydate.now(), //设定最小日期为当前日期
    max : '2099-06-16 23:59:59', //最大日期
    istime : true,
    istoday : true,
     choose: function (datas) {
     infogroup_stop.min = datas; //开始日选好后，重置结束日的最小日期
     infogroup_stop.start = datas; //将结束日的初始值设定为开始日
     }
};
var infogroup_stop = {
    elem : '#infogroup_stop',
    format : 'YYYY-MM-DD hh:mm:ss',
    min : laydate.now(), //设定最小日期为当前日期
    max : '2099-06-16 23:59:59', //最大日期
    istime : true,
    istoday : true,
    choose: function (datas) {
     infogroup_start.max = datas; //结束日选好后，重置开始日的最大日期
     }
};
laydate(infogroup_start);
laydate(infogroup_stop);

//初始化ztree，这里的初始化还用的以前的方法，给最子节点的id添加users用来区分节点id相同，将被选中的最子节点回显到树插件中
function initZtree(){
    $.getJSON(contextPath + "/uuc/orgTreeWithSlaves", function(data){
        if(data.code == 1){
            var newTreeNode = [];
            for(var i = 0; i < data.data.orgs.length; i++){//第一层循环给树插件添加组织结构节点
                var treeNodeData = {};
                if(data.data.orgs[i].superId == "0"){//使最根节点打开
                    treeNodeData.open = true;
                }
                for(var key in data.data.orgs[i]){
                    treeNodeData[key] = data.data.orgs[i][key];
                }
                newTreeNode[i] = treeNodeData;
            }
            for (var s = 0; s < newTreeNode.length; s++) {
                if (data.data.users.length == 0) {
                    newTreeNode[s].chkDisabled = true;
                } else {
                    for (var n = 0; n < data.data.users.length; n++) {
                        if (newTreeNode[s].superId != 0) {
                            if (newTreeNode[s].superId != data.data.users[n].orgId) {
                                newTreeNode[s].chkDisabled = false;
                            }
                        }

                    }
                }
            }
            for(var j = data.data.orgs.length; j < data.data.users.length + data.data.orgs.length; j++){//第二层循环给树插件添加最子节点人员信息
                var treeNodeData = {};
                for(var key in data.data.users[j - data.data.orgs.length]){
                    if(key == "id"){
                        treeNodeData[key] = data.data.users[j - data.data.orgs.length][key] + "users";//给id添加users
                    } else if(key == "orgId"){//将返回最子节点的父节点orgId参数名转成通用的superId
                        treeNodeData.superId = data.data.users[j - data.data.orgs.length][key];
                    } else if(key == "username"){//将返回最子节点的username参数名转成通用的name
                        treeNodeData.name = data.data.users[j - data.data.orgs.length][key];
                    } else {//其余参数保持原属性不变
                        treeNodeData[key] = data.data.users[j - data.data.orgs.length][key];
                    }
                }
                newTreeNode[j] = treeNodeData;
            }
            //回显选中的成员
            if(studentGroup[SerialNumber[0]].users != undefined){
                for(var f = 0; f < newTreeNode.length; f++){
                    if(typeof(newTreeNode[f].id) == "string"){
                        for(var h = 0; h < studentGroup[SerialNumber[0]].users.length; h++){
                            if(newTreeNode[f].id.replace(/users/, "") == studentGroup[SerialNumber[0]].users[h].id){//先替换树插件最子节点数据去除users之后和返回的数据比对，为被选中的节点添加checked属性
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
} //初始化ztree end

//手动组卷分值变化、试题选择，这里的自动组卷和手动组卷改成你现在改的那个样式吧！JS你也改掉吧！这个我还是用的我以前的我没有动这里，具体注释就不写了
//手动组卷分值变化、试题选择
var singlenum = multinum = questnum = 0;
//总题数
$("#totalnum").text($('#selected_test li').length);
//计算题数
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
            questnum++;
        }
        $("#singlenum").text(singlenum);
        $("#multinum").text(multinum);
        $("#questnum").text(questnum);
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
    var singlenum = multinum = questnum = 0;
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
    $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text() + $('#questtest').val() * $("#questnum").text());
});
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
    singlenum = multinum = questnum = 0;
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
    }
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
    $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text() + $('#questtest').val() * $("#questnum").text());
});
/*课程课件多个删除*/
var examConfigarr=[]
function addTable(data) {
    var tableList = ["name"];
    var tableListNone = ["id"];
    var operation = ["tableEdit", "tableDelete"];
    var title = ["编辑", "删除"];
    TrainTable.dataAdd(data, "addTrain_id", "itme", tableList, tableListNone, operation, title);
    tableEdit()
};
/*下拉列表加载*/
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
                $("#post-infosel-item ul").append(html_str);
            }
        }
    });
}


//考试手动组卷查询事件
$("#operation_search_btn").on('click', function () {
    operationSearch()
})
//搜索列表
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
/*手动组件加载待选列表方法*/
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
//考试添加事件
$("input[name='hasExam']").on("focus", function(){
    if($(this).val() == 1){
        $(this).prop("checked", true);
        $("#autocompose").hide();
        $("#manualcompose").show();
        examAddModal()
    }else if($(this).val() == 0){
        exams=[];
        layer.msg('数据已删除');
        $(this).parents("tr").remove();
        if (exams.length==0){
            $("#addTrain_id").hide();
        }
    }
});
/*标示ID 用于判断数据回显*/
var exam = [];
/*考试所有信息*/
var editData = [];
/*如果长度为0弹窗说明是添加如果不为0说明是编辑*/
/*存放手动组卷或者自动组卷 提交后的数据  也用于判断新增考试是数据编辑还是添加*/
function examAddModal(){
    layer.open({
        type : 1,
        skin : 'layui-layer-molv', //皮肤
        title : ["试卷", "font-size:18px"],
        area : ['1050px', '760px'],
        shadeClose : false,
        content : $('#infogroup_exam'),
        cancel : function(){
            $("#infogroup_exam_title , #infogroup_exam textarea,#examName,#infogroup_exam_passCount,#auto_title,#auto_digest,#examDescribe").val("");
            $("#selected_test ul").html("");
            $(".test_result p span b").text("");
            $(".test_result p span input").val("");
            $("#questions_cont").empty();
            $("input[name='composetest_examtest']").prop("checked", false)
        },
        success : function(){
            if($("input[name='hasExam']:checked").val() == 1){
                $("input[id='manual_radio']").prop('checked', true);
                $("#infogroup_exam_title").val("");
                $("#infogroup_exam_passCount").val("");
                $("#summation").val("");
                $("input[name='composetest_examtest']").focus(function(){
                    $("#summation").val("");
                    if($(this).val() == 0){//手动组卷
                        $(this).prop("checked", true);
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

                        $("#questnum").text(0);

                        $("#questtest").val('');
                        /*多选题每题的分值*/
                        $("#totalscore").text(0);
                        /*总分*/
                    } else if($(this).val() == 1){//自动组卷
                        $(this).prop("checked", true);
                        $("#autocompose").show();
                        $("#manualcompose").hide();
                        $("#add_auto_questions").on("click", function(){
                            showHandZj();//自动组卷添加试题
                        })
                    }
                })
            } else if($("input[name='hasExam']:checked").val() == 0){//不考试
                $(this).prop("checked", true);
            }
        }
    })
};
/*考试弹出框保存按钮事件，保存后将添加的内容填充到table表格*/
/*自动组卷增加*/
$("#add_questions").on("click", function () {
    var data={};
    var question__types_data = 0;
    var question_data = $.trim($("#qusstion-types p").text())
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
    var questions_score = $("#singletest2").val();
    /*每道题的分值*/
    /*未写下拉的标示ID*/
    var questions_num = $("#multinum2").val();
    /*题目的数量*/
    var questions_score = $("#singletest2").val();
    /*每道题的分值*/
    var title_score = calculate(questions_num, questions_score);
    data.itemType=question__types_data;
    data.subjectId=post_infosel_value;
    data.itemCount=questions_num
    $.ajax({
        type: "POST",
        url: basecontextPath + "/tib/checkItemCountEnough",
        dataType:"json",
        data: data,
        success: function(data){
            if(data.code ==1){
                if (data.data.available==1) {
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
                }else {
                    layer.msg('该题型数量不足,请重新选择!');
                    return;
                }
            }else {
                layer.msg(data.msg);
                return;
            }
        }
    });
    $("#multinum2").val("");
    $("#singletest2").val("");
    $("#singlescore2").text("0");
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
/*课程课件表格加载方法*/
function addTable(data) {
    var tableList = ["name"];
    var tableListNone = ["id"];
    var operation = ["tableEdit", "tableDelete"];
    var title = ["编辑", "删除"];
    TrainTable.dataAdd(data, "addTrain_id", "itme", tableList, tableListNone, operation, title);
    tableEdit()
};
function tableEdit() {
    $('.tableEdit').click(function (e){
        e.stopPropagation();
        var index = $(this).parent().parent().index();//获取tr索引值
            editData.push(index);
            examAddModal();
            examConfigFn(exams,index);
    });
    $('.tableDelete').click(function () {
        var index = $(this).parent().parent().index();
        //添加时的删除
            exams.splice(index, 1);
            layer.msg('数据已删除');
            $(this).parents("tr").remove();
        if (exams.length==0){
            $("#addTrain_id").hide();
        }
    });
};
/*手动数据按钮提交*/
function examConfigFn(examConfig,index){
    var TrainList = [];
        $("input[id='exam_ok']").prop('checked', true);//选中考试状态
        $("#infogroup_exam_title").val(exams[index].name);//考试名称
        $("#examDescribe").val( exams[index].note);//考试说明
        $("#passScore").val(exams[index].passScore);//及格分数
        $("#infogroup_exam_passCount").val(exams[index].passScore);//及格分数
    //}
    if (exams[index].createPaperMode == 0) {//手动组卷
        showHandZjv12(exams[index].testItemIds, exams[index].paperStructures);//回显手动数据
    } else if (exams[index].createPaperMode == 1) {//自动组卷
        showAutocreate(exams[index].paperStructures)//回显自动组件
    }
};
//回显手动组卷
function showHandZjv12(exTestItemList, paperStructure) {
    $("#manual_radio").prop('checked', 'true');
    $("#autocompose").hide();
    $("#manualcompose").show();
    //清空
    $("#selected_test ul").empty();
    $("#totalnum").text(0);
    $("#singlenum").text(0);
    $("#singletest").val(0);
    $("#multinum").text(0);
    $("#multitest").val(0);
    $("#questnum").text(0);
    $("#questtest").val(0);
    for (var x  in  paperStructure) {
        var itemType = paperStructure[x].itemType;
        if (itemType == 0) {
            $("#singlenum").text(paperStructure[x].itemCount);
            $("#singletest").val(paperStructure[x].scorePerItem);
        } else if (itemType == 1) {
            $("#multinum").text(paperStructure[x].itemCount);
            $("#multitest").val(paperStructure[x].scorePerItem);
        } else if (itemType == 3) {
            $("#questnum").text(paperStructure[x].itemCount);
            $("#questtest").val(paperStructure[x].scorePerItem);
        }
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
        $("<li/>").html("<a>×</a>" + pStr + exTestItemList[i].title).attr({
            "data-type": exTestItemList[i].type,
            "id": exTestItemList[i].id
        }).appendTo($("#selected_test ul"));
    }
}
//回显自动组卷
function showAutocreate(autotest) {
    $("#auto_radio").prop("checked", true);
    $("#autocompose").show();
    $("#manualcompose").hide();
    $("#auto_radio").prop('checked', 'true');//显示手动组卷按钮
    var questions_str = '';//试题列表
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
    $("#summation").val('');
    $("#questions_cont").append(questions_str);
    calculate_num();
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
}
$("#infogroup_exam_passCount").click(function(){
    $(this).val('');
})
var testItemIds = [];
var examConfig = {};
/*组件保存*/
$("#infogroup_exam_save").on("click",infosave);
function infosave(){
    if ($("#manual_radio").prop("checked") == true) {
        $("#selected_test li").each(function () {
            var testItemIdsData={};
            testItemIdsData.id=$(this).attr("id")
            testItemIdsData.type = $(this).attr("data-type");
            testItemIdsData.title = $(this).text().substr(4,$(this).text().length);
            testItemIds.push(testItemIdsData);
        });
        if (testItemIds.length == 0) {
            layer.alert("请选择要添加的考试");
            return;
        }
    } else if ($("#auto_radio").prop("checked") == true) {
        $(".questions_item").each(function () {
            testItemIds.push($(this).attr("data-types"));
        });
        if (testItemIds.length == 0) {
            layer.msg("请选择要添加的考试");
            return;
        }
    }
    if ($("#infogroup_exam_title").val() == '') {
        layer.msg('请输入试题名称');
        return
    }
    if ($("#infogroup_exam_passCount").val() == '') {
        layer.msg('请输入及格分数');
        return
    }
    if ($("#examDescribe").val() == '') {
        layer.msg('请输入考试说明');
        return
    }
    var createPaperMode = $("input[name='composetest_examtest']:checked").val(); //组卷类型
    if(createPaperMode==0){
        if(parseInt($("#infogroup_exam_passCount").val())>$("#totalscore").text()){
            layer.msg('及格分数大于总分啦');
            return
        }
    }else{
        if(parseInt($("#infogroup_exam_passCount").val())>parseInt($("#summation").val())){
            layer.msg('及格分数大于总分啦');
            return
        }
    }
    if(editData.length>0){
        exams.splice(editData[0],1);
    }
    //组卷数据
    var autoTestItems = [];
    //组卷数据
    var paperStructure = [];
    examConfig.createPaperMode = $("input[name='composetest_examtest']:checked").val();//试题是自动组卷还是手动组卷
    examConfig.name = $("#infogroup_exam_title").val();//试题的名字
    examConfig.note = $("#examDescribe").val();//试题的说明
    examConfig.passScore = $("#infogroup_exam_passCount").val();//试题及格分
    if (createPaperMode == 0) {
        if ($("#singlenum").text() && parseInt($("#singlenum").text()) > 0) {
            var siglePaperStructure = {};
            siglePaperStructure.itemType = "0";
            siglePaperStructure.scorePerItem = $("#singletest").val() ? $("#singletest").val() : 0;
            siglePaperStructure.itemCount = $("#singlenum").text();
            paperStructure.push(siglePaperStructure);
        }
        if ($("#multinum").text() && parseInt($("#multinum").text()) > 0) {
            var multiPaperStructure = {};
            multiPaperStructure.itemType = "1";
            multiPaperStructure.scorePerItem = $("#multitest").val() ? $("#multitest").val() : 0;
            multiPaperStructure.itemCount = $("#multinum").text();
            paperStructure.push(multiPaperStructure);
        }
        if ($("#questnum").text() && parseInt($("#questnum").text()) > 0) {
            var questionPaperStructure = {};
            questionPaperStructure.itemType = "3";
            questionPaperStructure.scorePerItem = $("#questtest").val() ? $("#questtest").val() : 0;
            questionPaperStructure.itemCount = $("#questnum").text();
            paperStructure.push(questionPaperStructure);
        }
        examConfig.paperStructures = paperStructure;//手动组卷试题ID
    } else {
        $("#questions_cont .questions_item").each(function () {
            var tmp_data = {};
            tmp_data.itemType = $(this).attr('data-types');
            tmp_data.subject = $(this).find('input[name="subject"]').attr('data_subjecttype');
            tmp_data.itemCount = $(this).find('input[name="itemCount"]').val();
            tmp_data.scorePerItem = $(this).find('input[name="scorePerItem"]').val();
            autoTestItems.push(tmp_data);
        });
        examConfig.paperStructures = autoTestItems;//自动组卷试题数据
    }
    examConfig.testItemIds = testItemIds;
    if ($("input[name='composetest_examtest']:checked").val() == 1) {//自动组卷
        delete examConfig.testItemIds
    }
    exams.push(examConfig);
    examConfig = {};
    $("#addTrain_id tbody").empty()
    /*重新加载表格数据*/
    var TrainList = [];
    for (var i = 0; i < exams.length; i++) {
        var c = {};
        c.name = exams[i].name;
        TrainList.push(c);
    }
    if ($("#toby").children().length > 0) {
        $("#toby").children().remove()
    }
    $("#examListTable").show();
    addTable(TrainList);
    tableEditFn();
    editData.length = 0;
    $("input[name='composetest_examtest']").prop("checked", false);
    $("#addTrain_id").show();
    testItemIds=[];
    layer.closeAll();
    clearData();
}
//考试弹出框返回按钮事件
$("#return_exam").on("click", function () {
    layer.closeAll();
    clearData();
})
//清空考试添加弹出框的内容
function clearData() {
    editData.length = 0;
    $("#infogroup_exam_title , #infogroup_exam textarea,#examName,#infogroup_exam_passCount,#auto_title,#auto_digest,#examDescribe").val("");
    $("#selected_test ul").html("");
    $(".test_result p span b").text("");
    $(".test_result p span input").val("");
    $("#questions_cont").empty();
    $("#selected_test ul").empty();
    $("input[name='composetest_examtest']").prop("checked", false)
}
/*表格编辑方法*/
function tableEditFn(){
    $(".table-edit").each(function(index){
        $(this).on("click", function(){
            editData.push(index);
            examAddModal();
        })
    })

}
//考试弹出框返回按钮事件
$("#infogroup_exam_returnback").on("click", function(){
    layer.closeAll();
    clearData();
})

//将添加保存的信息回显到考试添加页。
function editTr(obj){
    layer.open({
        type : 1,
        skin : 'layui-layer-molv', //皮肤
        title : ['考试', "font-size:18px"],
        area : ['980px', '760px'],
        shadeClose : false,
        content : $('#infogroup_exam'),
        success : function(){
            //写入对存储的信息在弹出框的回显
        }
    });
}
//将添加保存的信息清空并删除table这一行
function delTr(obj){
    $(obj).parents("tr").remove();
    $("").remove; //清空保存的信息，空余部分是存储信息的地方
}
//清空考试添加弹出框的内容
function clearData(){
    editData.length = 0;
    $("#infogroup_exam_title , #infogroup_exam textarea,#examName,#infogroup_exam_passCount,#auto_title,#auto_digest,#examDescribe").val("");
    $("#selected_test ul").html("");
    $(".test_result p span b").text("");
    $(".test_result p span input").val("");
    $("#questions_cont").empty();
    $("input[name='composetest_examtest']").prop("checked", false)
    editData.length = 0;
}

//缩略图>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//图片上传
$("#pic").on("click", "#fileimgupload", function(){
    $("#fileimg").click();
    getUploadImg("#fileimg", "#imgupload");
});
function getUploadImg(obj, obj2){
    $(obj).on("change", function(){
        var fileList = this.files[0];
        if(fileList == undefined){
            $(obj2).attr("src", "");
            $(obj2).hide();
            $(".image_close").show();
            return false;
        }
        if(!/image\/\w+/.test(fileList.type)){
            alert("请选择图片");
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(fileList);
        reader.onload = function(e){
            $(obj2).attr("src", e.target.result);
            $(obj2).show();
            $(".img-view").show();
            $(".image_close").show();
        }
    })
}
var imgArr = [];
$("#img_upload").on("click", function(){//input的file name必须为toUpload,否则拿不到值.....
    imgArr = [];
    var formData = new FormData($('#imgloadForm')[0]);
    $.ajax({
        url : basecontextPath + "/file/upload",
        type : 'POST',
        data : formData,
        async : false,
        cache : false,
        contentType : false,
        processData : false,
        dataType : 'json',
    }).done(function(res){
        layer.msg('上传成功');
        $(".img-view").show();
        imgArr.push(res.data);
    });
});
//删除上传的图片
$(".image_close").on('click', function(e){
    e.stopPropagation();
    e.preventDefault();
    $(".img-view").hide();
    $("#imgupload").attr('src', '');
    imgArr = [];
})

//信息组添加事件
var studentGroup = [];
var SerialNumber = [];
/*存放加载选项卡内容序列 遍历所对应的数据*/
/*存放信息组所有关得数据*/
$("#infogroup_add").on("click", function(){
    SerialNumber.length = 0;
    layer.open({
        type : 1,
        skin : 'layui-layer-molv', //皮肤
        title : ['信息组', "font-size:18px"],
        area : ['635px', '340px'],
        shadeClose : false,
        content : $('#infogroup_div'),
        success : function(){
            $("#infogroup_title").val("");
            $("#infogroup_describe").val("");
            $("#infogroup_start").val("");
            $("#infogroup_stop").val("");
        }
    });
});

var a = {};
/*存放当前用户组的所有信息！*/
$("#infogroup_div_save").on("click", function(){
    var infogroup_title = $("#infogroup_title").val(); //组名称
    var infogroup_describe = $("#infogroup_describe").val(); //组描述
    var infogroup_start = $("#infogroup_start").val(); //组开始时间
    var infogroup_end = $("#infogroup_stop").val(); //组结束时间
    var infoList = {};
    var basicInfo = {};
    if (infogroup_title==''){
        layer.msg("请填写组名称");
        return;
    }
    if (infogroup_describe==''){
        layer.msg("请填写组描述");
        return;
    }
    if (infogroup_start==''){
        layer.msg("请填写开始时间");
        return;
    };
    if (infogroup_end==''){
        layer.msg("请填写结束时间");
        return;
    }
    $(".infogroup_tab_content").show();
    /*信息组信息*/
    basicInfo.name = infogroup_title;
    basicInfo.digest = infogroup_describe;
    basicInfo.startTime = infogroup_start;
    basicInfo.endTime = infogroup_end;
    infoList.basicInfo = basicInfo
    a.basicInfo = basicInfo;
    if(SerialNumber.length == 0){
        var str = "<div class='info_list dis-inline' onclick='getIndex(this)'><input type='radio' name='radio'><div class='info_title'>" + basicInfo.name + "</div></div>";
        $("#infogroup_tab").append(str);
        studentGroup.push(a);

    } else {/*有用户组编辑*/
        if(SerialNumber.length != 0){
            delete studentGroup[SerialNumber].basicInfo;
            studentGroup[SerialNumber].basicInfo = basicInfo;
            $("#infogroup_tab").empty();
            var str = ""
            for(var i = 0; i < studentGroup.length; i++){
                str += "<div class='info_list dis-inline' onclick='getIndex(this)'><input type='radio' name='radio'><div class='info_title'>" + studentGroup[i].basicInfo.name + "</div></div>";
            }
            $("#infogroup_tab").append(str);
        }
    }
    a = {};
    layer.closeAll();
    if(studentGroup.length == 0){
        $("#infogroup_del").hide();
        $("#infogroup_edit").hide();

    } else {
        $("#infogroup_del").show();
        $("#infogroup_edit").show();
    }
    $("#infogroup_tabs_content").hide();

});
/*信息组删除*/
$("#infogroup_del").on("click", function(){

    $("#infogroup_tab .info_list input").each(function(index){
        var self = $(this)
        if(self.prop("checked") == true){
            self.parents(".info_list").remove();
            delete studentGroup.splice(index, 1);
        } else {
            layer.msg('请选择要删除的信息组！');
            return false;
        }
    })
    var a = $(".info_list").length;
    if(a <= 0){
        $("#infogroup_del").hide();
        $("#infogroup_edit").hide();
        $(".infogroup_tab_content").hide();
    }
})
/*信息组编辑*/
$("#infogroup_edit").on("click", function(){
    $("#infogroup_tab .info_list input").each(function(){
        var self = $(this)
        if(self.prop("checked") == true){
            layer.open({
                type : 1,
                skin : 'layui-layer-molv', //皮肤
                title : ['信息组', "font-size:18px"],
                area : ['635px', '340px'],
                shadeClose : false,
                content : $('#infogroup_div'),
                success : function(){
                    $("#infogroup_tab .info_list input").each(function(index){
                        var self = $(this)
                        if(self.prop("checked") == true){
                            $("#infogroup_title").val(studentGroup[index].basicInfo.name);
                            $("#infogroup_describe").val(studentGroup[index].basicInfo.digest);
                            $("#infogroup_start").val(studentGroup[index].basicInfo.startTime);
                            $("#infogroup_stop").val(studentGroup[index].basicInfo.endTime);
                        }
                    });

                }
            });
        }
    });


})
/*}*/
/*获取信息组名称的下标 并且显示对应的数据*/
function getIndex(item){
    SerialNumber.length = 0;
    var index = $("#infogroup_tab .info_list").index(item);
    SerialNumber.push(index);
    $("#infogroup_tabs_content").hide();
}
//信息组返回按钮事件
$("#infogroup_div_returnback").on("click", function(){
    layer.closeAll();
    $("#infogroup_div input, #infogroup_div textarea").val("");
})
//信息组选项卡切换
$("#infogroup_tabs span").on("click", function(){
    if(SerialNumber.length == 0){
        layer.msg("请选择用户组！");
        return false;
    }
    $(this).addClass("spanBg1 hover").siblings().removeClass("spanBg1 hover");
    var index = $("#infogroup_tabs span").index(this);
    $("#infogroup_tabs_content .infogroup_tabs_detail").eq(index).show().siblings().hide()
    $("#infogroup_tabs_content").show();
    /*组成员回显*/
    if(index == 0){
        if(studentGroup[SerialNumber[0]].users == undefined){/*无数据清空上次的 有数据加载*/
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
            var a = studentGroup[SerialNumber[0]].users;
            var str = ""
            for(var i = 0; i < a.length; i++){
                str += "<div class='userinFoList managepage_group dis-inline'> <label data-id='" + a[i].id + "'>" + a[i].name + "</label></div>"
            }
            $(".userInfoContList").append(str);
        }
    }
    /*课程回显*/
    if(index == 1){
        selectAll(searchTrime);
        if(studentGroup[SerialNumber[0]].courseCollections == undefined){
            $(".infogroup_tabs_detail_cont").show();
            $(".coursfoCont").hide();
            $(".course_ok").hide();
            $(".course_ok_select ul").empty();
            $("#course_selected_test ul").empty();
            $(".infogroup_tabs_detail_btn_cont").show();
        } else {
            $(".infogroup_tabs_detail_cont").hide();
            $(".coursfoCont").show();
            $(".course_ok").show();
            $(".course_ok_select ul").empty();
            var str = "";
            var b = studentGroup[SerialNumber[0]].courseCollections
            for(var i = 0; i < b.length; i++){
                str += " <li id='" + b[i].id + "' data-type='" + b[i].useExam + "'>" + b[i].name + "</li>"
            }
            $(".course_ok_select ul").append(str);
        }
    }

    /*考试时间回显*/
    if(index == 2){

        if(studentGroup[SerialNumber[0]].selectedExams == undefined){
            $(".examTimeContItem").hide();
            $("#examTimeConfirm").empty();
            $(".examTimeCont").show();
            $(".examTimeEdit").hide();
            bindExamTime();
        } else {
            $("#examTimeConfirm").empty();
            $(".examTimeContItem").show();
            $(".examTimeCont").hide();
            $(".examTimeEdit").show();
            var html = "";
            var c = studentGroup[SerialNumber[0]].selectedExams;
            for(var i = 0; i < c.length; i++){
                html += '<li id="' + c[i].id + '">';
                html += '<span class="examTimeConfirm_item">' + c[i].name + '</span>';
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
$("#treeSubmit").on("click", function(){
    var treeUers = modalUserName();
    var str = "";
    var list = "";
    var treeData = [];
    for(var i = 0; i < treeUers.length; i++){
        var a = {};
        str += "<div class='userinFoList dis-inline'> <a class='treeName' data-id='" + treeUers[i].id + "'>" + treeUers[i].name + "</a></div>"
        list += "<a class='treeName' data-id='" + treeUers[i].id + "'>" + treeUers[i].name + "</a>"
        a.name = treeUers[i].name;
        a.id = treeUers[i].id
        treeData.push(a)
    }
    $(".treeUserInfo").append(str);
    $(".userInfoContList").append(list);
    //modalUserName().id是选中人员的id，modalUserName().name是选中人员的name
    $(".treeInfoCont").show();
    $(".userInfoCont").show()
    $(".managepage_tree").hide();
    studentGroup[SerialNumber[0]].users = treeData;

})
/*组成员编辑*/
$("#treeEdit").on("click", function(){
    $(".userInfoContList").empty();
    $(".treeUserInfo").empty();
    $(".userInfoCont").hide();
    $(".treeInfoCont").hide();
    $(".managepage_tree").show();
    /* if (Train_id != null && Train_id != "") {
     delete dynamicData.data.studentGroup[SerialNumber[0]].userIds;
     } else {
     delete data.studentGroup[SerialNumber[0]].userIds;
     }*/
    initZtree();
    var str = "";
    for(var i = 0; i < studentGroup[SerialNumber[0]].users.length; i++){
        str += "<div class='userinFoList managepage_group dis-inline'> <label data-id='" + studentGroup[SerialNumber[0]].users[i].id + "'>" + studentGroup[SerialNumber[0]].users[i].name + "</label></div>"
    }
    $(".treeUserInfo").append(str);

})
//获取树插件所有已选择的子节点
function modalUserName(){
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var selectNode = []; //使用类json格式数据返回selectNode = [{"id":1,"name":"1"},{"id":2,"name":"2"}]
    if(nodes.length > 0){
        for(var i = 0; i < nodes.length; i++){
            if(nodes[i].isParent == false && typeof(nodes[i].id) == "string"){ //判断该选中节点是否是父节点判断是不是最子节点，因为初始化的时候给最子节点的id添加了users，所以匹配是不是字符串类型
                var selectList = {}
                selectList.id = nodes[i].id.replace(/users/, ""); //替换id中的users返回给后台
                selectList.name = (nodes[i].name); //获取选中节点的名称
                selectNode.push(selectList);
            }
        }
    }
    return selectNode;
}
//考试时间添加，根据考试那个表格获取当前考试名称，给名称填充事件
function bindExamTime(){
    $("#examTimeList").html(""); //先清空数据再把遍历获取到的数据append进dom节点，清空防止多次点击多次添加
    $("#addTrain_id tbody tr").each(function(index){
        var html = "";
        html += '<li>'
        html += '<input type="checkbox" name=""  style="width: 16px;height: 16px;vertical-align: middle;">';
        html += '<span data-id="' + $(this).children("td").eq(2).text() + '">' + $(this).children("td").eq(1).text() + '</span>';
        //html += '<input type="text" id="infogroup_start' + index + '" class="input-focus examtimestart" placeholder="请输入考试开始时间" value="" onclick="laydate({istime:true,istodat:false,min:laydate.now(),max:\'2099-06-16 23:59:59\',format:\'YYYY-MM-DD hh:mm:ss\'})"/>'; //onclick方法是无法给input绑定上laydate事件写在元素内部，现在无法实现开始时间必须小于结束时间
        //html += '<input type="text" id="infogroup_stop' + index + '" class="input-focus examtimestop" placeholder="请输入考试结束时间" value="" onclick="laydate({istime:true,istodat:false,min:laydate.now(),max:\'2099-06-16 23:59:59\',format:\'YYYY-MM-DD hh:mm:ss\'})"/>';
        html += '</li>';
        $("#examTimeList").append(html);
    });
}
//考试时间保存事件，具体值已经获取到了，试卷名称是$(this).find("span").text()，考试开始时间$(this).find("#infogroup_start"+index).val()，考试结束时间$(this).find("#infogroup_stop"+index).val()
//获取具体值的方法需要在遍历方法里取
$("#examTimeList_save").on("click", function(){
    $("#examTimeConfirm").html("");
    var groupExamsData = []
    $("#examTimeList li").each(function(index){
        if($(this).find("input").prop("checked") == true){
            var a = {
                name : $(this).find("span").text(),
                startTime : $(this).find("#infogroup_start" + index).val(),
                endTime : $(this).find("#infogroup_stop" + index).val()
            };
            var startTime = $(this).find("#infogroup_start" + index).val();
            var endTime = $(this).find("#infogroup_stop" + index).val()
            groupExamsData.push(a)
            var html = "";
            html += '<li id="' + 1 + index + '">';
            html += '<span class="examTimeConfirm_item">' + $(this).find("span").text() + '</span>';
            //html += '<span class="examTimeConfirm_item">' +startTime+ '</span>';
            //html += '<span style="width:10px;display:inline-block;color: #000000;margin-left: 0;margin-right: 0">至</span>';
            //html += '<span class="examTimeConfirm_item">' +endTime +'</span>';
            html += '</li>';
            $("#examTimeConfirm ").append(html);
        }
        ;
    });
    if(studentGroup[SerialNumber[0]] == undefined){
        layer.msg("请选择用户组！");
        return false;
    } else {
        studentGroup[SerialNumber[0]].selectedExams = groupExamsData;
    }
    $(".examTimeEdit").show();
    /*编辑按钮显示*/
    $(".examTimeCont").hide();
    $(".examTimeContItem").show()
})
/*考试时间编辑事件*/
$("#examTimeEdit").on("click", function(){
    bindExamTime()
    var checked = [];
    /*存放选中的数据ID*/
    $("#examTimeConfirm li").each(function(){
        checked.push($(this).attr("id"))
    });
    $("#examTimeList li").each(function(){
        if(jQuery.inArray($(this).attr("id"), checked) > -1){
            $(this).find("input").prop("checked", true);
        }
    })
    $("#examTimeConfirm").empty();
    $(".examTimeCont").show();
    $(".examTimeEdit").hide();
    $(".examTimeContItem").hide();
    delete studentGroup[SerialNumber[0]].selectedExams;
})


/*选项卡课程条件搜索事件*/
var searchTrime = {};
$("#infogroup_tabs_detail_search_btn").on("click", function(){
    var searchVal = $("#infogroup_val").val();
    searchTrime.name = searchVal;
    selectAll(searchTrime);
})
/*选项卡课程无条件搜索事件*/
function selectAll(param){
    $.ajax({
        type : "POST",
        url: contextPath + "/courseCollection/collectionListHasExam",
        dataType : "json",
        data : param,
        success : function(data){
            if(data != null){
                var str = "";
                for(var i = 0; i < data.data.length; i++){
                    if(data.data[i].hasExam == 1){
                        str += " <li id='" + data.data[i].id + "' data-type='" + data.data[i].hasExam + "'>" + data.data[i].name + "<span><input type='checkbox'  class='select' /></span></li>";
                    } else if(data.data[i].hasExam == 0){
                        str += " <li id='" + data.data[i].id + "' data-type='" + data.data[i].hasExam + "'>" + data.data[i].name + "<span></span></li>";
                    }
                }
                if(str.length > 0){
                    $("#course_unselected_test ul").html(str);
                }
            }

        }
    });
}
/*选项卡课程选中事件*/
$("#course_unselected_test").on("click", "ul li", function(){
    var txt = $(this).text();
    var dataflag = $(this).find("input").prop("checked");
    var useExam = 0;
    if(dataflag == false || dataflag == undefined){
        useExam = 0;
    } else {
        useExam = 1;
    }
    var itemId = $(this).attr("id");
    var flag = flagnum = 0;
    if($("#course_selected_test li").length == 0){
        var newLi = $("<li/>").html("<a>×</a>" + txt).attr({
            "data-type" : useExam,
            "id" : itemId
        }).appendTo($("#course_selected_test ul"));
    } else {
        $("#course_selected_test li").each(function(){
            if($(this).attr("id") != itemId){
                flagnum++;
            }
        });
        if(flagnum == $("#course_selected_test li").length){
            flag = 1;
            flagnum = 0;
        } else {
            flag = 0;
        }
        if(flag == 1){
            var newLi = $("<li/>").html("<a>×</a>" + txt).attr({
                "data-type" : useExam,
                "id" : itemId
            }).appendTo($("#course_selected_test ul"));
        }
    }
});
/*已选课程删除事情*/
//手动组卷删除已选试题
$("#course_selected_test").on("mouseover", "ul li", function () {
    $(this).find("a").show();
});
$("#course_selected_test").on("mouseleave", "ul li", function () {
    $(this).find("a").hide();
});
$("#course_selected_test").on("click", "ul li a", function(){
    $(this).parents("li").remove();
})
/*课程保存*/
$("#course_ok").on("click", function(){
    var courseCollections = []
    var str = "";

    $("#course_selected_test li").each(function(){
        var a = {
            id : $(this).attr("id"),
            name : $(this).text().substring(1),
            useExam : Number($(this).attr("data-type"))
        };
        courseCollections.push(a);
        str += " <li id='" + $(this).attr("id") + "' data-type='" + $(this).attr("data-type") + "'>" + $(this).text().substring(1) + "</li>"
    });
    $(".course_ok_select ul").append(str);
    studentGroup[SerialNumber[0]].courseCollections = courseCollections;
    $(".infogroup_tabs_detail_cont").hide();
    $(".coursfoCont").show();
    $(".course_ok").show();
});
/*课程编辑
 取到序列号后先删除对应的数据在添加
 * */
$("#courseEdit").on("click", function(){
    $(".course_ok_select ul").empty();
    $(".infogroup_tabs_detail_cont").show();
    $(".coursfoCont").hide();
    $(".course_ok").hide();
    $("#course_selected_test ul").empty()
    selectAll();
    var a = studentGroup[SerialNumber[0]].courseCollections;
    for(var i = 0; i < a.length; i++){
        var newLi = $("<li/>").html("<a>×</a>" + a[i].name).attr({
            "data-type" : a[i].useExam,
            "id" : a[i].id
        }).appendTo($("#course_selected_test ul"));
    }
    delete a;
})

$("#submitsave").on("click", function(){
    var dataSub={};
    if($("#title").val() == ""){
        layer.msg('请输入培训题目');
        return false;
    }
    dataSub.name = $("#title").val()
    if($("#digest").val() == ""){
        layer.msg('请输入培训简介');
        return false;
    }
    dataSub.digest = $("#digest").val();
    //考试
    if ($("input[id='exam_ok']:checked")) {
        dataSub.hasExam = 1;
    } else {
        dataSub.hasExam = 0;
    }
    //缩略图
    if(imgArr.length==0){
        layer.msg("请选择上传图");
        return;
    }
    dataSub.coverImg = imgArr;
    dataSub.publishStatus = $("input[name='publishStatus']:checked").val() == 1 ? 1 : 0;

    var ItemIds=[];
    for(var i = 0; i < exams.length; i++){
        if(exams[i].createPaperMode==0){
            for(var j = 0; j < exams[i].testItemIds.length; j++){
                ItemIds.push(exams[i].testItemIds[j].id);
            }
            delete exams[i].testItemIds;
            exams[i].testItemIds=ItemIds;
        }
    };
    dataSub.exams=exams;
    //if(exams.length==0){
    //    layer.msg('请添加培训考试');
    //    return;
    //}
    if(studentGroup.length==0){
        layer.msg('请添加信息组');
        return;
    }
    for(var i = 0; i < studentGroup.length; i++){
        var users = [];
        for(var j = 0; j < studentGroup[i].users.length; j++){
            users.push(studentGroup[i].users[j].id)
        }
        delete studentGroup[i].users;
        studentGroup[i].userIds = users;
    }
    /*删除组成员的name*/
    dataSub.studentGroups = studentGroup;
    var url = contextPath + '/train/add';
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify(dataSub),
        success: function (data) {
            if (data.code == 1) {
                layer.msg('添加成功');
                clearData();
                window.location.href = basecontextPath + "/train/index";
            } else {
                layer.msg(data.msg);
            }
            }
    });
})
$("#returnback").on("click", function(){
    window.location.href = basecontextPath + "/train/index";
})