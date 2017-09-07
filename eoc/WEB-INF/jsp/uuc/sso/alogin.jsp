<%@ page contentType="text/html; charset=UTF-8"%>
var call_call_back = '<%=request.getAttribute("callBackUrl")%>' ;
var call_cas_url = '<%=request.getAttribute("casLoginUrl")%>';
var redirct_url = '<%=request.getAttribute("redirectUrl")%>' ;
var clientId = '<%=request.getAttribute("client")%>' ;
call_cas_url += "?service=" + encodeURIComponent(call_call_back);
var form ;
var cas_iframe = '${casFrame}' ;
var isLogin = true ;
var aLogin = function () {
$.getScript(call_cas_url + '&isajax=true&ischeck=true&n=' + new Date().getTime(),
    function(){
              if(isLogin) {
                form = $('<form></form>').attr({
                action: call_cas_url,
                method: 'get',
                target: 'ssoLoginFrame',
                id: 'ssoLoginForm'
                });
                form.append('<input type="hidden" name="isajax" value="true" />');
                form.append('<input type="hidden" name="callback" value="'+redirct_url+'" />');
                form.append('<input type="hidden" name="service" value="'+call_call_back+'" />');
                form.append('<input type="hidden" name="client" value="'+clientId+'" />');

                form.appendTo($('body'));

                $('body').append($('<iframe/>').attr({
                style: "display:none;width:0;height:0",
                id: "ssoLoginFrame",
                name: "ssoLoginFrame",
                src: "javascript:false;"
                }));
                form.submit();
                }
        });
};
aLogin() ;


window.feedBackUrlCallBack = function (data) {
        if(data.flag == 1) {
                var bodyELe = document.getElementsByTagName('body')[0] ;
                var iframeEle = document.createElement("iframe") ;
                iframeEle.setAttribute("name","redirect_frame")
                iframeEle.src = cas_iframe;
                bodyELe.appendChild(iframeEle);
                }else {
                if($("#ssoLoginForm")){
                $("#ssoLoginForm").remove();
                }
                if($("#ssoLoginFrame")){
                $("#ssoLoginFrame").remove();
                }
        }
}



