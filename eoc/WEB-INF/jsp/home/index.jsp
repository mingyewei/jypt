<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ include file="../common/include-common.jsp" %>
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/reset.css"/>
    <link rel="stylesheet" type="text/css" href="../resources/HoneyComb1.1/css/global/HoneyComb.min.css"/>
    <link rel="stylesheet" href="../resources/eduapp/css/Education.css"/>
    <%--<script src="../resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript" charset="utf-8"></script>--%>
    <script src="../resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="../resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="../resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript" charset="utf-8"></script>
    <script src="../resources/ckeditor/ckeditor.js" type="text/javascript" charset="UTF-8"></script>
    <title>首页信息管理</title>
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
                        <label>题目：</label>
                        <input type="text" id="topic" class="input-focus" value="" placeholder="请输入题目"/>
                    </div>

                    <div id="operation-infosel" class="patientlist_infosel">
                        <p>全部<i></i></p>
                        <ul>
                            <li><a href="#" data-id="">全部</a></li>
                            <li><a href="#" data-id="0">热点新闻</a></li>
                            <li><a href="#" data-id="1">培训公告</a></li>
                            <li><a href="#" data-id="2">轮播图</a></li>
                        </ul>
                    </div>
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
                    <table id="table_id" class="table-bordered" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <thead>
                        <tr>
                            <th width="50">选择</th>
                            <th style="display: none;"></th>
                            <th>栏目</th>
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
                <div id="homeManage_page" class="mar-top-10 float-lt">
                </div>
                <div id="sum_page">
                    共<span></span>条
                </div>
            </div>
            <div id="message_modal" style="margin-left: 20px" class="dis-none">
                <div id="id" class="dis-none"></div>
                <!--存放编辑的信息的标识ID-->
                <%--<form id="subForm" action="<%=request.getContextPath()%>/HomeManager/uploadFile" method="post" enctype="multipart/form-data">--%>

                <div class="message_cont_modal">
                    <div class="managepage_group">
                        <label>题　　目：</label>
                        <input type="text" id="modalUserName" name="title" class="input-focus modalInputWidth" value=""
                               placeholder="请输入题目"/>
                    </div>
                    <div class="managepage_group dis-inline">
                        <label style="line-height: 35px;">栏　　目：</label>
                        <div id="operation-infosel-modal" class="operation_infosel border" style="margin: 0 8px;">
                            <!-- cs修改，添加了一个input隐藏域，给a赋予data-id参数，存储每一个文字的id -->
                            <input type="hidden" name="hiddenId" id="hiddenId" value="">
                            <%--<input type="text" name="name" id="name" value="1" hidden="ture"/>--%>
                            <p>热点新闻<i></i></p>
                            <ul class="border">
                                <li><a href="#" data-id="0">热点新闻</a></li>
                                <li><a href="#" data-id="1">培训公告</a></li>
                                <li><a href="#" data-id="2">轮播图</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div class="managepage_group" id="hotNew">
                            <label>发　　布：</label>
                            <input id="status_radio" type="text" name="status" value="" hidden="ture"/>
                            <input type="radio" name="course_elaborate" value="0" checked/>否
                            <input type="radio" name="course_elaborate" value="1"/>是
                        </div>
                        <div class="managepage_group outLink dis-none">
                            <label style="line-height:16px">外部链接：</label>
                            <input id="linkStatus" type="text" name="linkStatus" value="" hidden="ture"/>
                            <input type="radio" name="externalLink" value="0" checked/>是
                            <input type="radio" name="externalLink" value="1"/>否
                        </div>
                        <div class="managepage_group dis-none" id="imgContent">
                            <div class="managepage_group">
                                <label style="vertical-align: top;">链接地址：</label>
                                <input type="text" id="links" name="linkUrl" class="input-focus modalInputWidth"
                                       placeholder="请输入链接地址"/>
                            </div>
                        </div>
                        <div class="managepage_group1" id="content_editor">
                            <label style="vertical-align: top;">内　　容：</label>
                            <textarea rows="=30" cols="50" id="editor01" class="input-focus" placeholder=""
                              name="editor01" value=''></textarea>
                            <input type="hidden" name="content" id="content">
                            <script type="text/javascript">
                                CKEDITOR.replace('editor01', {width: '852px', height: '400px'});
                            </script>
                        </div>
                        <div class="managepage_group attachments">
                            <form class="form-cp" id="uploadForm" enctype="multipart/form-data">
                                <label>附件上传：</label>
                                <input type="file" name="toUpload" id="attach_upload" value=""/>
                                <span class="fileupload browse" id="fileupload">浏览</span>
                                <span class="fileupload" id="cp_upload">上传</span>
                                <a class="filetips fileupload_tips"></a>
                            </form>
                            <%--展示上传数据--%>
                            <div class="data-display">
                                <ul class="dis-none">
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="managepage_group" id="pic">
                        <form class="form-cp" id="imgloadForm" enctype="multipart/form-data">
                            <label class="fileupload">选择图片：</label>
                            <input type="file" name="toUpload" id="fileimg" value="" style="display: none"/>
                            <span class="fileupload" id="fileimgupload"
                                  style="width: 100px; display:inline-block;background-color: #00C1B3;line-height: 35px;text-align: center;color: #FFFFFF">浏览</span>
                            <span class="fileupload" id="img_upload">上传</span>
                        </form>
                        <div class="img-view">
                            <img id="imgupload" class="img_up dis-inline" src="" title="" style="display:none"/>
                            <a href="#" class='image_close'></a>
                        </div>
                    </div>
                </div>
                <div class="option_btn mar-top-10">
                    <span id="personn_submit" class="hover spanBg">提交</span>
                    <span id="personn_reset" class="spanBg1">取消</span>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
        $('#exam_manger_menu').addClass('leftmenu-title-down')
    }};
</script>
<script type="text/javascript" src="../resources/eduapp/js/common.js" charset="UTF-8"></script>
<script src="../resources/eduapp/js/homeManage.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>
