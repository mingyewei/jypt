<%--
  Created by IntelliJ IDEA.
  User: user
  Date: 2017/3/27
  Time: 17:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>上传测试页</title>
    <script type="text/javascript">
        function upload(){
            alert("//");
        }
    </script>
</head>
<body>
<form action="${pageContext.request.contextPath}/file/upload" method="post" enctype="multipart/form-data">
    文件上传1<input type="file" name="toUpload">
    文件上传1<input type="button" name="上传" onclick="upload()">
</form>
</body>
</html>
