/**
 * Created by Administrator on 2017/1/9.
 */
/**
 /*存放tree 点击后的 id name*/
var librayyTable = new tableDataOperation();
var librarclickNodeID = "";
var libraryDataUrl = contextPath + "/kb/list";
/**
 /**
 * 初始化tree数据
 */
!function () {
    /*初始化树*/
    var url = basecontextPath + "/kb/subjectTree";
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
                librarclickNodeID = newTreeNode[0].id;
            }
        }
        $.fn.zTree.init($("#librarytreeUsers"), settings, newTreeNode);
        /*初始化表格*/
        librarytableData(libraryDataUrl);
    });
}();

$("#addParent").on("click", {isParent: true}, add);
$("#addLeaf").on("click", {isParent: false}, add);
$("#edit").on("click", edit);
$("#remove").on("click", remove);


function treeNode2JsonData(treeNode) {
    var orgData = {};
    orgData.id = treeNode.id;
    orgData.superId = treeNode.superId;
    orgData.name = treeNode.name;
    return orgData;
}

var settings = {
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
        beforeClick: libraryClick
    }
};
function beforeRemove(treeId, treeNode) {
    return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
}
function beforeRename(treeId, treeNode, newName) {
    if (newName.length == 0) {
        layer.msg("节点名称不能为空！", {icon: 1});
        var zTree = $.fn.zTree.getZTreeObj("librarytreeUsers");
        setTimeout(function () {
            zTree.editName(treeNode)
        }, 10);
        return false;
    }
    return true;
}
function onRename(e, treeId, treeNode) {/*编辑增加*/
    var ajaxUrl = basecontextPath;
    if (treeNode.id) {
        ajaxUrl = ajaxUrl + "/kb/updateSubject";
    } else {
        ajaxUrl = ajaxUrl + "/kb/addSubject";
    }
    $.ajax({
        type: "post",
        url: ajaxUrl,
        datatype: "json",
        data: treeNode2JsonData(treeNode),
        success: function (data) {
            var code = data.code;
            if (code == 1) {
                location.reload();
                treeNode.id = data.data.id;
            }
        }
    });
}
var newCount = 1;
function add(e) {
    var zTree = $.fn.zTree.getZTreeObj("librarytreeUsers"),
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
        treeNode = zTree.addNodes(null, {id: "", pId: 0, isParent: isParent, name: "新增节点" + (newCount++)});
        return;
    }

    if (treeNode) {
        zTree.editName(treeNode[0]);
    } else {
        layer.msg("叶子节点被锁定，无法增加子节点！", {icon: 1});
    }
};
function edit() {
    var zTree = $.fn.zTree.getZTreeObj("librarytreeUsers"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        layer.msg("请先选择一个节点！", {icon: 1});
        return;
    }
    zTree.editName(treeNode);
}

function remove() {
    var zTree = $.fn.zTree.getZTreeObj("librarytreeUsers"),
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];
    if (nodes.length == 0) {
        layer.msg('请先选择一个节点', {icon: 1});
        return;
    }
    $.ajax({
        type: "post",
        url: basecontextPath + "/kb/delNodeCheck",
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
                    var ajaxUrl = basecontextPath + "/kb/deleteSubject";
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
                    var ajaxUrl = basecontextPath + "/kb/deleteSubject";
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
                                librarytableData(libraryDataUrl);
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
$("#library-question_search_btn").on("click", function () {
    librarytableData(libraryDataUrl)
});
/*资料库管理关联数据*/
$("#question_add").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    var kbSubjectId = $("#libraryData").attr("data-id");
    if (idArray.length <= 0) {
        layer.msg('请选择关联数据！');
        return;
    } else if (kbSubjectId == "") {
        layer.msg('请选择关联的节点！');
        return;
    }
    $.ajax({
        type: "post",
        url: contextPath + "/kb/checkBound",
        data: {courseIds: idArray},
        traditional: true,
        dataType: "json",
        success: function (data) {
            if (data.code == 2) {
                eqmodal("重复挂载数据");
                var str = "";
                for (var i = 0, len = data.data.length; i < len; i++) {
                    str += "<li>《<span>" + data.data[i].courseName + "</span>》已经归属于《<span>" + data.data[i].kbSubjectPath + "</span>》节点</li>";
                }
                ;
                $(".equa_cont ul").append(str);
            } else if (data.code == 1) {
                $.ajax({
                    type: "post",
                    url: contextPath + "/kb/bindCourse",
                    data: {courseIds: idArray, subjectId: kbSubjectId},
                    traditional: true,
                    dataType: "json",
                    success: function (data) {
                        if (data.code == 1) {
                            layer.msg('已经关联', {
                                icon: 1,
                                time: 600
                            });
                            layer.closeAll();
                            $(".equa_cont ul").empty();
                            idArray = null;
                            tableData(coutsedataUrl);
                            librarytableData(libraryDataUrl)

                        }
                    }
                });
            } else if (data.code == 1) {
                layer.msg('加载失败！', {
                    icon: 1,
                    time: 600
                });
            }
        }
    })
});

