<%--
  Created by IntelliJ IDEA.
  User: renxi
  Date: 2017/4/17
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/common_header.jsp"%>
<head>
    <title>文库</title>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/zTreeStyle.css"/>
</head>

<section class="library-box">
    <div class="library-tree">
        <ul id="treeDemo" class="ztree"></ul>
    </div>
    <div class="library-list">
        <ul>
            <!--  <li>
                <span class="library-text dis-inline">课程结构体系：啊曾侧缝危机可复核后</span>
                <span class="library-date dis-inline float-rt">2017.2.19</span>
             </li> -->
        </ul>
    </div>
</section>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/HoneyComb1.1/script/global/jquery.ztree.all.js"></script>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/edcapp/js/library.js"></script>
