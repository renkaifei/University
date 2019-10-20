/// <reference path="/Scripts/jquery-1.12.4.js" />
/// <reference path="/Scripts/modules/base.js" />

var kf = (function (kf,$) {

    var component = kf.component = kf.component || {};

    console.log(kf);

    //baseDialog
    function baseDialog() {
        var _self = this;

        var dialog = kf.base.divUI();
        $(dialog).addClass("ui-dialog");
        _self.dialog = dialog;
        
        _self.addCnt();
        _self.addHeader();
        _self.addBody();
        _self.addFooter();
        _self.addBtnOk();
        _self.addBtnCancel();
    }

    baseDialog.prototype.addCnt = function () {
        var _self = this;
        var div_cnt = kf.base.divUI();
        $(div_cnt).addClass("dialog-cnt");
        _self.dialog.appendChild(div_cnt);
        _self.dialog_cnt = div_cnt;
    }

    baseDialog.prototype.addHeader = function(){
        var _self = this;
        _self.header = kf.base.divUI();
        $(_self.header).addClass("ui-dialog-hd");
        _self.dialog_cnt.appendChild(_self.header);
    }

    baseDialog.prototype.addBody = function () {
        var _self = this;
        _self.body = kf.base.divUI();
        $(_self.body).addClass("ui-dialog-bd");
        _self.dialog_cnt.appendChild(_self.body);
    }

    baseDialog.prototype.addFooter = function () {
        var _self = this;
        _self.footer = kf.base.divUI();
        $(_self.footer).addClass("ui-dialog-ft");
        _self.dialog_cnt.appendChild(_self.footer);
    }

    baseDialog.prototype.setTitle = function (title) {
        var _self = this;
        var span = spanUI({ text: title });
        _self.header.appendChild(span);
    }

    baseDialog.prototype.addContent = function (content) {
        var _self = this;
        _self.body.appendChild(content);
    }

    baseDialog.prototype.addBtnOk = function () {
        var _self = this;
        _self.btnOk = kf.base.buttonUI();
        $(_self.btnOk).text("确定");
        _self.footer.appendChild(_self.btnOk);
    }

    baseDialog.prototype.addBtnCancel = function () {
        var _self = this;
        _self.btnCancel = kf.base.buttonUI();
        $(_self.btnCancel).text("取消").click(function () {
            _self.destory();
        });
        _self.footer.appendChild(_self.btnCancel);
    }

    baseDialog.prototype.OkClick = function (clickEvent) {
        var _self = this;
        $(_self.btnOk).click(clickEvent);
    }

    baseDialog.prototype.CancelClick = function (clickEvent) {
        var _self = this;
        $(_self.btnCancel).click(clickEvent);
    }

    baseDialog.prototype.show = function () {
        var _self = this;
        $(_self.dialog).addClass("show");
        document.body.appendChild(_self.dialog);
    }

    baseDialog.prototype.hide = function () {
        var _self = this;
        $(_self.dialog).removeClass("show");
    }

    baseDialog.prototype.destory = function () {
        var _self = this;
        document.body.removeChild(_self.dialog);
    }

    component.baseDialog = baseDialog;
    
    return kf;
})(window.kf || {}, jQuery);



