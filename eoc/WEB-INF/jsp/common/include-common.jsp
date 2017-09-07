<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%--<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>--%>

<c:set var="ctx" value="${pageContext.request.contextPath }"/>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path ;
	request.setAttribute("basePath", basePath);
%>

<%--<link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/reset.css"/>--%>
<%--<link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/HoneyComb.min.css"/>--%>
<%--<link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/component/down/down-menu.css"/>--%>
<%--<link rel="icon" href="../resources/HoneyComb1.1/img/global/favicon.ico" mce_href="../HoneyComb1.1/img/global/favicon.ico" type="image/x-icon">--%>
<%--<script src="../resources/HoneyComb1.1/srcipt/Global/HoneyComb.js" type="text/javascript" charset="utf-8"></script>--%>
<%--<script type="text/javascript" src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js"></script>--%>
<script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>

<script type="text/javascript">
	var contextPath ="<%=request.getContextPath()%>";
	var basecontextPath ="<%=basePath%>";
	/*$(document).ready(function(){
		$.ajax({
			async:true,
			type:"get",
			url:basecontextPath+"/sso/ajaxAutoLogin",
			dataType: "script",
			ssuccess:function(data){
				//先创建iframe,然后
				console.log(data);
			}
		});
	});*/
</script>
<link rel="icon" href="${basePath}/resources/HoneyComb1.1/img/global/favicon.ico"
	  mce_href="${basePath}/resources/HoneyComb1.1/img/global/favicon.ico" type="image/x-icon">