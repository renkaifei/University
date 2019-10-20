/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="base.js" />
/// <reference path="div_list_info.js" />


var kf = (function (kf,$) {

    var components = kf.components = kf.components || {};

    var formItem_checkbox = components.formItem_checkbox = function (option) {
        var _self = this;
        _self.root = document.createElement("div");
        $(_self.root).addClass("ui-form-item ui-form-item-switch ui-border-b");

        var p = kf.base.pUI({ text: option.label || "" });
        _self.root.appendChild(p);

        var label = kf.base.labelUI({ className:"ui-switch" });
       _self.root.appendChild(label);

       checkbox = new kf.base.checkboxUI({
           checked: option.checked,
           data:option.data
       });
       if (option.click) checkbox.addClickObserver(option.click);
       label.appendChild(checkbox.export());
    }

    formItem_checkbox.prototype.export = function () {
        var _self = this;
        return _self.root;
    }

    return kf;

})(window.kf || {},jQuery);