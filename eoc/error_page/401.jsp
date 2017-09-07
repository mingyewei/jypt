<%@ page import="org.apache.commons.lang3.StringUtils" %>
<%@ page import="org.springframework.beans.factory.annotation.Value" %>
<%@ page import="java.io.PrintWriter" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%!
    public static final String AJAX_HEADER_VALUE = "XMLHttpRequest";
    public static final String AJAX_HEADER = "X-Requested-With";
    private String jsonUnLoginResponse = "{\"code\":11,\"msg\":\"not login\"}";
    @Value("${sso.local.server}")
    private String ssoLocalServer;
%>
<%

    String requestHeader = request.getHeader(AJAX_HEADER);

    //如果请求头为空,或者不等于AJAX_HEADER_VALUE,就是正常的http请求,跳转到登录页
    if (StringUtils.isBlank(requestHeader) || !AJAX_HEADER_VALUE.equals(requestHeader)) {
        response.sendRedirect(ssoLocalServer);
        return;
    } else if (AJAX_HEADER_VALUE.equals(requestHeader)) {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json; charset=utf-8");
        response.setStatus(200);
        PrintWriter writer = response.getWriter();
        try {
            writer.write(jsonUnLoginResponse);
            writer.flush();
        } catch (Exception e) {

        }finally {
            writer.close();
        }
        return;
    }
%>
