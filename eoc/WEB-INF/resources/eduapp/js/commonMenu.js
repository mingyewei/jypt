/**
 * Created by pc on 2017/5/11.
 */
/*二级菜单展开  给对应的dd添加class tab-down*/
// 二级菜单中的某项acive  添加class  subtab-list-active
//一级菜单变色    leftmenu-title 加class  leftmenu-title-down
/*头部下拉*/
    var change=0;
    $.ajax({
        type: "post",
        url: contextPath + "/auth/userMenus",
        async:false,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                var str = '';
                var dataList = data.data;
                for (var i = 0; i < dataList.length; i++) {
                    if (dataList[i].url == "#") {
                        if (dataList[i].name == "权限管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="person_manger_menu" class="leftmenu-title">' +
                                ' <i class="icon-personneManagel tab-icon"></i>' +
                                '<a href="javascript:void(0);">'+dataList[i].name+'</a>' +
                                '<i class="leftmenu-dropdown dropdown"></i>'+
                                '</dt>' +
                                '<dd class="subtab"></dd>'+
                                '</dl>';

                        }
                        if (dataList[i].name == "资料管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="cp" class="leftmenu-title">' +
                                '<i class="icon-toList tab-icon"></i>' +
                                '<a href="javascript:void(0);">' + dataList[i].name + '</a>' +
                                '<i class="leftmenu-dropdown dropdown"></i>'+
                                '</dt>' +
                                '<dd class="subtab"></dd>'+
                                '</dl>';
                        }
                        if (dataList[i].name == "试题管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="kb" class="leftmenu-title">' +
                                '<i class="icon-repository tab-icon"></i>' +
                                '<a href="javascript:void(0);">' + dataList[i].name + '</a>' +
                                '<i class="leftmenu-dropdown dropdown"></i>'+
                                '</dt>' +
                                '<dd class="subtab"></dd>'+
                                '</dl>';
                        }
                        if (dataList[i].name == "考试管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="courses_manger_menu" class="leftmenu-title">' +
                                '<i class="icon-CourseCollection tab-icon"></i>' +
                                '<a href="javascript:void(0);">' + dataList[i].name + '</a>' +
                                '<i class="leftmenu-dropdown dropdown"></i>'+
                                '</dt>' +
                                '<dd class="subtab"></dd>'+
                                '</dl>';
                        }
                        if (dataList[i].name == "培训课程管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="items_manger_menu" class="leftmenu-title">' +
                                '<i class="icon-questionBank tab-icon"></i>' +
                                '<a href="javascript:void(0);">' + dataList[i].name + '</a>' +
                                '<i class="leftmenu-dropdown dropdown"></i>'+
                                '</dt>' +
                                '<dd class="subtab"></dd>'+
                                '</dl>';
                        }
                        if (dataList[i].name == "个人设置") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="user_setting" class="leftmenu-title">' +
                                '<i class="icon-perinfo tab-icon"></i>' +
                                '<a href="javascript:void(0);">' + dataList[i].name + '</a>' +
                                '<i class="leftmenu-dropdown dropdown"></i>'+
                                '</dt>' +
                                '<dd class="subtab"></dd>'+
                                '</dl>';
                        }
                    } else {
                        if (dataList[i].name == "培训公告和报道") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="subject_manger_menu" class="leftmenu-title">' +
                                '<i class="icon-questionsCategory tab-icon"></i>' +
                                '<a href=' + dataList[i].url + '>' + dataList[i].name + '</a>' +
                                '</dt>' +
                                '</dl>'
                        }
                        if (dataList[i].name == "首页内容管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="exam_manger_menu" class="leftmenu-title">' +
                                ' <i class="icon-exam tab-icon"></i>' +
                                '<a href=' + dataList[i].url + '>' + dataList[i].name + '</a>' +
                                '</dt>' +
                                '</dl>'
                        }
                        if (dataList[i].name == "员工分享审核") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="share_audit" class="leftmenu-title">' +
                                '<i class="icon-passw tab-icon"></i>' +
                                '<a href=' + dataList[i].url + '>' + dataList[i].name + '</a>' +
                                '</dt>' +
                                '</dl>'
                        }
                        if (dataList[i].name == "通知管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="org_notice_menu" class="leftmenu-title">' +
                                '<i class="icon-questionsCategory tab-icon"></i>' +
                                '<a href=' + dataList[i].url + '>' + dataList[i].name + '</a>' +
                                '</dt>' +
                                '</dl>'
                        }
                        if (dataList[i].name == "反馈信息管理") {
                            str += '<dl class="leftmenu-item" data-id=' + dataList[i].id + '>' +
                                '<dt id="org_train_menu" class="leftmenu-title">' +
                                '<i class="icon-trainManage tab-icon"></i>' +
                                '<a href=' + dataList[i].url + '>' + dataList[i].name + '</a>' +
                                '</dt>' +
                                '</dl>'
                        }
                    }
                }
                $(".index-leftmenu").append(str);
                $(".leftmenu-item").each(function(){
                    var strdown=''
                    for (var i = 0; i < dataList.length; i++){
                        if ($(this).attr("data-id")==dataList[i].pid){
                            strdown+='<a href='+dataList[i].url+' class="subtab-list">'+dataList[i].name+'</a>'
                        }
                    }
                    $(this).find("dd").append(strdown)
                })
                change=1;
                $('.user-pic').on("click", function (e) {
                    e.stopPropagation()
                    $(this).find('ul').toggle()
                })
                $("body").on("click", function () {
                    $('.user-pic').find("ul").slideUp("fast");
                })
                /*二级菜单展开或收缩*/
                $('.leftmenu-title').on('click', function () {
                    $(this).parent().siblings().find('.leftmenu-title').removeClass('leftmenu-title-down')
                    $(this).parent().siblings().find('dd').slideUp(300);
                    $(this).toggleClass('leftmenu-title-down');
                    $(this).siblings('dd').slideToggle(300);
                })
            }
        }
    });

function getchange(){
    return change;
}