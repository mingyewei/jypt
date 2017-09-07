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
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css"/>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript" charset="UTF-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript" charset="utf-8"></script>
    <title>人员权限管理</title>
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
                        <label>姓名：</label>
                        <input type="text" id="topic" class="input-focus" value="" placeholder="请输入姓名"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>角色：</label>
                        <input type="text" id="idCard" class="input-focus inputWidth" value="" placeholder="请输入角色名称"/>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                        <%--<span id="question_del" class="input-group-btn spanBg1 hover">删除</span>--%>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>姓名</th>
                            <th>所属机构</th>
                            <th>角色</th>
                            <th>管理对象</th>
                            <th width="50">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <%--<div class="table-setting">--%>
                        <%--<span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>--%>
                    <%--</div>--%>
                </div>
                <div id="question_page" class="question_page float-lt"></div>
                <div id="sum_page" style="float: right;">
                    共<span></span>条
                </div>
            </div>
        </div>
    </div>
</div>
<div id="ment_modal" class="dis-none">
    <div id="rolEdit_Id" class="dis-none"></div>
    <div class="rolEdit_cont">
        <div class="managepage_group">
            <label>姓名：</label>
            <input type="text" id="authority_username" class="input-focus modalInputWidth"  value="" disabled/>
        </div>
        <div class="managepage_group">
            <label>所属机构：</label>
            <input type="text" id="authority_org" class="input-focus modalInputWidth"  value="" disabled/>
        </div>
        <div class="managepage_group">
            <label>所属角色：</label>
            <input type="text" id="authority_role" class="input-focus modalInputWidth"  value="" disabled/>
        </div>
        <div class="managepage_group">
            <label>管理人员：</label>
            <input type="text" id="modalOrgName" data-id="" class="input-focus " style="width:220px; margin-right:0;" value=""
                   placeholder="请选择管理人员"/>
            <div class="downs pos-relative"><i></i></div>
            <div class="ztree_donws zTreeDemoBackground left" style="display: none; padding-top: 0px;">
                <ul id="treeDemo" class="ztree person_tree">
                </ul>
                <div class="tree_btn">
                    <span id="treeSubmit" class="hover spanBg">确认</span>
                </div>
            </div>
        </div>
            <div class="option_btn mar-top-10">
                <span id="authority_submit" class="hover spanBg">保存</span>
                <span id="authority_reset" class="spanBg1">取消</span>
            </div>
    </div>
</div>
<%--存放点击tree 获取的ID name --%>
<input id="treeData" type="hidden" data-id="" value="">
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        // 人员权限管理
        $('#person_manger_menu').addClass('leftmenu-title-down');
        $('#person_manger_menu').siblings('.subtab').addClass('tab-down');
        $('#person_manger_menu').siblings('.subtab').find('a').eq(2).addClass('subtab-list-active');
        $(':input').labelauty();
    };
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/jquery-labelauty.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/authorityMent.js" charset="UTF-8"></script>

</html>


