<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!Doctype html>
<html>
<header>
    <script>
        var result = new Object() ;
        result.flag = '<%=request.getAttribute("resultFlag")%>' ;
        result.msg ='<%=request.getAttribute("msg")%>' ;
        parent.parent.feedBackUrlCallBack(result);
    </script>
</header>
<body>
</body>
</html>
