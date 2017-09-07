<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/HoneyComb.min.css" />
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css" />
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js"></script>
    <title>反馈信息管理</title>
</head>
<body>
<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="questionCont">
                <div class="table-top">
                    <div class="input-group dis-inline">
                        <label>题目：</label>
                        <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目"/>
                    </div>
                    <div class="input-group dis-inline">
                        <label>状态：</label>
                    </div>
                    <div id="" class="patientlist_infosel">
                        <p id="status">状态<i></i></p>
                        <ul>
                            <li><a href="#">全部</a></li>
                            <li><a href="#">已处理</a></li>
                            <li><a href="#">未处理</a></li>
                        </ul>
                    </div>
                    <!--下拉结束-->
                    <div class="input-group dis-inline">
                        <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="status_add" class="input-group-btn spanBg hover">标记已处理</span>
                    </div>
                    <div class="input-group dis-inline">
                        <span id="status_del" class="input-group-btn spanBg1 hover">标记未处理</span>
                    </div>
                </div>
                <div class="table-content">
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>类型</th>
                            <th>内容</th>
                            <th>手机</th>
                            <th>Email</th>
                            <th>状态</th>
                            <th>反馈日期</th>
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
                <!--
                    添加题目弹窗
                -->
                <div id="giveFeedBack_page" class="float-lt mar-top-10">
                </div>
                <div id="sum_page" >
                    共<span></span>条
                </div>
            </div>
        </div>

    </div></div>
<div id="feedback_modal" class="dis-none">
    <div id="feedBackId" class="dis-none"></div>
    <!--存放编辑的信息的标识ID-->
    <div class="feedback__cont_modal">
        <input id="ids" value=""  style="display: none"/>
        <div class="managepage_group mar-top-10">
            <label style="width: 100px;">类　　型：</label>
            <div id="typeShow" class="typeShow dis-inline">投　　诉</div>
        </div>
        <div class="managepage_group mar-top-10">
            <label style="vertical-align: top; margin-bottom: 20px;width: 100px;">内　　容：</label>
            <textarea id="askConten" disabled="disabled" class="feedText dis-inline input-focus" name="" rows="50" cols="30"></textarea>
        </div>
        <div class="managepage_group mar-top-10">
            <label  style="width: 100px;">手　　机：</label>
            <div id="Tel" class="tel dis-inline"></div>
        </div>
        <div class="managepage_group mar-top-10">
            <label style="width: 100px;">E - mail：</label>
            <div id="Email" class="email  dis-inline"></div>

        </div>
        <div class="managepage_group mar-top-10">
            <label style="width: 100px;">状　　态：</label>
            <input type="radio" name="course_elaborate" value="0" />标记已处理
            <input type="radio" name="course_elaborate" value="1" />标记未处理
        </div>
        <div class="question_edit" style="text-align: center">
            <div class="input-group dis-inline">
                <span id="sign_update" class="input-group-btn spanBg hover mar-top-10">修改标记</span>
            </div>
        </div>
    </div>
</div>
<%@ include file="../common/common_footer.jsp"%>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $('#org_train_menu').addClass('leftmenu-title-down')
    }};
</script>
<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="../resources/eduapp/js/giveFeedBack.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
