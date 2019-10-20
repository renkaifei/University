/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="base.js" />


var kf = (function (kf,$) {

    var components = kf.components = kf.components || {};

    components.formItem_select = function (option) {
        this.root = document.createElement("div");
        $(this.root).addClass("ui-form-item ui-border-b");

        var label = document.createElement("label");
        $(label).text(option.label || "").addClass("ui-border-r");
        this.root.appendChild(label);
        
        var div_select = document.createElement("div");
        $(div_select).addClass("ui-select");
        this.root.appendChild(div_select);

        var select = new kf.base.selectUI(option);
        div_select.appendChild(select.export());
    }

    components.formItem_select.prototype.export = function () {
        return this.root;
    }

    return kf;
})(window.kf || {},jQuery);