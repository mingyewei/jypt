/**
 * Created by weimingye on 2017/3/20.
 */
var questTable = new tableDataOperation();
var questTable1 = new tableDataOperation();
//这是试卷评分;
var flag = 0;//标记默认状态是考试列表页,flag=1是考试人员列表页,flag=2是考试人员详情页.
searchBtn();
$("#mark_papers_search").on("click", searchBtn);
function searchBtn() {
    flag = 0;
    var dataUrl = "/exam/markList";//试题分类地址
    var data = {};
    /*题目*/
    var test_mark = $.trim($("#test_mark").val());
    /*试题名称*/
    var typeShowType = $("#test_type p").text();
    /*考试类别*/
    var test_title = $.trim($("#test_title").val());//试题题目
    var type = "";
    if (typeShowType == "培训考试") {
        type = 2;
    } else if (typeShowType == "课程考试") {
        type = 1;
    } else if (typeShowType == "普通考试") {
        type = 0;
    }
    data.examName = test_mark || '';
    data.examType = type;
    data.typeInstanceName = test_title
    data.currentPage = 1;
    data.pageSize = 10;
    tableData(dataUrl, data, 'question_page');
}
function tableData(dataUrl, data, question_page) {
    $.ajax({
        type: "post",
        url: contextPath + dataUrl,
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                laypage({
                    cont: question_page,
                    pages: Math.ceil(data.data.total / data.data.pageSize), /*总页数*/
                    curr: data.data.currentPage || 1, /*当前页*/
                    jump: pageCallback
                })
            } else if (data.code == 2) {
                layer.msg(data.msg);
                $("tbody").empty();
                $("#question_page").empty();
                $("#question_page1").empty();

            }
        }
    });
    /**
     * 分页回调函数
     * @param obj
     * @param first
     */
    function pageCallback(obj, first) {
        data.currentPage = obj.curr;
        data.pageSize = 10;
        $.ajax({
            type: "post",
            url: contextPath + dataUrl,
            dataType: "json",
            data: data,
            success: function (data) {
                if (data.code == 1) {
                    /*url 搜索条件数据提交的地址*/
                    if (flag == 0) {//考试列表页
                        sccFunction(data);
                        /*全选*/
                        questTable.checkBoxAll("table-dataallcheck");
                        tableEditFn();
                    } else if (flag == 1) {//考试对象列表页
                        graFunction(data);
                        gradedFn()
                    }
                    $("#table-dataallcheck").removeClass("check-current");
                    $("#table-dataallcheck").attr("data-check", "");
                }
            }
        })
    };
    /**
     * 动态加载表格方法
     * @param data
     * @param url 查询地址
     */
    function sccFunction(data) {
        $("#table_id tbody").empty();
        /*显示数据的ID*/
        var tableList = ["examName", "examType", "typeInstanceName"];
        /*隐藏数据的ID*/
        var tableListNone = ["id"];
        /*表格展示数据的List*/
        var dataList = data.data.data;
        var sun_page = data.data.total;
        $("#sum_page span").text(sun_page);
        if (dataList == null || dataList == undefined) {
            //layer.msg('没有任何可加载的数据')
            dataList = [];
        } else {
            for (var i = 0, len = dataList.length; i < len; i++) {
                if (dataList[i].examType == 0) {
                    dataList[i].examType = "培训考试"
                } else if (dataList[i].examType == 1) {
                    dataList[i].examType = "课程考试"
                } else if (dataList[i].examType == 2) {
                    dataList[i].examType = "其他考试"
                }
            }
        }
        /*添加数据*/
        var operation = ["table-edit"];
        var title = ["查看"];
        questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
        /*单个点击删除*/
        //questTable.singDel("id", "table_id", contextPath+"/course/delete","#mark_papers_search");
    }

    function graFunction(data) {
        $("#table_id1 tbody").empty();
        /*显示数据的ID*/
        var tableList1 = ["userName", "commit", "commitTime", "markStatus", "score", "pass"];
        /*隐藏数据的ID*/
        var tableListNone1 = ["id"];
        /*表格展示数据的List*/
        var dataList1 = data.data.data;
        var sun_page = data.data.total;

        $("#sum_page1 span").text(sun_page);
        if (dataList1 == null || dataList1 == undefined) {
            //layer.msg('没有任何可加载的数据')
            dataList1 = [];
        } else {
            for (var i = 0, len = dataList1.length; i < len; i++) {
                if (dataList1[i].commit == 0) {
                    dataList1[i].commit = '否';

                } else {
                    dataList1[i].commit = '是';
                }
                if (dataList1[i].pass == 1) {
                    dataList1[i].pass = '是';
                } else {
                    dataList1[i].pass = '否';
                }
                if (dataList1[i].markStatus == 0) {
                    dataList1[i].markStatus = '未评分'
                } else if (dataList1[i].markStatus == 1) {
                    dataList1[i].markStatus = '已评分'
                }
                if (typeof dataList1[i].commitTime == 'undefined') {
                    dataList1[i].commitTime = '';
                }
                if (typeof dataList1[i].markStatus == 'undefined') {
                    dataList1[i].markStatus = '';
                }
            }
        }
        /*添加数据*/
        var operation1 = ["tableDetail"];
        var title1 = ["评分"];
        questTable1.dataAdd(dataList1, "table_id1", "itme", tableList1, tableListNone1, operation1, title1);
    }
}
//查看考试对象列表
var getEditId = null;
function tableEditFn() {
    $(".table-edit").on("click", function (e) {
        e.stopPropagation();
        var self = this;
        getEditId = singleId(self, "id");
        $(".questionCont").hide();
        $(".test-object").show();
        getEditExam()

    });
};
function getEditExam() {
    var data = {};
    data.id = getEditId;
    var pass = $("#Conformity p").text();
    var markStatus = $("#Status p").text();
    var commit = $("#assignment p").text();
    /*判断题目类型*/
    if (pass == "全部") {
        data.pass = '';
    } else if (pass == "不合格") {
        data.pass = 0;
    } else if (pass == "合格") {
        data.pass = 1;
    }
    if (markStatus == "全部") {
        data.markStatus = '';
    } else if (markStatus == "未评分") {
        data.markStatus = 0;
    } else if (markStatus == "已评分") {
        data.markStatus = 1;
    }
    if (commit == "全部") {
        data.commit = '';
    } else if (commit == "未交卷") {
        data.commit = 0;
    } else if (commit == "已交卷") {
        data.commit = 1;
    }
    var dataUrl = "/exam/markMemberList";//试题列表地址
    flag = 1;
    tableData(dataUrl, data, 'question_page1');
}
$("#Search_graded").on("click", function () {
    getEditExam();
})
var dataList = [];
//返回考试评分详情页
var scoresingle = 0;
var scoremult = 0;
var scorequest = 0;
var userPassScore=0;
function gradedFn() {
    $(".tableDetail").on("click", function (e) {
            $(".test-object").hide();
            $(".details").show();
            e.stopPropagation();
            var self = this;
            var getId = singleId(self, "id");
            var data = {};
            data.recordId = getId;
            var dataUrl = contextPath + "/exam/userPaperDetail";//试题评分详情页
            $(".test-object").hide();
            $(".details").show();
            $("#singleScore").text(0);
            $("#multScore").text(0);
            $("#questScore").text(0);
            $.ajax({
                type: "post",
                url: dataUrl,
                dataType: "json",
                data: data,
                success: function (data) {
                    if (data.code == 1) {
                        $(".username").text(data.data.userName);
                        if (data.data.commitStatus == 0) {
                            $(".details-sub").hide();
                        } else if (data.data.commitStatus == 1) {
                            $(".details-sub").show();
                        }
                        $("#details_id").text(data.data.userId);//返回考试人员的id
                        $("#page_title").text(data.data.name);//返回考试的题目
                        $("#page_note").text(data.data.note);//返回考试须知
                        dataList = data.data.paperStructures;
                        for (var q = 0; q < dataList.length; q++) {
                            if (dataList[q].itemType == 0) {//试题类别
                                var singleList = '';
                                var strau = '';
                                $("#singleScore").text(dataList[q].itemTypeTotalScore);
                                for (var i = 0; i < dataList[q].items.length; i++) {
                                    if (dataList[0].items[i].userAnswer == undefined || dataList[0].items[i].userAnswer.length == 0) {
                                        strau = '未解答';
                                    } else {
                                        if (dataList[0].items[i].correct == 1) {
                                            strau = '回答正确';
                                        } else {
                                            strau = '回答错误';
                                        }
                                    }
                                    if (dataList[0].items[i].score == undefined) {
                                        scoresingle += 0;
                                    } else {
                                        scoresingle += Number(dataList[0].items[i].score);
                                    }
                                    var listckeck = JSON.parse(dataList[0].items[i].optionStr);//选项
                                    var strcheck = '';
                                    for (var k = 0; k < listckeck.length; k++) {
                                        if (dataList[0].items[i].userAnswer == undefined) {
                                            strcheck += '<li><span>' + listckeck[k].code + '、' + '</span><p>' + listckeck[k].value + '</p></li>';
                                        } else if (dataList[0].items[i].userAnswer[2] == listckeck[k].code) {
                                            strcheck += '<li><span class="details-check">' + listckeck[k].code + '、' + '</span><p  class="details-check">' + listckeck[k].value + '</p></li>';
                                        } else {
                                            strcheck += '<li><span>' + listckeck[k].code + '、' + '</span><p>' + listckeck[k].value + '</p></li>';

                                        }
                                    }
                                    var usercusingle = dataList[0].items[i].correctAnswer;
                                    usercusingle = JSON.parse(usercusingle);
                                    singleList += '<div class="details-test"><span class="dis-none">' + dataList[0].items[i].id + '</span><p>' + (i + 1) + '、' + dataList[0].items[i].question + '</p>' +
                                        '<ul>' +
                                        strcheck +
                                        '</ul>' +
                                        '<span class="Scoring-details-underline"></span>' +
                                        '<i class="call-null-answers">' + strau + '！</i>' +
                                        '<span class="details-answers">' + usercusingle[0] + '、' + '</span>' +
                                        '<i class="right-answers">正确答案:</i>' +
                                        '</div>';
                                }
                                $("#Papersingle .details_select").append(singleList);
                            } else if (dataList[q].itemType == 1) {
                                var singleListm = '';
                                var straum = '';
                                $("#multScore").text(dataList[q].itemTypeTotalScore);
                                for (var o = 0; o < dataList[q].items.length; o++) {
                                    if (dataList[q].items[o].userAnswer == undefined || dataList[q].items[o].userAnswer.length == 0) {
                                        straum = '未解答';
                                    } else {
                                        if (dataList[q].items[o].correct == 0) {
                                            straum = '回答错误';
                                        } else {
                                            straum = '回答正确';
                                        }
                                    }
                                    if (dataList[q].items[o].score == undefined) {
                                        scoremult += 0
                                    } else {
                                        scoremult += Number(dataList[q].items[o].score);
                                    }
                                    var userAnswer = dataList[q].items[o].userAnswer;
                                    var listckeckm = JSON.parse(dataList[q].items[o].optionStr);
                                    var strcheckm = '';
                                    var code = [];
                                    if (userAnswer != undefined) {
                                        for (var t = 0; t < userAnswer.length; t++) {
                                            code.push(userAnswer[t])
                                        }
                                        for (var s = 0; s < listckeckm.length; s++) {
                                            if (jQuery.inArray(listckeckm[s].code, code) > -1) {
                                                strcheckm += '<li><span class="details-check">' + listckeckm[s].code + '、' + '</span><p  class="details-check">' + listckeckm[s].value + '</p></li>';
                                            } else {
                                                strcheckm += '<li><span>' + listckeckm[s].code + '、' + '</span><p>' + listckeckm[s].value + '</p></li>';
                                            }
                                        }
                                    }else{
                                        for(var cf=0;cf<listckeckm.length;cf++){
                                            strcheckm += '<li><span>' + listckeckm[cf].code + '、' + '</span><p>' + listckeckm[cf].value + '</p></li>';
                                        }
                                    }
                                    var usercurrent = dataList[q].items[o].correctAnswer;
                                    usercurrent = JSON.parse(usercurrent);
                                    var rightAn = '';
                                    for (var u = 0; u < usercurrent.length; u++) {
                                        rightAn += usercurrent[u] + '、';
                                    }
                                    singleListm += '<div class="details-test"><span class="dis-none">' + dataList[q].items[o].id + '</span><p>' + (o + 1) + '、' + dataList[q].items[o].question + '</p>' +
                                        '<ul>' +
                                        strcheckm +
                                        '</ul>' +
                                        '<span class="Scoring-details-underline"></span>' +
                                        '<i class="call-null-answers">' + straum + '！</i>' +
                                        '<span class="details-answers">' + rightAn + '</span>' +
                                        '<i class="right-answers">正确答案:</i>' +
                                        '</div>';
                                }
                                $("#PaperMulti .details_select").append(singleListm);
                            }
                            else if (dataList[q].itemType == 3) {
                                var questList = '';
                                $("#questScore").text(dataList[q].itemTypeTotalScore);
                                for (var x = 0; x < dataList[q].items.length; x++) {
                                    var a = dataList[q].items[x].score;
                                    if (a == undefined) {
                                        a = 0;
                                    }
                                    if (dataList[q].items[x].score == undefined) {
                                        scorequest += 0
                                    } else {
                                        scorequest += parseInt(dataList[q].items[x].score);
                                    }
                                    var listckeckq
                                    if (typeof (dataList[q].items[x].userAnswer) == 'undefined' || dataList[q].items[x].userAnswer.length == 0) {
                                        listckeckq = '未解答'
                                    } else {
                                        listckeckq = JSON.parse(dataList[q].items[x].userAnswer);
                                    }
                                    var userAnser = dataList[q].items[x].userAnswerId || '';
                                    var strCheck = '未审核'
                                    if (dataList[q].items[x].markStatus == 0) {
                                        strCheck = '未审核';
                                    } else {
                                        strCheck = '已审核';
                                    }
                                    questList += ' <div class="details-test">' +
                                        '<p>' + (x + 1) + '、' + dataList[q].items[x].question + '</p>' +
                                        '<div><span>学员答案 :</span><i>' + listckeckq + '</i></div>' +
                                        '<div><span class="details-reference">参考答案 :</span><i>' + JSON.parse(dataList[q].items[x].correctAnswer)[0] + '</i></div>' +
                                        '</div>' +
                                        '<div class="audit-status">' +
                                        '<span class="details-nopass">' + strCheck + '</span>' +
                                        '<p>得分 : </p><input class="details-notext" type="text" value="' + a + '">' +
                                        '<p class="details-fen">分</p>' +
                                        '<span class="details-recompose">确定</span>' +
                                        '<span class=" textId" data-id="' + userAnser + '" style="display: none;">' + dataList[q].items[x].id + '</span>' +
                                        '</div>';

                                }
                                $("#Paperquest .details_select").append(questList);
                            }
                        }
                        $("#details_score").text(scoresingle + scoremult);//选择题总分
                        $("#total_score").text(scorequest);//问答题总分
                        $("#Scoring_details").text(scoresingle + scoremult + scorequest);//总得分
                        if (data.data.commitStatus == 0) {
                            $(".Qualified").text("未解答");
                            $(".audit-status").hide();
                        } else if (data.data.commitStatus == 1) {
                            userPassScore=data.data.passScore;
                            $(".audit-status").show();
                            if (data.data.score >= data.data.passScore) {
                                $(".Qualified").text("合格");
                            } else {
                                $(".Qualified").text("不合格");
                            }
                        }

                    }
                    dataList = [];
                }

            })

        }
    )
}
var fs_scores;
var score=0;
$("body").delegate(".details-recompose", "click", function () {
    if ($(this).text() == '确定') {
        $("body .details-notext").each(function(){
            score+=Number($(this).val());
        });
        if (score>Number($("#questScore").text())){
            layer.msg('分数不能超问答题总分啦!');
            return;
        }
        var r = /^(0|[1-9]\d?|100)$/;
        fs_scores = r.test($(this).siblings(".details-notext").val());
        if (fs_scores) {
            $(this).siblings(".details-nopass").text('已审核');
            $(this).text("修改");
            $(this).siblings(".details-notext").attr("readonly", "readonly").css("border", "none");
            var data = {};
            data.userId = $("#details_id").text() || '';
            data.score = $(this).siblings(".details-notext").val() || '';
            data.userAnswerId = $(this).siblings(".textId").attr('data-id') || '';
            data.paperItemId = $(this).siblings(".textId").text() || '';
            subScore(data);
        } else {
            layer.msg('请输入1-100的分数');
        }
    } else {
        score=0;
        $(this).siblings(".details-nopass").text('未审核');
        $(this).text("确定");
        $(this).siblings(".details-notext").removeAttr("readonly").css("border", "1px solid #C6C6C6");
    }
})
$("body").delegate(".details-notext", "click", function () {
    $(this).val('');
    score=0;
});
$("body").delegate(".details-notext", "blur", function () {
    score=0;
});
/*多个删除*/
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length < 1) {
        layer.alert('未选中数据');
        return;
    }
    var ids = {};
    for (var i = 0; i < idArray.length; i++) {
        ids[i] = idArray[i];
    }
    layer.confirm('确定要删除吗?', {
        btn: ['确定', '取消']
    }, function () {
        $.ajax({
            type: "post",
            url: contextPath + "/course/multiDelete",
            /* url 多个删除的地址*/
            data: {ids: ids},
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    layer.msg('已删除', {
                        icon: 1,
                        time: 600
                    });
                    $("#question_search_btn").click();
                }
            }
        });

    })
});
//评分详情页返回考试对象列表页
$("#details_callback").on("click", function () {
    $(".details").hide();
    $(".test-object").show();
    $("#Papersingle .details_select").empty();
    $("#PaperMulti .details_select").empty();
    $("#Paperquest .details_select").empty();
    scoresingle = 0;
    scoremult = 0;
    scorequest = 0;
    userPassScore=0;
})

