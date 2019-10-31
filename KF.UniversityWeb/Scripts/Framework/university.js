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

    this.loadObservers = [];
}

university.prototype.load = function () {
    return $.ajax({
        url: "/universityService",
        data: {
            universityId: this.universityId,
            option: "getone"
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
        }, this)
    });
}

university.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}


function universitys() {
    kf.util.entitiesPage.call(this);
    this.filter.provinceId = 0;
    this.filter.cityId = 0;
    this.loadObservers = [];
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
        success: $.proxy(function (ret) {
            this.clear();
            this.totalCount = ret.TotalCount;
            var count = ret.Values.length;
            for (var i = 0; i < count; i++) {
                var _university = new university();
                _university.universityId = ret.Values[i].UniversityId;
                _university.universityName = ret.Values[i].UniversityName;
                _university.universityIcon = ret.Values[i].UniversityIcon;
                _university.universityAddress = ret.Values[i].UniversityAddress;
                _university.cityId = ret.Values[i].CityId;
                this.add(_university.universityId, _university);
            }

            count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        }, this)
    });
}

universitys.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}