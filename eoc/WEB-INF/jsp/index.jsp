<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<%@ include file="common/include-common.jsp"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/reset.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/global/HoneyComb.min.css"/>
    <link rel="stylesheet" type="text/css" href="${basePath}/resources/HoneyComb1.1/css/component/down/down-menu.css"/>
    <link rel="icon" href="${basePath}/resources/HoneyComb1.1/img/global/favicon.ico" mce_href="../HoneyComb1.1/img/global/favicon.ico" type="image/x-icon">
    <script type="text/javascript" src="${basePath}/resources/HoneyComb1.1/srcipt/Global/jquery-1.9.1.min.js"></script>
    <script src="${basePath}/resources/HoneyComb1.1/srcipt/Global/HoneyComb.js" type="text/javascript" charset="utf-8"></script>
    <title></title>
</head>
<body>
<div class="index-header">
    <div class="indexlogo">
    </div>
    <div class="index-usetInfo">
        <span class="inde-user-message">sdfsdf</span>
        <span class="user-pic bor-left">
            <img class="userpic-img" src="../resources/HoneyComb1.1/img/global/pic.png"/>
            <a class="index-user-name" href="#">user</a>
            <i class="down-icon"></i>
           <ul class="down">
               <span id="jiantou"></span>
               <li><i class="password"></i>修改密码</li>
               <li><i class="exit"></i>退出登录</li>
           </ul>
        </span>
    </div>
</div>
<div class="index-left">
    <div class="index-leftbox">
        <div class="index-leftmenu">
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-user"></i>
                    <a  href="javascript:;" data-href="<%=request.getContextPath()%>/testItem/toList">人员信息管理</a>
                    <i class="leftmenu-dropdown dropdown"></i>
                </dt>
                <!-- <dd>
                     <div class="menu-ul">
                         <a href="javascript:;" data-href="patientlist.html">转诊患者中心</a>
                         <a href="#">待上传转诊患者</a>
                     </div>
                 </dd>-->
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-user"></i>
                    <a  href="javascript:;" data-href="<%=request.getContextPath()%>/HomeManager/homeList">首页信息管理</a>
                    <i class="leftmenu-dropdown dropdown"></i>
                </dt>
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-user"></i>
                    <a  href="javascript:;" data-href="<%=request.getContextPath()%>/GiveFeedBack/giveFeedList">反馈信息管理</a>
                    <i class="leftmenu-dropdown dropdown"></i>
                </dt>
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-user"></i>
                    <a  href="javascript:;" data-href="<%=request.getContextPath()%>/NotifyController/notifyList">通知信息管理</a>
                    <i class="leftmenu-dropdown dropdown"></i>
                </dt>
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-datacenter"></i>
                    <a data-href="" href="javascript:;">数据中心</a>
                    <i class="leftmenu-dropdown dropdown"></i>
                </dt>
                <dd>
                    <div class="menu-ul">
                        <a href="javascript:;" data-href="menu_healthinsurance.html">医保三目</a>
                        <a href="javascript:;" data-href="menu_hospital.html">医院三目</a>
                        <a href="#">医保&海虹对比</a>
                        <a href="#">医院&海虹对比</a>
                        <a href="#">医保ICD</a>
                        <a href="#">医院ICD</a>
                        <a href="#">医保ICD&海虹对比</a>
                        <a href="#">医院ICD&海虹对比</a>
                    </div>
                </dd>
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-organizationhos"></i>
                    <a data-href="operation.html" href="javascript:;">医疗机构</a>
                    <!--<i class="leftmenu-dropdown dropdown"></i>-->
                </dt>
                <!--<dd>
                </dd>-->
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-organizationins"></i>
                    <a data-href="operation.html" href="javascript:;">医保机构</a>
                    <!--<i class="leftmenu-dropdown dropdown"></i>-->
                </dt>
                <!--<dd>
                </dd>-->
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-projectcost"></i>
                    <a data-href="operation.html" href="javascript:;">费用核算项目</a>
                    <!--<i class="leftmenu-dropdown dropdown"></i>-->
                </dt>
                <!--<dd>
                </dd>-->
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-loganalysis"></i>
                    <a data-href="operation.html" href="javascript:;">日志分析</a>
                    <!--<i class="leftmenu-dropdown dropdown"></i>-->
                </dt>
                <!--<dd>
                </dd>-->
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-areadictionary"></i>
                    <a data-href="operation.html" href="javascript:;">行政区域字典</a>
                    <!--<i class="leftmenu-dropdown dropdown"></i>-->
                </dt>
                <!--<dd>
                </dd>-->
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-statisticanalysis"></i>
                    <a data-href="datachart-insurance.html" href="javascript:;">统计分析</a>
                    <!--<i class="leftmenu-dropdown dropdown"></i>-->
                </dt>
                <!--<dd>
                </dd>-->
            </dl>
            <dl class="leftmenu-item">
                <dt class="leftmenu-title">
                    <i class="icon-securitycenter"></i>
                    <a data-href="securityCenter.html" href="javascript:;">安全中心</a>
                    <!--<i class="leftmenu-dropdown dropdown"></i>-->
                </dt>
                <!--<dd>
                </dd>-->
            </dl>
        </div>
    </div>
</div>
<div class="dislpayArrow">
    <a class="pngfix" href="javascript:void(0);" onClick="displaynavbar(this)"></a>
</div>
<div class="content">
    <!--<div id="BigHouse-tabNav" class="bighouse-tabNav">
        <div class="BigHouse-tabNav-wp">
            <ul id="min_title_list" class="acrssTab">
                <li class="tab-active"><span title="我的桌面" data-href="2.html">我的桌面</span></li>
            </ul>
        </div>
    </div>-->
    <div id="iframe-box" class="iframe-box">
        <div class="show_iframe">
            <iframe scrolling="yes" src="${ctx}/testItem/toList" frameborder="0"></iframe>
        </div>
    </div>
</div>
<div class="footer">
    <a style="font-size: 12px; color: #999999;">北京市域创融资租赁有限公司©2016</a>
</div>
<script>
    /*头部下拉*/
    $('.user-pic').on("click",function(e){
        e.stopPropagation()
        $(this).find('ul').toggle()
    })
    $("body").on("click",function(){
        $('.user-pic').find("ul").slideUp("fast");
    })

</script>
</body>

</html>
