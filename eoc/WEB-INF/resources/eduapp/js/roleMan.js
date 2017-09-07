/**
 * Created by Administrator on 2017/3/8.
 * 角色管理
 */
var questTable= new tableDataOperation();
var dataListUrl=contextPath+'/uuc/listRoleByPage';
var topicVal='';
/*搜索查询事件*/
$("#question_search_btn").on("click",searchBtn);
function searchBtn() {
    /*题目*/
    topicVal = $.trim($("#topic").val()); /*$.trim去除收尾空格*/
    dataListUrl=contextPath+'/uuc/listRoleByPage';
    tableData(topicVal,dataListUrl);
};

var conditionData = {};
var dataPageSize=10;
var checkId;
var usearName='';
var dataIdList=[];
var dataId=null;
function tableData(topicVal,dataListUrl,checkId,usearName){
    /*题目*/
    conditionData.currentPage = 1;
    conditionData.pageSize = 10 ;
    conditionData.name=topicVal||'';
    conditionData.id=checkId||'';
    conditionData.userName=usearName||'';
    $.ajax({
        type: "post",
        url:dataListUrl,
        data: conditionData,
        dataType: "json",
        success: function(data) {
            if (data.code==1) {
                dataPageSize = data.data.pageSize;
                laypage({
                    cont:$("#role_page"),
                    pages:Math.ceil(data.data.total/data.data.pageSize),/*总页数*/
                    curr:data.data.currentPage||1,/*当前页*/
                    jump:pageCallback
                })
            }else if(data.code==2){
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
    function pageCallback(obj,first) {
        var currentPage = obj.curr;
        conditionData.currentPage = currentPage;
        conditionData.pageSize = dataPageSize;
        $.ajax({
            type: "post",
            url: dataListUrl,
            dataType: "json",
            data: conditionData,
            success: function (data) {
                if (data.code == 1) {
                    if(dataListUrl==contextPath+'/uuc/listRoleByPage'){
                        sccFunction(data); /*url 搜索条件数据提交的地址*/
                        $("#table-dataallcheck").removeClass("check-current");
                        $("#table-dataallcheck").attr("data-check","");
                    }else if(dataListUrl==contextPath+'/uuc/roleUsers'){
                        checkFunction(data);//查看人员的回调
                        $("#table-check").removeClass("check-current");
                        $("#table-check").attr("data-check","");
                    }
                }
            }
        })
    };
};
//页面列表的回调
function sccFunction(data) {
    $("tbody").empty();
    /*显示数据的ID*/
    var tableList = ["name", "type","lastModifyTime"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];
    /*表格展示数据的List*/
    var dataList = data.data.data;
    var sun_page=data.data.total;
    $("#sum_page span").text(sun_page);
    var arrdata=[];
    var arrStr=[];
    var arr=[];
    if(dataList==null||dataList==undefined){
        //layer.msg('没有任何可加载的数据')
        dataList=[];
    }else{
        for(var i=0,len=dataList.length; i<len; i++){
            arrdata.push(dataList[i].resources)
            arr=[];
            if( typeof arrdata[0]=='undefined'){
                arr.push('');
            }else{
                for(var k=0;k<arrdata[0].length;k++){
                    arr.push(arrdata[0][k].name);
                }
            }
            arrStr.push(arr.join(','))
            arrdata.splice(0,arrdata.length)
        }
        for (var j=0;j<dataList.length;j++){
            dataList[j].type=arrStr[j];
        }

    }
    /*添加数据*/
    var operation=["table-edit","table-course-preview"];
    var title=["编辑","查看"];
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone,operation,title);
    /*单个点击删除*/
    questTable.singDel("id", "table_id", contextPath+"/ /delete","#question_search_btn");
    tableEditFn();
    tableCheckfn()
}
//参看人员的回调
function checkFunction(data) {
    var checkTable= new tableDataOperation();
    //$("tbody").empty();
    /*显示数据的ID*/
    var tableList = ["username","gender","idCard","mobilephone" ,"email","orgPath"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];
    /*表格展示数据的List*/
    var dataList = data.data.data;
    Array.isArray(dataList)?dataList:dataList=[];
    if(dataList.length==0){
        layer.msg('该角色下没有人员');
        return;
    }
    var operation=[];
    var title=[];
    var sun_page=data.data.total;
    $("#sub_page span").text(sun_page);
    for (var k=0;k<dataList.length;k++){
        if(dataList[k].gender==1){
            dataList[k].gender='男';
        }else{
            dataList[k].gender='女';
        }
    }
    //参数tabaList,table_id是table表格表头
    checkTable.dataAdd(dataList,"checkTab", "itme", tableList, tableListNone,operation,title);

}
tableData(topicVal,dataListUrl);
/**
 * 动态加载表格方法
 * @param data
 * @param url 查询地址
 */

/*全选*/
questTable.checkBoxAll("table-dataallcheck");
/*多个删除*/
$("#question_del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length <= 0) {
        layer.msg('请选择删除的列表！');
    } else {
        layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消'],
            cancel: function (){
                    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
            }
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/uuc/roleMultiDelete",//
                /* url 多个删除的地址*/
                data: {roleIds: idArray},
                traditional: true,
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        $("#question_search_btn").click();
                        layer.msg('已删除', {
                            icon: 1,
                            time: 600
                        });
                        idArray = null;
                    }
                }
            });

        },
        function(){
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
        }
        )
    }

});

