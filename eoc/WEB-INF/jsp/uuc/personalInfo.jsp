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
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Ajax/ajaxfileupload.js" type="text/javascript"
            charset="utf-8"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/PageInteraction/modal/layer-v2.1/layer/layer.js"
            type="text/javascript" charset="utf-8"></script>

    <title>个人资料</title>
</head>
<body>
<%@ include file="../common/common_header.jsp" %>
<%@ include file="../common/common_menu.jsp" %>
<div class="content">
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <div class="personnal_infobox" style="margin:20px 0 0 20px">
                <input type="hidden" id="id" value=""/>
                <div class="personal_tabdetail">
                    <div class="personal_information_btn">
                        <span id="personal_info_update" class="spanBg hover">修改个人信息</span>
                    </div>
                    <div class="personal_information">
                        <div class="personal_information_img">
                            <img id="avatar" src="" width="100" height="100"/>
                            <input type="file" id="personal_input_fileimg" name="avatarImg" style="display: none;"/>
                            <span id="personal_fileimg_btn" class="spanBg hover">上传头像</span>
                        </div>
                        <div class="personal_information_list">
                            <ul>
                                <li><label>姓名</label><a id="username"></a></li>
                                <li><label>性别</label><a id="genderShow"></a></li>
                                <li><label>年龄</label><a id="age"></a></li>
                                <li><label>手机</label><a id="mobilePhone"></a><a class="bindData" id="bind_tel">绑定手机</a>
                                </li>
                                <li><label>邮箱</label><a id="email"></a><a class="bindData" id="bind_email">绑定邮箱</a></li>
                                <li><label>身份证</label><a id="idCard"></a></li>
                                <li><label>所属机构</label><a id="orgName"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="personal_fileimg_display input-group dis-inline dis-none">
                    <img src="" id="file_dis" width="100%" style="display: none;"/>
                    <span id="fileimg" class="spanBg hover">开始上传</span>
                </div>
            </div>


        </div>
    </div>
</div>
<!--修改个人信息开始-->
<div class="popup_box" id="bind_personal_info">
    <div class="popup_nav">
        <ul>
            <li style="width: 100px;">修改个人信息</li>
        </ul>
    </div>
    <div class="popup_tab">
        <div class="popup_wraper" id="updateinfo_wraper">
            <div class="popup_group">
                <div class="popup_input">
                    <input type="text" id="name_r" placeholder="姓名" />
                    <i></i>
                </div>
                <div class="popup_tips">
                    <b id="nameError"></b>
                </div>
            </div>
            <div class="popup_group">
                <div class="popup_sex" style="float:left">
                    <b class="currents" data-gender="1">男</b>
                    <b data-gender="0">女</b>
                </div>
            </div>
            <div class="popup_group">
                <span id="bindinfo_btn" class="spanBg hover">提交</span>
            </div>
        </div>
        <div class="popup_wraper" id="updateinfosuccess_wraper" style="display: none;">
            <div class="popup_success">
                <img src="${basePath}/resources/eduapp/img/register.jpg" width="60" height="60" />
                <p>修改成功</p>
                <span></span>
            </div>
            <div class="popup_group">
                <span id="updateinfosuccess_btn" class="spanBg hover">完成</span>
            </div>
        </div>
    </div>
