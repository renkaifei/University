/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/util.js" />

function company() {
    this.companyId = 0;
    this.companyName = "";
    this.companyAddress = "";
    this.companyAbstract = "";
    this.cityId = 0;
}

company.prototype.validate = function () {
    if (this.companyName == "") {
        $.showErrorMessage("公司名称不能为空");
        return false;
    }
    return true;
}

company.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/companyService",
        data: {
            companyName: _self.companyName,
            companyAddress: _self.companyAddress,
            companyAbstract: _self.companyAbstract,
            cityId: _self.cityId,
            option:"add"
        },
        success: function (ret) {
            _self.cityId = ret["CityId"];
            _self.companyId = ret["CompanyId"];
            _self.companyName = ret["CompanyName"];
            _self.companyAddress = ret["CompanyAddress"];
            _self.companyAbstract = ret["CompanyAbstract"];
            _self.cityId = ret["CityId"];
            _self.afterAdd();
        }
    });
}

company.prototype.afterAdd = function () {

}

company.prototype.update = function () {
    var _self = this;
    $.ajax({
        url: "/companyService",
        data: {
            companyName: _self.companyName,
            companyAddress: _self.companyAddress,
            companyAbstract: _self.companyAbstract,
            cityId: _self.cityId,
            companyId:_self.companyId,
            option:"update"
        },
        success: function (ret) {
            _self.cityId = ret["CityId"];
            _self.companyId = ret["CompanyId"];
            _self.companyName = ret["CompanyName"];
            _self.companyAddress = ret["CompanyAddress"];
            _self.companyAbstract = ret["CompanyAbstract"];
            _self.cityId = ret["CityId"];
            _self.afterUpdate();
        }
    });
}

company.prototype.afterUpdate = function () {

}

company.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/companyService",
        data: {
            companyId: _self.companyId,
            option: "delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

company.prototype.afterDelete = function () {

}

company.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/companyService",
        data: {
            companyId: _self.companyId,
            option: "getone"
        },
        success: function (ret) {
            _self.cityId = ret["CityId"];
            _self.companyId = ret["CompanyId"];
            _self.companyName = ret["CompanyName"];
            _self.companyAddress = ret["CompanyAddress"];
            var companyAbstract = ret["CompanyAbstract"];
            _self.companyAbstract = $.decodeUTF8(companyAbstract);
            _self.cityId = ret["CityId"];
            _self.afterLoad();
        }
    });
}

company.prototype.afterLoad = function () {

}

company.prototype.isNew = function () {
    return this.companyId == 0;
}

function companys() {
    kf.util.entitiesPage.call(this);
}

$.extend(companys.prototype, kf.util.entitiesPage.prototype);

companys.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/companyService",
        data: {
            pageIndex: _self.filter.pageIndex,
            pageSize: _self.filter.pageSize,
            option:"getlist"
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i, item) {
                var _company = new company();
                _company.companyId = item.CompanyId;
                _company.companyName = item.CompanyName;
                _company.companyAddress = item.CompanyAddress;
                _self.add(_company.CompanyId, _company);
            });
            _self.afterLoad();
        }
    });
}

companys.prototype.afterLoad = function () {

}

