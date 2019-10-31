/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />
/// <reference path="modules/base.js" />
/// <reference path="modules/dialog.js" />
/// <reference path="modules/grid.js" />
/// <reference path="modules/gridSelectDialog.js" />

function university() {
    this.universityId = 0;
    this.universityName = "";
    this.universityAddress = "";
    this.universityAbstract = "";
    this.universityIcon = "";
    this.cityId = 0;
    this.undergraduateTotalNumber = 0;
    this.postgraduateTotalNumber = 0;
    this.overseasStudentTotalNumber = 0;
    this.Is211 = 0;
    this.Is985 = 0;
    this.IsDoubleClass = 0;

    this.createObservers = [];
    this.updateObservers = [];
    this.loadObservers = [];
    this.deleteObservers = [];

}

university.prototype.add = function () {
    var encodeUniversityAbstract = $.strToUTF8(this.universityAbstract).join(',');
    $.ajax({
        url: "/universityService",
        data: {
            universityName: this.universityName,
            universityAddress: this.universityAddress,
            universityAbstract: encodeUniversityAbstract,
            universityIcon: this.universityIcon,
            cityId: this.cityId,
            undergraduateTotalNumber: this.undergraduateTotalNumber,
            postgraduateTotalNumber: this.postgraduateTotalNumber,
            overseasStudentTotalNumber: this.overseasStudentTotalNumber,
            Is211: this.Is211,
            Is985: this.Is985,
            IsDoubleClass: this.IsDoubleClass,
            option:"add"
        },
        success: $.proxy(function (ret) {
            var count = this.createObservers.length;
            for (var i = 0; i < count; i++) {
                this.createObservers[i](this);
            }
        },this)
    });
}

university.prototype.addCreateObserver = function (observer) {
    this.createObservers.push(observer);
}

university.prototype.update = function () {
    var encodeUniversityAbstract = $.strToUTF8(this.universityAbstract).join(',');
    $.ajax({
        url: "/universityService",
        data: {
            universityId: this.universityId,
            universityName: this.universityName,
            universityAddress: this.universityAddress,
            universityAbstract: encodeUniversityAbstract,
            universityIcon: this.universityIcon,
            cityId: this.cityId,
            undergraduateTotalNumber: this.undergraduateTotalNumber,
            postgraduateTotalNumber: this.postgraduateTotalNumber,
            overseasStudentTotalNumber: this.overseasStudentTotalNumber,
            Is211: this.Is211,
            Is985: this.Is985,
            IsDoubleClass: this.IsDoubleClass,
            option:"update"
        },
        success: $.proxy(function (ret) {
            var count = this.updateObservers.length;
            for (var i = 0; i < count; i++) {
                this.updateObservers[i](this);
            }
        },this)
    });
}

university.prototype.addUpdateObserver = function (observer) {
    this.updateObservers.push(observer);
}

university.prototype.load = function () {
   return $.ajax({
        url: "/universityService",
        data: {
            universityId: this.universityId,
            option:"getone"
        },
        success: $.proxy(function (ret) {
            this.universityId = ret.UniversityId;
            this.universityName = ret.UniversityName;
            this.universityAddress = ret.UniversityAddress;
            this.cityId = ret.CityId;
            var abstract = $.decodeUTF8(ret.UniversityAbstract);
            this.universityAbstract = abstract;
            this.universityIcon = ret.UniversityIcon;
            this.undergraduateTotalNumber = ret.Undergraduate;
            this.postgraduateTotalNumber = ret.Postgraduate;
            this.overseasStudentTotalNumber = ret.OverseasStudent;
            this.Is211 = ret.Is211;
            this.Is985 = ret.Is985;
            this.IsDoubleClass = ret.IsDoubleClass;
            

            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        },this)
    });
}

university.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

