/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function hoursePrice() {
    this.hoursePriceId = 0;
    this.areaId = 0;
    this.year = (new Date()).getFullYear();
    this.month = (new Date()).getMonth() + 1;
    this.price = 0;
}

hoursePrice.prototype = {
    validate: function () {
        var _self = this;
        if (!$.isNumeric(_self.year)) {
            $.showErrorMessage("年份请输入数字");
            return false;
        }
        if (!$.isNumeric(_self.month)) {
            $.showErrorMessage("月份请输入数字");
            return false;
        }
        if (!$.isNumeric(_self.price)) {
            $.showErrorMessage("价格请输入数字");
            return false;
        }
        if (_self.areaId == 0) {
            $.showErrorMessage("请选择区域");
            return false;
        }
        return true;
    },
    reset:function(field){
        if (field == "year") {
            this.year = 0;
        } else if (field == "month") {
            this.month = 0;
        } else if (field == "price") {
            this.price == 0
        }
    },
    isNew: function () {
        return this.hoursePriceId == 0;
    }
};

hoursePrice.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/hoursePriceService",
        data: {
            areaId: _self.areaId,
            year: _self.year,
            month: _self.month,
            price: _self.price,
            option: "add"
        },
        success: function (ret) {
            _self.hoursePriceId = ret.HoursePriceId;
            _self.afterAdd();
        }
    });
}

hoursePrice.prototype.afterAdd = function () {

}

hoursePrice.prototype.update = function () {
    var _self = this;
    $.ajax({
        url: "/hoursePriceService",
        data: {
            hoursePriceId: _self.hoursePriceId,
            year: _self.year,
            month: _self.month,
            price: _self.price,
            areaId:_self.areaId,
            option: "update"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}

hoursePrice.prototype.afterUpdate = function () { }

hoursePrice.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/hoursePriceService",
        data: {
            hoursePriceId: _self.hoursePriceId,
            option: "getone"
        },
        success: function (ret) {
            _self.hoursePriceId = ret.HoursePriceId;
            _self.year = ret.Year;
            _self.month = ret.Month;
            _self.price = ret.Price;
            _self.areaId = ret.AreaId;
            _self.afterLoad();
        }
    });
}

hoursePrice.prototype.afterLoad = function () { }

hoursePrice.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/hoursePriceService",
        data: {
            hoursePriceId: _self.hoursePriceId,
            option: "delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    })
}

hoursePrice.prototype.afterDelete = function () { }

hoursePrice.prototype.listItemUI = function () {
    var _self = this;

    var li = liUI();

    var div_ui_list_info = list_infoUI();
    li.appendChild(div_ui_list_info);

    var p1 = document.createElement("div");
    div_ui_list_info.appendChild(p1);

    var span_areaName = spanUI({ text: "区:" + _self.areaName });
    p1.appendChild(span_areaName);
    $(p1).append("&emsp;");

    var span_year = spanUI({ text: "年份:" + _self.year });
    p1.appendChild(span_year);
    $(p1).append("&emsp;");

    var span_month = spanUI({ text: "月份:" + _self.month });
    p1.appendChild(span_month);
    $(p1).append("&emsp;");

    var span_price = spanUI({ text: "价格:" + _self.price });
    p1.appendChild(span_price);

    var operation = operationUI({
        detail: {
            text: "详细",
            click: function () {
                window.location.href = "/home/province/city/hoursePrice/detail.html?hoursePriceId=" + _self.hoursePriceId + "&cityId=" + _self.cityId;
            }
        },
        del: {
            text: "删除",
            click: function () {
                _self.delete();
            }
        }
    });


    div_ui_list_info.appendChild(operation);

    return li;
}

hoursePrice.prototype.detailUI = function (_areas) {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var div_form_item_year = formItem_text({
        label: "年份",
        value: _self,
        fieldName:"year"
    });
    fragment.appendChild(div_form_item_year);

    var div_form_item_month = formItem_text({
        label: "月份",
        value: _self,
        fieldName:"month"
    });
    fragment.appendChild(div_form_item_month);

    var div_form_item_price = formItem_text({
        label: "价格",
        value: _self,
        fieldName:"price"
    });
    fragment.appendChild(div_form_item_price);

    var options = [];
    $.each(_areas.values, function (i,item) {
        options.push({ text: item.areaName, value: item.areaId });
    });

    var div_form_item_area = formItem_select({
        label: "区域",
        value: _self,
        fieldName: "areaId",
        initValues: options
    });
    fragment.appendChild(div_form_item_area);
    return fragment;
}

function hoursePrices() {
    var _self = this;
    entitiesPage.call(_self);

    $.extend(_self.filter,{
        cityId: 0,
        year: (new Date()).getFullYear(),
        month: 0,
        areaId: 0,
        pageIndex: 1,
        pageSize:10
    });
}

$.extend(hoursePrices.prototype, entitiesPage.prototype);

hoursePrices.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/hoursePriceService",
        data: {
            year: _self.filter.year,
            areaId: _self.filter.areaId,
            cityId: _self.filter.cityId,
            pageIndex: _self.filter.pageIndex,
            pageSize:_self.filter.pageSize,
            option: "getlist"
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

hoursePrices.prototype.getPrice = function (areaId,month) {
    var _self = this;
    for (var i = 0; i < _self.values.length; i++) {
        if (_self.values[i].areaId == areaId && _self.values[i].month == month) {
            return _self.values[i].price;
        }
    }
    return 0;
}

hoursePrices.prototype.listUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();
    $.each(_self.values, function (i, item) {
        fragment.appendChild(item.listItemUI());
    });
    return fragment;
}