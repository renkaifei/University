/// <reference path="../jquery-1.12.4.js" />
/// <reference path="../common.js" />

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
}

university.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/anonymousGetOneService",
        data: {
            universityId: _self.universityId,
            service: "university"
        },
        success: function (ret) {
            _self.universityId = ret.UniversityId;
            _self.universityName = ret.UniversityName;
            _self.universityAddress = ret.UniversityAddress;
            _self.cityId = ret.CityId;
            var abstract = $.decodeUTF8(ret.UniversityAbstract);
            _self.universityAbstract = abstract;
            _self.universityIcon = ret.UniversityIcon;
            _self.undergraduateTotalNumber = ret.Undergraduate;
            _self.postgraduateTotalNumber = ret.Postgraduate;
            _self.overseasStudentTotalNumber = ret.OverseasStudent;
            _self.afterLoad();
        }
    });
}

university.prototype.afterLoad = function () {

}

university.prototype.listItemUI = function () {
    var _self = this;
    return listItemImageUI({
        img:_self.universityIcon,
        text: _self.universityName,
        click: function () {
            window.location.href = "/university/detail.html?universityId=" + _self.universityId;
        }
    });
}

university.prototype.detailUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var li = liUI();
    fragment.appendChild(li);

    var div_list_img = list_imgUI({ imgData: _self.universityIcon });
    li.appendChild(div_list_img);

    var div_list_info = list_infoUI();
    li.appendChild(div_list_info);

    var label_address = labelUI({ text: "高校地址：" });
    div_list_info.appendChild(label_address);

    var address = labelUI({ text:_self.universityAddress });
    div_list_info.appendChild(address);

    var li_1 = liUI();
    fragment.appendChild(li_1)

    var div_list_info_universityAbstract = list_infoUI();
    li_1.appendChild(div_list_info_universityAbstract);

    div_list_info_universityAbstract.innerHTML = _self.universityAbstract;

    return fragment;
}

university.prototype.studentInfoUI = function () {

    var _self = this;
    var fragment = document.createDocumentFragment();

    var table = document.createElement("table");
    $(table).addClass("ui-table");
    fragment.appendChild(table);

    var header = document.createElement("thead");
    table.appendChild(header);

    var th_blank = document.createElement("th");
    header.appendChild(th_blank);

    var th_undergraduate = document.createElement("th");
    $(th_undergraduate).text("本科生");
    header.appendChild(th_undergraduate);

    var th_postgraduate = document.createElement("th");
    $(th_postgraduate).text("硕士生");
    header.appendChild(th_postgraduate);

    var th_overseasStudent = document.createElement("th");
    $(th_overseasStudent).text("留学生");
    header.appendChild(th_overseasStudent);

    var tbody = table.createTBody();
    
    var tr = document.createElement("tr");
    tbody.appendChild(tr);

    var td_blank = document.createElement("td");
    $(td_blank).text("人数");
    tr.appendChild(td_blank);

    var td_undergraduate = document.createElement("td");
    $(td_undergraduate).text(_self.undergraduateTotalNumber);
    tr.appendChild(td_undergraduate);

    var td_postgraduate = document.createElement("td");
    $(td_postgraduate).text(_self.postgraduateTotalNumber);
    tr.appendChild(td_postgraduate);

    var td_overseas = document.createElement("td");
    $(td_overseas).text(_self.overseasStudentTotalNumber);
    tr.appendChild(td_overseas);

    return fragment;
}


function universitys() {
    entitiesPage.call(this);
}

$.extend(universitys.prototype, entitiesPage.prototype);

universitys.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/anonymousGetListService",
        data: {
            pageIndex: _self.filter.pageIndex,
            pageSize: _self.filter.pageSize,
            cityId: _self.filter.cityId,
            provinceId: _self.filter.provinceId,
            service: "university"
        },
        success: function (ret) {
            _self.totalCount = ret.TotalCount;
            _self.clear();
            $.each(ret.Values, function (i, item) {
                var _university = new university();
                _university.universityId = item.UniversityId;
                _university.universityName = item.UniversityName;
                _university.universityIcon = item.UniversityIcon;
                _university.universityAddress = item.UniversityAddress;
                _university.cityId = item.CityId;
                _self.add(_university.universityId, _university);
            });
            _self.afterLoad();
        }
    });
}

universitys.prototype.afterLoad = function () {

}

universitys.prototype.listUI = function () {
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