/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/div_list_info.js" />
/// <reference path="../../university.js" />
/// <reference path="../../province.js" />
/// <reference path="../../enrollmentPlan.js" />
/// <reference path="../../major.js" />


var _university, _enrollmentPlans, _provinces, _majors;
function pageInit() {
    initUniversity();
    _university.load();

    initEnrollmentPlans();
    initProvinces();
    initMajors();
    initSearchBox();
    $.when(_provinces.load(), _majors.load()).then(function () {
        _enrollmentPlans.load();
    });
}

function initSearchBox() {
    $("#searchBox").addClass("ui-panel").css("text-align","center");

    var year = (new Date()).getFullYear();
    var label_preYear = kf.base.labelUI({
        text: year - 1,
        className:"ui-label"
    });
    document.getElementById("searchBox").appendChild(label_preYear);
    var label_year = kf.base.labelUI({
        text: year,
        className: "ui-label current"
    });
    document.getElementById("searchBox").appendChild(label_year);
    var label_nextYear = kf.base.labelUI({
        text: year + 1,
        className: "ui-label"
    });
    document.getElementById("searchBox").appendChild(label_nextYear);
    $("#searchBox").on("click", "label", function () {
        $(this).addClass("current").siblings().removeClass("current");
        var year = $(this).text();
        _enrollmentPlans.filter.year = year;
        _enrollmentPlans.load();
    });
}

function initUniversity() {
    _university = new university();
    _university.universityId = getUniversityId();
    _university.addLoadObserver(initPageHeaderUI);
}

function initPageHeaderUI(value) {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");

    var i = new kf.components.icon_return();
    header.appendChild(i);
    var h1 = kf.base.h1UI({ text: value.universityName });
    header.appendChild(h1);

    var btnRight = new kf.base.buttonUI({
        className: "ui-btn",
        text: "...",
        click: function () {
            window.location.href = "/home/province/city/university/enrollmentPlan/detail.html?universityId=" + getUniversityId();
        }
    });
    header.appendChild(btnRight.export());
}

function initProvinces() {
    _provinces = new provinces();
}

function initMajors() {
    _majors = new majors();
    _majors.filter.universityId = getUniversityId();
}

function initEnrollmentPlans() {
    _enrollmentPlans = new enrollmentPlans();
    _enrollmentPlans.filter.universityId = getUniversityId();
    _enrollmentPlans.filter.year = (new Date()).getFullYear();
    _enrollmentPlans.addLoadObserver(showEnrollmentPlansUI);
}

function showEnrollmentPlansUI(values) {
    var fragment = document.createDocumentFragment();
    $.each(values, function (i, value) {
        value.provinceName = _provinces.item(value.provinceId).provinceName;

        var div_list_info = new kf.components.div_list_info();
        fragment.appendChild(div_list_info.export());

        var label_year = kf.base.labelUI({ text: "年份:" });
        div_list_info.appendChild(label_year);

        var year = kf.base.labelUI({ text: value.year });
        div_list_info.appendChild(year);

        var label_province = kf.base.labelUI({ text: "|省份:" });
        div_list_info.appendChild(label_province);

        var province = kf.base.labelUI({ text: value.provinceName });
        div_list_info.appendChild(province);

        var label_major = kf.base.labelUI({ text: "|专业:" });
        div_list_info.appendChild(label_major);

        var majorName = kf.base.labelUI({ text: value.majorName });
        div_list_info.appendChild(majorName);

        var label_planNumber = kf.base.labelUI({ text: "|招生人数:" });
        div_list_info.appendChild(label_planNumber);

        var planNumber = kf.base.labelUI({ text: value.planNumber });
        div_list_info.appendChild(planNumber);
    });

    document.getElementById("enrollmentPlans").innerHTML = "";
    document.getElementById("enrollmentPlans").appendChild(fragment);
}

function getUniversityId() {
    var universityId = $.getQueryString("universityId");
    if (universityId == null) {
        return 0;
    } else {
        return parseInt(universityId);
    }
}






