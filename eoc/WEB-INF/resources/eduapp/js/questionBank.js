/*弹窗框下拉列表*/
var subjectTypeId = null;
$("#operation-infosel-modal p").bind("click", function () {
    var ul = $("#operation-infosel-modal ul");
    $("#operation-infosel-modal p i").addClass("current");
    if (ul.css("display") == "none") {
        ul.slideDown("fast");
    } else {
        ul.slideUp("fast");
    }
    ;
});
$("#operation-infosel-modal ul li a").on("click", function () {
    var txt = $(this).text();
    $("#operation-infosel-modal p").html(txt + "<i></i>");
    $("#operation-infosel-modal ul").hide();
    $(".option").empty();
    flage = 0
    /*序号归0*/
});

$("#id_testItem_type-modal p").bind("click", function () {
    var ul = $("#id_testItem_type-modal ul");
    $("#id_testItem_type-modal p i").toggleClass("current");
    if (ul.css("display") == "none") {
        ul.slideDown("fast");
    } else {
        ul.slideUp("fast");
    }
    ;
});
$("#id_testItem_type-modal ul").on("click", "li a", function () {
    var txt = $(this).text();
    var data = $(this).attr('data-value');
    $("#id_testItem_type-modal p").html(txt + "<i></i>");
    $("#id_testItem_type-modal p").attr('data-value', data);
    $("#id_testItem_type-modal ul").hide();
    flage = 0;
    /*序号归0*/
});
var Presentation = [];
/*试题导入*/
$("#question_to").on("click", function () {
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: ['试题导入', "font-size:18px"],
        area: ['500px', '200px'],
        content: $('#question_to_modal'),
        shadeClose: false,

    });
});
$(".browse").on("click", function () {
    //打开预览
    getUploadFileFun.call(this);
    //附件上传  参数一点击上传按钮   参数二上传formdata的id
});
function getUploadFileFun() {
    var filelistName = '';
    var obj = $(this).siblings("input[name='toUpload']").click();
    var obj2 = $(this).siblings(".fileupload_tips")
    $(this).siblings(".fileupload_tips").show();
    $(obj).on("change", function () {
        var fileList = this.files[0];
        filelistName = fileList.name
        if (fileList == undefined) {
            obj2.text("");
        } else {
            obj2.text(fileList.name);
        }
    });

}
//点击上传按钮
$("#cp_upload").on("click", function () {
    var fileVal = $(this).siblings("input[name='toUpload']").val();
    if (fileVal == '') {
        layer.msg('请选择上传文件');
        return;
    } else {
        if (fileVal.match(/\.(xlsx|excel)$/i) == null) {
            layer.msg('请选择选择正确文件格式');
            return;
        } else {
            doUpload($("#uploadForm"));
        }
    }
})

function doUpload(formdata) {
    var formData = new FormData(formdata[0]);
    $.ajax({
        url: basecontextPath + "/tib/importByBatchFromExcel",
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (resData) {
            if (resData.code == 1) {
                layer.closeAll();
                layer.msg('模板文件上传成功！');
                $('.fileupload_tips').text('').hide().empty();
                $("#question_search_btn").click();
            } else {
                layer.msg('模板文件上传失败，请重试');
            }
        },
        error: function (returndata) {
            console.log(returndata);
        }
    })
};
//模板导出
$("#question_down").on("click", function(){
        window.location.href = "http://172.25.14.123/group1/M00/00/1D/rBkOe1ka0PKAHwejAAAjGaLS27A48.xlsx";
})
/* end 下拉列表*/

var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {};
/*查询的条件 （对象）*/
/*分页回调函数*/
var dataPageSize = 10;
function pageCallback(obj, first) {
    var currentPage = obj.curr;
    searchTrime.currentPage = currentPage;
    searchTrime.pageSize = dataPageSize;
    $.ajax({
        type: "post",
        url: contextPath + "/tib/list.do",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.data.data.length; i++) {
                data.data.data[i].correctAnswer = JSON.parse(data.data.data[i].correctAnswer);
            }
            sccFunction(data);
            $("#table-dataallcheck").removeClass("check-current");
            $("#table-dataallcheck").attr("data-check", "");
        }
    });
}

