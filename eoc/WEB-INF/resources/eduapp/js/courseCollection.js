var questTable = new tableDataOperation();
/*搜索查询事件*/
$("#question_search_btn").on("click", searchBtn);
var searchTrime = {};
/*查询的条件 （对象）*/
var dataPageSize = 10;
function searchBtn() {
    /*题目*/
    var topicVal = $.trim($("#topic").val());
    /*$.trim去除收尾空格*/
    searchTrime.name = topicVal;
    //searchTrime.publishStatus = subjectTypeId;
    searchTrime.currentPage = 1;
    $.ajax({
        url: contextPath + '/courseCollection/listCollectionByPage',
        type: "post",//请求方式为post
        dataType: "json", //返回数据格式为json
        success: function (data) {//请求成功完成后要执行的方法
            if (data.code == 1) {
                laypage({
                    cont: 'question_page',
                    pages: Math.ceil(data.data.total / data.data.pageSize), /*总页数*/
                    curr: data.data.currentPage || 1, /*当前页*/
                    jump: pageCallback
                })
            } else if (data.code == 2) {
                layer.msg(data.msg);
                $("tbody").empty();
                $("#question_page").empty();
            }
        },
        error: function (e) {
            console.log(e);
        }
    })
};
function pageCallback(obj, first) {
    var currentPage = obj.curr;
    searchTrime.currentPage = currentPage;
    searchTrime.pageSize = dataPageSize;
    $.ajax({
        type: "post",
        url: contextPath + "/courseCollection/listCollectionByPage",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            sccFunction(data);
            $("#table-dataallcheck").removeClass("check-current");
            $("#table-dataallcheck").attr("data-check", "");
            tableEditFn();
            delFn();
        }
    });
}
//页面列表的回调
function sccFunction(data) {
    $("#table_id tbody").empty();
    /*显示数据的ID*/
    var tableList = ["name", "createTime"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];
    /*表格展示数据的List*/
    var dataList = data.data.data;
    Array.isArray(dataList)?dataList:dataList=[];
    var sun_page = data.data.total;
    $("#sum_page span").text(sun_page);
    /*添加数据*/
    var operation = ["table-edit", "table-delete"];
    var title = ["编辑", "删除"];
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
    /*单个点击删除*/
};
function delFn() {
    //这是删除一个tr的方法
    $('.table-delete').on("click", function (e) {
        e.stopPropagation();
        if ($(this).parent().parent().find("input").prop('checked')) {
            $("#question_del").trigger("click");
        } else {
            layer.msg('请选择至少一个资料');
        }

    });
}
/*全选*/
questTable.checkBoxAll("table-dataallcheck");
/*多个删除*/
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    var ids = {};
    if (idArray.length <= 0) {
        layer.msg('请选择删除的列表！');
        return
    }
    for (var i = 0; i < idArray.length; i++) {
        ids[i] = idArray[i];
    }
    layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/courseCollection/multiDeleteCollection",
                data: {ids: ids},
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        $("#question_search_btn").click();
                        layer.msg('已删除', {
                            icon: 1,
                            time: 600
                        });
                    }
                }
            });

        }, function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
    )
});
/*表格弹窗加载树方法*/

