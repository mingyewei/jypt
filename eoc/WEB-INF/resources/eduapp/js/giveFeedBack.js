/*弹窗框下拉列表*/
$("#operation-infosel-modal p").bind("click", function() {
	var ul = $("#operation-infosel-modal ul");
	$("#operation-infosel-modal p i").addClass("current");
	if (ul.css("display") == "none") {
		ul.slideDown("fast");
	} else {
		ul.slideUp("fast");
	};
});
$("#operation-infosel-modal ul li a").on("click", function() {
	var txt = $(this).text();
	$("#operation-infosel-modal p").html(txt + "<i></i>");
	$("#operation-infosel-modal ul").hide();
	$(".option").empty();
	flage = 0 /*序号归0*/
});
/* end 下拉列表*/

var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {}; /*查询的条件 （对象）*/
/*搜索查询事件*/
$("#question_search_btn").on("click",searchFn);
function searchFn(){
    /*题目*/
        var topicVal = $.trim($("#topic").val());
        var status;
        if($("#status").text()=='已处理'){
            status=1;
        }else  if($("#status").text()=='未处理'){
            status=0;
        }else {
            status='';
        }
        searchTrime.status = status;
        searchTrime.content = topicVal;
        $.ajax({
            type:"post",
            url:contextPath+"/feedback/listByPage",
            data:searchTrime,
            dataType:"json",
            success:function(data){
                if (data.code==1) {
                    laypage({
                        cont:'giveFeedBack_page',
                        pages:Math.ceil(data.data.total/data.data.pageSize),/*总页数*/
                        curr:data.data.currentPage||1,/*当前页*/
                        jump:pageCallback
                    })
                }
            }
        })
}
/*分页回调函数*/
function pageCallback(obj,first){
	var  currentPage= obj.curr;
	var dataPageSize=10;
	searchTrime.currentPage=currentPage;
	searchTrime.pageSize=dataPageSize;
	$.ajax({
		type:"post",
		url:contextPath+"/feedback/listByPage",
		data:searchTrime,
		dataType:"json",
		success:function(data){
			sccFunction(data);
			$("#table-dataallcheck").removeClass("check-current");
			$("#table-dataallcheck").attr("data-check","");
		}
	});
}
function sccFunction(data) {
	$("tbody").empty();
	/*显示数据的ID*/
	var tableList = ["type","askContent","mobilePhone","email","status","askTime"];
	/*隐藏数据的ID*/
	var tableListNone = ["id"];
	/*表格展示数据的List*/
	var dataList = data.data.data?data.data.data:[];
	var sun_page=data.data.total;
	$("#sum_page span").text(sun_page);
	for(var i=0;i<dataList.length;i++){
		if(dataList[i].type==0){
			dataList[i].type="意见";
		}else if(dataList[i].type==1){
			dataList[i].type="建议";
		}else if(dataList[i].type==2){
			dataList[i].type="投诉";
		}else if(dataList[i].type==3){
			dataList[i].type="其他";
		}
		if(dataList[i].status==0){
			dataList[i].status="未处理";
		}else{
			dataList[i].status="已处理";
		}
	}
	/*添加数据*/
	var operation=["table-edit"]
	var title=["详细"]
	questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone,operation,title);
	/*全选*/
	tableEditFn();
}
searchFn()
function tableEditFn() {
	$(".table-edit").on('click',function(e){
        e.stopPropagation();
        var self = this;
        var getId = singleId(self, "id"); /*编辑某一个返回的这行的标识ID*/
        $.ajax({
            type: "post",
            url:basecontextPath+"/feedback/detail",
            data: {
                id:getId
            },
            dataType: "json",
            success: function(data) {
                if (data.code == 1) {
                    modal("详情")
                    if(data.data.type==0){
                        $("#typeShow").text("意见");
                    }else if(data.data.type==1){
                        $("#typeShow").text("建议");
                    }else if(data.data.type==2){
                        $("#typeShow").text("投诉");
                    }else if(data.data.type==3){
                        $("#typeShow").text("其他");
                    }
                    $("#askConten").val(data.data.askContent);//反馈的内容
                    $("#Email").text(data.data.email);//反馈人员的email
                    $("#Tel").text(data.data.mobilePhone);//反馈人员的电话
                    $("#ids").val(data.data.id);//这是标志反馈人员的ID
                    if(data.data.status==1){
                        $("input[name='course_elaborate']").eq(0).attr("checked","ture");
                    }else{
                        $("input[name='course_elaborate']").eq(1).attr("checked","ture");
                    }
                }
            }
        })
    })
};
questTable.checkBoxAll("table-dataallcheck");
$("#status_add").on("click", function () {
	var idArray = questTable.allDel("table_id", "id");
	var ids = {};
	if (idArray.length <= 0) {
		layer.msg('请选择要处理的列表！');
		return;
	}
	for (var i = 0; i < idArray.length; i++) {
		ids[i] = idArray[i];
	}
	layer.confirm('确定要批量编辑吗?', {
			btn: ['确定', '取消'],
			cancel: function () {
				$("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
			}
		}, function () {
			$.ajax({
				type: "post",
				url: contextPath + "/feedback/markMulti",
				data: {
					ids: ids,
					status:1
				},
				dataType: "json",
				success: function (data) {
					if (data.code == 1) {
						$("#question_search_btn").click()
						layer.msg('已编辑为已处理', {
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
$("#status_del").on("click", function () {
	var idArray = questTable.allDel("table_id", "id");
	var ids = {};
	if (idArray.length <= 0) {
		layer.msg('请选择要处理的列表！');
		return;
	}
	for (var i = 0; i < idArray.length; i++) {
		ids[i] = idArray[i];
	}
	layer.confirm('确定要批量编辑吗?', {
			btn: ['确定', '取消'],
			cancel: function () {
				$("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
			}
		}, function () {
			$.ajax({
				type: "post",
				url: contextPath + "/feedback/markMulti",
				data: {
					ids: ids,
					status:0
				},
				dataType: "json",
				success: function (data) {
					if (data.code == 1) {
						$("#question_search_btn").click()
						layer.msg('已编辑为未处理', {
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
/*弹窗窗口*/
/*弹窗方法*/
function modal() {
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: ['反馈详情', "font-size:18px"],
		area: ['700px', '450px'],
		shadeClose: true,
		content: $('#feedback_modal'),
        cancel:function(){
            $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
        }
	});
};
$("#sign_update").on('click',function(){
    var status;
    if($("input[name='course_elaborate']"&&"input[value='1']").prop('checked')){
        status=0;
    }else {
        status=1;
    }
    $.ajax({
        type: "post",
        url: contextPath + "/feedback/update",
        data: {
           id: $("#ids").val(),
           status:status
        },
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                $("#question_search_btn").click()
                layer.msg('提交成功', {
                    icon: 1,
                    time: 800
                });
                layer.closeAll();
            }
        }
    });
})