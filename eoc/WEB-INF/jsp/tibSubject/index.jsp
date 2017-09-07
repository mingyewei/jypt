<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/HoneyComb.min.css" />
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css" />
    <%--<script src="../resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>--%>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript" charset="utf-8"></script>

    <title>试题类别管理</title>

</head>

<body>
<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="questionCont">
                <div class="table-top">
                    <label>名称：</label>
                    <input type="text" id="topic" class="input-focus" value="" placeholder="" />
                    <div class="input-group dis-inline">
                        <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_add" class="input-group-btn spanBg hover">添加</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_del" class="input-group-btn spanBg1 hover">删除</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>名称</th>
                            <th width="150">添加日期</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <div class="table-setting">
                        <span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
                        <!--  <span id="table-dataexport" class="table-dataexport"><i></i>导出</span>
                <span id="table-dataprint" class="table-dataprint"><i></i>打印</span>
                <span id="table-edit" class="table-edit"><i></i>编辑</span>
                <span id="table-delete" class="table-delete"><i></i>删除</span>
                <span id="table-dataallexport" class="table-dataallexport"><i></i>导出全部</span>-->
                    </div>
                </div>
                <!--
                    添加题目弹窗
                -->
                <div id="question_page" class="question_page float-lt">
                </div>
                <div id="sum_page"  style="float: right;">
                    共<span></span>条
                </div>
            </div>
        </div>
    </div>
</div>


    <div id="addQuest_modal" class="dis-none">
        <!-- 试题的唯一ID-->
        <div id="question_Id" class="dis-none"></div>
        <!--题库ID-->
        <div id="testItemBlankId" class="dis-none">11</div>
        <div class="addQuest_modal_cont">
            <div class="input-group">
                <label>名称：</label>
                <input type="text" id="operation_title" class="input-focus" style="width: 570px;" value="" placeholder="请输入名称" />
            </div>
            <div class="option_btn mar-top-10">
                            <span id="option_submit" class="hover spanBg">
                                保存
                            </span>
                            <span id="option_reset" class="spanBg1">
                                取消
                            </span>
            </div>

        </div>
    </div>
<%@ include file="../common/common_footer.jsp"%>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        /*试题类别管理*/
        if (getchange()==1){
        $('#kb').addClass('leftmenu-title-down');
        $('#kb').siblings('.subtab').addClass('tab-down');
        $('#kb').siblings('.subtab').find('a').eq(0).addClass('subtab-list-active');
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="${basePath}/resources/eduapp/js/itemCategory.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
