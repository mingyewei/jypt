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
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css"/>
    <link rel="stylesheet" type="text/css"
          href="${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css"/>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript"
            charset="utf-8"></script>
    <title>员工分享审核</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content dis-none">
    <div class="iframe-box">
        <div class="show_iframe">
            <div class="questionCont">
                <div class="table-top">
                    <div class="input-group dis-inline">
                        <label>资料名称：</label>
                        <input id="resource_name" type="text" class="input-focus" value="" placeholder="请输入关键字"/>
                    </div>
                    <div class=" dis-inline">
                        <label>资料类别：</label>
                        <div class="patientlist_infosel dis-inline">
                            <p>全部<i></i></p>
                            <ul>
                                <li><a href="#">全部</a></li>
                                <li><a href="#">视频资料</a></li>
                                <li><a href="#">文档资料</a></li>
                                <li><a href="#">其他资料</a></li>
                                <li><a href="#">学习资料</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="input-group dis-inline">
                        <span class="input-group-btn spanBg hover" id="shareAudit_search">查询</span>
                    </div>
                </div>
                <div class="question_edit">
                    <div class="input-group dis-inline">
                        <span id="shareAudit_remove" class="input-group-btn spanBg1 hover">删除</span>
                    </div>
                    <%--这是在table中的编辑--%>
                    <div class="input-group dis-inline">
                        <span id="shareAudit_edit" class="input-group-btn spanBg hover">编辑</span>
                    </div>
                </div>

                <div class="table-content">
                    <table class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>资料名称</th>
                            <th>资料类别</th>
                            <th>提交人</th>
                            <th>提交日期</th>
                            <th>审核状态</th>
                            <th>审核日期</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div class="table-setting">
                        <span class="table-dataallcheck" data-check=""><i></i>全选</span>
                    </div>
                </div>
                <div class="question_page float-lt">
                </div>
                <div id="sum_page" style="float: right;">
                    共<span></span>条
                </div>
            </div>
        </div>
    </div>
</div>


<%--员工分享审核详情页--%>
<div class="content">
    <div class="iframe-box">
        <div class="show_iframe">
            <div class="ShareAuditEdit-details">
                <div class="managepage_group">
                    <label>资料名称：</label>
                    <input type="text" name="title" class="input-focus" value=""
                           placeholder="请输入题目"/>
                </div>
                <div class="managepage_group">
                    <label>资料类别：</label>
                   <%-- <input type="radio" checked id="ShareAuditEdit_doc"/>--%><a>文档资料</a>
                   <%-- <input type="radio" id="ShareAuditEdit_video"/>--%><a class="dis-none">视频课程</a>
                </div>
                <div class="managepage_group">
                    <label>资料简介：</label>
                    <textarea rows="30" cols="50" readonly="readonly"></textarea>
                </div>
                <div class="managepage_group">
                    <label>资料描述：</label>
                    <textarea rows="30" cols="50" readonly="readonly"></textarea>
                </div>
                <div class="managepage_group " id="attachment_uploading">
                    <label>附件：</label>
                    <a class="Download-attachment" id="Download_attachment" href="#">海虹医保相关培训.txt</a>
                </div>
                <div class="managepage_group dis-none" id="ShareAuditEdit_movie">
                    <%--视频--%>
                    <%--<video src="miaomiao.mp4" controls="controls" >您的浏览器不支持video标签。</video>--%>
                <%--<object width="550" height="400" type="application/x-shockwave-flash" data="swf/fp9.swf" id="test2" style="visibility: visible;">--%>
                    <%--<param name="movie" value="swf/fp9.swf" />--%>
                    <%--<param name="allowScriptAccess" value="always" />--%>
                    <%--<param name="wmode" value="transparent" />--%>
                    <%--<param name="allowFullscreen" value="true" />--%>
                    <%--<param name="quality" value="high" />--%>
                    <%--<param name="flashvars" value="text=这是flashvars传入的数据啊" />--%>
                <%--</object>--%>
                </div>
                <div class="managepage_group configuation-audit">
                    <label>审核状态：</label>
                    <input type="radio" value="0" id="configuation_audit_pass"/><a>通过</a>
                    <input type="radio" value="1" checked id="configuation_audit_no"/><a>未通过</a>
                    <input type="hidden">
                    <div class="configuation-not-pass" id="configuation_not_pass">
                        <textarea name="" id="" cols="30" rows="50" readonly="readonly"></textarea>
                    </div>
                </div>
                <div class="managepage_group">
                    <label class="Uploading-files">上传资料库:</label>
                    <input type="radio" value="0"  id="Uploading_files_yes"/><a>是</a>
                    <input type="radio" value="1" checked id="Uploading_files_no"/><a>否</a>
                </div>
                <div class="managepage_group" id="ShareAudit_Select_mode">
                    <label>选择模式：</label>
                    <div class="patientlist_infosel dis-inline">
                        <p>内容模式<i></i></p>
                        <ul>
                            <li id="ShareAudit_Library_mode"><a href="#">文库模式</a></li>
                            <li><a href="#">内容模式</a></li>
                        </ul>
                    </div>
                    <a class="illegal-model dis-none" id="illegal_model">附件存在非法模式</a>
                </div>
                <div class="managepage_group ShareAuditEdit-submit">
                    <span id="personn_submit" class="hover spanBg">提交</span>
                    <span id="personn_reset" class="spanBg1">返回</span>
                </div>
            </div>
        </div>
    </div>
</div>

<input id="treeData" type="hidden" data-id="" value="">
<div id="Info_doc_tree" class='dis-none'>
    <div class="treeCont">
        <div class="shareTree" style="padding-top: 0">
            <ul id="shareTree" class="ztree" style="border: 1px solid #C6C6C6;overflow: auto;"></ul>
        </div>
    </div>
    <div class="option_btn mar-top-10" style="margin-bottom: 10px">
        <span id="Library_information_sure" class="hover spanBg">确定</span>
        <span id="Library_information_cancel" class="spanBg1">取消</span>
    </div>

</div>
    <%@ include file="../common/common_footer.jsp" %>
    <script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${basePath}/resources/eduapp/js/shareAudit.js" charset="UTF-8"></script>
    <script type="text/javascript">
        $(function () {
            $("#share_audit").addClass('leftmenu-title-down');
        });
    </script>
</body>
</html>



