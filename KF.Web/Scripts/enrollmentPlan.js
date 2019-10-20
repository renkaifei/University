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
}

enrollmentPlan.prototype.validate = function () {
    var _self = this;
    var reg = new RegExp("^\\d{4}$");
    if (!reg.test(_self.year)) {
        $.showErrorMessage("日期格式不正确,正确格式为[1900]");
        return false;
    }
    if (!$.isNumeric(_self.planNumber)) {
        $.showErrorMessage("招生计划数应为数字");
        return false;
    }
    return true;
}

enrollmentPlan.prototype.isNew = function () {
    return this.enrollmentPlanId == 0;
}

enrollmentPlan.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/enrollmentPlanService",
        data: {
            enrollmentPlanId: _self.enrollmentPlanId,
            option:"getone"
        },
        success: function (ret) {
            _self.enrollmentPlanId = ret.EnrollmentPlanId;
            _self.year = ret.Year;
            _self.provinceId = ret.ProvinceId;
            _self.universityId = ret.UniversityId;
            _self.planNumber = ret.PlanNumber;
            _self.discipline = ret.Discipline;
            _self.tuition = ret.Tuition;
            _self.majorName = ret.MajorName;
            _self.majorCode = ret.MajorCode;
            _self.planType = ret.PlanType;
            _self.afterLoad();
        }
    })
};

enrollmentPlan.prototype.afterLoad = function () {

};

enrollmentPlan.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/enrollmentPlanService",
        data: {
            year: _self.year,
            provinceId: _self.provinceId,
            universityId: _self.universityId,
            planNumber: _self.planNumber,
            discipline: _self.discipline,
            tuition: _self.tuition,
            majorName: _self.majorName,
            majorCode: _self.majorCode,
            planType:_self.planType,
            option:"add"
        },
        success: function (ret) {
            _self.afterAdd();
        }
    });
}

enrollmentPlan.prototype.afterAdd = function () {
    
}

enrollmentPlan.prototype.update = function () {
    var _self = this;
    $.ajax({
        url: "/enrollmentPlanService",
        data:{
            enrollmentPlanId: _self.enrollmentPlanId,
            year: _self.year,
            planNumber: _self.planNumber,
            universityId: _self.universityId,
            provinceId: _self.provinceId,
            discipline: _self.discipline,
            tuition: _self.tuition,
            majorName: _self.majorName,
            majorCode: _self.majorCode,
            planType:_self.planType,
            option:"update"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}


enrollmentPlan.prototype.afterUpdate = function () {
    
}

enrollmentPlan.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/enrollmentPlanService",
        data: {
            enrollmentPlanId: _self.enrollmentPlanId,
            option:"delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

enrollmentPlan.prototype.afterDelete = function () {
    
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
}

$.extend(enrollmentPlans.prototype,kf.util.entitiesPage.prototype);

enrollmentPlans.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/enrollmentPlanService",
        data: {
            universityId: _self.filter.universityId,
            year: _self.filter.year,
            pageIndex: _self.filter.pageIndex,
            pageSize: _self.filter.pageSize,
            option: "getlist"
        },
        success: function (ret) {
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
            _self.afterLoad();
        }
    });
}


enrollmentPlans.prototype.afterLoad = function () {
  
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