university.prototype.validate = function () {
    if (this.universityName == "") {
        $.showErrorMessage("请输入高校名称");
        return false;
    }
    if (this.universityAddress == "") {
        $.showErrorMessage("请输入高校地址")
        return false;
    }
    if (!$.isNumeric(this.undergraduateTotalNumber)) {
        $.showErrorMessage("本科生数量应为数字");
        return false;
    }
    if (parseFloat(this.undergraduateTotalNumber) < 0) {
        $.showErrorMessage("本科生数量不能为负数");
        return false;
    }
    if (!$.isNumeric(this.postgraduateTotalNumber)) {
        $.showErrorMessage("研究生数量应为数字");
        return false;
    }
    if (parseFloat(this.postgraduateTotalNumber) < 0) {
        $.showErrorMessage("研究生数量不能为负数");
        return false;
    }
    if (!$.isNumeric(this.overseasStudentTotalNumber)) {
        $.showErrorMessage("留学生人数应为数字");
        return false;
    }
    if (parseFloat(this.overseasStudentTotalNumber) < 0) {
        $.showErrorMessage("研究生数量不能为负数");
        return false;
    }
    return true;
}

university.prototype.isNew = function () {
    return this.universityId == 0;
}

university.prototype.delete = function () {
    $.ajax({
        url: "/universityService",
        data: {
            universityId: this.universityId,
            option:"delete"
        },
        success: $.proxy(function (ret) {
            var count = this.deleteObservers.length;
            for (var i = 0; i < count; i++) {
                this.deleteObservers[i](this);
            }
        },this)
    });
}

university.prototype.addDeleteObserver = function (observer) {
    this.deleteObservers.push(observer);
}

university.prototype.loadBasic = function () {
    $.ajax({
        url: "/universityService",
        data: {
            universityId: this.universityId,
            option:"getbasic"
        },
        success: $.proxy(function (ret) {
            this.universityId = ret.UniversityId;
            this.universityName = ret.UniversityName;
            this.universityAddress = ret.UniversityAddress;
            this.undergraduateTotalNumber = ret.Undergraduate;
            this.postgraduateTotalNumber = ret.Postgraduate;
            this.overseasStudentTotalNumber = ret.OverseasStudent;
           
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        }, this)
    });
}

function universitys() {
    kf.util.entitiesPage.call(this);
    this.filter.provinceId = 0;
    this.filter.cityId = 0;
    this.loadObservers = [];
    this.loadRecuritObservers = [];
}

$.extend(universitys.prototype, kf.util.entitiesPage.prototype);

universitys.prototype.load = function () {
    $.ajax({
        url: "/universityService",
        data: {
            pageIndex: this.filter.pageIndex,
            pageSize: this.filter.pageSize,
            cityId: this.filter.cityId,
            provinceId: this.filter.provinceId,
            universityName: this.filter.universityName || "",
            option: "getlist"
        },
        success:$.proxy(function (ret) {
            this.clear();
            var count = ret.length;
            for (var i = 0; i < count; i++) {
                var _university = new university();
                _university.universityId = ret[i].UniversityId;
                _university.universityName = ret[i].UniversityName;
                _university.universityIcon = ret[i].UniversityIcon;
                _university.universityAddress = ret[i].UniversityAddress;
                _university.cityId = ret[i].CityId;
                this.add(_university.universityId,_university);
            }

            count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this.values);
            }
        },this)
    });
}

universitys.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

universitys.prototype.getlistInRecurit = function () {
    return $.ajax({
        url: "/universityService",
        data: {
            companyId: this.filter.companyId,
            year: this.filter.year,
            option:"getlistinrecurit"
        },
        success: $.proxy(function (ret) {
            var count = ret.length;
            for (var i = 0; i < count; i++) {
                var _university = new university();
                _university.universityId = ret[i].UniversityId;
                _university.universityName = ret[i].UniversityName;
                this.add(_university.UniversityId, _university);
            }
            
            count = this.loadRecuritObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadRecuritObservers[i](this.values);
            }
        },this)
    });
}

universitys.prototype.addLoadRecuritObserver = function (observer) {
    this.loadRecuritObservers.push(observer);
}


