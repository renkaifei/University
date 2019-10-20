/// <reference path="/Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../../university.js" />
/// <reference path="../Components/formItem_text.js" />
/// <reference path="../../major.js" />
/// <reference path="../../recurit.js" />

var _university, _major, _recurit;
function pageInit() {
    initPageHeader();
    initUniversity();
    initMajor();
    initRecurit();

    $.when()
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

    var h1 = kf.base.h1UI({ text: "招聘详情" });
    header.appendChild(h1);
}

function initUniversity() {
    _university = new university();
}

function initMajor() {
    _major = new major();
}

function initMajor() {
    _university = new university();
}

function initRecurit() {
    _recurit = new recurit();
    _recurit.recuritId = getRecuritId();
}

function getRecuritId() {
    var _recuritId = $.getQueryString("recuritId");
    if (_recuritId == null) {
        return 0;
    } else {
        return parseInt(_recuritId);
    }
}