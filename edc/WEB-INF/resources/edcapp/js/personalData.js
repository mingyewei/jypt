$(document).ready(function() {
    btnGetDownClass($('#personal-head-portrait-btn'));
    $.ajax({
        type: "post",
        url: contextPath +"/user/info",
        dataType: "json",
        success: function(data) {
            var data=data.data;
            if(!data.username==""){
                $('.user-name-data').html(data.username);
            }
            if(!data.avatarUrl==""){
                $('#personal-portrait-img').attr('src',data.avatarUrl);
                $('#personal-portrait-img').css({'width':'100%','height':'100%','overflow':'hidden'})
            }
            if(!data.genderShow==""){
                if(data.genderShow==0){
                    $('.sex-data').html('男');
                }else if(data.genderShow==1){
                    $('.sex-data').html('女');
                }else{
                    $('.sex-data').html(data.genderShow);
                }
            }
            if(!data.age==""){
                $('.age-data').html(data.age);
            }
            if(!data.mobilePhone==""){
                $('.phone-num-data').html(data.mobilePhone);
                $('.personal-bind-phone').hide();
            }
            if(!data.email==""){
                $('.email-data').html(data.email);
                $('.personal-bind-email').hide();
            }
            if(!data.idCard==""){
               $('.idcard-data').html(data.idCard);
            }
            if(!data.orgName==""){
                $('.orgName-data').html(data.orgName);
            }
        }
    })

})
/*上传头像*/
$('#personal-head-portrait-btn').on('click', function() {
    $('#personal-portrait-input').click();
    new uploadPreview({
        UpBtn: "personal-portrait-input",
        DivShow: "personal-portrait-box",
        ImgShow: "personal-portrait-img",
        Width: 140,
        Height: 140
    });
})
$('#personal-portrait-input').on('change',function(){
    ajaxFileUpload({
        url: contextPath + '/user/updateAvatar',
        type: 'post',
        fileElementId: ["personal-portrait-input"],
        //fileElementId:'file1',
        dataType: 'json',
        secureuri: false,
        data: {},
        success: function (data, status) {
        }
    });
    location.reload();
})

    /*保存姓名 性别 年龄修改*/
$('.personal-save-name').on('click', function() {
    var value = $(this).siblings('input').val();
    if (!value == '') {
        $.ajax({
            type: "get",
            url: contextPath+"/user/updateUser",
            dataType: "json",
            data: {'username':value},
            success: function(data) {
                if(data.code==1){
                    //dis($('.personal-save-name'))
                    //$(this).parent().siblings('div').find('.personal-msg-detial').html(value);
                    //layer.msg('修改成功')
                    location.reload();
                }else{
                    layer.msg('修改失败')
                    dis($('.personal-save-name'))
                }
            }
        });

    }else{
        layer.msg('请填写姓名')
    }
})

//$('.personal-save-grade').on('click', function() {
//    var value = $(this).siblings('input').val();
//    if (!value == '' && !isNaN(value)) {
//        dis($(this))
//        $(this).parent().siblings('div').find('.personal-msg-detial').html(value);
//    }
//})
$('.person-sex').on('click', function() {
    $(this).addClass('person-sex-active');
    $(this).siblings().removeClass('person-sex-active')
})
$('.personal-save-sex').on('click', function() {
    var index;
    $('.person-sex').each(function() {
        if ($(this).hasClass('person-sex-active')) {
            index = $(this).index();
        }
    })
    $.ajax({
        type: "get",
        url: contextPath+"/user/updateUser",
        dataType: "json",
        data: {'gender':index},
        success: function(data) {
            if(data.code==1){
                location.reload();
                //dis($('.personal-save-sex'))
                //if (index == 0) {
                //    $('.personal-save-sex').parent().siblings('div').find('.personal-msg-detial').html('男');
                //} else {
                //    $('.personal-save-sex').parent().siblings('div').find('.personal-msg-detial').html('女');
                //}
                //layer.msg('修改成功')
            }else{
                layer.msg('修改失败')
                dis($('.personal-save-sex'))
            }
        }
    });
    dis($(this))
})
$('.personal-cancle').on('click', function() {
    dis($(this))
    $(this).siblings('input').val('')
})
$('.personal-msg-modification').on('click', function() {
        dis($(this))
    })
