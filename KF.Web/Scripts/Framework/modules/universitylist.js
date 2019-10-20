/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../../city.js" />
/// <reference path="../../university.js" />



var _city, _universitys;
function pageInit() {
    initCity();
    _city.load();
    initUniversitys();
    _universitys.load();
}

function initCity(){
    _city = new city();
    _city.cityId = getCityId();
    _city.afterLoad = function(){
        var header = document.getElementsByTagName("header")[0];
        $(header).addClass("ui-header ui-header-positive");
        var i = new kf.components.icon_return();
        header.appendChild(i);

        var h1UI = kf.base.h1UI({ text: this.cityName });
        header.appendChild(h1UI);

        var btnUI = new kf.base.buttonUI({
            className: "ui-btn",
            text: "...",
            click: function () {
                window.location.href = "/home/province/city/university/detail.html?cityId=" + getCityId();
            }
        });

        header.appendChild(btnUI.export());
    }
}

function initUniversitys() {
    _universitys = new universitys();
    _universitys.filter.provinceId = 0;
    _universitys.filter.cityId = getCityId();
    _universitys.filter.pageIndex = 1;
    _universitys.filter.pageSize = 300;
    _universitys.afterLoad = function () {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(_self.values, function (i, value) {
            var div_list_info = new kf.components.div_list_info();
            var label = kf.base.labelUI({ text: value.universityName });
            div_list_info.appendChild(label);

            var div_operation = kf.base.divUI();
            div_list_info.appendChild(div_operation);
            var universityDetail = kf.base.aUI({
                className: "ui-label-s",
                text: "详情",
                href: "/home/province/city/university/detail.html?universityId=" + value.universityId
            });
            div_operation.appendChild(universityDetail);

            var a_majors = kf.base.aUI({
                className: "ui-label-s",
                text: "专业",
                href: "/home/province/city/university/major/list.html?universityId=" + value.universityId
            });
            div_operation.appendChild(a_majors);

            var a_courses = kf.base.aUI({
                className: "ui-label-s",
                text: "课程",
                href: "/home/province/city/university/course/list.html?universityId=" + value.universityId
            });
            div_operation.appendChild(a_courses);

            var a_enrollmentPlans = kf.base.aUI({
                className: "ui-label-s",
                text: "招生计划",
                href:"/home/province/city/university/enrollmentPlan/list.html?universityId=" + value.universityId
            })
            div_operation.appendChild(a_enrollmentPlans);

            var a_scholarships = kf.base.aUI({
                className:"ui-label-s",
                text:"奖学金",
                href:"/home/province/city/university/scholarship/list.html?universityId=" + value.universityId
            });
            div_operation.appendChild(a_scholarships);

            fragment.appendChild(div_list_info.export());
        });

        document.getElementById("universitys").innerHTML = "";
        document.getElementById("universitys").appendChild(fragment);
    }
}

function getCityId() {
    var cityId = $.getQueryString("cityId");
    if (cityId == null) {
        return 0;
    } else {
        return parseInt(cityId);
    }
}
