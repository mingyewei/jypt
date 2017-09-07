/**
 * Created by pc on 2017/3/20.
 */
//这是员工分享审核页
var questTable = new tableDataOperation();
var selectedUsers=null;
var ztreeData=null;
/*加载树插件*/
$.ajax({
    type: "post",
    url: basecontextPath + "/cp/subjectTree.do",
    data: {userId: 0},
    dataType: "json",
    success: function (data) {
        ztreeData=data;
    }
});
/*返回选中中的数据*/
function getCheckNode() {
    var treeObj = $.fn.zTree.getZTreeObj("shareTree");
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
}
function treeData(data) {
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

    if (data.code == 1) {
        var newTreeNode = [];
        for (var i = 0; i < data.data.length; i++) {
            var treeNodeData = {};
            if (data.data[i].superId == "0") {
                treeNodeData.open = true;
            }
            for (var key in data.data[i]) {
                treeNodeData[key] = data.data[i][key];
                treeNodeData.open = true;
            }
            newTreeNode[i] = treeNodeData;
        }
        // //回显选中的成员
        if (selectedUsers) {
            console.log(selectedUsers);
            for (var f = 0; f < newTreeNode.length; f++) {
                if(typeof(newTreeNode[f].id) == "string"){
                    if (newTreeNode[f].id.replace(/users/, "") == selectedUsers) {
                        newTreeNode[f].checked = true;
                        newTreeNode[f].open = true;
                    }
                }else{
                    if (newTreeNode[f].id== selectedUsers) {
                        newTreeNode[f].checked = true;
                        newTreeNode[f].open = true;
                    }
                }
            }
        }
        $.fn.zTree.init($("#shareTree"), setting, newTreeNode);
    }
}
//=================
///!*搜索查询事件*!/
$("#shareAudit_search").on("click", tableList);
///!*查询条件保存*!/
var searchTrime = {};
tableList()
function tableList() {
    var typeNum;
    if ($('.patientlist_infosel p').text() == '视频资料内容模式') {
        typeNum = 1;
    } else if ($('.patientlist_infosel p').text() == '文档资料内容模式') {
        typeNum = 0;
    }
    ///!*题目*!/
    var topicVal = $.trim($("#resource_name").val());
    ///!*$.trim去除收尾空格*!/
    var subjectTypeId = {};
    ///!*判断题目类型*!/
    searchTrime.name = topicVal || '';
    searchTrime.publishStatus = subjectTypeId || '';
    searchTrime.currentPage = 1;
    searchTrime.pageSize = 10;
    searchTrime.type = typeNum;
    $.ajax({
        type: "post",
        url: contextPath + "/shareDocument/listItem",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                dataPageSize = data.data.pageSize;
                laypage({
                    cont: $('.question_page'),
                    pages: Math.ceil(data.data.total / data.data.pageSize),
                    ///!*总页数*!/
                    curr: data.data.currentPage || 1,
                    ///!*当前页*!/
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
var dataPageSize = 10;
function pageCallback(obj, first) {
    var currentPage = obj.curr;
    searchTrime.currentPage = currentPage;
    searchTrime.pageSize = dataPageSize;
    $.ajax({
        type: "post",
        url: contextPath + "/shareDocument/listItem",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            sccFunction(data);
            $("#table_check").removeClass("check-current");
            $("#table_lcheck").attr("data-check", "");
        }
    });
}
function sccFunction(data) {
    $("tbody").empty();
    ///!*显示数据的ID*!/
    var tableList = ["name", "typeName", "uploadUserName", "uploadTime", "StatusName", "uploadTime"];
    ///!*隐藏数据的ID*!/
    var tableListNone = ["id"];
    ///!*表格展示数据的List*!/
    var dataList = data.data.data;
    var sun_page = data.data.total;
    $("#sum_page span").text(sun_page);
    ///!*添加数据*!/
    var operation = ["table-edit"];
    var title = ["编辑"];
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].type == 0) {
            dataList[i].typeName = '文档资料';
        } else if (dataList[i].type == 1) {
            dataList[i].typeName = '视频资料';
        }
    }
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].reviewStatus == 0) {
            dataList[i].StatusName = '未审核';
        } else if (dataList[i].reviewStatus == 1) {
            dataList[i].StatusName = '已通过';
        } else if (dataList[i].reviewStatus == 2) {
            dataList[i].StatusName = '审核未通过';
        }
    }
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
    tableEditFn();
};
//删除操作
var submitdata = {};
questTable.checkBoxAll("table_check");
///!*多个删除*!/
$("#shareAudit_remove").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length <= 0) {
        layer.msg('请选择删除的列表！');
        return;
    }
    layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        }, function () {
            var ids = [];
            for (var i = 0; i < idArray.length; i++) {
                ids[i] = idArray[i];
            }
            $.ajax({
                type: "post",
                url: contextPath + "/shareDocument/delete",
                data: {
                    ids: idArray
                },
                traditional: true,
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        layer.close();
                        layer.msg('已删除', {
                            icon: 1,
                            time: 600
                        });
                        idArray = null;
                        tableList();
                    }
                }
            });
            layer.closeAll();
        }, function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
    )


});
function tableEditFn() {
    $(".table-edit").on("click", toeditFn);
    function toeditFn(e) {
        var self = this;
        var getId = singleId(self, "id");
        /*编辑某一个返回的这行的标识ID*/
        $(".questionCont").hide();
        $(".ShareAuditEdit").show();
        e.stopPropagation();
        $.ajax({
            type: "post",
            url: contextPath + "/shareDocument/detail",
            data: {id: getId},
            traditional: true,
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    selectedUsers=data.data.subjectId;
                    var data = data.data.documentContent;
                    submitdata = data;
                    submitdata.subjectId=selectedUsers;
                    submitdata.reviewStatus=2;
                    $("#info_name").val(data.name);
                    if (data.bindCoursePool == 0) {//不上传
                        $("#Select_mode").hide();
                        $("input[id='files_yes']").prop("checked", false).siblings().prop("checked", true);
                    } else if (data.bindCoursePool == 1) {//上传
                        $("#Select_mode").show();
                        if (data.showType == 0) {
                            $(".patientlist_infosel p").text("内容模式")
                        } else if (data.showType == 1) {
                            $(".patientlist_infosel p").text("文库模式");
                            var strNode = JSON.parse(data.attachments)[0].accessUrl;
                            var exp = /(.\.doc)|(.\.docx)|(.\.pdf)|(.\.xlsx)|(.\.excel)|(.\.ppt)|(.\.pptx)|(.\.txt)$/;
                            exp.test(strNode) ? $("#illegal_model").hide() : $("#illegal_model").show();
                        }
                        $("input[id='files_no']").prop("checked", false).siblings().prop("checked", true);
                    }
                    if (data.type == 0) {
                        $("#info_type").text('文档资料');
                        $("#videoFlv").hide();
                        if(JSON.parse(data.attachments).length>0){
                            $("#atta_file").show();
                            $("#load_atta").attr('href', JSON.parse(data.attachments)[0].accessUrl);
                            $("#load_atta").text(JSON.parse(data.attachments)[0].name);
                        }else{
                            $("#atta_file").hide();
                        }
                    } else if (data.type == 1) {
                        $("#info_type").text('视频资料');
                        $("#atta_file").hide();
                        $("#videoFlv").show();
                        $("#Select_mode").hide();
                        var videos = data.attachments;
                        videos = JSON.parse(videos);
                        var flag = false
                        if (videos[0].accessUrl.match(/\.(flv)$/i) == null) {
                            flag = true;
                        } else {
                            flag = false
                        }
                        var flashvars = {f: videos[0].accessUrl, c: 0, v: 40, wh: '12:9', e: 6, h: 4, st: 1, fc: 1};
                        var video = [videos[0].accessUrl];
                        CKobject.embed('http://www.ckplayer.com/ckplayer/6.5/ckplayer.swf', 'videoFlv', 'ckplayer_a1', '557px', '320px', flag, flashvars, video);
                    }
                    $("#info_digest").val(data.digest);
                    $("#info_content").val(data.content);
                    if (data.reviewStatus == 0) {
                        $("#pass_no").prop('checked', true).siblings().prop('checked', false)
                        $("#cause textarea").show()//未审核的时候显示的是审核未通过的页面
                        $(".files_up").hide();
                        $("#Select_mode").hide();
                    } else if (data.reviewStatus == 1) {
                        $("#pass_yes").prop('checked', true).siblings().prop('checked', false);
                        $("#cause textarea").hide();//审核通过
                        $(".files_up").show();//
                    } else if (data.reviewStatus == 2) {
                        $("#pass_no").prop('checked', true).siblings().prop('checked', false)
                        $("#cause textarea").show().text(data.reviewSuggestion);//审核未通过
                        $("input[id='files_yes']").attr('disabled', true);
                        $("#Select_mode").hide();
                        $(".files_up").hide();
                        $("input[id='files_no']").prop('checked',true).siblings().prop("checked", false);
                    }
                }
            }
        })
    }
};

