/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="/Scripts/Framework/Components/div_list_info.js" />
/// <reference path="/Scripts/city.js" />
/// <reference path="/Scripts/company.js" />


var _city,_companies;
function pageInit() {
    initCity();
    _city.load();
    initCompanys();
    _companies.load();
}

function initCity() {
    _city = new city();
    _city.cityId = getCityId();
    _city.afterLoad = function () {
        initPageHeader();
    }
}

function initCompanys() {
    _companies = new companys();
    _companies.filter.cityId = getCityId();
    _companies.afterLoad = function () {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(_self.values, function (i, value) {
            var div_list_info = new kf.components.div_list_info();
            fragment.appendChild(div_list_info.export());

            var span_company = kf.base.spanUI({ text: value.companyName });
            div_list_info.appendChild(span_company);
            div_list_info.appendChild(companyOperation(value));
        });
        document.getElementById("lstCompany").innerHTML = "";
        document.getElementById("lstCompany").appendChild(fragment);
    }
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");

    var i = kf.base.iUI({
        className: "ui-icon-return",
        click: function () {
            history.back();
        }
    });
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: _city.cityName });
    header.appendChild(h1);

    var btnRight = kf.base.buttonUI({
        className:"ui-btn",
        text: "...",
        click: function () {
            window.location.href = "/home/province/city/company/detail.html?cityId=" + _city.cityId;
        }
    });
    header.appendChild(btnRight);
}

function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];

    var prePage = kf.base.buttonUI({
        text: "前一页",
        click: function () {
            
        }
    });
}

function companyOperation(value) {
    var div_operation = kf.base.divUI();
    var companyDetail = kf.base.aUI({
        text: "详情",
        href:  "/home/province/city/company/detail.html?companyId=" + value.companyId
    });
    div_operation.appendChild(companyDetail);

    var blank = kf.base.spanUI({ text: " " });
    div_operation.appendChild(blank);

    var recurit = kf.base.aUI({
        text: "招聘",
        href: "/home/province/city/company/recurit/list.html?companyId=" + value.companyId
    });
    div_operation.appendChild(recurit);
    return div_operation;
}

function getCityId() {
    var cityId = $.getQueryString("cityId");
    if (cityId == null) {
        return 0;
    } else {
        return parseInt(cityId);
    }
}