//input框获取焦点的变化
$(".bind-phone-box input").on({
    focus:function(){
        $(this).addClass("getFocus");
        $(this).removeClass('errorMsg');
        $(this).parent().siblings('.popup_tips').find('p').html('');
      }
});
    /*绑定手机*/
$('.personal-bind-phone').on('click', function() {
        var obj = {
            "title": "绑定手机",
            "phoneInput": "请输入手机号",
            "passWordInput": "请输入登陆密码",
            "type": "bind-phone"
        }
        changeLogBoxMsg(obj)

    })
    /*修改手机*/
$('.personal-modify-phone').on('click', function() {
        var obj = {
            "title": "修改手机",
            "phoneInput": "请输入手机号",
            "passWordInput": "请输入登陆密码",
            "type": "modify-phone"
        }
        changeLogBoxMsg(obj);

        $(this).parent().css('display', 'inline-block')
})
    /*绑定邮箱*/
$('.personal-bind-email').on('click', function() {
        var obj = {
            "title": "绑定邮箱",
            "phoneInput": "请输入邮箱",
            "passWordInput": "请输入登陆密码",
            "type": "bind-email"
        }
        changeLogBoxMsg(obj);

    })
    /*修改邮箱*/
$('.personal-modify-email').on('click', function() {
        var obj = {
            "title": "修改邮箱",
            "phoneInput": "请输入邮箱",
            "passWordInput": "请输入登陆密码",
            "type": "modify-email"
        }
        changeLogBoxMsg(obj);
        $(this).parent().css('display', 'inline-block')

})
$('#phone-number').on('blur',function(){
    $('#phone-number').removeClass("getFocus");
    var type=$('#change-phone-or-email').attr('type');
    var phoneNum=$('#phone-number').val();
    if(type=='modify-phone'||type=='bind-phone'){
        if(phoneNum==''||!checkTel(phoneNum)){
            $('#error-phone').html("请输入正确的手机号")
            $('#phone-number').addClass('errorMsg')
        }

    }
    if(type=='bind-email'||type=='modify-email'){
        if(phoneNum==''||!checkEmail(phoneNum)){
            $('#error-phone').html("请输入正确的邮箱")
            $('#phone-number').addClass('errorMsg')
        }
    }
    $(this).attr('data-sub',1)
})

$('#change-phone-or-email').on('click',function(){
    $('#phone-number').blur();
    var type=$(this).attr('type');
    var phoneNum=$('#phone-number').val();
    var pwd=$('#pwd').val();
    if(pwd==''){
        $('#pwd').addClass('errorMsg');
        $('#error-email').html('请输入正确的登录密码')
        return false;
    }
    if(type=='bind-email'||type=='modify-email'){
        $.ajax({
            type: "get",
            url: contextPath+'/user/rebindEmail',
            dataType: "json",
            data: {'email':phoneNum,'password':pwd},
            success: function(data) {
                if(type=='modify-email'){
                    $('.prompt-message-btn-title span').text('修改邮箱');
                }
                if(type=='bind-email'){
                    $('.prompt-message-btn-title span').text('绑定邮箱');
                }
                if(data.code==0){
                    if(type=='modify-email'){
                        $('.prompt-bind-success').text('修改失败');
                    }else{
                        $('.prompt-bind-success').text('绑定失败');
                    }
                    $('.popup_close').click();
                    $('.prompt-detial-msg').html(data.msg)
                    $('.popup_shade').show();
                    $('.prompt-message-box').show();
                    var src=contextPath+'/resources/edcapp/img/icon_mail_d.png';
                    $('.prompt-message-content').find('img').attr('src',src)
                }
                if(data.code==1){
                    if(type=='modify-email'){
                        $('.prompt-bind-success').text('修改成功');
                    }
                    $('.popup_close').click();
                    $('.email-data').html(phoneNum)
                    $('.prompt-detial-msg').html('邮箱为'+phoneNum)
                    $('.popup_shade').show();
                    $('.prompt-message-box').show();
                    var src=contextPath+'/resources/edcapp/img/icon_phone.png';
                    $('.prompt-message-content').find('img').attr('src',src);
                }
            }
        });
    }else{
        $.ajax({
            type: "get",
            url: contextPath+'/user/rebindMobile',
            dataType: "json",
            data: {'mobilePhone':phoneNum,'password':pwd},
            success: function(data) {
                if(type=='modify-phone'){
                   $('.prompt-message-btn-title span').text('修改手机');
                }
                if(data.code==0){
                    if(type=='modify-phone'){
                        $('.prompt-bind-success').text('修改失败');
                    }else{
                        $('.prompt-bind-success').text('绑定失败');
                    }
                    $('.popup_close').click();
                    $('.prompt-detial-msg').html(data.msg)
                    $('.popup_shade').show();
                    $('.prompt-message-box').show();
                    var src=contextPath+'/resources/edcapp/img/icon_phone_d.png';
                    $('.prompt-message-content').find('img').attr('src',src)
                }
                if(data.code==1){
                    if(type=='modify-phone'){
                        $('.prompt-bind-success').text('修改成功');
                    }
                    $('.popup_close').click();
                    $('.phone-num-data').html(phoneNum)
                    $('.prompt-detial-msg').html('手机号为'+phoneNum)
                    $('.popup_shade').show();
                    $('.prompt-message-box').show();
                    var src=contextPath+'/resources/edcapp/img/icon_phone.png';
                    $('.prompt-message-content').find('img').attr('src',src);

                }
            }
        });
    }
})

