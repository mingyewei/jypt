/**
 * Created by Administrator on 2017/1/5.
 */
var questTable = new tableDataOperation();
var dataPageSize = 10;
/*存放tree 点击后的 id name*/
var clickNodeID = 1;
var dataUrl = contextPath + '/cp/list.do';
var Presentation = [];
+(function () {
    /**
     * 初始化tree数据
     */
    /*初始化树*/
    var url = basecontextPath + "/cp/subjectTree.do";
    $.getJSON(url, function (data) {
        var newTreeNode = [];
        if (data.code == 1) {
            for (var i = 0; i < data.data.length; i++) {
                var treeNodeData = {};
                treeNodeData.open = true;
                for (var key in data.data[i]) {
                    treeNodeData[key] = data.data[i][key];
                }
                newTreeNode[i] = treeNodeData;
                clickNodeID = newTreeNode[0].id;
                $("#treeData").attr("data-id", newTreeNode[0].id);
            }
        }
        $.fn.zTree.init($("#treeUsers"), setting, newTreeNode);
        /*初始化表格*/
        tableData(dataUrl);
        $("#addParent").on("click", {isParent: true}, add);
        $("#addLeaf").on("click", {isParent: false}, add);
        $("#edit").on("click", edit);
        $("#remove").on("click", remove);
    });
})()
function treeNode2JsonData(treeNode) {
    var orgData = {};
    orgData.id = treeNode.id;
    orgData.superId = treeNode.superId;
    orgData.name = treeNode.name;
    return orgData;
}
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
//      beforeRemove: beforeRemove,//用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作默认值：null
        beforeRename: beforeRename,//用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
        //onRemove: onRemove,//用于捕获删除节点之后的事件回调函数
        onRename: onRename,
        beforeClick: beforeClick
    }
};
function beforeRemove(treeId, treeNode) {
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        layer.msg("节点名称不能为空！", {icon: 1});
        var zTree = $.fn.zTree.getZTreeObj("treeUsers");
        setTimeout(function () {
            zTree.editName(treeNode)
        }, 10);
        return false;
    }
    return true;
};
function beforeClick(treeId, treeNode, clickFlag) {
    clickNodeID = treeNode.id;
    $("#treeData").attr("data-id", treeNode.id).val(treeNode.name);
    tableData(dataUrl);
    return (treeNode.click != false);
}
function onRename(e, treeId, treeNode) {/*编辑增加*/
    var ajaxUrl = basecontextPath;
    if (treeNode.id) {
        ajaxUrl = ajaxUrl + "/cp/updateSubject";
    } else {
        ajaxUrl = ajaxUrl + "/cp/addSubject";
    }
    $.ajax({
        type: "post",
        url: ajaxUrl,
        datatype: "json",
        data: treeNode2JsonData(treeNode),
        success: function (data) {
            var code = data.code;
            if (code == 1) {
                location.reload()
                treeNode.id = data.data.id;
            }
        }
    });
}
var newCount = 1;
function add(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeUsers"),
        isParent = e.data.isParent,
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (treeNode) {
        treeNode = zTree.addNodes(treeNode, {
            id: "",
            pId: treeNode.id,
            isParent: isParent,
            name: "新增节点" + (newCount++),
        })
    } else {
        if (nodes.length == 0) {
            layer.msg("请先选择一个节点！", {icon: 1});
            return;
        }
        treeNode = zTree.addNodes(null, {id: "", pId: 0, isParent: isParent, name: "new node" + (newCount++)});
        return;
    }
    if (treeNode) {
        zTree.editName(treeNode[0]);
    } else {
        layer.msg("叶子节点被锁定，无法增加子节点！", {icon: 1});
    }
};
function edit() {
    var zTree = $.fn.zTree.getZTreeObj("treeUsers"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        layer.msg("请先选择一个节点！", {icon: 1});
        return;
    }
    zTree.editName(treeNode);
}