</div>
<!--修改个人信息结束-->
<!--绑定手机开始-->
<div class="popup_box" id="bind_tel_box">
    <div class="popup_nav">
        <ul>
            <li>绑定手机</li>
        </ul>
    </div>
    <div class="popup_tab">
        <div class="popup_wraper" id="bindtel_wraper">
            <div class="popup_group">
                <div class="popup_input">
                    <input type="text" id="telnumber" placeholder="请输入手机号"/>
                </div>
                <div class="popup_tips">
                    <b id="telnumberError"></b>
                </div>
            </div>
            <div class="popup_group">
                <div class="popup_input">
                    <input type="password" id="password_t" placeholder="请输入登录密码"/>
                </div>
                <div class="popup_tips">
                    <b id="password_tError"></b>
                </div>
            </div>
            <%--<div class="popup_group">--%>
                <%--<div class="popup_input">--%>
                    <%--<input type="text" id="verificationcode_t" class="input_small" placeholder="请输入验证码" />--%>
                    <%--<div class="popup_verificetionimg" id="tel_verificetionimg">--%>
                        <%--<img src="" width="80" height="40"/>--%>
                        <%--<a>换一个</a>--%>
                    <%--</div>--%>
                <%--</div>--%>
                <%--<div class="popup_tips">--%>
                    <%--<b id="verificationcode_tError"></b>--%>
                <%--</div>--%>
            <%--</div>--%>
            <div class="popup_group">
                <span id="bindtel_btn" class="spanBg hover">提交</span>
            </div>
        </div>
        <div class="popup_wraper" id="bindtelsuccess_wraper" style="display: none;">
            <div class="popup_success">
                <img src="${basePath}/resources/eduapp/img/success_telbind.jpg" width="60" height="60" />
                <p>绑定成功</p>
                <%--<span>邮箱为：01234567891@qq.com</span>--%>
            </div>

            <div class="popup_group">
                <span id="bindtelsuccess_btn" class="spanBg hover">完成</span>
            </div>
        </div>
    </div>
</div>
<!--绑定手机结束-->
<!--绑定邮箱开始-->
<div class="popup_box" id="bind_email_box">
    <div class="popup_nav">
        <ul>
            <li>绑定邮箱</li>
        </ul>
    </div>
    <div class="popup_tab">
        <div class="popup_wraper" id="bindemail_wraper">
            <div class="popup_group">
                <div class="popup_input">
                    <input type="text" id="emails" placeholder="请输入邮箱"/>
                </div>
                <div class="popup_tips">
                    <b id="emailError"></b>
                </div>
            </div>
            <div class="popup_group">
                <div class="popup_input">
                    <input type="password" id="password_e" placeholder="请输入登录密码"/>
                </div>
                <div class="popup_tips">
                    <b id="password_eError"></b>
                </div>
            </div>
            <div class="popup_group">
                <span id="bindemail_btn" class="spanBg hover">提交</span>
            </div>
        </div>
        <div class="popup_wraper" id="bindemailsuccess_wraper" style="display: none;">
            <div class="popup_success">
                <img src="${basePath}/resources/eduapp/img/success_emailbind.jpg" width="60" height="60" />
                <p>绑定成功</p>
                <%--<span>邮箱为：01234567891@qq.com</span>--%>
            </div>

            <div class="popup_group">
                <span id="bindemailsuccess_btn" class="spanBg hover">完成</span>
            </div>
        </div>
    </div>
</div>
</body>
<!--绑定手机结束-->
<script src="${basePath}/resources/eduapp/js/commonMenu.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
    window.onload=function () {
        if (getchange()==1){
            $("#user_setting").addClass('leftmenu-title-down');
            $('#user_setting').siblings('.subtab').addClass('tab-down');
            $('#user_setting').siblings('.subtab').find('a').eq(0).addClass('subtab-list-active');
    }};
