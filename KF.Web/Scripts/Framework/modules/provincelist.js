/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="/Scripts/Framework/Components/icon_return.js" />
/// <reference path="/Scripts/Framework/Components/div_list_info.js" />
/// <reference path="/Scripts/province.js" />

var _provinces;
function pageInit() {
    initPageHeader();
    initProvinces();
    _provinces.load();
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    var i = new kf.components.icon_return();
    header.appendChild(i);
    var h1UI = kf.base.h1UI({ text: "省份列表" });
    header.appendChild(h1UI);
}

function initProvinces() {
    _provinces = new provinces();
    _provinces.addLoadObserver(LoadProvinces);
}

function LoadProvinces(values) {
    var fragment = document.createDocumentFragment();
    $.each(values, function (i, value) {
        var div_list_info = new kf.components.div_list_info();
        var a = kf.base.aUI({ text: value.provinceName, href: "/home/province/city/list.html?provinceId=" + value.provinceId });
        div_list_info.appendChild(a);
        fragment.appendChild(div_list_info.export());
    });
    document.getElementById("lstProvince").appendChild(fragment);
}