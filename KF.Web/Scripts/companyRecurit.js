/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />


function companyRecurit() {
    this.companyRecuritId = 0;
    this.companyId = 0;
    this.universityId = 0;
    this.year = 0;
    this.majorIds = [];
}

companyRecurit.prototype.detailUI = function (option) {
    var _self = this;
    var fragment = document.createDocumentFragment();

    fragment.appendChild(formItem_textSelect({ label:"高校",click:option.universitySelect }));
    return fragment;
}



