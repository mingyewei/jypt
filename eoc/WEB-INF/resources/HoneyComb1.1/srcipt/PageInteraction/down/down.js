/**
 * Created by Administrator on 2015/12/10 0010.
 */
/*
使用方法：
 <div id="operation-infosel" class=" patientlist_infosel">
     <p>筛选方式<i></i></p>
     <ul>
         <li><a href="#">编辑</a></li>
         <li><a href="#">删除</a></li>
         <li><a href="#">添加</a></li>
         <li><a href="#">登陆</a></li>
         <li><a href="#">退出</a></li>
     </ul>
 </div>
*/
/*下拉列表开始*/
$("#operation-infosel p").bind("click",function(){
    var ul = $("#operation-infosel ul");
    $("#operation-infosel p i").addClass("current");
    if (ul.css("display")=="none"){
        ul.slideDown("fast");
    }else{
        ul.slideUp("fast");
    };
});
$("#operation-infosel ul li a").bind("click",function(){
    var txt=$(this).text();
    $("#operation-infosel p").html(txt+"<i></i>");
    $("#operation-infosel ul").hide();
});
/*