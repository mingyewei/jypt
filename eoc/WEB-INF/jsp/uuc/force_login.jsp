<%@ page import="com.searainbow.rsrdc.commons.spring.SpringContextUtil" %>
<%@ page import="com.searainbow.rsrdc.uuc.client.buji.pac4j.config.UucConfig" %>
<%@ include file="../common/include-common.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%
    UucConfig uucConfig = SpringContextUtil.getBean("uucConfig");
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/HoneyComb.min.css"/>
    <link rel="stylesheet" href="${basePath}/resources/eduapp/css/Education.css"/>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js" type="text/javascript"
            charset="utf-8"></script>
    <title>登录页</title>
</head>
<body>
<div class="backlogin">
    <div class="login_img">
        <img src="${basePath}/resources/eduapp/img/logo.png" alt="">
    </div>
    <div class="login_cont">
        <div class="login_cont_left"></div>
        <div class="login_cont_right">
            <div class="login_form" id="login_form">
                <div class="login_group mar-bott">
                    <span class="uesrname_icon"></span>
                    <input type="text" id="username" autocomplete="off" class="input_large" name="username"
                           placeholder="请输入邮箱或手机号">
                </div>
                <div class="login_group">
                    <span class="password_icon"></span>
                    <input type="password" id="password" autocomplete="off" class="input_small" name="password"
                           placeholder="请输入密码">
                </div>
                <div class="error_msg">
                </div>
                <div class="login_group">
                    <span id="login_form_submit" class="login_form_submit">Login</span>
                </div>
            </div>
        </div>
    </div>
    <div class="login_foot">
        <span>Copyright © 2016 域创（北京）融资租赁有限公司</span>
    </div>
</div>
<script type="text/javascript">
    $(document).ready(function () {
        $("#login_form_submit").on("click", function () {
            var username = $("#username").val();
            var passwd = $("#password").val();
            if (!passwd) {
                $(".error_msg").html("密码不能为空");
            }
            if (!username) {
                $(".error_msg").html("用户名不能为空");
            } else if (username && passwd) {
                $.ajax({
                    url: '<%=uucConfig.getSsoCasGetTicketUrl()%>',
                    dataType: "jsonp",
                    jsonpCallback: "jsonpcallback",
                    success: function (data) {

                        $('#username_tmp').val(username);
                        $('#password_tmp').val(passwd);
                        $('#lt').val(data.lt);
                        $('#execution').val(data.execution);

                        $('#ajax-login-form').submit();
                    },
                    error: function () {
                        alert('网络访问错误!');
                    }
                });
            }

        })
        document.onkeydown = function (event) {
            e = event ? event : (window.event ? window.event : null);
            if (e.keyCode == 13) {
                //执行的方法
                $("#login_form_submit").click();
            }
        }

    });
    var logincallback = function (result) {
        if (result.ret == 1) {
            location.href = "<%=uucConfig.getSsoLocalSuccessUrl()%>";
        } else if (result.ret == 2) {
            alert("用户名或密码错误");
//            $('#login-form')[0].reset();
        } else if (result.ret == 401) {
            alert(result.msg);
//            $('#login-form')[0].reset();
        } else if (result.ret == 0) {
            alert("用户名或密码错误");
        }
    };

    $(".login_form_submit").on({
        mousedown: function () {
            $(this).addClass("btndown");
        },
        mouseup: function () {
            $(this).removeClass("btndown");
        },
        mouseleave: function () {
            $(this).removeClass("btndown");
        },
    });

    function getUser() {
        $.ajax({
            type: "post",
            url: contextPath + "/user/getUser",
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    $('.head_oper ').attr('isLogin', true)
                    $('.head_login').hide();
                    $('.head-user-portrait').show();
                    $('.head-user-portrait').attr("dataId", data.data.id);
                    $(".head-user-portrait").attr("name", data.data.username);
                    $(".head-user-portrait img").attr("src", data.data.avatarUrl);
                    msgData();
                } else {
                    //获取不到用户信息,那么就是没有登录,先尝试自动登录
                    $("<iframe style='display:none;width:0;height:0' id='ajaxAutoLogin' name='ajaxAutoLogin'></iframe>").appendTo("body");
                    $("<form id='ajax-auto-login-form' " +
                            "name='ajax-auto-login-form' " +
                            "action='<%=uucConfig.getSsoLocalServer()+"/"+uucConfig.getSsoAjaxAutoLoginUrl()%>'" +
                            " method='post' target='ajaxAutoLogin' style='display:none;width:0;height:0'> </form>").appendTo("body");

                    $('#ajax-auto-login-form').submit();

                }
            }
        });
    }

</script>
<form id="ajax-login-form" name="ajax-login-form" action="<%=uucConfig.getSsoCasLoginUrl()%>" method="post"
      target="ajaxLogin" style="display:none;width:0;height:0">
    <input name="username" id="username_tmp" type="text"/>
    <input name="password" type="password" id="password_tmp"/>
    <input type="hidden" name="lt" value="" id="lt"/>
    <input type="hidden" name="execution" value="" id="execution"/>
    <input type="hidden" name="_eventId" value="submit"/>
</form>
</body>
<iframe style="display:none;width:0;height:0" id="ajaxLogin" name="ajaxLogin"/>
</html>
