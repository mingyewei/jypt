var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {}; /*查询的条件 （对象）*/
/*分页回调函数*/
var dataPageSize=10;
function pageCallback(obj,first){
	var  currentPage= obj.curr;
	//var dataPageSize=10;
	searchTrime.currentPage=currentPage;
	searchTrime.pageSize=dataPageSize;
	$.ajax({
		type:"post",
		url:contextPath+"/tib/listSubject",
		data:searchTrime,
		dataType:"json",
		success:function(data){
			sccFunction(data);
			$("#table-dataallcheck").removeClass("check-current");
			$("#table-dataallcheck").attr("data-check","");
		}
	});
}
/*搜索查询事件*/
$("#question_search_btn").on("click", function() {
		/*题目*/
		var topicVal = $.trim($("#topic").val()); /*$.trim去除收尾空格*/
		searchTrime.name = topicVal;
		searchTrime.currentPage =1;
		$.ajax({
			type:"post",
			url:contextPath+"/tib/listSubject",
			data:searchTrime,
			dataType:"json",
			success:function(data){
				if (data.code==1) {
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
			})
		});

	/*
	 * 动态添加数据方法
	 * @parameter
	 *  condition:查询的条件 （对象）
	 *  url:数据提交地址
	 */


function sccFunction(data) {
	$("tbody").empty();
	/*显示数据的ID*/
	//var tableList = ["question", "typeShow", "correctAnswerShow", "createTimeShow"];
	var tableList = ["name","createTimeShow"];
	/*隐藏数据的ID*/
	var tableListNone = ["id"];
	/*表格展示数据的List*/
	var dataList = data.data.data;
	var sun_page=data.data.total;
	$("#sum_page span").text(sun_page);
	for (var i=0;i<dataList.length;i++){
		dataList[i].question
	}
	/*添加数据*/
	var operation=["table-edit","table-delete"];
	var title=["编辑","删除"];
	questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone,operation,title);
	/*单个点击删除*/
	questTable.singDel("id", "table_id", contextPath+"/tib/deleteSubjectById","#question_search_btn");

	tableEditFn();
}

function tableEditFn() {
	$(".table-edit").on("click",editFn);
	function editFn(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked',true);
		var self = this;
		var getId = singleId(self, "id"); /*编辑某一个返回的这行的标识ID*/
		$.ajax({
			type: "post",
			url: contextPath+"/tib/getSubjectById.do",
			/*编辑表格的某一行的时候 传递这行的标识ID地址*/
			data: {
				id: getId
			},
			dataType: "json",
			success: function(data) {
				if (data.code == 1) {
					modal("修改");
					/* question_Id 试题的唯一标识ID*/
					var question_Id = $("#question_Id").text(data.data.id)
					/*testItemBlankId 题库的唯一ID*/
					var questionsTitle = $("#operation_title").val(data.data.name);
				} else {
					layer.msg(data.msg);
				}
			}
		});
	};
}

/*全选*/
questTable.checkBoxAll("table-dataallcheck");
/*多个删除*/
$("#question_del").on("click", function() {
		var idArray = questTable.allDel("table_id", "id");
		if(idArray.length<1){
			layer.msg('请选择删除的列表')
			return;
		}
		layer.confirm('确定要删除吗?', {
			btn: ['确定', '取消'],
            cancel:function (){
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
            }
		}, function() {
			$.ajax({
				type: "post",
				url: contextPath+"/tib/deleteSubjects",
				/* url 多个删除的地址*/
				data: {ids:idArray},
				dataType: "json",
				success: function(data) {
					if (data.code == 1) {
						layer.msg('已删除', {
							icon: 1,
							time: 600
						})
						$("#question_search_btn").click();
					}
				}
			});

		},function(){
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
        }
    );
	});

/*弹窗窗口*/
/*弹窗方法*/
var index;
function modal(title) {
	index = layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: [title, "font-size:18px"],
		area: ['800px', '600px'],
		shadeClose: false,
		content:$("#addQuest_modal"),
		cancel:fn
	});
    $('#operation_title').focus();
}
$("#personn_reset").on("click",function(){
	layer.closeAll();

})
function fn(){
	$("#option_reset").click();
	$("#question_search_btn").click();
}
function layerColse(index){
	layer.close(index); //此时你只需要把获得的index，轻轻地赋予layer.close即可
}

//初始化列表
$("#question_search_btn").click();
$("#question_add").on("click", function() {
	modal("添加");
	/*按钮状态*/
    $('#operation_title').focus();
	$(".spanBg1").mousedown(function() {
		$(this).addClass("yellow_down");
	});

	$(".spanBg1").mouseup(function() {
		$(this).removeClass("yellow_down");
	});

	$(".spanBg1").mouseleave(function() {
		$(this).removeClass("yellow_down");
	});
});


/*重置*/
$("#option_reset").on("click", function() {
	$("#question_Id").text("");
	//$("#testItemBlankId").text("");
	$("#operation_title").val("");
	layer.closeAll();
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
});

//回车保存事件
$("body").keydown(function() {
	if (event.keyCode == "13") {//keyCode=13是回车键
		$('#option_submit').click();

	}
});
        /*数据提交*/
$("#option_submit").on("click", function() {
    if($("#operation_title").val()==''){
        layer.msg('请输入课程');
        return;
    }
	/* question_Id 试题的唯一标识ID*/
	var question_Id = $("#question_Id").text();
	/*testItemBlankId 题库的唯一ID*/
	var questionsTitle = $("#operation_title").val();
	var questionsData = {};
	questionsData.name = questionsTitle;
	questionsData.id = question_Id;
	var dataUrl;
	var isUpdate = false;
	if (question_Id == null || question_Id =="") {
		dataUrl = contextPath+"/tib/addSubject"; /*新增的数据ID地址*/
	} else {
		dataUrl = contextPath+"/tib/editSubject"; /*修改的数据ID地址*/
		isUpdate = true;
	}
	$.ajax({
		type: "post",
		url: dataUrl,
		data: questionsData,
		dataType: "json",
		success: function(data) {
			if (data.code == 1) {
				if(isUpdate){
					layer.msg(data.msg);
					layerColse(index);
					fn();
				}else{
					layer.msg('数据提交成功！');
					//flage = 0; /*序号归0*/
					//$(".option").empty(); /*提交后数据清空*/
					//$("#operation_title").val("");
					layerColse(index);
					fn();
				}

			};
		}
	});
    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked',false);
});
