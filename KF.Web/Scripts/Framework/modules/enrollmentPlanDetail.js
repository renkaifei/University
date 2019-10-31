/// <reference path="../Components/searchBox.js" />
/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/formItem_text.js" />
/// <reference path="../Components/formItem_checkbox.js" />
/// <reference path="../Components/searchBox.js" />
/// <reference path="../Components/grid.js" />
/// <reference path="../Components/dialog.js" />
/// <reference path="../../province.js" />

/// <reference path="../../university.js" />
/// <reference path="../../major.js" />
/// <reference path="../../enrollmentPlan.js" />

var _majors, _university, _enrollmentPlan, formItem_majorName, _provinces, formItem_province;
function pageInit() {
    initUniversity();
    initPageFooter();
    initMajors();
    initProvinces();
    initEnrollmentPlan();
    $.when(_university.load(), _provinces.load()).then(function () {
        if (_enrollmentPlan.isNew()) {
            _enrollmentPlan.provinceName = "";
            showEnrollmentPlanUI();
        } else {
            _enrollmentPlan.provinceName = _provinces.item(_enrollmentPlan.provinceId);
            _enrollmentPlan.load();
        }
    });
}

function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");

    var btnOk = new kf.base.buttonUI({
        className: "ui-btn-lg ui-btn-primary",
        text: "保存",
        click: function () {
            if (!_enrollmentPlan.validate()) return false;
            if (_enrollmentPlan.isNew()) {
                _enrollmentPlan.add();
            } else {
                _enrollmentPlan.update();
            }
        }
    });

    footer.appendChild(btnOk.export());
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

    var h1 = kf.base.h1UI({ text: value.universityName + " 招生计划" });
    header.appendChild(h1);
}

function initMajors() {
    _majors = new majors();
    _majors.filter.universityId = getUniversityId();
    _majors.afterLoad = function () {
        formItem_majorName.addRows(this.values);
        formItem_majorName.showDialog();
    }
}

function initEnrollmentPlan(){
    _enrollmentPlan = new enrollmentPlan();
    _enrollmentPlan.enrollmentPlanId = getEnrollmentPlanId();
    _enrollmentPlan.universityId = getUniversityId();
    if(_enrollmentPlan.isNew()){
        _enrollmentPlan.addCreateObserver($.goback);
    }else{
        _enrollmentPlan.addLoadObserver(showEnrollmentPlanUI);
        _enrollmentPlan.afterUpdate = function(){
            history.back();
        }
    }
}

function showEnrollmentPlanUI(value) {
    var fragment = document.createDocumentFragment();
    var formItem_year = new kf.components.formItem_text({
        label: "年份:",
        value: value.year,
        change: function (year) {
            value.year = year;
        },
        clear: function () {
            value.year = 0;
        }
    });
    fragment.appendChild(formItem_year.export());

    var formItem_planNumber = new kf.components.formItem_text({
        label: "计划人数:",
        value: value.planNumber,
        change: function (planNumber) {
            value.planNumber = planNumber;
        },
        clear: function () {
            value.planNumber = 0;
        }
    });
    fragment.appendChild(formItem_planNumber.export());

    var formItem_tuition = new kf.components.formItem_text({
        label: "学费:",
        value: value.tuition,
        change: function (tuition) {
            value.tuition = tuition;
        },
        clear: function () {
            value.tuition = 0;
        }
    });

    fragment.appendChild(formItem_tuition.export());

    formItem_majorName = new kf.components.formItem_text_select({
        label: "专业名称",
        value: value.majorName,
        textField:"majorName",
        initHeader:[
            { headerName: "专业名称", name: "majorName" }
        ],
        btnClick: function () {
            _majors.filter.majorName = "";
            _majors.load();
        },
        searchHandler: function (majorName) {
            _majors.filter.majorName = majorName;
            _majors.load();
        },
        okHandler: function (ret) {
            value.majorName = ret["majorName"];
        }
    });
    formItem_majorName.setDialogTitle("专业选择");
    formItem_majorName.addClearObserver(function () {
        value.majorName = "";
    });

    fragment.appendChild(formItem_majorName.export());

    var formItem_majorCode = new kf.components.formItem_text({
        label: "专业编码",
        value: value.majorCode,
        change: function (majorCode) {
            value.majorCode = majorCode;
        },
        clear: function () {
            value.majorCode = "";
        }
    });
    fragment.appendChild(formItem_majorCode.export());

    var formItem_discipline = new kf.components.formItem_select({
        label: "科类",
        initValues: [
            { value: 1, text: "艺术（文）" },
            { value: 2, text: "艺术（理）" },
            { value: 3, text: "体育（文）" },
            { value: 4, text: "体育（理）" },
            { value: 5, text: "理工" },
            { value: 6, text: "文史" }
        ],
        value: value.discipline,
        selectIndexChanged: function (discipline) {
            value.discipline = discipline;
        }
    });
    fragment.appendChild(formItem_discipline.export());

    var formItem_PlanType = new kf.components.formItem_select({
        label: "计划类型",
        initValues: [
            { value: 0, text: "普通类招生计划" },
            { value: 1, text: "提前批艺术类招生计划" },
            { value: 2, text: "提前批体育类招生计划" },
            { value: 3, text: "提前批普通类招生计划" },
            { value: 4, text: "提前批国家专项计划" },
            { value: 5, text: "特殊类型批-高校专项计划" },
            { value: 6, text: "特殊类型批-自主招生计划" },
            { value: 7, text: "地方专项计划" }
        ],
        value: value.planType,
        selectIndexChanged: function (planType) {
            value.planType = planType;
        }
    });

    fragment.appendChild(formItem_PlanType.export());

    formItem_province = new kf.components.formItem_text_select({
        label: "所在省份:",
        value: value.provinceName,
        textField:"provinceName",
        initHeader: [
            { headerName: "省份", name: "provinceName" }
        ],
        btnClick: function () {
            _provinces.filter.provinceName = "";
            $.when(_provinces.load()).then(function () {
                formItem_province.addRows(_provinces.values);
                formItem_province.showDialog();
            });
        },
        searchHandler: function (value) {
            _provinces.filter.provinceName = value;
            _provinces.load();
        },
        okHandler: function (value) {
            value.provinceName = value["provinceName"];
            value.provinceId = value["provinceId"]
        }
    });
    fragment.appendChild(formItem_province.export());

    document.getElementById("enrollmentplan").appendChild(fragment);
}

function getUniversityId() {
    var universityId = $.getQueryString("universityId");
    if (universityId == null) {
        return 0;
    } else {
        return parseInt(universityId);
    }
}

function getEnrollmentPlanId() {
    var enrollmentPlanId = $.getQueryString("enrollmentPlanId");
    if (enrollmentPlanId == null) {
        return 0;
    } else {
        return parseInt(enrollmentPlanId);
    }
}

function initmajorDialog() {
    _majorsGridDialog = new kf.components.gridDialog({
        searchHandler: function (value) {
            _majors.filter.majorName = value;
            _majors.load();
        }
    });
    _majorsGridDialog.setTitle("选择专业");
    _majorsGridDialog.initHeader([
        { headerName: "专业名称", name: "majorName" }
    ]);
    _majorsGridDialog.okHandler(function (value) {
        _enrollmentPlan.majorId = value.majorId;
    });

}

function initProvinces() {
    _provinces = new provinces();
    _provinces.addLoadObserver();
}





