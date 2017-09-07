<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<div class="personal-password-box">
    <ul>
        <li>
            <span class="personal-password-title-tab ">当前密码</span>
            <span class="personal-password-input-tab">
                <input type="text " placeholder="请输入当前密码" class="border-ra pwd-now">
            </span>
            <div class="personal-password-error-tips error-pwd-tip"></div>
        </li>

        <li>
            <span class="personal-password-title-tab">新密码</span>
            <span class="personal-password-input-tab">
                 <input type="password" placeholder="请输入新密码(6-16位，区分大小写)" class="border-ra new-pwd">
            </span>
            <div class="personal-password-error-tips error-new-pwd"></div>
        </li>

        <li>
            <span class="personal-password-title-tab">确认密码</span>
            <span class="personal-password-input-tab">
                 <input type="password" placeholder="请再次输入密码" class="border-ra confirm-pwd">
            </span>
            <div class="personal-password-error-tips confirm-error"></div>
        </li>

    </ul>
    <div class="border-ra personal-password-save-btn hand">保存</div>
</div>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/personalPassWord.js"></script>