var modalclose;
function modal(info, title, content) {
    modalclose=layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: info,
        shadeClose: false,
        content: content,
        cancel: function (){
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
            $("#dowbok_add").empty();
            $("#role_title").val('').attr('disabled', false);
            $("#modalOrgName").val('')
            usearName='';
            checkId='';
            $("#sub_page span").text(0);
            dataListUrl=contextPath+'/uuc/listRoleByPage';
            $("#checkTab tbody").empty();
        }
    });
}

//添加
$("#question_add").on("click", function () {
    $.ajax({
        type: "post",
        url: contextPath+"/uuc/resources",//回显权限
        dataType: "json",
        success: function(data) {
            if (data.code==1){
                modal(['450px', '400px'], "添加", $("#rolEdit_modal"));
                treeData(data);
            }
        }
    })
})
//数据提交
$("#role_submit").on("click", function () {
    if($("#role_title").val()=='学员'||$("#role_title").val()=='管理员'){
        $("#role_title").attr('disabled', true);
        layer.msg('系统角色无法编辑');
        return;
    }
    var dataurl;
    dataIdList=[];
    var ids={};
    if($("#role_title").val()==''){
        layer.msg('角色名称不能为空');
        return;
    }
    if(getCheckNode().length==0){
        layer.msg('请选中至少一种功能配置');
        return;
    }
    //数据提交判断唯一标识
    if (getId==null) {
        dataurl = contextPath+"/uuc/addRole";//添加提交

    } else {
        dataurl = contextPath+"/uuc/roleUpdate";//编辑更新
    }
    for (var i = 0; i < getCheckNode().length; i++) {
        ids[i] = getCheckNode()[i].id;
    }
    var idsname=$("#role_title").val();
    var data={
        resourceIds:ids,
        name:idsname,
        id:dataId||''
    }
    submit(data,dataurl)
    layer.close(modalclose);
      $("#role_title").val('');
    $("#dowbok_add").empty();
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
    tableData(topicVal,dataListUrl);
})
function submit(data, url) {
    $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        success: function (data) {
            if(data.code===1){
               layer.msg('提交成功');
                 dataIdList=[];
                $("#modalOrgName").val('')
                getId=null;
                $("#role_title").val('');
            }else if(data.code == 0){
                layer.msg(data.msg);
            }

        }
    });
}
//点击取消返回
$("#option_reset").on('click',function(){
    layer.close(modalclose);
    $("#role_title").val('').attr('disabled', false)
    $("#modalOrgName").val('');
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
    checkId='';
    dataListUrl=contextPath+'/uuc/listRoleByPage';
})
function tableCheckfn(){
    $(".table-course-preview").on("click",editFn);//查看人员
    function editFn(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked',true);
        var self = this;
        checkId = singleId(self, "id");
        /*编辑某一个返回的这行的标识ID*/
        var checkVal = $.trim($("#user_check_name").val()); /*$.trim去除收尾空格*/
        dataListUrl=contextPath+'/uuc/roleUsers';
        tableData(checkVal,dataListUrl,checkId);
        modal(['860px', '500px'], "查看人员", $("#rolLook_check"));
        $("#checkTab tbody tr").each(function(){
            $(this).find('td').eq(-1).remove();
        })
    }
}


