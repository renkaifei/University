/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/formItem_text.js" />
/// <reference path="../Components/formItem_select.js" />
/// <reference path="../../course.js" />


var _course;
function pageInit() {
    initPageHeader();
    initPageFooter();
    initCourse();
    if (_course.isNew()) {
        showCourseUI();
    } else {
        _course.load();
    }
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    var i = new kf.components.icon_return();
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: "课程详情" });
    header.appendChild(h1);
}

function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");

    var btnOk = new kf.base.buttonUI({
        className:"ui-btn-lg ui-btn-primary",
        text: "确定",
        click: function () {
            if (!_course.validate()) return false;
            if (_course.isNew()) {
                _course.add();
            } else {
                _course.update();
            }
        }
    });
    footer.appendChild(btnOk.export());
}

function initCourse() {
    _course = new course();
    _course.courseId = getCourseId();
    if (_course.isNew()) {
        _course.afterAdd = function () {
            history.back();
        }
        showCourseUI();
    } else {
        _course.afterLoad = function () {
            var _self = this;
            showCourseUI();
        }
        _course.afterUpdate = function () {
            history.back();
        }
    }
}

function showCourseUI() {
    var fragment = document.createDocumentFragment();
    var formItem_courseName = new kf.components.formItem_text({
        label: "课程名称",
        value: _course.courseName,
        change: function (value) {
            _course.courseName = value;
        },
        clear: function () {
            _course.courseName = "";
        }
    });
    fragment.appendChild(formItem_courseName.export());

    var formItem_courseType = new kf.components.formItem_select({
        label: "课程类型",
        initValues: [
            { value: "0", text: "" },
            { value: "1", text: "基础课" },
            { value: "2", text: "专业课" }
        ],
        value: _course.courseType,
        selectIndexChanged: function (value) {
            _course.courseType = value;
        }
    });
    fragment.appendChild(formItem_courseType.export());
    document.getElementById("course").innerHTML = "";
    document.getElementById("course").appendChild(fragment);
}

function getCourseId() {
    var courseId = $.getQueryString("courseId");
    if (courseId == null) {
        return 0;
    }
    else {
        return parseInt(courseId);
    }
}