//评分详情页跳转
$("#personn_reset").on("click", function () {
    $(".questionCont").show();
    $(".ShareAuditEdit").hide();
    $("#load_atta").text('');
    $("#cause textarea").text('');
    $("input[id='files_yes']").attr('disabled', false);
    $(".co_adit").show();
    $("#Select_mode").show();
})
var indexId;
function modal(info, title, content) {
    indexId = layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: info,
        shadeClose: false,
        content: content,
        cancel: function () {
            if(submitdata.id==undefined){
                $("#Select_mode").hide();
            }
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
    });
}
$("input[id='pass_no']").on("focus", function () {
    $(this).prop("checked", true).siblings().prop("checked", false);
    $("#cause textarea").show();//审核未通过
    $(".files_up").hide();
    $("#Select_mode").hide();
    submitdata.reviewStatus=2;
    submitdata.bindCoursePool=0;
});
$("input[id='pass_yes']").on("focus", function () {
    $(this).prop("checked", true).siblings().prop("checked", false);
    $("#cause textarea").text('').hide();//审核通过
    $(".files_up").show();//上传资料显示
    $("input[id='files_yes']").attr('disabled', false);
    $("input[id='files_no']").prop("checked", true).siblings().prop("checked", false);
    submitdata.reviewStatus=1;
    submitdata.reviewSuggestion='';
});
//弹出文档树
$("input[id='files_yes']").on("focus", function () {
    treeData(ztreeData,selectedUsers);
    modal(['500px', '450px'], "文库资料", $("#Info_doc"))
    $(this).prop("checked", true).siblings().prop("checked", false);
    if ($("#info_type").text() != '视频资料') {
        $("#Select_mode").show();
    }
    submitdata.bindCoursePool = 1;
});
$("input[id='files_no']").on("focus", function () {
    $(this).prop("checked", true).siblings().prop("checked", false);
    $("#Select_mode").hide();
    submitdata.bindCoursePool = 0;
});
//文档树返回
$("#Library_cancel").on("click", function () {
    layer.close(indexId);
    if(submitdata.id==undefined){
        $("#Select_mode").hide();
    }
});
//上传资料库保存
$("#Library_sure").on("click", function () {
    var subId = getCheckNode()[0];
    if (subId == undefined) {
        layer.msg('请选择一个资料节点');
        return;
    }
    selectedUsers=subId.id
    submitdata.subjectId = subId.id;
    layer.close(indexId);
    $("#files_no").prop("checked", false);
    $("#files_yes").prop("checked", true);
    submitdata.bindCoursePool = 1;
    //获取上传资料库的内容id
})
//文档时判断文件格式是否是非法格式
var flagimg=true;
var flagfile=true;
$("#ary_mode").on("click", function (e) {
    if (e.target.innerText == '文库模式') {
        if(JSON.parse(submitdata.attachments).length==0){
            layer.msg('没有文档附件,无法上传文库!');
            flagfile=false;
            return;
        }
        var strNode = $("#load_atta").text();
        var exp = /(.\.doc)|(.\.docx)|(.\.pdf)|(.\.xlsx)|(.\.excel)|(.\.ppt)|(.\.pptx)|(.\.txt)$/;
        flagimg=exp.test(strNode)
        exp.test(strNode) ? $("#illegal_model").hide() : $("#illegal_model").show();
    } else {
        $("#illegal_model").hide()
    }
});
$("#personn_submit").on("click", function () {
    submitdata.reviewSuggestion=$("#cause textarea").val();
    if(submitdata.bindCoursePool==1){
        var text = $("#pattern p").text();
        if (text == "内容模式") {
            submitdata.showType = 0;
        } else if (text == "文库模式") {
            submitdata.showType = 1;
            if(!flagfile){
                layer.msg('没有文档附件,无法上传文库!');
                return
            }
            if(!flagimg){
                layer.msg('附件存在非法模式');
                return;
            }
        }
    }else{
        submitdata.showType = '';
    }
    $.ajax({
        type: "post",
        url: contextPath + "/shareDocument/edit",
        data: submitdata,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                layer.msg('提交成功');
                tableList();
                $(".co_adit").show()
                $("#Select_mode").show()
                $("input[id='files_yes']").attr('disabled', false);
                $("#cause textarea").text('');
                $(".questionCont").show();
                $(".ShareAuditEdit").hide();
                $("#load_atta").text('');
            } else if (data.code == 0) {
                layer.msg('提交失败')
                return
            }
        }
    });
})