function remove() {
    var zTree = $.fn.zTree.getZTreeObj("treeUsers"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        layer.msg('请先选择一个节点', {icon: 1});
        return;
    }
    $.ajax({
        type: "post",
        url: basecontextPath + "/cp/delNodeCheck",
        datatype: "json",
        data: {subjectId: treeNode2JsonData(treeNode).id},
        success: function (data) {
            var code = data.code;
            if (code == 0) {
                layer.msg("操作失败！", {icon: 1, time: 1000});
            }
            if (code == 1) {
                layer.confirm("您确定删除此节点", {
                    btn: ['删除', '取消']
                }, function () {
                    var callbackFlag = true;
                    var ajaxUrl = basecontextPath + "/cp/deleteSubject";
                    $.ajax({
                        type: "post",
                        url: ajaxUrl,
                        datatype: "json",
                        data: treeNode2JsonData(treeNode),
                        success: function (data) {
                            var code = data.code;
                            if (code == 1) {
                                zTree.removeNode(treeNode, callbackFlag);
                                layer.msg("已经删除", {icon: 1, time: 1000});
                            }
                        }
                    });
                })
            }
            if (code == 2) {
                layer.msg("该节点为根节点无法删除!", {icon: 1, time: 1000});
            }
            if (code == 3) {
                layer.confirm("该节点下有课程资料，您确定要删除？", {
                    btn: ['删除', '取消']
                }, function () {
                    var callbackFlag = true;
                    var ajaxUrl = basecontextPath + "/cp/deleteSubject";
                    $.ajax({
                        type: "post",
                        url: ajaxUrl,
                        datatype: "json",
                        data: treeNode2JsonData(treeNode),
                        success: function (data) {
                            var code = data.code;
                            if (code == 1) {
                                zTree.removeNode(treeNode, callbackFlag);
                                layer.msg("已经删除", {icon: 1, time: 1000});
                                tableData(dataUrl);
                            }
                        }
                    });
                })
            }
        }
    });
}
/**
 * 搜索方法
 */
$("#question_search_btn").on("click", searchBtn);
function searchBtn() {
    tableData(dataUrl);
}
/**
 * click Tree回调方法
 * @type {number}
 */

/**
 * 有条件的表格数据请求
 *
 */
