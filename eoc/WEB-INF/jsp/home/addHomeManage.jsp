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
          href="../resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css"/>
    <link rel="stylesheet" href="../resources/eduapp/css/Education.css"/>
    <script src="../resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="../resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="../resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="../resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <script src="../resources/eduapp/js/ajaxfileupload.js" type="text/javascript" charset="UTF-8"></script>
    <script src="../resources/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
    <title>首页信息管理</title>
</head>

<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div id="message_modal" style="margin-left: 20px">
            <input id="homeId" value=""/>
            <%--<div id="id" class="dis-none"></div>--%>
            <!--存放编辑的信息的标识ID-->
            <%--<form id="subForm" action="<%=request.getContextPath()%>/HomeManager/uploadFile" method="post" enctype="multipart/form-data">--%>
            <form id="subForm" action="<%=request.getContextPath()%>/HomeManager/addHomeResource" method="POST"
                  enctype="multipart/form-data">
                <div class="message_cont_modal">
                    <div class="managepage_group">
                        <label>题目：</label>

                        <input type="text" id="modalUserName" name="title" class="input-focus modalInputWidth" value=""
                               placeholder="请输入题目"/>
                    </div>
                    <div class="managepage_group dis-inline">
                        <label style="line-height: 35px;">栏目：</label>
                        <div id="operation-infosel-modal" class="operation_infosel border" style="margin: 0 8px;">
                            <!-- cs修改，添加了一个input隐藏域，给a赋予data-id参数，存储每一个文字的id -->
                            <input type="hidden" name="hiddenId" id="hiddenId" value="">
                            <%--<input type="text" name="name" id="name" value="1" hidden="ture"/>--%>
                            <p>热点新闻<i></i></p>
                            <ul class="border">
                                <li><a href="#" data-id="0">热点新闻</a></li>
                                <li><a href="#" data-id="1">培训公告报道</a></li>
                                <li><a href="#" data-id="2">轮播图</a></li>
                            </ul>
                        </div>
                    </div>
                    <div id="hotNew">
                        <div class="managepage_group">
                            <label>发布：</label>
                            <input id="status_radio" type="text" name="status" value="" hidden="ture"/>
                            <input type="radio" name="course_elaborate" value="0" checked/>否
                            <input type="radio" name="course_elaborate" value="1"/>是
                        </div>
                        <div class="managepage_group1">
                            <label style="vertical-align: top;">内容：</label>
                            <textarea rows="30" cols="50" name="editor01">请输入.</textarea>
                            <script type='text/javascript'>CKEDITOR.replace('editor01', {
                                height: '360px',
                                width: '852px'
                            });</script>
                        </div>
                        <div class="managepage_group" id="picImg">
                            <label style="vertical-align: top;">上传图片：</label>
                            <input type="file" name="image" id="fileimg1" value=""/>
                            <span class="fileupload" id="fileimgupload1">选择图片</span>
                            <div class="managepage_group">
                                <img id="imgupload1" src="" title="" style="display:none"/>
                            </div>
                        </div>
                        <div class="managepage_group" id="addContent">
                            <label>附件一：</label>
                            <input type="file" name="attachments" id="attachments1" value=""/>
                            <span class="fileupload" id="fileupload1">浏览</span>
                            <a class="filetips" id="filetips1"></a>

                        </div>

                        <input id="submitFile" type="submit" hidden="ture"/>
                    </div>
                    <div class="managepage_group1" id="pic" style="display:none">
                        <label style="vertical-align: top;">上传图片：</label>
                        <input type="file" name="image" id="fileimg" value="" style="display: none"/>
                        <span class="fileupload" id="fileimgupload"
                              style="width: 100px; display:inline-block;background-color: #00C1B3;line-height: 35px;text-align: center;color: #FFFFFF">选择图片</span>
                        <div class="managepage_group">
                            <img id="imgupload" src="" title="" style="display:none"/>
                        </div>
                        <div class="managepage_group">
                            <label style="line-height:16px">外部链接：</label>
                            <input id="linkStatus" type="text" name="linkStatus" value="" hidden="ture"/>
                            <input type="radio" name="externalLink" value="0" checked/>是
                            <input type="radio" name="externalLink" value="1"/>否
                        </div>
                        <div class="managepage_group1" id="linkCkediter" style="display: none">
                            <label style="vertical-align: top;">内容：</label>
                            <textarea rows="30" cols="50" name="editor03">请输入.</textarea>
                            <script type='text/javascript'>CKEDITOR.replace('editor03', {
                                height: '360px',
                                width: '852px'
                            });</script>
                        </div>
                        <div class="managepage_group" id="imgContent">
                            <div class="managepage_group">
                                <label style="vertical-align: top;">链接地址：</label>
                                <input type="text" id="links" name="linkUrl" class="input-focus modalInputWidth"
                                       placeholder="请输入链接地址"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="option_btn mar-top-10" style="margin-left: 0px;margin-right: 0px">
            <span id="personn_submit" class="hover spanBg">提交</span>
            <span id="personn_reset" class="spanBg1">取消</span>
        </div>
    </div>
</div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="../resources/eduapp/js/message.js" type="text/javascript" charset="utf-8"></script>
</body>

</html>