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
        <div class="show_iframe" style="margin-left: 20px;margin-bottom: 40px">
            <form id="formId" action="${ctx}/course/update.do" method="post" enctype="multipart/form-data">
                <div id="course_modal">
                    <%--<div id="course_modal" style="width: 510px; margin-left: auto;margin-right: auto;" class="dis-none">--%>
                    <input type="hidden" id="id" name="id" value="${course.id}">
                    <!--存放编辑的信息的标识ID-->
                    <div class="message_cont_modal">
                        <div class="managepage_group">
                            <label>题目：</label>
                            <input type="text" id="title" name="title" class="input-focus modalInputWidth"
                                   placeholder="请输入题目" value="${course.title}"/>
                        </div>
                        <div class="managepage_group dis-inline">
                            <label>资料库：</label>
                            <input id="subjectId" name="subjectId" type="hidden" value="${course.subjectId}">
                            <input type="text" id="modalOrgName" class="input-focus"
                                   style="width:220px; margin-right:0;" value=""
                                   placeholder=""/>
                            <!-- 存放选取人的id-->
                            <input type="hidden" id="targetUserIds" name="targetUserIds"
                                   value="${course.crCourseResource.targetUserIds}">
                            <div class="downs pos-relative"><i></i></div>
                            <div class="zTreeDemoBackground left" style="display: none; padding-top: 0px;">
                                <ul id="treeDemo" class="ztree" style="width: 238px;margin-left: 72px">
                                </ul>
                                <div class="tree_btn">
                                    <span id="treeSubmit" class="spanBg">确认</span>
                                </div>
                            </div>
                        </div>
                        <div class="managepage_group">
                            <label>课程类别：</label>
                            <input id="File_manager" class="vioed" type="radio" name="crTypeId" value="0" <c:out
                                    value="${course.crCourseResource.crTypeId==0?\"checked\":\"\"}"/> /><a>文档资料</a>
                            <input id="video_course" class="vioed" type="radio" name="crTypeId" value="1" <c:out
                                    value="${course.crCourseResource.crTypeId==1?\"checked\":\"\"}"/>/><a>视频课程</a>
                            <input type="hidden" id="hiddenCrTypeId" data-id="${course.crCourseResource.crTypeId}"
                                   name="hiddenCrTypeId" value="${course.crCourseResource.resourceName}"/>
                        </div>
                        <div id="video_div">
                        </div>
                        <div class="mode-switch" id="mode_switch_update">
                            <div class="mode-switch-tab" id="mode_switch_tab">
                                <span id="mode_switch_update_doc">文档打开模式</span>
                                <span class="mode-switch-tab-wen" id="mode_switch_update_content">内容编辑模式</span>
                            </div>
                            <div>
                                <label style="vertical-align: top;">课程简介：</label>
                                <textarea id="digest" name="digest" class="input-focus"
                                          placeholder="">${course.crCourseResource.digest}</textarea>
                                <div class="managepage_group1 dis-none" id="managepage_group1_content">
                                    <label style="vertical-align: top;">内容：</label>
                                     <textarea id="editor01" class="input-focus" placeholder=""
                                          name="editor01"
                                          style="width: 475px;height: 100px;">${course.crCourseResource.content}</textarea>
                                    <input type="hidden" name="content" id="content" value="">
                                    <script type="text/javascript">
                                        CKEDITOR.replace('editor01', {width: '852px', height: '400px'});
                                    </script>
                                </div>
                                <div class="managepage_group">
                                    <label>附件上传：</label>
                                    <input value="" id="fileId1" style="display: none"/>
                                    <input type="file" name="myfiles" id="attachments1" value=""/>
                                    <span class="fileupload" id="fileupload1">浏览</span>
                                    <a class="filetips"
                                       id="filetips1">${course.crCourseResourceAttachments[0].fileName}</a>
                                </div>
                            </div>
                        </div>
                       <div class="dis-none video-course-intro" id="video_course_intro">
                           <label style="vertical-align: top;">课程简介：</label>
                                <textarea name="digest" class="input-focus"
                                          placeholder="">${course.crCourseResource.digest}</textarea>
                       </div>
                        <div class="option_btn mar-top-10" style="margin-right: 0;margin-left: 0;padding-bottom: 20px">
                            <span id="personn_submit" class="hover spanBg">提交</span>
                            <span id="personn_reset" class="spanBg1">取消</span>
                        </div>
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
<script type="text/javascript" src="${basePath}/resources/eduapp/js/course_update.js" charset="UTF-8"></script>
</body>
<script type="text/javascript">

    $(function () {
        $("#course_manger_menu").addClass('leftmenu-title-down');
        var val = $("#hiddenCrTypeId").val();
        var videoHtml = '<div class="managepage_group">' +
                '<label>上传视频：</label>' +
                '<input type="file" name="videoFile" id="videoFile" value=""/>' +
                '<span class="fileupload" id="videofileupload">浏览</span>' +
                '<a class="filetips" id="videofiletips"></a>' +
                '<input id="crTypeName" name="crTypeName" value="' + val + '">'
        '</div>';


        var checkedType = $("#hiddenCrTypeId").attr("data-id");
        if (checkedType == 1) {
            $("#video_div").html(videoHtml);
            $("#videofileupload").on("click", function () {
                $("#videoFile").click();
                getUploadFileFun("#videoFile", "#videofiletips")
            });
            function getUploadFileFun(obj, obj2) {
                $(obj).on("change", function () {
                    var fileList = this.files[0];
                    if (fileList == undefined) {
                        $(obj2).text("");
                    } else {
                        $("#crTypeName").val("");
                        $(obj2).text(fileList.name);
                    }
                });
            }
        } else {
            $("#video_div").empty();
        }

        $("input[name='crTypeId']").on("click", function () {
            var checkFlag = $(this).prop("checked");
            if (checkFlag) {
                var value = $(this).val();
                if (value == 1) {
                    $("#video_div").html(videoHtml);
                    //上传视频
                    $("#videofileupload").on("click", function () {
                        $("#videoFile").click();
                        getUploadFileFun("#videoFile", "#videofiletips")
                    });
                    function getUploadFileFun(obj, obj2) {
                        $(obj).on("change", function () {
                            var fileList = this.files[0];
                            if (fileList == undefined) {
                                $(obj2).text("");
                            } else {
                                $("#crTypeName").val("");
                                $(obj2).text(fileList.name);
                            }
                        });
                    }
                } else {
                    $("#video_div").empty();
                }
            }
        });
    });
</script>
</html>


