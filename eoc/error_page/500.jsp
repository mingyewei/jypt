<%@ page import="org.springframework.beans.factory.annotation.Value" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%!
    @Value("${sso.local.server}")
    private String ssoLocalServer;
%>
<%
    response.sendRedirect("redirect:"+ssoLocalServer);
%>
