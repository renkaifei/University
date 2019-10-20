/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="/Scripts/Framework/Components/div_list_info.js" />

function pageInit() {
    initPageHeader();
    initList();
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");

    var i = new kf.components.icon_return();
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: "管理台" });
    header.appendChild(h1);
}

function initList() {
    var lst = document.getElementById("lst");
    var banners = [{ text: "高校管理", href: "/home/province/list.html" }];
    var fragment = document.createDocumentFragment();
    $.each(banners, function (i, banner) {
        var div_list_info = new kf.components.div_list_info();
        var a = kf.base.aUI({ text: banner.text, href: banner.href });
        div_list_info.appendChild(a);
        fragment.appendChild(div_list_info.export());
    });
    lst.appendChild(fragment);
}