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

}

function majors() {
    kf.util.entities.call(this);
    this.loadObservers = [];
    this.getRecuritObservers = [];
}

$.extend(majors.prototype, kf.util.entities.prototype);

majors.prototype.load = function () {
    $.ajax({
        url: "/majorService",
        data: {
            option: "getlist",
            universityId: this.filter.universityId,
            majorName: this.filter.majorName
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
                this.loadObservers[i](this);
            }
        }, this)
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
            $.each(ret, function (i, value) {
                var _major = new major();
                _major.majorId = value.MajorId;
                _major.majorName = value.MajorName;
                _self.add(value.MajorId, _major);
            });

            var count = this.getRecuritObservers.length;
            for (var i = 0; i < count ; i++) {
                this.getRecuritObservers[i](this);
            }
        }, this)
    });
}

majors.prototype.addGetRecuritObserver = function (observer) {
    this.getRecuritObservers.push(observer);
}