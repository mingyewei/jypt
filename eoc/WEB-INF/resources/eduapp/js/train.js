/*弹窗框下拉列表*/
$("#operation-infosel-modal p").bind("click", function(){
    var ul = $("#operation-infosel-modal ul");
    $("#operation-infosel-modal p i").addClass("current");
    if(ul.css("display") == "none"){
        ul.slideDown("fast");
    } else {
        ul.slideUp("fast");
    }
    ;
});
$("#operation-infosel-modal ul li a").on("click", function(){
    var txt = $(this).text();
    $("#operation-infosel-modal p").html(txt + "<i></i>");
    $("#operation-infosel-modal ul").hide();
    $(".option").empty();
    flage = 0
    /*序号归0*/
});
/* end 下拉列表*/

var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {};
/*查询的条件 （对象）*/
/*分页回调函数*/
function pageCallback(obj, first){
    var currentPage = obj.curr;
    var dataPageSize = 10;
    searchTrime.currentPage = currentPage;
    searchTrime.pageSize = dataPageSize;
    $.ajax({
        type : "post",
        url : contextPath + "/train/listByPage",
        data : searchTrime,
        dataType : "json",
        success : function(data){
            sccFunction(data, contextPath + "/train/del");
            $("#table-dataallcheck").removeClass("check-current");
            $("#table-dataallcheck").attr("data-check", "");
        }
    });
}
/*搜索查询事件*/
$("#question_search_btn").on("click", function(){
    /*题目*/
    var name = $.trim($("#topic").val());
    /*$.trim去除收尾空格*/
    var publishStatus = $("#operation-infosel p").text();
    /*查询类型*/
    if(publishStatus == "未发布"){
        publishStatus = 0;
    } else if(publishStatus == "已发布"){
        publishStatus = 1;
    } else {
        publishStatus = null;
    }
    //var subjectTypeId = null;
    searchTrime.name = name;
    searchTrime.publishStatus = publishStatus;
    $.ajax({
        type : "post",
        url: contextPath + "/train/listByPage",
        data : searchTrime,
        dataType : "json",
        success : function(data){
            if(data.code == 1){
                 laypage({
                    cont : 'giveFeedBack_page',
                    pages : Math.ceil(data.data.total / data.data.pageSize), /*总页数*/
                    curr : data.data.currentPage || 1, /*当前页*/
                    jump : pageCallback
                });

            }
        }
    })
});
questTable.checkBoxAll("table-dataallcheck");
/*
 * 动态添加数据方法
 * @parameter
 *  condition:查询的条件 （对象）
 *  url:数据提交地址
 */
function sccFunction(data, url){
    $("tbody").empty();
    /*显示数据的ID*/
    var tableList = ["name", "publishStatus", "createTime"];
    /*隐藏数据的ID*/
    var tableListNone = ["id"];
    /*表格展示数据的List*/
    var dataList = data.data.data;
    var sun_page = data.data.total;
    $("#sum_page span").text(sun_page);
    for(var i = 0; i < dataList.length; i++){
        if(dataList[i].publishStatus == 0){
            dataList[i].publishStatus = "未发布";
        } else if(dataList[i].publishStatus == 1){
            dataList[i].publishStatus = "已发布";
        }

    }
    /*添加数据*/
    var operation = ["table-edit"]
    var title = ["详细"]
    questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone, operation, title);
    /*全选*/

    /*单个点击删除*/
    questTable.singDel("id", "table_id", contextPath + "/train/delete", "#question_search_btn");

    tableEditFn();
}
/*处理多个未处理*/
$("#del").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    var ids = {};
    if (idArray.length <= 0) {
        layer.msg('请选择删除的列表！');
        return;
    }
    for (var i = 0; i < idArray.length; i++) {
        ids[i] = idArray[i];
    }
    layer.confirm('确定要删除吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/train/deleteMulti",
                data: {ids: ids},
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        $("#question_search_btn").click()
                        layer.msg('已删除！', {
                            icon: 1,
                            time: 600
                        })
                    }
                }
            });

        }, function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
    )
});
$("#table-dataallexport").on("click", function(){
    var arr = [];
    $("#table_id tbody tr").each(function(){
        if($(this).find("input[type='checkbox']").is(":checked") == true){
            arr.push($(this).find("td[id='id']").text());
        }
    });
    if(arr.length == 0){
        layer.msg("请先选择一条数据导出！");
    } else if(arr.length > 1){
        layer.msg("一次只能导出一条数据！");
    } else if(arr.length == 1){
        window.location.href = contextPath + "/dataReport/training?id=" + arr[0];
    }

})
/*处理多个发布*/
$("#status_open").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    if (idArray.length <= 0) {
        layer.msg('请选择发布的列表！');
        return
    }
    var ids = {};
    for (var i = 0; i < idArray.length; i++) {
        ids[i] = idArray[i];
    }
    layer.confirm('确定要批量发布吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/train/publish",
                data: {
                    ids: ids,
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        $("#question_search_btn").click()
                        layer.msg('已编辑为已发布', {
                            icon: 1,
                            time: 600
                        })
                    }
                }
            });

        },
        function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        })
});
$("#status_refuse").on("click", function () {
    var idArray = questTable.allDel("table_id", "id");
    var ids = {};
    if (idArray.length <= 0) {
        layer.msg('请选择取消发布的列表！');
        return;
    }
    for (var i = 0; i < idArray.length; i++) {
        ids[i] = idArray[i];
    }
    layer.confirm('确定要取消发布吗?', {
            btn: ['确定', '取消'],
            cancel: function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        }, function () {
            $.ajax({
                type: "post",
                url: contextPath + "/train/cancelPublish",
                /* url 多个删除的地址*/
                data: {
                    ids: ids
                    //status: 0
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 1) {
                        $("#question_search_btn").click()
                        layer.msg('已编辑为未发布', {
                            icon: 1,
                            time: 800
                        })
                    }
                }
            });
        },
        function () {
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        })
});
function tableEditFn(){
    var tableEdit = document.getElementsByClassName("table-edit");
    var tableEditLeng = tableEdit.length;
    for(var i = 0; i < tableEditLeng; i++){
        addEvent(tableEdit[i], "click", editFn);
    }
    ;
    function editFn(){
        var self = this;
        var getId = singleId(self, "id");
        /*编辑某一个返回的这行的标识ID*/
        window.location.href = basecontextPath + "/train/toEdit.do?Id=" + getId;
    };
};

tableEditFn();
/*弹窗窗口*/
/*弹窗方法*/
function modal(){
    layer.open({
        type : 1,
        skin : 'layui-layer-molv', //皮肤
        title : ['反馈详情', "font-size:18px"],
        area : ['700px', '450px'],
        shadeClose : true,
        content : $('#feedback_modal')
    });
};
$(document).ready(function(){
    document.getElementById("question_search_btn").click();
});
