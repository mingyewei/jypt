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
    <%--<link rel="stylesheet" type="text/css" href="umeditor/themes/default/css/umeditor.css" />--%>
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
    <title>资料库管理</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>

<%--主页--%>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <%--主页内容--%>
        <div class="show_iframe" id="course_HomePage">
            <%--存放点击tree 获取的ID name --%>
            <input id="treeData" type="hidden" data-id="" name="subjectId"  value="${course.subjectId}">
            <div class="treeCont">
                <div class="zTreeDemoBackground float-lt">
                    <ul id="treeUsers" class="ztree" style="border: 1px solid #C6C6C6;overflow: auto;"></ul>
                </div>
                <div class="treebtn">
                    <a id="addParent" class="spanBg hover" href="#" title="增加父节点" onclick="return false;">增加父节点</a>
                    <a id="addLeaf" class="spanBg hover" href="#" title="增加子节点" onclick="return false;">增加子节点</a>
                    <a id="edit" class="spanBg hover" href="#" title="编辑节点" onclick="return false;">编辑节点</a>
                    <a id="remove" class="spanBg1 hover" href="#" title="删除节点" onclick="return false;">删除节点</a>
                </div>
            </div>
            <div class="questionCont" style="margin-left: 375px">
                <div class="table-top">
                    <div class="input-group dis-inline">
                        <label>题目：</label>
                        <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>类别：</label>
                    </div>
                    <div id="course_class" class="patientlist_infosel">
                        <p>全部<i></i></p>
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">视频课程</a></li>
                            <li><a href="#">文档资料</a></li>
                        </ul>
                    </div>
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
                            <th>类别</th>
                            <th>添加日期</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div class="table-setting">
                        <span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
                    </div>
                    <div id="question_page" class="question_page " style="position: absolute"></div>
                    <div id="sum_page">
                        共<span></span>条
                    </div>
                </div>
            </div>
        </div>
        <%--添加与编辑页内容--%>
        <div class="message_cont_modal  dis-none" id="course_Detailpage">
            <div class="managepage_group">
                <div id="course_id" class="dis-none"></div>
                <label>题目：</label>
                <input type="text" id="title" name="title" class="input-focus modalInputWidth"
                       placeholder="请输入题目"/>
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
                <input type="radio" name="crTypeId" value="0" checked/><a>文档资料</a>
                <input type="radio" name="crTypeId" value="1"/><a>视频课程</a>
                <input type="hidden" id="hiddenCrTypeId" data-id="${course.crCourseResource.crTypeId}"
                       name="hiddenCrTypeId" value="${course.crCourseResource.resourceName}"/>
                <input type="hidden" id="crTypeName" name="crTypeName">
            </div>
            <div id="video_div"><%--这是视频区域--%></div>
            <div class="managepage_group dis-none" id="course_introduction">
                <label style="vertical-align: top;">视频简介：</label>
                <textarea name="digest" class="input-focus" placeholder=""></textarea>
            </div>
            <div class="mode-switch " id="switchdata-content">
                <div class="mode-switch-tab">
                    <span>内容编辑模式</span><span class="mode-switch-tab-wen">文档打开模式</span>
                </div>
                <div class="managepage_group" id="">
                    <label style="vertical-align: top;">课程简介：</label>
                    <textarea name="digest" class="input-focus" placeholder=""></textarea>
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
                    <form id="uploadForm">
                        <label>附件上传：</label>
                        <input type="file" name="myfiles" id="attach_upload" value=""/>
                        <span class="fileupload" id="fileupload">浏览</span>
                        <a class="filetips" id="fileupload_tips"></a>
                    </form>
                </div>
            </div>
            <div class="option_btn mar-top-10">
                <span class="hover spanBg" id="sourse_submit">提交</span>
                <span  class="spanBg1" id="sourse_Backtrack">返回</span>
            </div>
        </div>
    </div>
</div>


<%@ include file="../common/common_footer.jsp" %>
<%--<div id="course_modal" style="width: 510px; margin-left: auto;margin-right: auto;" class="dis-none">
    <div id="course_id" class="dis-none"></div>
    <!--存放编辑的信息的标识ID-->
    <div class="message_cont_modal">
        <div class="managepage_group">
            <label>题目：</label>
            <input type="text" id="titles" class="input-focus modalInputWidth" placeholder="请输入题目"/>
        </div>
        <div class="managepage_group dis-inline">
            <label>接收对象：</label>
            <input type="text" id="modalOrgName" class="input-focus" style="width:220px; margin-right:0;" value=""
                   placeholder=""/>
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
            <input type="radio" name="type" value="0" checked/><a>文档资料</a>
            <input type="radio" name="type" value="1"/><a>视频课程</a>
        </div>
        <div class="managepage_group">
            <label>精选课程：</label>
            <input type="radio" name="recommendedLevel" value="0" checked/>否
            <input type="radio" name="recommendedLevel" value="1"/>是
        </div>
        <div class="managepage_group">
            <label style="vertical-align: top;">课程简介：</label>
            <textarea id="course_detail" class="input-focus" placeholder=""></textarea>
        </div>
        <div class="managepage_group">
            <label style="vertical-align: top;">内容：</label>
            &lt;%&ndash;<script type="text/plain" id="content" style="width:500px;height:240px;">&ndash;%&gt;
            &lt;%&ndash;</script>&ndash;%&gt;
            <textarea id="contents" class="input-focus" placeholder="" name="editor01"></textarea>
            <script type="text/javascript">
                CKEDITOR.replace('editor01');
            </script>
        </div>
        <div class="managepage_group">
            <label>发布：</label>
            <input type="radio" name="status" value="0" checked/>未发布
            <input type="radio" name="status" value="1"/>已发布
        </div>
        <div class="managepage_group">
            <label>附件一：</label>
            <input type="file" name="myfiles" id="attachments1" value=""/>
            <span class="fileupload" id="fileupload1">浏览</span>
            <a class="filetips" id="filetips1"></a>
        </div>
        <div class="managepage_group">
            <label>附件二：</label>
            <input type="file" name="myfiles" id="attachments2" value=""/>
            <span class="fileupload" id="fileupload2">浏览</span>
            <a class="filetips" id="filetips2"></a>
        </div>
        <div class="managepage_group">
            <label>附件三：</label>
            <input type="file" name="myfiles" id="attachments3" value=""/>
            <span class="fileupload" id="fileupload3">浏览</span>
            <a class="filetips" id="filetips3"></a>
        </div>

    </div>
    <div class="option_btn mar-top-10">
        <span  class="hover spanBg">提交</span>
        <span class="spanBg1">取消</span>
    </div>
</div>--%>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $("#cp").addClass('leftmenu-title-down');
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/course.js" charset="UTF-8"></script>
<script type="text/javascript">
    $(function () {
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
</body>
</html>


