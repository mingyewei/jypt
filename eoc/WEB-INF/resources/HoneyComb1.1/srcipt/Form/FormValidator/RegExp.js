
//浮点数除法运算
function fdiv(a, b, n) {
    if (n == undefined) { n = 2; }
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = a.toString().split(".")[1].length } catch (e) { }
    try { t2 = b.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(a.toString().replace(".", ""));
        r2 = Number(b.toString().replace(".", ""));
        return ((r1 / r2) * pow(10, t2 - t1)).toFixed(n);
    }
}
//浮点数乘法运算
function fmul(a, b, n) {
    if (n == undefined) { n = 2; }
    var m = 0, s1 = a.toString(), s2 = b.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(n);
}
//浮点数加法运算
function fadd(a, b, n) {
    if (n == undefined) { n = 2; }
    var r1, r2, m;
    try { r1 = a.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = b.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return ((a * m + b * m) / m).toFixed(n);
}
//浮点数减法运算
function fsub(a, b, n) {
    if (n == undefined) { n = 2; }
    var r1, r2, m;
    try { r1 = a.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = b.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    //n = (r1 >= r2) ? r1 : r2;
    return ((a * m - b * m) / m).toFixed(n);
}
Number.prototype.add = function (arg) {
    return fadd(this, arg);
}
Number.prototype.subs = function (arg) {
    return fsub(this, arg);
}
Number.prototype.mul = function (arg) {
    return fmul(this, arg);
}
Number.prototype.div = function (arg) {
    return fdiv(this, arg);
}
///格式化数字位数，不足位数默认左边补0,如果指定了参数2并且参数2的值为1则右边补0
Number.prototype.FormatLen = function (len, direct) {
    var d = parseInt(direct);
    if (isNaN(d)) { d = 0; }
    var num = this.toString();
    if (num.length < len) {
        for (var i = num.length; i < len; i++) {
            if (d == 0) {
                num = "0" + num;
            }
            else {
                num += "0";
            }
        }
    }
    return num;
}
//格式化小数点数位,可以指定小数位数,是否四舍五入等参数
Number.prototype.FormatRadix = function (len, IsRound) {
    var num = this.toString();
    var numArr = num.split('.');
    var rad = 0;
    var numpart = parseInt(numArr[0]);
    if (numArr.length >= 2) {
        if (numArr[1].length < len) {
            rad = parseInt(numArr[1]).FormatLen(len, 1);
        }
        else {
            if (numArr[1].length == len) {
                rad = numArr[1];
            }
            else {
                rad = numArr[1].substr(0, len);
                if (IsRound) {
                    var d = parseInt(numArr[1].substr(len, 1));
                    if (d >= 5) { rad += 1; if (rad.toString().length > len) { numpart += 1; rad = rad.toString().substr(1, len); } }
                }
            }

        }
    }
    else {
        rad = rad.FormatLen(len);
    }
    return numpart + "." + rad;
}

//检测字符串中是否有相同的元素split是字符串分隔符，如果指定了分隔符，则判断分隔符为分隔的字符串是否有重复，如果没指定则判断单个字符串是否有重复
//有重复返回true
String.prototype.CompareElement = function (s) {
    var str = this.toString();
    if (s == undefined) {
        for (var i = 0; i < str.length; i++) {
            for (j = i + 1; j < str.length; j++) {
                if (str.substr(i, 1) == str.substr(j, 1)) {
                    return true;
                }
            }
        }
    }
    else {
        var strArr = str.split(s);
        for (var i = 0; i < strArr.length; i++) {
            for (var j = i + 1; j < strArr.length; j++) {
                if (strArr[i] == strArr[j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
String.prototype.replaceAll = function (str, tostr) {
    oStr = this;
    while (oStr.indexOf(str) > -1) {
        oStr = oStr.replace(str, tostr);
    }
    return oStr;
}
Array.prototype.CompareElement = function () {
    var strArr = this;
    for (var i = 0; i < strArr.length; i++) {
        for (var j = i + 1; j < strArr.length; j++) {
            if (strArr[i] == strArr[j]) {
                return true;
            }
        }
    }
    return false;
}
//字符串转组数,如果未指定分隔符s,则默认以,分隔分隔符,如果指定分隔符为空则将每个字符作为一个数组元素
String.prototype.ToArray = function (s) {
    if (s == undefined) { s = ","; }
    var strArr = [];
    strArr = this.split(s);
    return strArr;
}
//将一个数组转换一个字符串，所有元素使用指定的分隔符连接，默认分隔为,
Array.prototype.ToIDList = function (s) {
    if (s == undefined) { s = ","; }
    var list = "";
    for (var i = 0; i < this.length; i++) {
        list += (list == "" ? this[i] : s + "" + this[i]);
    }
    return list;
}
//获取指定元素的位置索引,元素不存在返回-1
Array.prototype.GetIndex = function (s) {
    var index = -1;
    for (var i = 0; i < this.length; i++) {
        if ((s + "") == this[i]) {
            index = i;
        }
    }
    return index;
}
//将指定元素从数组中删除
Array.prototype.Remove = function (s) {
    var list = "";
    for (var i = 0; i < this.length; i++) {
        if (s != this[i]) {
            list += (list == "" ? this[i] : "," + this[i]);
        }
    }
    return list.ToArray();
}
//将数组进行数字排序asc指定是否进行升序排序，可以为true或者false，未指定为升序
Array.prototype.SortByNumber = function (asc) {
    if (asc == undefined) { asc = true; }
    if (asc) {
        return this.sort(SortNumberAsc);
    }
    else {
        return this.sort(SortNumberDesc);
    }
}
Array.prototype.InArray = function (e) {
    var IsIn = false;
    for (var i = 0; i < this.length; i++) {
        if (this[i] == (e + "")) {
            IsIn = true;
        }
    }
    return IsIn;
}
String.prototype.Trim = function (s) { return Trim(this, s); }
String.prototype.LTrim = function (s) { return LTrim(this, s); }
String.prototype.RTrim = function (s) { return RTrim(this, s); }
//配合Array.SortByNumer使用，将数字进行数组降序排序
function SortNumberDesc(a, b) {
    return b - a;
}
//配合Array.SortByNumer使用，将数字进行数组升序排序
function SortNumberAsc(a, b) {
    return a - b;
}
//此处为独立函数
function LTrim(str, s) {
    if (s == undefined) { s = " "; }
    if (str == s && s != " ") { return s; }
    var i;
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) != s && str.charAt(i) != s) break;
    }
    str = str.substring(i, str.length);
    return str;
}
function RTrim(str, s) {
    var i;
    if (str == s && s != " ") { return s; }
    if (s == undefined) { s = " "; }
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) != s && str.charAt(i) != s) break;
    }
    str = str.substring(0, i + 1);
    return str;
}
function Trim(str, s) {
    return LTrim(RTrim(str, s), s);
}


///检测字符串是否是由中文,英文,数字以及下划线组成的
function chkNickName(str) {
    var pattern = /^[wu4e00-u9fa5]+$/gi;
    if (pattern.test(str)) {
        return true;
    }
    return false;
}

//判断长度(长度不限为0)
String.prototype.IsLen = function () {
    var isRightFormat = false;
    var minnum = arguments[0] ? arguments[0] : 0;
    var maxnum = arguments[1] ? arguments[1] : 0;
    isRightFormat = (minnum == 0 && maxnum == 0 ? true : (calculate_byte(this) >= minnum && calculate_byte(this) <= maxnum ? true : false));
    return isRightFormat;
}
//验证字符串是否为字母+数字+_+-
String.prototype.IsStr = function () {
    var myReg = /^[0-9a-zA-Z-_]+$/;
    if (myReg.test(this)) return true;
    return false;
}
//验证用户名
String.prototype.IsUsername = function () {
    var myReg = /^[0-9a-zA-Z-_]{3,50}$/;
    if (myReg.test(this)) return true;
    return false;
};
//验证密码
//String.prototype.IsPassword = function () {
//  var myReg = /^[0-9a-zA-Z`~!@#$%^&*()-_+={}[];:"'?/\]{6,}$/;
//  if (myReg.test(this)) return true;
//  return false;
//};
//验证是否为字母
String.prototype.IsEn = function () {
    var myReg = /^[a-zA-Z]+$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证是否为汉字
String.prototype.IsCn = function () {
    var myReg = /^[u0391-uFFE5]+$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证E-mail
String.prototype.IsEmail = function () {
    var myReg = /([w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)/;
    if (myReg.test(this)) return true;
    return false;
}

//验证MSN
String.prototype.IsMSN = function () {
    var myReg = /([w-.]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)/;
    if (myReg.test(this)) return true;
    return false;
}

//验证QQ号码
String.prototype.IsQQ = function () {
    var myReg = /^[1-9]d{4,10}$/;
    if (myReg.test(this)) return true;
    return false;
};
//验证网址
//String.prototype.IsHttpUrl = function () {
//  var myReg = /^http://[A-Za-z0-9]+.[A-Za-z0-9]+[/=?%-&_~`@[]':+!]*([^<>""])*$/;
//  if (myReg.test(this)) return true;
//  return false;
//}

//验证域名
String.prototype.IsDoMainName = function () {
    var myReg = /^[0-9a-zA-Z]([0-9a-zA-Z-]+.){1,3}[a-zA-Z]{2,4}?$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证IPV4地址
String.prototype.IsIpv4 = function () {
    var myReg = /^(2[0-5]{2}|1?[0-9]{1,2}).(2[0-5]{2}|1?[0-9]{1,2}).(2[0-5]{2}|1?[0-9]{1,2}).(2[0-5]{2}|1?[0-9]{1,2})$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证图片地址(不支持由CGI动态生成的图片)
String.prototype.IsImgURL = function () {
    var myReg = /^.(jpeg|jpg|gif|bmp|png|pcx|tiff|tga|lwf)$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证手机号码
String.prototype.IsCellPhone = function () {
    var myReg = /^(((d{3}))|(d{3}-))?1[3,5]d{9}$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证固定电话
String.prototype.IsPhone = function () {
    var myReg = /^[+]{0,1}(d){1,3}[ ]?([-]?((d)|[ ]){1,12})+$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证邮编
String.prototype.IsZipCode = function () {
    var myReg = /[0-9]{6}/;
    if (myReg.test(this)) return true;
    return false;
}

//验证身份证号码
String.prototype.IsIdCard = function () {
    var myReg = /(^([d]{15}|[d]{18}|[d]{17}[xX]{1})$)/;
    if (myReg.test(this)) return true;
    return false;
}

//验证日期格式YY-MM-DD
String.prototype.IsDateFormat = function () {
    var myReg = /^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证时间格式HH:MM:SS
String.prototype.IsRangeTime = function () {
    var myReg = /^(d{2}):(d{2}):(d{2})$/;
    if (myReg.test(this)) return true;
    return false;
}

//验证金额格式
String.prototype.IsMoney = function () {
    var myReg = /^[0-9]{1,8}[.]{0,1}[0-9]{0,6}$/;
    if (myReg.test(this)) return true;
    return false;
}

//字验证数字格式并判断数字的围(min:最小值;max:最大值.)
String.prototype.IsInt = function () {
    var isRightFormat = false;
    var minnum = arguments[0] ? arguments[0] : 0;
    var maxnum = arguments[1] ? arguments[1] : 0;
    var myReg = /^[-+]?d+$/;
    if (myReg.test(this)) {
        isRightFormat = (minnum == 0 && maxnum == 0 ? true : (this > minnum && this < maxnum ? true : false));
    }
    return isRightFormat;
}

//验证搜索关键字
String.prototype.IsSearch = function () {
    var myReg = /^[|"'<>,.*&@#$;:!^()]/;
    if (myReg.test(this)) return false;
    return true;
}

//js准确计算字符串长度
function calculate_byte(sTargetStr) {
    var sTmpStr, sTmpChar;
    var nOriginLen = 0;
    var nStrLength = 0;

    sTmpStr = new String(sTargetStr);
    nOriginLen = sTmpStr.length;

    for (var i = 0; i < nOriginLen; i++) {
        sTmpChar = sTmpStr.charAt(i);

        if (escape(sTmpChar).length > 4) {
            nStrLength += 2;
        } else if (sTmpChar != 'r') {
            nStrLength++;
        }
    }

    return nStrLength;
}

//颜色值;
String.prototype.IsColor = function () {
    var s = arguments[0] ? arguments[0] : "";
    s = s.Trim();
    if (s.length != 7) return false;
    return s.search(/#[a-fA-F0-9]{6}/) != -1;
}
//js日期格式化

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

function HasChinese(value) {
    if (/^[u4e00-u9fa5]+$/.test(value)) {
        return true;
    }
    return false;
}

function ToDate(dateStr) {
    var dStr = dateStr.toString();
    dateStr = dStr.replaceAll("-", "/");

    return new Date(Date.parse(dateStr));
}
//是否ID列表
String.prototype.IsIdList = function (s) {
    if (s == undefined) {
        s = ",";
    }
    var arr = this.split(s);
    for (var i = 0; i < arr.length; i++) {
        if (isNaN(parseInt(arr[i]))) { return false; }
    }
    return true;
}

//获取事件触发的对象
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}