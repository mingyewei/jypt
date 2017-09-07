$(document).ready(function(){
    document.onkeydown=function(event){
        e = event ? event : (window.event ? window.event : null);
        if(e.keyCode==13){
            //执行的方法
            $("#login_btn").click();
        }
    }
    // var ajaxCheckUrl = basecontextPath+"/uuc/checkUsername.do"
    var ajaxCheckUrl = "";
    var type=$('#login_btn').attr('type');
    //登录注册弹出框
    $(".head_login a").on("click",function(){
        $("#popup_box").show();
        $(".popup_shade").show();
    });
    $(".popup_close").on("click",function(){
        $("#popup_box").hide();
        $(".popup_shade").hide();
    })

    //input框获取焦点的变化
    $(".popup_group input").on({
        focus:function(){
            $(this).addClass("getFocus");
            $('#password').removeClass('errorMsg');
            $('#username').removeClass('errorMsg');
            $("#phone-msg").html("");
            $("#loginError").html("");
        },
        blur:function(){
            $(this).removeClass("getFocus");
        }
    });
    //登录注册按钮状态变化
    $("#login_btn").on({
        mousedown:function(){
            $(this).addClass("btndown");
        },
        mouseup:function(){
            $(this).removeClass("btndown");
        },
        mouseleave:function(){
            $(this).removeClass("btndown");
        }
    });
});


