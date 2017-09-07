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
		<div id="message_modal" style="margin-left: 20px">
			<%--<div id="id" class="dis-none"></div>--%>
			<form id="subForm" action="<%=request.getContextPath()%>/NotifyController/editManagement" method="post" enctype="multipart/form-data">
			<!--存放编辑的信息的标识ID-->
			<div class="message_cont_modal">
				<input type="text" id="noticeId" name="noticeId" value="${ntcNotice.id}" style="display: none"/>
				<div class="managepage_group">
					<label>题目：</label>
					<input type="text" id="modalUserName" name="title" class="input-focus modalInputWidth" value="${ntcNotice.title}" placeholder="请输入题目" />
				</div>
				<div class="managepage_group1 dis-inline">
					<label>接收对象：</label>
					<input type="text" id="orgId" name="targetUserId" class="input-focus modalInputWidth" value="已选择${num}人" style="display: none"/>
					<input type="text" id="modalOrgName" name="orgName" class="input-focus" style="width:220px; margin-right:0;" value="已选择${num}人" placeholder="请选择接收人员" />
					<div class="downs pos-relative" ><i></i></div>
					<div class="zTreeDemoBackground left" style="display: none; padding-top: 0px;">
						<ul id="treeDemo" class="ztree person_tree">
						</ul>
						<div class="tree_btn">
							<span id="treeSubmit" class="spanBg">确认</span></div>
				</div>
				<div class="managepage_group1">
					<label style="vertical-align: top; margin-bottom: 20px;">内容：</label>
					<textarea rows="30" cols="50" name="editor01">${ntcNotice.content}</textarea>
					<script type="text/javascript">
						CKEDITOR.replace('editor01',{height:'400px', width:'852px'});
					</script>
				</div>
				<div class="managepage_group">
				<label>发布：</label>
					<input type="text" id="statusBack" name="statusBack" value="" style="display: none"/>
					<input type="radio" name="course_elaborate" value="0" <c:out value="${ntcNotice.status==0?\"checked\":\"\"}"/>/>否
					<input type="radio" name="course_elaborate" value="1" <c:out value="${ntcNotice.status==1?\"checked\":\"\"}"/>/>是
				</div>

				<div class="managepage_group" id="addContent">
							<label>附件一：</label>
							<input type="file" name="attachments" id="attachments1" value="" />
							<span class="fileupload" id="fileupload1">浏览</span>
					<c:forEach items="${attachments}" var="list">
						<input id="attachmentId" value="${list.id}" style="display: none"/>
						<a class="filetips" id="filetips1">${list.fileName}
							<span class="fileupload" style="margin-left: 70px" id="delAttachmentFile">删除此附件</span>
						</a>
						<%--<span class="fileupload" style="margin-left: 70px" id="delAttachmentFile">删除此附件</span>--%>
					</c:forEach>
					<a class="filetips" id="filetips1"></a>
				</div>
			</div>
			<input id="submitFile" type="submit" hidden="ture"/></div>
			</form>
			<div class="option_btn mar-top-10" style="margin-left: 0;margin-right: 0">
				<span id="personn_submit" class="hover spanBg">提交</span>
				<span id="personn_reset" class="spanBg1">取消</span>
			</div>
		</div>
	</div>
	</div>
	</div>
	<%@ include file="../common/common_footer.jsp"%>
		<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
		<script src="../resources/eduapp/js/editNotify.js" type="text/javascript" charset="utf-8"></script>
	</body>

</html>