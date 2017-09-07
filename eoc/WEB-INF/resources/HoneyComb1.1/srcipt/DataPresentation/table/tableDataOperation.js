/**
 * * Created by jinzeming on 2016/3/8.
 */
function tableDataOperation() {
};
var table_id = document.getElementById("")

function addEvent(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, fn, false);
    } else {
        ele["on" + type] = fn
    }
    ;
    ele["Listener-" + type] = !0;
};

function getDomEvent(o) {
    var a = "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(' ');
    var b = [];
    for (var i = 0; i < a.length; i++) {
        if (o['on' + a[i]] || o["Listener-" + a[i]] || o.getAttribute('on' + a[i])) {
            b.push(a[i]);
        }
        ;
    }
    ;
    return b;
};

function removeEvent(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
    } else if (ele.detachEvent) {
        ele.detachEvent("on" + type, fn);
    } else {
        ele["on" + type] = null;
    }
    ;
};
var addClass = function (ele, strClass) {
    var reg = new RegExp("(^| )" + strClass + "( |$)");
    if (!reg.test(ele.className))
        ele.className += " " + strClass;
};
var removeClass = function (ele, strClass) {
    var reg = new RegExp("(^| )" + strClass + "( |$)", "g");
    ele.className = ele.className.replace(reg, "");
};
/*
 动态添加数据
 dataList:后台传输过来的数据
 tableId：所操作的表格的ID 例如"table-id"
 tabletrId：表格tr中的的ID 例如"itm"
 tableList：数组,需要显示在页面上的数据ID,
 tableListNone：数组，需要隐藏在页面上脑的数据ID
 operation:操作按钮类名[]
 tiele:操作类型名称[]
 */
tableDataOperation.prototype.dataAdd = function (dataList, tableId, tableTrId, tableList, tableListNone, operation, title) {
    var tableId = document.getElementById(tableId);
    var tbody = tableId.getElementsByTagName("tbody")[0];
    creatItem(tableList, tableListNone, tbody, operation, title, tableTrId);
    var tableTrlist = document.getElementById(tableTrId);
    var tabletdList = tableTrlist.getElementsByTagName("td");
    var oddColor = "#ffffff", eventColor = "#F7F7F7", hoverColor = "#EDEDED"
    /*存放自定表格tr中td的id值,用于比对后台传输过来需要展示在页面上的数据
     */
    var tableArray = [];
    for (var i = 0; i < tabletdList.length; i++) {
        tableArray.push(tabletdList[i].getAttribute("id"));
    }
    ;
    for (var i = 0; i < dataList.length; i++) {
        tableTrlist.style.display = "table-row";
        var row = tableTrlist.cloneNode(true);
        /*克隆自定义行*/
        var cur = dataList[i];
        for (var key in cur) {
            for (var j = 0; j < tableArray.length; j++) {
                if (tableArray[j] == key) {
                    var strKey = cur[key];
                    if (strKey.length > 50) {
                        strKey = strKey.substring(0, 50) + "......"
                    }
                    row.children[j].innerHTML = strKey;
                    row.children[j].title = cur[key];
                    tbody.appendChild(row);
                }
            }
        }

    }
    ;

    /*查询完毕后删除自定义那一行*/
    var oDel = tbody.getElementsByTagName("tr");
    //var oDelLen=oDel.length;
    tbody.deleteRow(oDel[1]);
    var tableTr = tbody.getElementsByTagName("tr");
    for (var i = 0; i < tableTr.length; i++) {
        tableTr[i].style.backgroundColor = (tableTr[i].sectionRowIndex % 2 == 0) ? oddColor : eventColor;
        tableTr[i].onclick = function () {
            if (this.x != "1") {
                this.x = "1";
                this.firstChild.children[0].checked = true;
                addClass.call(this, this, "chlickColor")
            } else {
                this.x = "0";
                this.firstChild.children[0].checked = false;
                removeClass.call(this, this, "chlickColor")
                this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? oddColor : eventColor;
            }
        }
        tableTr[i].onmouseover = function () {
            if (this.x != "1")this.style.backgroundColor = hoverColor;
        }
        tableTr[i].onmouseout = function () {
            if (this.x != "1")this.style.backgroundColor = (this.sectionRowIndex % 2 == 0) ? oddColor : eventColor;
        }
    }

};

/*
 * 单独删除，编辑，获取的标示ID
 * modalId 字符串 编辑时转跳的弹窗口ID
 * type-->this
 */
//function dele(type){
//    var oDel = type.parentNode.parentNode.sectionRowIndex;
//    var tableId=document.getElementById("table_id")
//    var idArray=[];
//    var tdList=type.parentNode.parentNode.childNodes;
//    var tdListLenth=type.parentNode.parentNode.childNodes.length;
//    for (var i=0;i<tdListLenth;i++){
//        if (tdList[i].style.display=="none"){
//            var a=tdList[i].innerHTML;
//           idArray.push(a)
//        }
//    }
//    tableId.deleteRow(oDel + 1)
//    return idArray;
//}
var confirmindex;
tableDataOperation.prototype.singDel = function (getId, tableId, url, searchBtn) {
    var self = this;
    var tableId = document.getElementById(tableId);
    var tableDel = tableId.getElementsByClassName("table-delete");
    for (var i = 0; i < tableDel.length; i++) {
        addEvent(tableDel[i], "click", edit);
    }
    function edit(e) {
        e.stopPropagation();
        $(this).parent().parent().addClass('chlickColor');
        $(this).parent().siblings().children('input').prop('checked', true);
        var a = this;
        var dataId = singleId(a, getId)
        var flag = $(this).parent().siblings().children('input').prop('checked')
        if (!flag) {
            layer.msg('请选中当前选项再删除');
            return;
        }
        confirmindex = layer.confirm('确定要删除吗',
            {
                btn: ['确定', '取消'],
                cancel: function () {
                    $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
                }
            },
            function () {
                console.log(dataId);
                $.ajax({
                    type: "post",
                    url: url,
                    data: {id: dataId},
                    dataType: "json",
                    success: function (data) {
                        var dataJson = data;
                        if (dataJson.code == 1) {
                            var Del = a.parentNode.parentNode.sectionRowIndex;
                            tableId.deleteRow(Del + 1);
                            layer.msg('已删除', {icon: 1, time: 1000})
                            $(searchBtn).click();
                        }
                    }
                });

            }, function () {
                $("#table_id tbody tr").removeClass('chlickColor').find('input').prop('checked', false);
            }
        );
    }
}


