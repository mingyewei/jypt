/**
 * Created by jinzeming on 2015/12/10 0010.
 * Email:jinzeming999@126.com;
*  Version Number:1.01;
*  选项卡功能
 */
var tabBox = {
    'get': function (selector, context) {
        return context && context.querySelector(selector) || document.querySelector(selector)
    },
    'addClass': function (ele, className) {
        ele && (ele.className += className);
    },
    'delClass': function (ele, className) {
        ele && (ele.className = ele.className.replace(className, ""));
    },
    "getAll": function (selector, context) {
        return context && context.querySelectorAll(selector) || document.querySelectorAll(selector)
    },
    'hasClass': function (ele, className) {
        return ele && ele.className.indexOf(className) != -1;
    },
    'show': function (ele) {
        ele && (ele.style.display = 'block');
    },
    'hide': function (ele) {
        ele && (ele.style.display = 'none');
    },
    'toggle': function (ele, className) {
        if (ele && !className) {
            ele.style.display = 'block' ? this.hide(ele) : this.show(ele);
        } else {
            this.hasClass(ele, className) ? this.delClass(ele, className) : this.addClass(ele, className)
        }
    },
    'toArray': function (o) {
        return Array.prototype.slice.call(o)
    }
};
var Tab = function (o) {
    if (!(this instanceof Tab)) {
        return new Tab(o)
    }
    this.tab = typeof o.tab == "string" ? tabBox.get(o.tab) : o.tab;
    this.content = typeof o.content == "string" ? tabBox.get(o.content) : o.content;
    this.contentItems = tabBox.toArray(tabBox.getAll("div>div", this.content));
    this.tabItems = tabBox.toArray(tabBox.getAll('li', this.tab));
    this.collapsible = !!o.collapsible;
    this.event = this.collapsible ? "click" : (o.event || 'click');
    this.itemClass = o.itemClass || 'hover';
    this.eventHandler = this.collapsible ? 'collapse' : 'change';
    this.tabItems.forEach(function (t, i) {
        t.index = i;
    });
    this.contentItems.forEach(function (t, i) {
        i != 0 && tabBox.hide(t)
    });
    this.lastContentItem = this.contentItems[0];//默认显示第一个
    this.lastTabItem = this.tabItems[0];
    this.initEvent();
}
Tab.prototype.initEvent = function () {
    var that = this;
    this.tab.addEventListener(this.event, function (e) {
        var target = e.target,
            item = null;
        if (target.tagName.toLocaleLowerCase() == 'li') {
            var item = that.contentItems[target.index];
            that[that.eventHandler](target, item);
        }
    })
};
Tab.prototype.change = function (target, item) {
    if (this.lastContentItem != item) {
        tabBox.delClass(this.lastTabItem, this.itemClass);
        tabBox.addClass(target, this.itemClass);
        tabBox.show(item);
        tabBox.hide(this.lastContentItem);
        this.lastContentItem = item;
        this.lastTabItem = target;
    }
}
Tab.prototype.collapse = function (target, item) {
    if (this.lastContentItem != item) {
        this.change(target, item);
    } else {
        tabBox.toggle(item);
        tabBox.toggle(target, this.itemClass)
    }
}