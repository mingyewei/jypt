<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<div class="personal-share-upload-box">
    <ul class="share-upload-tab">
        <li class="float-lt share-tab-active">我要上传</li>
        <li class="float-lt">已分享</li>
    </ul>
    <div class="share-box">
        <ul class="share-upload-box share-upload">
            <li>
                <span class="share-msg-title">资料类别</span>
                <div class="share-msg-content">
                    <span class="share-file share-file-type border-ra share-file-active hand">文档资料</span>
                    <span class="share-vedio share-file-type  border-ra hand">视频资料</span>
                </div>
            </li>
            <li>
                <span class="share-msg-title">资料名称</span>
                <div class="share-msg-content">
                    <input type="text" class="border-ra share-file-name" placeholder="请填写资料名称">
                </div>
            </li>
            <li>
                <span class="share-msg-title">资料简介</span>
                <div class="share-msg-content">
                    <textarea placeholder="请填写资料简介" class="border-ra share-file-introduce"></textarea>
            </li>
            <li>
                <span class="share-msg-title">资料内容</span>
                <div class="share-msg-content">
                    <textarea placeholder="请填写资料内容" class="border-ra border-ra share-file-content"></textarea>
                </div>
            </li>
            <li>
                <form class="upload-form" enctype="multipart/form-data">
                    <span class="share-msg-title">附件</span>
                    <div class="share-msg-content">
                        <span class="share-file-upload-name"></span>
                        <input type="file" class="share-choice-input dis-none" name="toUpload">
                        <span class="share-choice-btn hand">浏览</span>
                        <span class="share-choice-upload-btn hand border-ra">上传</span>
                    </div>
                </form>
            </li>
            <li>
                <div class="share-msg-content">
                    <div class="share-upload-btn border-ra hand">提交</div>
                </div>
            </li>
        </ul>
        <div class="share-myshare-box dis-none">
            <ul class="myshare-list">
            </ul>
            <div class="myshare-page" id="myshare-change-page"></div>
        </div>
        <ul class="share-upload-box share-myshare-detial dis-none">
            <%--<li>--%>
                <%--<span class="share-msg-title">资料类别</span>--%>
                <%--<div class="share-msg-content">--%>
                   <%--<span class="share-type"></span>--%>
                <%--</div>--%>
            <%--</li>--%>
            <li>
                <span class="share-msg-title">资料名称</span>
                <div class="share-msg-content">
                    <input type="text" class="border-ra share-file-name my-share-name" disabled="disabled" >
                </div>
            </li>
            <li>
                <span class="share-msg-title">资料简介</span>
                <div class="share-msg-content">
                    <textarea  disabled="disabled" class="border-ra share-file-introduce my-share-introduce"></textarea>
            </li>
            <li>
                <span class="share-msg-title">资料内容</span>
                <div class="share-msg-content">
                    <textarea  disabled="disabled" class="border-ra border-ra share-file-content my-share-content"></textarea>
                </div>
            </li>
            <li>
                <form class="upload-form" enctype="multipart/form-data">
                    <span class="share-msg-title">附件</span>
                    <div class="share-msg-content">
                        <span class="share-file-upload-name my-file-name"></span>
                    </div>
                </form>
            </li>

        </ul>
    </div>
</div>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/personalShare.js"></script>
