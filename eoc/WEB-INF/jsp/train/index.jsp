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
    <%--<script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>--%>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Form/FormComponentPresentation/data/laydate/laydate.js"
            type="text/javascript" charset="utf-8"></script>
    <title>培训管理</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="questionCont">
                <div class="table-top">
                    <div class="input-group dis-inline">
                        <label>题目：</label>
                        <input type="text" id="topic" class="input-focus" value="" placeholder="请输入内容"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>发布状态：</label>
                    </div>

                    <div id="operation-infosel" class="patientlist_infosel">
                        <p>类型<i></i></p>
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">已发布</a></li>
                            <li><a href="#">未发布</a></li>
                        </ul>
                    </div>
                    <!--下拉结束-->
                    <div class="input-group dis-inline">
                        <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                    <div class="input-group dis-inline">
                        <a href="<%=request.getContextPath()%>/train/toAdd">
                        <span id="add" class="input-group-btn spanBg hover">添加</span>
                        </a>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="del" class="input-group-btn spanBg1 hover">删除</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="status_open" class="input-group-btn spanBg hover">发布</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="status_refuse" class="input-group-btn spanBg hover">取消发布</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>题目</th>
                            <th>发布状态</th>
                            <th>添加时间</th>
                            <th width="50">操作</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <div class="table-setting">
                        <span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
                        <span id="table-dataallexport" class="table-dataallexport" data-check=""
                              style="width: 75px;right: -20px"><i></i>导出</span>
                    </div>
                </div>
                <div id="giveFeedBack_page" class="mar-top-10 float-lt">

                </div>
                <div id="sum_page" style="float: right;">
                    共<span></span>条
                </div>
            </div>

        </div>
    </div>
</div>

<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $('#items_manger_menu').addClass('leftmenu-title-down');
        $('#items_manger_menu').siblings('.subtab').addClass('tab-down');
        $('#items_manger_menu').siblings('.subtab').find('a').eq(1).addClass('subtab-list-active');
    }};
</script>
</body>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/train.js" charset="UTF-8"></script>
</html>


