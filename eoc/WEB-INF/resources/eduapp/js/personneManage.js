/*组织机构管理sidebar*/
var personTable = new tableDataOperation();
/*人员编辑*/
function tableEditFn() {
    var tableEdit = document.getElementsByClassName("table-edit");
    var tableEditLeng = tableEdit.length;
    for (var i = 0; i < tableEditLeng; i++) {
        addEvent(tableEdit[i], "click", editFn);
    }
    ;
    function editFn(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked', true);
        var self = this;
        var getId = singleId(self, "id");
        var roleId = $("#roleId").val(getId);
        /*编辑某一个返回的这行的标识ID*/
        $.ajax({
            type: "post",
            url: basecontextPath + "/auth/userRoles",
            data: {
                userId: getId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    var role = $("#role");
                    var str = "";
                    for (var i = 0; i < data.data.roles.length; i++) {
                        str = str + '<label class="specialLable">' + data.data.roles[i].name + '</label><input type="checkbox" id="' + data.data.roles[i].id + '"';
                        for (var j = 0; j < data.data.hasRoles.length; j++) {
                            if (data.data.hasRoles[j].id == data.data.roles[i].id) {
                                str = str + 'checked="checked"';
                                break;
                            }
                        }
                        str = str + ' value="" />';
                    }
                    role.append(str);
                }
            }
        });
        $.ajax({
            type: "post",
            url: basecontextPath + "/member/detail",
            data: {
                id: getId
            },
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    modal("编辑人员")
                    $(".downs").click();
                    $("#modalUserName").val(data.data.username);
                    $("#modalIdCard").val(data.data.idCard);
                    $("#modalAge").val(data.data.age);
                    $("#modalMobilePhone").val(data.data.mobilePhone);
                    $("#modalEmail").val(data.data.email);
                    $("#personid").val(data.data.id);
                    $("#modalOrgName").val(data.data.orgName);
                    $("#modalOrgName").attr("data-id", data.data.orgId);
                    if (data.data.genderShow == "男") {
                        $('input:radio:first').prop('checked', 'true');
                    } else {
                        $('input:radio:last').prop('checked', 'true');
                    }
                    ;
                }
            }
        });
        $.ajax({
            type: "post",
            url: basecontextPath + "/org/userOrgWithWholeTree",
            data: {userId: getId},
            dataType: "json",
            success: function (data) {
                treeData(data)

            }
        });
    };
};

/**
 * 重置密码
 */
function tableResetPasswordFn() {
    var tableEdit = document.getElementsByClassName("rest_pass");
    var tableEditLeng = tableEdit.length;
    for (var i = 0; i < tableEditLeng; i++) {
        addEvent(tableEdit[i], "click", resetPass);
    }
    ;
    function resetPass(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked', true);
        var self = this;
        var getId = singleId(self, "id");
        /*编辑某一个返回的这行的标识ID*/
        layer.confirm("是否确认重置密码", {
            btn: ['确定', "取消"]
        }, function () {
            $.ajax({
                type: "post",
                url: basecontextPath + "/member/repass",
                data: {
                    id: getId
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        layer.msg("密码重置为" + data.data);
                        $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
                    } else {
                        layer.msg("密码重置失败");
                    }
                }
            })
        }, function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            return
        })

    };
};

