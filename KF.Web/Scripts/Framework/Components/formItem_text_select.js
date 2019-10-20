/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="formItem_text.js" />
/// <reference path="dialog.js" />


var kf = (function (kf, $) {
    var components = kf.components = kf.components || {};

    components.formItem_text_select = function (option) {
        option = option || {};
        option.readonly = true;
        this.formItem_text = new kf.components.formItem_text(option);
        this.gridDialog = new kf.components.gridDialog({
            searchHandler:option.searchHandler
        });
        if (option.initHeader) this.gridDialog.initHeader(option.initHeader);
        this.gridDialog.okHandler($.proxy(function (value) {
            this.formItem_text.setValue(value[option.textField]);
        }, this));
        if (option.okHandler) this.gridDialog.okHandler(option.okHandler);
        this.button = new kf.base.buttonUI({
            className: "ui-btn",
            text: "..."
        });
        if (option.btnClick) this.button.addClickObserver(option.btnClick);
        this.formItem_text.root.appendChild(this.button.export());
    }

    components.formItem_text_select.prototype.setDialogTitle = function (title) {
        this.gridDialog.setTitle(title);
    }

    components.formItem_text_select.prototype.addRows = function (values) {
        this.gridDialog.addRows(values);
    }

    components.formItem_text_select.prototype.okHandler = function (okHandler) {
        this.gridDialog.okHandler(okHandler);
    }

    components.formItem_text_select.prototype.showDialog = function () {
        this.gridDialog.show();
    }

    components.formItem_text_select.prototype.addClearObserver = function (eventHandler) {
        this.formItem_text.addClearObserver(eventHandler);
    }

    components.formItem_text_select.prototype.export = function () {
        var _self = this;
        return _self.formItem_text.root;
    }

    return kf;

})(window.kf || {}, jQuery);