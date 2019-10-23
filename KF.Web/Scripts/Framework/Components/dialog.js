/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="grid.js" />
/// <reference path="searchBox.js" />



var kf = (function (kf, $) {

    var components = kf.components = kf.components || {};

    var dialog = components.dialog = function () {
        this.root = kf.base.divUI({ className: "ui-dialog" });
        this.dialog_cnt = kf.base.divUI({ className: "dialog-cnt" });
        this.root.appendChild(this.dialog_cnt);

        this.header = kf.base.divUI({ className: "ui-dialog-hd" });
        this.dialog_cnt.appendChild(this.header);

        this.title = kf.base.spanUI()
        this.header.appendChild(this.title);

        this.body = kf.base.divUI({ className: "ui-dialog-bd" });
        this.dialog_cnt.appendChild(this.body);

        this.footer = kf.base.divUI({ className: "ui-dialog-ft" });
        this.dialog_cnt.appendChild(this.footer);

        this.btnOk = new kf.base.buttonUI({ text: "确定" });
        this.btnOk.addClickObserver($.proxy(function () {
            this.hide();
        }, this));
        this.footer.appendChild(this.btnOk.export());

        this.btnCancel = new kf.base.buttonUI({
            text: "取消",
            click: $.proxy(function () {
                this.hide();
            }, this)
        });
        this.footer.appendChild(this.btnCancel.export());

    }

    dialog.prototype.okHandler = function (eventHandler) {
        this.btnOk.addClickObserver(eventHandler);
    }

    dialog.prototype.setTitle = function (value) {
        $(this.title).text(value);
    }

    dialog.prototype.show = function () {
        if ($(this.root).hasClass("show")) return;
        $(this.root).addClass("show");
        document.body.appendChild(this.root);
    }

    dialog.prototype.hide = function () {
        $(this.root).removeClass("show");
    }

    return kf;

})(window.kf || {}, jQuery);

var kf = (function (kf, $) {
    var components = kf.components = kf.components || {};

    var gridDialog = components.gridDialog = function (option) {
        option = option || {};

        this.dialog = new kf.components.dialog();

        this.searchBox = new kf.components.searchBox();
        this.dialog.body.appendChild(this.searchBox.export())

        this.grid = new kf.components.grid();
        this.dialog.body.appendChild(this.grid.export());
        this.btnPrePage = new kf.base.buttonUI({
            text: "上一页",
        });
        this.btnNextPage = new kf.base.buttonUI({
            text: "下一页",
        });
        if (option.showPage) {
            $(this.btnPrePage).show();
            $(this.btnNextPage).show();
        } else {
            $(this.btnPrePage).hide();
            $(this.btnNextPage).hide();
        }
    }

    gridDialog.prototype.setTitle = function (title) {
        this.dialog.setTitle(title);
    }

    gridDialog.prototype.showPage = function (option) {
        this.btnPrePage = kf.base.buttonUI({ text: "上一页" });
        this.dialog.footer.appendChild(this.btnPrePage);
        if (option.prePage) $(this.btnPrePage).click(option.prePage);
        this.btnNextPage = kf.base.buttonUI({ text: "下一页" });
        this.dialog.footer.appendChild(this.btnNextPage);
        if (option.nextPage) $(this.btnNextPage).click(option.nextPage);
    }

    gridDialog.prototype.okHandler = function (ok) {
        this.dialog.okHandler($.proxy(function () {
            var currentRowIndex = this.grid.currentRowIndex();
            var value = this.grid.values[currentRowIndex];
            ok(value);
        }, this));
    }

    gridDialog.prototype.initHeader = function (columns) {
        this.grid.initHeader(columns);
    }

    gridDialog.prototype.addRows = function (values) {
        var _self = this;
        _self.grid.clearRows();
        $.each(values, function (i, value) {
            _self.grid.addRow(value);
        });
    }

    gridDialog.prototype.show = function () {
        this.dialog.show();
    }

    gridDialog.prototype.hide = function () {
        this.dialog.hide();
    }

    gridDialog.prototype.clearRows = function () {
        this.grid.clearRows();
    }

    gridDialog.prototype.searchHandler = function (eventHandler) {
        this.searchBox.searchHandler(eventHandler);
    }

    gridDialog.prototype.prePage = function (eventHandler) {
        this.btnPrePage.addClickObserver(eventHandler);
    }

    gridDialog.prototype.nextPage = function (eventHandler) {
        this.btnNextPage.addClickObserver(eventHandler);
    }

    return kf;


})(window.kf || {}, jQuery);