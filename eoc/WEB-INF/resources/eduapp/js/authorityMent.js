/**
 * Created by Administrator on 2017/3/14.
 * 权限管理
 */
var questTable = new tableDataOperation();
var selectedUsers = [];
/*树下拉*/
$(".downs").on("click", function () {
    if ($(".ztree_donws").css("display") == "none") {
        $(".ztree_donws").css("display", "block");
    } else {
        $(".ztree_donws").css("display", "none")
    }
});
var userEdit = {};
$("#treeSubmit").on("click", function () {
    var userNumeber = getCheckNode().length;
    var slaveIds = {};
    for (var i = 0, len = getCheckNode().length; i < len; i++) {
        slaveIds[i] = getCheckNode()[i];
    }
    userEdit.slaveIds = slaveIds;
    $("#modalOrgName").val("已选择" + userNumeber + "人");
    $(".ztree_donws ").css("display", "none");
})
/*返回选中中的数据*/
function getCheckNode() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.getCheckedNodes(true);
    var selectNode = [];
    if (nodes.length > 0) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].isParent == false && typeof(nodes[i].id) == "string") {
                var nodesId = nodes[i].id.replace(/users/, "");
                selectNode.push(nodesId);
            }
        }
    }
    return selectNode;
};
function treeData(selectedUsers) {
    /*加载树插件*/
    $.ajax({
        type: "post",
        url: basecontextPath + "/uuc/orgTreeWithUsers",
        data: {userId: 0},
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                var orgId = $("#modalOrgName").attr("data-id");
                var roleId = $("#roleId").val();
                var setting = {
                    view: {
                        selectedMulti: false
                    },
                    check: {
                        enable: true,
                        chkStyle: "checkbox",
                        chkDisabledInherit: false,
                        chkboxType: {
                            "Y": "ps",
                            "N": "ps"
                        }
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            pIdKey: "superId"
                        }
                    }
                };
                var newTreeNode = [];
                for (var i = 0; i < data.data.orgs.length; i++) {
                    var treeNodeData = {};
                    if (data.data.orgs[i].superId == "0") {
                        treeNodeData.open = true;
                    }
                    for (var key in data.data.orgs[i]) {
                        treeNodeData[key] = data.data.orgs[i][key];
                    }
                    newTreeNode[i] = treeNodeData;
                }
                for (var v = 0; v < newTreeNode.length; v++) {
                    if (data.data.users.length == 0) {
                        newTreeNode[v].chkDisabled = true;
                    } else {
                        for (var n = 0; n < data.data.users.length; n++) {
                            if (newTreeNode[v].superId != 0) {
                                if (newTreeNode[v].superId != data.data.users[n].orgId) {
                                    newTreeNode[v].chkDisabled = false;
                                }
                            }
                        }
                    }
                }
                for (var j = data.data.orgs.length; j < data.data.users.length + data.data.orgs.length; j++) {
                    var treeNodeData = {};
                    for (var key in data.data.users[j - data.data.orgs.length]) {
                        if (key == "id") {
                            treeNodeData[key] = data.data.users[j - data.data.orgs.length][key] + "users";
                        } else if (key == "orgId") {
                            treeNodeData.superId = data.data.users[j - data.data.orgs.length][key];
                        } else if (key == "username") {
                            treeNodeData.name = data.data.users[j - data.data.orgs.length][key];
                        } else {
                            treeNodeData[key] = data.data.users[j - data.data.orgs.length][key];
                        }
                    }
                    newTreeNode[j] = treeNodeData;
                }
                // //回显选中的成员
                if (selectedUsers.length > 0) {
                    for (var f = 0; f < newTreeNode.length; f++) {
                        if (typeof(newTreeNode[f].id) == "string") {
                            for (var h = 0; h < selectedUsers.length; h++) {
                                if (newTreeNode[f].id.replace(/users/, "") == selectedUsers[h]) {
                                    newTreeNode[f].checked = true;
                                    newTreeNode[f].open = true;
                                }
                            }

                        }
                    }
                }
                $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
            }
        }
    });
};