personTable.checkBoxAll("table-dataallcheck");
/*全选*/
/*多个删除*/
$("#personn_del").on("click", function () {
    var idArray = personTable.allDel("table_id", "id");
    if (idArray.length <= 0) {
        layer.msg("请选择删除的用户！");
        return;
    } else {
        layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消']
        }, function () {
            //var ids={};
            //for (var i = 0; i < idArray.length; i++) {
            //    ids[i] = idArray[i];
            //}
            $.ajax({
                type: "post",
                url: basecontextPath + "/member/disable",
                /* url 多个删除的地址*/
                data: {ids: idArray},
                traditional: true,
                success: function (data) {
                    if (data.code == 1) {
                        $("#personn_search_btn").click();
                        layer.msg('已删除', {
                            icon: 1,
                            time: 600
                        })
                    }
                }
            });
        })
    }


});
/*表格弹窗方法*/
function modal(title) {
    $("#roleTip").siblings().remove();
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: ['600px', '700px'],
        shadeClose: false,
        content: $('#personn_modal'),
        cancel: fn

    });
};
$("#personn_reset").on("click", function () {
    layer.closeAll();
})
/*点击弹窗关闭按钮 清空数据*/
function fn() {
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
    $(".personne_cont_modal input").each(function () {
        $(this).val("");
    });
    $("#modalOrgName").attr("data-id", "");
    $(".ztree_donws").css("display", "none");
    $("#personid").val("");
    $("#userName").css('border','1px solid #FB0F04');
    $("#modalIdCard").css('border','1px solid #FB0F04');
    $("#modalMobilePhone").css('border','1px solid #FB0F04');
    $("#modalEmail").css('border','1px solid #FB0F04');
    layer.closeAll();
};
var DataUrl;
var falg=0;
/*增加人员事件按钮*/
$("#personn_add").on("click", function () {
    var dlgUserId = 0;
    modal("添加人员");
    $.ajax({
        type: "post",
        url: basecontextPath + "/auth/userRoles",
        data: {userId: dlgUserId},
        dataType: "json",
        success: function (data) {
            var str = "";
            //给学员添加选的的默认状态
            for (var i = 0; i < data.data.roles.length; i++) {
                if (data.data.roles[i].name == '学员') {
                    str += '<label  class="specialLable">' + data.data.roles[i].name + '</label><input type="checkbox" checked id=" ' + data.data.roles[i].id + '" value="" />';
                } else {
                    str += '<label class="specialLable" >' + data.data.roles[i].name + '</label>  <input type="checkbox" id=" ' + data.data.roles[i].id + '" value="" />'
                }
            }
            var role = $("#role");

            role.append(str)
        }
    });
    /*加载树插件*/
    $.ajax({
        type: "post",
        url: basecontextPath + "/org/userOrgWithWholeTree",
        data: {userId: dlgUserId},
        dataType: "json",
        success: function (data) {
            treeData(data)
        }
    });

});

