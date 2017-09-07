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
    <title>考试专区</title>
</head>
<%@ include file="../common/common_header.jsp"%>
<section class="exam-train-box">
    <span class="exam-train-title">培训考试</span>
    <ul class="exam-train-tab" state="0">
        <li class="exam-active" data-ok="0">进行中</li>
        <li data-ok="1">即将开始</li>
        <li data-ok="1">已过期</li>
    </ul>
    <div class="exam-swiper" data-current='0'>
        <ul class="exam-bannerList exam-bannerList-underway" now-page=1 >

        </ul>

        <ul class="exam-bannerList exam-bannerList-aboutbegin dis-none" now-page=1 >
        </ul>


        <ul class="exam-bannerList exam-bannerList-expired dis-none" now-page=1 >
        </ul>

        <div class="exam-train-detial dis-none">
            <div class="exam-train-detial-title"><span>培训考试</span>
                <img src="${basePath}/resources/edcapp/img/icon_x.png">
            </div>
            <ul>

            </ul>
        </div>
    </div>
    <div class="exam-left-btn "></div>
    <div class="exam-right-btn "></div>
</section>
<section class="exam-else-box">
    <span class="exam-else-title">其他考试</span>
    <ul class="exam-else-tab" data-tab=0>
        <li class="exam-active" data-first="false">进行中</li>
        <li data-first="true">即将开始</li>
        <li data-first="true">已过期</li>
    </ul>
    <ul class="exam-else-list-box" >
    </ul>
    <ul class="exam-else-list-box dis-none " >
    </ul>
    <ul class="exam-else-list-box dis-none " >
    </ul>
    <%--<div class="load-more">正在加载</div>--%>
</section>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/edcapp/js/exam.js"></script>
