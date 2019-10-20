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

    base.divUI = function () {
        return document.createElement("div");
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

    base.buttonUI = function (option) {
        var button = document.createElement("button");
        if (option.className) $(button).addClass(option.className);
        if (option.text) $(button).text(option.text);
        if (option.click) $(button).click(option.click);
    }
    
    return kf;
})(window.kf || {}, jQuery);