//初始化试题类别列表
createTestItemTypeSel()

/*搜索查询事件*/
$("#question_search_btn").on("click", function () {
    /*题目*/
    var topicVal = $.trim($("#topic").val());
    /*$.trim去除收尾空格*/
    var subjectType = $("#operation-infosel p").text();
    /*查询类型*/
    /*判断题目类型*/
    if (subjectType == "单选题") {
        subjectTypeId = 0;
    } else if (subjectType == "不定项选择题") {
        subjectTypeId = 1;
    } else if (subjectType == "问答题") {
        //添加问答题查询条件
        subjectTypeId = 3;
    } else {
        subjectTypeId = '';
    }
    var itemType = 1;
    searchTrime.question = topicVal;
    searchTrime.type = subjectTypeId;
    searchTrime.currentPage = 1;
    if ($("#id_testItem_type p").attr("data-value") > 0) {
        searchTrime.subjectId = $("#id_testItem_type p").attr("data-value");
    } else {
        searchTrime.subjectId = "";
    }
    $.ajax({
        type: "post",
        url: contextPath + "/tib/list.do",
        data: searchTrime,//添加了问答题的搜索条件searchTrime.itemType=2
        dataType: "json",
        success: function (data) {
            //有返回的数据
            if (data.code == 1) {
                dataPageSize = data.data.pageSize;
                laypage({
                    cont: 'question_page',
                    pages: Math.ceil(data.data.total / data.data.pageSize), /*总页数*/
                    curr: data.data.currentPage || 1, /*当前页*/
                    jump: pageCallback
                })
                //没有返回的数据
            } else if (data.code == 2) {
                //添加一个提示信息
                layer.msg(data.msg);
                //清空页面内容
                $("tbody").empty();
                $("#question_page").empty();
            }
        }
    })
});

/*
 * 动态添加数据方法
 * @parameter
 *  condition:查询的条件 （对象）
 *  url:数据提交地址
 */


function sccFunction(data) {
    $("tbody").empty();

    /*显示数据的ID*/
    var tableList = ["question", "correctAnswer", "typeShow", "subject", "createTime"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];
    /*表格展示数据的List*/
    var dataList = data.data.data || [];
    var sun_page = data.data.total;
    $("#sum_page span").text(sun_page);
    for (var i = 0; i < dataList.length; i++) {
        dataList[i].correctAnswer = dataList[i].correctAnswer;
    }
    /*添加数据*/
    var operation = ["table-edit", "table-delete"];
    var title = ["编辑", "删除"];
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
    /*单个点击删除*/
    questTable.singDel("id", "table_id", contextPath + "/tib/itemDelete", "#question_search_btn");
    tableEditFn();
}

