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
	<%--<script src="../resources/eduapp/js/ajaxfileupload.js" type="text/javascript" charset="UTF-8"></script>--%>
	<script src="${basePath}/resources/ckeditor/ckeditor.js"></script>
	<title>首页信息管理</title>
</head>

<body>
<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
<div class="content">
	<div id="iframe-box" class="iframe-box">
		<div id="message_modal" style="margin-left: 20px">
			<div id="id" class="dis-none"></div>
			<!--存放编辑的信息的标识ID-->
			<form id="subForm" action="<%=request.getContextPath()%>/HomeManager/saveHomeResource" method="post" enctype="multipart/form-data">
				<div class="message_cont_modal">
					<input id="homeId" name="id" value="${portalFieldDetail.id}" hidden="ture"/>
					<%--${portalFieldDetail.name}--%>
					<div class="managepage_group">
						<label>题目：</label>
						<input type="text" id="modalUserName" name="title" class="input-focus modalInputWidth" value="${portalFieldDetail.title}" placeholder="请输入题目" />
					</div>
					<div class="managepage_group dis-inline">
						<label style="line-height: 35px;">栏目：</label>
						<div id="operation-infosel-modal" class="operation_infosel border" style="margin: 0 8px;">
							<!-- cs修改，添加了一个input隐藏域，给a赋予data-id参数，存储每一个文字的id -->
							<input type="text" hidden="ture" name="hiddentxt" id="hiddentxt" value="${portalFieldDetail.type}"/>
							<%--<input type="text" name="name" id="name" value="1" hidden="ture"/>--%>
							<p><c:if test="${portalFieldDetail.type=='1'}">培训公告报道</c:if>
								<c:if test="${portalFieldDetail.type=='0'}">热点新闻</c:if>
								<c:if test="${portalFieldDetail.type=='2'}">轮播图</c:if><i></i>
							</p>
							<ul class="border">
								<li><a href="#" data-id="0">热点新闻</a></li>
								<li><a href="#" data-id="1">培训公告报道</a></li>
								<li><a href="#" data-id="2">轮播图</a></li>
							</ul>
						</div>
					</div>
					<div class="managepage_group1" id="hotNew" style="<c:out value="${portalFieldDetail.type!=2?\"display: block\":\"display: none\"}"/>">
						<label style="vertical-align: top; margin-bottom: 20px;">内容：</label>
						<textarea rows="30" cols="50" name="editor01">${portalFieldDetail.content}</textarea>
						<script type="text/javascript">
							CKEDITOR.replace('editor01',{height:'360px', width:'852px'});
						</script>

						<div class="managepage_group">
							<label>发布：</label>
							<input type="text" id="status_radio" name="status" value=""  hidden="ture"/>
							<input type="radio" name="course_elaborate" value="0" <c:out value="${portalFieldDetail.status==0?\"checked\":\"\"}"/>/>否
							<input type="radio" name="course_elaborate" value="1" <c:out value="${portalFieldDetail.status==1?\"checked\":\"\"}"/>/>是
						</div>
						<div class="managepage_group" id="picImg">
							<label style="vertical-align: top;">上传图片：</label>
							<input type="file" name="image" id="fileimg1" value="" />
							<span class="fileupload" id="fileimgupload1">选择图片</span>
							<c:forEach items="${attachmentImg}" var="imglist">
								${imglist.fileName}
							</c:forEach>
							<div class="managepage_group">
								<img id="imgupload1" src="" title="" style="display:none" />
							</div>
						</div>
						<div class="managepage_group">
							<div class="managepage_group" id="addContent">
								<label>附件一：</label>
								<input type="file" name="attachments" id="attachments2" value="" />
								<span class="fileupload" id="fileupload2">浏览</span>
								<c:forEach items="${attachment}" var="list">
									<input id="attachmentId" value="${list.id}" style="display: none"/>
									<%--<input id="fileUrl" value="${list}" style="display: none"/>--%>
									<a class="filetips" id="filetips2">${list.fileName}
										<span class="fileupload" style="margin-left: 70px" id="delAttachmentFile">删除此附件</span>
									</a>

								</c:forEach>
								<a class="filetips" id="filetips2"></a>
							</div>
						</div>

					</div>
					<div class="managepage_group1" id="pic" style="<c:out value="${portalFieldDetail.type==2?\"display: block	\":\"display: none\"}"/>">
						<label style="vertical-align: top;">上传图片：</label>
						<input type="file" name="image" id="fileimg" value="" style="display: none"  />
						<span class="fileupload" id="fileimgupload" style="width: 100px; display:inline-block;background-color: #00C1B3;line-height: 35px;text-align: center;color: #FFFFFF">选择图片</span>

						<c:forEach items="${attachmentImg}" var="imglist">
							${imglist.fileName}
						</c:forEach>

						<div class="managepage_group">
							<img id="imgupload" src="" title="" style="display:none" />
						</div>
						<div class="managepage_group">
							<label style="line-height:16px">外部链接：</label>
							<input id="linkStatus" type="text" name="linkStatus" value="" hidden="ture"/>
							<input type="radio" name="externalLink" value="0"  <c:out value="${portalFieldDetail.status==0?\"checked\":\"\"}"/>/>是
							<input type="radio" name="externalLink" value="1" <c:out value="${portalFieldDetail.status==1?\"checked\":\"\"}"/>/>否
						</div>
						<div class="managepage_group1" id="linkCkediter" style="display: none">
							<label style="vertical-align: top;">内容：</label>
							<textarea rows="30" cols="50" name="editor03">${portalFieldDetail.content}</textarea>
							<script type='text/javascript'>CKEDITOR.replace('editor03',{height:'300px', width:'752px'});</script>
						</div>
						<div class="managepage_group" id="imgContent">
							<div class="managepage_group">
								<label style="vertical-align: top;">链接地址：</label>
								<input type="text" id="links" name="linkUrl" class="input-focus modalInputWidth" placeholder="请输入链接地址" value="${portalFieldDetail.srcUrl}"/>
							</div>
						</div>
					</div>
				</div>

				<input id="submitFile" type="submit" hidden="ture"/>
			</form>
			<div class="option_btn mar-top-10" style="margin-left: 0px;margin-right: 0px">
				<span id="personn_submit" class="hover spanBg">提交</span>
				<span id="personn_reset" class="spanBg1">取消</span>
			</div>

		</div></div></div>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="../resources/eduapp/js/editmessage.js" type="text/javascript" charset="utf-8"></script>
</body>

</html>