/**
 * 文库树删除数据
 */
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("library-table_id", "id");
    if (idArray.length <= 0) {
        layer.msg('请选择删除的数据！');
        return;
    } else {
        layer.confirm("是否确认删除此关联数据吗？", {
            btn: ['确定', "取消"]
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/kb/removeCourse",
                data: {courseIds: idArray, subjectId: -1},
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        layer.msg("数据删除成功！！", {
                            icon: 1,
                            time: 600
                        });
                        idArray = null;
                        tableData(coutsedataUrl);
                        librarytableData(libraryDataUrl);
                    }
                }
            })
        }, function () {
            return
        })

    }
});
/**
 * click Tree回调方法
 * @type {number}
 */
function libraryClick(treeId, treeNode, clickFlag) {
    librarclickNodeID = treeNode.id;
    $("#libraryData").attr("data-id", treeNode.id).val(treeNode.name);
    librarytableData(libraryDataUrl);
    return (treeNode.click != false);
}
/**
 * 有条件的表格数据请求
 *
 */
function librarytableData(libraryDataUrl) {
    var conditionData = {};
    var dataPageSize = 5;
    /*题目*/
    var topicVal = $.trim($("#library-topic").val());
    /*$.trim去除收尾空格*/
    conditionData.title = topicVal;
    conditionData.subjectId = librarclickNodeID;
    conditionData.currentPage = 1;
    conditionData.pageSize = 5;
    $.ajax({
        type: "post",
        url: libraryDataUrl,
        data: conditionData,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                dataPageSize = data.data.pageSize;
                laypage({
                    cont: 'libraryquestion_page',
                    pages: Math.ceil(data.data.total / data.data.pageSize), /*总页数*/
                    curr: data.data.currentPage || 1, /*当前页*/
                    jump: pageCallback
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
                        url: libraryDataUrl,
                        dataType: "json",
                        data: conditionData,
                        success: function (data) {
                            if (data.code == 1) {
                                if (data.data.data == undefined || data.data.data.length == 0) {
                                    $("#library-table_id tbody").empty();
                                    layer.msg('该节点没有数据', {icon: 1});
                                    return false;
                                } else {
                                    sccFunction(data);
                                    /*url 搜索条件数据提交的地址*/
                                    tableEditFn();
                                    $("#librarytable-dataallcheck").removeClass("check-current");
                                    $("#librarytable-dataallcheck").attr("data-check", "");
                                }
                            }
                        }
                    })
                }
            } else if (data.code == 2) {
                layer.msg(data.msg);
                $("tbody").empty();
                $("#question_page").empty();

            }
        }
    });
    /**
     * 文件层级
     */
    function tableEditFn() {
        $("#library-table_id .table-library-tier").on("click", fileHierarchy);
        /*文件层级关系方法*/
        function fileHierarchy() {
            var self = this;
            var getId = singleId(self, "id");
            $.ajax({
                type: "post",
                url: contextPath + "/kb/subjectPath",
                data: {
                    courseId: getId
                },
                dataType: "json",
                success: function (data) {
                    layer.tips(data.msg, self, {
                        tips: [1, '#4faa4f'],
                        time: 2000
                    });
                }
            })
        };
        preview("table-preview");

    }


    /**
     * 动态加载表格方法
     * @param data
     * @param url 查询地址
     */
    function sccFunction(data) {
        $("#library-table_id tbody").empty();
        /*显示数据的ID*/
        var tableList = ["name"];
        /*隐藏数据的ID*/
        var tableListNone = ["id"];
        /*表格展示数据的List*/
        var dataList = data.data.data;
        var sun_page = data.data.total;
        $("#sum_page span").text(sun_page);
        /*添加数据*/
        var operation = ["table-preview", "table-library-tier"];
        var title = ["预览", "层级关系"];
        librayyTable.dataAdd(dataList, "library-table_id", "item", tableList, tableListNone, operation, title);
    }

};
/*弹窗方法*/
function modal(title) {
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: ['800px', '500px'],
        shadeClose: false,
        anim:-1,
        content: $('#course_modal'),
        zIndex: layer.zIndex, //重点1
        success: function(layero){
            layer.setTop(layero); //重点2
        },
        cancel: function () {
            $("#title").text("");
            $(".digest_title").text("");
            $(".course_cont_title").text("");
            $(".file-dowm-name").text("");
            $(".file-dowm-name").attr("href", "");
            $(".coures_video").hide();
            layer.closeAll();
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            $("#library-table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            $("#flvVideo").empty();
        }

    });
};
/**
 * 文件预览
 */
