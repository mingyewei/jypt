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
	<script src="../resources/eduapp/js/ajaxfileupload.js" type="text/javascript" charset="UTF-8"></script>
	<script src="../resources/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
	<title>通知管理</title>
</head>

<body>
<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
<div class="content">
	<div id="iframe-box" class="iframe-box">
<div id="message_modal">
	<div id="id" class="dis-none"></div>
	<!--存放编辑的信息的标识ID-->

	<form id="subForm" action="<%=request.getContextPath()%>/NotifyController/addNotifyMsg" method="post" enctype="multipart/form-data">
		<%--<input hidden="ture" value="" name="id" id="noticeId">--%>
		<div class="message_cont_modal">
			<div class="managepage_group">
				<label>题目：</label>
				<input type="text" id="modalUserName" name="title" class="input-focus modalInputWidth" value="" placeholder="请输入题目" />
			</div>
			<div class="managepage_group dis-inline">
				<label>接收对象：</label>
				<!-- cs修改，这里id的隐藏域和编辑的不一样 -->
				<!-- <input type="text" id="orgid" name="orgId" class="input-focus modalInputWidth" value="1" hidden="ture"/> -->
				<input type="text" id="orgId" name="targetUserId" class="input-focus modalInputWidth" value="" hidden="ture"/>
				<input type="text" id="modalOrgName" name="orgName" class="input-focus" style="width:220px; margin-right:0;" value="" placeholder="请选择接收人员" />
				<div class="downs pos-relative" ><i></i></div>
				<div class="zTreeDemoBackground left" style="display: none; padding-top: 0px;">
					<ul id="treeDemo" class="ztree person_tree">

					</ul>
					<div class="tree_btn">
						<span id="treeSubmit" class="spanBg">确认</span></div>
				</div>
			</div>
				<div class="managepage_group1">
					<label style="vertical-align: top; margin-bottom: 20px;display: inline-block">内容：</label>
					<textarea class="dis-inline" rows="30" cols="50" name="editor01" >请输入.</textarea>
					<script type="text/javascript">
						CKEDITOR.replace('editor01', {height:'400px', width:'852px'});
					</script>
				</div>
				<div class="managepage_group">
					<label>发布：</label>
					<input type="text" name="statusBack" id="statusBack" value="" hidden="ture"/>
					<input type="radio" name="course_elaborate" value="0"/>否
					<input type="radio" name="course_elaborate" value="1"/>是
				</div>
				<div class="managepage_group" id="addContent">
					<label>附件一：</label>
					<input type="file" name="attachments" id="attachments1" value="" />
					<span class="fileupload" id="fileupload1">浏览</span>
					<a class="filetips" id="filetips1"></a>
				</div></div>
			<%--<div class="managepage_group">--%>
			<%--<label>附件二：</label>--%>
			<%--<input type="file" name="file" id="fujian2" class="" value="" />--%>
			<%--</div>--%>
			<%--<div class="managepage_group">--%>
			<%--<label>附件三：</label>--%>
			<%--<input type="file" name="file" id="fujian3" class="" value="" />--%>
			<%--</div>--%>

		<input id="submitFile" type="submit" hidden="ture"/>
	</form>
	<div class="option_btn mar-top-10" style="margin-left: 0px;margin-right: 0px">
		<span id="personn_submit" class="hover spanBg">提交</span>
		<span id="personn_reset" class="spanBg1">取消</span>
	</div>
</div>
		</div>
</div>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="../resources/eduapp/js/addNotify.js" type="text/javascript" charset="utf-8"></script>
</body>

</html>