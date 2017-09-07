/**
 * Created by jinzeming on 2016/11/29.
 */
$(document).on('click','.library-list li',function(){
    var id=$(this).attr('data-id');
    var type=$(this).attr('data-type');
    if(type==0){
        location.href=contextPath+'/kb/libraryFile?href=kb/library&path=lib&state=0&type=4&id='+id;
    }else{
        location.href=contextPath+'/kb/libraryVideo?href=kb/library&path=lib&state=1&type=4&id='+id
    }
})
$(document).ready(function() {
    var height = $(window).height() - $('.header').height() - $('.footer').height() - 40*7-10 + 'px';
    $('.library-box').css('max-height', height);
    $('.library-tree').css('max-height', height);
    $('.library-list').css('max-height', height);
    /*滚动加载*/
    var pageNo = 1,
        flag = true;
    $('.library-list').on('scroll', function() {
        var viewH = $(this).height(), //可见高度
            contentH = $(this).get(0).scrollHeight, //内容高度
            scrollTop = $(this).scrollTop(); //滚动高度
        if (contentH - viewH - scrollTop <= 0 && flag==true) { //到达底部100px时,加载新内容
            var page=Number($('.library-list ul').attr('data-page'));
            var id=$('.library-list ul').attr('data-id')||'';
            page++;
            loadLibData(page,id);
        }
    });
    loadLibData(1,1);
    $.getJSON(contextPath+"/kb/subjectTree", function(data) {
        if (data.code == 1) {
            var parentNodeID = '';
            var newTreeNode = [];
            for (var i = 0; i < data.data.length; i++) { //第一层循环给树插件添加组织结构节点
                var treeNodeData = {};
                treeNodeData.iconOpen = contextPath + "/resources/edcapp/img/icon_dakai.png";
                treeNodeData.iconClose = contextPath + "/resources/edcapp/img/icon_wen.png";
                treeNodeData.icon = contextPath + "/resources/edcapp/img/icon_zi.png"
                treeNodeData.isParent = false;
                treeNodeData.open = true;
                if (data.data[i].superId == "0") { //使最根节点打开
                    treeNodeData.open = true;
                }
                for (var key in data.data[i]) {
                    treeNodeData[key] = data.data[i][key];
                }
                newTreeNode[i] = treeNodeData;
                parentNodeID = newTreeNode[0].id;
            }
            $.fn.zTree.init($("#treeDemo"), setting, newTreeNode);
            addTree(parentNodeID)
        }
    });
    function addTree(id) {
        var dataPageSize = 18;
        var dataParam = {
            "currentPage": 1,
            "pageSize": dataPageSize,
        };
    }
    var setting = {
        view: {
            selectedMulti: false
        },
        data: {
            simpleData: {
                enable: true,
                pIdKey: "superId"
            }
        },
        callback: {
            beforeClick: beforeClick
        }
    };

    function beforeClick(treeId, treeNode, clickFlag) {
        /* 加载分页*/
        //var userDataId = [];
        //userDataId.push(treeNode.id);
        $('.library-list ul').attr('data-id',treeNode.id)
        loadLibData(1,treeNode.id)
        return (treeNode.click != false);
    }
    function loadLibData(pageNo,userDataId) {
        $('.library-list ul').attr('data-page',pageNo);
        var dataPageSize = 18;
        $.ajax({
            type: "post",
            url: contextPath+"/kb/list",
            dataType: "json",
            data: {"currentPage": pageNo, "pageSize": dataPageSize, subjectId: userDataId},
            success: function(data) {
                var data = data.data.data,
                    str = "";
                if(!data){
                    flag=false;
                }else{
                    flag=true;
                    for (var i = 0, len = data.length; i < len; i++) {
                        str += '<li data-id=' + data[i].id + '  data-type='+data[i].type+'>' +
                            '<span class="library-text dis-inline">' + data[i].name + '</span>' +
                            '<span class="library-date dis-inline float-rt">' + data[i].createTime + '</span>' +
                            '</li>'
                    }
                }
                if(pageNo==1){
                    $('.library-list ul').html(str);
                }else{
                    $('.library-list ul').append(str);
                }

            }
        });
    }
});


