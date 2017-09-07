<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<div class="personal-head-portrait">
    <div id="personal-portrait-box">
        <img id="personal-portrait-img" src="">
    </div>
    <form enctype="multipart/form-data" id="portrait-form">
        <input name="avatarImg" type="file" id="personal-portrait-input" style="display: none">
    </form>

    <div id="personal-head-portrait-btn">选择头像</div>
    <%--<div id="personal-head-upload-btn">上传头像</div>--%>
</div>
<div class="personal-msg">
    <ul>
        <li>
            <span class="personal-msg-title">姓名</span>
            <div class="personal-modifiy-msg">
                <span class="personal-msg-detial user-name-data"></span>
                <span class="personal-msg-modification">修改</span>
            </div>
            <div class="personal-msg-title-change">
                <input type="text" placeholder="姓名" class="border-ra">
                <span class="personal-save border-ra personal-save-name">保存</span>
                <span class="personal-cancle border-ra">取消</span>
            </div>
        </li>
        <li>
            <span class="personal-msg-title">性别</span>
            <div class="personal-modifiy-msg">
                <span class="personal-msg-detial sex-data"></span>
                <span class="personal-msg-modification">修改</span>
            </div>
            <div class="personal-msg-title-change">
                <span class="person-sex-boy border-ra person-sex-active person-sex">男</span>
                <span class="person-sex-girl border-ra person-sex">女</span>
                <span class="personal-save border-ra personal-save-sex">保存</span>
                <span class="personal-cancle border-ra">取消</span>
            </div>
        </li>
        <li>
            <span class="personal-msg-title">年龄</span>
            <div class="personal-modifiy-msg">
                <span class="personal-msg-detial personal-none-modify age-data"></span>
                <%--<span class="personal-msg-modification">修改</span>--%>
            </div>
            <%--<div class="personal-msg-title-change">--%>
                <%--<input type="text" placeholder="年龄" class="border-ra" maxlength="3">--%>
                <%--<span class="personal-save border-ra personal-save-grade">保存</span>--%>
                <%--<span class="personal-cancle border-ra">取消</span>--%>
            <%--</div>--%>
        </li>
        <li>
            <span class="personal-msg-title">手机</span>
            <div class="personal-modifiy-msg">
                <span class="personal-msg-detial personal-bind-phone">绑定手机</span>
                <span class="personal-msg-detial  phone-num-data"></span>
                <span class="personal-msg-modification personal-modify-phone">修改</span>
            </div>
        </li>
        <li>
            <span class="personal-msg-title">邮箱</span>
            <div class="personal-modifiy-msg">
                <span class="personal-msg-detial personal-bind-email">绑定邮箱</span>
                <span class="personal-msg-detial  email-data"></span>
                <span class="personal-msg-modification personal-modify-email">修改</span>
            </div>
        </li>
        <li>
            <span class="personal-msg-title">身份证</span>
            <div class="personal-modifiy-msg">
                <span class="personal-msg-detial personal-none-modify idcard-data"></span>
            </div>
        </li>
        <li>
            <span class="personal-msg-title">所属机构</span>
            <div class="personal-modifiy-msg">
                <span class="personal-msg-detial personal-none-modify orgName-data"></span>
            </div>
        </li>
    </ul>
</div>
<div class="prompt-message-box border-ra dis-none">
     <div class="prompt-message-btn-title"><span>绑定手机</span>
       <img src="${basePath}/resources/edcapp/img/icon_x.png" class="prompt-message-close">
     </div>
     <div class="prompt-message-content">
         <img src="${basePath}/resources/edcapp/img/icon_phone.png">
         <p class="prompt-bind-success">绑定成功</p>
         <p class="prompt-detial-msg"></p>
     </div>
     <div class="prompt-message-btn">确定</div>
</div>
<div class="popup_box bind_phone_box" id="popup_box">
    <div class="popup_close"><img src="${basePath}/resources/edcapp/img/icon_x.png" ></div>
    <div class="popup_nav">
        <ul>
            <li class="currents">登录</li>
        </ul>
    </div>
    <div class="popup_tab">
        <div class="popup_wraper" id="login_wraper">
            <div class="popup_group bind-phone-box">
                <div class="popup_input">
                    <input type="text" id="phone-number" autocomplete="off" placeholder="" />
                    <div class="error_msg"></div>
                </div>
                <div class="popup_tips">
                    <p id="error-phone"></p>
                </div>
            </div>
            <div class="popup_group bind-phone-box">
                <div class="popup_input">
                    <input type="text" autocomplete="off" id="pwd" placeholder="" />
                    <div class="error_msg"></div>
                </div>
                <div class="popup_tips">
                    <p id="error-email"></p>
                    <!--   <a href="${basePath}/uuc/retrivePassword.action">忘记密码</a> -->
                    <!-- <a href="">忘记密码</a> -->
                </div>
            </div>
            <%--<div class="popup_group">--%>
            <%--<div class="popup_input">--%>
            <%--<input type="text" autocomplete="off" id="verificationcode_r2" class="input_small" placeholder="请输入验证码" />--%>
            <%--<i class="input_small"></i>--%>
            <%--<div id="login_code" class="popup_verificetionimg">--%>
            <%--<!-- <img src="${basePath}/uuc/captcha" width="80" height="40" /> -->--%>
            <%--<img src="" width="80" height="40" />--%>
            <%--<a>换一个</a>--%>
            <%--</div>--%>
            <%--</div>--%>
            <%--<div class="popup_tips">--%>
            <%--<p id="errorCapath"></p>--%>
            <%--</div>--%>
            <%--</div>--%>
            <div  id="popup_btn">
                <span id="change-phone-or-email" type='login'>提交</span>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/personalData.js"></script>