var addressUrl = basecontextPath + "/member/checkAccountExist";
var exitresUrl= basecontextPath + "/member/checkNumbers";
/*用户验证*/
$("#modalUserName").blur(function () {
    userName();
});
function userName() {
    var userName = $("#modalUserName").val();
    if (!userName) {
        layer.msg("用户名不能为空！",{time: 1500, icon:5,anim: 6});
        $("#modalUserName").css('border','1px solid #FB0F04');
        falg = 1;
        return;
    } else {
        $("#modalUserName").css('border','1px solid #c6c6c6');
        falg = 0;
    };
}
/*身份证验证*/
$("#modalIdCard").blur(function () {
    modalIdCard();
});
function modalIdCard() {
    var modalIdCard = $("#modalIdCard").val();
    if(modalIdCard){
        var reg = modalIdCard.match(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/);
        if (reg == null) {
            layer.msg("身份证格式不正确！",{time: 1500, icon:5,anim: 6});
            falg = 1;
            return
        } else {
            if($("#personid").val()==''){
                $.ajax({
                    type: "post",
                    url: addressUrl,
                    data: {
                        username: modalIdCard,
                    },
                    dataType: "json",
                    async:false,
                    success: function (data) {
                        if (data.code == 1) {
                            falg = 0;
                            $("#modalIdCard").css('border','1px solid #c6c6c6');
                        } else if (data.code == 0) {
                            layer.msg("此身份证已经注册！",{time: 1500, icon:5,anim: 6});
                            $("#modalIdCard").css('border','1px solid #FB0F04');
                            falg = 1;
                            return;
                        }
                    }
                })
            }else{
                $.ajax({
                    type: "post",
                    url:exitresUrl ,
                    data: {
                        idCard: modalIdCard,
                        id: $("#personid").val()
                    },
                    dataType: "json",
                    async:false,
                    success: function (data) {
                        if (data.data == 0) {
                            falg = 0;
                            $("#modalIdCard").css('border','1px solid #c6c6c6');
                        } else if (data.data == 1) {
                            falg = 0;
                            $("#modalIdCard").css('border','1px solid #c6c6c6');
                        }else if (data.data == 2) {
                            layer.msg("此身份证已经注册！",{time: 1500, icon:5,anim: 6});
                            $("#modalIdCard").css('border','1px solid #FB0F04');
                            falg = 1;
                        }
                    }
                })

            }
        }
    }
}
/*手机号验证*/
$("#modalMobilePhone").blur(function () {
    modalMobilePhone();
});
function modalMobilePhone() {
    var modalMobilePhone = $("#modalMobilePhone").val();
    var reg = modalMobilePhone.match(/^0?1(3|5|8|7|4)\d{9}$/);
    if(modalMobilePhone){
        if (reg == null) {
            layer.msg("手机号格式不正确！",{time: 1500, icon:5,anim: 6});
            falg = 1;
            $("#modalMobilePhone").css('border','1px solid #FB0F04');
            return;
        } else {
            if($("#personid").val()==''){
                $.ajax({
                    type: "post",
                    url: addressUrl,
                    data: {
                        username: modalMobilePhone,
                    },
                    dataType: "json",
                    async:false,
                    success: function (data) {
                        if (data.code == 1) {
                            falg = 0;
                            $("#modalMobilePhone").css('border','1px solid #c6c6c6');
                        } else if (data.code == 0) {//新增判断已经有该数据.
                            layer.msg("此手机号已经注册！",{time: 1500, icon:5,anim: 6});
                            $("#modalMobilePhone").css('border','1px solid #FB0F04');
                            falg = 1;
                            return;
                        }
                    }
                })
            }else{
                $.ajax({
                    type: "post",
                    url: exitresUrl,
                    data: {
                        mobilePhone: modalMobilePhone,
                        id: $("#personid").val()
                    },
                    dataType: "json",
                    async:false,
                    success: function (data) {
                        if (data.data == 0) {
                            falg = 0;
                            $("#modalMobilePhone").css('border','1px solid #c6c6c6');
                        } else if (data.data == 1) {
                            falg = 0;
                            $("#modalMobilePhone").css('border','1px solid #c6c6c6');
                        }else if (data.data == 2) {
                            layer.msg("此手机号已经注册！",{time: 1500, icon:5,anim: 6});
                            $("#modalMobilePhone").css('border','1px solid #FB0F04');
                            falg = 1;
                            return;
                        }
                    }
                })
            }
        }
    }
}
/*邮箱验证*/
$("#modalEmail").blur(function () {
    modalEmail();
});
function modalEmail() {
    var modalEmail = $("#modalEmail").val();
    var reg = modalEmail.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/);
    if (!modalEmail) {
        layer.msg("邮箱不能为空！",{time: 1500, icon:5,anim: 6});
        $("#modalEmail").css('border','1px solid #FB0F04');
        falg = 1;
        return;
    } else if (reg == null) {
        layer.msg("邮箱证格式不正确！",{time: 1500, icon:5,anim: 6});
        $("#modalEmail").css('border','1px solid #FB0F04');
        falg = 1;
       return;
    } else {
        if($("#personid").val()==''){
            $.ajax({
                type: "post",
                url: addressUrl,
                data: {
                    username: modalEmail,
                },
                dataType: "json",
                async:false,
                success: function (data) {
                    if (data.code == 1) {
                        falg = 0;//邮箱没有被注册
                        $("#modalEmail").css('border','1px solid #c6c6c6');
                    } else if (data.code == 0) {//邮箱已被注册,
                        $("#modalEmail").css('border','1px solid #FB0F04');
                        layer.msg("此邮箱已经注册！",{time: 1500, icon:5,anim: 6});
                        falg = 1;
                        return;
                    }
                }
            })
        }else{
            $.ajax({
                type: "post",
                url: exitresUrl,
                data: {
                    email:modalEmail,
                    id:$("#personid").val()
                },
                dataType: "json",
                async:false,
                success: function (data) {
                    if (data.data == 0) {
                        falg = 0;
                        $("#modalEmail").css('border','1px solid #c6c6c6');
                    } else if (data.data == 1) {
                        falg = 0;
                        $("#modalEmail").css('border','1px solid #c6c6c6');
                    }else if (data.data == 2) {
                        $("#modalEmail").css('border','1px solid #FB0F04');
                        layer.msg("此邮箱已经注册！",{time: 1500, icon:5,anim: 6});
                        falg = 1;
                        return;
                    }
                }
            })
        }
    }
}
$("#personn_submit").on("click", function () {
    //$("#personn_submit").addClass('disabled');
    /*用户唯一的标识ID*/
    var personne_Id = $("#personid").val();
    /*用户姓名*/
    var personne_UesrName = $("#modalUserName").val();
    if(falg==1){
        layer.msg("数据有误,请检查！",{time: 1500, icon:5,anim: 6});
        return;
    };
    /*用户的身份证号*/
    var personne_IdCard = $("#modalIdCard").val();
    /*用户年龄*/
    var personne_Age = $("#modalAge").val();
    /*用户手机号*/
    var personne_MobilePhone = $("#modalMobilePhone").val();
    /*用户的性别 0为女 1为男*/
    var personne_Gender;
    /*用户邮箱*/
    var personne_Email = $("#modalEmail").val();
    /*用户科室*/
    var personne_OrgId = getCheckNode()[0].id;
    var personne_OrgName = getCheckNode()[0].name;
    var personne_Data = {};
    var role_Data = [];
    $("#role input").each(function () {
        if ($(this).is(":checked")) {
            role_Data.push($(this).attr('id'))
        }
    });
    if ($('input:radio').eq(0).is(":checked")) {
        personne_Gender = 1;
    } else {
        personne_Gender = 0;
    }
    ;
    personne_Data.id = personne_Id;
    personne_Data.idCard = personne_IdCard;
    personne_Data.age = personne_Age;
    personne_Data.genderShow = personne_Gender;
    personne_Data.orgId = personne_OrgId;
    personne_Data.orgName = personne_OrgName;
    personne_Data.mobilePhone = personne_MobilePhone;
    personne_Data.email = personne_Email;
    personne_Data.username = personne_UesrName;
    personne_Data.roles = role_Data;
    if ( personne_Data.id == "") {
        DataUrl = basecontextPath + "/member/add";
        /*新增的数据ID地址*/
    } else {
        DataUrl = basecontextPath + "/member/update";
        /*修改的数据ID地址*/
    }
    ;
    if (falg == 0) {
        submit(DataUrl, personne_Data)
        $("#personn_submit").addClass('disabled');
    } else if(falg==1){
        return;
    }
});
function submit(DataUrl, data) {
    $.ajax({
        type: "post",
        url: DataUrl,
        data: data,
        traditional: true,
        dataType: "json",
        success: function (data) {
            //$("#personn_submit").removeClass('disabled');
            if (data.code == 1) {
                layer.closeAll();
                layer.msg('提交成功!', {time: 1000});
                $("input[type='text']").each(function () {
                    $(this).val("");
                });
                $("#personn_search_btn").click();
                $("#personn_submit").removeClass('disabled');
            }else if(data.code==0){
                layer.closeAll();
                $("#personn_search_btn").click();
                $("#personn_submit").removeClass('disabled');
                layer.msg('提交失败!');
            }
        }
    });
}

