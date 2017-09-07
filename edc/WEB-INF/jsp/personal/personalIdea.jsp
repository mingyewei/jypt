<%@ page language="java" contentType="text/html;charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="../common/include-common.jsp"%>
<div class="personal-suggest-box">
    <ul class="share-suggest-tab">
        <li class="float-lt suggest-tab-active">意见反馈</li>
        <li class="float-lt">我的反馈</li>
    </ul>
    <div class="personal-post-suggest">
       <ul>
           <li class="personal-post-suggest-checked">
               <label  class="hand">
                   <input type="radio" name="type" value="">意见
               </label>
           </li>
            <li>
               <label class="hand">
                   <input type="radio" name="type" value="">建议
               </label>
           </li>
            <li>
               <label class="hand">
                   <input type="radio" name="type" value="">投诉
               </label>
           </li>
            <li>
               <label class="hand">
                   <input type="radio" name="type" value="">其他
               </label>
           </li>
       </ul>
       <textarea placeholder="请输入具体的反馈内容，限制400字" maxlength="400" class="border-ra personal-suggest-text"></textarea>
       <div class="personal-suggest-btn">提交</div>
    </div>
    <div class="personal-my-suggest dis-none">
        <ul class="personal-my-suggest-box">

        </ul>
        <div id="personal-suggest-page"></div>
    </div>
</div>
<script type="text/javascript" src="${basePath}/resources/edcapp/js/personalIdea.js"></script>
