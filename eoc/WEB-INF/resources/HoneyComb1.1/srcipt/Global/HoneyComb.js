

/*左侧下拉菜单*/
$(function() {
	$('.menu-ul >a').bind("click", function() {
		$('.menu-ul a.active').removeClass('active')
		$(this).addClass('active')
	})
	//$('.leftmenu-title').bind('click', function() {
	//	$(this).addClass("leftmenu-title-down").parent().siblings().children('.leftmenu-title').removeClass('leftmenu-title-down')
     //   $(this).parent().siblings().children("dd").slideUp(300);
	//	var dd = $(this).next('dd');
	//	$('.leftmenu-user').find('dd').slideUp(400);
	//	if (dd.is(':visible')) {
	//		$(this).next('dd').slideUp(400);
	//		$(".leftmenu-selectbg").css("display","none");
	//	} else {
	//		$(this).next('dd').slideDown(400);
	//		$(".leftmenu-selectbg").css("display","block");
	//	}
	//	var index = $('.leftmenu-title').index(this);
	//	var topHeight = index*45;
	//	$(".leftmenu-selectbg").css("top",topHeight);
	//})
});




//$(function() {
//	$('.menu-ul >a').bind("click", function() {
//		$('.menu-ul a.active').removeClass('active')
//		$(this).addClass('active')
//	})
//	$('.leftmenu-title').bind('mouseover', function() {
//		var index = $('.leftmenu-title').index(this);
//		var topHeight = index*45;
//		$(".leftmenu-selectbg").css("top",topHeight);
//		$(".leftmenu-selectbg").show();
//	})
//	$('.leftmenu-title').bind('mouseleave', function() {
//		$(".leftmenu-selectbg").hide();
//	})
//	$('.leftmenu-title').bind('click',function(){
//		$(this).addClass("leftmenu-title-down").parent().siblings().children('.leftmenu-title').removeClass('leftmenu-title-down');
//	})
//});
/*收缩效果*/
function displaynavbar(obj) {
	if ($(obj).hasClass("open")) {
		$(obj).removeClass("open");
		$("body").removeClass("big-page");
		$(".dislpayArrow").animate({left:"261px"},300)
		$(".index-left").animate({left:"0"},300)
		$(".content").animate({left:"280px"},300)

	} else {
		$(obj).addClass("open");
		$("body").addClass("big-page");
		$(".dislpayArrow").animate({left:"0"},300)
			$(".index-left").animate({left:"-273px"},300)
		$(".content").animate({left:"0"},300)

	}
}
//获取顶部选项卡的总长度
function tabNavallwidth() {
	var taballwidth = 0,
		$tabNav = $(".acrssTab"),
		$tabNavWp = $(".BigHouse-tabNav-wp"),
		$tabNavitem = $(".acrssTab li"),
		$tabNavmore = $(".Hui-tabNav-more");
	if (!$tabNav[0]) {
		return;
	}
	$tabNavitem.each(function(index, element) {
		taballwidth += Number(parseFloat($(this).width() + 60));
	});
	$tabNav.width(taballwidth + 25);
	var w = $tabNavWp.width();
	if (taballwidth + 25 > w) {
		$tabNavmore.show();
	} else {
		$tabNavmore.hide();
		$tabNav.css({
			left: 0
		});
	}
}
/*点击左侧菜单，右侧的内容显示*/
$(function() {
	$(".index-leftmenu a").bind("click", function() {
		if ($(this).attr('data-href')) { //判断当前点击的元素中自定义的属性是否存在
			var flag = false;
			var bStopIndex = 0;
			var DataHref = $(this).attr('data-href'); //当前的转跳链接
			var _titleName = $(this).html(); //获取当前元素的文本内容
			var topWindow = $(window.parent.document); //iframe操作父窗口
			var show_navLi = topWindow.find("#min_title_list li"); //获取tab中的li

			show_navLi.each(function() {
				//判断点击菜单时，tab选项卡中的span data-href 是否等于_titleName 如果是等于说明已经创建其动作为切换，如果不等于就创建一个li和iframe
				if ($(this).find('span').attr('data-href') == DataHref) {
					flag = true;
					bStopIndex = show_navLi.index($(this)); //当前点击元素的索引
					return false;
				}
			});
			if (!flag) {
				creatIframe(DataHref, _titleName);
				min_titleList();
			} else {
				show_navLi.removeClass('tab-active').eq(bStopIndex).addClass('tab-active')
				var iframe_box = topWindow.find("#iframe-box");
				iframe_box.find(".show_iframe").hide().eq(bStopIndex).show().find('iframe').attr("src", DataHref)
			}
		}
	});

	function min_titleList() {
		var topWindow = $(window.parent.document);
		var show_nav = topWindow.find("#min_title_list");
		var aLi = show_nav.find("li");
	};
	//动态创建Iframe,选项卡菜单
//	function creatIframe(href, titleName) {
//		var topWindow = $(window.parent.document);
//		var show_nav = topWindow.find('#min_title_list');
//		show_nav.find('li').removeClass('tab-active');
//		var iframe_box = topWindow.find('#iframe-box');
//		show_nav.append('<li class="tab-active"><span data-href="' + href + '">' + titleName + '</span><i></i></li>');
//		tabNavallwidth()
//		var iframeBox = iframe_box.find('.show_iframe');
//		iframeBox.hide();
//		iframe_box.append('<div class="show_iframe"><iframe frameborder="0" src=' + href + '></iframe></div>');
//		var showBox = iframe_box.find('.show_iframe:visible');
//		showBox.find('iframe').attr("src", href).load(function() {
//			showBox.find('.loading').hide();
//		});
//	}
	function creatIframe(href, titleName) {
		var topWindow = $(window.parent.document);
		var iframe_box = topWindow.find('#iframe-box');
		var iframeBox = iframe_box.find('.show_iframe');
		iframeBox.find("iframe").attr("src",href);
	}
	var num = 0;
	var oUl = $("#min_title_list");
	var hide_nav = $('#BigHouse-tabNav');
	//点击选项卡切换效果
	$(document).on('click', "#min_title_list li", function() {
		var bstopIndex = $(this).index();
		var iframe_box = $("#iframe-box");
		$("#min_title_list li").removeClass('tab-active').eq(bstopIndex).addClass('tab-active')
		iframe_box.find(".show_iframe").hide().eq(bstopIndex).show()
	});
	//点击关闭按钮效果
	$(document).on("click", '#min_title_list li i', function() {
		var acloseIndex = $(this).parents("li").index();
		$(this).parent().remove();
		$('#iframe-box').find('.show_iframe').eq(acloseIndex).remove();
		num == 0 ? num = 0 : num--;
		tabNavallwidth()
	})
	//双击关闭效果
	$(document).on("dblclick", "#min_title_list li", function() {
		var aCloseIndex = $(this).index();
		var iframe_box = $("#iframe-box");
		if (aCloseIndex > 0) {
			$(this).remove();
			$("#iframe-box").find(".show_ifram").eq(aCloseIndex).remove();
			num == 0 ? num = 0 : num--;
			$("#min_title_list li").removeClass("tab-active");
			iframe_box.find(".show_iframe").hide().eq(aCloseIndex - 1).show();
			tabNavallwidth()
		} else {
			return false;
		}
	})
})