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
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css"/>
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css" />
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/js/ajaxfileupload.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <title>addTrain</title>
</head>

<body>
<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
    <div class="content">
        <div id="iframe-box" class="iframe-box">
        <!-- 存放标示ID -->
            <div class="message_cont_modal">
            <form action="" method="post" id="addTrainForm" enctype="multipart/form-data">
                <input type="hidden" id="Train_id" name="id" value="${id}">
                <input type="hidden" id="exam" name="exam" value="">
                <div class="managepage_group">
                    <label>题目：</label>
                    <input type="text" id="title" name="name" class="input-focus modalInputWidth" placeholder="请输入题目" />
                </div>
                <div class="dis-inline" style="margin-top: 15px">
                    <label class="float-lt">课程课件：</label>
                    <div class="zTreeDemoBackground float-lt" style="padding-top: 0">
                        <ul id="courseTree" class="ztree" style="border: 1px solid #C6C6C6;overflow: auto;"></ul>
                    </div>
                    <div class=" float-lt">

                        <div class="managepage_group" style="margin-top: 0">
                            <span id="addTrain_add" class="spanBg hover">添加</span>
                            <span id="addTrain_del" class="spanBg hover">删除</span>
                        </div>
                        <div class="managepage_group table-content" id="table_Train" style="display: none;">
                            <input type="hidden" id="courseIds" name="courseIds" value="" />
                            <table id="table_id" class="table-bordered dis-inline" cellpadding="0" cellspacing="0" border="0">
                                <thead>
                                <tr>
                                    <th width="50">选择</th>
                                    <th style="display: none;"></th>
                                    <th width="180">名称</th>
                                    <th width="50">操作</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="managepage_group">
                    <label>缩略图：</label>
                    <input type="file" name="showImg" id="fileimg" value=""/>
                    <span class="spanBg hover" id="fileimgupload">选择图片</span>
                </div>
                <div class="managepage_group">
                    <img id="imgupload" src="" title="" style="display:none"/>
                </div>
                <div class="managepage_group">
                    <label style="vertical-align: top;">课程简介：</label>
                    <textarea id="digest" name="digest" class="input-focus" placeholder=""></textarea>
                </div>
                <div class="managepage_group">
                    <label>考试：</label>
                    <input id="exam_ok" type="radio" name="hasExam" value="1" />是
                    <input id="exam_no" type="radio" name="hasExam" value="0" checked="true" />否
                </div>
                <div id="composetest_type" class="dis-none">
                    <div class="managepage_group">
                        <label>及格分数：</label>
                        <input type="text" id="passScore" name="" class="input-focus" placeholder="请输入及格分数" />
                    </div>
                    <div class="managepage_group ">
                        <label>组卷类型：</label>
                        <input id="manual_radio" type="radio" name="createPaperMode" value="0" />手动组卷
                        <input id="auto_radio" type="radio" name="createPaperMode" value="1" />自动组卷
                    </div>
                </div>
            <div class="managepage_group">
                <span class="spanBg hover" id="submitsave">保存</span>
                <span class="spanBg1 hover" id="returnback" onclick="returnbackFun()">返回</span>
            </div>
            </form>
        </div>
        </div>
    </div>
<!-- 自动组卷开始弹窗 -->
<div id="auto-exam" style="display: none">

    <div class="managepage_group" id="autocompose">
        <div class="managepage_group">
            <label>考试名称：</label>
            <input id="auto_title" type="text" name="" class="input-focus" value="" placeholder="请输入考试名称！" />
        </div>
        <div class="managepage_group">
            <label style="vertical-align: top;">考试说明：</label>
            <textarea id="auto_digest" style="height:40px" name="" class="input-focus" placeholder=""></textarea>
        </div>
        <!-- 手动组卷数据 隐藏域 开始卷ID  -->
        <div class="test_result">
            <div class="dis-inline" style="position: relative; z-index: 5;">
                <div class="managepage_group dis-inline">
                    <label>题型类型：</label>
                </div>
                <div id="qusstion-types" class="patientlist_infosel">
                    <p data-value="" style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px;padding:0 0 0 5px;">单选<i></i></p>
                    <ul style="border: 1px solid #CCCCCC; width: 107px;">
                        <li>
                            <a href="#" data-value="">单选</a>
                        </li>
                        <li>
                            <a href="#" data-value="">多选</a>
                        </li>
                    </ul>
                </div>
                <div class="managepage_group dis-inline">
                    <label>类别：</label>
                </div>
                <div id="post-infosel-item" class="patientlist_infosel">
                    <p style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px;padding:0 0 0 5px;">类别<i></i></p>
                    <ul style="border: 1px solid #CCCCCC; width: 107px;">
                        <li>
                            <a href="#" data-value="0">全部</a>
                        </li>

                    </ul>
                </div>
                <span><input type="text" class="input-focus" id="multinum2" value=""/>题</span>
                <span style="width: 142px">每题分值：<input type="text" class="input-focus" id="singletest2" value=""/></span>
                <span>总分：<b id="singlescore2">0</b></span>
                <span id="add_questions" class="spanBg hover">增加</span>
            </div>
            <div id="questions_cont" style="position: relative; z-index: 1;margin-top: 10px;">
            </div>
            <div class="managepage_group dis-inline">
                <label>总计</label>
                <input type="text" id="summation" value="" disabled="true" style="width:80px;" />分
            </div>

        </div>
        <div class="test_btn">
            <div class="managepage_group">
                <span id="autoSubmit" class="spanBg hover">确定</span>
            </div>
        </div>
    </div>
    <!-- 自动组卷end -->
