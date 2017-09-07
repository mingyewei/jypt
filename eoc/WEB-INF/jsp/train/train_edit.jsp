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
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Form/FormComponentPresentation/data/laydate/laydate.js" type="text/javascript" charset="utf-8"></script>
    <%--<script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>--%>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript" charset="UTF-8"></script>

    <title>培训管理编辑</title>
    <script type="text/javascript">
        $(function () {
            //是否显示(type="radio")
            var isShow = "${exam.createPaperMode}";
            $("input[name='composetest_status']").each(function () {
                if ($(this).val() == isShow) {
                    $(this).attr("checked", "checked");
                }
            });
        })
    </script>
    <style type="text/css">
        .test_result span select {
            width: 90px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            margin: 0 8px;
            padding: 0;
            border: 1px solid #CCCCCC;
        }

        .test_result span {
            margin-right: 20px;
        }
    </style>
</head>
<body>
<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
<div class="content">
    <div id="iframe-box" class="iframe-box">

        <div class="show_iframe">
            <input id="studentGroup" type='hidden' name='studentGroup' value="" >
            <input id="exams" type='hidden' name='exams' value="" >

            <div class="managepage">
                <div class="managepage_group">
                    <input type="hidden" id="Train_id" name="id" value="${trainId}">
                    <input type="hidden" id="examPaperId" name="examPaperId" value="">
                    <label>培训题目：</label>
                    <input type="text" id="title" name="name" class=" input-focus" placeholder="请输入题目" value=""/>
                </div>
                <div class="managepage_group">
                    <label style="vertical-align: top;">培训简介：</label>
                    <textarea id="digest" name="digest" class="input-focus" placeholder=""></textarea>
                    <%--<textarea id="course_detail" class="input-focus" placeholder=""></textarea>--%>
                </div>
                <div class="managepage_group">
                    <label>考试：</label>
                    <input type="radio" id="exam_ok" name="hasExam" value="1"/>是
                    <input type="radio" id="exam_no" name="hasExam" value="0" checked/>否
                    <span class="spanBg hover" id="composetest_examadd" style="display:none">添加</span>
                    <span id="addTrain_del" class="spanBg1 hover" style="display: none">删除</span>
                </div>
                <!-- 考试添加成功后，表格数据会显示 -->
                <div class="managepage_group" id="examListTable" style="display:none">
                    <label></label>
                    <table id="addTrain_id" class="table-bordered dis-inline" cellpadding="0" cellspacing="0" border="0"
                           width="330px">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th width="180">名称</th>
                            <th width="100">操作</th>
                        </tr>
                        </thead>
                        <tbody id="toby">
                        </tbody>
                    </table>
                </div>
                <!-- span标签模拟input[file]事件选择缩略图 -->
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
                    <label>信息组：</label>
                    <span class="spanBg hvoer" id="infogroup_add">添加</span>
                    <span class="spanBg1 hvoer" id="infogroup_edit" style="display: none">编辑</span>
                    <span class="spanBg1 hvoer" id="infogroup_del" style="display: none">删除</span>
                </div>
                <!-- 信息组数据添加后展示内容 -->
                <div class="managepage_group" style="margin-left:70px;">
                    <!-- 组名展示 -->
                    <div class="infogroup_tab" id="infogroup_tab">
                    </div>
                    <!-- 组内具体信息 -->
                    <div class="infogroup_tab_content">
                        <!-- 组具体信息的选项卡 -->
                        <div class="infogroup_tabs" id="infogroup_tabs">
                            <span class="spanBg hover">组成员</span>
                            <span class="spanBg hover">课程</span>
                            <span class="spanBg hover">选择考试</span>
                        </div>
                        <div class="infogroup_tabs_content" id="infogroup_tabs_content" style="display: none">
                            <div class="infogroup_tabs_detail" style="display:block">
                                <!-- 组成员编辑页 -->
                                <div class="learn_object" id="learn_object" style="display:inline-block">
                                    <div class="treeInfoCont">
                                        <span class="spanBg hover" id="treeEdit">编辑</span>
                                    </div>
                                    <div class="userInfoCont" style="margin-bottom: 10px">
                                        <label>组成员：</label>
                                        <div class="userInfoContList dis-inline">

                                        </div>
                                    </div>
                                    <!-- 树插件具体展示 -->
                                    <div class="managepage_tree">
                                        <div class="zTreeDemoBackground">
                                            <ul id="treeDemo" class="trainZtree ztree"></ul>
                                        </div>
                                        <div class="treeUserInfo"><!--显示选中后的成员-->

                                        </div>
                                        <div class="managepage_group" style="margin-top: 0px; margin-bottom: 10px">
                                            <span class="spanBg hover" id="treeSubmit">保存</span>
                                        </div>
                                    </div>


                                </div>
                                <!-- 组成员确认页 -->

                            </div>
                            <div class="infogroup_tabs_detail" style="display:none">
                                <div class="coursfoCont dis-none">
                                    <span class="spanBg hover" id="courseEdit">编辑</span>
                                </div>
                                <!-- 组课程确认页 -->
                                <div class="course_ok">
                                    <div class="managepage_group">
                                        <label>已选课程：</label>
                                        <div class="course_ok_select">
                                            <ul>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <!-- 组课程编辑页 -->
                                <div class="infogroup_tabs_detail_cont">
                                    <div class="managepage_group">
                                        <label>课程：</label>
                                        <input id="infogroup_val" type="text"  class="input-focus" placeholder="请输入课程" value=""/>
                                        <span id="infogroup_tabs_detail_search_btn" class="input-group-btn spanBg hover">搜索</span>
                                        <div class="test_content">
                                            <div class="half_content float-lt" id="course_unselected_test">
                                                <p>是否关联考试</p>
                                                <ul>

                                                </ul>
                                            </div>
                                            <div class="half_content float-rt" id="course_selected_test">
                                                <p>已选课程</p>
                                                <ul></ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="infogroup_tabs_detail_btn_cont">
                                        <span id="course_ok" class="spanBg hover">确定</span>
                                    </div>
                                </div>


                            </div>
                            <div class="infogroup_tabs_detail" style="display:none">

                                <!-- 组考试时间确认页 -->
                                <div class="examTimeEdit dis-none">
                                    <span class="spanBg hover" id="examTimeEdit">编辑</span>
                                </div>
                                <div class="examTimeContItem dis-none">
                                    <ul id="examTimeConfirm">

                                    </ul>
                                </div>
                                <!-- 组考试时间编辑页 -->
                                <div class="examTimeCont">
                                    <ul id="examTimeList">
                                    </ul>
                                    <span class="spanBg hover" id="examTimeList_save">保存</span>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="managepage_group">
                    <label>发布状态：</label>
                    <input type="radio" name="publishStatus" value="1"/>是
                    <input type="radio" name="publishStatus"  checked="true" value="0"/>否
                </div>
                <div class="managepage_group">
                    <span class="spanBg hover" id="submitsave">保存</span>
                    <span class="spanBg1 hover" id="returnback">返回</span>
                </div>
            </div>
        </div>


       </div>
    </div>
