function hoursePrice() {
    this.hoursePriceId = 0;
    this.areaId = 0;
    this.year = (new Date()).getFullYear();
    this.month = (new Date()).getMonth() + 1;
    this.price = 0;
}

function hoursePrices() {
    var _self = this;
    entities.call(_self);

    $.extend(_self.filter, {
        cityId: 0,
        year: 0,
        month: 0,
        areaId: 0,
        pageIndex: 1,
        pageSize: 10
    });
}

$.extend(hoursePrices.prototype, entities.prototype);

hoursePrices.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/getlistService",
        data: {
            year: _self.filter.year,
            areaId: _self.filter.areaId,
            cityId: _self.filter.cityId,
            pageIndex: _self.filter.pageIndex,
            pageSize: _self.filter.pageSize,
            service: "hoursePrice"
        },
        success: function (ret) {
            _self.clear();
            var _hoursePrice;
            $.each(ret, function (i, item) {
                _hoursePrice = new hoursePrice();
                _hoursePrice.hoursePriceId = item.HoursePriceId;
                _hoursePrice.areaId = item.AreaId;
                _hoursePrice.year = item.Year;
                _hoursePrice.month = item.Month;
                _hoursePrice.price = item.Price;
                _self.add(_hoursePrice.hoursePriceId, _hoursePrice);
            });
            _self.afterLoad();
        }
    });
}

hoursePrices.prototype.afterLoad = function () {

}

hoursePrices.prototype.customShow = function () {

}

hoursePrices.prototype.getPrice = function (areaId, month) {
    var _self = this;
    for (var i = 0; i < _self.values.length; i++) {
        if (_self.values[i].areaId == areaId && _self.values[i].month == month) {
            return _self.values[i].price;
        }
    }
    return 0;
}