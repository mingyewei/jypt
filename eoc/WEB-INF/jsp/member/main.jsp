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
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js"></script>
    <title>组织机构管理</title>
</head>

<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="treeCont">
                <div class="zTreeDemoBackground float-lt">
                    <ul id="treeUsers" class="ztree" style="border: 1px solid #C6C6C6;box-sizing: border-box;overflow: auto;"></ul>
                </div>
                <div class="treebtn">
                    <a id="addParent" class="spanBg hover" href="#" title="增加父节点" onclick="return false;">增加父节点</a>
                    <a id="addLeaf"  class="spanBg hover" href="#" title="增加子节点" onclick="return false;">增加子节点</a>
                    <a id="edit"  class="spanBg hover" href="#" title="编辑节点" onclick="return false;">编辑节点</a>
                    <a id="remove"  class="spanBg1 hover" href="#" title="删除节点" onclick="return false;">删除节点</a>
                </div>
            </div>
            <div class="personneCont" style="margin-left: 375px">
                <div class="table-top">
                    <div class="input-group dis-inline">
                        <label>姓名：</label>
                        <input type="text" id="username" class="input-focus inputWidth" value="" placeholder="请输入姓名"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>证件号：</label>
                        <input type="text" id="idCard" class="input-focus inputWidth" value="" placeholder="请输入证件号"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>手机：</label>
                        <input type="text" id="mobilePhone" class="input-focus inputWidth" value=""
                               placeholder="请输入手机"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>邮箱：</label>
                        <input type="text" id="email" class="input-focus inputWidth" value="" placeholder="请输入邮箱"/>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="personn_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="personn_add" class="input-group-btn spanBg hover">添加</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="personn_del" class="input-group-btn spanBg1 hover">删除</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>姓名</th>
                            <th>证件号</th>
                            <th>性别</th>
                            <th>所属机构</th>
                            <th>年龄</th>
                            <th>手机</th>
                            <th>邮箱</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <div class="table-setting">
                        <span id="table-dataallcheck" class="table-dataallcheck" data-check=""><i></i>全选</span>
                    </div>
                </div>
                <div id="question_page" class="question_page" style="margin-top: 10px;position: absolute">

                </div>
                <div id="sum_page">
                    共<span></span>条
                </div>
            </div>
        </div>
    </div>
</div>
<%--存放点击tree 获取的ID name --%>
<input id="treeData" type="hidden" data-id="" value="">
<%@ include file="../common/common_footer.jsp" %>


<!--表格编辑弹窗口-->
<div id="personn_modal" class="dis-none">
    <div id="personid" class="dis-none"></div>
    <!--存放编辑的信息的标识ID-->
    <div class="personne_cont_modal">
        <div class="managepage_group">
            <input type="hidden" value="" id="roleId"/>
            <div id="operation-infosel" class="patientlist_infosel">
            </div>
        </div>

        <div id="role" class="managepage_group">
            <label id="roleTip">所属角色：</label>
            <%--<label  class="specialLable">学员</label>--%>
            <%--<input type="checkbox" checked>--%>
        </div>
        <div class="managepage_group">
            <label>姓名：</label>
            <input type="text" id="modalUserName" class="input-focus modalInputWidth" value="" placeholder="请输入姓名"/>
        </div>
        <div class="managepage_group">
            <label>性别 ：</label>
            <label class="labelWidth">男:</label>
            <input id="man" type="radio" name="op" checked="checked" value=""/>
            <label class="labelWidth">女:</label>
            <input id="wom" type="radio" name="op" value=""/>
        </div>
        <div class="managepage_group">
            <label>身份证：</label>
            <input type="text" id="modalIdCard" class="input-focus modalInputWidth" value="" placeholder="请输入身份证号"/>
        </div>
        <div class="managepage_group">
            <label>年龄：</label>
            <input type="text" id="modalAge" class="input-focus modalInputWidth" value="" placeholder="请输入年龄"/>
        </div>
        <div class="managepage_group">
            <label>手机：</label>
            <input type="text" id="modalMobilePhone" class="input-focus modalInputWidth" value="" placeholder="请输入手机"/>
        </div>
        <div class="managepage_group">
            <label>邮箱：</label>
            <input type="text" id="modalEmail" class="input-focus modalInputWidth" value="" placeholder="请输入邮箱"/>
        </div>
        <div class="managepage_group ">
            <label>所属机构：</label>
            <input type="text" id="modalOrgName" data-id="" class="input-focus" style="width:220px; margin-right:0;" value=""
                   placeholder="请选择机构"/>
            <div class="downs pos-relative"><i></i></div>
            <div class="ztree_donws zTreeDemoBackground left" style="display: none; padding-top: 0px;">
                <ul id="treeDemo" class="ztree person_tree">

                </ul>
                <div class="tree_btn">
                    <span id="treeSubmit" class="hover spanBg">确认</span>
                </div>
            </div>
        </div>
    </div>
    <div class="option_btn mar-top-10" style="margin-bottom: 10px">
        <span id="personn_submit" class="hover spanBg">提交</span>
        <span id="personn_reset" class="spanBg1">取消</span>
    </div>
</div>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        /*组织机构管理sidebar*/
        if (getchange()==1){
        $('#person_manger_menu').addClass('leftmenu-title-down');
        $('#person_manger_menu').siblings('.subtab').addClass('tab-down');
        $('#person_manger_menu').siblings('.subtab').find('a').eq(0).addClass('subtab-list-active');
    }};
</script>
<script src="${basePath}/resources/eduapp/js/treeData.js" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/resources/eduapp/js/personneManage.js" type="text/javascript" charset="utf-8"></script>
<script src="${basePath}/resources/eduapp/js/common.js" type="text/javascript" charset="utf-8"></script>
</body>

</html>