function tableEditFn() {
    $(".table-edit").on("click", editFn);
    function editFn() {
        var self = this;
        var getId = singleId(self, "id");
        /*编辑某一个返回的这行的标识ID*/
        $.ajax({
            type: "post",
            url: contextPath + "/tib/itemDetail",
            /*编辑表格的某一行的时候 传递这行的标识ID地址*/
            data: {
                id: getId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    modal("修改题目");
                    /* question_Id 试题的唯一标识ID*/
                    var question_Id = $("#question_Id").text(data.data.id)
                    /*testItemBlankId 题库的唯一ID*/
                    $("#operation_title").val(data.data.question);//试题的题目
                    var subjectType;//试题类型
                    var options = eval("(" + data.data.optionStr + ")");//答案列表

                    var correctAnswer = JSON.parse(data.data.correctAnswer)//字符串转换数组 正确答案
                    subjectTypeId = data.data.type;
                    if (subjectTypeId == 0) {
                        subjectType = "单选题";
                        for (var i = 0; i < options.length; i++) {
                            if (jQuery.inArray(options[i].code, correctAnswer) > -1) {
                                str = '<ul id="' + options[i].code + '" class="dis-inline">' + '<li class="numb"><p>' + options[i].code + '</p></li>' + '<li><input type="text" id="option_text" class="input-focus" style="width:570px" value="' + options[i].value + '" /></li>' + '<li class="img"><img onclick="del(this)" class="option_img" src="../resources/eduapp/img/close.png"/></li>' + '<li class="check"><input type="radio" name="op"  value="" checked = "true" /></li></ul>'
                            } else {
                                str = '<ul id="' + options[i].code + '" class="dis-inline">' + '<li class="numb"><p>' + options[i].code + '</p></li>' + '<li><input type="text" id="option_text" class="input-focus" style="width:570px" value="' + options[i].value + '" /></li>' + '<li class="img"><img onclick="del(this)" class="option_img" src="../resources/eduapp/img/close.png"/></li>' + '<li class="check"><input type="radio" name="op"  value="" /></li></ul>'
                            }
                            $(".option").append(str);
                        }
                    } else if (subjectTypeId == 1) {
                        subjectType = "不定项选择题";
                        for (var i = 0; i < options.length; i++) {
                            if (jQuery.inArray(options[i].code, correctAnswer) > -1) {
                                str = '<ul id="' + options[i].code + '" class="dis-inline">' + '<li class="numb"><p>' + options[i].code + '</p></li>' + '<li><input type="text" id="option_text" class="input-focus" style="width:570px" value="' + options[i].value + '" /></li>' + '<li class="img"><img onclick="del(this)" class="option_img" src="../resources/eduapp/img/close.png"/></li>' + '<li class="check"><input type="checkbox" name="op"  value="" checked = "true" /></li></ul>'
                            } else {
                                str = '<ul id="' + options[i].code + '" class="dis-inline">' + '<li class="numb"><p>' + options[i].code + '</p></li>' + '<li><input type="text" id="option_text" class="input-focus" style="width:570px" value="' + options[i].value + '" /></li>' + '<li class="img"><img onclick="del(this)" class="option_img" src="../resources/eduapp/img/close.png"/></li>' + '<li class="check"><input type="checkbox" name="op"  value="" /></li></ul>'
                            }
                            $(".option").append(str);
                        }
                    } else if (subjectTypeId == 3) {
                        subjectType = "问答题";
                        $(".add_option").hide();
                        //======================
                        $(".option-textarea").show();
                        $("#input-group-textarea").val(JSON.parse(data.data.correctAnswer)[0]);

                        $(".add_option").hide();
                        $("#correct_response").hide();
                    }
                    $("#operation-infosel-modal p").text(subjectType);
                    $(".textTab li a").each(function () {
                        var $this = $(this);
                        if ($this.attr('data-value') == data.data.subjectId) {
                            $("#id_testItem_type_id").text($this.text());
                            $("#id_testItem_type_id").attr('data-value', data.data.subjectId);

                        }
                    })
                    flage = options.length;
                } else {
                    layer.msg(data.msg);
                }
            }
        });
    };
}

/*全选*/
questTable.checkBoxAll("table-dataallcheck");
/*多个删除*/
$("#question_del").on("click", function () {
    var dataurl;
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length < 1) {
        layer.msg('请选择删除的列表')
        return;
    }
    //if(idArray.length==1){
    //    dataurl= contextPath+"/tib/itemDelete";
    //}else{
    dataurl = contextPath + "/tib/itemMultiDelete";
    //}
    layer.confirm('确定要删除吗?', {
        btn: ['确定', '取消']
    }, function () {
        var ids = {};
        //for (var i = 0; i < idArray.length; i++) {
        //    ids[i] = idArray[i];
        //}
        $.ajax({
            type: "post",
            url: dataurl,
            /* url 多个删除的地址*/
            data: {ids: idArray},
            traditional: true,
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    layer.msg('已删除', {
                        icon: 1,
                        time: 600
                    })
                    $("#question_search_btn").click();
                }
            }
        });

    })
});

