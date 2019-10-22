/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/Components/base.js" />
/// <reference path="/Components/icon_return.js" />
/// <reference path="/Scripts/Framework/Components/formItem_text.js" />
/// <reference path="/Scripts/company.js" />
/// <reference path="E:\KFProject\KF\KF.Web\ckeditor/ckeditor.js" />


var _company;
function pageInit() {
    initPageHeader();
    initPageFooter();
    initCompany();
    if (_company.isNew()) {
        initCompanyUI(_company);
    } else {
        _company.load();
    }
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");
    
    var i = new kf.components.icon_return();
    header.appendChild(i);

    var h1 = kf.base.h1UI({ text: "公司详情" });
    header.appendChild(h1);
}

function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");
    var btnSave = new kf.base.buttonUI({
        className: "ui-btn-lg ui-btn-primary",
        text: "保存",
        click: function () {
            if (!_company.validate()) return false;
            var _companyAbstract = CKEDITOR.instances.companyAbstract.getData();
            _company.companyAbstract = _companyAbstract;
            if (_company.isNew()) {
                _company.add();
            } else {
                _company.update();
            }
        }
    });
    footer.appendChild(btnSave.export());
}

function initCompany() {
    _company = new company();
    _company.companyId = getCompanyId();
    _company.cityId = getCityId();
    if (_company.isNew()) {
        _company.addCreateObserver($.goback)
    } else {
        _company.addLoadObserver(initCompanyUI);
        _company.addUpdateObserver($.goback);
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

function initCompanyUI(value) {
    var fragment = document.createDocumentFragment();
    var formItem_companyName = new kf.components.formItem_text({
        label: "公司名称",
        value: value.companyName,
        change: function (companyName) {
            value.companyName = companyName;
        }
    });
    fragment.appendChild(formItem_companyName.export());

    var formItem_companyAddress = new kf.components.formItem_text({
        label: "公司地址",
        value: value.companyAddress,
        change: function (companyAddress) {
            value.companyAddress = companyAddress;
        }
    });
    fragment.appendChild(formItem_companyAddress.export());

    var label_companyabstract = kf.base.divUI({
        className: "formItem-desc",
        text:"公司简介"
    });
    fragment.appendChild(label_companyabstract);
    var textarea_companyabstract = kf.base.textareaUI({ id:"companyAbstract" });
    fragment.appendChild(textarea_companyabstract);
    document.getElementById("company").appendChild(fragment);
    CKEDITOR.replace("companyAbstract").setData(value.companyAbstract);
}

