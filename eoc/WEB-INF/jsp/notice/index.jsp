<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="../common/include-common.jsp" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/HoneyComb.min.css"/>
    <link rel="stylesheet" type="text/css"
          href="${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css"/>
    <link rel="stylesheet" href="../resources/eduapp/css/Education.css"/>
    <script src="../resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="../resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="../resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript" charset="UTF-8"></script>
    <script src="../resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript" charset="utf-8"></script>
    <script src="../resources/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
    <title>通知管理</title>

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
                    <div id="operation-infosel" class="patientlist_infosel">
                        <p>状态<i></i></p>
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
                            <th>题目</th>
                            <th>状态</th>
                            <th>添加日期</th>
                            <th>发布日期</th>
                            <th width="50">操作</th>
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
                <div id="question_page" class="mar-top-10 float-lt">
                </div>
                <div id="sum_page">
                    共<span></span>条
                </div>
            </div>
            <div id="message_modal" class="dis-none">
                <div id="id" class="dis-none"></div>
                <!--存放编辑的信息的标识ID-->
                <div id="subForm">
                    <%--<input hidden="ture" value="" name="id" id="noticeId">--%>
                    <div class="message_cont_modal">
                        <div class="managepage_group">
                            <label>题　　目：</label>
                            <input type="text" id="modalUserName" name="title" class="input-focus modalInputWidth" value="" placeholder="请输入题目" />
                        </div>
                        <div class="managepage_group dis-inline">
                            <label>接收对象：</label>
                            <input type="text" id="modalOrgName" data-id="" class="input-focus " style="width:220px; margin-right:0;" value=""
                                   placeholder="请选择接收对象"/>
                            <div class="downs pos-relative"><i></i></div>
                            <div class="ztree_donws zTreeDemoBackground left" style="display: none; padding-top: 0px;">
                                <ul id="treeDemo" class="ztree person_tree">
                                </ul>
                                <div class="tree_btn">
                                    <span id="treeSubmit" class="hover spanBg">确认</span>
                                </div>
                            </div>
                        </div>
                        <div class="managepage_group1" id="content_editor">
                            <label style="vertical-align: top;">内　　容：</label>
                            <textarea rows="=30" cols="50" id="editor01" class="input-focus" placeholder=""
                                      name="editor01" value=''></textarea>
                            <input type="hidden" name="content" id="content">
                            <script type="text/javascript">
                                CKEDITOR.replace('editor01', {width: '852px', height: '400px'});
                            </script>
                        </div>
                        <div class="managepage_group">
                            <label>发　　布：</label>
                            <input type="text" name="statusBack" id="statusBack" value="" hidden="ture"/>
                            <input type="radio" name="course_elaborate" value="0"/>否
                            <input type="radio" name="course_elaborate" value="1"/>是
                        </div>
                        <div class="managepage_group attachments">
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
                    <input id="submitFile" type="submit" hidden="ture"/>
                </div>
                <div class="option_btn mar-top-10">
                    <span id="personn_submit" class="hover spanBg">提交</span>
                    <span id="personn_reset" class="spanBg1">取消</span>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<div id="notify" class="dis-none"></div>
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
            $("#org_notice_menu").addClass('leftmenu-title-down');
        }};
</script>
<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="../resources/eduapp/js/notify.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
