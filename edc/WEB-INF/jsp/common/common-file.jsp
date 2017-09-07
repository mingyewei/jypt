<%--
  Created by IntelliJ IDEA.
  User: renxi
  Date: 2017/4/18
  Time: 10:20
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/shareList.css"/>
<section class="course-file-box">
    <h3 class="course-file-title"></h3>
    <span class="course-file-lacation"></span>
    <span class="course-file-date"></span>
    <div class="course-file-operation float-rt display-inline">
        <span class="course-file-collect border-ra">收藏</span>
        <div class="share-list-box dis-inline pos-relative">
            <span class="course-file-share border-ra">分享</span>
            <div class="sharelist dis-none">
                <div class="bdsharebuttonbox" data-tag="share_1">
                    <a class="bds_weixin" data-cmd="weixin"></a>
                    <a class="bds_tsina" data-cmd="tsina" ></a>
                    <a class="bds_qzone" data-cmd="qzone"></a>
                    <a class="bds_sqq" data-cmd="sqq"></a>
                </div>
            </div>
        </div>
        <span class="course-file-praise border-ra dis-none"></span>
    </div>
    <div class="course-file-text"></div>
</section>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/fileText.js"></script>
