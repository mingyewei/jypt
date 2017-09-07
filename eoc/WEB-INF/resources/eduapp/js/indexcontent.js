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
	createHtml(txt);
});
/* end 下拉列表*/
var questTable = new tableDataOperation();
/*查询条件保存*/
var searchTrime = {}; /*查询的条件 （对象）*/
/*搜索查询事件*/
$("#question_search_btn").on("click", function() {
		/*题目*/
		var topicVal = $.trim($("#topic").val()); /*$.trim去除收尾空格*/
		var column = $("#column p").text(); /*栏目*/
		var columnId = null;
		/*判断题目类型*/
		if (column == "轮播图") {
			columnId = 0;
		} else if (column == "热点新闻") {
			columnId = 1;
		} else if (column == "通知公告") {
			columnId = 2;
		} else if (column == "广告位") {
			columnId = 3;
		} else if (column == "全部") {
			columnId = 4;
		}
		searchTrime.topicVal = topicVal;
		searchTrime.columnId = columnId;
		$.ajax({
			type: "post",
			url: "",
			data: searchTrime,
			dataType: "json",
			success: function(data) {
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
	})
/*分页回调函数*/
var dataPageSize=10;
function pageCallback(obj,first){
	var  currentPage= obj.curr;
	//var dataPageSize=10;
	searchTrime.currentPage=currentPage;
	searchTrime.pageSize=dataPageSize;
	$.ajax({
		type:"post",
		url:contextPath+"/testItem/list",
		data:searchTrime,
		dataType:"json",
		success:function(data){
			sccFunction(data)
		}
	});
}
/*
 * 动态添加数据方法
 * @parameter
 *  condition:查询的条件 （对象）
 *  url:数据提交地址
 */

function sccFunction(data) {
	$("tbody").empty();

	/*显示数据的ID*/
	var tableList = ["栏目", "题目","添加日期"];
	/*隐藏数据的ID*/
	var tableListNone = ["id"];
	/*表格展示数据的List*/
	var dataList = data.data.data;
	/*添加数据*/
	questTable.dataAdd(dataList, "table_id", "itm", tableList, tableListNone);
	/*单个点击删除*/
	questTable.singDel("id", "table_id", contextPath+"/testItem/delete","#question_search_btn");
	function tableEditFn() {
		//for (var i = 0; i < tableEditLeng; i++) {
		//	addEvent(tableEdit[i], "click", editFn)
		//}
		$(".table-edit").on("click",editFn);
		function editFn() {
			var self = this;
			var getId = singleId(self, "id"); /*编辑某一个返回的这行的标识ID*/
			$.ajax({
				type: "post",
				url: contextPath+"/testItem/toUpdate",
				/*编辑表格的某一行的时候 传递这行的标识ID地址*/
				data: {
					id: getId
				},
				dataType: "json",
				success: function(data) {
					if (data.code == 1) {
						modal("修改课程","#course_modal");
						$("#course_id").val();//唯一标识ID
						$("#title").val();//标题
						$("#filetips1").text("");
						$("#filetips2").text("");
						$("#filetips3").text("");//三个附件内容填充，给用户反馈自己传的文件名称
						flage=options.length;
					} else {
						layer.msg(data.msg);
					}
				}
			});
		};
	};
	tableEditFn();
}
/*全选*/
questTable.checkBoxAll("table-dataallcheck");
/*多个删除*/
$("#question_del").on("click", function() {

		var idArray = questTable.allDel("table_id", "id");
		if(idArray.length<1){
			layer.alert('未选中数据')
			return;
		}
		layer.confirm('确定要删除吗?', {
			btn: ['确定', '取消']
		}, function() {
			//questTable.allDel("table_id", "id");
			//var idArray = questTable.allDel("table_id", "id");
			//var idData = {};
			//idData.idArray = idArray;

			$.ajax({
				type: "post",
				url: contextPath+"/testItem/deletes",
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

		})
	});

//课程页添加编辑
//富文本编辑器
//var um = UM.getEditor("content");
//保存按钮事件
$("#personn_submit").on("click", function() {

	var filelists = [];
	var data = {
		title: $("#titles").val(), //题目
	}
	//栏目ID和文件
	var selectText = $("#operation-infosel-modal p").text();
	if (selectText=="热点新闻"){
		data.selectId = 0;
		data.content = $("#contents").val();
		filelists = ['attachments1', 'attachments2', 'attachments3'];
	}else if (selectText=="通知公告"){
		data.selectId = 1;
		data.content = $("#contents").val();
		//filelists = ['attachments1', 'attachments2', 'attachments3'];
	}else if (selectText=="轮播图"&&$("input[name='externalLink']:checked").val()=="0"){
		data.selectId = 2;
		data.links = $("#links").val();
		//filelists = ['fileimg'];
	}else if (selectText=="轮播图"&&$("input[name='externalLink']:checked").val()=="1"){
		data.selectId = 3;
		data.content = $("#contents").val();
		//filelists = ['fileimg','attachments1', 'attachments2', 'attachments3'];
	}
	console.log(data);
	$.ajax({
		type:"post",
		url:contextPath+'HomeManager/addHomeResource',
		data: data,
		dataType: "json",
		success:function(data){
			if (data.code==1) {
				$("#subForm").submit(function(e){
					return false;
				});
				layer.msg('通知提交成功！');
				//empitData();
			}
		}

	});
	//$.ajaxFileUpload({
	//	url: contextPath+'HomeManager/addHomeResource',
	//	type: 'post',
	//	fileElementId: filelists,
	//	//fileElementId:'file1',
	//	dataType: 'json',
	//	secureuri: false,
	//	data: data,
	//	success: function(data, status) {
	//		alert(data);
	//	}
	//});
});
/*弹窗方法*/
function modal(title,contentId) {
	layer.open({
		type: 1,
		skin: 'layui-layer-molv', //皮肤
		title: [title, "font-size:18px"],
		area: ['650px', '600px'],
		shadeClose: false,
		content: $(contentId)
	});
}
$("#question_add").on("click", function() {
	modal("课程添加","#course_modal");
})
$(".down").on("click", function() {
	if ($(".zTreeDemoBackground").css("display") == "none") {
		$(".zTreeDemoBackground").css("display", "block")
	} else {
		$(".zTreeDemoBackground").css("display", "none")
	}
});

//清空弹出框数据
function resetData(){
	$("#course_modal input[type='text']").val("");
	$("#course_modal textarea").val("");
	$("#course_modal input[type='file']").val("");
	$("#filetips1").text("");
	$("#filetips2").text("");
	$("#filetips3").text("");
}

//外部链接
$("#addContent").on("focus","input[name='externalLink']",function(){
	$(this).prop("checked",true);
	createHtmlPic($("input[name='externalLink']:checked").val());
})

//动态变化添加内容
//图片上传
$("#addContent").on("click","#fileimgupload",function(){
	$("#fileimg").click();
	getUploadImg("#fileimg","#imgupload");
});



function getUploadImg(obj,obj2){
	$(obj).on("change",function(){
		var fileList = this.files[0];
		if (fileList==undefined){
			$(obj2).attr("src","");
			$(obj2).hide();
			return false;
		}
		if (!/image\/\w+/.test(fileList.type)){
			alert("请选择图片");
			return false;
		}
		var reader = new FileReader();
		reader.readAsDataURL(fileList);
		reader.onload = function(e){
			$(obj2).attr("src",e.target.result);
			$(obj2).show();
		}
	})
}

//addColumnId，0表示热点新闻和通知公告，1表示轮播图
function createHtml(addColumnId){
	var addContent = $("#addContent");
	addContent.html("");
	var html = "";
	if (addColumnId=="热点新闻"||addColumnId=="通知公告"){
		html += '<div class="managepage_group">';
		html += 	'<label style="vertical-align: top;">内容：</label>';
		html += 	'<textarea id="contents" class="input-focus" placeholder=""></textarea>';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += 	'<label>附件一：</label>';
		html += 	'<input type="file" name="" id="attachments1" value="" />';
		html += 	'<span class="fileupload" id="fileupload1">浏览</span>';
		html += 	'<a class="filetips" id="filetips1"></a>';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += 	'<label>附件二：</label>';
		html += 	'<input type="file" name="" id="attachments2" value="" />';
		html += 	'<span class="fileupload" id="fileupload2">浏览</span>';
		html += 	'<a class="filetips" id="filetips2"></a>';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += '<label>附件三：</label>';
		html += '<input type="file" name="" id="attachments3" value="" />';
		html += '<span class="fileupload" id="fileupload3">浏览</span>';
		html += '<a class="filetips" id="filetips3"></a>';
		html += '</div>';
		addContent.append(html);
	}else if (addColumnId=="轮播图"){
		html += '<div class="managepage_group">';
		html += 	'<label style="vertical-align: top;">上传图片：</label>';
		html += 	'<input type="file" name="" id="fileimg" value="" />';
		html += 	'<span class="fileupload" id="fileimgupload">选择图片</span>';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += 	'<img id="imgupload" src="" title="" style="display:none" />';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += 	'<label style="line-height:16px">外部链接：</label>';
		html += 	'<input type="radio" name="externalLink" value="0" checked />是'
		html += 	'<input type="radio" name="externalLink" value="1" />否'
		html += '</div>';
		html += '<div class="managepage_group" id="imgContent">';
		html += 	'<div class="managepage_group">';
		html += 		'<label style="vertical-align: top;">链接地址：</label>';
		html += 		'<input type="text" id="links" class="input-focus modalInputWidth" placeholder="请输入链接地址" />';
		html += 	'</div>';
		html += '</div>';
		addContent.append(html);
	}
}
function createHtmlPic(num){
	var html = "";
	var imgContent = $("#imgContent");
	imgContent.html("");
	if (num=="1"){
		html += '<div class="managepage_group">';
		html += 	'<label style="vertical-align: top;">内容：</label>';
		html += 	'<textarea id="contents" class="input-focus" placeholder=""></textarea>';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += 	'<label>附件一：</label>';
		html += 	'<input type="file" name="" id="attachments1" value="" />';
		html += 	'<span class="fileupload" id="fileupload1">浏览</span>';
		html += 	'<a class="filetips" id="filetips1"></a>';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += 	'<label>附件二：</label>';
		html += 	'<input type="file" name="" id="attachments2" value="" />';
		html += 	'<span class="fileupload" id="fileupload2">浏览</span>';
		html += 	'<a class="filetips" id="filetips2"></a>';
		html += '</div>';
		html += '<div class="managepage_group">';
		html += 	'<label>附件三：</label>';
		html += 	'<input type="file" name="" id="attachments3" value="" />';
		html += 	'<span class="fileupload" id="fileupload3">浏览</span>';
		html += 	'<a class="filetips" id="filetips3"></a>';
		html += '</div>';
		imgContent.append(html);
	}else if(num=="0") {
		html += '<div class="managepage_group">';
		html += 	'<label style="vertical-align: top;">链接地址：</label>';
		html += 	'<input type="text" id="links" class="input-focus modalInputWidth" placeholder="请输入链接地址" />';
		html += '</div>';
		imgContent.append(html);
	}
}
function getUploadFile(obj,obj2){
	$(obj).on("change",function(){
		var fileList = this.files[0];
		if (fileList==undefined){
			$(obj2).text("");
			return false;
		}else {
			$(obj2).text(fileList.name);
		}
	});
}
//附件选择
$("#addContent").on("click","#fileupload1",function(){
	$("#attachments1").click();
	getUploadFile("#attachments1","#filetips1")
});
$("#addContent").on("click","#fileupload2",function(){
	$("#attachments2").click();
	getUploadFile("#attachments2","#filetips2");
});
$("#addContent").on("click","#fileupload3",function(){
	$("#attachments3").click();
	getUploadFile("#attachments3","#filetips3");
});