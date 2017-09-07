$('.personal-password-box input').on('focus',function(){
    $(this).parent().siblings('.personal-password-error-tips').html('');
    $(this).addClass('getFocus');
    $(this).removeClass('errorMsg');

    $(this).val('');
})
$('.pwd-now').on('blur',function(){
    $(this).removeClass('getFocus');
  var pwdNow=$(this).val().trim();
    if(!pwdNow==''){
        $.ajax({
            type: "post",
            url: contextPath+'/user/checkPassword',
            dataType: "json",
            data: {'password':pwdNow},
            success: function(data) {
                if(!data.code==1){
                    $('.pwd-now').addClass('errorMsg')
                    $('.error-pwd-tip').html('密码错误');
                    $('.pwd-now').attr('data-pass',0)

                }
                if(data.code==1){
                    $('.pwd-now').attr('data-pass',1)
                }

            }
        });
    }

})
$('.new-pwd').on('blur',function(){
    $(this).removeClass('getFocus');
    var newPwd=$(this).val().trim();
    if(newPwd.length<6||newPwd.length>16){
         $('.error-new-pwd').html('请输入6至16位密码')
         $('.new-pwd').addClass('errorMsg')
    }
})
$('.personal-password-save-btn').on('click',function(){
    var newPwd=$('.new-pwd').val();
    var nowPwd=$('.pwd-now').val();
    var confirmPwd=$('.confirm-pwd').val();
    if(!$('.pwd-now').attr('data-pass')==1){
        $('.pwd-now').addClass('errorMsg')
        $('.error-pwd-tip').html('密码错误');
        return false;
    }
    if(newPwd==confirmPwd){
        $.ajax({
            type: "post",
            url: contextPath+"/user/resetPassword",
            dataType: "json",
            data: {'newPassword':confirmPwd,'password':nowPwd},
            success: function(data) {
                if(data.code==1){
                    layer.msg('修改密码成功');
                    $('.pwd-now').val('');
                    $('.new-pwd').val('');
                    $('.confirm-pwd').val("")
                }
            }
        });
    }else{
        $('.confirm-error').html('两次输入的密码不一致');
        $('.confirm-pwd').addClass('errorMsg');
    }
})
$(document).ready(function(){
    btnGetDownClass($('.personal-password-save-btn'));
})