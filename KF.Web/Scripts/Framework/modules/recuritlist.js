/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/div_list_info.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/dialog.js" />
/// <reference path="../../company.js" />
/// <reference path="../../recurit.js" />
/// <reference path="../../university.js" />
/// <reference path="../../major.js" />


var _recurits,_company,_universitys,_universityGridDialog,_majorGridDialog,_majors;
function pageInit() {
    initCompany();
    _company.load();
    initYears();
    initUniversitys();
    initRecurits();
    initUniversityGridDialog();
    majorsGridDialog();
    initMajors();

    $("#btnSelectUniveristy").click(function () {
        _universitys.load();
    });

    $("#years").on("click", "label", function () {
        $(this).addClass("current").siblings().removeClass("current");
        getMajorInRecurit();
    });

    $("#universitys").on("click","label", function () {
        $(this).addClass("current").siblings().removeClass("current");
        getMajorInRecurit();
    });

    $("#btnSelectMajors").on("click", function () {
        if ($("#universitys").find("label.current").length == 0) {
            $.showErrorMessage("请先选择高校");
            return false;
        }
        var universityId = $("#universitys").find("label.current").attr("universityId");
        _majors.filter.universityId = universityId;
        _majors.load();
    });

    _universitys.filter.companyId = getCompanyId();

    _universitys.filter.year = getYear();
    $.when(_universitys.getlistInRecurit()).then(function () {
        $("#universitys").find("label:nth-child(1)").addClass("current");
        getMajorInRecurit();
    });
}

function initCompany() {
    _company = new company();
    _company.companyId = getCompanyId();
    _company.addLoadObserver(initPageHeader);
}

function initPageHeader(value) {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    var i = new kf.components.icon_return();
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: value.companyName + " 招聘" });
    header.appendChild(h1);

    var btnRight = new kf.base.buttonUI({
        className: "ui-btn",
        text: "...",
        click: function () {
            window.location.href = "/home/province/city/company/recurit/detail.html?companyId=" + _company.companyId;
        }
    });
    header.appendChild(btnRight.export());
}

function initYears() {
    var fragment = document.createDocumentFragment();
    var year = (new Date()).getFullYear();
    var label_prev_year = kf.base.labelUI({ text: year -1,className:"ui-label" });
    fragment.appendChild(label_prev_year);
    var label_year = kf.base.labelUI({ text: year,className:"ui-label" });
    $(label_year).addClass("current");
    fragment.appendChild(label_year);
    var label_next_year = kf.base.labelUI({ text: year + 1,className:"ui-label" });
    fragment.appendChild(label_next_year);
    document.getElementById("years").appendChild(fragment);
}

function initRecurits() {
    _recurits = new recurits();
    _recurits.filter.companyId = getCompanyId();
    _recurits.filter.years = (new Date()).getFullYear();
    _recurits.filter.universityId = 0;
    _recurits.afterLoad = function () {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(_self.value, function (i, value) {
            var div_list_info = new kf.components.div_list_info();
            var span_recurit = kf.base.spanUI({ text: value.majorName });
            div_list_info.appendChild(span_recurit);
        });
        document.getElementById("majors").innerHTML = "";
        document.getElementById("majors").appendChild(fragment);
    }

}

function initUniversitys() {
    _universitys = new universitys();
    _universitys.filter.universityName = "";
    _universitys.filter.pageIndex = 1;
    _universitys.filter.pageSize = 50;
    _universitys.afterLoad = function () {
        var _self = this;
        _universityGridDialog.clearRows();
        _universityGridDialog.addRows(_self.values);
        _universityGridDialog.show();
    }
    _universitys.afterGetListInRecurit = function () {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(_self.values, function (i, value) {
            var label = kf.base.labelUI({ text: value.universityName,className:"ui-label" });
            $(label).attr("universityId", value.universityId);
            fragment.appendChild(label);
        });
        document.getElementById("universitys").innerHTML = "";
        document.getElementById("universitys").appendChild(fragment);
    }
}

