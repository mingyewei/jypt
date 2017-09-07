<%@ page import="com.searainbow.rsrdc.uuc.client.buji.pac4j.config.UucConfig" %>
<%@ page import="com.searainbow.rsrdc.commons.spring.SpringContextUtil" %>
<%--
  Created by IntelliJ IDEA.
  User: renxi
  Date: 2017/4/17
  Time: 11:07
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8" %>
<%
    UucConfig uucConfig = SpringContextUtil.getBean("uucConfig");
%>
<%@ include file="include-common.jsp" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/edcapp/css/education.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/layer.css"/>
    <link rel="icon" href="${basePath}/resources/HoneyComb1.1/img/global/favicon.ico"
          mce_href="../HoneyComb1.1/img/global/favicon.ico" type="image/x-icon">
    <script type="text/javascript" src="${basePath}/resources/HoneyComb1.1/script/global/jquery-1.9.1.min.js"></script>
    <title></title>
</head>
<body>

<div id="ajax-hook"></div>
<!-- 导航拦开始 -->
<div class="header">
    <div class="header-logo">
        <img src="${basePath}/resources/edcapp/img/logo.png">
    </div>
    <nav>
        <div class="header-white">
            <ul class="header-nav float-lt">
                <li data-href="homePage/mainPage">
                    <a>首页</a>
                </li>
                <li data-href="homePage/hotNewList">
                    <a>热点新闻</a>
                </li>
                <li data-href="homePage/noticeList">
                    <a>培训公告和报道</a>
                </li>
                <li data-href="train/detail">
                    <a>培训课程</a>
                </li>
                <li data-href="exam/exam">
                    <a>考试专区</a>
                </li>
                <li data-href="kb/library">
                    <a>文库</a>
                </li>
            </ul>
            <div class="head_oper float-rt">
                <div class="head_search float-lt">
                    <form action="/edc/search/toSearchList.action" method="post" id="searchForm">
                        <div class="search_status pos-relative">
                            <div class="search-text">
                                <input class="search-val" placeholder="请输入您要查找的内容" autocomplete="off" value=""
                                       name="keywords" id="keywords" type="text">
                            </div>
                            <span class="search-icon dis-inline pos-absolute "></span>
                        </div>
                        <a class="search-hd-btn" href="javascript:;"><i class="icon-search"></i></a>
                    </form>
                </div>
                <div class="head-msg float-lt dis-inline hand pos-relative">
                    <span class="head-msg-have border-ra pos-absolute"></span>
                    <img src="${basePath}/resources/edcapp/img/icon_mes.png">
                </div>
                <div class="head_login hand" type='login'>
                    <a>登录</a>
                </div>
                <div class="head-user-portrait float-lt dis-inline dis-none">
                    <img>
                    <ul class="head-personal-center">
                        <li>个人中心</li>
                        <li>退出登录</li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</div>
<!-- 导航拦结束 -->
<!-- 登录弹框开始 -->
<div class="popup_shade"></div>
<div class="popup_box" id="popup_box">
    <div class="popup_close"><img src="${basePath}/resources/edcapp/img/icon_x.png"></div>
    <div class="popup_nav">
        <ul>
            <li class="currents">登录</li>
        </ul>
    </div>
    <div class="popup_tab">
        <div class="popup_wraper" id="login_wraper">
            <div class="popup_group">
                <div class="popup_input">
                    <input type="text" id="username" autocomplete="off" placeholder="请输入登录账号"/>
                    <div class="error_msg"></div>
                </div>
                <div class="popup_tips">
                    <p id="phone-msg"></p>
                </div>
            </div>
            <div class="popup_group">
                <div class="popup_input">
                    <input type="password" autocomplete="off" id="password" placeholder="请输入密码"/>
                    <div class="error_msg"></div>
                </div>
                <div class="popup_tips">
                    <p id="loginError"></p>
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
            <div id="popup_btn">
                <span id="login_btn" type='login'>登录</span>
            </div>
        </div>
    </div>
</div>
<!-- 登录弹框结束 -->
<!--登录脚本js-->

<form id="ajax-login-form" name="ajax-login-form" action="<%=uucConfig.getSsoCasLoginUrl()%>" method="post"
      target="ajaxLogin" style="display:none;width:0;height:0">
    <input name="username" id="username_tmp" type="text"/>
    <input name="password" type="password" id="password_tmp"/>
    <input type="hidden" name="lt" value="" id="lt"/>
    <input type="hidden" name="execution" value="" id="execution"/>
    <input type="hidden" name="_eventId" value="submit"/>
</form>
<iframe style="display:none;width:0;height:0" id="ajaxLogin" name="ajaxLogin">
</iframe>
<script type="text/javascript" src="${basePath}/resources/HoneyComb1.1/script/global/layer.js"></script>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/header.js"></script>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/login.js"></script>
<script type="text/javascript">
    $(document).ready(function () {
        getUser();
        $(".head-msg").hide();
        $("#login_btn").on("click", function () {
            var username = $("#username").val().trim();
            var passwd = $("#password").val().trim();

            if (!passwd) {
                $("#loginError").html("密码不能为空");
                $('#password').addClass('errorMsg');
            }
            if (!username) {
                $("#phone-msg").html("用户名不能为空");
                $('#username').addClass('errorMsg');
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
                        getUser();
                    },
                    error: function () {
                        alert('网络访问错误!');
                    }
                });
            }

        })
    });
    /*退出登录*/
    $('.head-personal-center li').eq(1).on('click', function () {
        $('.head_login').show();
        window.location.href = contextPath + "/sso/logout?redirect=<%=uucConfig.getSsoLocalServer()%>/homePage/mainPage";

    })
    $('.header-nav li').on('click', function () {
        var isLogin = $('.head_oper ').attr('isLogin') || false;
        /*取得跳转url*/
        href = $(this).attr('data-href').split('.')[0];
        /*如果未登录，出现未登陆提示*/
        if (!isLogin && (href == 'train/detail' || href == 'exam/exam' || href == 'kb/library')) {
            globalTip({
                'msg': '您还未登录，请您登录后再查看!',
                'setTime': 5,
                'jump': false
            });
        } else {
            location.href = contextPath + "/" + $(this).attr('data-href') + '?href=' + href;
            //contextPath+"/homePage/hotNewList.action";+ '
        }
    })
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
    ;
    function msgData() {
        $.ajax({
            type: "post",
            url: contextPath + "/message/noticeUnreadCount",
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    $(".head-msg").show();
                    if (data.data == 0 || data.data == undefined) {
                        $(".head-msg-have").hide();
                    } else {
                        $(".head-msg-have").css('display', 'inline-block').text(data.data);
                    }
                }
            }
        });
    }
    ;
    /*消息中心*/
    $('.head-msg').on('click', function () {
        location.href = contextPath + '/message/page?href=searchList';
    })
    var logincallback = function (result) {
        var jumpHref = getUrlParamByName('href') || '';

        if (result.ret == 1) {
            if (jumpHref == '') {
                location.href = "<%=uucConfig.getSsoLocalServer()%>/homePage/mainPage";
            } else {
                location.href = '/edc/' + jumpHref + '?href=' + jumpHref;
            }
        } else if (result.ret == 2) {
            $('#loginError').text('用户名或密码错误')
        } else if (result.ret == 0) {
            $('#loginError').text('用户名或密码错误')
        } else if (result.ret == 4) {
            $('#loginError').text('账号已失效或者被禁用')
        }
        else {
            alert(result.msg);
            $('#login-form')[0].reset();
        }
    };
</script>
</body>
</html>
