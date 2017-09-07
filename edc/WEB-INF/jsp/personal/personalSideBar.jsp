<%--
  Created by IntelliJ IDEA.
  User: renxi
  Date: 2017/4/20
  Time: 11:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/common_header.jsp"%>
<head>
    <title>个人中心</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/laypage.css"/>
</head>
<section class="personal-box">
    <div class="person-content">
        <div class="person-sidebar">
            <ul>
                <li class="personal-sidebar-active">个人资料</li>
                <li>我的收藏</li>
                <li>我的分享</li>
                <li>意见反馈</li>
                <li>修改密码</li>
            </ul>
        </div>
        <div class="person-content-box"></div>
    </div>
</section>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript" src="${basePath}/resources/HoneyComb1.1/script/global/laypage.js"></script>
<script type="text/javascript"  src="${basePath}/resources/edcapp/js/personalSideBar.js"></script>
