/// <reference path="Libraries/jquery-1.12.4.min.js" />
/// <reference path="Framework/util.js" />


function recurit() {
    this.recuritId = 0;
    this.companyId = 0;
    this.year = 0;
    this.majorId = 0;
}

recurit.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/recuritService",
        data: {
            recuritId: _self.recuritId,
            option:"getone"
        },
        success: function (ret) {
            _self.recuritId = ret.RecuritId;
            _self.companyId = ret.CompanyId;
            _self.Year = ret.Year;

        }
    })
}

recurit.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/recuritService",
        data: {
            companyId: _self.companyId,
            year: _self.year,
            majorId: _self.majorId,
            option: "add"
        },
        success: function (ret) {
            _self.recuritId = ret.RecuritId;
            _self.afterAdd();
        }
    })
}

recurit.prototype.afterAdd = function () {

}

recurit.prototype.afterLoad = function () {
    
}

recurit.prototype.update = function () {
    var _self = this;
    $.ajax({
        url: "/recuritService",
        data: {
            recuritId: _self.recuritId,
            companyId: _self.companyId,
            year: _self.year,
            majorId: _self.majorId,
            option:"update"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}

recurit.prototype.afterUpdate = function () {

}

recurit.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/recuritService",
        data: {
            recuritId: _self.recuritId,
            option:"delete"
        },
        success: function () {
            _self.afterDelete();
        }
    })
}

recurit.prototype.afterDelete = function () {

}

function recurits() {
    kf.util.entitiesPage.call(this);
}

$.extend(recurits.prototype, kf.util.entitiesPage.prototype);

recurits.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/recuritService",
        data: {
            companyId: _self.filter.companyId,
            year: _self.filter.year,
            universityId:_self.filter.universityId,
            option:"getlist"
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _recurit = new recurit();
                _recurit.recuritId = item.RecuritId,
                _recurit.companyId = item.CompanyId;
                _recurit.year = item.Year;
                _recurit.majorId = item.MajorId;
                _self.add(_recurit.recuritId, _recurit);
            });
            _self.afterLoad();
        }
    })
}

recurit.prototype.afterLoad = function () {

}