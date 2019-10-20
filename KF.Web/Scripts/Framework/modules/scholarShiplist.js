/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/div_list_info.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../../university.js" />
/// <reference path="../../scholarship.js" />

var _university, _scholarships;
function pageInit() {
    initUniversity();
    initScholarShips();
    _university.load();
    _scholarships.load();
}

function initUniversity() {
    _university = new university();
    _university.universityId = getUniversityId();
    _university.afterLoad = function () {
        var header = document.getElementsByTagName("header")[0];
        $(header).addClass("ui-header ui-header-positive");

        var i = new kf.components.icon_return();
        header.appendChild(i);

        var h1 = kf.base.h1UI({ text: this.universityName + " 奖学金" });
        header.appendChild(h1);

        var btnRight = new kf.base.buttonUI({
            className: "ui-btn",
            text: "...",
            click: function () {
                window.location.href = "/home/province/city/university/scholarship/detail.html";
            }
        });
        header.appendChild(btnRight.export());
    }
}

function initScholarShips() {
    _scholarships = new scholarShips();
    _scholarships.filter.universityId = getUniversityId();
    _scholarships.afterLoad = function () {
        var fragment = document.createDocumentFragment();
        var count = this.values.length;
        for (var i = 0; i < count; i++) {
            var div_list_info = new kf.components.div_list_info();
            
            var labelName = kf.base.labelUI({ text: this.values["scholarshipName"] });
            div_list_info.appendChild(labelName);

            var div_operation = kf.base.divUI();

            var a_Detail = kf.base.aUI({
                className: "ui-label-s",
                text: "详情",
                href: "/home/province/city/university/scholarship/detail.html?scholarShipId=" + value.scholarShipId
            })
            fragment.appendChild(div_list_info.export());
        }
        document.getElementById("scholarships").appendChild(fragment);
    }
}

function getUniversityId() {
    var universityId = $.getQueryString("universityId");
    if (universityId == null) {
        return 0;
    } else {
        return parseInt(universityId);
    }
}