/*树下拉*/
$(".downs").on("click", function () {
    if ($(".ztree_donws").css("display") == "none") {
        $(".ztree_donws").css("display", "block");
    } else {
        $(".ztree_donws").css("display", "none")
    }
});
$("#treeSubmit").on("click", function () {
    getCheckNode()
    $("#modalOrgName").val(getCheckNode()[0].name)
    $(".ztree_donws ").css("display", "none")
})
/*返回选中中的数据*/
function getCheckNode() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
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
    var treeId = $("#treeData").attr("data-id");
    var orgId = $("#modalOrgName").attr("data-id");
    var roleId = $("#roleId").val();
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
        if (roleId == "") {
            if (treeId == "") {
                $("#modalOrgName").val(newTreeNode[0].name);
                newTreeNode[0].checked = true;
                newTreeNode[0].open = true;
            } else {
                for (var f = 0; f < newTreeNode.length; f++) {
                    if (newTreeNode[f].id == treeId) {
                        $("#modalOrgName").val(newTreeNode[f].name);
                        newTreeNode[f].checked = true;
                        newTreeNode[f].open = true;
                    }
                }
            }
        } else {
            for (var f = 0; f < newTreeNode.length; f++) {
                if (newTreeNode[f].id == orgId) {
                    $("#modalOrgName").val(newTreeNode[f].name);
                    newTreeNode[f].checked = true;
                    newTreeNode[f].open = true;
                }
            }
        }
        $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
    }
}

/*按钮取消*/
$("#personn_reset").on("click", fn)
