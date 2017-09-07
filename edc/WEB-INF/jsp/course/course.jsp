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
    <title>培训课程</title>
</head>
<%@ include file="../common/common_header.jsp"%>
<section class="course-box">
    <div class="course-tab-title">
        <ul>
            <li class="course-tab-proceed course-tab-active">正在进行</li>
            <li class="course-tab-beginning " data-ok="1">即将开始</li>
        </ul>
    </div>
    <div class="course-list" data-type=1>
        <ul class="course-list-now">

        </ul>
        <ul class="course-list-after dis-none" ></ul>
    </div>
</section>
<%--<div class="more-btn">加载更多</div>--%>
<div class="back-to-top">
    <img src="${basePath}/resources/edcapp/img/btn_backtop_nor.png">
</div>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/edcapp/js/course.js"></script>