</div>

<div class="managepage_group" id="infogroup_div" style="display:none;margin:15px;">
    <div id="information_group">
    <div class="managepage_group">
        <label>组名称：</label>
        <input type="text" id="infogroup_title" class=" input-focus" placeholder="请输入题目" value=""/>
    </div>
    <div class="managepage_group">
        <label style="vertical-align:top">组描述：</label>
        <textarea id="infogroup_describe" style="border:1px solid #c6c6c6"></textarea>
    </div>
    <div class="managepage_group">
        <label>培训时间：</label>
        <input type="text" id="infogroup_start" class="input-focus" placeholder="请输入开始时间" value=""/>
        <label style="text-align: center;">至</label>
        <input type="text" id="infogroup_stop" class="input-focus" placeholder="请输入结束时间" value=""/>
    </div>
    <div class="managepage_group" style="text-align: center">
        <span class="spanBg hover" id="infogroup_div_save">确定</span>
        <span class="spanBg1 hover" id="infogroup_div_returnback">取消</span>
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
                            <p style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px;padding:0 0 0 5px;">
                                单选<i></i></p>
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
                        <p style="border: 1px solid #CCCCCC; height: 36px; line-height: 36px;padding:0 0 0 5px;">
                            类别<i></i></p>
                        <ul style="border: 1px solid #CCCCCC; width: 107px;">
                        </ul>
                    </div>
                </div>
                <span><input type="text" class="input-focus" id="multinum2" value="" style="height: 40px"/>题</span>
                <span style="width: 132px">每题分值：<input type="text" class="input-focus" style="height: 40px"
                        id="singletest2" value=""/></span>
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
<div id="examsID" style="display: none;"></div>
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $('#items_manger_menu').addClass('leftmenu-title-down');
        $('#items_manger_menu').siblings('.subtab').addClass('tab-down');
        $('#items_manger_menu').siblings('.subtab').find('a').eq(1).addClass('subtab-list-active');
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/peixunguanli_edit.js" charset="UTF-8"></script>
</body>
</html>


