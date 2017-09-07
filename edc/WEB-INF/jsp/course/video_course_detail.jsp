<%--
  Created by IntelliJ IDEA.
  User: renxi
  Date: 2017/5/2
  Time: 11:06
  To change this template use File | Settings | File Templates.
--%>

<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<head>
    <title>培训课程</title>
</head>
<%@ include file="../common/common_header.jsp"%>
<div class="detial-list">
    <%@ include file="../common/common-file.jsp"%>
    <div class="vedio-box" width="955px" height="530px" id='videoFlv'>
        <%--<video src="" controls="controls" >您的浏览器不支持video标签。请升级...<ideo>--%>
    </div>
</div>
<%@ include file="../common/common_footer.jsp"%>
<script type="text/javascript" src="${basePath}/resources/ckplayer/ckplayer.js" charset="utf-8"></script>
<script>
    var vedio=$('.vedio-box');
    $('.course-file-text').before(vedio);
    $('#videoFlv').css('margin-top','30px')
</script>
