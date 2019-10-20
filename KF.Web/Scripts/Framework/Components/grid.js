/// <reference path="/Scripts/jquery-1.12.4.js" />
/// <reference path="/Scripts/modules/base.js" />

var kf = (function (kf,$) {
    
    var components = kf.components = kf.components || {};

    components.grid = function () {
        var _self = this;
        _self.table = kf.base.tableUI();
        _self.table.createTHead();
        _self.table.createTBody();
        _self.table.createTFoot();
        _self.values = [];
        $(_self.table.tBodies[0]).on("click", "tr", function () {
            $(this).addClass("row-selected").siblings().removeClass("row-selected");
        });
    }

    components.grid.prototype.initHeader = function (columns) {
        var _self = this;
        _self.columns = columns;
        var tHead = _self.table.createTHead();
        var tr = kf.base.trUI();
        tHead.appendChild(tr);
        $.each(columns, function (i, column) {
            var td = kf.base.tdUI();
            td.innerText = column.headerName;
            tr.appendChild(td);
        });
    }

    components.grid.prototype.export = function () {
        return this.table;
    }

    components.grid.prototype.addRow = function (value) {
        var _self = this;
        _self.values.push(value);
        var tr = kf.base.trUI();
        $.each(_self.columns, function (i, column) {
            var td = kf.base.tdUI();
            td.innerText = value[column.name];
            tr.appendChild(td);
        });
        _self.table.tBodies[0].appendChild(tr);
    }

    components.grid.prototype.clearRows = function () {
        var _self = this;
        _self.table.tBodies[0].innerHTML = "";
    }

    components.grid.prototype.currentRowIndex = function () {
        var _self = this;
        var iCurrentIndex = -1;
        $.each(_self.table.tBodies[0].rows, function (i, row) {
            if ($(row).hasClass("row-selected")) {
                iCurrentIndex = i;
                return false;
            }
        });
        return iCurrentIndex;
    }

    return kf;

})(window.kf || {},jQuery)