var getId =null;
var treedata=null;
$.ajax({
    type: "post",
    url: contextPath+"/uuc/resources",
    dataType: "json",
    success: function (data) {
        treedata=data;
    }
});
function tableEditFn() {
    $(".table-edit").on("click",editFn);
    function editFn(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked',true);
        var self = this;
         getId = singleId(self, "id");
        $.ajax({
            type: "post",
            url: contextPath+"/uuc/roleDetail",//
            /*编辑表格的某一行的时候 传递这行的标识ID地址*/
            data: {
                id: getId
            },
            dataType: "json",
            success: function(data) {
                if(data.code==0){
                    layer.msg('数据请求失败');
                }else if (data.code == 1) {
                    if(data.data.name=='学员'){
                        $("#role_title").attr('disabled', true);
                        $("#modalOrgName").val('已获取'+0+'项权限')
                        modal(['450px', '400px'], "编辑", $("#rolEdit_modal"));
                        treeData(treedata)
                        $("#role_title").val('学员');
                    }else if(data.data.name=='管理员'){
                        $("#role_title").attr('disabled', true);
                        modal(['450px', '400px'], "编辑", $("#rolEdit_modal"));
                        dataIdList = data.data.resourceIds;
                        dataId=data.data.id;
                        if(dataIdList!= undefined &&dataIdList.length>0){
                            $("#modalOrgName").val('已获取'+dataIdList.length+'项权限')
                            treeData(treedata,dataIdList)
                        }
                        $("#role_title").val('管理员');
                    }else{
                        modal(['450px', '400px'], "编辑", $("#rolEdit_modal"));
                        dataIdList = data.data.resourceIds;
                        dataId=data.data.id
                        if(dataIdList!= undefined &&dataIdList.length>0){
                            $("#modalOrgName").val('已获取'+dataIdList.length+'项权限')
                            treeData(treedata,dataIdList)
                        }
                        $("#role_title").val(data.data.name);
                    }
                }
            }
        });
    };
}
//人员信息列表单个人员查询
$("#rolLook_search").on('click',function(){
        $("#checkTab tbody").empty();
        var checkVal = $.trim($("#user_check_name").val()); /*$.trim去除收尾空格*/
        dataListUrl=contextPath+'/uuc/roleUsers';
        tableData(name,dataListUrl,checkId,checkVal);
})
/*树下拉*/
$(".downs").on("click", function () {
    if ($(".ztree_donws").css("display") == "none") {
        $(".ztree_donws").css("display", "block");
        $("#modalOrgName").val('');
    } else {
        $(".ztree_donws").css("display", "none");
    }
});
$("#treeSubmit").on("click", function () {
    getCheckNode()
    $("#modalOrgName").val('已获取'+getCheckNode().length+'项权限')
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
function treeData(data,UserIds) {
    var roleId = $("#roleId").val();
    var setting = {
        view: {
            selectedMulti: false
        },
        check: {
            enable: true,
            chkStyle: "checkbox",
            chkboxType: {
                "Y": "ps",
                "N": "ps"
            },
            chkDisabledInherit: false
        },
        data: {
            simpleData: {
                enable: true,
                pIdKey: "pid"
            }
        }
    };

    if (data.code == 1) {
        var newTreeNode = [];
        for (var i = 0; i < data.data.length; i++) {
            var treeNodeData = {};
            for (var key in data.data[i]) {
                treeNodeData[key] = data.data[i][key];
            }
            newTreeNode[i] = treeNodeData;
        }
        if (UserIds) {
            for (var f = 0; f < newTreeNode.length; f++) {
                for (var h = 0; h < UserIds.length; h++) {
                    if (newTreeNode[f].id== parseInt(UserIds[h])) {
                        newTreeNode[f].checked = true;
                        newTreeNode[f].open = true;
                    }
                }
            }
        }
        $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
    }
}

