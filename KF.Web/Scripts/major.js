/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />
function major() {
    this.majorId = 0;
    this.majorName = "";
    this.degree = 0;
    this.code = "";
    this.educationalSystem = 0;
    this.address = "";
    this.universityId = 0;
    this.universityName = "";
    this.isProvinceFeature = 0;
    this.isCountryFeature = 0;
    this.majorIntroduction = "";

    this.createObservers = [];
    this.loadObservers = [];
    this.updateObservers = [];
    this.deleteObservers = [];

}

major.prototype.validate = function () {
    if (this.majorName == "") {
        $.showErrorMessage("专业名称不能为空");
        return false;
    }
    return true;
}

major.prototype.isNew = function () {
    return this.majorId == 0;
}

major.prototype.add = function () {
    var data = $.strToUTF8(this.majorIntroduction).join(',');
    $.ajax({
        url: "/majorService",
        data: {
            option: "add",
            majorName: this.majorName,
            degree: this.degree,
            code: this.code,
            educationalSystem: this.educationalSystem,
            address: this.address,
            isProvinceFeature: this.isProvinceFeature,
            isCountryFeature: this.isCountryFeature,
            universityId: this.universityId,
            majorIntroduction:data
        },
        success: $.proxy(function (ret) {
            this.majorId = ret.MajorId;
            
            var count = this.createObservers.length;
            for (var i = 0; i < count; i++) {
                this.createObservers[i](this);
            }
        },this)
    });
}

major.prototype.addCreateObserver = function (observer) {
    this.createObserver.push(observer);
}

major.prototype.load = function () {
    return $.ajax({
        url: "/majorService",
        data: {
            option:"getone",
            majorId: this.majorId
        },
        success: $.proxy(function (ret) {
            this.majorId = ret.MajorId,
            this.majorName = ret.MajorName,
            this.degree = ret.Degree;
            this.code = ret.Code;
            this.educationalSystem = ret.EducationalSystem;
            this.address = ret.Address;
            this.isProvinceFeature = ret.IsProvinceFeature;
            this.isCountryFeature = ret.IsCountryFeature;
            this.universityId = ret.UniversityId;
            var data = $.decodeUTF8(ret.MajorIntroduction);
            this.majorIntroduction = data;
            
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        },this)
    });
}

major.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

major.prototype.update = function () {
    var data = $.strToUTF8(this.majorIntroduction).join(',');
    $.ajax({
        url: "/majorService",
        data: {
            majorId: this.majorId,
            majorName: this.majorName,
            degree: this.degree,
            code: this.code,
            educationalSystem: this.educationalSystem,
            address: this.address,
            isProvinceFeature: this.isProvinceFeature,
            isCountryFeature: this.isCountryFeature,
            universityId: this.universityId,
            majorIntroduction: data,
            option:"update"
        },
        success: $.proxy(function () {
            var count = this.updateObservers.length;
            for (var i = 0; i < count; i++) {
                this.updateObservers[i](this);
            }
        },this)
    })
}

major.prototype.addUpdateObserver = function(observer){
    this.updateObservers.push(observer);
}

major.prototype.delete = function () {
    $.ajax({
        url: "/majorService",
        data: {
            majorId: this.majorId,
            option:"delete"
        },
        success: $.proxy(function (ret) {
            var count = this.deleteObservers.length;
            for (var i = 0; i < count; i++) {
                this.deleteObservers[i](this);
            }
        },this)
    })
}

major.prototype.addDeleteObserver = function (observer) {
    this.deleteObservers.push(observer);
}

function majors() {
    kf.util.entities.call(this);
    this.loadObservers = [];
    this.getRecuritObservers = [];
}

$.extend(majors.prototype, kf.util.entities.prototype);

majors.prototype.load = function(){
    $.ajax({
        url: "/majorService",
        data: {
            option:"getlist",
            universityId: this.filter.universityId,
            majorName:this.filter.majorName
        },
        success: $.proxy(function (ret) {
            var _self = this;
            _self.clear();
            $.each(ret, function (i, item) {
                var _major = new major();
                _major.majorId = item.MajorId;
                _major.majorName = item.MajorName;
                _major.code = item.Code;
                _major.universityId = _self.filter.universityId;
                _major.isProvinceFeature = item.IsProvinceFeature;
                _major.isCountryFeature = item.IsCountryFeature;
                _self.add(_major.majorId, _major);
            });
            
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this.values);
            }
        },this)
    });
}

majors.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

majors.prototype.getListInRecurit = function () {
    $.ajax({
        url: "/majorService",
        data: {
            companyId: this.filter.companyId,
            year: this.filter.year,
            universityId: this.filter.universityId,
            option: "getlistinrecurit"
        },
        success: $.proxy(function (ret) {
            var _self = this;
            _self.clear();
            $.each(ret, function (i,value) {
                var _major = new major();
                _major.majorId = value.MajorId;
                _major.majorName = value.MajorName;
                _self.add(value.MajorId,_major);
            });
            
            var count = this.getRecuritObservers.length;
            for (var i = 0; i < count ; i++) {
                this.getRecuritObservers[i](this.values);
            }
        },this)
    });
}

majors.prototype.addGetRecuritObserver = function (observer) {
    this.getRecuritObservers.push(observer);
}