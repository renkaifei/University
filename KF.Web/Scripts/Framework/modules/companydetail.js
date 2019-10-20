/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="/Scripts/Framework/Components/formItem_text.js" />
/// <reference path="/Scripts/company.js" />
/// <reference path="E:\KFProject\KF\KF.Web\ckeditor/ckeditor.js" />


var _company;
function pageInit() {
    initPageHeader();
    initPageFooter();
    initCompany();
    _company.load();
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    
    var i = kf.base.iUI({
        className: "ui-icon-return",
        click: function () {
            history.back();
        }
    });
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: "公司详情" });
    header.appendChild(h1);
}

function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");
    var btnSave = kf.base.buttonUI({
        className: "ui-btn-lg ui-btn-primary",
        text: "保存",
        click: function () {
            if (!_company.validate()) return;
            var _companyAbstract = CKEDITOR.instances.companyAbstract.getData();
            _company.companyAbstract = $.strToUTF8(_companyAbstract).join(",");
            if (_company.isNew()) {
                _company.add();
            } else {
                _company.update();
            }
        }
    });
    footer.appendChild(btnSave);
}

function initCompany() {
    _company = new company();
    _company.companyId = getCompanyId();
    _company.cityId = getCityId();
    if (_company.isNew()) {
        _company.afterAdd = function () {
            history.back();
        }
        companyUI();
    } else {
        _company.afterLoad = function () {
            var _self = this;
            companyUI();
        }
        _company.afterUpdate = function () {
            history.back();
        }
    }
}

function getCompanyId() {
    var companyId = $.getQueryString("companyId");
    if (companyId == null) {
        return 0;
    } else {
        return parseInt(companyId);
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

function companyUI() {
    var fragment = document.createDocumentFragment();
    var formItem_companyName = new kf.components.formItem_text();
    formItem_companyName.init({
        label: "公司名称", 
        value: _company.companyName,
        change: function () {
            _company.companyName = $(this).val();
        }
    });
    fragment.appendChild(formItem_companyName.export());

    var formItem_companyAddress = new kf.components.formItem_text();
    formItem_companyAddress.init({
        label: "公司地址",
        value: _company.companyAddress,
        change: function () {
            _company.companyAddress = $(this).val();
        }
    });
    fragment.appendChild(formItem_companyAddress.export());

    var label_companyabstract = kf.base.divUI();
    $(label_companyabstract).addClass("formItem-desc").text("公司简介");
    fragment.appendChild(label_companyabstract);

    var textarea_companyabstract = kf.base.textareaUI({ id:"companyAbstract" });
    fragment.appendChild(textarea_companyabstract);

    document.getElementById("company").appendChild(fragment);
    CKEDITOR.replace("companyAbstract").setData(_company.companyAbstract);
}

