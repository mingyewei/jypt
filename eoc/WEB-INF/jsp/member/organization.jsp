<%@ include file="../common/include-common.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/HoneyComb.min.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css" />
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css" />
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript" charset="UTF-8"></script>
    <title>组织机构管理</title>
</head>
<body>

<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="zTreeDemoBackground float-lt">
                <ul id="treeDemo" class="ztree"></ul>
            </div>
            <div class="treebtn">
                <a id="addParent" href="#" title="增加父节点" onclick="return false;">增加父节点</a>
                <a id="addLeaf" href="#" title="增加子节点" onclick="return false;">增加子节点</a>
                <a id="edit" href="#" title="编辑节点" onclick="return false;">编辑节点</a>
                <a id="remove" href="#" title="删除节点" onclick="return false;">删除节点</a>
            </div>
        </div>
    </div>
</div>
<%@ include file="../common/common_footer.jsp"%>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $("#org_manger_menu").addClass('leftmenu-title-down')
    }};
</script>
<script type="text/javascript">
    function treeNode2JsonData(treeNode){
        var orgData = {} ;
        orgData.id = treeNode.id ;
        orgData.superId = treeNode.superId ;
        orgData.name = treeNode.name ;
        return orgData ;
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
                parent:true,
                leaf:false
            },
            simpleData: {
                enable: true,
                pIdKey: "superId"
            }
        },
        callback: {
//            beforeRemove: beforeRemove,//用于捕获节点被删除之前的事件回调函数，并且根据返回值确定是否允许删除操作默认值：null
            beforeRename: beforeRename,//用于捕获节点编辑名称结束（Input 失去焦点 或 按下 Enter 键）之后，更新节点名称数据之前的事件回调函数，并且根据返回值确定是否允许更改名称的操作
            //onRemove: onRemove,//用于捕获删除节点之后的事件回调函数
            onRename:onRename
        }
    };
    function beforeRemove(treeId, treeNode) {
        return confirm("确认删除 节点 -- " + treeNode.name + " 吗？");
    }
    function beforeRename(treeId, treeNode, newName) {
        if (newName.length == 0) {
            alert("节点名称不能为空.");
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            setTimeout(function(){zTree.editName(treeNode)}, 10);
            return false;
        }
        return true;
    }
    function onRename (e,treeId,treeNode) {/*编辑增加*/
        var ajaxUrl = basecontextPath ;
        if(treeNode.id){
            ajaxUrl = ajaxUrl+"/organization/update.do" ;
        }else {
            ajaxUrl = ajaxUrl+"/organization/add.do" ;
        }
        $.ajax({
            type:"post",
            url:ajaxUrl,
            datatype:"json",
            data:treeNode2JsonData(treeNode) ,
            success:function(data){
                var code = data.code ;
                if(code == 1) {
                    treeNode.id = data.data.id ;
                }else {

                }
            }
        });
        console.log(treeNode.name);
        console.log(treeNode.id);
        console.log(treeNode.pId)
    }
    var newCount = 1;
    function add(e) {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                isParent = e.data.isParent,
                nodes = zTree.getSelectedNodes(),
                treeNode = nodes[0];
        if (treeNode) {
            treeNode = zTree.addNodes(treeNode, {
                id: "",
                pId: treeNode.id,
                isParent: isParent,
                name: "新增节点" + (newCount++),
              /*  iconOpen: "${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/img/diy/icon_dakai.png",
                iconClose: "${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/img/diy/icon_wen.png",
                icon: "${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/img/diy/icon_zi.png"*/
            })
        } else {
            //treeNode = zTree.addNodes(null, {id:"", pId:0, isParent:isParent, name:"new node" + (newCount++)});
            alert("请先选择一个节点");
            return ;
        }
        if (treeNode) {
            zTree.editName(treeNode[0]);
        } else {
            alert("叶子节点被锁定，无法增加子节点");
        }
    };
    function edit() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                nodes = zTree.getSelectedNodes(),
                treeNode = nodes[0];
        if (nodes.length == 0) {
            alert("请先选择一个节点");
            return;
        }
        zTree.editName(treeNode);
    };
    function remove() {
        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                nodes = zTree.getSelectedNodes(),
                treeNode = nodes[0];
        if (nodes.length == 0) {
            layer.msg('请先选择一个节点',{icon:1})
            return;
        }
        layer.confirm("您确定删除此节点",{
            btn:['删除','取消']
        },function(){
            var callbackFlag = true;
            var ajaxUrl = basecontextPath +"/organization/delete.do" ;
            $.ajax({
                type:"post",
                url:ajaxUrl,
                datatype:"json",
                data:treeNode2JsonData(treeNode) ,
                success:function(data){
                    var code = data.code ;
                    if(code == 1) {
                        zTree.removeNode(treeNode, callbackFlag);
                        layer.msg("已经删除",{icon:1,time:1000})
                    }else {
                        alert(data.msg) ;
                    }
                }
            });
        })
    };
    $(document).ready(function(){

        var url = basecontextPath+"/org/list"
        $.getJSON(url,function(data){
            if (data.code==1){
                $.fn.zTree.init($("#treeDemo"), setting, data.data);
            }
        });
        $("#addParent").on("click", {isParent:true}, add);
        $("#addLeaf").on("click", {isParent:false}, add);
        $("#edit").on("click", edit);
        $("#remove").on("click", remove);
    });
</script>
</body>
</html>
