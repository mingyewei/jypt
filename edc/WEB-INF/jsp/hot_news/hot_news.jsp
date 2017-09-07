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
    <title>热点新闻</title>
</head>
<%@ include file="../common/common_header.jsp"%>
<div class="hotnews-wrap">
    <div class="hotmews-recommend ">
        <div class="hotmews-recommend-left float-lt hotmews-recommend-transition main-hotnews">
            <img >
            <span class="hotmews-recommend-title ellipsis" title=""></span>
        </div>
        <div class="hotmews-recommend-right float-lt">
            <ul>
            </ul>
        </div>
    </div>
    <ul class="hotmews-list">
    </ul>
    <%--<div class="more-btn">加载更多</div>--%>
    <div class="back-to-top">
        <img src="${basePath}/resources/edcapp/img/btn_backtop_nor.png">
    </div>
</div>

<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/edcapp/js/hotnews.js"></script>
