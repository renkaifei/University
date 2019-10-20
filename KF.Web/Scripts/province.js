/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function province() {
    this.provinceId = 0;
    this.provinceName = "";
    this.loadObservers = [];
}

province.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/provinceService",
        data: {
            provinceId: _self.provinceId,
            option: "getone"
        },
        success: function (ret) {
            _self.provinceName = ret.ProvinceName;
            var count = this.loadObservers.length;
            for(var i =0;i<count;i++){
                this.loadObservers[i](this);
            }
        }
    });
};

function provinces() {
    kf.util.entities.call(this);
    this.loadObservers = [];
}

$.extend(provinces.prototype, kf.util.entities.prototype);

provinces.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/provinceService",
        data: {
            option: "getlist"
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _province = new province();
                _province.provinceId = item.ProvinceId;
                _province.provinceName = item.ProvinceName;
                _self.add(_province.provinceId, _province);
            });
            var count = this.loadObservers.length;
            for(var i = 0;i<count;i++){
                this.loadObservers[i](this.values);
            }
        }
    });
};
