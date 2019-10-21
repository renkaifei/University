/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function province() {
    this.provinceId = 0;
    this.provinceName = "";
    this.loadObservers = [];
}

province.prototype.load = function () {
    $.ajax({
        url: "/provinceService",
        data: {
            provinceId: this.provinceId,
            option: "getone"
        },
        success: $.proxy(function (ret) {
            this.provinceName = ret.ProvinceName;
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        },this)
    });
}

province.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

function provinces() {
    kf.util.entities.call(this);
    this.loadObservers = [];
}

$.extend(provinces.prototype, kf.util.entities.prototype);

provinces.prototype.load = function () {
    return $.ajax({
        url: "/provinceService",
        data: {
            option: "getlist"
        },
        success: $.proxy(function (ret) {
            var count = ret.length;
            for (var i = 0; i < count; i++) {
                var _province = new province();
                _province.provinceId = ret[i].ProvinceId;
                _province.provinceName = ret[i].ProvinceName;
                this.add(_province.provinceId, _province);
            }
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this.values);
            }
        }, this)
    });
}

provinces.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}
