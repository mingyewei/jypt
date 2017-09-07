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
    <title>海虹培训平台</title>
</head>

<%@ include file="../common/common_header.jsp"%>
<div class="swiper">
    <ul class="">
    </ul>
    <div class="left-btn" ></div>
    <div class="right-btn"></div>
    <div class="img-btn-list"></div>
</div>
<div class="warp">
    <div class="train-cont">
        <div class="train-title train-title-edc">
            <span>培训课程</span>
            <a class="hand toCourse" >更多 ></a>
        </div>
        <div class="train-list">
            <div class="train-list-left float-lt dis-none">
                <img src="${basePath}/resources/edcapp/img/book.jpg">
                <%--<div class="train-list-info">--%>
                    <%--<span class="ellipsis"></span>--%>
                    <%--<p></p>--%>
                <%--</div>--%>
            </div>
            <div class="train-list-right float-lt">
                <ul class="post">

                </ul>
            </div>
        </div>
    </div>
</div>
<div class="warp-two">
    <div class="train-cont">
        <div class="train-title train-title-hotNews">
            <span>热点新闻</span>
            <a data-href="homePage/hotNewList" class="pointer more-hotnews">更多 > </a>
        </div>
        <div class="train-title-hotNews-list">
            <ul class="hotNews-post">
            </ul>
        </div>
        <div>
            <div class="exam float-lt">
                <div class="exam-top hand exam-msg">
                    <img src="${basePath}/resources/edcapp/img/icon_test.png" alt="">考试专区
                </div>
                <a class="more-top dis-none to-exam hand" >
                    点击查看更多
                </a>
                <ul class="exam_list main-exam">

                </ul>
            </div>
            <div class="more float-rt">
                <div class="exam-top hand notice-msg">
                    <img src="${basePath}/resources/edcapp/img/icon_notice.png" alt="">培训公告和报道
                </div>
                <a class="more-top dis-none to-notice hand">
                    点击查看更多
                </a>
                <ul class="exam_list main-notice">

                </ul>
            </div>
        </div>
    </div>
</div>
<div class="banners ">
    海怀博大 虹彩傲天
</div>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/HoneyComb1.1/script/global/bannerList.js "></script>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/edcapp/js/homepage.js"></script>
