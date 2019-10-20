/// <reference path="../jquery-1.12.4.js" />
/// <reference path="base.js" />
/// <reference path="grid.js" />
/// <reference path="dialog.js" />


var kf = (function (kf,$) {
    var component = kf.component = kf.component || {};

    function gridSelectDialog() {
        this.dialog = new kf.component.baseDialog();
        this.grid = new kf.component.grid();
        var _self = this;
        this.dialog.addContent(_self.grid.export());
    }

    gridSelectDialog.prototype.setTitle = function (title) {
        var _self = this;
        _self.dialog.setTitle(title);
    }

    gridSelectDialog.prototype.initGridHeader = function (columns) {
        var _self = this;
        _self.grid.initHeader(columns);
    }

    gridSelectDialog.prototype.addRow = function (value) {
        var _self = this;
        _self.grid.addRow(value);
    }

    gridSelectDialog.prototype.show = function () {
        var _self = this;
        _self.dialog.show();
    }

    gridSelectDialog.prototype.clearRows = function () {
        var _self = this;
        _self.grid.clearRows();
    }

    gridSelectDialog.prototype.GridDoubleClick = function (clickEvent) {
        clickEvent = clickEvent || function () { }
        var _self = this;
        
    }

    gridSelectDialog.prototype.OkClick = function (clickEvent) {
        clickEvent = clickEvent || function () { }
        var _self = this;
        _self.dialog.OkClick(clickEvent);
    }

    gridSelectDialog.prototype.CancelClick = function (clickEvent) {
        clickEvent = clickEvent || function () { }
        var _self = this;
        _self.dialog.CancelClick(clickEvent);
    }

    gridSelectDialog.prototype.hide = function () {
        var _self = this;
        _self.dialog.hide();
    }

    gridSelectDialog.prototype.destory = function () {
        var _self = this;
        _self.dialog.destory();
    }



    component.gridSelectDialog = gridSelectDialog;

    return kf;
})(window.kf || {},jQuery);