var conditionData = {};
function tableData(dataUrl) {
    var dataPageSize = 10;
    /*题目*/
    var topicVal = $.trim($("#topic").val());
    /*$.trim去除收尾空格*/
    var typeShowType = $("#course_class p").text();
    /*类别*/
    var type = "";
    if (typeShowType == "文档资料") {
        type = 0;
    } else if (typeShowType == "视频课程") {
        type = 1;
    }
    conditionData.subjectId = clickNodeID;
    conditionData.title = topicVal;
    conditionData.crTypeId = type;
    conditionData.currentPage = 1;
    conditionData.pageSize = 10;
    $.ajax({
        type: "post",
        url: dataUrl,
        data: conditionData,
        dataType: "json",
        success: function (data) {
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
        }
    });
    /**
     * 分页回调函数
     * @param obj
     * @param first
     */
    function pageCallback(obj, first) {
        var currentPage = obj.curr;
        conditionData.currentPage = currentPage;
        conditionData.pageSize = dataPageSize;
        $.ajax({
            type: "post",
            url: dataUrl,
            dataType: "json",
            data: conditionData,
            success: function (data) {
                if (data.code == 1) {
                    sccFunction(data);
                    /*url 搜索条件数据提交的地址*/
                    $("#table-dataallcheck").removeClass("check-current");
                    $("#table-dataallcheck").attr("data-check", "");
                    tableEditFn();
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
        $("tbody").empty();
        /*显示数据的ID*/
        var tableList = ["name", "type", "createTime"];
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
                if (dataList[i].type == 0) {
                    dataList[i].type = "文档资料"
                } else {
                    dataList[i].type = "视频课程"
                }
            }
        }
        /*添加数据*/
        var operation = ["table-edit", "table-tier"];
        var title = ["编辑", "层级关系"];
        questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
        /*单个点击删除*/
        questTable.singDel("id", "table_id", contextPath + "/course/delete", "#question_search_btn");
    }
}
//====================================================
function tableEditFn() {
    $(".table-tier").on("click", fileHierarchy);
    /*文件层级关系方法*/
    function fileHierarchy(e) {
        e.stopPropagation();
        var self = this;
        var getId = singleId(self, "id");
        $.ajax({
            type: "post",
            url: contextPath + "/cp/subjectPath",
            data: {
                courseId: getId
            },
            dataType: "json",
            success: function (data) {
                layer.tips(data.data, self, {
                    tips: [1, '#1AA094'],
                    time: 2000
                });
            }
        })
    }

    //编辑添加页
    $(".table-edit").on("click", toeditFn);
    function toeditFn(e) {
        e.stopPropagation();
        var self = this;
        var getId = singleId(self, "id");
        $("#course_HomePage").hide();
        $("#course_Detailpage").show();
        $.ajax({
            type: "post",
            url: contextPath + "/course/detail",
            data: {
                id: getId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    data = data.data.detail
                    //标识数据id
                    $("#subid").val(data.id);
                    //题目
                    $("#title").val(data.title);
                    //资料库树id
                    clickNodeID = data.subjectId;
                    getZtree();
                    var accessory;
                    if (data.type == 0) {
                        accessory = JSON.parse(data.attachments);
                        //文档模式
                        if (data.showType == 0) {
                            //内容编辑
                            $(".managepage_group1").show();
                            $("#content_writer").removeClass('mode-switch-tab-wen').siblings().addClass("mode-switch-tab-wen");
                            $("#uploadForm label").text('附件上传：')
                        } else if (data.showType == 1) {
                            //文档打开
                            $(".managepage_group1").hide()
                            $("#content_writer").addClass('mode-switch-tab-wen').siblings().removeClass("mode-switch-tab-wen");
                            $("#uploadForm label").text('文档上传：')
                        }
                        $("input[value='0']").prop('checked', true);
                        $("input[value='0']").trigger('click', checkinp);
                        //课程简介
                        $("#switchdata-content textarea").val(data.digest);
                        $("#course_introduction textarea").val('');
                    } else if (data.type == 1) {
                        accessory = JSON.parse(data.videos);
                        //视频模式
                        $("input[value='1']").prop('checked', true);
                        $("input[value='1']").trigger('click', checkinp)
                        //视频简介
                        $("#switchdata-content textarea").val('');
                        $("#course_introduction textarea").val(data.digest);
                    }
                    $("input[name='crTypeId']").attr('disabled', true);
                    Presentation = [];
                    for (var k = 0; k < accessory.length; k++) {
                        Presentation.push(accessory[k]);
                    }
                    CKEDITOR.instances.editor01.setData(data.content);
                    playfile();
                }
            }
        })

    }
}
/*全选*/
questTable.checkBoxAll("table-dataallcheck");
/*多个删除*/
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length < 1) {
        layer.msg('请选择删除的列表');
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
//===============================详情添加与编辑=======================================================
function getZtree() {
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
    $.getJSON(basecontextPath + "/cp/subjectTree.do", function (data) {
        if (data.code == 1) {
            var newTreeNode = [];
            for (var i = 0; i < data.data.length; i++) {
                var treeNodeData = {};
                if (data.data[i].superId == "0") {
                    treeNodeData.open = true;
                }
                for (var key in data.data[i]) {
                    treeNodeData[key] = data.data[i][key];
                }
                newTreeNode[i] = treeNodeData;
            }
            for (var f = 0; f < newTreeNode.length; f++) {
                if (newTreeNode[f].id == clickNodeID) {
                    $("#modalOrgName").val(newTreeNode[f].name);
                    newTreeNode[f].checked = true;
                    newTreeNode[f].open = true;
                }
            }
            $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
        }
    });
};
var modalUserName = function () {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var selectNode = {};
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked == true) {
                selectNode.id = nodes[i].id;
                selectNode.name = nodes[i].name;
            }
        }
    }
    return selectNode;
}


