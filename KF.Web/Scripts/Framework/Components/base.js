/// <reference path="../jquery-1.12.4.js" /> 

var kf = (function (kf, $) {
    var base = kf.base = kf.base || {};

    base.spanUI = function (option) {
        option = option || {};
        var span = document.createElement("span");
        $(span).text(option.text);
        if (option.click) $(span).click(option.click);
        return span;
    }

    base.divUI = function (option) {
        option = option || {};
        var div = document.createElement("div");
        if (option.className) $(div).addClass(option.className);
        if (option.text) $(div).text(option.text);
        return div;
    }

    base.tableUI = function () {
        var table = document.createElement("table");
        $(table).addClass("ui-table ui-border");
        return table;
    }

    base.trUI = function () {
        return document.createElement("tr");
    }

    base.thUI = function () {
        return document.createElement("th");
    }

    base.tdUI = function () {
        return document.createElement("td");
    }

    /*********** buttonUI ****************/
    base.buttonUI = function (option) {
        option = option || {};
        this.button = document.createElement("button");
        if (option.className) $(this.button).addClass(option.className);
        if (option.text) $(this.button).text(option.text);
        this.clickObservers = [];
        if (option.click) this.clickObservers.push(option.click);

        $(this.button).click($.proxy(function () {
            for (var i = 0; i < this.clickObservers.length; i++) {
                this.clickObservers[i]();
            }
        },this));
    }

    base.buttonUI.prototype.addClickObserver = function (observer) {
        this.clickObservers.push(observer);
    }

    base.buttonUI.prototype.export = function () {
        return this.button;
    }
    /************* buttonUI ******************/

    /*********** iUI ***************/
    base.iUI = function (option) {
        option = option || {};
        this.i = document.createElement("i");
        this.clickObservers = [];

        if (option.click) this.clickObservers.push(option.click);
        if (option.className) $(this.i).addClass(option.className);
        $(this.i).click($.proxy(function () {
            for (var i = 0; i < this.clickObservers.length; i++) {
                this.clickObservers[i]();
            }
        },this));
    }

    base.iUI.prototype.addClickObserver = function (observer) {
        this.clickObservers.push(observer);
    }

    base.iUI.prototype.export = function () {
        return this.i;
    }
    /*********** iUI ***************/

    base.h1UI = function (option) {
        option = option || {};
        var h1 = document.createElement("h1");
        if (option.text) $(h1).text(option.text);
        return h1;
    }

    base.ulUI = function () {
        var ul = document.createElement("ul");
        $(ul).addClass("ui-list");
        return ul;
    }

    base.liUI = function () {
        return document.createElement("li");
    }

    base.aUI = function (option) {
        var a = document.createElement("a");
        if (option.className) $(a).addClass(option.className);
        if (option.text) $(a).text(option.text);
        if(option.href) $(a).prop("href", option.href);
        return a;
    }

    base.labelUI = function (option) {
        option = option || {};
        var label = document.createElement("label");
        if (option.className) $(label).addClass(option.className);
        if (option.text) $(label).text(option.text);
        return label;
    }

    /********** textBoxUI *************/
    base.textboxUI = function (option) {
        option = option || {};

        this.textbox = document.createElement("input");
        this.textbox.type = "text";
        this.changeObservers = [];

        if (option.readonly) $(this.textbox).attr("readonly", option.readonly);
        if (option.className) $(this.textbox).addClass(option.className);
        if (option.value) $(this.textbox).val(option.value);
        $(this.textbox).change($.proxy(function () {
            var value = this.textbox.value;
            for (var i = 0; i < this.changeObservers.length; i++) {
                this.changeObservers[i].call(null, value);
            }
        },this));
    }

    base.textboxUI.prototype.clear = function () {
        this.textbox.value = "";
    }

    base.textboxUI.prototype.getValue = function () {
        return this.textbox.value;
    }

    base.textboxUI.prototype.setValue = function (value) {
        this.textbox.value = value;
    }

    base.textboxUI.prototype.addChangeObserver = function (observer) {
        this.changeObservers.push(observer);
    }

    base.textboxUI.prototype.export = function () {
        return this.textbox;
    }
    /*********** textBoxUI *************/

    base.textareaUI = function (option) {
        var textarea = document.createElement("textarea");
        if (option.id) textarea.id = option.id;
        return textarea;
    }

    /************ checkBoxUI *****************/
    base.checkboxUI = function (option) {
        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        this.checkbox.checked = option.checked || false;
        if (option.data) $(this.checkbox).data("data", option.data);
        this.clickObservers = [];
        $(this.checkbox).click($.proxy(function(){
            var value = this.checkbox.checked;
            for (var i = 0; i < this.clickObservers.length; i++) {
                this.clickObservers[i].call(null, value);
            }
        },this));
    }

    base.checkboxUI.prototype.addClickObserver = function (observer) {
        this.clickObservers.push(observer);
    }

    base.checkboxUI.prototype.export = function () {
        return this.checkbox;
    }

    /**************** checkBoxUI ********************/

    /*********** selectUI *************/
    base.selectUI = function (option) {
        this.selectIndexChangedObservers = [];
        this.select = document.createElement("select");
        $.each(option.initValues, $.proxy(function (i, item) {
            var option = document.createElement("option");
            option.value = item.value;
            option.text = item.text;
            this.select.appendChild(option);
        },this));
        if (option.selectIndexChanged) this.selectIndexChangedObservers.push(option.selectIndexChanged);
        $(this.select).change($.proxy(function () {
            for (var i = 0; i < this.selectIndexChangedObservers.length; i++) {
                var value = $(this.select).val();
                this.selectIndexChangedObservers[i](value);
            }
        }, this));
        if (option.value) $(this.select).val(option.value);
    }

    base.selectUI.prototype.addSelectIndexChangedObserver = function (observer) {
        this.selectIndexChangedObservers.push(observer);
    }

    base.selectUI.prototype.export = function () {
        return this.select;
    }
    /*********** selectUI *************/

    base.pUI = function (option) {
        var p = document.createElement("p");
        $(p).text(option.text || "");
        return p;
    }
    
    return kf;
})(window.kf || {}, jQuery);