/*删除单个题目List*/
var flage = 0;
var numb = ["E", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
/*题目列表序号*/
function del(obj) {
    var sinli = $(obj).parents("ul").siblings();
    $(obj).parents("ul").remove();
    $(sinli).each(function (index) {
        $(this).attr("id", numb[index + 1]);
        $(this).find("p").html(numb[index + 1])
    })
    flage--
}
/*弹窗窗口*/
/*弹窗方法*/
var index;
function modal(title) {
    //alert($('#addQuest_modal').html());
    index = layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: ['800px', '600px'],
        content: $('#addQuest_modal'),
        shadeClose: false,
        cancel: fn

    });
}
$("#personn_reset").on("click", function () {
    layer.closeAll();
})
function fn() {
    $(".option-textarea").hide();
    $(".option-textarea").val("");
    $("#option_reset").click();

    $("#question_search_btn").click();
}

function layerColse(index) {
    layer.close(index); //此时你只需要把获得的index，轻轻地赋予layer.close即可
}

//初始化列表
$("#question_search_btn").click();

$("#question_add").on("click", function () {
    $(".add_option").hide();
    modal("添加题目");
    $('#operation_title').focus();
    /*按钮状态*/
    $(".spanBg1").mousedown(function () {
        $(this).addClass("yellow_down");
    });

    $(".spanBg1").mouseup(function () {
        $(this).removeClass("yellow_down");
    });

    $(".spanBg1").mouseleave(function () {
        $(this).removeClass("yellow_down");
    });
});
/*新建选项*/
/*题型类型 1表示单选题 2表示多选题*/
var str = "";
$("#operation-infosel-modal-check li a").on("click", checkoption);
function checkoption() {
    var subjectType = $(this).text();
    if (subjectType == "单选题") {
        subjectTypeId = 0;
        $(".add_option").show();
        $(".option-textarea").hide();
        $("#correct_response").show();
    } else if (subjectType == "不定项选择题") {
        $(".add_option").show();
        $(".option-textarea").hide();
        $("#correct_response").show();
        subjectTypeId = 1;
    } else if (subjectType == "问答题") {
        //======================
        //$("#input-group-textarea").val("");
        //======================
        $(".option-textarea").show();
        $(".add_option").hide();
        $("#correct_response").hide();
        subjectTypeId = 3;
    }
}
$(".add_option").on("click", function () {
    creatOperation(subjectTypeId);
})
function creatOperation(subjectTypeId) {
    /*通过判断题目类型 来加载不同单选或者多选*/
    if (subjectTypeId == 0) {
        flage++;
        for (var i = 0; i < numb.length; i++) {
            var code = numb[flage]
        }
        str = '<ul id="' + code + '" class="dis-inline textTab">' + '<li class="numb"><p>' + code + '</p></li>' + '<li><input type="text" id="option_text" class="input-focus" style="width:570px" value="" /></li>' + '<li class="img"><img onclick="del(this)" class="option_img" src="../resources/eduapp/img/close.png"/></li>' + '<li class="check"><input type="radio" name="op"   value="" /></li></ul>'
    } else if (subjectTypeId == 1) {
        flage++;
        for (var i = 0; i < numb.length; i++) {
            var code = numb[flage]
        }
        str = '<ul id="' + code + '" class="dis-inline textTab">' + '<li class="numb"><p>' + code + '</p></li>' + '<li><input type="text" id="option_text" class="input-focus" style="width:570px" value="" /></li>' + '<li class="img"><img onclick="del(this)" class="option_img" src="../resources/eduapp/img/close.png"/></li>' + '<li class="check"><input type="checkbox" name="op" value="" /></li></ul>'
    } else if (subjectTypeId == 3) {

    } else {
        layer.msg('请选择题型！');
        return;
    }
    $(".option").append(str);
};

/*重置*/
$("#option_reset").on("click", function () {
    $("#question_Id").text("");
    $("#correct_response").hide();
    $("#operation_title").val("");
    $("#input-group-textarea").val("");
    $("#operation-infosel-modal p").text("题型");
    $("#id_testItem_type_id").text("语文").attr("data-value", '30')
    $(".option").empty();
    flage = 0;
});

