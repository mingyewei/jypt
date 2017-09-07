/**
 * Created by pc on 2017/4/18.
 */
var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {};
/*查询的条件 （对象）*/
/*搜索查询事件*/
$("#question_search_btn").on("click", searchCLick)
function searchCLick() {
    /*题目*/
    var topicVal = $.trim($("#topic").val());
    /*$.trim去除收尾空格*/
    var reviewStatusType = $("#operation-infosel p").text();
    /*查询类型*/
    var reviewStatus = null;
    /*判断题目类型*/
    if (reviewStatusType == "未审核") {
        reviewStatus = 0;
    } else if (reviewStatusType == "审核通过") {
        reviewStatus = 1;
    } else if (reviewStatusType == "审核未通过") {
        reviewStatus = 2;
    }
    searchTrime.name = topicVal;
    searchTrime.reviewStatus = reviewStatus;
    searchTrime.currentPage = 1;
    $.ajax({
        type: "post",
        url: contextPath + "/exam/list",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                dataPageSize = data.data.pageSize;
                laypage({
                    cont: 'question_page',
                    pages: Math.ceil(data.data.total / data.data.pageSize),
                    /*总页数*/
                    curr: data.data.currentPage || 1,
                    /*当前页*/
                    jump: pageCallback
                })
            } else if (data.code == 2) {
                layer.msg(data.msg);
                $("tbody").empty();
                $("#question_page").empty();

            }
        }
    })
}
/*分页回调函数*/
var dataPageSize = 10;
function pageCallback(obj, first) {
    var currentPage = obj.curr;
    searchTrime.currentPage = currentPage;
    searchTrime.pageSize = dataPageSize;
    $.ajax({
        type: "post",
        url: contextPath + "/exam/list",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            sccFunction(data);
            $("#table-dataallcheck").removeClass("check-current");
            $("#table-dataallcheck").attr("data-check", "");
        }
    });
}
/*
 * 动态添加数据方法
 * @parameter
 *  condition:查询的条件 （对象）
 *  url:数据提交地址
 */

