function scholarShip() {
    this.scholarShipId = 0;
    this.scholarShipName = "";
    this.scholarShipAbstract = "";
    this.scholarShipTotal = "";
    this.startYear = "";
    this.endYear = "";
    this.universityId = 0;
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
        }, this)
    });
}

scholarShips.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}