/*查询条件保存*/
/*搜索查询事件*/
var searchTrime = {};
$("#question_search_btn").on("click", listRole);
function listRole() {
    /*题目*/
    var topicVal = $.trim($("#topic").val());
    var roleName = $.trim($("#idCard").val());
    /*$.trim去除收尾空格*/
    var subjectTypeId = {};
    /*判断题目类型*/
    searchTrime.userName = topicVal;
    searchTrime.roleName = roleName;
    $.ajax({
        type: "post",
        url: contextPath + "/uuc/listUserRoleSlave",
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

/*查询的条件 （对象）*/
/*分页回调函数*/
var dataPageSize = 10;
function pageCallback(obj, first) {
    var currentPage = obj.curr;
    searchTrime.currentPage = currentPage;
    searchTrime.pageSize = dataPageSize;
    $.ajax({
        type: "post",
        url: contextPath + "/uuc/listUserRoleSlave",
        data: searchTrime,
        dataType: "json",
        success: function (data) {
            sccFunction(data);
            $("#table-dataallcheck").removeClass("check-current");
            $("#table-dataallcheck").attr("data-check", "");
        }
    });
}
listRole();
/*
 * 动态添加表格数据方法
 * @parameter
 *  condition:查询的条件 （对象）
 *  url:数据提交地址
 */
function sccFunction(data) {
    /*表格展示数据的List*/
    var dataList = data.data.data;
    var roles = [];
    var slaves = [];
    for (var i = 0; i < dataList.length; i++) {
        var treeSlaves = {};
        if (typeof dataList[i].roles == 'undefined') {
            roles.push('')
        } else {
            roles.push(dataList[i].roles)
        }
        if (typeof dataList[i].slaves == 'undefined') {
            slaves.push('');
            treeSlaves.slaves = [];
        } else {
            slaves.push(dataList[i].slaves);
            var slavesIds = [];
            for (var d = 0; d < dataList[i].slaves.length; d++) {
                slavesIds.push(dataList[i].slaves[d].id);
            }
            treeSlaves.slaves = slavesIds;
        }
        treeSlaves.id = dataList[i].id
        selectedUsers.push(treeSlaves);
    }
    function getStr(data, name) {
        var arr = [];
        var arrStr = [];
        for (var i = 0; i < data.length; i++) {
            arr = [];
            if (typeof  data[i] == 'undefined' || data[i].length == 0) {
                arr.push('');
            } else {
                for (var j = 0; j < data[i].length; j++) {
                    arr.push(data[i][j][name]);
                }
            }
            arrStr.push(arr.join(','))
        }
        return arrStr
    }

    var rolesstr = getStr(roles, 'name')
    var slavesstr = getStr(slaves, 'userName');
    for (var m = 0; m < dataList.length; m++) {
        dataList[m].rolesname = rolesstr[m];
        dataList[m].slavesname = slavesstr[m];
    }
    $("tbody").empty();
    /*显示数据的ID*/
    var tableList = ["userName", "org", "rolesname", "slavesname"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];
    /*表格展示数据的List*/
    var sun_page = data.data.total;
    $("#sum_page span").text(sun_page);
    /*添加数据*/
    var operation = ["table-edit"];
    var title = ["配置"];
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
    tableEditFn();
};
function tableEditFn() {
    $(".table-edit").each(function () {
        var self = $(this);
        self.on("click", function () {
            self.parent().parent().addClass('chlickColor');
            self.parent().siblings().children('input').prop('checked', true);
            $("#authority_username").val(self.parent().siblings('td[id^="userName"]').attr('title'));
            $("#authority_org").val(self.parent().siblings('td[id^="org"]').attr('title'));
            $("#authority_role").val(self.parent().siblings('td[id^="rolesname"]').attr('title'));
            var getId = singleId(this, "id");
            userEdit.id=getId;
            $.each(selectedUsers, function (i, item) {
                if (Number(getId) == item.id) {
                    $("#modalOrgName").val("已选择" + item.slaves.length + "人");
                    treeData(item.slaves);
                }
            });
            modal("配置");
        })
    });
};

/*新增角色*/
$("#question_add").on("click", function (e) {
    e.stopPropagation();
    modal("添加");
})
var indexclose;
function modal(title) {
    indexclose = layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: ['500px', '400px'],
        content: $('#ment_modal'),
        shadeClose: false,
        cancel: fn
    });
}
function fn() {
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
    $(".personne_cont_modal input").each(function () {
        $(this).val("");
    });
    $("#modalOrgName").attr("data-id", "");
    $(".ztree_donws").css("display", "none");
    $("#personid").text("");
}
//取消添加
$("#authority_reset").on("click", function () {
    layer.close(indexclose);
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
    $("#authority_username").val('');
    $("#authority_org").val('');
    $("#authority_role").val('');
    $(".personne_cont_modal input").each(function () {
        $(this).val("");
    });
    $("#modalOrgName").attr("data-id", "");
    $("#modalOrgName").val("");
    $(".ztree_donws").css("display", "none");
    $("#personid").text("");
})
/*
 角色添加与编辑数据提交
 * */
$("#authority_submit").on("click", function () {
    if ($("#modalOrgName").val() == '') {
        layer.msg('请选择管理人员');
        return;
    }
    $.ajax({
        type: "post",
        url: contextPath + "/uuc/updateUserSlaves",
        data: userEdit,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                layer.msg('提交成功');
                $("#question_search_btn").click();
            }else if(data.code == 0){
                layer.msg('数据更新失败');
            }
        }
    });
    layer.close(indexclose);
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
    $("#authority_username").val('');
    $("#authority_org").val('');
    $("#authority_role").val('');
    $(".personne_cont_modal input").each(function () {
        $(this).val("");
    });
    $("#modalOrgName").attr("data-id", "");
    $(".ztree_donws").css("display", "none");
    $("#personid").text("");
});