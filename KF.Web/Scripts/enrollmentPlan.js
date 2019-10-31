/// <reference path="Libraries/jquery-1.12.4.min.js" />
/// <reference path="Framework/util.js" />


function enrollmentPlan() {
    this.enrollmentPlanId = 0;
    this.year = "";
    this.provinceId = 0;
    this.universityId = 0;
    this.planNumber = 0;
    this.discipline = 0;
    this.majorName = "";
    this.majorCode = "";
    this.tuition = 0;
    this.planType = 0;

    this.loadObservers = [];
    this.createObservers = [];
    this.updateObservers = [];
    this.deleteObservers = [];
}

enrollmentPlan.prototype.validate = function () {
    var reg = new RegExp("^\\d{4}$");
    if (!reg.test(this.year)) {
        $.showErrorMessage("日期格式不正确,正确格式为[1900]");
        return false;
    }
    if (!$.isNumeric(this.planNumber)) {
        $.showErrorMessage("招生计划数应为数字");
        return false;
    }
    return true;
}

enrollmentPlan.prototype.isNew = function () {
    return this.enrollmentPlanId == 0;
}

enrollmentPlan.prototype.load = function () {
    return $.ajax({
        url: "/enrollmentPlanService",
        data: {
            enrollmentPlanId: this.enrollmentPlanId,
            option:"getone"
        },
        success: $.proxy(function (ret) {
            this.enrollmentPlanId = ret.EnrollmentPlanId;
            this.year = ret.Year;
            this.provinceId = ret.ProvinceId;
            this.universityId = ret.UniversityId;
            this.planNumber = ret.PlanNumber;
            this.discipline = ret.Discipline;
            this.tuition = ret.Tuition;
            this.majorName = ret.MajorName;
            this.majorCode = ret.MajorCode;
            this.planType = ret.PlanType;
            
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }

        },this)
    })
};

enrollmentPlan.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
};

enrollmentPlan.prototype.add = function () {
    $.ajax({
        url: "/enrollmentPlanService",
        data: {
            year: this.year,
            provinceId: this.provinceId,
            universityId: this.universityId,
            planNumber: this.planNumber,
            discipline: this.discipline,
            tuition: this.tuition,
            majorName: this.majorName,
            majorCode: this.majorCode,
            planType: this.planType,
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

enrollmentPlan.prototype.addCreateObserver = function (observer) {
    this.createObservers.push(observer);
}

enrollmentPlan.prototype.update = function () {
    $.ajax({
        url: "/enrollmentPlanService",
        data:{
            enrollmentPlanId: this.enrollmentPlanId,
            year: this.year,
            planNumber: this.planNumber,
            universityId: this.universityId,
            provinceId: this.provinceId,
            discipline: this.discipline,
            tuition: this.tuition,
            majorName: this.majorName,
            majorCode: this.majorCode,
            planType: this.planType,
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


enrollmentPlan.prototype.addUpdateObserver = function (observer) {
    this.updateObservers.push(observer);
}

enrollmentPlan.prototype.delete = function () {
    $.ajax({
        url: "/enrollmentPlanService",
        data: {
            enrollmentPlanId: _self.enrollmentPlanId,
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

enrollmentPlan.prototype.addDeleteObserver = function (observer) {
    this.deleteObservers.push(observer);
}

function enrollmentPlans() {
    kf.util.entitiesPage.call(this);
    this.years = [];
    this.filter = {
        universityId: 0,
        year: 0,
        pageIndex: 1,
        pageSize:50
    };
    this.loadObservers = [];
}

$.extend(enrollmentPlans.prototype,kf.util.entitiesPage.prototype);

enrollmentPlans.prototype.load = function () {
    return $.ajax({
        url: "/enrollmentPlanService",
        data: {
            universityId: this.filter.universityId,
            year: this.filter.year,
            pageIndex: this.filter.pageIndex,
            pageSize: this.filter.pageSize,
            option: "getlist"
        },
        success: $.proxy(function (ret) {
            var _self = this;
            _self.clear();
            $.each(ret, function (i, item) {
                var _enrollmentPlan = new enrollmentPlan();
                _enrollmentPlan.enrollmentPlanId = item.EnrollmentPlanId;
                _enrollmentPlan.year = item.Year;
                _enrollmentPlan.universityId = item.UniversityId;
                _enrollmentPlan.planNumber = item.PlanNumber;
                _enrollmentPlan.provinceId = item.ProvinceId;
                _enrollmentPlan.discipline = item.Discipline;
                _enrollmentPlan.tuition = item.Tuition;
                _enrollmentPlan.majorName = item.MajorName;
                _self.add(_enrollmentPlan.enrollmentPlanId,_enrollmentPlan);
            });
           
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this.values);
            }
        },this)
    });
}


enrollmentPlans.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

enrollmentPlans.prototype.getPlanNumber = function (year,provinceId) {
    var _self = this;
    for (var i = 0; i < _self.values.length; i++) {
        if (_self.values[i].year == year && _self.values[i].provinceId == provinceId) {
            return _self.values[i].planNumber;
        }
    }
    return 0;
}

enrollmentPlans.prototype.loadCondition = function () {
    var _self = this;
    $.ajax({
        url: "/enrollmentPlanService",
        data: {
            option: "getyears"
        },
        success: function (ret) {
            for (var i = ret.MinYear; i <= ret.MaxYear; i++) {
                _self.years.push(i);
            }
            _self.afterLoadCondition();
        }
    });
}

enrollmentPlans.prototype.afterLoadCondition = function () {

}





