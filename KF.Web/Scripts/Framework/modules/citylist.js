/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/util.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="/Scripts/Framework/Components/div_list_info.js" />
/// <reference path="/Scripts/province.js" />
/// <reference path="/Scripts/city.js" />
/// <reference path="/Scripts/Framework/Components/pageHeader.js" />

var _province, _cities;
function pageInit() {
    initProvince();
    _province.load();
    initCities();
    _cities.load();
}

function initProvince() {
    _province = new province();
    _province.provinceId = getProvinceId();
    _province.afterLoad = function () {
        var _self = this;
        var header = document.getElementsByTagName("header")[0];
        $(header).addClass("ui-header ui-header-positive");
        
        var i = new kf.components.icon_return();
        header.appendChild(i);
        
        var h1 = kf.base.h1UI({ text: _self.provinceName });
        header.appendChild(h1);
    }
}

function initCities() {
    _cities = new citys();
    _cities.filter.provinceId = getProvinceId();
    _cities.afterLoad = function () {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(_self.values, function (i, value) {
            var div_list_info = new kf.components.div_list_info();
            var span_city = kf.base.spanUI({text:value.cityName});
            div_list_info.appendChild(span_city);

            var div_operation = kf.base.divUI();
            div_list_info.appendChild(div_operation);

            var university = kf.base.aUI({
                text: "高校",
                href: "/home/province/city/university/list.html?cityId=" + value.cityId,
                className:"ui-label-s"
            });
            div_operation.appendChild(university);
            var company = kf.base.aUI({
                text: "公司",
                href: "/home/province/city/company/list.html?cityId=" + value.cityId,
                className:"ui-label-s"
            });
            div_operation.appendChild(company);

            fragment.appendChild(div_list_info.export());
        });
        document.getElementById("lstCity").appendChild(fragment);
    }
}

function getProvinceId() {
    var provinceId = $.getQueryString("provinceId");
    if (provinceId == null) {
        return 0;
    } else {
        return parseInt(provinceId);
    }
}

