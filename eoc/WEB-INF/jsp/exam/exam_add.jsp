<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ include file="../common/include-common.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/HoneyComb.min.css" />
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/srcipt/jstree/css/zTreeStyle/zTreeStyle.css" />
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css" />
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Form/FormComponentPresentation/data/laydate/laydate.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js" type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript" charset="UTF-8"></script>
    <title>考试添加</title>
    <script type="text/javascript">
        $(function(){
            //是否显示(type="radio")
            var isShow = "${exam.createPaperMode}";
            $("input[name='composetest_status']").each(function(){
                if($(this).val() ==isShow ){
                    $(this).attr("checked","checked");
                }
            });
        })
    </script>
</head>
<body>
<%@ include file="../common/common_header.jsp"%>
<%@ include file="../common/common_menu.jsp"%>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="managepage">
                <div class="managepage_group">
                    <input type="hidden" id="exam_id" name="exam_id" value="${exam.id}">
                    <input type="hidden" id="examPaperId" name="examPaperId" value="${exam.examPaperId}">
                    <label>题目：</label>
                    <input type="text" id="title" class=" input-focus" placeholder="请输入题目" value="${exam.name}"/>
                </div>
                <div class="managepage_group">
                    <label>考试对象：</label>
                    <input type="text" id="targetUserIds" class="input-focus" value="已选择${fn:length(exam.targetUserIds)}人" placeholder="" />
                </div>
                <div class="managepage_group">
                    <label>考试时间：</label>
                    <input type="text" id="examination_start" class="input-focus" placeholder="请输入考试开始时间" />
                    <label style="text-align: center;">至</label>
                    <input type="text" id="examination_stop" class="input-focus" placeholder="请输入考试结束时间" />
                </div>
                <div class="managepage_group">
                    <label style="vertical-align: top;">考试须知：</label>
                    <textarea id="note" class="input-focus" placeholder="">${exam.note}</textarea>
                </div>
                <div class="managepage_group">
                    <label>添加试卷：</label>
                    <input type="radio" name="composetest_status" value="0" />手动组卷
                    <input type="radio" name="composetest_status" value="1" />自动组卷
                </div>
                <div class="managepage_group dis-none" id="autocompose">
                    <!-- 手动组卷数据 隐藏域 开始卷ID  -->
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
                            <input type="text" id="summation" value="" disabled="true" style="width:80px;" />分
                        </div>
                    </div>
                <div class="managepage_group">
                    <label>及格分数：</label>
                    <input type="text" id="passCount" class="input-focus" value="" placeholder="" />
                </div>
                <div class="managepage_group">
                    <span class="spanBg hover" id="submitsave">保存</span>
                    <span class="spanBg1 hover" id="returnback" onclick="returnbackFun()">返回</span>

                </div>
            </div>
        </div>
        </div>
    </div>
</div>
<%@ include file="../common/common_footer.jsp"%>
<div class="compose_test" id="manualcompose">
    <div class="table-top">
        <label>题目：</label>
        <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目" />
        <div class="input-group dis-inline">
            <label>题型：</label>
        </div>
        <div id="operation-infosel" class="patientlist_infosel">
            <p style="border: 1px solid #CCCCCC;">全部<i></i></p>
            <ul style="border: 1px solid #CCCCCC;">
                <li><a href="#">全部</a></li>
                <li><a href="#">单选</a></li>
                <li><a href="#">多选</a></li>
            </ul>
        </div>
        <!--下拉结束-->
        <div class="input-group dis-inline">
            <label>试题类别：</label>
        </div>
        <!--岗位级别 -->
        <div id="id_job_type" class="patientlist_infosel">
            <p data-value="0" style="border: 1px solid #CCCCCC;">全部<i></i></p>
            <ul style="border: 1px solid #CCCCCC;">
                <li><a data-value="0" href="#">全部</a></li>
            </ul>
        </div>
        <div class="input-group dis-inline">
            <span id="operation_search_btn" class="input-group-btn spanBg hover" onclick="operationSearch()">搜索</span>
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
            <span style="width: 120px">每题<input type="text" id="singletest" />分</span>
            <span>多选题：<b id="multinum"></b> 题</span>
            <span style="width: 120px">每题<input type="text" id="multitest" />分</span>
            <span>共 <b id="totalscore"></b> 分</span>
        </p>
    </div>
    <div class="input-group" style="text-align: center">
        <span class="spanBg hover" id="manualSubmit">确定</span>
    </div>
</div>

<div class="learn_object" id="learn_object">
    <div class="managepage_tree" style="overflow: hidden">
        <div class="zTreeDemoBackground left">
            <ul id="treeDemo" class="ztree"></ul>
        </div>
    </div>
    <div class="tree_btn" style="width: 243px;">
        <span id="treeSubmit" class="spanBg">确认</span>
    </div>
</div>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $("#exam_manger_menu").addClass('leftmenu-title-down');
    }};
</script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/examination_add.js" charset="UTF-8"></script>
<script type="text/javascript">
    $(function(){
        listAll();
    });

    function operationSearch(){
        var question = $.trim($("#topic").val());

        var valStr = $("#operation-infosel p").text();
        var itemType=null;
            if(valStr =="单选"){
                itemType =0;
            }else if(valStr =="多选"){
                itemType =1;
            }
        var param= {
           "question": question,
            "itemType": itemType
        };
        if($("#id_job_type p").attr("data-value") > 0 ) {
            param.subjectId = $("#id_job_type p").attr("data-value") ;
        }else {
            param.subjectId = "" ;
        }

        listAll(param);
    }

    function listAll(param){
        $.ajax({
            type: "POST",
            url: contextPath+"/testItem/listAll.do",
            dataType:"json",
            data: param,
            success: function(data){
                if(data != null){
                    var str="";
                    for(var i=0;i<data.length;i++){
                        var it =data[i].itemType;
                        var itStr ="";
                        if(it ==0){
                            itStr ="(单)";
                        }else if(it ==1){
                            itStr ="(多)";
                        }
                        str +="<li id='"+data[i].id+"' data-type='"+data[i].itemType+"'>"+itStr+data[i].question+"</li>";
                    }
                        $("#unselected_test ul").html(str);
                }

            }
        });
    }
</script>
</body>
</html>
