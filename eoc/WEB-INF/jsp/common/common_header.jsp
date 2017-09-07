<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<div class="index-header">
    <div class="indexlogo">
    </div>
    <div class="index-usetInfo">
        <%--<span class="inde-user-message">sdfsdf</span>--%>
        <span class="user-pic">
            <img class="userpic-img" src="" width="25" height="25"/>
            <a class="index-user-name" href="#">user</a>
            <i class="down-icon"></i>
           <ul class="down">
               <span id="jiantou"></span>
               <li><i class="password"></i><a href="${basePath}/uuc/toRePassword" >修改密码</a></li>
               <li><i class="exit"></i><a href="${basePath}/sso/logout">退出登录</a></li>
           </ul>
        </span>
    </div>
</div>
<script type="text/javascript">
    /*$(document).ready(function(){
        $.ajax({
            async:true,
            type:"get",
            url:basecontextPath+"/sso/ajaxAutoLogin",
            dataType: "script",
            ssuccess:function(data){

                console.log(data);
            }
        });
    });*/

    function loginUser() {
        $.ajax({
            type: "post",
            url: contextPath + "/user/getUser",
            dataType: "json",
            success: function (data) {
                if (data.code == 1) {
                    /*$('.head_oper ').attr('isLogin', true)
                    $('.head_login').hide();
                    $('.head-user-portrait').show();
                    $('.head-user-portrait').attr("dataId", data.data.id);
                    $(".head-user-portrait").attr("name", data.data.username);
                    $(".head-user-portrait img").attr("src", data.data.avatarUrl);
                    msgData();*/
                    $(".userpic-img").attr("src", data.data.avatarUrl);
                    $(".index-user-name").text( data.data.username);
                }
            }
        });
    }
    loginUser();
</script>