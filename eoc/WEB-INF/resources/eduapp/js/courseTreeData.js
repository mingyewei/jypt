/**
 * Created by Administrator on 2017/1/5.
 */
var questTable = new tableDataOperation();
var dataPageSize = 10;
/*存放tree 点击后的 id name*/
var clickNodeID="";
var dataUrl=contextPath+'/cp/list.do';
/**
 * 初始化tree数据
 */
!function(){
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
                clickNodeID= newTreeNode[0].id;
                $("#treeData").attr("data-id",newTreeNode[0].id);
            }
        }
        $.fn.zTree.init($("#treeUsers"), setting, newTreeNode);
        /*初始化表格*/
        tableData(dataUrl);
    });
    $("#addParent").on("click", {isParent: true}, add);
    $("#addLeaf").on("click", {isParent: false}, add);
    $("#edit").on("click", edit);
    $("#remove").on("click", remove);
}();
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
        if(nodes.length == 0){
            layer.msg("请先选择一个节点！", {icon: 1});
            return;
        }
        treeNode = zTree.addNodes(null, {id:"", pId:0, isParent:isParent, name:"new node" + (newCount++)});
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
        data: {subjectId:treeNode2JsonData(treeNode).id},
        success: function (data) {
            var code = data.code;
            if(code==0){
                layer.msg("操作失败！", {icon: 1, time: 1000});
            }
            if(code==1){
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
            if(code==2){
                layer.msg("该节点为根节点无法删除!", {icon: 1, time: 1000});
            }
            if(code==3){
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
$("#question_search_btn").on("click", function() {
    tableData(dataUrl);
});

/**
 * click Tree回调方法
 * @type {number}
 */
function beforeClick(treeId, treeNode, clickFlag) {
    clickNodeID=treeNode.id;
    $("#treeData").attr("data-id",treeNode.id).val(treeNode.name);
    tableData(dataUrl);
    return (treeNode.click != false);
}
/**
 * 有条件的表格数据请求
 *
 */
var conditionData = {};
function tableData(dataUrl){
    var dataPageSize=10;
    /*题目*/
    var topicVal = $.trim($("#topic").val()); /*$.trim去除收尾空格*/
    var typeShowType = $("#course_class p").text(); /*类别*/
    var type  = "";
    if (typeShowType == "文档资料") {
        type = 0;
    } else if (typeShowType == "视频课程") {
        type = 1;
    }
    conditionData.subjectId=clickNodeID;
    conditionData.title = topicVal;
    conditionData.crTypeId = type;
    conditionData.currentPage =1;
    conditionData.pageSize = 10 ;
    $.ajax({
        type: "post",
        url:dataUrl,
        data: conditionData,
        dataType: "json",
        success: function(data) {
            if (data.code==1) {
                console.log(data)
                dataPageSize = data.data.pageSize;
                laypage({
                    cont:'question_page',
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
                    sccFunction(data); /*url 搜索条件数据提交的地址*/
                    $("#table-dataallcheck").removeClass("check-current");
                    $("#table-dataallcheck").attr("data-check","");
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
        var tableList = ["name", "type","createTime"];
        /*隐藏数据的ID*/
        var tableListNone = ["id"];
        /*表格展示数据的List*/
        var dataList = data.data.data;
        var sun_page=data.data.total;
        $("#sum_page span").text(sun_page);
        if(dataList==null||dataList==undefined){
            //layer.msg('没有任何可加载的数据')
            dataList=[];
        }else{
            for(var i=0,len=dataList.length; i<len; i++){
                if(dataList[i].type==0){
                    dataList[i].type="文档资料"
                }else {
                    dataList[i].type="视频课程"
                }
            }
        }
        console.log(dataList)
        /*添加数据*/
        var operation=["table-edit","table-tier"];
        var title=["编辑","层级关系"];
        questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone,operation,title);
        /*单个点击删除*/
        questTable.singDel("id", "table_id", contextPath+"/course/delete.do","#question_search_btn");
    }
}


