/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />

var kf = (function (kf,$) {
    var components = kf.components = kf.components || {};

    components.icon_return = function () {
        var i = new kf.base.iUI({
            className: "ui-icon-return",
            click: function () {
                history.back();
            }
        });
        return i.export();
    }

    return kf;
})(window.kf || {},jQuery);