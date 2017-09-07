<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${!empty canLogin}" >
var username = '<%=request.getAttribute("username")%>';
var password = '<%=request.getAttribute("password")%>';
var call_call_back = '<%=request.getAttribute("callBackUrl")%>'
var call_cas_url = '<%=request.getAttribute("casLoginUrl")%>';
var redirct_url = '<%=request.getAttribute("redirectUrl")%>'
var loginTicket;
call_cas_url += "?service=" + encodeURIComponent(call_call_back);
var excution;
var msg ;
var form ;
var wait_time = 10000 ;
var cas_iframe = '${casFrame}'
//获取lt
var flushLoginTicket = function () {
    $.getScript(call_cas_url + '&get-lt=true&n=' + new Date().getTime(),
        function () {
            form = $('<form></form>').attr({
                action: call_cas_url,
                method: 'post',
                target: 'ssoLoginFrame',
                id: 'ssoLoginForm'
            });
            form.append('<input type="hidden" name="username" value="' + username + '" />');
            form.append('<input type="hidden" name="password" value="' + password + '" />');
            form.append('<input type="hidden" name="isajax" value="true" />');
            form.append('<input type="hidden" name="isframe" value="true" />');
            form.append('<input type="hidden" name="lt" value="' + loginTicket + '">');
            form.append('<input type="hidden" name="_eventId" value="submit" />');
            form.append('<input type="hidden"  id="execution" name="execution" value="' + excution + '">');
            form.append('<input type="hidden" name="callback" value="'+redirct_url+'" />');
            form.append('<input type="hidden" name="waitTime" value="'+wait_time+'" />');
            form.appendTo($('body'));

            $('body').append($('<iframe/>').attr({
                style: "display:none;width:0;height:0",
                id: "ssoLoginFrame",
                name: "ssoLoginFrame",
                src: "javascript:false;"
            }));
            
            form.submit();
        });
}

flushLoginTicket();

window.feedBackUrlCallBack = function (data) {
      if(data.flag == 1) {
        var bodyELe = document.getElementsByTagName('body')[0] ;
        var iframeEle = document.createElement("iframe") ;
        iframeEle.setAttribute("name","redirect_frame")
        iframeEle.src = cas_iframe;
        bodyELe.appendChild(iframeEle);
      }else {
        $(".error_msg").text(data.msg) ;
        if($("#ssoLoginForm")){
        $("#ssoLoginForm").remove();
        }
        if($("#ssoLoginFrame")){
        $("#ssoLoginFrame").remove();
        }
      }
}

</c:if>

<c:if test="${empty canLogin}" >
    alert("用户名或密码错误") ;
</c:if>