/*数据提交*/
$("#option_submit").on("click", function () {
    var questionsData = {};
    var answer = [];
    /*题目答案*/
    var optionList = [];
    /*选题列表*/
    if ($("#operation_title").val() == '') {
        layer.msg('请输入试题题目');
        return;
    }
    if ($("#operation-infosel-modal p").text() == '' || $("#operation-infosel-modal p").text() == '题型') {
        layer.msg('请选择题型');
        return;
    }
    if (subjectTypeId == 0 || subjectTypeId == 1) {
        if (flage == 0) {
            layer.msg('请添加选项');
            return
        }
    }
    $(".option ul").each(function () {
        var optionObject = {};
        var optionID = $(this).first().attr("id");
        var optonVal = $(this).first().find("input[type='text']").val();
        optionObject.code = optionID;
        optionObject.value = optonVal;
        optionList.push(optionObject);
        if ($(this).first().find("input[name='op']").is(":checked")) {
            var answerId = $(this).first().attr("id");
            answer.push(answerId);
        }
        ;
    });
    for (var x = 0; x < optionList.length; x++) {
        if (optionList[x].value == '') {
            layer.msg('请输入选项内容');
            return;
        }
    }
    if (answer.length <= 0 && subjectTypeId == 0) {
        layer.msg('请您选择试题的正确答案！');
        return;
    } else if (answer.length <= 0 && subjectTypeId == 1) {
        layer.msg('请至少选择一个答案！');
        return;
    } else if ($("#input-group-textarea").val() == '' && subjectTypeId == 3) {
        layer.msg('请填写参考答案');
        return;
    }
    questionsData.question = $("#operation_title").val();//
    questionsData.type = subjectTypeId;
    /*题目类型 单选题 0 多选题 1*/
    questionsData.id = $("#question_Id").text();
    /* question_Id 试题的唯一标识ID*/
    questionsData.testItemBlankId = $("#testItemBlankId").text();
    ;//题库的唯一ID*/
    questionsData.optionStr = JSON.stringify(optionList);
    questionsData.subjectId = $("#id_testItem_type_id").attr("data-value");
    var dataUrl;
    var isUpdate = false;
    var correctAnswer = $("#input-group-textarea").val();
    if ($("#question_Id").text() == null || $("#question_Id").text() == "") {
        dataUrl = contextPath + "/tib/add.do";
        /*新增的数据ID地址*/
    } else {
        dataUrl = contextPath + "/tib/itemUpdate";
        /*修改的数据ID地址*/
        isUpdate = true;
    }
    questionsData.correctAnswer = [];
    if (questionsData.type == 0) {
        questionsData.correctAnswer.push(answer[0]);
    } else if (questionsData.type == 1) {
        questionsData.correctAnswer = answer;
    } else if (questionsData.type == 3) {
        questionsData.correctAnswer.push(correctAnswer)
    }
    questionsData.correctAnswer = JSON.stringify(questionsData.correctAnswer);
    $.ajax({
        type: "post",
        url: dataUrl,
        data: questionsData,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                //如果是code等于1时是更新操作
                if (isUpdate) {
                    layer.msg('数据更新成功');
                    layerColse(index);
                    fn();
                } else {
                    layer.msg('数据提交成功！');
                    layerColse(index);
                    fn();
                }

            }
            ;
        }
    });
});

function createTestItemTypeSel() {
    var ele = $("#id_testItem_type ul");
    var ele1 = $("#id_testItem_type-modal ul");
    var valuep = $("#id_testItem_type-modal p");
    $.ajax({
        type: "post",
        url: contextPath + "/tib/subjectSelectList",
        data: {},
        success: function (msg) {
            if (msg.code == 1) {
                var data = msg.data;
                var html_str = "";
                for (var x in  data) {
                    if (x == 0) {
                        valuep.attr("data-value", data[x].id);
                        valuep.html(data[x].name + "<i></i>");
                    }
                    html_str += '<li><a data-value="' + data[x].id + '" href="#">' + data[x].name + '</a></li>';
                }
                ele.append(html_str);
                ele1.append(html_str)
            }
        }
    });
}

