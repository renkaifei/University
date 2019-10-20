/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/formItem_checkbox.js" />
/// <reference path="../Components/searchBox.js" />
/// <reference path="../../major.js" />
/// <reference path="../../course.js" />

var _major, _courses, _majorCourses;

function pageInit() {
    initMajor();
    initCourses();
    initMajorCourses();
    _major.load();
    $.when(_courses.load(), _majorCourses.load()).then(function () {
        $.each(_majorCourses.values, function (i, value) {
            var item = _courses.getOne(value.courseId)
            item["checked"] = true;
        });

        var fragment = document.createDocumentFragment();
        $.each(_courses.values, function (i, value) {
            var formItem_course = new kf.components.formItem_checkbox({
                label: value.courseName,
                checked: value.checked,
                data:value.courseId
            });
            fragment.appendChild(formItem_course.export());
        });
        document.getElementById("lstCourses").innerHTML = "";
        document.getElementById("lstCourses").appendChild(fragment);
    });

    $("#lstCourses").on("click", "input:checkbox", function () {
        var _majorCourse = new majorCourse();
        _majorCourse.majorId = getMajorId();
        _majorCourse.courseId = $(this).data("data");
        if (this.checked) {
            _majorCourse.add();
        } else {
            _majorCourse.delete();
        }
    });
}

function initMajor() {
    _major = new major();
    _major.majorId = getMajorId();
    _major.afterLoad = function () {
        var header = document.getElementsByTagName("header")[0];
        $(header).addClass("ui-header ui-header-positive");

        var i = new kf.components.icon_return();
        header.appendChild(i);

        var h1 = kf.base.h1UI({ text: this.majorName });
        header.appendChild(h1);
    }
}

function initCourses() {
    _courses = new courses();
}

function initMajorCourses() {
    _majorCourses = new majorCourses();
    _majorCourses.filter.majorId = getMajorId();
}

function getMajorId() {
    var majorId = $.getQueryString("majorId");
    if (majorId == null) {
        return 0;
    } else {
        return parseInt(majorId);
    }
}