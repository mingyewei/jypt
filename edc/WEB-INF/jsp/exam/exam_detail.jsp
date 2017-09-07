<%--
  Created by IntelliJ IDEA.
  User: renxi
  Date: 2017/4/26
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<head>
    <title>考试专区</title>
</head>
<%@ include file="../common/common_header.jsp"%>
<section class="exam-detial-box ">
    <h3 class="exam-detial-title"></h3>
    <div class="exam-detial-notice">
        <ul>
            <li>考试须知：</li>
            <li id="exam_detail_note"></li>
        </ul>
    </div>
    <div class="pos-relative exam-grade-log dis-none">
        <img src="${basePath}/resources/edcapp/img/icon_pingf_grey.png">
        <span>评分中</span>
    </div>
    <div class="exam-detial-content">
        <div class="exam-choice-question">
            <ul class="exam-radio-box">
                <h5 class="exam-detial-classify dis-none"><a></a>单选题（<span style="color:#21a6e4"></span>分）</h5>
            </ul>

            <ul class="exam-checkbox-box">
                <h5 class="exam-detial-classify dis-none"><a>二、</a>不定项选择题（<span style="color:#21a6e4"></span>分）</h5>
            </ul>
        </div>
        <div class="exam-choice-question-score dis-none">选择题总得分：<span></span></div>
        <div class="exam-detial-q-and-a-box">
            <h5 class="exam-detial-classify dis-none"><a>三、</a>问答题（<span></span>分）</h5>
        </div>
    </div>
    <div class="exam-submit-btn hand">提交</div>
    <div class="confirm-box pos-absolute border-ra">
        <p>您有未填写的问题，确认提交吗？</p>
        <span class=" dis-inline hand confirm-submit">确定</span>
        <span class=" dis-inline hand confirm-cancel">取消</span>
    </div>
</section>
<div class="back-to-top">
    <img src="${basePath}/resources/edcapp/img/btn_backtop_nor.png">
</div>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript " charset="utf-8 " src="${basePath}/resources/edcapp/js/exam_detail.js"></script>
