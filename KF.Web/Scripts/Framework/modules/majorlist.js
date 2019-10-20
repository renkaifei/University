/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/div_list_info.js" />
/// <reference path="../Components/searchBox.js" />
/// <reference path="../../university.js" />
/// <reference path="../../major.js" />


var _university, _majors;
function pageInit() {
    initSearchBox();
    initUniversity();
    initMajors();
    _university.loadBasic();
    _majors.load();
}

function initUniversity(){
    _university = new university();
    _university.universityId = getUniversityId();
    _university.afterLoad = function () {
        var header = document.getElementsByTagName("header")[0];
        $(header).addClass("ui-header ui-header-positive");

        var i = new kf.components.icon_return();
        header.appendChild(i);

        var h1 = kf.base.h1UI({ text: this.universityName });
        header.appendChild(h1);
    };
}

function initSearchBox() {
    var searchBox = new kf.components.searchBox({
        click: function (majorName) {
            _majors.filter.majorName = majorName;
            _majors.load();
        }
    });
    document.getElementById("searchBox").appendChild(searchBox.export());
}

function initMajors() {
    _majors = new majors();
    _majors.filter.universityId = getUniversityId();
    _majors.afterLoad = function () {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(_self.values, function (i, value) {
            var div_list_info = new kf.components.div_list_info();
            fragment.appendChild(div_list_info.export());

            var label = kf.base.labelUI({ text: value.majorName });
            div_list_info.appendChild(label);

            var div_operation = kf.base.divUI();
            div_list_info.appendChild(div_operation);

            var a_detail = kf.base.aUI({ text: "详情", href: "/home/province/city/university/major/detail.html?majorId=" + value.majorId });
            $(a_detail).addClass("ui-label-s");
            div_operation.appendChild(a_detail);

            var a_assignCourse = kf.base.aUI({ text: "课程设置", href: "/home/province/city/university/major/assignCourses.html?majorId=" + value.majorId });
            $(a_assignCourse).addClass("ui-label-s");
            div_operation.appendChild(a_assignCourse);
        });
        document.getElementById("majors").innerHTML = "";
        document.getElementById("majors").appendChild(fragment);
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