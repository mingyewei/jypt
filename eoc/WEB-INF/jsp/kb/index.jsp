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
    <script src="${basePath}/resources/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
    <script type="text/javascript" src="${basePath}/resources/ckplayer/ckplayer.js" charset="utf-8"></script>
    <title>文库管理</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <%--存放点击tree 获取的ID name --%>
            <input id="treeData" type="hidden" data-id="" value="">
            <input id="libraryData" type="hidden" data-id="" value="">
            <div class="treeCont">
                <div class="zTreeDemoBackground float-lt" style="padding-top: 0">
                    <ul id="treeUsers" class="ztree" style="border: 1px solid #C6C6C6;box-sizing: border-box; overflow: auto;"></ul>
                </div>
            </div>
            <div class="libraryTreeCont" style="float: right">
                <div class="zTreeDemoBackground float-lt" style="padding-top: 0">
                    <ul id="librarytreeUsers" class="ztree" style="border: 1px solid #C6C6C6;box-sizing: border-box; overflow: auto;"></ul>
                </div>
                <div class="treebtn float-rt">
                    <a id="addParent" class="spanBg hover" href="#" title="增加父节点" onclick="return false;">增加父节点</a>
                    <a id="addLeaf" class="spanBg hover" href="#" title="增加子节点" onclick="return false;">增加子节点</a>
                    <a id="edit" class="spanBg hover" href="#" title="编辑节点" onclick="return false;">编辑节点</a>
                    <a id="remove" class="spanBg1 hover" href="#" title="删除节点" onclick="return false;">删除节点</a>
                </div>
            </div>
            <div class="questionCont" style="margin-left: 260px;margin-right: 450px">
                <div class="table-top">
                    <div class="input-group dis-inline">
                        <label>题目：</label>
                        <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目"/>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_add" class="input-group-btn spanBg hover">添加</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>题目</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div id="question_page" class="question_page " style="position: absolute"></div>
                    <div id="sum_page1"  style="float: right;">
                        共<span></span>条
                    </div>
                </div>
                <div class="table-top" style="margin-top: 50px">
                    <div class="input-group dis-inline">
                        <label>题目：</label>
                        <input type="text" id="library-topic" class="input-focus" value="" placeholder="请输入题目"/>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="library-question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_del" class="input-group-btn spanBg1 hover">删除</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="library-table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0"
                           width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>题目</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <%-- <div class="table-setting">
                         <span id="librarytable-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
                     </div>--%>
                    <div id="libraryquestion_page" class="question_page " style="position: absolute"></div>
                    <div id="sum_page">
                        共<span></span>条
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<div id="course_modal" class="dis-none" style="z-index:99">
    <div class="course_cont">
        <h1 id="title"></h1>
    </div>
    <div class="digest">
        <p>摘要：</p>
        <span class="digest_title"></span>

    </div>
    <div class="course_cont_title">

    </div>
    <div class="file_down">
        <p class="file-dowm-title">附件下载<p/>
        <a href="" class="file-dowm-name"></a>
    </div>
    <div class="coures_video mar-top-10" style="display: none;" >
        <div id='flvVideo'></div>
    </div>
</div>
<div id="equa_modal" class="dis-none">
    <div class="equa_cont">
        <ul>
        </ul>
        <div class="hint  mar-top-10">请确定是否变更节点？</div>
        <div class="option_btn mar-top-10">
            <span id="equa_yes" class="hover spanBg">是</span>
            <span id="equa_no" class="hover spanBg1">否</span>
        </div>
        <div class="hint  mar-top-10">提示:</br>
            &nbsp;&nbsp;&nbsp;是:解绑原文库节点，绑定新的文库节点下。</br>
            &nbsp;&nbsp;&nbsp;否:保持原节点不变。
        </div>
    </div>
</div>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
            if (getchange()==1){
            $('#cp').addClass('leftmenu-title-down');
            $('#cp').siblings('.subtab').addClass('tab-down');
            $('#cp').siblings('.subtab').find('a').eq(1).addClass('subtab-list-active');
        }}

    };
</script>
</body>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/kbcourseTreeData.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/kbLibraryTreeData.js" charset="UTF-8"></script>
</html>


