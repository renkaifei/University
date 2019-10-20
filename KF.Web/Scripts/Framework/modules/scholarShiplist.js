/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../util.js" />
/// <reference path="../Components/div_list_info.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../../university.js" />
/// <reference path="../../scholarship.js" />

var _university,_scholarships
function pageInit() {
    initUniversity();
}

function initUniversity() {
    _university = new university();
    _university.universityId = getUniversityId();
    _university.afterLoad = function () {
        var header = document.getElementsByTagName("header")[0];
        $(header).addClass("ui-header ui-header-positive");

        var i = new kf.components.icon_return();
        header.appendChild(i);
    }
}

function initScholarShips() {
    _scholarships = new scholarShips();
    _scholarships.filter.universityId = getUniversityId();
    _scholarships.afterLoad = function () {
        var fragment = document.createDocumentFragment();
        var count = _self.values.length;
        for (var i = 0; i < _self.count; i++) {
            var div_list_info = new kf.components.div_list_info();
            
            var labelName = kf.base.labelUI({ text: _self.values["scholarshipName"] });
            div_list_info.appendChild(labelName);
            fragment.appendChild(div_list_info.export());
        }
        document.getElementById("scholarships").appendChild(fragment);
    }
}

function getUniversityId() {
    var universityId = $.getQueryString("universityId");
    if (universityId == null) {
        return 0;
    } else {
        return parseInt(universityId);
    }
}