function sccFunction(data) {
    $("tbody").empty();
    /*显示数据的ID*/
    var tableList = ["name", "StatusName", "suggestion", "availableTime"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];
    /*表格展示数据的List*/
    var dataList = data.data.data||[];
    var sun_page = data.data.total;
    $("#sum_page span").text(sun_page);
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].reviewStatus == 0) {
            dataList[i].StatusName = '未审核';
        } else if (dataList[i].reviewStatus == 1) {
            dataList[i].StatusName = '通过';
        } else if (dataList[i].reviewStatus == 2) {
            dataList[i].StatusName = '未通过';
        }
        if (dataList[i].suggestion == undefined) {
            dataList[i].suggestion = '';
        }else{
            dataList[i].suggestion = dataList[i].suggestion;
        }
        if(dataList[i].availableTime=='null-null'){
            dataList[i].availableTime='';
        }else{
            dataList[i].availableTime=dataList[i].availableTime;
        }
    }
    /*添加数据*/
    var operation = ["table-edit", "table-delete", "table-detail", "table-pass", "table-nopass"];
    var title = ["编辑", "删除", "详细", "审核通过", "审核不通过"];
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
    /*单个点击删除*/
    //questTable.singDel("id", "table_id", contextPath + "/exam/delete", "#question_search_btn");
    tabdel("id", "table_id", contextPath + "/exam/delete", "#question_search_btn");
    tableEditFn();
    tableDetailFn();
    tablePassFn()
}
//初始化列表
$("#question_search_btn").click();
//详细
function tableDetailFn() {
    $(".table-detail").on("click", detail);
    function detail(e) {
        e.stopPropagation();
        $("#submitsave").hide();
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
                    $("#title").val(data.data.name).attr('disabled', 'disabled'); //考试的题目
                    var targetLength = JSON.parse(data.data.targetUserIds).length|| '';
                    selectedUsers = JSON.parse(data.data.targetUserIds);
                    $("#targetUserIds").val("已选择" + targetLength + "人")//考试对象的人数.
                    $("#examination_start").val(data.data.startTime).attr('disabled', true);//考试开始时间
                    $("#examination_stop").val(data.data.endTime).attr('disabled', true);//考试结束时间
                    $("#note").val(data.data.note).attr('disabled', true);//考试须知
                    $("#passCount").val(data.data.passScore).attr('disabled', true);//及格分数
                    if (data.data.createPaperMode == 0) {//考试添加的试卷(自动或者手动)
                        $("input[value='0']").prop('checked', true)
                        $("input[name='composetest_status']"&&"input[value='1']").attr('disabled', true);
                        //展示数据
                        $("input[value='0']").prop('checked', true);
                        var exTestItemList = data.data.selectedItems;
                        var paperStructure = JSON.parse(data.data.paperStructure);
                        showHandZjv12(exTestItemList, paperStructure);
                        $("#singletest").attr("disabled", true);
                        $("#multitest").attr("disabled", true);
                        $("#questtest").attr("disabled", true);
                        $("#selected_test ul li").each(function () {
                            $(this).addClass('disabled')
                        });
                        $("#unselected_test ul li").each(function () {
                            $(this).addClass('disabled')
                        });
                    } else if (data.data.createPaperMode == 1) {
                        $("input[name='composetest_status']"&&"input[value='0']").attr('disabled', true);
                        $("input[value='1']").prop('checked', true);
                        var itemType,//自动组卷题型
                            subject,//试题类别
                            itemCount,//试题数量
                            scorePerItem,//试题分值
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
                                "<input type='text' class='total_Points' value='" + calculate(tmp_data.itemCount,tmp_data.scorePerItem) + "' disabled='true' style='width:58px;' />" +
                                "</div>" +
                                "<span class='questions_del managepage_group_btn' onclick='delAuto(this)' style='color: #FFFFFF;'>删除</span>" +
                                "</div>";
                        }
                        $("#questions_cont").empty();
                        $("#questions_cont").append(questions_str);
                        calculate_num();
                        $("#add_questions").addClass('disabled')
                        $(".questions_del").addClass('disabled')
                    }
                    $("#submitsave").hide();
                } else {
                    layer.msg(data.msg);
                }
            }
        });
    };
}
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

    $("#title").attr('disabled',false); //考试的题目
    $("#targetUserIds").attr('disabled',false)//考试对象的人数.
    $("#examination_start").attr('disabled',false);//考试开始时间
    $("#examination_stop").attr('disabled',false);//考试结束时间
    $("#note").attr('disabled', false);//考试须知
    $("#passCount").attr('disabled', false);//及格分数
    $("input[value='0']").prop('checked', true).attr('disabled', false);
    $("input[value='1']").prop('checked', true).attr('disabled', false);
    $("#singletest").attr("disabled", false)
    $("#multitest").attr("disabled", false)
    $("#questtest").attr("disabled", false)
    $("#unselected_test ul li").each(function () {
        $(this).removeClass('disabled')
    });
    $("#selected_test ul li").each(function () {
        $(this).removeClass('disabled');
    });
    $("#add_questions").removeClass('disabled');
    $(".questions_del").removeClass('disabled');
    $("#submitsave").show();
}
//通过
function tablePassFn() {
    $(".table-pass").on("click", passFn);
    $(".table-nopass").on("click", passFn);
    function passFn(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked', true);
        var self = this;
        var getId = singleId(self, "id");
        if(e.currentTarget.className=='table-pass'){
            if ($(this).parent().siblings('#StatusName').text()== '通过' ) {
                layer.msg('该数据已审核过', {
                    icon: 1,
                    time: 3000
                });
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
                return;
            }else {
                layer.confirm('确定要审批通过吗?', {
                        btn: ['确定', '取消'],
                        cancel: function () {
                            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
                        }
                    }, function () {
                        $.ajax({
                            type: "post",
                            url: contextPath + "/exam/review",
                            data: {
                                id: getId,
                                reviewResult: 1
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data.code == 1) {
                                    layer.msg('审核成功', {
                                        icon: 1,
                                        time: 600
                                    });
                                    $("#question_search_btn").click();

                                } else {
                                    layer.msg('审核失败', {
                                        icon: 1,
                                        time: 600
                                    });
                                }
                            }
                        });
                    }, function () {
                        $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
                    }
                );
            }
        }else if(e.currentTarget.className=='table-nopass'){
            if($(this).parent().siblings('#StatusName').text()== '未通过'){
                layer.msg('该数据已审核过', {
                    icon: 1,
                    time: 3000
                });
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
                return;
            }else{
                modal("审核不通过的原因:", "#course_modal");
                $("#exam_modal").text(getId);
            }
        }
    }
}
//审核不通过的原因 ,提交原因的按钮 nopass
$("#personn_submit").on("click", function () {
    if($("#review_suggestion").val()==''){
        layer.msg('请填写不通过原因!');
        return;
    }else{
        $.ajax({
            type: "post",
            url: contextPath + "/exam/review",
            data: {
                id: $("#exam_modal").text(),
                suggestion: $("#review_suggestion").val(),
                reviewResult: 0
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    layer.msg('审核成功', {
                        icon: 1,
                        time: 600
                    });
                    layer.closeAll();
                    $("#question_search_btn").click();
                } else {
                    layer.msg('审核失败', {
                        icon: 1,
                        time: 600
                    });
                }
            }
        });
        $("#question_search_btn").click();
    }
    $("#review_suggestion").val('');
});
/*弹窗方法*/
function modal(title, contentId) {
     layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: ['550px', '300px'],
        shadeClose: false,
        content: $(contentId),
        cancel: function () {
            $("#exam_id").text('');
            $("#review_suggestion").val('')
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            $("#review_suggestion").val('');
        }
    });
};
/*全选*/
questTable.checkBoxAll("table-dataallcheck");
//单选删除
function tabdel(getId, tableId, url, searchBtn){
    var tableId = document.getElementById(tableId);
    var tableDel = tableId.getElementsByClassName("table-delete");
    for (var i = 0; i < tableDel.length; i++) {
        addEvent(tableDel[i], "click", edit);
    }
    function edit(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked', true);
        var a = this;
        var dataId = singleId(a, getId)
        var flag = $(this).parent().siblings().children('input').prop('checked')
        if (!flag) {
            layer.msg('请选中当前选项再删除');
            return;
        }
        if($(this).parent().parents().children('#StatusName').attr('title')=='通过'){
            layer.msg('已通过的考试,不可删除');
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            return;
        }
        confirmindex = layer.confirm('确定要删除吗',
            {
                btn: ['确定', '取消'],
                cancel: function () {
                    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
                }
            },
            function () {
                $.ajax({
                    type: "post",
                    url: url,
                    data: {id: dataId},
                    dataType: "json",
                    success: function (data) {
                        var dataJson = data;
                        if (dataJson.code == 1) {
                            var Del = a.parentNode.parentNode.sectionRowIndex;
                            tableId.deleteRow(Del + 1);
                            layer.msg('已删除', {icon: 1, time: 1000})
                            $(searchBtn).click();
                        }
                    }
                });

            }, function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        );
    }
    function singleId(type, getId) {
        var single = null;
        var tdList = type.parentNode.parentNode.children;
        var tdLength = type.parentNode.parentNode.children.length;
        for (var i = 0; i < tdLength; i++) {
            if (tdList[i].id == getId) {
                single = tdList[i].innerHTML;
            }
        }
        ;
        return single;
    }
}
/*多个删除*/
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length < 1) {
        layer.msg('请选择删除的列表')
        return;
    }
    var fslag=false;
    $("#table_id tbody tr").each(function(){
        if($(this).attr('class')&&$(this).children('#StatusName').attr('title')=='通过'){
            fslag=true;
            return fslag;
        }
    });
    if(fslag){
        layer.msg('有已通过的考试,不可删除');
        $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        return;
    }
    var ids = {};
    for (var i = 0; i < idArray.length; i++) {
        ids[i] = idArray[i];
    }
    var modalclose = layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/exam/deleteConfigMulti",
                /* url 多个删除的地址*/
                data: {ids: ids},
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        layer.msg('已删除', {
                            icon: 1,
                            time: 600
                        });
                        fslag=false;
                        $("#question_search_btn").click();
                    }
                }
            });
            layer.msg(modalclose);
        },
        function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
    )
});
//添加跳转
function toAdd() {
    $(".questionCont").hide()
    $(".managepage").show()
}