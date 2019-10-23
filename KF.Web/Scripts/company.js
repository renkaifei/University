/// <reference path="/Scripts/Libraries/jquery-1.12.4.min.js" />
/// <reference path="/Scripts/Framework/util.js" />

function company() {
    this.companyId = 0;
    this.companyName = "";
    this.companyAddress = "";
    this.companyAbstract = "";
    this.cityId = 0;

    this.loadObservers = [];
    this.createObservers = [];
    this.updateObservers = [];
    this.deleteObservers = [];
}

company.prototype.validate = function () {
    if (this.companyName == "") {
        $.showErrorMessage("公司名称不能为空");
        return false;
    }
    return true;
}

company.prototype.add = function () {
    var data = $.strToUTF8(this.companyAbstract).join(",");
    $.ajax({
        url: "/companyService",
        data: {
            companyName: this.companyName,
            companyAddress: this.companyAddress,
            companyAbstract: data,
            cityId: this.cityId,
            option:"add"
        },
        success: $.proxy(function (ret) {
            this.cityId = ret["CityId"];
            this.companyId = ret["CompanyId"];
            this.companyName = ret["CompanyName"];
            this.companyAddress = ret["CompanyAddress"];
            this.companyAbstract = ret["CompanyAbstract"];
            this.cityId = ret["CityId"];
            
            var count = this.createObservers.length;
            for (var i = 0; i < count; i++) {
                this.createObservers[i](this);
            }
        },this)
    });
}

company.prototype.addCreateObserver = function (observer) {
    this.createObservers.push(observer);
}

company.prototype.update = function () {
    var data = $.strToUTF8(this.companyAbstract).join(",");
    $.ajax({
        url: "/companyService",
        data: {
            companyName: this.companyName,
            companyAddress: this.companyAddress,
            companyAbstract: data,
            cityId: this.cityId,
            companyId: this.companyId,
            option:"update"
        },
        success: $.proxy(function (ret) {
            this.cityId = ret["CityId"];
            this.companyId = ret["CompanyId"];
            this.companyName = ret["CompanyName"];
            this.companyAddress = ret["CompanyAddress"];
            this.companyAbstract = ret["CompanyAbstract"];
            this.cityId = ret["CityId"];
            
            var count = this.updateObservers.length;
            for (var i = 0; i < count; i++) {
                this.updateObservers[i](this);
            }

        },this)
    });
}

company.prototype.addUpdateObserver = function (observer) {
    this.updateObservers.push(observer);
}

company.prototype.delete = function () {
    $.ajax({
        url: "/companyService",
        data: {
            companyId: this.companyId,
            option: "delete"
        },
        success: $.proxy(function () {
            var count = this.deleteObservers.length;
            for (var i = 0; i < count; i++) {
                this.deleteObservers[i](this);
            }
        })
    });
}

company.prototype.addDeleteObserver = function (observer) {
    this.deleteObservers.push(observer);
}

company.prototype.load = function () {
    $.ajax({
        url: "/companyService",
        data: {
            companyId: this.companyId,
            option: "getone"
        },
        success: $.proxy(function (ret) {
            this.cityId = ret["CityId"];
            this.companyId = ret["CompanyId"];
            this.companyName = ret["CompanyName"];
            this.companyAddress = ret["CompanyAddress"];
            var companyAbstract = ret["CompanyAbstract"];
            this.companyAbstract = $.decodeUTF8(companyAbstract);
            this.cityId = ret["CityId"];
            
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        },this)
    });
}

company.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

company.prototype.isNew = function () {
    return this.companyId == 0;
}

function companys() {
    kf.util.entitiesPage.call(this);
    this.loadObservers = [];
}

$.extend(companys.prototype, kf.util.entitiesPage.prototype);

companys.prototype.load = function () {
    $.ajax({
        url: "/companyService",
        data: {
            pageIndex: this.filter.pageIndex,
            pageSize: this.filter.pageSize,
            option:"getlist"
        },
        success: $.proxy(function (ret) {
            this.clear();
            var count = ret.length;
            for (var i = 0; i < count; i++) {
                var _company = new company();
                _company.companyId = ret[i].CompanyId;
                _company.companyName = ret[i].CompanyName;
                _company.companyAddress = ret[i].CompanyAddress;
                this.add(_company.companyId, _company);
            }
            
            count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this.values);
            }
        }, this)
    });
}

companys.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}
