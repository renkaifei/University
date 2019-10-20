/// <reference path="/Scripts/jquery-1.12.4.js" />
/// <reference path="/Scripts/common.js" />

function scholarShip() {
    this.scholarShipId = 0;
    this.scholarShipName = "";
    this.scholarShipAbstract = "";
    this.scholarShipTotal = "";
    this.startYear = "";
    this.endYear = "";
    this.universityId = 0;
}

scholarShip.prototype.listItemUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var li = liUI();
    fragment.appendChild(li);

    var div_list_info = list_infoUI({
        click: function () {
            window.location.href = "/university/scholarShip/detail.html?scholarShipId=" + _self.scholarShipId;
        }
    });

    li.appendChild(div_list_info);

    var label_scholarShipName = labelUI({
        text: _self.scholarShipName
    });
    div_list_info.appendChild(label_scholarShipName);

    return fragment;
}

function scholarShips() {
    entitiesPage.call(this);
    this.filter.pageIndex = 1;
    this.filter.pageSize = 1000;
}

$.extend(scholarShips.prototype, entitiesPage.prototype);

scholarShips.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/anonymousGetListService",
        data: {
            service: "scholarship",
            universityId: _self.filter.universityId,
            pageIndex: _self.filter.pageIndex,
            pageSize: _self.filter.pageSize
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

scholarShips.prototype.listUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();
    $.each(_self.values, function (i, item) {
        item.afterDelete = function () {
            _self.load();
        }
        fragment.appendChild(item.listItemUI());
    });
    return fragment;
}