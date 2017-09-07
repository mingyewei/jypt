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
        <div class="show_iframe " id="course_HomePage">
            <%--存放点击tree 获取的ID name --%>
            <input id="treeData" type="hidden" data-id="" name="subjectId"  value="${course.subjectId}">
            <div class="treeCont">
                <div class="zTreeDemoBackground float-lt">
                    <ul id="treeUsers" class="ztree" style="border: 1px solid #C6C6C6; box-sizing: border-box;overflow: auto;"></ul>
                </div>
                <div class="treebtn">
                    <a id="addParent" class="spanBg hover" href="javascript:void(0)" title="增加父节点" >增加父节点</a>
                    <a id="addLeaf" class="spanBg hover" href="javascript:void(0)"title="增加子节点" >增加子节点</a>
                    <a id="edit" class="spanBg hover" href="javascript:void(0)" title="编辑节点">编辑节点</a>
                    <a id="remove" class="spanBg1 hover" href="javascript:void(0)"title="删除节点">删除节点</a>
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
        <div class="message_cont_modal dis-none" id="course_Detailpage">
            <div class="managepage_group">
                <div id="course_id" class="dis-none"></div>
                <label>题　　目：</label>
                <input type="text" id="title" name="title" class="input-focus modalInputWidth"
                       placeholder="请输入题目"/>
            </div>
            <div class="managepage_group dis-inline">
                <label>资 料 库：</label>
                <input id="subjectId" name="subjectId" type="hidden" value="${course.subjectId}">
                <input type="text" id="modalOrgName" class="input-focus"
                       style="width:220px; margin-right:0;" value=""
                       placeholder=""/>
                <!-- 存放选取人的id-->
                <input type="hidden" id="targetUserIds" name="targetUserIds"
                       value="${course.crCourseResource.targetUserIds}">
                <div class="downs pos-relative"><i></i></div>
                <div class="zTreeDemoBackground1 left" style="display: none; padding-top: 0px;">
                    <ul id="treeDemo" class="ztree" style="width: 238px;margin-left: 72px">
                    </ul>
                    <div class="tree_btn">
                        <span id="treeSubmit" class="spanBg">确认</span>
                    </div>
                </div>
            </div>
            <div class="managepage_group">
                <label>课程类别：</label>
                <input id='textClik' type="radio" name="crTypeId" value="0" checked/><a>文档资料</a>
                <input id='voleClik' type="radio" name="crTypeId" value="1"/><a>视频课程</a>
                <input type="hidden" id="hiddenCrTypeId" data-id="${course.crCourseResource.crTypeId}"
                       name="hiddenCrTypeId" value="${course.crCourseResource.resourceName}"/>
                <input type="hidden" id="crTypeName" name="crTypeName">
            </div>
            <div id="video_div" class="dis-none">
                <%--这是视频区域--%>
                    <div class="managepage_group">
                        <form class="form-cp" id="upload_video" enctype="multipart/form-data">
                            <label>上传视频：</label>
                            <input type="file" name="toUpload" value=""/>
                            <span class="fileupload browse" >浏览</span>
                            <span class="fileupload" id="cpvideo_upload" >上传</span>
                            <a class="filetips fileupload_tips"></a>
                            <input type="reset" name="reset" style="display: none;"/>
                        </form>
                        <%--<progress max="1000" value="0" id="progress"></progress>--%>
                        <div class="data-display">
                            <ul style="display: none">
                            </ul>
                        </div>

                    </div>
            </div>
            <div class="managepage_group dis-none" id="course_introduction">
                <label style="vertical-align: top;">视频简介：</label>
                <textarea name="digest" class="input-focus" placeholder=""></textarea>
            </div>
            <div class="mode-switch " id="switchdata-content">
                <div class="mode-switch-tab">
                    <span id="content_writer">内容模式</span><span class="mode-switch-tab-wen modeDocx">文档模式</span>
                </div>
                <div class="managepage_group" id="">
                    <label style="vertical-align: top;">课程简介：</label>
                    <textarea name="digest" class="input-focus" placeholder=""></textarea>
                </div>
                <div class="managepage_group1">
                    <label style="vertical-align: top;">内　　容：</label>
                    <textarea rows="=30" cols="50" id="editor01" class="input-focus" placeholder=""
                                      name="editor01" value=''></textarea>
                    <input type="hidden" name="content" id="content">
                    <script type="text/javascript">
                        CKEDITOR.replace('editor01', {width: '852px', height: '400px'});
                    </script>
                </div>
                <div class="managepage_group">
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
            <div class="option_btn mar-top-10">
                <span class="hover spanBg" id="sourse_submit">提交</span>
                <span  class="spanBg1" id="sourse_Backtrack">返回</span>
            </div>
        </div>
    </div>
</div>

<div id="subid" class="dis-none"></div>
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $('#cp').addClass('leftmenu-title-down');
        $('#cp').siblings('.subtab').addClass('tab-down');
        $('#cp').siblings('.subtab').find('a').eq(0).addClass('subtab-list-active');
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/cp.js" charset="UTF-8"></script>
</body>
</html>