</div>
    <!-- 添加课件弹窗 -->
<div id="addTrain_Modal" style="display: none;">
        <div class="addTrain_Modal_cont">
            <div class="input-group dis-inline">
                <label style="padding: 0"></label>
                <input type="text" id="Train_title" class="input-focus" style="width:620px;" value="" placeholder="请输入课件关键字" />
            </div>
            <div class="input-group dis-inline">
                <span id="question_search_btn" class="input-group-btn spanBg hover">搜索</span>
            </div>
            <div class="addTrain_item">
                <ul>
                    <%--<li data_id='20'>
                        <span>javascript</span>
                        <span class="addTrain_radio"><input type="checkbox" name="status" value="0" /></span>
                    </li>--%>
                </ul>
            </div>
            <div class="managepage_group adTrain_btn">
                <span id="addTrain_Btn" class="spanBg hover">确定</span>
                <span id="addTrain_no" class="spanBg1 hover">取消</span>
            </div>
        </div>
    </div>
    <!-- 手动组卷弹窗 -->
<div class="compose_test" id="manualcompose">
        <div class="addTrain-top">
            <div class="managepage_group dis-inline">
                <label>题目：</label>
                <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目" />
            </div>
            <div class="managepage_group dis-inline">
                <label>题型：</label>
            </div>
            <div id="post-infosel" class="patientlist_infosel">
                <p style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px">全部<i></i></p>
                <ul style="border: 1px solid #CCCCCC;">
                    <li>
                        <a href="#">全部</a>
                    </li>
                    <li>
                        <a href="#">单选</a>
                    </li>
                    <li>
                        <a href="#">多选</a>
                    </li>
                </ul>
            </div>
            <!--下拉结束-->
            <div class="managepage_group dis-inline">
                <label>岗位类别：</label>
            </div>
            <div id="jopz-infosel" class="patientlist_infosel">
                <p data-value='' style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px">岗位类型<i></i></p>
                <ul style="border: 1px solid #CCCCCC;">
                   <li>
                        <a href="#" data-value="0">全部</a>
                    </li>

                </ul>
            </div>
            <div class="managepage_group dis-inline">
                <span id="operation_search_btn" class="input-group-btn spanBg hover">搜索</span>
            </div>
            <div class="managepage_group">
                <label>考试题目：</label>
                <input type="text" id="manual_title" class="input-focus" value="" placeholder="请输入考试题目" />
            </div>
            <div class="managepage_group">
                <label style="vertical-align: top;">考试说明：</label>
                <textarea id="manual_digest" style="height:40px" name="digest" class="input-focus" placeholder=""></textarea>
            </div>
        </div>
        <div class="test_content">
            <div class="half_content float-lt" id="unselected_test">
                <p>待选</p>
                <ul>
                </ul>
            </div>
            <div class="half_content float-rt" id="selected_test">
                <p>已选</p>
                <ul></ul>
            </div>
        </div>
        <div class="test_result">
            <p>
                <span>已选：<b id="totalnum"></b> 题</span>
                <span>单选题：<b id="singlenum"></b> 题</span>
                <span style="width: 110px">每题<input type="text" id="singletest" />分</span>
                <span>多选题：<b id="multinum"></b> 题</span>
                <span style="width: 110px">每题<input type="text" id="multitest" />分</span>
                <span>共 <b id="totalscore"></b> 分</span>
            </p>
        </div>
        <div class="test_btn">
            <div class="managepage_group">
                <span id="manualSubmit" class="spanBg hover">确定</span>
            </div>
        </div>
    </div>
<%@ include file="../common/common_footer.jsp"%>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $("#courses_manger_menu").addClass('leftmenu-title-down');
        var error_msg="${error_msg}";
        if(error_msg){
            layer.msg(error_msg);
        }
        }
    };
</script>
    <script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
    <script type="text/javascript" src="${basePath}/resources/eduapp/js/editCourseCollection.js" charset="UTF-8"></script>
</body>
<script type="text/javascript">
    $(function(){

    });
</script>
</html>
