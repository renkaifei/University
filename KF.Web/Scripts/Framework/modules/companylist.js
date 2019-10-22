/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="/Scripts/Framework/Components/div_list_info.js" />
/// <reference path="/Scripts/util.js" />
/// <reference path="/Scripts/city.js" />
/// <reference path="/Scripts/company.js" />
/// <reference path="../Components/icon_return.js" />


var _city,_companies;
function pageInit() {
    initCity();
    initPageFooter()
    _city.load();
    initCompanys();
    _companies.load();
}

function initCity() {
    _city = new city();
    _city.cityId = getCityId();
    _city.addLoadObserver(initPageHeader);
}

function initPageHeader(value) {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");

    var i = new kf.components.icon_return();
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: value.cityName });
    header.appendChild(h1);

    var btnRight = new kf.base.buttonUI({
        className:"ui-btn",
        text: "...",
        click: function () {
            window.location.href = "/home/province/city/company/detail.html?cityId=" + _city.cityId;
        }
    });
    header.appendChild(btnRight.export());
}

function initCompanys() {
    _companies = new companys();
    _companies.filter.cityId = getCityId();
    _companies.addLoadObserver(initCompanyListUI);
}

function initCompanyListUI(values) {
    var fragment = document.createDocumentFragment();
    $.each(values, function (i, value) {
        var div_list_info = new kf.components.div_list_info();
        fragment.appendChild(div_list_info.export());

        var span_company = kf.base.spanUI({ text: value.companyName });
        div_list_info.appendChild(span_company);

        var div_operation = kf.base.divUI();
        div_list_info.appendChild(div_operation);
        var companyDetail = kf.base.aUI({
            className:"ui-label-s",
            text: "详情",
            href: "/home/province/city/company/detail.html?companyId=" + value.companyId
        });
        div_operation.appendChild(companyDetail);

        var recurit = kf.base.aUI({
            className:"ui-label-s",
            text: "招聘",
            href: "/home/province/city/company/recurit/list.html?companyId=" + value.companyId
        });
        div_operation.appendChild(recurit);
    });
    document.getElementById("lstCompany").innerHTML = "";
    document.getElementById("lstCompany").appendChild(fragment);
}



function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");

    var prePage = new kf.base.buttonUI({
        className:"ui-btn-lg ui-btn-primary",
        text: "前一页",
        click: function () {
            if (_companies.isFirst()) return;
            _companies.prePage();
            _companies.load();
        }
    });
    footer.appendChild(prePage.export());
    
    var nextPage = new kf.base.buttonUI({
        className: "ui-btn-lg ui-btn-primary",
        text: "后一页",
        click: function () {
            if (_companies.isLast()) return;
            _companies.nextPage();
            _companies.load();
        }
    });
    footer.appendChild(nextPage.export())
}

function getCityId() {
    var cityId = $.getQueryString("cityId");
    if (cityId == null) {
        return 0;
    } else {
        return parseInt(cityId);
    }
}
