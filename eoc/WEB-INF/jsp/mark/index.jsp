<%--
  Created by IntelliJ IDEA.
  User: weimingye
  Date: 2017/3/20
  Time: 10:51
  To change this template use File | Settings | File Templates.
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="../common/include-common.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/HoneyComb.min.css"/>
    <link rel="stylesheet" type="text/css"
          href="${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css"/>
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css"/>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <script type="text/javascript" src="${basePath}/resources/eduapp/js/ajaxfileupload.js" charset="UTF-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="../resources/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
    <title>试卷评分</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>

<%--先隐藏试卷评分--%>
<div class="content">
    <div class="iframe-box">
        <div class="show_iframe">
            <%--试卷评分--%>
            <div class="questionCont">
                <div class="table-top">
                    <div class="input-group dis-inline">
                        <label>试题名称：</label>
                        <input type="text" id="test_mark" class="input-focus" value="" placeholder="请输入关键字"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>试题分类：</label>
                        <div class="patientlist_infosel input-group" id="test_type">
                            <p>全部<i></i></p>
                            <ul>
                                <li><a href="#">全部</a></li>
                                <li><a href="#">培训考试</a></li>
                                <li><a href="#">课程考试</a></li>
                                <li><a href="#">普通考试</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="input-group dis-inline">
                        <label>题目：</label>
                        <input type="text" id="test_title" class="input-focus input-group" value="" placeholder="请输入关键字"/>
                    </div>
                    <div class="input-group dis-inline">
                        <span class="input-group-btn spanBg hover" id="mark_papers_search">搜索</span>
                    </div>
                </div>
                <%--这是点击查看能看到参加考试的答题的状态--%>
                <%--<div class="question_edit dis-inline" id="mark_papers_check">--%>
                    <%--<div class="input-group dis-inline">--%>
                        <%--<span class="input-group-btn spanBg1 hover">查看</span>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <div class="table-content">
                    <table class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%" id="table_id">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>试题名称</th>
                            <th>试题分类</th>
                            <th>题目</th>
                            <th>考试对象</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <%--<div class="table-setting">--%>
                        <%--<span class="table-dataallcheck" data-check=""><i></i>全选</span>--%>
                    <%--</div>--%>
                </div>
                <div class="table-setting">
                       <span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
                   </div>
                <div id="question_page" class="question_page " style="position: absolute"></div>
                <div id="sum_page"  style="float: right;">
                    共<span></span>条
                </div>
            </div>
            <%--考试对象列表页--%>
            <div class="dis-none test-object">
                <div class="mark-title">
                    <div class="input-group  dis-inline">
                        <label>是否合格：</label>
                        <div class="patientlist_infosel input-group" id="Conformity">
                            <p data-id="">全部<i></i></p>
                            <ul>
                                <li><a href="#" data-id="">全部</a></li>
                                <li><a href="#" data-id="0">合格</a></li>
                                <li><a href="#"  data-id="1">不合格</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="input-group dis-inline">
                        <label>评分状态：</label>
                        <div class="patientlist_infosel input-group" id="Status">
                            <p data-id="">全部<i></i></p>
                            <ul>
                                <li><a href="#" data-id="">全部</a></li>
                                <li><a href="#" data-id="0">未评分</a></li>
                                <li><a href="#" data-id="1">已评分</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="input-group dis-inline">
                        <label>是否交卷：</label>
                        <div class="patientlist_infosel input-group" id="assignment">
                            <p data-id="">全部<i></i></p>
                            <ul>
                                <li><a href="#" data-id="">全部</a></li>
                                <li><a href="#" data-id="0">未交卷</a></li>
                                <li><a href="#" data-id="1">已交卷</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="input-group dis-inline">
                        <span class="input-group-btn spanBg hover" id="Search_graded">搜索</span>
                    </div>
                    <%--<div class="input-group dis-inline" id="mark_callback">--%>
                        <%--<span class="input-group-btn spanBg1 hover">返回</span>--%>
                    <%--</div>--%>
                </div>
                <div class=" table-content">
                    <table class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%" id="table_id1">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>提交人</th>
                            <th>是否交卷</th>
                            <th>交卷时间</th>
                            <th>评分状态</th>
                            <th>分数</th>
                            <th>是否合格</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                </div>
                <div id="question_page1" class="question_page " style="position: absolute"></div>
                <div id="sum_page1"  style="float: right;">
                    共<span></span>条
                </div>
            </div>
            <%--评分详情页--%>
            <div class="details dis-none">
                <h1 class="page-title" id="page_title">培训常规考试</h1>
                <div id="details_id" class="dis-none"></div>
                <label>考试须知：</label>
                <p id="page_note"></p>
                <div class="details-page" id="Papersingle">
                    <h3>一、单选题（ <span id='singleScore'>30</span>分 ）</h3>
                    <i class="details-icons"><span class="image-icons"></span></i>
                    <div class="details_select">

                    </div>
                </div>
                <div class="details-page" id="PaperMulti">
                    <h3>二、多选题（  <span id='multScore'>30</span>分 ）</h3>
                    <i class="details-icons"><span
                            class="image-icons"></span></i>
                    <div class="details_select">

                    </div>
                </div>
                <div class="details-Points">
                    <span>选择题总得分 : </span><i id="details_score"></i>
                </div>
                <div class="details-page" id="Paperquest">
                    <h3>三、问答题（ <span id='questScore'></span>分 ）</h3>
                    <i class="details-icons"><span class="image-icons"></span></i>
                    <div class="details_select">

                    </div>
                </div>
                <div class="details-Points">
                    <span>问答题总得分 : </span><i id="total_score"></i>
                </div>
                <div class="input-group details-sub">
                    <span id="details_submit" class="input-group-btn spanBg hover">提交</span>
                    <span id="details_callback" class="input-group-btn spanBg1  hover">返回</span>
                </div>
                <div class="details-testscores">
                    <span class='username'></span>
                    <p class="details-item">考试总得分 : </p><span class="details-five" id="Scoring_details"></span>
                    <p>分</p>
                    <span class="Qualified">合格</span>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="dis-none managepage_group  details-Confirm" id="details-tips">
    <p class="existing-problems">存在未审核的问答题，确定提交吗？</p>
    <div>
        <span class="hover spanBg" id="subModel">确定</span>
        <span class="spanBg1" id="details_cancle">取消</span>
    </div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        /*试卷评分*/
        if (getchange()==1){
        $('#courses_manger_menu').addClass('leftmenu-title-down');
        $('#courses_manger_menu').siblings('.subtab').addClass('tab-down');
        $('#courses_manger_menu').siblings('.subtab').find('a').eq(2).addClass('subtab-list-active');
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/markPapers.js" charset="UTF-8"></script>

</body>
</html>



