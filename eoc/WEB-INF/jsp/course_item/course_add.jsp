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
    <script type="text/javascript" src="${basePath}/resources/eduapp/js/jquery.form.js"></script>
    <title>资料库管理</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content dis-none">
    <div id="iframe-box" class="iframe-box">
        <div id="course_modal" style="margin-left: 20px;margin-bottom: 40px">
            <form id="formId" action="${ctx}/course/add.do" method="post" enctype="multipart/form-data">
                <div id="course_id" class="dis-none"></div>
                <!--存放编辑的信息的标识ID-->
                <div class="message_cont_modal">
                    <div class="managepage_group">
                        <label>题目：</label>
                        <input type="text" id="title" name="title" class="input-focus modalInputWidth"
                               placeholder="请输入题目"/>
                    </div>
                    <div class="managepage_group dis-inline">
                        <label>资料库</label>
                        <input id="subjectId" name="subjectId" type="hidden" value="">
                        <input type="text" id="modalOrgName" class="input-focus" style="width:220px; margin-right:0;"
                               value=""
                               placeholder=""/>
                        <!-- 存放选取人的id-->
                        <input type="hidden" id="targetUserIds" name="targetUserIds">
                        <div class="downs pos-relative"><i></i></div>
                        <div class="zTreeDemoBackground left" style="display: none; padding-top: 0px;">
                            <ul id="treeDemo" class="ztree person_tree">
                            </ul>
                            <div class="tree_btn">
                                <span id="treeSubmit" class="spanBg">确认</span>
                            </div>
                        </div>
                    </div>
                    <div class="managepage_group">
                        <label>课程类别：</label>
                        <input type="radio" name="crTypeId" value="0" checked/><a>文档资料</a>
                        <input type="radio" name="crTypeId" value="1"/><a>视频课程</a>
                        <input type="hidden" id="crTypeName" name="crTypeName">
                    </div>
                    <div id="video_div"></div>

                    <%--====1切换文档资料文档模式展示--%>
                    <div class="mode-switch " id="mode-switch-data-content">
                        <div class="mode-switch-tab">
                            <span>文档打开模式</span><span id="mode_switch_data_modal"
                                                     class="mode-switch-tab-wen">内容编辑模式</span>
                        </div>
                        <div class="managepage_group">
                            <label style="vertical-align: top;">课程简介：</label>
                            <textarea name="digest" class="input-focus" placeholder=""></textarea>
                        </div>
                        <div class="managepage_group">
                            <form id= "uploadForm">
                            <label>附件上传：</label>
                            <input type="file" name="myfiles" id="attachments4" value=""/>
                            <span class="fileupload" id="fileupload4">浏览</span>
                            <a class="filetips" id="filetips4"></a>
                            <span class="fileupload" onclick="doUpload()" />上传</pan>
                            <input type="hidden" name='' value='' >
                            </form>
                        </div>
                    </div>

                    <%--====2切换文档资料内容模式展示--%>
                    <div class="mode-switch dis-none" id="mode-switch-doc-content">
                        <div class="mode-switch-tab">
                            <span id="mode_switch_doc_modal"
                                  class="mode-switch-tab-wen">文档打开模式</span><span>内容编辑模式</span>
                        </div>
                        <div class="managepage_group">
                            <label style="vertical-align: top;">课程简介：</label>
                            <textarea id="digest" name="digest" class="input-focus" placeholder=""></textarea>
                        </div>
                        <div class="managepage_group1">
                            <label style="vertical-align: top;">内容：</label>
                            <textarea rows="=30" cols="50" id="editor01" class="input-focus" placeholder=""
                                      name="editor01"></textarea>
                            <input type="hidden" name="content" id="content">
                            <script type="text/javascript">
                                CKEDITOR.replace('editor01', {width: '852px', height: '400px'});
                            </script>
                        </div>
                        <div class="managepage_group">
                            <label>附件上传：</label>
                            <input type="file" name="myfiles" id="attachments1" value=""/>
                            <span class="fileupload" id="fileupload1">浏览</span>
                            <a class="filetips" id="filetips1"></a>
                        </div>
                    </div>
                    <%--====3切换视频课程展示--%>
                    <div class="managepage_group dis-none" id="video-show-introduction">
                        <label style="vertical-align: top;">课程简介：</label>
                        <textarea name="digest" class="input-focus" placeholder=""></textarea>
                    </div>
                </div>
                <div class="option_btn mar-top-10" style="margin-left: 0;margin-right: 0">
                    <span id="personn_submit" class="hover spanBg">提交</span>
                    <span id="personn_reset" class="spanBg1">取消</span>
                </div>
            </form>
        </div>
    </div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $("#cp").addClass('leftmenu-title-down');
        $(':input').labelauty();
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/course_add.js" charset="UTF-8"></script>

</body>
</html>


