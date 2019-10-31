var kf = (function (kf, $) {
    var components = kf.components = kf.components || {};

    components.div_list_info = function () {
        this.li = kf.base.liUI();
        this.div_info = kf.base.divUI();
        $(this.div_info).addClass("ui-list-info ui-border-b");
        this.li.appendChild(this.div_info);
    }

    components.div_list_info.prototype.appendChild = function (newChild) {
        this.div_info.appendChild(newChild)
    };

    components.div_list_info.prototype.export = function () {
        return this.li;
    }

    return kf;
})(window.kf || {}, jQuery);