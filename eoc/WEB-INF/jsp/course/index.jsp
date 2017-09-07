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
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript"
            charset="utf-8"></script>
    <title>课程管理</title>
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
                    <!--下拉结束-->
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
                    <table id="table_id" class="table-id table-bordered" cellpadding="0" cellspacing="0" border="0"
                           width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>题目</th>
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
                <div id="question_page" class="question_page " style="position: absolute"></div>
                <div id="sum_page" style="float: right;">
                    共<span></span>条
                </div>
            </div>
            <div class="message_cont_modal dis-none">
                    <input type="hidden" id="Train_id" name="id" value="${id}">
                    <input type="hidden" id="exam" name="exam" value="">
                    <div class="managepage_group">
                        <label>题　　目：</label>
                        <input type="text" id="title" name="name" class="input-focus modalInputWidth"
                               placeholder="请输入题目"/>
                    </div>
                    <div class="dis-inline" style="margin-top: 15px">
                        <label class="float-lt">课程课件：</label>
                        <div class="zTreeDemoBackground float-lt courseware" style="padding-top: 0">
                            <ul id="courseTree" class="ztree" style="border: 1px solid #C6C6C6;overflow: auto;">

                            </ul>
                        </div>
                        <div class=" float-lt">
                            <div class="managepage_group" style="margin-top: 0">
                                <span id="addTrain_add" class="spanBg hover">添加</span>
                                <span id="addTrain_del" class="spanBg hover">删除</span>
                            </div>
                            <div class="managepage_group table-content" id="table_Train" style="display: none;">
                                <input type="hidden" id="courseIds" name="courseIds" value=""/>
                                <table id="table_courseId" class="table-id table-bordered dis-inline" cellpadding="0"
                                        cellspacing="0" border="0">
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
                    <div class="managepage_group" id="pic">
                        <form class="form-cp" id="imgloadForm" enctype="multipart/form-data">
                            <label class="fileupload">缩 略 图：</label>
                            <input type="file" name="toUpload" id="fileimg" value="" style="display: none"/>
                            <span class="fileupload" id="fileimgupload"
                                  style="width: 100px; display:inline-block;background-color: #00C1B3;line-height: 35px;text-align: center;color: #FFFFFF">浏览</span>
                            <span class="fileupload" id="img_upload">上传</span>
                        </form>
                        <div class="img-view">
                            <img id="imgupload" class="img_up dis-inline" src="" title="" style="display:none"/>
                            <a href="#" class="image_close" style="display:none"></a>
                        </div>
                    </div>
                    <div class="managepage_group">
                        <label style="vertical-align: top;">课程简介：</label>
                        <textarea id="digest" name="digest" class="input-focus" placeholder=""></textarea>
                    </div>
                    <div class="managepage_group">
                        <label>考　　试：</label>
                        <input id="exam_ok" type="radio" name="hasExam" value="1"/>是
                        <input id="exam_no" type="radio" name="hasExam" value="0" checked="true"/>否
                    </div>
                    <div class="managepage_group">
                        <label>及格分数：</label>
                        <input type="text" id="passScore" name="" class="input-focus" placeholder="请输入及格分数"/>
                    </div>
                    <div class="managepage_group">
                        <span class="spanBg hover" id="submitsave">保存</span>
                        <span class="spanBg1 hover" id="returnback">返回</span>
                    </div>
            </div>
        </div>
    </div>
</div>
<div id="exam_id" class="exam_id"></div>
<%@ include file="../common/common_footer.jsp" %>
<!-- 添加课件弹窗 -->
<!-- 添加课件弹窗 -->
<div id="addTrain_Modal" style="display: none;">
    <div class="addTrain_Modal_cont">
        <div class="input-group dis-inline">
            <label style="padding: 0"></label>
            <input type="text" id="Train_title" class="input-focus" style="width:626px;" value="" placeholder="请输入课件关键字" />
        </div>
        <div class="input-group dis-inline">
            <span id="question_ser" class="input-group-btn spanBg hover">搜索</span>
        </div>
        <div class="addTrain_item">
            <ul>
            </ul>
        </div>
        <div class="managepage_group adTrain_btn">
            <span id="addTrain_Btn" class="spanBg hover">确定</span>
            <span id="addTrain_no" class="spanBg1 hover">取消</span>
        </div>
    </div>
