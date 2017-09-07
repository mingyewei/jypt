<%--
  Created by IntelliJ IDEA.
  User: renxi
  Date: 2017/4/17
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<head>
    <title>培训课程详情</title>
</head>
<%@ include file="../common/common_header.jsp"%>
<section class="courseInfo-introduction">
    <div class="courseInfo-introduction-title">培训简介</div>
    <div class="courseInfo-introduction-img">
        <img>
    </div>
    <div class="courseInfo-introduction-detial pos-relative hand">
        <h4 class="courseInfo-introduction-detial-title"></h4>
        <p class="courseInfo-introduction-detial-msg"></p>
        <span class="courseInfo-introduction-detial-collect pos-absolute"></span>
        <span class="courseInfo-introduction-detial-watch pos-absolute"></span>
        <span class="courseInfo-introduction-detial-date pos-absolute"></span>
    </div>
</section>
<%@ include file="../common/common_course.jsp"%>
<%@ include file="../common/common_footer.jsp"%>

