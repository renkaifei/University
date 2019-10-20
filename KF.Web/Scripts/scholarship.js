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
}

scholarShip.prototype.validate = function () {
    if (this.scholarShipName == "") {
        $.showErrorMessage("奖学金名称不能为空");
        return false;
    }
    return true;
}

scholarShip.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipId: _self.scholarShipId,
            option: "getone"
        },
        success: function (ret) {
            _self.scholarShipId = ret.ScholarShipId,
            _self.scholarShipName = ret.ScholarShipName,
            _self.scholarShipAbstract = $.decodeUTF8(ret.ScholarShipAbstract);
            _self.scholarShipTotal = ret.ScholarShipTotal;
            _self.universityId = ret.UniversityId;
            _self.startYear = ret.StartYear;
            _self.endYear = ret.EndYear;
            _self.afterLoad();
        }
    });
}

scholarShip.prototype.afterLoad = function () {
    
}

scholarShip.prototype.isNew = function () {
    return this.scholarShipId == 0;
}

scholarShip.prototype.add = function () {
    var _self = this;
    var scholarShipAbstract = $.strToUTF8(_self.scholarShipAbstract).join(",");
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipName: _self.scholarShipName,
            scholarShipAbstract: scholarShipAbstract,
            scholarShipTotal: _self.scholarShipTotal,
            startYear: _self.startYear,
            endYear:_self.endYear,
            universityId: _self.universityId,
            option:"add"
        },
        success: function (ret) {
            _self.scholarShipId = ret.ScholarShipId;
            _self.afterAdd();
        }
    })
}

scholarShip.prototype.afterAdd = function () {
    
}

scholarShip.prototype.update = function () {
    var _self = this;
    var scholarShipAbstract = $.strToUTF8(_self.scholarShipAbstract).join(",");
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipId: _self.scholarShipId,
            scholarShipName: _self.scholarShipName,
            scholarShipAbstract: scholarShipAbstract,
            scholarShipTotal: _self.scholarShipTotal,
            startYear: _self.startYear,
            endYear:_self.endYear,
            universityId: _self.universityId,
            option:"update"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}

scholarShip.prototype.afterUpdate = function () {
    
}

scholarShip.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/scholarShipService",
        data: {
            scholarShipId: _self.scholarShipId,
            option:"delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    })
}

scholarShip.prototype.afterDelete = function () { }

scholarShip.prototype.detailUI = function() {
    var _self = this;
    var fragment = document.createDocumentFragment();

    fragment.appendChild(formItem_text({ label: "名称", value: _self, fieldName: "scholarShipName" }));
    fragment.appendChild(formItem_text({ label: "总金额", value: _self, fieldName: "scholarShipTotal" }));
    fragment.appendChild(formItem_text({ label: "开始年份", value: _self, fieldName: "startYear" }));
    fragment.appendChild(formItem_text({ label: "结束年份", value: _self, fieldName: "endYear" }));
    fragment.appendChild(formItem_editor({ label: "简介", id: "scholarShipAbstract" }))
    
    return fragment;
}

function scholarShips() {
    kf.util.entitiesPage.call(this);
}

$.extend(scholarShips.prototype, kf.util.entitiesPage.prototype);

scholarShips.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/scholarShipService",
        data: {
            option: "getlist",
            universityId: _self.filter.universityId,
            pageIndex: _self.filter.pageIndex,
            pageSize:_self.filter.pageSize
        },
        success: function (ret) {
            _self.totalCount = ret.TotalCount;
            _self.clear();
            $.each(ret.Values, function (i, item) {
                var _scholarship = new scholarShip();
                _scholarship.scholarShipId = item.ScholarShipId;
                _scholarship.scholarShipName = item.ScholarShipName;
                _scholarship.scholarShipTotal = item.ScholarShipTotal;
                _scholarship.startYear = item.StartYear;
                _scholarship.endYear = item.EndYear;
                _self.add(_scholarship.scholarShipId, _scholarship);
            });
            _self.afterLoad();
        }
    });
}

scholarShips.prototype.afterLoad = function () {
    
}