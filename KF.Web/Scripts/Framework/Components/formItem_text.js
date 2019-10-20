/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="base.js" />


var kf = (function (kf,$) {
    var components = kf.components = kf.components || {};

    components.formItem_text = function (option) {
        this.root = kf.base.divUI();
        $(this.root).addClass("ui-form-item ui-border-b");

        option = option || {};

        var label = kf.base.labelUI({
            text: option.label || "",
            className:"ui-border-r"
        });
        this.root.appendChild(label);

        this.text = new kf.base.textboxUI({
            value: option.value || "",
            readonly:option.readonly || false
        });
        if (option.change) this.text.addChangeObserver(option.change);
        this.root.appendChild(this.text.export());

        this.i_clear = new kf.base.iUI({
            className: "ui-icon-close",
            click: $.proxy(function () {
                this.text.clear();
            },this)
        });
        if (option.clear) this.i_clear.addClickObserver(option.clear);
        this.root.appendChild(this.i_clear.export());
    }

    components.formItem_text.prototype.setValue = function (value) {
        this.text.setValue(value);
    }

    components.formItem_text.prototype.addClearObserver = function (observer) {
        this.i_clear.addClickObserver(observer);
    }

    components.formItem_text.prototype.export = function () {
        var _self = this;
        return _self.root;
    }

    return kf;

})(window.kf || {}, jQuery);


