/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />
/// <reference path="modules/base.js" />
/// <reference path="modules/dialog.js" />
/// <reference path="modules/grid.js" />
/// <reference path="modules/gridSelectDialog.js" />

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
    this.Is211 = 0;
    this.Is985 = 0;
    this.IsDoubleClass = 0;
}

university.prototype.add = function () {
    var _self = this;
    var encodeUniversityAbstract = $.strToUTF8(_self.universityAbstract).join(',');
    $.ajax({
        url: "/universityService",
        data: {
            universityName: _self.universityName,
            universityAddress: _self.universityAddress,
            universityAbstract: encodeUniversityAbstract,
            universityIcon: _self.universityIcon,
            cityId: _self.cityId,
            undergraduateTotalNumber: _self.undergraduateTotalNumber,
            postgraduateTotalNumber: _self.postgraduateTotalNumber,
            overseasStudentTotalNumber: _self.overseasStudentTotalNumber,
            Is211: _self.Is211,
            Is985: _self.Is985,
            IsDoubleClass:_self.IsDoubleClass,
            option:"add"
        },
        success: function (ret) {
            _self.afterAdd();
        }
    });
}

university.prototype.afterAdd = function () {

}

university.prototype.update = function () {
    var _self = this;
    var encodeUniversityAbstract = $.strToUTF8(_self.universityAbstract).join(',');
    $.ajax({
        url: "/universityService",
        data: {
            universityId: _self.universityId,
            universityName: _self.universityName,
            universityAddress: _self.universityAddress,
            universityAbstract: encodeUniversityAbstract,
            universityIcon: _self.universityIcon,
            cityId: _self.cityId,
            undergraduateTotalNumber: _self.undergraduateTotalNumber,
            postgraduateTotalNumber: _self.postgraduateTotalNumber,
            overseasStudentTotalNumber: _self.overseasStudentTotalNumber,
            Is211: _self.Is211,
            Is985: _self.Is985,
            IsDoubleClass:_self.IsDoubleClass,
            option:"update"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}

university.prototype.afterUpdate = function () {

}

university.prototype.load = function () {
    var _self = this;
   return $.ajax({
        url: "/universityService",
        data: {
            universityId: _self.universityId,
            option:"getone"
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
            _self.Is211 = ret.Is211;
            _self.Is985 = ret.Is985;
            _self.IsDoubleClass = ret.IsDoubleClass;
            _self.afterLoad();
        }
    });
}

university.prototype.afterLoad = function () {

}

university.prototype.validate = function () {
    if (this.universityName == "") {
        $.showErrorMessage("请输入高校名称");
        return false;
    }
    if (this.universityAddress == "") {
        $.showErrorMessage("请输入高校地址")
        return false;
    }
    if (!$.isNumeric(this.undergraduateTotalNumber)) {
        $.showErrorMessage("本科生数量应为数字");
        return false;
    }
    if (parseFloat(this.undergraduateTotalNumber) < 0) {
        $.showErrorMessage("本科生数量不能为负数");
        return false;
    }
    if (!$.isNumeric(this.postgraduateTotalNumber)) {
        $.showErrorMessage("研究生数量应为数字");
        return false;
    }
    if (parseFloat(this.postgraduateTotalNumber) < 0) {
        $.showErrorMessage("研究生数量不能为负数");
        return false;
    }
    if (!$.isNumeric(this.overseasStudentTotalNumber)) {
        $.showErrorMessage("留学生人数应为数字");
        return false;
    }
    if (parseFloat(this.overseasStudentTotalNumber) < 0) {
        $.showErrorMessage("研究生数量不能为负数");
        return false;
    }
    return true;
}

university.prototype.isNew = function () {
    return this.universityId == 0;
}

university.prototype.afterPreviewImage = function () {

}

university.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/universityService",
        data: {
            universityId: _self.universityId,
            option:"delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

university.prototype.listItemUI = function () {
    var _self = this;

    var li = liUI();

    var div_list_info = list_infoUI();
    li.appendChild(div_list_info);

    var p_universityName = pUI({ text:_self.universityName });
    div_list_info.appendChild(p_universityName);

    var p_operation = operationUI({
        detail: {
            text: "详情",
            click: function () {
                window.location.href = "/home/province/city/university/detail.html?universityId=" + _self.universityId;
            }
        },
        del: {
            text: "删除",
            click: function () {
                _self.delete();
            }
        },
        scholarShip: {
            text: "奖学金",
            click: function () {
                window.location.href = "/home/province/city/university/scholarship/list.html?universityId=" + _self.universityId;
            }
        },
        major: {
            text: "专业",
            click: function () {
                window.location.href = "/home/province/city/university/major/list.html?universityId=" + _self.universityId;
            }
        },
        course: {
            text: "课程",
            click: function () {
                window.location.href = "/home/province/city/university/course/list.html";
            }
        },
        enrollmentPlan: {
            text: "招生计划",
            click: function () {
                window.location.href = "/home/province/city/university/enrollmentPlan/list.html?universityId=" + _self.universityId;
            }
        }
    });

    div_list_info.appendChild(p_operation);

    return li;
}

university.prototype.listItemUI1 = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var li = document.createElement("li");
    $(li).addClass("ui-border-t");
    fragment.appendChild(li);

    var img = document.createElement("img");
    $(img).attr("src", "data:image/jpeg;base64," + _self.universityIcon).addClass("ui-avatar");
    li.appendChild(img);

    var div_list_info = document.createElement("div");
    $(div_list_info).addClass("ui-list-info");
    li.appendChild(div_list_info);

    var h4 = document.createElement("h4");
    $(h4).text(_self.universityName).attr("event", "detail").data("university", _self);
    div_list_info.appendChild(h4);

    return fragment;
}

university.prototype.detailUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var div_form_item_Icon = document.createElement("div");
    $(div_form_item_Icon).css("padding", "0px 15px 0px 15px");
    fragment.appendChild(div_form_item_Icon);

    var label = document.createElement("label");
    $(label).text("高校校徽").attr("style", "vertical-align:top;display:inline-block;width:95px;");
    div_form_item_Icon.appendChild(label);

    var input_file = document.createElement("input");
    $(input_file).prop("type", "file");
    div_form_item_Icon.appendChild(input_file);

    var img = document.createElement("img");
    div_form_item_Icon.appendChild(img);
    $(img).css({ height: "70px", width: "70px" }).click(function () {
        $(input_file).click()
    });
    if (_self.universityIcon != "") $(img).prop("src", "data:image/jpeg;base64," + _self.universityIcon);

    $(input_file).css({ "position": "absolute", left: "-100px", top: "-100px" }).change(function () {
        if (input_file.files.length == 0) return;
        var image = input_file.files[0];
        var formData = new FormData();
        formData.append("previewImage", image);
        formData.append("option", "preview");
        $.ajax({
            url: "/ImageService",
            data: formData,
            type: "POST",
            contentType: false,
            dataType:"",
            cache: false,
            processData: false,
            success: function (ret) {
                _self.universityIcon = ret;
                img.src = "data:image/jpeg;base64," + _self.universityIcon;
            }
        });
    });
    

    fragment.appendChild(formItem_text({ label: "高校名称", value: _self, fieldName: "universityName" }));
    fragment.appendChild(formItem_text({ label: "高校地址", value: _self, fieldName: "universityAddress" }));
    fragment.appendChild(formItem_text({ label: "本科生人数", value: _self, fieldName: "undergraduateTotalNumber" }));
    fragment.appendChild(formItem_text({ label: "研究生人数", value: _self, fieldName: "postgraduateTotalNumber" }));
    fragment.appendChild(formItem_text({ label: "留学生人数", value: _self, fieldName: "overseasStudentTotalNumber" }));
    fragment.appendChild(formItem_Desc({ text:"高校特性" }));

    fragment.appendChild(formItem_Checkbox({
        label: "211",
        selected:_self.Is211 == 1,
        click: function (e) {
            var target = e.target;
            if (target.checked) {
                _self.Is211 = 1;
            } else {
                _self.Is211 = 0;
            }
        }
    }));
    fragment.appendChild(formItem_Checkbox({
        label: "985",
        selected:_self.Is985 == 1,
        click: function (e) {
            var target = e.target;
            if (target.checked) {
                _self.Is985 = 1;
            } else {
                _self.Is985 = 0;
            }
        }
    }));
    fragment.appendChild(formItem_Checkbox({
        label: "双一流",
        selected:_self.IsDoubleClass == 1,
        click: function (e) {
            var target = e.target;
            if (target.checked) {
                _self.IsDoubleClass = 1;
            } else {
                _self.IsDoubleClass = 0;
            }
        }
    }));

    var div_form_item_universityAbstract = document.createElement("div");
    $(div_form_item_universityAbstract).addClass("ui-form-item ui-border-t");
    fragment.appendChild(div_form_item_universityAbstract);

    var label_universityAbstract = document.createElement("label");
    $(label_universityAbstract).text("高校简介");
    div_form_item_universityAbstract.appendChild(label_universityAbstract);
    
    var textarea = document.createElement("textarea");
    $(textarea).attr("id", "universityAbstract");
    fragment.appendChild(textarea);
    return fragment;
}

university.prototype.loadBasic = function () {
    var _self = this;
    $.ajax({
        url: "/universityService",
        data: {
            universityId: _self.universityId,
            option:"getbasic"
        },
        success: function (ret) {
            _self.universityId = ret.UniversityId;
            _self.universityName = ret.UniversityName;
            _self.universityAddress = ret.UniversityAddress;
            _self.undergraduateTotalNumber = ret.Undergraduate;
            _self.postgraduateTotalNumber = ret.Postgraduate;
            _self.overseasStudentTotalNumber = ret.OverseasStudent;
            _self.afterLoad();
        }
    });
}

function universitys() {
    kf.util.entitiesPage.call(this);
    this.filter.provinceId = 0;
    this.filter.cityId = 0;
}

$.extend(universitys.prototype, kf.util.entitiesPage.prototype);

universitys.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/universityService",
        data: {
            pageIndex: _self.filter.pageIndex,
            pageSize: _self.filter.pageSize,
            cityId: _self.filter.cityId,
            provinceId: _self.filter.provinceId,
            universityName: _self.filter.universityName || "",
            option: "getlist"
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i,item) {
                var _university = new university();
                _university.universityId = item.UniversityId;
                _university.universityName = item.UniversityName;
                _university.universityIcon = item.UniversityIcon;
                _university.universityAddress = item.UniversityAddress;
                _university.cityId = item.CityId;
                _self.add(_university.universityId,_university);
            });
            _self.afterLoad();
        }
    });
}

universitys.prototype.afterLoad = function () {

}

universitys.prototype.getlistInRecurit = function () {
    var _self = this;
    return $.ajax({
        url: "/universityService",
        data: {
            companyId: _self.filter.companyId,
            year: _self.filter.year,
            option:"getlistinrecurit"
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _university = new university();
                _university.universityId = item.UniversityId;
                _university.universityName = item.UniversityName;
                _self.add(item.UniversityId, _university);
            });
            _self.afterGetListInRecurit();
        }
    });
}

universitys.prototype.afterGetListInRecurit = function () {

}