</div>
<!-- 添加考试的弹出框 -->
<div class="managepage_group" id="infogroup_exam" style="display:none;margin:15px;">
    <div class="managepage_group">
        <label>试卷名称：</label>
        <input type="text" id="infogroup_exam_title" class=" input-focus" placeholder="请输入题目" value=""/>
        <label>及格分数：</label>
        <input type="text" id="infogroup_exam_passCount" class=" input-focus" placeholder="请输入及格分数" value=""/>
        <label>考试说明：</label>
        <input type="text" id="examDescribe" class="input-focus" value="" placeholder="请输入考试说明"/>
    </div>
    <div class="managepage_group">
        <label>试卷类型：</label>
        <input id="manual_radio" type="radio" name="composetest_examtest" value="0"/>手动组卷
        <input id="auto_radio" type="radio" name="composetest_examtest" value="1"/>自动组卷
    </div>
    <div class="managepage_group" style="border:1px solid #c6c6c6">
        <div class="compose_test" id="manualcompose">
            <div class="table-top">
                <div class="input-group dis-inline">
                    <label>题目：</label>
                    <input type="text" class="input-focus" id="input_focus" value="" placeholder="请输入题目"/>
                </div>
                <div class="input-group dis-inline">
                    <label>题型：</label>
                </div>
                <div class="patientlist_infosel" id="infosel_type">
                    <p style="border: 1px solid #CCCCCC;">全部<i></i></p>
                    <ul style="border: 1px solid #CCCCCC;">
                        <li><a href="#">全部</a></li>
                        <li><a href="#">单选</a></li>
                        <li><a href="#">多选</a></li>
                        <li><a href="#">问答</a></li>
                    </ul>
                </div>
                <!--下拉结束-->
                <div class="input-group dis-inline">
                    <label>岗位类别：</label>
                </div>
                <!--岗位级别 -->
                <div id="id_job_type" class="patientlist_infosel">
                    <p data-value="0" style="border: 1px solid #CCCCCC;">全部<i></i></p>
                    <ul style="border: 1px solid #CCCCCC;">
                        <li><a data-value="0" href="#">全部</a></li>
                    </ul>
                </div>
                <div class="input-group dis-inline">
                    <span id="operation_search_btn" class="input-group-btn spanBg hover">搜索</span>
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
                    <span style="width: 120px">每题<input type="text" id="singletest"/>分</span>
                    <span>多选题：<b id="multinum"></b> 题</span>
                    <span style="width: 120px">每题<input type="text" id="multitest"/>分</span>
                    <span>问答题：<b id="questnum"></b> 题</span>
                    <span style="width: 120px">每题<input type="text" id="questtest"/>分</span>
                    <span>共 <b id="totalscore"></b> 分</span>
                </p>
            </div>
        </div>
        <!-- 自动组卷开始 -->
        <div class="managepage_group dis-none" id="autocompose">
            <div class="test_result ">
                <div class="dis-inline" style="position: relative; z-index: 5;">
                    <div class="managepage_group dis-inline">
                        <label>题型类型：</label>
                        <div id="qusstion-types" class="patientlist_infosel" style="vertical-align: middle">
                            <p style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px;padding:0 0 0 5px;">单选<i></i></p>
                            <ul style="border: 1px solid #CCCCCC; width: 107px;">
                                <li>
                                    <a href="#">单选</a>
                                </li>
                                <li>
                                    <a href="#">多选</a>
                                </li>
                                <li>
                                    <a href="#">问答</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="managepage_group dis-inline">
                    <label>类别：</label>
                    <div id="auto_post-infosel-item" class="patientlist_infosel" style="vertical-align: middle">
                        <p style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px;padding:0 0 0 5px;">类别<i></i></p>
                        <ul style="border: 1px solid #CCCCCC; width: 107px;">
                        </ul>
                    </div>
                </div>
                <span><input type="text" class="input-focus" id="multinum2" value="" style="height: 40px"/>题</span>
                <span style="width: 132px">每题分值：<input type="text" class="input-focus" style="height: 40px" id="singletest2" value=""/></span>
                <span>总分：<b id="singlescore_auto">0</b></span>
                <span id="add_questions" class="managepage_group_btn">增加</span>
            </div>
            <div id="questions_cont" style="position: relative; z-index: 1;margin-top: 10px;">
            </div>
            <div class="managepage_group dis-inline">
                <label>总计</label>
                <input type="text" id="summation" value="" disabled="true" style="width:50px;font-weight: bold"/>分
            </div>
        </div>
        <!-- 自动组卷end -->
    </div>
    <div class="managepage_group" style="text-align: center">
        <span class="spanBg hover" id="infogroup_exam_save">确定</span>
        <span class="spanBg1 hover" id="return_exam">取消</span>
    </div>

</div>
</body>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        //        课程管理
        if (getchange()==1){
        $('#items_manger_menu').addClass('leftmenu-title-down');
        $('#items_manger_menu').siblings('.subtab').addClass('tab-down');
        $('#items_manger_menu').siblings('.subtab').find('a').eq(0).addClass('subtab-list-active');
        var error_msg = "${error_msg}";
        if (error_msg) {
            layer.msg(error_msg);
        }
        $("#question_search_btn").click();
    }
    };
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="${basePath}/resources/eduapp/js/courseCollection.js" type="text/javascript" charset="utf-8"></script>
</html>