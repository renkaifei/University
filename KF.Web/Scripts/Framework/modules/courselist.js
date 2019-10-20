/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/div_list_info.js" />
/// <reference path="../../university.js" />
/// <reference path="../../course.js" />


var _courses, _university;

function pageInit() {
    initUniversity();
    _university.load();
    initCourses();
    _courses.load();
}

function initUniversity() {
    _university = new university();
    _university.universityId = getUniversityId();
    _university.afterLoad = function () {
        var _self = this;
        var header = document.getElementsByTagName("header")[0];
        $(header).addClass("ui-header ui-header-positive");

        var i = new kf.components.icon_return();
        header.appendChild(i);

        var h1 = kf.base.h1UI({ text: _self.universityName + " 课程列表" });
        header.appendChild(h1);

        var btnRight = new kf.base.buttonUI({
            className: "ui-btn ui-pointer",
            text: "...",
            click: function () {
                window.location.href = "/home/province/city/university/course/detail.html?universityId=" + _self.universityId;
            }
        });
        header.appendChild(btnRight.export());
    }
}

function initCourses() {
    _courses = new courses();
    _courses.filter.universityId = getUniversityId();
    _courses.afterLoad = function () {
        var fragment = document.createDocumentFragment();
        $.each(this.values, function (i,value) {
            var div_list_info = new kf.components.div_list_info();
            var aUI = kf.base.aUI({
                text: value.courseName,
                href: "/home/province/city/university/course/detail.html?courseId=" + value.courseId
            });
            div_list_info.appendChild(aUI);
            fragment.appendChild(div_list_info.export());
        });
        document.getElementById("courses").innerHTML = "";
        document.getElementById("courses").appendChild(fragment);
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