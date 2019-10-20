/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function city() {
    this.cityId = 0;
    this.cityName = "";
}

city.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/cityService",
        data: {
            cityId: _self.cityId,
            option:"getone"
        },
        success: function (ret) {
            _self.cityName = ret.CityName;
            _self.afterLoad();
        }
    })
}

city.prototype.afterLoad = function () {
    
}

city.prototype.listItemUI = function () {
    var _self = this;
    var li = liUI();

    var div_list_info = list_infoUI();
    li.appendChild(div_list_info);

    var p_cityName = pUI({ text:_self.cityName });
    div_list_info.appendChild(p_cityName);

    var div_operation = operationUI({
        university: {
            text: "高校",
            click: function () {
                window.location.href = "/home/province/city/university/list.html?cityId=" + _self.cityId;
            }
        },
        hoursePrice: {
            text: "房价",
            click: function () {
                window.location.href = "/home/province/city/hoursePrice/list.html?cityId=" + _self.cityId;
            }
        },
        company: {
            text: "单位",
            click: function () {
                window.location.href = "/home/province/city/company/list.html?cityId=" + _self.cityId;
            }
        }
    });
    div_list_info.appendChild(div_operation);

    return li;
}

function citys() {
    kf.util.entities.call(this);
}

$.extend(citys.prototype, kf.util.entities.prototype);

citys.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/cityService",
        data: {
            option:"getlist",
            provinceId: _self.filter.provinceId
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _city = new city();
                _city.cityId = item.CityId;
                _city.cityName = item.CityName;
                _self.add(_city.cityId,_city);
            });
            _self.afterLoad();
        }
    });
}

citys.prototype.afterLoad = function () {

}