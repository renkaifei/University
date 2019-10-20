/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Components/base.js" />

var kf = (function (kf,$) {
    var page = kf.page = kf.page || {};

    page.header = function () {
        this.root = kf.base.divUI();
        this.iReturn = kf.base.iUI();
        this.headerName = kf.base.h1UI();
        this.btnRight = kf.base.buttonUI();

        var _self = this;
        this.root.appendChild(_self.iReturn);
        this.root.appendChild(_self.headerName);
        this.root.appendChild(_self.btnRight);
        $(_self.btnRight).text("...");
    }

    page.header.prototype.load = function (option) {
        var _self = this;
        var option = option || {};
        if (option.canReturn) {
            $(_self.iReturn).click(function () {
                history.back();
            });
        } else {
            $(_self.iReturn).css("display", "none");
        }
        $(_self.headerName).text(option.headerName);
        if (option.action) {
            $(_self.btnRight).click(option.action);
        } else {
            $(_self.btnRight).css("display", "none");
        }
    }

    page.header.prototype.export = function () {
        var _self = this;
        return _self.root;
    }

    return kf;
})(window.kf || {},jQuery);