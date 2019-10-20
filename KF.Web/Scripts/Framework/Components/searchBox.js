/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />


var kf = (function (kf,$) {
    var components = kf.components = kf.components || {};

    var searchBox = components.searchBox = function (option) {
        option = option || {};

        var _self = this;
        _self.root = kf.base.divUI();
        $(_self.root).addClass("ui-searchbar-wrap");

        _self.searchBar = kf.base.divUI({ className: "ui-searchbar ui-border-radius" });
        _self.root.appendChild(_self.searchBar);

        _self.searchBarInput = kf.base.divUI({ className: "ui-searchbar-input" });
        _self.searchBar.appendChild(_self.searchBarInput);

        _self.textbox = new kf.base.textboxUI();
        _self.searchBarInput.appendChild(_self.textbox.export());

        _self.btnSearch = new kf.base.buttonUI({
            className: "ui-searchbar-cancel",
            text: "查询"
        });

        if (option.click) _self.btnSearch.addClickObserver($.proxy(function () {
            var value = this.textbox.getValue();
            option.click(value);
        }, this))

        _self.root.appendChild(_self.btnSearch.export());
    }

    searchBox.prototype.export = function () {
        var _self = this;
        return _self.root;
    }

    return kf;
})(window.kf || {},jQuery);