<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
		<link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/reset.css" />
		<link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/HoneyComb.min.css" />
		<link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css" />
		<link rel="stylesheet" href="../resources/eduapp/css/Education.css" />
		<script src="../resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>
		<script src="../resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
		<script src="../resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
		<script src="../resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript" charset="UTF-8"></script>
		<%--<script type="text/javascript" src="js/ajaxfileupload.js" charset="UTF-8"></script>--%>
		<title>首页内容管理</title>
	</head>
	<body>
		<div class="questionCont">
			<div class="table-top">
				<label>题目：</label>
				<input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目" />
				<div class="input-group dis-inline">
					<label>栏目：</label>
				</div>
				<div id="column" class="patientlist_infosel">
					<p>全部<i></i></p>
					<ul>
						<li><a href="#">全部</a></li>
						<li><a href="#">轮播图</a></li>
						<li><a href="#">热点新闻</a></li>
						<li><a href="#">通知公告</a></li>
						<li><a href="#">广告位</a></li>
					</ul>
				</div>
				<div class="input-group dis-inline">
					<span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
				</div>
			</div>
			<div class="question_edit">
				<div class="input-group dis-inline">
					<span id="question_add" class="input-group-btn spanBg hover">添加</span>
				</div>
				<div class="input-group dis-inline">
					<span id="question_del" class="input-group-btn spanBg hover">删除</span>
				</div>
			</div>
			<div class="table-content">
				<table id="table_id" class="table-striped table-hover" cellpadding="0" cellspacing="0" border="0" width="100%">
					<thead>
						<tr>
							<th width="50">选择</th>
							<th style="display: none;"></th>
							<th>栏目</th>
							<th>题目</th>
							<th>添加日期</th>
							<th width="100">操作</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<div class="table-setting">
					<span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
				</div>
			</div>
			<div id="question_page">
			</div>
		</div>
		<div id="course_modal" style="width: 510px; margin-left: auto;margin-right: auto;">
			<div id="course_id" class="dis-none"></div>
			<!--存放编辑的信息的标识ID-->
			<div class="message_cont_modal">
				<div class="managepage_group">
					<label>题目：</label>
					<input type="text" id="titles" class="input-focus modalInputWidth" placeholder="请输入题目" />
				</div>
				<div class="managepage_group dis-inline">
					<label style="line-height: 35px;">栏目：</label>
					<div id="operation-infosel-modal" class="operation_infosel border" style="margin: 0 8px;">
						<p>热点新闻<i></i></p>
						<ul class="border">
							<li><a href="#">热点新闻</a></li>
							<li><a href="#">通知公告</a></li>
							<li><a href="#">轮播图</a></li>
						</ul>
					</div>
				</div>
				<div id="addContent">
					<!--<div class="managepage_group">
						<label style="vertical-align: top;">内容：</label>
						<textarea id="content" class="input-focus" placeholder=""></textarea>
					</div>
					<div class="managepage_group">
						<label>附件一：</label>
						<input type="file" name="" id="attachments1" value="" />
						<span class="fileupload" id="fileupload1">浏览</span>
						<a class="filetips" id="filetips1"></a>
					</div>
					<div class="managepage_group">
						<label>附件二：</label>
						<input type="file" name="" id="attachments2" value="" />
						<span class="fileupload" id="fileupload2">浏览</span>
						<a class="filetips" id="filetips2"></a>
					</div>
					<div class="managepage_group">
						<label>附件三：</label>
						<input type="file" name="" id="attachments3" value="" />
						<span class="fileupload" id="fileupload3">浏览</span>
						<a class="filetips" id="filetips3"></a>
					</div>-->
				</div>
			</div>
			<div class="option_btn mar-top-10">
				<span id="personn_submit" class="hover spanBg">提交</span>
				<span id="personn_reset" class="spanBg1">取消</span>
			</div>
		</div>
		<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
		<script type="text/javascript" src="../resources/eduapp/js/indexcontent.js" charset="UTF-8"></script>
	</body>
</html>
