/// <reference path="/Scripts/jquery-1.12.4.js" />
/// <reference path="/Scripts/common.js" />

function city() {
    this.cityId = 0;
    this.cityName = "";
}

city.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/anonymousGetOneService",
        data: {
            cityId: _self.cityId,
            service: "city"
        },
        success: function (ret) {
            _self.cityName = ret.CityName;
            _self.afterLoad();
        }
    })
}

city.prototype.afterLoad = function () {

}

city.prototype.listItemUI_label = function () {
    var _self = this;
    var label = labelSmallUI({
        text: _self.cityName,
        data: {
            "cityId": _self.cityId
        }
    });
    return label;
}

function citys() {
    entities.call(this);
}

$.extend(citys.prototype, entities.prototype);

citys.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/anonymousGetListService",
        data: {
            service: "city",
            provinceId: _self.filter.provinceId
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i, item) {
                var _city = new city();
                _city.cityId = item.CityId;
                _city.cityName = item.CityName;
                _self.add(_city.cityId, _city);
            });
            _self.afterLoad();
        }
    });
}

citys.prototype.afterLoad = function () {

}

citys.prototype.listUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();
    $.each(_self.values, function (i, item) {
        fragment.appendChild(item.listItemUI_label());
    });
    return fragment;
}