</script>
<%@ include file="../common/common_footer.jsp" %>
<script type="text/javascript">
    $(document).ready(function () {
        var ajaxCheckUrl = basecontextPath+"/member/checkAccountExist";
        var url = basecontextPath + "/user/info"
        $.getJSON(url, function (data) {
            if (data.code == 1) {

                $("#id").val(data.data.id);
                $("#avatarUrl").attr("src", data.data.avatarUrl);
                $(".personal_information_list a").each(function () {
                    for (var key in data.data) {
                        if ($(this).attr("id") == key) {
                            $(this).text(data.data[key]);
                        }
                    }
                });
                if($("#email").text() != ""){
                    $("#bind_email").text("更换")
                }
                if($("#mobilePhone").text() != ""){
                    $("#bind_tel").text("更换")
                }
                $("#avatar").attr("src",data.data['avatarUrl']);
            }
        });


        $(".personal_nav li").on("click", function () {
            $(this).addClass("currents").siblings().removeClass("currents");
        });
        //textarea框获取焦点的变化
        $(".personal_opinion_textarea textarea").on({
            focus: function () {
                $(this).addClass("getFocus");
            },
            blur: function () {
                $(this).removeClass("getFocus");
            }
        });
        //input框获取焦点的变化
        $(".personal_input_group input").on({
            focus: function () {
                $(this).addClass("getFocus");
            },
            blur: function () {
                $(this).removeClass("getFocus");
            }
        });
        //按钮状态变化
        btnGetDownClass("#cancel_collection_btn");
        btnGetDownClass(".personal_input_group span");
        btnGetDownClass("#personal_fileimg_btn");
        btnGetDownClass(".personal_opinion_btn span");
        btnGetDownClass("#personal_info_update");
        btnGetDownClass(".popup_group span");
        btnGetDownClass(".personal_fileimg_display span");
        //上传头像

        $("#personal_fileimg_btn").on("click", function () {
            $("#personal_input_fileimg").click();
            getUploadImg("#personal_input_fileimg", "#file_dis", "#fileimg");
            $(".personal_fileimg_display").delay(4000).show();
        });
        $("#fileimg").on("click", function () {
            $.ajaxFileUpload({
                url: basecontextPath+'/user/updateAvatar',
                type: 'post',
                fileElementId: ["personal_input_fileimg"],
                dataType: 'json',
                secureuri: false,
                data: {},
                success: function (data) {
                    if(data.code == 1) {
                        $(".personal_fileimg_display").hide();
                        layer.msg("上传成功");
                        window.location.reload();
                    }else {
                        layer.msg("上传失败")
                    }
                }
            });
        })
        //性别选择
        $(".popup_sex").on("click", "b", function () {
            $(this).addClass("currents").siblings().removeClass("currents");
        });
        $("#personal_info_update").on("click",function(){
            layer.open({
                type:1,
                title:[''],
                area:['340px','340px'],
                shadeClose:false,
                content:$("#bind_personal_info"),
                success:function(){
                    if ($("#genderShow").text()=="男"){
                        $(".popup_sex").find("b").eq(0).addClass("currents").siblings().removeClass("currents");
                    }else if ($("#genderShow").text()=="女"){
                        $(".popup_sex").find("b").eq(1).addClass("currents").siblings().removeClass("currents");
                    }
                },
                cancel:function(){
                    clearPopupInputData("#updateinfo_wraper");
                    $("#updateinfo_wraper").show();
                    $("#updateinfosuccess_wraper").hide();
                }
            });
        });
        $("#updateinfosuccess_btn").on("click",function(){
            clearPopupInputData("#updateinfo_wraper");
            layer.closeAll();
            $("#updateinfo_wraper").show();
            $("#updateinfosuccess_wraper").hide();
            window.location.reload() ;
        });


        //修改个人信息input输入框验证
        var flagname = 0;
        $("#name_r").on("blur", function () {
            var name = $.trim($(this).val());
            if (name.length == 0) {
                $("#nameError").text("请输入姓名");
                flagname = 0;
            } else {
                $("#nameError").text("");
                flagname = 1;
            }
        });
        //修改个人信息提交事件
        $("#bindinfo_btn").on("click", function () {
            var data = {
                username: $.trim($("#name_r").val()),
                gender: $(".popup_sex").find("b.currents").attr("data-gender"),
            };
            console.log(data);
            if (flagname == 1) {
                $.ajax({
                    type: "post",
                    url: basecontextPath+"/user/updateBasicInfo",
                    data: data,
                    dataType: 'json',
                    success:function(data){
                        $("#updateinfo_wraper").hide();
                        $("#updateinfosuccess_wraper").show();
                        if (data.code==1){
                            $("#updateinfosuccess_wraper p").text("修改成功");
                        }else {
                            $("#updateinfosuccess_wraper p").text(data.msg);
                        }
                    }
                });
            }
        });
        //绑定手机号弹出框
        $("#bind_tel").on("click",function(){
            layer.open({
                type:1,
                title:[''],
                area:['340px'],
                shadeClose:false,
                content:$("#bind_tel_box"),
                cancel:function(){
                    clearPopupInputData("#bindtel_wraper");
                    $("#bindtel_wraper").show();
                    $("#bindtelsuccess_wraper").hide();
                }
            });
        });
        $("#bindtelsuccess_btn").on("click",function(){
            clearPopupInputData("#bindtel_wraper");
            layer.closeAll();
            $("#bindtel_wraper").show();
            $("#bindtelsuccess_wraper").hide();
            window.location.reload() ;
        });
        //绑定手机input输入框验证
        var flagtelnumber = flagpassword_t = flagverificationcode_t = 0;
        $("#telnumber").on("blur", function () {
            var telnumber = $.trim($(this).val());
            if (telnumber.length == 0) {
                $("#telnumberError").text("请输入手机号");
                flagtelnumber = 0;
            } else if (!checkTel(telnumber)) {
                $("#telnumberError").text("请输入正确的手机号");
                flagtelnumber = 0;
            } else {
                $.ajax({
                    type:"post",
                    url:ajaxCheckUrl,
                    data:{username:telnumber},//cs修改
                    dataType:"json",
                    success:function(data){
                        if (data.code==1){
                            $("#telnumberError").text("");
                            flagtelnumber = 1;
                        }else {
                            $("#telnumberError").text("手机号已被注册");
                            flagtelnumber = 0;
                        }
                    }
                });
            }
        });
        $("#password_t").on("blur", function () {
            var password_t = $.trim($(this).val());
            if (password_t.length == 0) {
                $("#password_tError").text("请输入密码");
                flagpassword_t = 0;
            } else {
                $.ajax({
                    type:"post",
                    url:basecontextPath+"/user/checkPassword",
                    data:{password:password_t},//cs修改
                    dataType:"json",
                    success:function(data){
                        if (data.code==1){
                            $("#password_tError").text("");
                            flagpassword_t = 1;
                        }else {
                            $("#password_tError").text("密码不正确");
                            flagpassword_t = 0;
                        }
                    }
                });
            }
        });
//        $("#verificationcode_t").on("blur", function () {
//            var verificationcode_t = $.trim($(this).val());
//            $.ajax({
//                type: "post",
//                url: "",
//            });
//            if (verificationcode_t.length == 0) {
//                $("#verificationcode_tError").text("请输入验证码");
//                flagverificationcode_t = 0;
//            } else {
//                $("#verificationcodeError").text("");
//                flagverificationcode_t = 1;
//            }
//        });
        //绑定手机提交事件
        $("#bindtel_btn").on("click", function () {
            var data = {
                mobilePhone: $.trim($("#telnumber").val()),
                password: $.trim($("#password_t").val()),
//                verificationcode: $.trim($("#verificationcode_t").val())
            };
            console.log(data);
            if (flagtelnumber == 1 && flagpassword_t == 1) {
                $.ajax({
                    type: "post",
                    url: basecontextPath+"/user/rebindMobile",
                    data: data,
                    dataType: 'json',
                    success:function(data){
                        $("#bindtel_wraper").hide();
                        $("#bindtelsuccess_wraper").show();
                        if (data.code==1){
                            $("#bindtelsuccess_wraper p").text("绑定手机成功");
                        }else {
                            $("#bindtelsuccess_wraper p").text(data.msg);
                        }
                    }
                });
            }
        });
        //绑定邮箱弹出框
        $("#bind_email").on("click",function(){
            layer.open({
                type:1,
                title:[''],
                area:['340px'],
                shadeClose:false,
                content:$("#bind_email_box"),
                cancel:function(){
                    clearPopupInputData("#bindemail_wraper");
                    $("#bindemail_wraper").show();
                    $("#bindemailsuccess_wraper").hide();
                }
            });
        });
        $("#bindemailsuccess_btn").on("click",function(){
            clearPopupInputData("#bindemail_wraper");
            layer.closeAll();
            $("#bindemail_wraper").show();
            $("#bindemailsuccess_wraper").hide();
            window.location.reload() ;
        });


        //绑定邮箱input输入框验证
        var flagemail = flagpassword_e = flagverificationcode_e = 0;
        $("#emails").on("blur", function () {
            var email = $.trim($(this).val());
            if (email.length == 0) {
                $("#emailError").text("请输入邮箱");
                flagemail = 0;
            } else if (!checkEmail(email)) {
                $("#emailError").text("请输入正确的邮箱");
                flagemail = 0;
            } else {
                $.ajax({
                    type:"post",
                    url:ajaxCheckUrl,
                    data:{username:email},//cs修改
                    dataType:"json",
                    success:function(data){
                        if (data.code==1){
                            $("#emailError").text("");
                            flagemail = 1;
                        }else {
                            $("#emailError").text("邮箱已被注册");
                            flagemail = 0;
                        }
                    }
                });
            }
        });
        $("#password_e").on("blur", function () {
            var password_e = $.trim($(this).val());
            if (password_e.length == 0) {
                $("#password_eError").text("请输入密码");
                flagpassword_e = 0;
            } else {
                $.ajax({
                    type:"post",
                    url:basecontextPath+"/user/checkPassword",
                    data:{password:password_e},//cs修改
                    dataType:"json",
                    success:function(data){
                        if (data.code==1){
                            $("#password_eError").text("");
                            flagpassword_e = 1;
                        }else {
                            $("#password_eError").text("密码不正确");
                            flagpassword_e = 0;
                        }
                    }
                });
            }
        });
        $("#verificationcode_e").on("blur", function () {
            var verificationcode_e = $.trim($(this).val());
            $.ajax({
                type: "post",
                url: "",
            });
            if (verificationcode_e.length == 0) {
                $("#verificationcode_eError").text("请输入验证码");
                flagverificationcode_e = 0;
            } else {
                $("#verificationcode_eError").text("");
                flagverificationcode_e = 1;
            }
        });
        //绑定邮箱提交事件
        $("#bindemail_btn").on("click", function () {
            var data = {
                email: $.trim($("#emails").val()),
                password: $.trim($("#password_e").val()),
                verificationcode: $.trim($("#verificationcode_e").val())
            };
            console.log(data);
            if (flagemail == 1 && flagpassword_e == 1) {
                $.ajax({
                    type: "post",
                    url: basecontextPath+"/user/rebindEmail",
                    data: data,
                    dataType: 'json',
                    success:function(data){
                        $("#bindemail_wraper").hide();
                        $("#bindemailsuccess_wraper").show();
                        if (data.code==1){
                            $("#bindemailsuccess_wraper p").text("绑定邮箱成功");
                        }else {
                            $("#bindemailsuccess_wraper p").text(data.msg);
                        }
                    }
                });
            }
        });

    });


    function getUploadImg(obj, obj2, obj3) {
        $(obj).on("change", function () {
            var fileList = this.files[0];
            if (fileList == undefined) {
                $(obj2).attr("src", "");
                $(obj2).hide();
                $(obj3).hide();
                return false;
            }
            if (!/image\/\w+/.test(fileList.type)) {
                alert("请选择图片");
                return false;
            }
            var reader = new FileReader();
            reader.readAsDataURL(fileList);
            reader.onload = function (e) {
                $(obj2).attr("src", e.target.result);
                $(obj2).show();
                $(obj3).css("display", "inline-block");
            }
        })
    }
    //按钮状态变化
    function btnGetDownClass(obj) {
        $(obj).on({
            mousedown: function () {
                $(this).addClass("btndown");
            },
            mouseup: function () {
                $(this).removeClass("btndown");
            },
            mouseleave: function () {
                $(this).removeClass("btndown");
            }
        });
    }
    //验证邮箱和手机号
    function checkEmail(email) {
        var emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        if (emailreg.test(email)) {
            return true;
        } else {
            return false;
        }
    }

    function checkTel(tel) {
        var telreg = /^0?1(3|5|8)\d{9}$/;
        if (telreg.test(tel)) {
            return true;
        } else {
            return false;
        }
    }
    //清除input输入框内容
    function clearPopupInputData(obj){
        $(obj).find("input").val("");
        $(obj).find("i").removeClass("successful");
        $(obj).find(".popup_tips b").text("");
    }

</script>


</html>