//详情页展开
$(".details-icons").on("click", function () {
    $(this).find('span').toggleClass('image-toggleicons');
    $(this).siblings('.details_select').toggle(800);
})
$("#details_submit").click(function () {
    if ($(".details-nopass").text()=='未审核') {
        layer.msg('有未审核的问答题!');
        return
    }
    if(Number($("#total_score").val())>Number($("#questScore").val())){
        layer.msg('问答题得分超过问答题总分啦!');
        return;
    }
    $(".details").hide();
    $(".test-object").show();
    $("#Papersingle .details_select").empty();
    $("#PaperMulti .details_select").empty();
    $("#Paperquest .details_select").empty();
    $("#details_score").text(0);
    $("#total_score").text(0);
    scoresingle = 0;
    scoremult = 0;
    scorequest = 0;
    userPassScore=0;
    layer.msg('提交成功');
    $("#mark_papers_search").on("click");
})
$("#subModel").on('click', function () {
    $(".details").hide();
    $(".test-object").show();
    $("#Papersingle .details_select").empty();
    $("#PaperMulti .details_select").empty();
    $("#Paperquest .details_select").empty();
    scoresingle = 0;
    scoremult = 0;
    scorequest = 0;
    layer.closeAll()
    layer.msg('提交成功');
})
function subScore(data) {
    $.ajax({
        type: "post",
        url: contextPath + "/exam/markPaperItem",
        data: data,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                layer.msg('评分成功', {
                    icon: 1,
                    time: 600
                });
               //选择题总分
                $("#total_score").text(score);//问答题总分
                $("#Scoring_details").text($("#details_score").text()-0+score);//总得分
                $(".audit-status").show();
                if (Number($("#Scoring_details").text()) >=userPassScore) {
                    $(".Qualified").text("合格");
                } else {
                    $(".Qualified").text("不合格");
                }
                score=0;
                $("#Search_graded").click();
            }
        }
    });
}

function modal(info, title, content) {
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: info,
        shadeClose: false,
        content: content,
        cancel: function () {

        }
    });

}
//取消提交
$("#details_cancle").on("click", function () {
    layer.closeAll();
})

