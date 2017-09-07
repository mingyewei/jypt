
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
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/jstree/js/jquery.ztree.all.js" type="text/javascript"
            charset="UTF-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/eduapp/laypage-v1.3/laypage/laypage.js" type="text/javascript"
            charset="utf-8"></script>
    <title>试卷评分详情页</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>

<div class="content">
    <div class="iframe-box">
        <div class="show_iframe">
            <div class="Scoring-details">
                <h1 class="page-title">广州市2016年第一次医保门诊常识考试</h1>
                <label>考试须知：</label>
                <p>1、请全部答题完毕后点击“提交”按钮提交考卷</p>
                <p>2、请确认无任何修改后再提交试卷，试卷提交后将不能再修改</p>
                <p>3、请在成绩查询模块中查询考试成绩</p>
                <div class="Scoring-details-page">
                    <h3>一、单选题（ 30分 ）</h3>
                    <i class="Scoring-details-icons"><img src="${basePath}/resources/eduapp/img/btn_xl_nor.png"></i>
                    <div class="dis-none" id="Scoring_details_danxuan">
                        <div class="Scoring-details-test">
                            <p>1、春风又绿江南岸下一句是？</p>
                            <ul>
                                <li>
                                    <span></span>
                                    <p>花飞花谢花满天</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>霜叶红于二月花</p>
                                </li>
                                <li>
                                    <span class="Scoring-details-test-check"></span>
                                    <p>明月何时照我还</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>夜半钟声到客船</p>
                                </li>
                            </ul>
                            <i class="call-right-answers">回答正确！</i><i class="right-answers">正确答案:</i><span
                                class="Scoring-details-answers">D</span>
                            <span class="Scoring-details-underline"></span>
                        </div>
                        <div class="Scoring-details-test">
                            <p>2、春风又绿江南岸下一句是？</p>
                            <ul>
                                <li>
                                    <span></span>
                                    <p>花飞花谢花满天</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>霜叶红于二月花</p>
                                </li>
                                <li>
                                    <span class="Scoring-details-test-check"></span>
                                    <p>明月何时照我还</p>
                                </li>
                                <li>
                                    <span></span>
                                    <p>夜半钟声到客船</p>
                                </li>
                            </ul>
                            <i class="call-null-answers">回答错误！</i><i class="right-answers">正确答案:</i><span
                                class="Scoring-details-answers">B</span>
                            <%--<span class="Scoring-details-underline"></span>--%>
                        </div>
                    </div>
                </div>
                <div class="Scoring-details-page">
                    <h3>二、多选题（ 30分 ）</h3>
                    <i class="Scoring-details-icons"><img src="${basePath}/resources/eduapp/img/btn_xl_nor.png"></i>
                    <div class="Scoring-details-test">
                        <p>1、春风又绿江南岸下一句是？</p>
                        <ul>
                            <li>
                                <span></span>
                                <p>花飞花谢花满天</p>
                            </li>
                            <li>
                                <span></span>
                                <p>霜叶红于二月花</p>
                            </li>
                            <li>
                                <span class="Scoring-details-test-check"></span>
                                <p>明月何时照我还</p>
                            </li>
                            <li>
                                <span></span>
                                <p>夜半钟声到客船</p>
                            </li>
                        </ul>
                        <i class="call-right-answers">回答正确！</i><i class="right-answers">正确答案:</i><span
                            class="Scoring-details-answers">D</span>
                        <span class="Scoring-details-underline"></span>
                    </div>
                    <div class="Scoring-details-test">
                        <p>2、春风又绿江南岸下一句是？</p>
                        <ul>
                            <li>
                                <span></span>
                                <p>花飞花谢花满天</p>
                            </li>
                            <li>
                                <span></span>
                                <p>霜叶红于二月花</p>
                            </li>
                            <li>
                                <span class="Scoring-details-test-check"></span>
                                <p>明月何时照我还</p>
                            </li>
                            <li>
                                <span></span>
                                <p>夜半钟声到客船</p>
                            </li>
                        </ul>
                        <i class="call-null-answers">回答错误！</i><i class="right-answers">正确答案:</i><span
                            class="Scoring-details-answers">B</span>
                        <%--<span class="Scoring-details-underline"></span>--%>
                    </div>
                </div>
                <div class="Scoring-details-Total-Points">
                    <span>选择题总得分 : </span><i> 30</i>
                </div>
                <div class="Scoring-details-page">
                    <h3>三、问答题（ 40分 ）</h3>
                    <i class="Scoring-details-icons"><img src="${basePath}/resources/eduapp/img/btn_xl_nor.png"></i>
                    <div class="Scoring-details-test ">
                        <p>1、医保对你的影响及看法？</p>
                        <div>
                            <lable>学员答案 :</lable>
                            <i>学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答
                                案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案</i>
                        </div>
                        <div>
                            <lable class="Scoring-details-reference">参考答案 :</lable>
                            <i>学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答
                                案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案</i>
                        </div>
                    </div>
                    <div class="audit-criteria-status">
                        <span>未审核</span>
                        <p>得分 : </p><input class="Scoring-details-notext" type="text">
                        <p class="Scoring-details-fen">分</p>
                        <span class="Scoring-details-recompose">确定</span>
                    </div>
                    <div class="Scoring-details-test Scoring-details-wenda">
                        <p>2、你对医疗改革创新有新的理解？</p>
                        <div>
                            <lable>学员答案 :</lable>
                            <i>学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答
                                案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案</i>
                        </div>
                        <div>
                            <lable class="Scoring-details-reference">参考答案 :</lable>
                            <i>学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答
                                案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案学员答案</i>
                        </div>
                    </div>
                    <div class="audit-criteria-status">
                        <span>已审核</span>
                        <p>得分 : </p><span class="Scoring-details-years">18</span>
                        <p class="Scoring-details-fen">分</p>
                        <span class="Scoring-details-recompose">修改</span>
                    </div>
                </div>
                <div class="Scoring-details-Total-Points">
                    <span>问答题总得分 : </span><i> 20</i>
                </div>
                <div class="Scoring-details-Total-submit">
                    <span>提交</span><span class="Scoring-details-Total-callback">返回</span>
                </div>
                <div class="Scoring-details-testscores">
                    <span>残雪凝辉</span>
                    <p class="Scoring-details-item">考试总得分 : </p><span class="Scoring-details-five">50</span>
                    <p>分</p>
                    <span class="Scoring-details-Qualified">合格</span>
                    <span class="Scoring-details-Noqualified">不合格</span>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
<%@ include file="../common/common_footer.jsp" %>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/common.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/jquery-labelauty.js" charset="UTF-8"></script>
<script type="text/javascript" src="${basePath}/resources/eduapp/js/markPapers.js" charset="UTF-8"></script>
</body>
</html>




