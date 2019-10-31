var kf = (function (kf, $) {

    var base = kf.base = kf.base || {};

    base.labelUI = function (option) {
        option = option || {};
        var label = document.createElement("label");
        if (option.text) $(label).text(option.text);
        if (option.className) $(label).addClass(option.className);
        if (option.data) $(label).data(option.data);
        return label;
    }

    base.h1UI = function (option) {
        option = option || {};
        var h1 = document.createElement("h1");
        if (option.text) $(h1).text(option.text);
        return h1;
    }

    base.liUI = function () {
        return document.createElement("li");
    }

    base.divUI = function (option) {
        option = option || {};
        var div = document.createElement("div");
        if (option.className) $(div).addClass(option.className);
        if (option.text) $(div).text(option.text);
        return div;
    }

    base.spanUI = function (option) {
        option = option || {};
        var span = document.createElement("span");
        $(span).text(option.text);
        if (option.click) $(span).click(option.click);
        if (option.className) $(span).addClass(option.className);
        return span;
    }

    base.aUI = function (option) {
        var a = document.createElement("a");
        if (option.className) $(a).addClass(option.className);
        if (option.text) $(a).text(option.text);
        if (option.href) $(a).prop("href", option.href);
        return a;
    }

    return kf;

})(window.kf || {},jQuery);
