function city() {
    this.cityId = 0;
    this.cityName = "";
}

function citys() {
    kf.util.entities.call(this);
    this.loadObservers = [];
}

$.extend(citys.prototype, kf.util.entities.prototype);

citys.prototype.load = function () {
    return $.ajax({
        url: "/cityService",
        data: {
            option: "getlist",
            provinceId: this.filter.provinceId
        },
        success: $.proxy(function (ret) {
            this.clear();
            var count = ret.length;
            for (var i = 0; i < count; i++) {
                var _city = new city();
                _city.cityId = ret[i].CityId;
                _city.cityName = ret[i].CityName;
                this.add(_city.cityId, _city);
            }
            count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        }, this)
    });
}

citys.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}