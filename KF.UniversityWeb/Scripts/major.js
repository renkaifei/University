/// <reference path="/Scripts/jquery-1.12.4.js" />
/// <reference path="/Scripts/common.js" />
function major() {
    this.majorId = 0;
    this.majorName = "";
    this.degree = 0;
    this.code = "";
    this.educationalSystem = 0;
    this.address = "";
    this.universityId = 0;
    this.universityName = "";
    this.degreeName = "";
    this.educationalSystemName = "";
}

major.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/majorService",
        data: {
            option: "getone",
            majorId: _self.majorId
        },
        success: function (ret) {
            _self.majorId = ret.MajorId,
            _self.majorName = ret.MajorName,
            _self.degree = ret.Degree;
            _self.code = ret.Code;
            _self.educationalSystem = ret.EducationalSystem;
            _self.address = ret.Address;
            _self.universityId = ret.UniversityId

            _self.afterLoad();
        }
    });
}

major.prototype.afterLoad = function () {

}

major.prototype.listItemUI = function () {
    var _self = this;
    var li = liUI();

    var div_list_info = list_infoUI();
    li.appendChild(div_list_info);

    var p = pUI({ text: _self.majorName });
    div_list_info.appendChild(p);

    return li;
}

major.prototype.detailUI = function () {
    var _self = this;

    var fragment = document.createDocumentFragment();
    var table = tableUI();
    var tbody = table.tBodies[0];

    var tr1 = trUI();
    tbody.appendChild(tr1);

    var td_degreeName = tdUI({ text: "层次: " + _self.degreeName });
    tr.appendChild(td_degreeName);

    var td_disciplineName = tdUI({ text: "科类： " + _self.disciplineName });
    tr.appendChild(td_disciplineName);
    var td_code = tdUI({ text: "国标代码: " + _self.code });
    tr.appendChild(td_code);

    var tr2 = trUI();
    tbody.appendChild(tr2);

    var td_educationalSystemName = tdUI({ text: "学制: " + _self.educationalSystemName });
    tr2.appendChild(td_educationalSystemName);
    var td_tuition = tdUI({ text: "学费: " + _self.tuition });
    tr2.appendChild(td_tuition);

    var td_address = tdUI({ text: "地址: " + _self.address });
    tr2.appendChild(td_address);
}

function majors() {
    entities.call(this);
}

$.extend(majors.prototype, entities.prototype);

majors.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/majorService",
        data: {
            option: "getlist",
            universityId: _self.filter.universityId
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i, item) {
                var _major = new major();
                _major.majorId = item.MajorId;
                _major.majorName = item.MajorName;
                _major.universityId = _self.filter.universityId;
                _self.add(_major.majorId, _major);
            });
            _self.afterLoad();
        }
    });
}

majors.prototype.afterLoad = function () {

}

majors.prototype.listUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    $.each(_self.values, function (i, item) {
        fragment.appendChild(item.listItemUI());
    });

    return fragment;
}