var TrainTable = new tableDataOperation();
var clickNodeID;
!function () {
    /*初始化树*/
    var setting = {
        view: {
            selectedMulti: false
        },
        check: {
            enable: true,
            chkStyle: "radio",
            chkboxType: {
                "Y": "ps",
                "N": "ps"
            },
            radioType: "all"
        },
        data: {
            simpleData: {
                enable: true,
                pIdKey: "superId"
            }
        }
    };
    var url = basecontextPath + "/cp/subjectTree";
    $.getJSON(url, function (data) {
        if (data.code == 1) {
            var newTreeNode = [];
            for (var i = 0; i < data.data.length; i++) {//第一层循环给树插件添加组织结构节点
                var treeNodeData = {};
                if (data.data[i].superId == "0") {//使最根节点打开
                    treeNodeData.open = true;
                }
                for (var key in data.data[i]) {
                    treeNodeData[key] = data.data[i][key];
                }
                newTreeNode[i] = treeNodeData;
            }
            if (clickNodeID) {
                for (var f = 0; f<newTreeNode.length; f++) {
                    if (typeof(newTreeNode[f].id)=="string") {
                            if (newTreeNode[f].id==clickNodeID.id) {
                                newTreeNode[f].checked=true;
                                newTreeNode[f].open=true;
                            }
                    }
                }
            }
            $.fn.zTree.init($("#courseTree"), setting, newTreeNode);
        }

    });
}();
function getCheckNode() {
    var treeObj = $.fn.zTree.getZTreeObj("courseTree");
    var nodes = treeObj.getCheckedNodes(true);
    var selectNode =null; //使用类json格式数据返回selectNode = [{"id":1,"name":"1"},{"id":2,"name":"2"}]
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].isParent == false) { //判断该选中节点是否是父节点判断是不是最子节点，因为初始化的时候给最子节点的id添加了users，所以匹配是不是字符串类型
                selectNode = nodes[i].id; //替换id中的users返回给后台
            }
        }
    }
    return selectNode;
};
$("#addTrain_add").on("click", function () {
    modal("添加课件");
    $("#table_courseId thead").show();
    seachChaneg();
});
/*表格弹窗方法*/
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
};
/*点击弹窗关闭按钮 清空数据*/
function fn() {
    layer.closeAll();
    $(".personne_cont_modal input").each(function () {
        $(this).val("");
    });
};
function seachChaneg() {
    var searchTrime = {};
    searchTrime.title = $("#Train_title").val();
    if ( getCheckNode()==null){
        searchTrime.subjectId=0;
    }else {
        searchTrime.subjectId = getCheckNode();
    }
    var str = '';
    $(".addTrain_item ul").empty();
    $.ajax({
        type: "post",
        url: contextPath + "/cp/listAll",
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
    });
}
$(".addTrain_item ul").on('click', 'li', function () {
    if ($(this).hasClass('chlickColor')) {
        $(this).removeClass('chlickColor');
        $(this).children().find('input').prop('checked', false)
    } else {
        $(this).addClass('chlickColor');
        $(this).children().find('input').prop('checked', true)
    }
})
$("#addTrain_no").on('click', function () {
    layer.closeAll();

})
var courseData = [];
var uniqueData = [];
/*保存课程课件的所有数据用于删除更新数据*/
$("#addTrain_Btn").on("click", function () {
    $("#addTrain_id tbody").empty()
    $(".addTrain_item ul li").each(function () {
        if ($(this).find('input').prop('checked')) {
            var a = {};
            a.id = $(this).attr("data_id");
            a.name = $(this).first().text();
            uniqueData.push(a);
        }

    });
    courseData = unique(uniqueData);
    layer.closeAll();
    $("#table_Train").show();
    addTable(courseData);
});
/*对象数组去重*/
function unique(arr) {
    var result = [], json = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        if (!json[arr[i].id]) {
            json[arr[i].id] = 1;
            result.push(arr[i]);  //返回没被删除的元素
        }
    }
    return result;
};
/*课程课件表格加载方法*/
function addTable(dataList) {
    if (Array.isArray(dataList)) {
        dataList = dataList;
    } else {
        dataList = [];
    }
    $("#table_courseId tbody").empty();
    var tableList = ["name"];
    var tableListNone = ["id"];
    var operation = ["tableDelete"];
    var title = ["删除"];
    TrainTable.dataAdd(dataList, "table_courseId", "itme", tableList, tableListNone, operation, title);
    delSingle();
};
function delSingle(){
    /*单个删除*/
    $('.tableDelete').on("click", function () {
        var index = $(this).parent().parent().index();
        courseData.splice(index, 1)
        uniqueData.splice(index, 1)
        $(this).parent().parent('tr').remove();
        if ($("#addTrain_id tbody tr").length == 0) {
            $("#addTrain_id").hide();
        }
    });
}
/*课程课件多个删除*/
$("#addTrain_del").on("click", function () {
    $("#table_Train tbody tr").each(function () {
        if ($(this).find("input").prop('checked')) {
            var index = $('#table_Train tbody tr').index(this);
            courseData.splice(index, 1);
            uniqueData.splice(index, 1)
            $(this).remove();
        }
        if (courseData.length == 0) {
            $("#addTrain_id thead").hide()
        }
    });

});
/*课程课件搜索加载数据*/
$('#question_ser').on("click", function () {
    seachChaneg()
})
//图片上传
$("#pic").on("click", "#fileimgupload", function () {
    $("#fileimg").click();
    getUploadImg("#fileimg", "#imgupload");
});
function getUploadImg(obj, obj2) {
    $(obj).on("change", function () {
        var fileList = this.files[0];
        if (fileList == undefined) {
            $(obj2).attr("src", "");
            $(obj2).hide();
            $(".image_close").show();
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
            $(".img-view").show();
            $(".image_close").show();
        }
    })
}
var imgArr = [];
$("#img_upload").on("click", function () {//input的file name必须为toUpload,否则拿不到值.....
    imgArr = [];
    var formData = new FormData($('#imgloadForm')[0]);
    $.ajax({
        url: basecontextPath + "/file/upload",
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
    }).done(function (res) {
        layer.msg('上传成功');
        imgArr.push(res.data);
    });
});
//删除上传的图片
$(".image_close").on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(".img-view").hide();
    $("#imgupload").attr('src', '');
    imgArr = [];
})
//添加课程页显示
$("#question_add").on("click", function () {
    $(".questionCont").hide();
    $(".message_cont_modal").show();
});
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
                $("#post-infosel-item ul").append(html_str);
            }
        }
    });
}
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
}
//*判断是否考试*/
var exam_PaperType = 0;
$("input[name='hasExam']").on("focus", function () {
    if($(this).val()==1){
        $(this).prop("checked", true);
        $("#autocompose").hide();
        $("#manualcompose").show();
        examAddModal()
    }
});
function examAddModal() {
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: ["试卷", "font-size:18px"],
        area: ['1050px', '760px'],
        shadeClose: false,
        content: $('#infogroup_exam'),
        cancel: function () {
            $("#infogroup_exam_title , #infogroup_exam textarea,#examName,#infogroup_exam_passCount,#auto_title,#auto_digest,#examDescribe").val("");
            $("#selected_test ul").html("");
            $(".test_result p span b").text("");
            $(".test_result p span input").val("");
            $("#questions_cont").empty();
            $("input[name='composetest_examtest']").prop("checked", false)
        },
        success: function () {
            if ($("input[name='hasExam']:checked").val() == 1) {//判断考试
                var exam_id = $("#exam_id").val();
                if (exam_id != null || exam_id != '') {//编辑考试
                    if (exam_PaperType == 0) {//编辑 课程手动组卷
                        $("#manual_radio").prop("checked", true);
                        $("#autocompose").hide();
                        $("#manualcompose").show();
                    } else if (exam_PaperType == 1) {//编辑 课程自动组卷
                        $("#auto_radio").prop("checked", true);
                        $("#autocompose").show();
                        $("#manualcompose").hide();
                    }
                    $("input[name='composetest_examtest']").focus(function(){
                        if ($(this).val()==0) {//手动组卷
                            $("#autocompose").hide();
                            $("#manualcompose").show();
                        }else{
                            $("#autocompose").show();
                            $("#manualcompose").hide();
                        }
                    })
                } else {//添加考试
                    $("input[id='manual_radio']").prop('checked',true);
                    $("#infogroup_exam_title").val("");
                    $("#infogroup_exam_passCount").val("");
                    $("#summation").val("");
                    $("input[name='composetest_examtest']").focus(function(){
                        if ($(this).val()==0) {//手动组卷
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
                            /*多选题每题的分值*/
                            $("#totalscore").text(0);
                            /*总分*/
                        } else if ($(this).val()==1) {//自动组卷
                            $(this).prop("checked", true);
                            $("#autocompose").show();
                            $("#manualcompose").hide();
                            $("#add_auto_questions").on("click", function () {
                                showHandZj();//自动组卷添加试题
                            })
                        }
                    })
                }
            } else if ($("input[name='hasExam']:checked").val() == 0) {//不考试
                $(this).prop("checked", true);
            }

        }
    });
}
$("#targetUserIds").on("click", function () {
    var UserIds = selectedUser();
    $.ajax({
        type: "post",
        url: basecontextPath + "/uuc/orgTreeWithSlaves",
        data: {userId: 0},
        dataType: "json",
        success: function (data) {
            treeData(data, UserIds);
            layer.open({
                type: 1,
                skin: 'layui-layer-molv', //皮肤
                title: ['考试对象', "font-size:18px"],
                area: ['450px', '450px'],
                shadeClose: false,
                content: $('#learn_object'),
                cancel: function (index) {
                },
                success: function () {
                    //树插件数据绑定
                    //initZtree();
                }
            });
        }
    });
});
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
};
//var reg = new RegExp("^[0-9]{1,2}(\.\[1-9]{0,1})$");
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
    $("#totalscore").text($('#singletest').val() * $("#singlenum").text() + $('#multitest').val() * $("#multinum").text());
});
var testItemIds = [];
var table_id = [];
$("#infogroup_exam_passCount").click(function(){
    $(this).val('');
})
//组卷确定提交事件
$("#infogroup_exam_save").on("click", function () {
    if ($("#manual_radio").prop("checked") == true) {
        $("#selected_test li").each(function () {
            testItemIds.push($(this).attr("id"));
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
    }else if(createPaperMode==1){
        if(parseInt($("#infogroup_exam_passCount").val())>parseInt($("#summation").val())){
            layer.msg('及格分数大于总分啦');
            return
        }
    }
    $("input[id='exam_ok']").prop('checked', true);
    $("#passScore").val($("#infogroup_exam_passCount").val()).attr('disabled', true);
    layer.closeAll();
});
$("#submitsave").on("click", function () {
    var dataSub = {};
    //题目
    if ($("#title").val() == null || $("#title").val() == "") {
        layer.msg("请输入课程题目");
        return;
    }
    dataSub.name = $("#title").val();
    //课程课件
    table_id = [];
    $("#table_courseId tbody tr").each(function () {
        table_id.push($(this).find("td").eq(2).text());
    });
    if (table_id.length < 1) {
        layer.msg("请添加课件！");
        return;
    }
    dataSub.courseIds = table_id;
    //缩略图
    dataSub.coverImg = JSON.stringify(imgArr)

    //课程简介
    if ($("#digest").val() == "") {
        layer.msg("请填写课程简介!");
        return;
    }
    dataSub.digest = $("#digest").val()
    //组卷数据
    var autoTestItems = [];
    //组卷数据
    var paperStructure = [];
    var examConfig = {};
    examConfig.createPaperMode = $("input[name='composetest_examtest']:checked").val();//试题是自动组卷还是手动组卷
    examConfig.name = $("#infogroup_exam_title").val();//试题的名字
    examConfig.note = $("#examDescribe").val();//试题的说明
    examConfig.passScore = $("#passScore").val();//试题及格分
    var createPaperMode = $("input[name='composetest_examtest']:checked").val(); //组卷类型
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
    //考试
    dataSub.hasExam = 0;
    if ($("input[name='hasExam']:checked").val()==1) {
        dataSub.hasExam = 1;
        dataSub.examConfig = JSON.stringify(examConfig);
    } else {
        dataSub.examConfig = JSON.stringify({});
        dataSub.hasExam = 0;
    }
    if ($("input[name='composetest_examtest']:checked").val() == 1) {//自动组卷
        delete examConfig.testItemIds
    }
    var url = null;
    var exam_id = $("#exam_id").val();
    if (exam_id != null && exam_id != '') {
        url = contextPath + '/courseCollection/updateCollection';
        dataSub.id = exam_id;
    } else {
        dataSub.id = '';
        url = contextPath + '/courseCollection/add';
    }
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        traditional: true,
        data: dataSub,
        success: function (data) {
            if (data.code == 1) {
                layer.msg(data.msg);
            } else {
                layer.msg(data.msg);
            }
            $(".questionCont").show();
            $(".managepage").hide();
        }
    });
    $("#returnback").click();
    $("#question_search_btn").click();
});
$("#add_questions").on("click", function () {
    var data={};
    var question__types_data = 0;
    var question_data = $.trim($("#qusstion-types p").text());
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
                    calculate_num();
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
    $("#singlescore_auto").text("0");
    /*计算总分数*/
    function calculate(){
        var questions_num = $("#multinum2").val();
        /*题目的数量*/
        var questions_score = $("#singletest2").val();
        /*每道题的分值*/
        var num = 0;
        if(questions_num == "" || questions_score == ""){
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
    $("#multinum2").keyup(function(){
        $("#singlescore_auto").text(calculate());
    })
    $("#singletest2").keyup(function(){
        $("#singlescore_auto").text(calculate());
    })
});
//自动组卷分值变化
$("#singlescore2").text($('#singlenum2').val() * $('#singletest2').val());
$("#multiscore2").text($('#multinum2').val() * $('#multitest2').val());
$("#totalscore2").text(parseInt($('#singlescore2').text()) + parseInt($("#multiscore2").text()));
$("#singlenum2").on("blur", function() {
    $("#singlescore2").text($('#singlenum2').val() * $('#singletest2').val());
    $("#totalscore2").text(parseInt($('#singlescore2').text()) + parseInt($("#multiscore2").text()));
});
$("#singletest2").on("blur", function() {
    $("#singlescore2").text($('#singlenum2').val() * $('#singletest2').val());
    $("#totalscore2").text(parseInt($('#singlescore2').text()) + parseInt($("#multiscore2").text()));
});
$("#multinum2").on("blur", function() {
    $("#multiscore2").text($('#multinum2').val() * $('#multitest2').val());
    $("#totalscore2").text(parseInt($('#singlescore2').text()) + parseInt($("#multiscore2").text()));
});
$("#multitest2").on("blur", function() {
    $("#multiscore2").text($('#multinum2').val() * $('#multitest2').val());
    $("#totalscore2").text(parseInt($('#singlescore2').text()) + parseInt($("#multiscore2").text()));
});
$("#returnback").on('click', returnback);
function returnback() {
    $(".image_close").click();
    $(".questionCont").show();
    $(".message_cont_modal").hide();
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
    $("#title").val(''); //考试的题目
    $("#targetUserIds").val('')//考试对象的人数.
    $("#examination_start").val('');//考试开始时间
    $("#examination_stop").val('');//考试结束时间
    $("#note").val('');//考试须知
    $("#table_courseId tbody").empty();
    $("#table_Train").hide();
    courseData = [];
    uniqueData = [];
    $("#digest").val('');
    $("#passScore").val('');
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
}
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
                    var it = data[i].itemType;
                    var itStr = "";
                    if (it == 0) {
                        itStr = "(单)";
                    } else if (it == 1) {
                        itStr = "(多)";
                    } else if (it == 1) {
                        itStr = "(问)";
                    }
                    str += "<li id='" + data[i].id + "' data-type='" + data[i].type + "'>" + itStr + data[i].question + "</li>";
                }
                $("#unselected_test ul").html(str);
            }
        }
    });
};
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
function tableEditFn() {
    $(".table-edit").on("click", editFn);
    function editFn(e) {
        e.stopPropagation();
        var self = this;
        var getId = singleId(self, "id");
        $(".questionCont").hide();
        $(".message_cont_modal").show();
        /*编辑某一个返回的这行的标识ID*/
        $.ajax({
            type: "post",
            url: contextPath + "/courseCollection/detailCollection",
            /*编辑表格的某一行的时候 传递这行的标识ID地址*/
            data: {
                id: getId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    //判断是否考试
                    var examConfig = JSON.parse(data.data.examConfig);
                    $("#exam_id").val(data.data.id);//课程唯一的id
                    $("#title").val(data.data.name); //课程的题目
                    // TODO回显
                    //Array.isArray(examConfig.testItemIds) ? examConfig.testItemIds : examConfig.testItemIds = [];
                    if (data.data.courses.length != 0) {
                        $("#addTrain_id tbody").empty()
                        $("#table_Train").show();
                        addTable(data.data.courses)
                    }
                    $(".img-view").show();  //回显缩略图start
                    imgArr = [];
                    imgArr = imgArr.concat(JSON.parse(data.data.coverImg))//上传的图片
                    if (imgArr.length != 0) {
                        $(".img-view").show();
                        $("#imgupload").attr('src', imgArr[0].accessUrl).show();
                        getUploadImg("#fileimg", "#imgupload");
                        $(".image_close").show();
                    } else {
                        $(".image_close").hide();
                    }//回显缩略图end
                    if (data.data.hasExam == 1) {
                        exam_PaperType = examConfig.createPaperMode;//判断编辑数据回显
                        if (examConfig.createPaperMode == 0) {//手动组卷
                            $("#manual_radio").prop('checked', 'true');
                            $("#autocompose").hide();
                            $("#manualcompose").show();
                            showHandZjv12(examConfig.testItems, examConfig.paperStructures);//回显手动数据
                        } else if (examConfig.createPaperMode == 1) {//自动组卷
                            $("#auto_radio").prop("checked", true);
                            $("#autocompose").show();
                            $("#manualcompose").hide();
                            showAutocreate(examConfig.paperStructures)//回显自动组件
                        }
                        /*课程简介*/
                        $("input[id='exam_ok']").prop('checked', true);//选中考试状态
                        $("#infogroup_exam_title").val(examConfig.name);//考试名称
                        $("#examDescribe").val(examConfig.note);//考试说明
                        $("#passScore").val(examConfig.passScore);//及格分数
                        $("#infogroup_exam_passCount").val(examConfig.passScore);//及格分数
                    } else if (data.data.hasExam == 0) {
                        $("input[id='exam_no']").prop('checked', true);
                    }
                    $("#digest").val(data.data.digest);
                } else {
                    layer.msg(data.msg);
                }
            }
        });
    };
}
//考试弹层返回
$("#return_exam").on('click', function () {
    layer.closeAll();
    $("#infogroup_exam_title , #infogroup_exam textarea,#examName,#infogroup_exam_passCount,#auto_title,#auto_digest,#examDescribe").val("");
    $("#selected_test ul").html("");
    $(".test_result p span b").text("");
    $(".test_result p span input").val("");
    $("#questions_cont").empty();
    $("input[name='composetest_examtest']").prop("checked", false)
})
//=========================================================
//回显自动组卷
function showAutocreate(autotest) {
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
    $("#questions_cont").append(questions_str);
    calculate_num();
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
//回显手动组卷
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
        $("<li/>").html("<a>×</a>" + pStr + exTestItemList[i].question).attr({
            "data-type": exTestItemList[i].type,
            "id": exTestItemList[i].id
        }).appendTo($("#selected_test ul"));
    }
}