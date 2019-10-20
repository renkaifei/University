/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />
function major() {
    this.majorId = 0;
    this.majorName = "";
    this.degree = 0;
    this.code = "";
    this.educationalSystem = 0;
    this.address = "";
    this.universityId = 0;
    this.universityName = "";
    this.isProvinceFeature = 0;
    this.isCountryFeature = 0;
    this.majorIntroduction = "";
}

major.prototype.validate = function () {
    if (this.majorName == "") {
        $.showErrorMessage("专业名称不能为空");
        return false;
    }
    return true;
}

major.prototype.isNew = function () {
    return this.majorId == 0;
}

major.prototype.add = function () {
    var _self = this;
    var data = $.strToUTF8(_self.majorIntroduction).join(',');
    $.ajax({
        url: "/majorService",
        data: {
            option: "add",
            majorName: _self.majorName,
            degree: _self.degree,
            code: _self.code,
            educationalSystem: _self.educationalSystem,
            address: _self.address,
            isProvinceFeature: _self.isProvinceFeature,
            isCountryFeature:_self.isCountryFeature,
            universityId: _self.universityId,
            majorIntroduction:data
        },
        success: function (ret) {
            _self.majorId = ret.MajorId;
            _self.afterAdd();
        }
    });
}

major.prototype.afterAdd = function () {
    
}

major.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/majorService",
        data: {
            option:"getone",
            majorId: _self.majorId
        },
        success: function (ret) {
            _self.majorId = ret.MajorId,
            _self.majorName = ret.MajorName,
            _self.degree = ret.Degree;
             _self.code = ret.Code;
            _self.educationalSystem = ret.EducationalSystem;
             _self.address = ret.Address;
             _self.isProvinceFeature = ret.IsProvinceFeature;
             _self.isCountryFeature = ret.IsCountryFeature;
             _self.universityId = ret.UniversityId;
             var data = $.decodeUTF8(ret.MajorIntroduction);
             _self.majorIntroduction = data;
            _self.afterLoad();
        }
    });
}

major.prototype.afterLoad = function () {
    
}

major.prototype.update = function () {
    var _self = this;

    var data = $.strToUTF8(_self.majorIntroduction).join(',');

    $.ajax({
        url: "/majorService",
        data: {
            majorId: _self.majorId,
            majorName: _self.majorName,
            degree: _self.degree,
            code: _self.code,
            educationalSystem: _self.educationalSystem,
            address: _self.address,
            isProvinceFeature: _self.isProvinceFeature,
            isCountryFeature:_self.isCountryFeature,
            universityId: _self.universityId,
            majorIntroduction: data,
            option:"update"
        },
        success: function () {
            _self.afterUpdate();
        }
    })
}

major.prototype.afterUpdate = function(){
    
}

major.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/majorService",
        data: {
            majorId: _self.majorId,
            option:"delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    })
}

major.prototype.afterDelete = function () {

}

major.prototype.listItemUI = function () {
    var _self = this;
    var li = liUI();
    var div_list_info = list_infoUI();
    li.appendChild(div_list_info);

    var p_majorName = pUI({ text: _self.majorName + "" });
    div_list_info.appendChild(p_majorName);

    if (_self.isProvinceFeature == 1) {
        var p_provinceFeature = labelSmallUI({ text: "省级特色" });
        div_list_info.appendChild(p_provinceFeature);
    }
    if (_self.isCountryFeature == 1) {
        var p_countryFeature = labelSmallUI({ text: "国家特色" });
        div_list_info.appendChild(p_countryFeature);
    }

    var p_majorCode = pUI({ text: _self.code });
    div_list_info.appendChild(p_majorCode);

    var operation = operationUI({
        detail: {
            text: "详情",
            click: function () {
                window.location.href = "/home/province/city/university/major/detail.html?majorId=" + _self.majorId;
            }
        },
        del: {
            text: "删除",
            click: function () {
                _self.delete();
            }
        },
        assignCourse: {
            text: "课程设置",
            click: function () {
                window.location.href = "/home/province/city/university/major/assignCourses.html?majorId=" + _self.majorId + "&universityId=" + _self.universityId;
            }
        }
    });
    div_list_info.appendChild(operation);
    return li;
}

major.prototype.detailUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    fragment.appendChild(formItem_text({ label: "专业名称", value: _self, fieldName: "majorName" }));
    fragment.appendChild(formItem_text({ label: "专业地址", value: _self, fieldName: "address" }));
    fragment.appendChild(formItem_text({ label: "国标代码", value: _self, fieldName: "code" }));
    fragment.appendChild(formItem_select({
        label: "学制", value: _self, fieldName: "educationalSystem",
        initValues: [
            { value: "0", text: "" },
            { value: "1", text: "三年" },
            { value: "2", text: "四年" },
            { value: "3", text: "五年" },
            { value: "4", text: "七年" },
        ]
    }));
    fragment.appendChild(formItem_select({
        label: "层次", value: _self, fieldName: "degree",
        initValues: [
            { value: "0", text: "" },
            { value: 1, text: "专科" },
            { value: 2, text: "本科" }
        ]
    }));
    fragment.appendChild(formItem_Checkbox({
        label: "省级特色",
        selected:_self.isProvinceFeature == 1,
        click: function (e) {
            var target = e.target;
            if (target.checked) {
                _self.isProvinceFeature = 1;
            } else {
                _self.isProvinceFeature = 0;
            }
        }
    }));
    fragment.appendChild(formItem_Checkbox({
        label: "国家特色",
        selected:_self.isCountryFeature == 1,
        click: function (e) {
            var target = e.target;
            if (target.checked) {
                _self.isCountryFeature = 1;
            } else {
                _self.isCountryFeature = 0;
            }
        }
    }));

    var p_major = formItem_Desc({ text:"专业介绍" });
    fragment.appendChild(p_major);

    var textarea = document.createElement("textarea");
    $(textarea).attr("id", "majorIntroduction");
    fragment.appendChild(textarea);

    return fragment;
}

function majors() {
    kf.util.entities.call(this);
}

$.extend(majors.prototype, kf.util.entities.prototype);

majors.prototype.load = function(){
    var _self = this;
    $.ajax({
        url: "/majorService",
        data: {
            option:"getlist",
            universityId: _self.filter.universityId,
            majorName:_self.filter.majorName
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i, item) {
                var _major = new major();
                _major.majorId = item.MajorId;
                _major.majorName = item.MajorName;
                _major.code = item.Code;
                _major.universityId = _self.filter.universityId;
                _major.isProvinceFeature = item.IsProvinceFeature;
                _major.isCountryFeature = item.IsCountryFeature;
                _self.add(_major.majorId, _major);
            });
            _self.afterLoad();
        }
    });
}

majors.prototype.afterLoad = function () {

}

majors.prototype.getListInRecurit = function () {
    var _self = this;
    $.ajax({
        url: "/majorService",
        data: {
            companyId: _self.filter.companyId,
            year: _self.filter.year,
            universityId: _self.filter.universityId,
            option: "getlistinrecurit"
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i,value) {
                var _major = new major();
                _major.majorId = value.MajorId;
                _major.majorName = value.MajorName;
                _self.add(value.MajorId,_major);
            });
            _self.afterGetListInRecurit();
        }
    });
}

majors.prototype.afterGetListInRecurit = function () {

}