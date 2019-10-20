/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/formItem_text.js" />
/// <reference path="../Components/formItem_select.js" />
/// <reference path="../Components/formItem_checkbox.js" />
/// <reference path="../../major.js" />


var _major;
function pageInit() {
    initPageHeader();
    initPageFooter();
    initMajor();
    _major.load();
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    var i = new kf.components.icon_return();
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: "专业名称" });
    header.appendChild(h1);
   
}

function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");

    var btnOk = new kf.base.buttonUI({
        className: "ui-btn-lg ui-btn-primary",
        text: "确定",
        click: function () {
            var data = CKEDITOR.instances.majorIntroduction.getData();
            _major.majorIntroduction = data;
            if (!_major.validate()) return false;
            if (_major.isNew())
                _major.add();
            else
                _major.update();
        }
    });

    footer.appendChild(btnOk.export());
}

function initMajor() {
    _major = new major();
    _major.majorId = getMajorId();
    if (_major.isNew()) {
        _major.afterAdd = function () {
            history.back();
        }
        showMajorUI();
    } else {
        _major.afterLoad = function () {
            showMajorUI();
        }
        _major.afterUpdate = function () {
            history.back();
        }
    }
}

function showMajorUI() {
    var fragment = document.createDocumentFragment();

    var formItem_majorName = new kf.components.formItem_text({
        label:"专业名称",
        value: _major.majorName,
        change: function (value) {
            _major.majorName = value;
        },
        clear: function () {
            _major.majorName = "";
        }
    });
    fragment.appendChild(formItem_majorName.export());

    var formItem_address = new kf.components.formItem_text({
        label:"专业地址",
        value: _major.majorName,
        change: function (value) {
            _major.address = value;
        },
        clear: function () {
            _major.address = "";
        }
    });
    fragment.appendChild(formItem_address.export());

    var formItem_code = new kf.components.formItem_text({
        label:"专业编码",
        value: _major.code,
        change: function (value) {
            _major.code =value;
        },
        clear: function () {
            _major.code = "";
        }
    });
    fragment.appendChild(formItem_code.export());

    var formItem_educationalSystem = new kf.components.formItem_select({
        initValues: [
           { value: "0", text: "" },
           { value: "1", text: "三年" },
           { value: "2", text: "四年" },
           { value: "3", text: "五年" },
           { value: "4", text: "七年" },
        ],
        label: "学制",
        value: _major.educationalSystem,
        selectIndexChanged: function (value) {
            _major.educationalSystem = value;
        }
    });
    fragment.appendChild(formItem_educationalSystem.export());

    var formItem_degree = new kf.components.formItem_select({
        initValues: [
            { value: "0", text: "" },
            { value: 1, text: "专科" },
            { value: 2, text: "本科" }
        ],
        label: "层次",
        value: _major.degree,
        selectIndexChanged: function (value) {
            _major.degree = value;
        }
    });
    fragment.appendChild(formItem_degree.export());

    var formItem_isProvinceFeature = new kf.components.formItem_checkbox({
        label: "省级特色",
        checked: _major.isProvinceFeature == 1,
        click: function (value) {
            if (value)
                _major.isProvinceFeature = 1;
            else
                _major.isProvinceFeature = 0;
        }
    });
    fragment.appendChild(formItem_isProvinceFeature.export());

    var formItem_isCountryFeature = new kf.components.formItem_checkbox({
        label: "国家特色",
        checked: _major.isCountryFeature == 1,
        click: function (value) {
            if (value) {
                _self.isCountryFeature = 1;
            } else {
                _self.isCountryFeature = 0;
            }
        }
    });
    fragment.appendChild(formItem_isCountryFeature.export());

    var p_major = kf.base.divUI({ className: "formItem-desc", text: "专业介绍" });
    fragment.appendChild(p_major);

    var textarea = document.createElement("textarea");
    $(textarea).attr("id", "majorIntroduction");
    fragment.appendChild(textarea);

    document.getElementById("major").innerHTML = "";
    document.getElementById("major").appendChild(fragment);

    CKEDITOR.replace("majorIntroduction");
    CKEDITOR.instances.majorIntroduction.setData(_major.majorIntroduction);


}

function getUniversityId() {
    var universityId = $.getQueryString("universityId");
    if (universityId == "") {
        return 0;
    } else {
        return parseInt(universityId);
    }
}

function getMajorId() {
    var majorId = $.getQueryString("majorId");
    if (majorId == null) {
        return 0;
    } else {
        return parseInt(majorId);
    }
}