function preview(ele) {
    var tableEdit = document.getElementsByClassName(ele);
    var tableEditLeng = tableEdit.length;
    for (var i = 0; i < tableEditLeng; i++) {
        addEvent(tableEdit[i], "click", previewData);
    }
    /*文件预览*/
    function previewData(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked', true);
        var self = this;
        var getId = singleId(self, "id");
        $.ajax({
            type: "post",
            url: contextPath + "/course/preview",
            data: {
                courseId: getId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    modal("文件预览");
                    $("#title").text(data.data.title);
                    $(".digest_title").text(data.data.digest);
                    $(".course_cont_title").html(data.data.content);
                    if (data.data.videos != undefined) {
                        var videos = data.data.videos;
                        $(".coures_video").show();
                        $(".file_down").hide();
                        var flag=false
                        if(JSON.parse(videos)[0].accessUrl.match(/\.(flv)$/i)== null){
                            flag=true;
                        }else{
                            flag=false
                        }
                        var flashvars = {f:JSON.parse(videos)[0].accessUrl,c: 0,v: 40,wh: '16:9',e: 6,h: 4,st: 1,fc: 1};
                        var  video=[JSON.parse(videos)[0].accessUrl];
                        CKobject.embed('http://www.ckplayer.com/ckplayer/6.5/ckplayer.swf', 'flvVideo', 'ckplayer_a1', '100%', '100%',flag,flashvars,video);
                    }else if (data.data.attachments != undefined) {
                        $(".file_down").show();
                        var attachments = JSON.parse(data.data.attachments)[0]
                        $(".file-dowm-name").text(attachments.name);
                        $(".file-dowm-name").attr("href", attachments.accessUrl);
                    }
                }
            }
        });
    }
}
/*重复挂载数据提交*/
$("#equa_yes").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    var kbSubjectId = $("#libraryData").attr("data-id");
    $.ajax({
        tye: "post",
        url: contextPath + "/kb/bindCourse",
        data: {courseIds: idArray, subjectId: kbSubjectId},
        traditional: true,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                layer.msg('已经关联', {
                    icon: 1,
                    time: 600
                });
                layer.closeAll();
                $(".equa_cont ul").empty();
                idArray = null;
                tableData(coutsedataUrl);
                librarytableData(libraryDataUrl)

            }
        }
    });
});
$("#equa_no").on("click", function () {
    $("#table_id tbody tr td").each(function () {
        var self = $(this);
        if (self.attr("data-flage") == 1) {
            if (self.parent().first().find("input").prop("checked") == true) {
                self.parent().first().find("input").prop("checked", false);
            }
        }
    });
    $(".equa_cont ul").empty();
    layer.closeAll();
});