function singleId(type, getId) {
    var single = null;
    var tdList = type.parentNode.parentNode.children;
    var tdLength = type.parentNode.parentNode.children.length;
    for (var i = 0; i < tdLength; i++) {
        if (tdList[i].id == getId) {
            single = tdList[i].innerHTML;
        }
    }
    ;
    return single;
}
/*单个删除某一行
 * type-->this
 */
/*多个删除*/

tableDataOperation.prototype.allDel = function (tableId, getId) {
    var idArray = [];
    var tableId = document.getElementById(tableId);
    var oInpt = tableId.getElementsByTagName("input");
    /*debugger;*/
    for (var i = 0; i < oInpt.length; i++) {
        if (oInpt[i].type == 'checkbox' && oInpt[i].checked) {
            var oRow = oInpt[i].parentNode.parentNode.sectionRowIndex;
            for (var j = 0; j < tableId.rows[i + 1].cells.length; j++) {
                if (tableId.rows[i + 1].cells[j].id == getId) {
                    idArray.push(tableId.rows[i + 1].cells[j].innerHTML)
                }
                ;
            }
            ;
        }
    }
    return idArray;

}
/*
 数据刷新
 checkedBtn:全选按钮ID
 */
tableDataOperation.prototype.delData = function (tr, tbody, checkedBtn) {
    var checkBtn = document.getElementById(checkedBtn);
    /*
     每次删除刷新数据重置全选按钮的属性，以便于复制
     */
    removeClass.call(this, checkBtn, "check-current");
    checkBtn.setAttribute("data-check", "");
    if (tr.length > 0) {
        var rowNum = tr.length;
        for (var i = 0; i < rowNum; i++) {
            tbody.deleteRow(i);
            rowNum = rowNum - 1;
            i = i - 1;
        }
        ;
    }
    ;
    //tbody.getElementsByTagName("input")[0].checked = false;
};
/*全选方法
 * var checkbox = tbody.getElementsByTagName('input');
 * checkedBtn 为点击的按钮的ID
 * */
tableDataOperation.prototype.checkBoxAll = function (checkedBtn) {
    var obj = document.getElementById(checkedBtn);
    var a = getDomEvent(obj)
    if (a.length == 0) { /*判断obj元素是否绑定了click事件*/
        addEvent(obj, "click", fn)
    } else {
        removeEvent(obj, "click", fn);
        addEvent(obj, "click", fn)
        removeClass.call(this, obj, "check-current");
        obj.setAttribute("data-check", "")
    }
    function fn() {
        var tbody = document.getElementsByTagName("tbody")[0];
        var checkbox = tbody.getElementsByTagName('input');
        var datacheck = this.getAttribute("data-check")
        /*标示全选按钮是否全选的状态*/
        if (!datacheck) {
            for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = true;
                addClass(checkbox[i].parentNode.parentNode, "chlickColor")
                /*console.log(checkbox[i].parentNode.parentNode);
                 */
            }
            ;
            addClass.call(this, this, "check-current");
            this.setAttribute("data-check", "1")
        } else {
            for (var i = 0; i < checkbox.length; i++) {
                checkbox[i].checked = false;
                removeClass(checkbox[i].parentNode.parentNode, "chlickColor")
            }
            ;
            removeClass.call(this, this, "check-current");
            this.setAttribute("data-check", "");
        }
        ;
    };
};
/*
 * 编辑表格数据回传
 * editID 字符串 编辑按钮id
 * modalID 字符串 弹出框id
 */

/*创建tr自定义列表*/
function creatItem(tableList, tableListNone, tbody, operation, title, itm) {
    function creatFlag() {
        var itemFragment = document.createDocumentFragment();
        /*添加编辑按钮*/
        var tdEdit = document.createElement("td");
        var operatFrag = "";
        for (var i = 0; i < operation.length; i++) {
            operatFrag += "<a class='" + operation[i] + "' href='javascript:;' title='" + title[i] + "'><i></i></a>"
        }
        tdEdit.innerHTML = operatFrag;
        for (var i = 0; i < tableList.length; i++) {
            var cur = tableList[i], oTd = document.createElement("td");
            oTd.id = cur;
            itemFragment.appendChild(oTd);
        }
        if (arguments.length = 2) {
            for (var i = 0; i < tableListNone.length; i++) {
                var curNone = tableListNone[i], oTdNone = document.createElement("td");
                oTdNone.id = curNone;
                oTdNone.style.display = "none";
                itemFragment.appendChild(oTdNone);
            }
        }
        /*添加checkbox*/
        var check = document.createElement("td");
        check.innerHTML = "<input type='checkbox'/>";
        itemFragment.insertBefore(check, itemFragment.firstChild);
        itemFragment.appendChild(tdEdit);
        return itemFragment;
    };
    var itemList = document.createElement("tr");
    itemList.style.display = "none";
    itemList.id = itm;
    var flagTr = document.createDocumentFragment();
    itemList.appendChild(creatFlag());
    flagTr.appendChild(itemList);
    tbody.appendChild(flagTr);
}