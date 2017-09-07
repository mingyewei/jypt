/**
 * Created by Administrator on 2017/1/5.
 */
    /*重复挂载数据!
    * */
var equalData=[];
var questTable = new tableDataOperation();
/*存放tree 点击后的 id name*/
var clickNodeID = "";
var coutsedataUrl = contextPath + '/cp/listWithKbBound';
/**
 * 初始化tree数据
 */
!function () {
    /*初始化树*/
    var url = basecontextPath + "/cp/subjectTree.do";
    $.getJSON(url, function (data) {
        if (data.code == 1) {
            var newTreeNode = [];
            for (var i = 0; i < data.data.length; i++) {
                var treeNodeData = {};
                treeNodeData.open = true;
                for (var key in data.data[i]) {
                    treeNodeData[key] = data.data[i][key];
                }
                newTreeNode[i] = treeNodeData;
                clickNodeID = newTreeNode[0].id;
            }
            $.fn.zTree.init($("#treeUsers"), setting, newTreeNode);
            /*初始化表格*/
            tableData(coutsedataUrl);
        }
    });
}();

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
        beforeClick: beforeClick
    }
};

/**
 * 搜索方法
 */
$("#question_search_btn").on("click", function () {
    tableData(coutsedataUrl);
});

/**
 * click Tree回调方法
 * @type {number}
 */
function beforeClick(treeId, treeNode, clickFlag) {
    clickNodeID = treeNode.id;
    $("#treeData").attr("data-id", treeNode.id);
    tableData(coutsedataUrl);
    return (treeNode.click != false);
}
/**
 * 有条件的表格数据请求
 *
 */

function tableData(dataUrl) {
    var conditionData = {};
    var dataPageSize = 5;
    /*题目*/
    var topicVal = $.trim($("#topic").val());
    /*$.trim去除收尾空格*/
    conditionData.subjectId = clickNodeID;
    conditionData.title = topicVal;
    conditionData.currentPage = 1;
    conditionData.pageSize = 5;
    $.ajax({
        type: "post",
        url: dataUrl,
        data: conditionData,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                dataPageSize = data.data.data.pageSize;
                laypage({
                    cont: 'question_page',
                    pages: Math.ceil(data.data.data.total / data.data.data.pageSize), /*总页数*/
                    curr: data.data.currentPage || 1, /*当前页*/
                    jump: pageCallback
                })
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
                                if (data.data.data == undefined||data.data.data.length==0 ) {
                                    $("#table_id tbody").empty();
                                    layer.msg('该节点下没有数据', {icon: 1});
                                    return false;
                                } else {
                                    sccfunKb(data);
                                    if(data.data.binded!=undefined){
                                        equalData=data.data.binded;
                                    }
                                    $("#table_id tbody tr td").each(function(){
                                        var self=$(this);
                                        if(self.css("display")=="none"){
                                            for(var i=0,len=equalData.length; i<len; i++){
                                                if(self.text()==equalData[i]){
                                                    self.siblings().css("color","red");
                                                    self.attr("data-flage","1")
                                                }
                                            }
                                        }
                                    });
                                    tableFncp();
                                    preview("table-course-preview");
                                    /*url 搜索条件数据提交的地址*/
                                    $("#table-dataallcheck").removeClass("check-current");
                                    $("#table-dataallcheck").attr("data-check", "");
                                }

                            }
                        }
                    })
                };
            } else if (data.code == 2) {
                layer.msg(data.msg);
                $("#table_id tbody").empty();
                $("#question_page").empty();

            }
        }
    });


    /**
     * 文件层级
     */
    function tableFncp() {
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
                        tips: [1, '#4faa4f'],
                        time: 2000
                    });
                }
            })
        };

    };
    /**
     * 动态加载表格方法
     * @param data
     * @param url 查询地址
     */
    function sccfunKb(data) {
        $("#table_id tbody").empty();
        /*显示数据的ID*/
        var tableList = ["name"];
        /*隐藏数据的ID*/
        var tableListNone = ["id"];
        /*表格展示数据的List*/
        var sun_page=data.data.data.total;
        $("#sum_page1 span").text(sun_page);
        var dataList = data.data.data.data;
        /*添加数据*/
        var operation = ["table-course-preview", "table-tier"];
        var title = ["预览", "层级关系"];
        questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);

    };
}

/*弹窗方法*/
function eqmodal(title) {
    layer.open({
        type: 1,
        skin: 'layui-layer-molv', //皮肤
        title: [title, "font-size:18px"],
        area: ['700px', '400px'],
        shadeClose: false,
        content: $('#equa_modal'),
        cancel: function(){
            $(".equa_cont ul").empty();
            layer.closeAll();
        }

    });
};