function initUniversityGridDialog() {
    var columns = [{ name: "universityName", headerName: "高校名称" }];
    _universityGridDialog = new kf.components.gridDialog({
        showPage:true
    });
    _universityGridDialog.setTitle("高校选择");
    _universityGridDialog.initHeader(columns);
    _universityGridDialog.searchHandler(function (universityName) {
        _universitys.load();
    });
    _universityGridDialog.okHandler(function (value) {
        if ($("#universitys").find("label[universityId='" + value.universityId + "']").length > 0) return;
        var label_University = kf.base.labelUI({ className: "ui-label", text: value.universityName });
        $(label_University).attr("universityId", value.universityId);
        document.getElementById("universitys").appendChild(label_University);
    });

    _universityGridDialog.prePage(function () {
        if (_universitys.isFirst()) return;
        _universitys.prePage();
        _universitys.load();
    });
    
    _universityGridDialog.nextPage(function () {
        if (_universitys.isLast()) return;
        _universitys.nextPage();
        _universitys.load();
    });
}

function initMajors() {
    _majors = new majors();
    _majors.filter.universityId = 0;
    _majors.afterLoad = function () {
        var _self = this;
        _majorGridDialog.clearRows();
        _majorGridDialog.addRows(_self.values);
        _majorGridDialog.show();
    }
    _majors.afterGetListInRecurit = function () {
        var _self = this;
        var fragment = document.createDocumentFragment();
        $.each(_self.values, function (i, value) {
            var li = kf.base.liUI();
            var div_list_info = new kf.components.div_list_info();
            li.appendChild(div_list_info.export());
            var span = kf.base.spanUI({ text: value.majorName });
            div_list_info.appendChild(span);
            fragment.appendChild(li);
        });
        document.getElementById("majors").innerHTML = "";
        document.getElementById("majors").appendChild(fragment);
    }
}

function majorsGridDialog() {
    var columns = [{ name: "majorName", headerName: "专业名称" }];
    _majorGridDialog = new kf.components.gridDialog();
    _majorGridDialog.setTitle("选择专业");
    _majorGridDialog.initHeader(columns);
    _majorGridDialog.okHandler(function (value) {
        if ($("#majors").find("label[majorId='" + value + "']").length > 0) return;
        addRecurit(value.majorId);
    });
}

function addRecurit(majorId) {
    var _recurit = new recurit();
    _recurit.companyId = getCompanyId();
    _recurit.year = getYear();
    _recurit.majorId = majorId;
    _recurit.afterAdd = function () {
        var _self = this;
        var _major = new major();
        _major.majorId = _self.majorId;
        _major.afterLoad = function () {
            addRecuritLiUI(this);
        }
        _major.load();
    }
    _recurit.add();
}

function addRecuritLiUI(value) {
    var li = kf.base.liUI();
    var div_list_info = new kf.components.div_list_info();
    li.appendChild(div_list_info.export());

    var span = kf.base.spanUI({ text: value.majorName });
    div_list_info.appendChild(span);

    document.getElementById("majors").appendChild(li);
}

function getCompanyId() {
    var companyId = $.getQueryString("companyId");
    if (companyId == null) {
        return 0;
    } else {
        return parseInt(companyId);
    }
}

function getUniversityId() {
    var universityId = $("#universitys").find("label.current").attr("universityId");
    return universityId;
}

function getYear() {
    var year = $("#years").find("label.current").text();
    return parseInt(year);
}

function getMajorInRecurit() {
    var universityId = $("#universitys").find("label.current").attr("universityId");
    if (universityId == undefined) return;
    var year = $("#years").find("label.current").text();

    _majors.filter.universityId = universityId;
    _majors.filter.year = year;
    _majors.filter.companyId = getCompanyId();
    _majors.getListInRecurit();
}


