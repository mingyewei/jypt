/*查询按钮按下与非按下状态*/
$(".hover").each(function () {
    $(this).mousedown(function () {
        $(this).addClass("table-searchbtn-down");
    });
    $(this).mouseup(function () {
        $(this).removeClass("table-searchbtn-down");
    });
    $(this).mouseleave(function () {
        $(this).removeClass("table-searchbtn-down");
    })
});
/*橘色按钮状态*/
$(".spanBg1").mousedown(function () {
    $(this).addClass("yellow_down");
});

$(".spanBg1").mouseup(function () {
    $(this).removeClass("yellow_down");
});

$(".spanBg1").mouseleave(function () {
    $(this).removeClass("yellow_down");
});
/* start 下拉列表*/
$(".patientlist_infosel p").bind("click", function (e) {
    e.stopPropagation();
    var ul = $(this).parents(".patientlist_infosel").find("ul");
    $(this).find("i").addClass("current");
    if (ul.css("display") == "none") {
        ul.slideDown("fast");
    } else {
        ul.slideUp("fast");
    }
});

$(".patientlist_infosel ul").on("click", "li a", function () {
    var txt = $(this).text();
    var value = $(this).attr('data-value');
    if (value) {
        $(this).parents(".patientlist_infosel").find("p").attr('data-value', value);
    }
    $(this).parents(".patientlist_infosel").find("p").html(txt + "<i></i>");
    $(this).parents(".patientlist_infosel").find("ul").hide();
});

$("body").on("click", function () {
    $(".patientlist_infosel p").find("i").removeClass("current");
    $(".patientlist_infosel ul").hide();
});
/*下拉列表结束*/
/* start  添加focus事件*/
var inputs = document.getElementsByClassName("input-focus");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("focus", function (event) {
        var target = event.target;
        addClass(target, 'focus')
    }, false);
    inputs[i].addEventListener("blur", function (event) {
        var target = event.target;
        removeClass(target, "focus")
    }, false)
}
/* end  添加focus事件*/