var TrainTable = new tableDataOperation();
/*表格弹窗方法*/
var examData = {};
var clickNodeID = "";
!function () {
    /*初始化树*/
    var url = basecontextPath + "/cp/subjectTree.do";
    $.getJSON(url, function (data) {
        if (data.code == 1) {
            var newTreeNode = [];
            for (var i = 0; i < data.data.length; i++) {
                var treeNodeData = {};
                treeNodeData.open = true;
                for (var key in data.data[i]) {
                    treeNodeData[key] = data.data[i][key];
                }
                newTreeNode[i] = treeNodeData;
                clickNodeID = newTreeNode[0].id;
            }
            $.fn.zTree.init($("#courseTree"), setting, newTreeNode);
        }
    });
}();

var setting = {
    view: {
        selectedMulti: false
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    data: {
        keep: {
            parent: true,
            leaf: false
        },
        simpleData: {
            enable: true,
            pIdKey: "superId"
        }
    },
    callback: {
        beforeClick: beforeClick
    }
};
/**
 * click Tree回调方法
 * @type {number}
 */
function beforeClick(treeId, treeNode, clickFlag) {
    clickNodeID =treeNode.id;
    return (treeNode.click != false);
}
function modal(title) {
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: ['800px', '500px'],
        shadeClose: false,
        content: $('#addTrain_Modal'),
        cancel: fn
    });
}
/*课程课件搜索加载数据*/
$('#question_search_btn').on("click", function () {
    seachChaneg();
})
/*课程课件表格加载方法*/
function addTable(data) {
    $("#addTrain_id tbody").html("");
    var tableList = ["title"];
    var tableListNone = ["id"];
    var operation = ["table-delete"];
    var title = ["删除"];
    TrainTable.dataAdd(data, "table_id", "itm", tableList, tableListNone, operation, title);
    $('.table-delete').on("click", function () {
        var index = $('.table-delete').index(this)
        courseData.splice(index, 1)
        addTable(courseData);
    });
};
function seachChaneg() {
    var searchTrime = {};
    searchTrime.title = $("#Train_title").val();
    searchTrime.subjectId=clickNodeID;
    var str = '';
    $(".addTrain_item ul").children("li").remove();
    $.ajax({
        type: "post",
        url:  contextPath + "/cp/listAll",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                for (var i = 0; i < data.data.length; i++) {
                    var a = data.data[i].title.substr(0, 48);
                    str += "<li data_id='" + data.data[i].id + "'>" + "<span>" + a + "</span>" + "<span class='addTrain_radio'><input type='checkbox' name='status' value='' /></span>" + "</li>";
                }
            }
            $(".addTrain_item ul").append(str);
        }
    })
}
$("#addTrain_no").on("click", function () {
    layer.closeAll();
});
/*点击弹窗关闭按钮 清空数据*/
function fn() {
    layer.closeAll();
    $(".personne_cont_modal input").each(function () {
        $(this).val("")
    });
    var personne_Id = $("#personid").text("");
    var sub = document.getElementById("personn_submit")
};
$("#addTrain_add").on("click", function () {
    modal("添加课件");
    seachChaneg();
});
/*对象数组去重*/
var unique = function(arr) {
    var result = [], json = {};
    for (var i = 0, len = arr.length; i < len; i++){
        if (!json[arr[i].id]) {
            json[arr[i].id] = 1;
            result.push(arr[i]);  //返回没被删除的元素
        }
    }
    return result;
};
function listAll(param) { /*手动组件加载待选列表方法*/
    $.ajax({
        type: "POST",
        url: contextPath + "/testItem/listAll.do",
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
/*判断是否考试*/
$("input[name='hasExam").on("focus", function () {
    $(this).prop("checked", true);
    if ($(this).val() == 1) {
        $("#composetest_type").show();
    } else if ($(this).val() == 0) {
        $("#composetest_type").hide();
    }
})
var courses = [];
var jinzemingdata = {};
var exam_id = $("#Train_id").val();
/*标示ID*/
/*根据标示ID是否有值来确定回显可视区域页面的数据加载*/
$.ajax({
    type: "post",
    url: contextPath + "/courseCollection/detail.do",
    async: false,
    data: {id: exam_id},
    dataType: "json",
    success: function (data) {
        console.log(data)
        jinzemingdata = data.data;
        courses = data.data.courses;
        if (data.data.exam!=undefined){
            examData = data.data.exam;
            if(examData.endTime!=undefined){
                delete  examData.endTime;
            }
            if ( examData.startTime!=undefined){
                delete  examData.startTime;
            }
        }
        $("#title").val(data.data.name);
        addTable(data.data.courses);
        $("#table_Train").show();
        /*图片上传*/

        $("#imgupload").attr("src", data.data.showImgUrl).show();
        /*课程简介*/
        $("#digest").val(data.data.digest);
        /*判断是否考试 1 考试*/
        if (data.data.hasExam == 1) {
            $("#exam_ok").prop("checked", "true");
            $("#passScore").val(examData.passScore);
            /*及格分数*/
            $("#exam_id").val(examData.id);
            /*判断是手动组卷还是自动组卷*/
            if (examData.createPaperMode == 0) { /*手动组卷*/
                $("#manual_radio").prop('checked', 'true');
                $("#manual_title").val(examData.name);//考试名称
                $("#manual_digest").val(examData.note);//考试说明
                var singlenum = 0
                /*单选题数量*/
                var multinum = 0;
                /*多选题数量*/
                /*数据回显已选试题列表*/
                for (var i = 0; i < examData.selectedItems.length; i++) {
                    var pStr = "";
                    if (examData.selectedItems[i].type == 0) {
                        pStr = "(单)";
                        singlenum++;
                    } else if (examData.selectedItems[i].type == 1) {
                        pStr = "(多)";
                        multinum++;
                    }
                    var newLi = $("<li/>").html("<a>×</a>" + pStr + examData.selectedItems[i].question).attr({
                        "data-type": examData.selectedItems[i].type,
                        "id": examData.selectedItems[i].id
                    }).appendTo($("#selected_test ul"));
                }
                $("#totalnum").text(examData.selectedItems.length);
                /*已选题所有数量*/
                $("#singlenum").text(singlenum);
                /*单选题数量*/
                if (examData.paperStructure[0]!=undefined){
                    $("#singletest").val(examData.paperStructure[0].scorePerItem);
                }
                /*单选题每题多少分*/
                $("#multinum").text(multinum);
                /*多选题数量*/
                if (examData.paperStructure[1]!=undefined){
                    $("#multitest").val(examData.paperStructure[1].scorePerItem);
                }

                /*多选题每题多少分*/
                var totalscore
                if(examData.paperStructure[0]!=undefined&&examData.paperStructure[1]!=undefined){
                    totalscore = examData.paperStructure[0].scorePerItem * singlenum + examData.paperStructure[1].scorePerItem * multinum;
                }else {
                    if(examData.paperStructure[0]!=undefined) {
                        totalscore = examData.paperStructure[0].scorePerItem * singlenum
                    }
                    if(examData.paperStructure[1]!=undefined) {
                        totalscore = examData.paperStructure[1].scorePerItem * multinum
                    }
                }
                $("#totalscore").text(totalscore);
                /*总分数*/
            } else if (examData.createPaperMode == 1) { /*自动组卷*/
                $("#auto_radio").prop("checked", "true");
                $("#auto_title").val(examData.name);//考试名称
                $("#auto_digest").val(examData.note);//考试说明
                var post_infosel_item = $("#post-infosel-item p").text();
                /*类别*/
                var questions_num = $("#multinum2").val();
                /*题目的数量*/
                var question__types_data = '';
                /*题型*/
                var questions_str = '';
                for (var i = 0; i < examData.paperStructure.length; i++) {
                    if (examData.paperStructure[i].itemType == 0) {
                        question__types_data = '单选题';
                    } else if (examData.paperStructure[i].itemType == 1) {
                        question__types_data = '多选题';
                    }
                    questions_str += "<div class='questions_item' data-types='" + examData.paperStructure[i].itemType + "'>" +
                        "<div class='managepage_group dis-inline'>" +
                        "<label>题型：</label>" +
                        "<input type='text'name='itemType' calss='question__types' value='" + question__types_data + "' disabled='true' style='width:70px;' />" +
                        "</div>" +
                        "<div class='managepage_group dis-inline'>" +
                        "<label>类别：</label>" +
                        "<input type='text' data_subjectType='" + examData.paperStructure[i].subject + "' name='subject' class='post_infosel_item' value='" + examData.paperStructure[i].subjectName + "' disabled='true' style='width:70px;' />" +
                        "</div>" +
                        "<div class='managepage_group dis-inline'>" +
                        "<label>数量：</label>" +
                        "<input type='text'name='itemCount' class='questions_num' value='" + examData.paperStructure[i].itemCount + "' disabled='true' style='width:70px;'/>" +
                        "</div>" +
                        "<div class='managepage_group dis-inline'>" +
                        "<label>分值：</label>" +
                        "<input type='text'  name='scorePerItem' class='scorePerItem' value='" + examData.paperStructure[i].scorePerItem + "' disabled='true' style='width:50px;' />" +
                        "</div>" +
                        "<div class='managepage_group dis-inline'>" +
                        "<label>总分：</label>" +
                        "<input type='text' class='total_Points' value='" + examData.paperStructure[i].itemCount * examData.paperStructure[i].scorePerItem + "' disabled='true' style='width:60px;' />" +
                        "</div>" +
                        "<span class='questions_del spanBg1 hover' onclick='delAuto(this)' style='color: #FFFFFF;'>删除</span>" +
                        "</div>"
                }
                $("#questions_cont").append(questions_str);
                calculate_num();
            }
        } else {
            $("#exam_no").prop("checked", "true");
            $("#composetest_type").hide();
        }
        if (data.data.publishStatus == 1) {
            $("#fabu_yes").prop("checked", "true");
        } else {
            $("#fabu_no").prop("checked", "true");
        }//是否发布
    }
});

/*ifend*/
var courseData = courses;
/*搜索后确定提交 并展示课程课件*/
$("#addTrain_Btn").on("click", function () {
    $(".addTrain_item ul li").each(function () {
        if ($(this).find('input').prop('checked')) {
            var a = {};
            a.id = $(this).attr("data_id");
            a.title = $(this).first().text();
            courseData.push(a);
        }
    });
    courseData=unique(courseData);
    layer.closeAll();
    $("#table_Train").show();
    addTable(courseData);
});

/*单个删除*/

/*课程课件多个删除*/
$("#addTrain_del").on("click", function () {
    $("#table_Train tbody tr").each(function () {
        if ($(this).find("input").prop('checked')) {
            var index = $('#table_Train tbody tr').index(this);
            courseData.splice(index, 1)
            addTable(courseData);
        }
        ;
    });
});

/*删除自动组卷的当前列*/
function delAuto(item) {
    $(item).parent(".questions_item").remove();
    calculate_num();
};

/*判断组卷方式并加载数据*/
$("input[name='createPaperMode']").on("click", function () {
    $(this).prop("checked", true);
    if ($("input[name='createPaperMode']:checked").val() == 0) {
        /*移除所有试题列表*/
        layer.open({
            type: 1,
            skin: 'layui-layer-molv', //皮肤
            title: ['手动组卷', "font-size:18px"],
            area: ['950px', '680px'],
            shadeClose: false,
            content: $('#manualcompose'),
            success: function () {
            }
        });
    } else if ($("input[name='createPaperMode']:checked").val() == 1) {
        layer.open({
            type: 1,
            skin: 'layui-layer-molv', //皮肤
            title: ["自动组卷", "font-size:18px"],
            area: ['900px', '500px'],
            shadeClose: false,
            content: $('#auto-exam'),
        })

    }
    ;
});

/*手动组卷添加 分值计算 */
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
$("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text());
$("#singletest").on("blur", function () {
    $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text());
});
$("#multitest").on("blur", function () {
    $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text());
});
/*手动组卷添加 分值计算 end */

/*手动组卷添加 待选列表点击事件*/
$("#unselected_test").on("click", "ul li", function () {
    var txt = $(this).text().substr(0, 28);
    var dataflag = $(this).attr("data-value");
    var itemId = $(this).attr("id");
    var flag = flagnum = 0;
    if ($("#selected_test li").length == 0) {
        var newLi = $("<li/>").html(txt + "<a>×</a>").attr({
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
            var newLi = $("<li/>").html(txt + "<a>×</a>").attr({
                "data-type": dataflag,
                "id": itemId
            }).appendTo($("#selected_test ul"));
        }
    }
    $("#totalnum").text($('#selected_test li').length);
    singlenum = multinum = 0;
    $("#selected_test li").each(function () {
        if ($(this).attr("data-type") == "0") {
            singlenum++;
        } else {
            multinum++;
        }
        $("#singlenum").text(singlenum);
        $("#multinum").text(multinum);
    });
    var sing = [];
    var multi = [];
    $("#selected_test ul li").each(function () {
        if ($(this).attr("data-type") == 0) {
            sing.push($(this).attr("data-type"));

        } else if ($(this).attr("data-type") == 1) {
            multi.push($(this).attr("data-type"));
        }
        if (sing.length == 0) {
            $("#singletest").prop("disabled", true);
        } else {

            $("#singletest").removeProp("disabled");
        }
        if (multi.length == 0) {
            $("#multitest").prop("disabled", true);
        } else {
            $("#multitest").removeProp("disabled");
        }
    })
    $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text());
});
/*手动组卷添加 待选列表点击事件 end*/


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
var examinationData = examData
//手动组卷确定按钮事件
$("#manualSubmit").on("click", function () {
    var testItemIds = [];
    /*存放已选试卷ID*/
    var testItemIdsData = [];
    if (examinationData.paperStructure!=undefined){
        delete examinationData.paperStructure;
    }
    /*存放已选试卷ID 名称 以及试卷类型*/
    examinationData.name = $("#manual_title").val(), //题目
    examinationData.note = $("#manual_digest").val(), //考试说明
        $("#selected_test li").each(function () {
            testItemIds.push($(this).attr("id"));
            var a = {
                question: $(this).find("span").text(),
                type: $(this).attr("data-type"),
                id: $(this).attr("id")
            };
            testItemIdsData.push(a);
        });
    if (testItemIds.length == 0) {
        layer.msg('选择要添加的考试题目');
        return;
    }
    examinationData.testItemIds = testItemIds;
    examinationData.selectedItems = testItemIdsData;
    if (testItemIdsData.length < 0) {
        layer.msg("请选择添加的试题!");
        return;
    }
    /*单选数据*/
    var singlenumData = {
        itemType: 0.
    };
    /*多选数据*/
    var manualData = {
        itemType: 1,
    };
    var scorePerItemMode = [];
    singlenumData.scorePerItem = $("#singletest").val();
    /*手动单选题的分值*/
    singlenumData.itemCount = $("#singlenum").text();//单选题个数
    manualData.scorePerItem = $("#multitest").val();
    /*手动多选题的分值*/
    manualData.itemCount = $("#multinum").text();//多选题个数
    if ($("#singlenum").text()!=0){
        scorePerItemMode.push(singlenumData);
    };
    if ($("#multinum").text()!=0){
        scorePerItemMode.push(manualData);
    }


    examinationData.paperStructure = scorePerItemMode;
    console.log(examinationData)
    layer.closeAll();
});
/*自动组卷数据提交*/
$("#autoSubmit").on("click", function () {
    var paperStructure = [];
    if($("#questions_cont .questions_item").length==0){
        layer.msg("请选择添加的试题!");
        return;
    }
    if($("#auto_title").val()==""){
        layer.msg("请填写考试名称!");
        return;
    }
    if($("#auto_digest").val()==""){
        layer.msg("请填写考试说明!");
        return;
    }
    if (examinationData.paperStructure!=undefined){
        delete examinationData.paperStructure;
    }
    if (examinationData.testItemIds!=undefined){
        delete examinationData.testItemIds;
    }
    if (examinationData.selectedItems!=undefined){
        delete examinationData.selectedItems;
    }
    $(".questions_item").each(function () {
        var a = {};
        a.itemType = $(this).attr("data-types");
        /*自动组卷题型类型*/
        a.subject = $(this).find('.post_infosel_item').attr("data_subjecttype");
        /*自动组卷题型类别*/
        a.itemCount = $(this).find(".questions_num").val();
        /*自动组卷试题的数量*/
        a.scorePerItem = $(this).find(".scorePerItem").val();
        /*自动组卷试题的分值*/
        a.subjectName = $(this).find(".post_infosel_item").val();
        /*自动组卷的类别名称 数据提交的时候要删除这个*/
        paperStructure.push(a);
    })
    var title = $("#auto_title").val();
    var note = $("#auto_digest").val();
    examinationData.paperStructure = paperStructure;
    examinationData.name = title;
    examinationData.note = note;
    console.log(examinationData)
    layer.closeAll();
})
//自动组卷分值变化
function calculate() {
    var questions_num = $("#multinum2").val();
    /*题目的数量*/
    var questions_score = $("#singletest2").val();
    /*每道题的分值*/
    var num = 0
    if (questions_num == "" || questions_score == "") {
        num = 0;
    } else {
        num = questions_num * questions_score
    }
    return num;
}

$("#multinum2").on("blur", function () {
    $("#singlescore2").text(calculate())
});
$("#singletest2").on("blur", function () {
    $("#singlescore2").text(calculate())
});
/*增加自动动题型*/
$("#add_questions").on("click", function () {
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
        "<input type='text'name='itemType' class='question__types' value='" + question_data + "' disabled='true' style='width:70px;' />" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>类别：</label>" +
        "<input type='text' name='subject' data_subjectType='" + post_infosel_value + "' class='post_infosel_item' value='" + post_infosel_item + "' disabled='true' style='width:70px;' />" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>数量：</label>" +
        "<input type='text'name='itemCount' class='questions_num' value=" + questions_num + " disabled='true' style='width:70px;'/>" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>分值：</label>" +
        "<input type='text'  name='scorePerItem' class='scorePerItem' value='" + questions_score + "' disabled='true' style='width:50px;' />" +
        "</div>" +
        "<div class='managepage_group dis-inline'>" +
        "<label>总分：</label>" +
        "<input type='text' class='total_Points' value='" + calculate() + "' disabled='true' style='width:60px;' />" +
        "</div>" +
        "<span class='questions_del spanBg1 hover' onclick='delAuto(this)' style='color: #FFFFFF;'>删除</span>" +
        "</div>"
    $("#questions_cont").append(questions_str);
    calculate_num()
    /*计算总分数*/
})
/*计算总分数*/
function calculate_num() {
    var summation = 0;
    $(".total_Points").each(function () {
        var a = $(this).val()
        summation += Number(a);
    })
    $("#summation").val(summation)
    console.log($("#summation").val());
}


/*所有数据提交*/
$("#submitsave").on("click", function () {
    var createPaperMode = $("input[name='createPaperMode']:checked").val() //试卷类型
    var table_id = [];
    $("#addTrain_id tbody tr").each(function () {
        table_id.push($(this).find("td").eq(2).text());
    });
    $("#courseIds").val(table_id)
    //组卷数据
    var passScore = $("#passScore").val();
    examData.passScore = passScore;
    examData.createPaperMode = createPaperMode;
    var coursesId = [];
    for (var i = 0; i < courses.length; i++) {
        coursesId.push(courses[i].id)
    }
    delete jinzemingdata.courses;
    jinzemingdata.coursesIds = coursesId
    var testItemIds = []
    var hasExamValue= $("input[name='hasExam']:checked").val();
    var createPaperMode=$("input[name='createPaperMode']").val();
    if (hasExamValue==1&&createPaperMode==1){
        for (var i = 0; i < examData.selectedItems.length; i++) {
            testItemIds.push(examData.selectedItems[i].id)
        }
        delete examData.selectedItems;
        examData.testItemIds = testItemIds;
        for (var i = 0; i < examData.paperStructure.length; i++) {
            if (examData.paperStructure[i].subjectName != undefined) {
                delete examData.paperStructure[i].subjectName;
            }
        }
    };
    var datastring = JSON.stringify(examData);
    console.log(examData);
    $("#exam").val(datastring);
    $("#addTrainForm").attr('action', 'edit.do');
    $("#addTrainForm").submit();
});

//缩略图上传，用span模拟input[file]的点击事件
$("#fileimgupload").on("click", function () {
    $("#fileimg").click();
    getUploadImg("#fileimg",  "#imgupload");
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
            //alert("请选择图片");
            layer.msg('请选择图片');
            return false;
        }
        var reader = new FileReader();
        reader.readAsDataURL(fileList);
        reader.onload = function (e) {
            $(obj2).attr("src",e.target.result);
             $(obj2).show();
            $(obj2).text(fileList.name);
        }
    })
}

//岗位类别回填
$.ajax({
    type: "post",
    url: contextPath + "/itemsubject/select.do",
    async: true,
    dataType: "json",
    success: function (data) {
        var str = ''
        if (data.code == 1) {
            for (var i = 0; i < data.data.length; i++) {
                str += "<li><a href='#' data-value=" + data.data[i].id + ">" + data.data[i].name + "</a></li>";
            }
            $("#jopz-infosel ul").append(str);
            $("#post-infosel-item ul").append(str);
        }
    }
});

//搜索
operationSearch();
$("#operation_search_btn").on("click", function () {
    operationSearch();
})

function operationSearch() { /*查询事件*/
    var question = $.trim($("#topic").val());
    var valStr = $("#post-infosel p").text();
    var itemType = null;
    if (valStr == "单选") {
        itemType = 0;
    } else if (valStr == "多选") {
        itemType = 1;
    }
    var jopzInfosel = $("#jopz-infosel p").attr('data-value');
    var param = {
        "question": question,
        "itemType": itemType,
        "subjectId": jopzInfosel
    };
    /*查询条件*/
    listAll(param);
}

function returnbackFun() {
    window.location.href = contextPath + "/courseCollection/toList.action";
}