/*关闭修改手机*/
$('.popup_close').on('click',function(){
    $('.popup_shade').hide();
    $('.bind_phone_box').hide();
})

$('.prompt-message-close').on('click',function(){
    $('.popup_shade').hide();
    $('.prompt-message-box').hide();
})
$('.prompt-message-btn').on('click',function(){
    $('.popup_shade').hide();
    $('.prompt-message-box').hide();
})
function changeLogBoxMsg(msgData) {
    $('#phone-number').removeClass('errorMsg');
    $('#pwd').removeClass('errorMsg');
    $('#phone-number').val('');
    $('#pwd').val('');
    $('#error-phone').html('');
    $('#error-email').html('');
    $('.popup_shade').show();
    $('.bind_phone_box').show();
    $('.popup_nav li').html(msgData.title);
    $('#phone-number').attr('placeholder', msgData.phoneInput);
    $('#pwd').attr('placeholder', msgData.passWordInput);
    $('#change-phone-or-email').attr('type', msgData.type);
}

function dis($this) {
    $this.parent().hide();
    $this.parent().siblings().css('display', 'inline-block');
}
//验证邮箱和手机号
function checkEmail(email){
    var emailreg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    if (emailreg.test(email)){
        return true;
    }else{
        return false;
    }
}
function checkTel(tel){
    var telreg=/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (telreg.test(tel)){
        return true;
    }else{
        return false;
    }
}
function uploadPreview(setting) {
    var _self = this;
    /*
     *author:周祥
     *date:2014年12月11日
     *work:判断为null或者空值
     */
    /**调用代码:
     * new uploadPreview({ UpBtn: "up_img", DivShow: "imgdiv", ImgShow: "imgShow" });
     *参数说明:
     *UpBtn:选择文件控件ID;
     *DivShow:DIV控件ID;
     *ImgShow:图片控件ID;
     *Width:预览宽度;
     *Height:预览高度;
     *ImgType:支持文件类型 格式:["jpg","png"];
     *callback:选择文件后回调方法;
     */
    _self.IsNull = function(value) {
        if (typeof(value) == "function") {
            return false;
        }
        if (value == undefined || value == null || value == "" || value.length == 0) {
            return true;
        }
        return false;
    }

    _self.DefautlSetting = {
        UpBtn: "",
        DivShow: "",
        ImgShow: "",
        Width: 100,
        Height: 100,
        ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
        ErrMsg: "选择文件错误,图片类型必须是(gif,jpeg,jpg,bmp,png)中的一种",
        callback: function() {}
    };

    _self.Setting = {
        UpBtn: _self.IsNull(setting.UpBtn) ? _self.DefautlSetting.UpBtn : setting.UpBtn,
        DivShow: _self.IsNull(setting.DivShow) ? _self.DefautlSetting.DivShow : setting.DivShow,
        ImgShow: _self.IsNull(setting.ImgShow) ? _self.DefautlSetting.ImgShow : setting.ImgShow,
        Width: _self.IsNull(setting.Width) ? _self.DefautlSetting.Width : setting.Width,
        Height: _self.IsNull(setting.Height) ? _self.DefautlSetting.Height : setting.Height,
        ImgType: _self.IsNull(setting.ImgType) ? _self.DefautlSetting.ImgType : setting.ImgType,
        ErrMsg: _self.IsNull(setting.ErrMsg) ? _self.DefautlSetting.ErrMsg : setting.ErrMsg,
        callback: _self.IsNull(setting.callback) ? _self.DefautlSetting.callback : setting.callback
    };

    _self.getObjectURL = function(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }
    _self.Bind = function() {
        document.getElementById(_self.Setting.UpBtn).onchange = function() {
            if (this.value) {
                if (!RegExp("\.(" + _self.Setting.ImgType.join("|") + ")$", "i").test(this.value.toLowerCase())) {
                    alert(_self.Setting.ErrMsg);
                    this.value = "";
                    return false;
                }
                if (navigator.userAgent.indexOf("MSIE") > -1) {
                    try {
                        document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                        document.getElementById(_self.Setting.ImgShow).style.height = _self.Setting.Height + 'px';
                    } catch (e) {
                        var div = document.getElementById(_self.Setting.DivShow);
                        this.select();
                        top.parent.document.body.focus();
                        var src = document.selection.createRange().text;
                        document.selection.empty();
                        document.getElementById(_self.Setting.ImgShow).style.display = "none";
                        div.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                        div.style.width = _self.Setting.Width + "px";
                        div.style.height = _self.Setting.Height + "px";
                        div.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = src;
                    }
                } else {
                    document.getElementById(_self.Setting.ImgShow).src = _self.getObjectURL(this.files[0]);
                    document.getElementById(_self.Setting.ImgShow).style.height = _self.Setting.Height + 'px';
                }
                _self.Setting.callback();
            }
        }
    }
    _self.Bind();
}

    function createUploadIframe(id, uri) {//id为当前系统时间字符串，uri是外部传入的json对象的一个参数
        //create frame
        var frameId = 'jUploadFrame' + id; //给iframe添加一个独一无二的id
        var iframeHtml = '<iframe id="' + frameId + '" name="' + frameId + '" style="position:absolute; top:-9999px; left:-9999px"'; //创建iframe元素
        if (window.ActiveXObject) {//判断浏览器是否支持ActiveX控件
            if (typeof uri == 'boolean') {
                iframeHtml += ' src="' + 'javascript:false' + '"';

            }
            else if (typeof uri == 'string') {
                iframeHtml += ' src="' + uri + '"';
            }
        }
        iframeHtml += ' />';
        jQuery(iframeHtml).appendTo(document.body); //将动态iframe追加到body中

        return jQuery('#' + frameId).get(0); //返回iframe对象
    }
    function createUploadForm(id, fileElementId, data) {//id为当前系统时间字符串，fileElementId为页面<input type='file' />的id，data的值需要根据传入json的键来决定
        //create form
        var formId = 'jUploadForm' + id; //给form添加一个独一无二的id
        var fileId = 'jUploadFile' + id; //给<input type='file' />添加一个独一无二的id
        var form = jQuery('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" ></form>'); //创建form元素
        if (data) {//通常为false
            for (var i in data) {
                jQuery('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form); //根据data的内容，创建隐藏域，这部分我还不知道是什么时候用到。估计是传入json的时候，如果默认传一些参数的话要用到。
            }
        }
        var oldElement = jQuery('#' + fileElementId); //得到页面中的<input type='file' />对象
        var newElement = jQuery(oldElement).clone(); //克隆页面中的<input type='file' />对象
        jQuery(oldElement).attr('id', fileId); //修改原对象的id
        jQuery(oldElement).before(newElement); //在原对象前插入克隆对象
        jQuery(oldElement).appendTo(form); //把原对象插入到动态form的结尾处



        //set attributes
        jQuery(form).css('position', 'absolute'); //给动态form添加样式，使其浮动起来，
        jQuery(form).css('top', '-1200px');
        jQuery(form).css('left', '-1200px');
        jQuery(form).appendTo('body'); //把动态form插入到body中
        return form;
    }

    function ajaxFileUpload(s) {//这里s是个json对象，传入一些ajax的参数
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout
        s = jQuery.extend({}, jQuery.ajaxSettings, s); //此时的s对象是由jQuery.ajaxSettings和原s对象扩展后的对象
        var id = new Date().getTime(); //取当前系统时间，目的是得到一个独一无二的数字
        var form = createUploadForm(id, s.fileElementId, (typeof (s.data) == 'undefined' ? false : s.data)); //创建动态form
        var io = createUploadIframe(id, s.secureuri); //创建动态iframe
        var frameId = 'jUploadFrame' + id; //动态iframe的id
        var formId = 'jUploadForm' + id; //动态form的id
        // Watch for a new set of requests
        if (s.global && !jQuery.active++) {//当jQuery开始一个ajax请求时发生
            jQuery.event.trigger("ajaxStart"); //触发ajaxStart方法
        }
        var requestDone = false; //请求完成标志
        // Create the request object
        var xml = {};
        if (s.global)
            jQuery.event.trigger("ajaxSend", [xml, s]); //触发ajaxSend方法
        // Wait for a response to come back
        var uploadCallback = function (isTimeout) {//回调函数
            var io = document.getElementById(frameId); //得到iframe对象
            try {
                if (io.contentWindow) {//动态iframe所在窗口对象是否存在
                    xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    xml.responseXML = io.contentWindow.document.XMLDocument ? io.contentWindow.document.XMLDocument : io.contentWindow.document;

                } else if (io.contentDocument) {//动态iframe的文档对象是否存在
                    xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    xml.responseXML = io.contentDocument.document.XMLDocument ? io.contentDocument.document.XMLDocument : io.contentDocument.document;
                }
            } catch (e) {
                handleError(s, xml, null, e);
            }
            if (xml || isTimeout == "timeout") {//xml变量被赋值或者isTimeout == "timeout"都表示请求发出，并且有响应
                requestDone = true; //请求完成
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error"; //如果不是“超时”，表示请求成功
                    // Make sure that the request was successful or notmodified
                    if (status != "error") {
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = uploadHttpData(xml, s.dataType); //根据传送的type类型，返回json对象，此时返回的data就是后台操作后的返回结果
                        // If a local callback was specified, fire it and pass it the data
                        if (s.success)
                            s.success(data, status); //执行上传成功的操作
                        // Fire the global callback
                        if (s.global)
                            jQuery.event.trigger("ajaxSuccess", [xml, s]);
                    } else
                        handleError(s, xml, status);
                } catch (e) {
                    status = "error";
                    handleError(s, xml, status, e);
                }

                // The request was completed
                if (s.global)
                    jQuery.event.trigger("ajaxComplete", [xml, s]);

                // Handle the global AJAX counter
                if (s.global && ! --jQuery.active)
                    jQuery.event.trigger("ajaxStop");

                // Process result
                if (s.complete)
                    s.complete(xml, status);

                jQuery(io).unbind();//移除iframe的事件处理程序

                setTimeout(function () {//设置超时时间
                    try {
                        jQuery(io).remove();//移除动态iframe
                        jQuery(form).remove();//移除动态form

                    } catch (e) {
                        jQuery.handleError(s, xml, null, e);
                    }

                }, 100)

                xml = null

            }
        }
        // Timeout checker
        if (s.timeout > 0) {//超时检测
            setTimeout(function () {
                // Check to see if the request is still happening
                if (!requestDone) uploadCallback("timeout");//如果请求仍未完成，就发送超时信号
            }, s.timeout);
        }
        try {

            var form = jQuery('#' + formId);
            jQuery(form).attr('action', s.url);//传入的ajax页面导向url
            jQuery(form).attr('method', 'POST');//设置提交表单方式
            jQuery(form).attr('target', frameId);//返回的目标iframe，就是创建的动态iframe
            if (form.encoding) {//选择编码方式
                jQuery(form).attr('encoding', 'multipart/form-data');
            }
            else {
                jQuery(form).attr('enctype', 'multipart/form-data');
            }
            jQuery(form).submit();//提交form表单

        } catch (e) {
           handleError(s, xml, null, e);
        }

        jQuery('#' + frameId).load(uploadCallback); //ajax 请求从服务器加载数据，同时传入回调函数
        return { abort: function () { } };

    }

   function uploadHttpData(r, type) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if (type == "script")
            jQuery.globalEval(data);
        // Get the JavaScript object, if JSON is used.
        if (type == "json")
            eval("data = " + data);
        // evaluate scripts within html
        if (type == "html")
            jQuery("<div>").html(data).evalScripts();

        return data;
    }
     function handleError( s, xhr, status, e ) 		{
// If a local callback was specified, fire it
        if ( s.error ) {
            s.error.call( s.context || s, xhr, status, e );
        }
        // Fire the global callback
        if ( s.global ) {
            (s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );
        }
    }


