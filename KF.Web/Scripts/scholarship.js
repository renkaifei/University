/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function scholarShip() {
    this.scholarShipId = 0;
    this.scholarShipName = "";
    this.scholarShipAbstract = "";
    this.scholarShipTotal = "";
    this.startYear = "";
    this.endYear = "";
    this.universityId = 0;

    this.loadObservers = [];
    this.createObservers = [];
    this.updateObservers = [];
    this.deleteObservers = [];
}

scholarShip.prototype.validate = function () {
    if (this.scholarShipName == "") {
        $.showErrorMessage("奖学金名称不能为空");
        return false;
    }
    return true;
}

scholarShip.prototype.load = function () {
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipId: this.scholarShipId,
            option: "getone"
        },
        success: $.proxy(function (ret) {
            this.scholarShipId = ret.ScholarShipId,
            this.scholarShipName = ret.ScholarShipName,
            this.scholarShipAbstract = $.decodeUTF8(ret.ScholarShipAbstract);
            this.scholarShipTotal = ret.ScholarShipTotal;
            this.universityId = ret.UniversityId;
            this.startYear = ret.StartYear;
            this.endYear = ret.EndYear;
            
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        },this)
    });
}

scholarShip.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

scholarShip.prototype.isNew = function () {
    return this.scholarShipId == 0;
}

scholarShip.prototype.add = function () {
    var scholarShipAbstract = $.strToUTF8(this.scholarShipAbstract).join(",");
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipName: this.scholarShipName,
            scholarShipAbstract: scholarShipAbstract,
            scholarShipTotal: this.scholarShipTotal,
            startYear: this.startYear,
            endYear: this.endYear,
            universityId: this.universityId,
            option:"add"
        },
        success: $.proxy(function (ret) {
            this.scholarShipId = ret.ScholarShipId;
            
            var count = this.createObservers.length;
            for (var i = 0; i < count; i++) {
                this.createObservers[i](this);
            }

        },this)
    })
}

scholarShip.prototype.addCreateObserver = function (observer) {
    this.createObservers.push(this);
}

scholarShip.prototype.update = function () {
    var scholarShipAbstract = $.strToUTF8(this.scholarShipAbstract).join(",");
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipId: this.scholarShipId,
            scholarShipName: this.scholarShipName,
            scholarShipAbstract: scholarShipAbstract,
            scholarShipTotal: this.scholarShipTotal,
            startYear: this.startYear,
            endYear: this.endYear,
            universityId: this.universityId,
            option:"update"
        },
        success:$.proxy(function (ret) {
            var count = this.updateObservers.length;
            for (var i = 0; i < count; i++) {
                this.updateObservers[i](this);
            }
        },this)
    });
}

scholarShip.prototype.addUpdateObserver = function (observer) {
    this.updateObservers.push(observer);
}

scholarShip.prototype.delete = function () {
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipId: this.scholarShipId,
            option:"delete"
        },
        success:$.proxy(function (ret) {
            var count = this.deleteObservers.length;
            for (var i = 0; i < count; i++) {
                this.deleteObservers[i](this);
            }
        },this)
    })
}

scholarShip.prototype.addDeleteObserver = function (observer) {
    this.deleteObservers.push(observer);
}

function scholarShips() {
    kf.util.entitiesPage.call(this);
    this.loadObservers = [];
}

$.extend(scholarShips.prototype, kf.util.entitiesPage.prototype);

scholarShips.prototype.load = function () {
    $.ajax({
        url: "/scholarShipService",
        data: {
            option: "getlist",
            universityId: this.filter.universityId,
            pageIndex: this.filter.pageIndex,
            pageSize: this.filter.pageSize
        },
        success: $.proxy(function (ret) {
            this.clear();
            
            var count = ret.length;
            for (var i = 0; i < count; i++) {
                var _scholarship = new scholarShip();
                _scholarship.scholarShipId = ret[i].ScholarShipId;
                _scholarship.scholarShipName = ret[i].ScholarShipName;
                _scholarship.scholarShipTotal = ret[i].ScholarShipTotal;
                _scholarship.startYear = ret[i].StartYear;
                _scholarship.endYear = ret[i].EndYear;
                this.add(_scholarship.scholarShipId, _scholarship);
            }
            
            count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this.values);
            }
        },this)
    });
}

scholarShips.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}