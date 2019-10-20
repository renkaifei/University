/// <reference path="/Scripts/jquery-1.12.4.js" />
/// <reference path="/Scripts/common.js" />

function province() {
    this.provinceId = 0;
    this.provinceName = "";
}

province.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/anonymousGetOneService",
        data: {
            provinceId: _self.provinceId,
            service: "province"
        },
        success: function (ret) {
            _self.provinceName = ret.ProvinceName;
            _self.afterLoad();
        }
    });
}

province.prototype.afterLoad = function () {

}

province.prototype.listItem_label = function () {
    var _self = this;
    var label = labelSmallUI({
        text: _self.provinceName,
        data: {
            provinceId:_self.provinceId
        }
    });
    return label;
}

function provinces() {
    entities.call(this);
}

$.extend(provinces.prototype, entities.prototype);

provinces.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/anonymousGetListService",
        data: {
            service: "province"
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _province = new province();
                _province.provinceId = item.ProvinceId;
                _province.provinceName = item.ProvinceName;
                _self.add(_province.provinceId, _province);
            });
            _self.afterLoad();
        }
    });
}

provinces.prototype.afterLoad = function () {

}

provinces.prototype.listUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();
    $.each(_self.values, function (i, item) {
        fragment.appendChild(item.listItem_label());
    });
    return fragment;
}