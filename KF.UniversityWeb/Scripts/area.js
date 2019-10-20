/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function area() {
    this.areaId = 0;
    this.areaName = "";
    this.cityId = 0;
}

area.prototype.listItemUI_label = function () {
    var _self = this;

    var label = labelSmallUI({
        text: _self.areaName
    });
    $(label).attr("areaId", _self.areaId);
    return label;
}

area.prototype.select_option = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var option = document.createElement("option");
    option.value = _self.areaId;
    option.text = _self.areaName;

    fragment.appendChild(option);

    return fragment;
}

function areas() {
    entities.call(this);
}

$.extend(areas.prototype, entities.prototype);

areas.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/areaService",
        data: {
            cityId: _self.filter.cityId,
            option:"getlist"
        },
        success: function (ret) {
            var _area;
            $.each(ret, function (i, item) {
                _area = new area();
                _area.areaId = item.AreaId;
                _area.areaName = item.AreaName;
                _area.cityId = item.CityId;
                _self.add(_area.areaId, _area);
            });
            _self.afterLoad();
        }
    });
}

areas.prototype.afterLoad = function () {

}

areas.prototype.getAreaNameArray = function () {
    var _self = this;
    var arr = [];
    for (var i = 0; i < _self.values.length; i++) {
        arr.push(_self.values[i].areaName);
    }
    return arr;
}

areas.prototype.listUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();
    $.each(_self.values, function (i, item) {
        fragment.appendChild(item.listItemUI_label());
    });

    return fragment;
}

areas.prototype.select_options = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    $.each(_self.values, function (i, item) {
        fragment.appendChild(item.select_option());
    });

    return fragment;
}