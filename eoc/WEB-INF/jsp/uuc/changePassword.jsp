<%@ include file="../common/include-common.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
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
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/DataPresentation/table/tableDataOperation.js"
            type="text/javascript" charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>
    <title>修改密码</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="managepage">
                <div class="managepage_group">
                    <label>当前密码：</label>
                    <input type="text" id="oldPassword" class="border input-focus" onfocus="this.type='password'"
                           autocomplete="off" placeholder="请输入当前密码"/>
                </div>
                <div class="managepage_group">
                    <label>新密码：</label>
                    <input type="text" id="newPassword" class="border input-focus" onfocus="this.type='password'"
                           autocomplete="off" placeholder="请输入新密码"/>
                </div>
                <div class="managepage_group">
                    <label>确认密码：</label>
                    <input type="text" id="confirmPassword" class="border input-focus" onfocus="this.type='password'"
                           autocomplete="off" placeholder="请再次输入新密码"/>
                </div>
                <div class="managepage_group">
                    <label></label>
                    <b></b>
                </div>
                <div class="managepage_group">
                    <span class="input-group-btn spanBg hover" id="submitsave">保存</span><%--<span class="managepage_group_btn"  id="returnback">返回</span>--%>
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
        $("#user_setting").addClass('leftmenu-title-down');
            $('#user_setting').siblings('.subtab').addClass('tab-down');
            $('#user_setting').siblings('.subtab').find('a').eq(1).addClass('subtab-list-active');
    }};
</script>
<script src="${basePath}/resources/eduapp/js/common.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    $(document).ready(function () {

        $("#submitsave").on("click", function () {
            var data = {
                password: $("#oldPassword").val(),
                newPassword: $("#newPassword").val()
            }
            var old_pass = $("#oldPassword").val();
            var new_pass = $("#newPassword").val();
            var confirm_pass = $("#confirmPassword").val();
            if (new_pass == confirm_pass) {
                $(".managepage_group b").html("");
            } else {
                $(".managepage_group b").html("两次密码不一致");
            }
            if (!new_pass) {
                $(".managepage_group b").html("新密码不能为空");
            }
            if (!old_pass) {
                $(".managepage_group b").html("原密码不能为空");
            }
            if (old_pass && new_pass && new_pass == confirm_pass) {
                var url = basecontextPath + "/user/resetPassword"
                $.ajax({
                    type: "post",
                    url: url,
                    data: data,
                    dataType: "json",
                    success: function (data) {
                        var code = data.code;
                        if (code == 1) {
                            //交互
                            layer.msg("密码修改成功，请重新登录系统!", {time: 1000}, function () {
                                window.location.href = basecontextPath + "/sso/logout";
                            });
                        } else {
                            layer.msg(data.msg);
                        }
                    }
                });
            }
        });
    });
</script>
</body>
</html>
