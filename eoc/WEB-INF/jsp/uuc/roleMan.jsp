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
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript" charset="utf-8"></script>
    <title>角色管理</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="questionCont">
                <div class="table-top">
                    <label>题目：</label>
                    <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目"/>
                    <div class="input-group dis-inline">
                        <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                </div>
                <div class="question_edit">
                    <div class="input-group dis-inline">
                        <span id="question_add" class="input-group-btn spanBg hover">添加</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_del" class="input-group-btn spanBg1 hover">删除</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_edit" class="input-group-btn spanBg1 hover">配置</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="question_check" class="input-group-btn spanBg1 hover">查看人员</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                            <tr>
                                <th width="50">选择</th>
                                <th style="display: none;"></th>
                                <th>角色名称</th>
                                <th>功能权限</th>
                                <th>添加日期</th>
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
                <div id="role_page" class="question_page float-lt">
                </div>
                <div id="sum_page" style="float: right;">
                    共<span></span>条
                </div>
            </div>
        </div>
    </div>
</div>

<%--这是编辑与添加调用的模态框--%>
<div id="rolEdit_modal" class="dis-none">
    <div id="rolEdit_Id" class="dis-none"></div>
    <div class="rolEdit_modal_cont">
        <div class="input-group">
            <label>角色名称：</label>
            <input type="text" id="role_title" class="input-focus"  value="" placeholder="请输入角色名称"/>
        </div>
        <div class="input-group dis-inline">
            <label>功能配置：</label>
        </div>
        <div class="role_list dis-inline">
            <ul class="dowebok" id="dowbok_add">
                <li><input type="checkbox" name="checkbox" data-id="" >人员权限管理</li>
                <li><input type="checkbox" name="checkbox" data-id="">培训管理</li>
                <li><input type="checkbox" name="checkbox" data-id="">通知管理</li>
                <li><input type="checkbox" name="checkbox" data-id="">首页内容管理</li>
                <li><input type="checkbox" name="checkbox" data-id="">反馈信息管理</li>
                <li><input type="checkbox" name="checkbox" data-id="">员工分享审核</li>
            </ul>
        </div>
        <div class="footBtn">
            <div class="option_btn mar-top-10">
                <span id="role_submit" class="hover spanBg">保存</span>
                <span id="option_reset" class="spanBg1">取消</span>
            </div>
        </div>

    </div>
</div>
<div id="rolLook_check" class="dis-none">
    <%--查看人员弹窗--%>
    <div class="rolLook_modal_cont">
        <label>人员姓名：</label>
        <input type="text" id="user_check_name" class="input-focus" value="" placeholder="请输入相关信息"/>
        <div class="input-group dis-inline">
            <span id="rolLook_search" class="input-group-btn spanBg hover">查询</span>
        </div>
    </div>
    <div class="rolLook-content-check  table-content">
        <table  class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
            <thead>
            <tr>
                <th width="100">人员姓名</th>
                <th width="50">性别</th>
                <th width="150">身份证</th>
                <th width="75">手机</th>
                <th width="75">邮箱</th>
                <th width="100">所属机构</th>
            </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/roleMan.js" charset="UTF-8"></script>
<script type="text/javascript">
    $(function () {
        $("#role-Man").addClass('leftmenu-title-down');
    });


</script>
</html>


