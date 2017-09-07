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
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css"/>
    <%--<script src="../resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>--%>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" src="${basePath}/resources/eduapp/js/ajaxfileupload.js" charset="UTF-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript"
            charset="utf-8"></script>

    <title>题库管理</title>

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
                    <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目"/>
                   </div>
                    <div class="input-group dis-inline">
                        <label>题型：</label>
                    </div>

                    <div id="operation-infosel" class="patientlist_infosel">
                        <p>题型<i></i></p>
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">单选题</a></li>
                            <li><a href="#">不定项选择题</a></li>
                            <li><a href="#">问答题</a></li>
                        </ul>
                    </div>

                    <div class="input-group dis-inline">
                        <label>试题类别：</label>
                    </div>
                    <div id="id_testItem_type" class="patientlist_infosel" style="width: 165px">
                        <p data-value="0" style="width:150px">试题类别<i></i></p>
                        <ul style="width:165px">
                            <li><a href="#" data-value="0">全部</a></li>
                        </ul>
                    </div>

                    <!--下拉结束-->
                    <div class="input-group dis-inline">
                        <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_add" class="input-group-btn spanBg hover">添加</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_del" class="input-group-btn spanBg1 hover">删除</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_to" class="input-group-btn spanBg1 hover">试题导入</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_down" class="input-group-btn spanBg1 hover">模板导出</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>题目</th>
                            <th width="100">答案</th>
                            <th width="80">类别</th>
                            <th width="80">试题类别</th>
                            <th width="150">添加日期</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    <div class="table-setting">
                        <span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
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

<div id="question_to_modal" class=dis-none>
    <div class="managepage_group" style='text-align: center'>
        <form class="form-cp" id="uploadForm" enctype="multipart/form-data">
            <label>附件上传：</label>
            <input type="file" name="toUpload" id="attach_upload" value=""/>
            <span class="fileupload browse" id="fileupload">浏览</span>
            <span class="fileupload" id="cp_upload">上传</span>
            <a class="filetips fileupload_tips"></a>
        </form>
        <%--展示上传数据--%>
        <div class="data-display">
            <ul class="dis-none">
            </ul>
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
            <label style="width: 60px">题目：</label>
            <input type="text" id="operation_title" class="input-focus textTab" style="width: 570px;" value=""
                   placeholder="请输入题目"/>
        </div>
        <div class="input-group dis-inline mar-top-10">
            <label style="width: 60px">题型：</label>
            <div id="operation-infosel-modal" class="operation_infosel border">
                <p>题型<i></i></p>
                <ul class="border textTab" id="operation-infosel-modal-check">
                    <li><a href="#">单选题</a></li>
                    <li><a href="#">不定项选择题</a></li>
                    <li><a href="#">问答题</a></li>
                </ul>
            </div>
        </div>
        <div class="input-group dis-inline mar-top-10">
            <label>试题类别：</label>
            <div id="id_testItem_type-modal" class="operation_infosel border" style="width: 165px">
                <p id="id_testItem_type_id" data-value="0" style="width: 150px"><i></i></p>
                <ul class="border textTab" style="width: 165px;max-height: 150px;overflow-x: hidden;">
                </ul>
            </div>
        </div>
        <div class="input-group dis-inline mar-top-10 float-rt mar-rig-20 dis-none" id="correct_response">
            <label>正确答案</label>
        </div>
        <div class='option-textarea dis-none '>
            <div class="input-group"><label style="width: 60px">参考答案:</label><textarea id="input-group-textarea" class="textTab"></textarea></div>
        </div>
        <div class="option mar-top-10">
        </div>
        <div class="add_option dis-inline">
            增加选项
        </div>
        <div class="option_btn mar-top-10">
            <span id="option_submit" class="hover spanBg">
                提交
            </span>
            <span id="option_reset" class="spanBg1">
                重置
            </span>
        </div>
    </div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        /*题库管理*/
        if (getchange()==1){
        $('#kb').addClass('leftmenu-title-down');
        $('#kb').siblings('.subtab').addClass('tab-down');
        $('#kb').siblings('.subtab').find('a').eq(1).addClass('subtab-list-active');
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="${basePath}/resources/eduapp/js/questionBank.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
