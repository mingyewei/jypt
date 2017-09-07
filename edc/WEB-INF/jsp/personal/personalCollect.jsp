<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<div class="collect-box">
    <div class="collect-cancel">
        <label class="collect-cancel-all hand">
            <input type="checkbox">全选
        </label>
        <div class="collect-cancel-btn border-ra">取消收藏</div>
    </div>
    <ul>
    </ul>
    <div class="collect-laypage" id="collect-paging"></div>
</div>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/personalCollect.js"></script>