//考试对象确定按钮事件
$("#treeSubmit").on("click", function () {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var selectNode = {};
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].checked == true) {
                selectNode.id = nodes[i].id;
                selectNode.name = nodes[i].name;
            }
        }
    }
    $("#modalOrgName").val(selectNode.name);
    $(".zTreeDemoBackground1").css("display", "none");
    $("#subjectId").val(selectNode.id);
});
//切换详情编辑与添加
$("#question_add").on('click', function () {
    $("#course_HomePage").hide();
    $("#course_Detailpage").show();
    $("#title").val('');
    $("#modalOrgName").val('');
    $("#switchdata-content textarea").val('');
    $("#course_introduction textarea").val('');
    $("#editor01").text('');
    $(".data-display ul").hide();
    Presentation = [];
    getZtree();
})
var strPres = '';
//返回course主页
$("#sourse_Backtrack").on("click", function () {
    CKEDITOR.instances.editor01.setData('');
    $("#course_HomePage").show();
    $("#course_Detailpage").hide();
    $(".data-display ul").hide().empty();
    $("#modalOrgName").text('');
    $("#subid").val('');
    clickNodeID = 1;
    strPres = '';
    $("input[name='crTypeId']").attr('disabled', false);
})
//附件浏览
$(".browse").on("click", function () {
    //打开预览
    getUploadFileFun.call(this);
});
function getUploadFileFun() {
    var filelistName = '';
    $('.filetips').text('') .show();
    $(".data-display ul").show();
    var obj = $(this).siblings("input[name='toUpload']").click();
    var obj2 = $(this).siblings(".fileupload_tips")
    $(obj).on("change", function () {
        var fileList = this.files[0];
        filelistName = fileList.name;
        if (fileList == undefined) {
            obj2.text("");
        } else {
            obj2.text(fileList.name);
        }
    });

}
//上传附件与文档
$("#cp_upload").on("click", function () {
    var fileVal = $(this).siblings("input[name='toUpload']").val();
    if (fileVal == '') {
        layer.msg('请选择上传文件');
        return;
    } else {
        if (!$(".modeDocx").hasClass('mode-switch-tab-wen')) {//这是文档模式
            Presentation = [];
            if (fileVal.match(/\.(doc|docx|excel|ppt|pdf|txt|xlsx|pptx|xls)$/i) == null) {
                layer.msg('请选择文档格式的文件');
                return;
            }
        }
        doUpload($("#uploadForm"));
        $("input[name='toUpload']").val('');
        $(".fileupload_tips").val('').hide();
    }
});
function playfile() {
    strPres = '';
    for (var i = 0; i < Presentation.length; i++) {
        strPres += '<li><i>' + Presentation[i].name + '</i><a>X</a></li>';
    }
    $(".data-display ul").html(strPres).show();
    $(".data-display a").on('click', function (e) {
        e.stopPropagation();
        Presentation.splice($(this).parent('li').index(), 1);
        $(this).parent().remove();
        if (Presentation.length == 0) {
            $(".data-display ul").hide();
        }
        strPres = '';
    });
}
//视频上传
$("#cpvideo_upload").on("click", function () {
    $("#progress").show();
    Presentation = [];
    var fileVal = $(this).siblings("input[name='toUpload']").val();
    if ($("#fileupload_tips").val() == '') {
        layer.msg('请选择上传视频');
        return;
    }
    if (fileVal.match(/\.(mp4|ogg|mpg4|webm|flv)$/i) == null) {
        layer.msg('请选择mpg4或flv格式的视频');
        return;
    }
    doUpload($("#upload_video"));
    $(this).siblings("input[name='toUpload']").val('');
    $(this).siblings(".fileupload_tips").html('').hide();
})
// 上传方法
function doUpload(formdata) {
    var formData = new FormData(formdata[0]);
    $.ajax({
        url: basecontextPath + "/file/upload",
        type: 'POST',
        data: formData,
        async: false,
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (resData) {
            if (resData.code == 1) {
                layer.msg('上传成功！')
                Presentation.push(resData.data);
                playfile()
            } else {
                layer.msg('上传失败，请重试！')
            }
        },
        error: function (returndata) {
            console.log(returndata);
        }
    })
}
$(".downs").on("click", function () {
    $(".zTreeDemoBackground1").toggle("display")
});
$(".mode-switch-tab span").on("click", function () {
    $(this).removeClass('mode-switch-tab-wen').siblings().addClass('mode-switch-tab-wen');
    $('.filetips').text('').hide();
    $("#switchdata-content textarea").val('');
    CKEDITOR.instances.editor01.setData('');
    Presentation = [];
    $(".data-display ul").hide().empty();
    if ($(".modeDocx").hasClass('mode-switch-tab-wen')) {
        $(".managepage_group1").show();
        $("#uploadForm label").text('附件上传：')
    } else {
        $("#uploadForm label").text('文档上传：')
        $(".managepage_group1").hide()
    }

})
//切换视频课程与文档资料
$("input[name='crTypeId']").on("click", checkinp);
function checkinp() {
    var checkFlag = $(this).prop("checked");
    if (checkFlag) {
        var value = $(this).val();
        if (value == 1) {
            $("#video_div").show();
            $("#switchdata-content").hide();
            $("#course_introduction").show();
            $("#switchdata-content textarea").val('');
        } else {
            $("#video_div").hide();
            $("#course_introduction").hide();
            $("#switchdata-content").show();
            $("#course_introduction textarea").val('');
        }
        Presentation = [];
        $(".data-display ul").hide();
    }
}
//点击提交事件
//保存按钮事件
$("#sourse_submit").on("click", function () {
    if ($("#title").val() == '') {
        layer.msg('题目不能为空');
        return;
    }
    if ($("#modalOrgName").val() == '') {
        layer.msg('资料库不能为空，请选择资料库内容');
        return
    }
    var digest = '';
    var type = '';
    var showType = '';
    if ($("input[name='crTypeId']").prop("checked") || $("input[name='crTypeId']").val() == 1) {
        if ($("#switchdata-content textarea").val() == '') {
            layer.msg('课程简介不能为空');
            return
        }
        if (!$("#content_writer").hasClass("mode-switch-tab-wen")) {
            showType = 0;
            if (CKEDITOR.instances.editor01.getData() == '') {
                layer.msg('内容不能为空');
                return;
            }
        } else {
            showType = 1;
        }
        digest = $("#switchdata-content textarea").val();
        type = 0;
    } else {
        if ($("#course_introduction textarea").val() == '') {
            layer.msg('视频简介不能为空');
            return
        }
        digest = $("#course_introduction textarea").val();
        type = 1;
        if (Presentation.length == 0) {
            layer.msg('请选择上传视频');
            return;
        }
    }
    var data = {
        title: $("#title").val(),
        digest: digest,
        content: CKEDITOR.instances.editor01.getData(),
        subjectId: modalUserName().id,
        type: type,
        showType: showType,
        attachments: JSON.stringify(Presentation),
        id: $("#subid").val()
    }
    var urlupload;
    if ($("#subid").val() != '') {
        urlupload = basecontextPath + "/course/update";

    } else {
        urlupload = basecontextPath + "/course/add";
    }
    if (data.type == 1) {
        data.content = '';
        data.showType = '';
        data.videos = data.attachments;
        data.attachments = '';
    }

    $.ajax({
        url: urlupload,
        type: 'post',
        data: data,
        dataType: 'json',
        success: function (resData) {
            if (resData.code == 1) {
                $("#course_HomePage").show();
                $("#course_Detailpage").hide();
                strPres = '';
                $("#subid").val('');
                $("input[name='crTypeId']").attr('disabled', false);
            } else {
            }
        }
    })
    searchBtn();
});
