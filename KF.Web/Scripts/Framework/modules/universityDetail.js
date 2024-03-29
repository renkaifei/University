﻿/// <reference path="../../Libraries/jquery-1.12.4.min.js" />
/// <reference path="../Components/base.js" />
/// <reference path="../Components/icon_return.js" />
/// <reference path="../Components/div_list_info.js" />
/// <reference path="../Components/formItem_text.js" />
/// <reference path="../Components/formItem_checkbox.js" />
/// <reference path="../../university.js" />


var _university;
function pageInit() {
    initPageHeader();
    initPageFooter();
    initUniversity();
    _university.load();
}

function initPageHeader() {
    var header = document.getElementsByTagName("header")[0];
    $(header).addClass("ui-header ui-header-positive");

    var i = new kf.components.icon_return();
    header.appendChild(i);

    var h1 = kf.base.h1UI({
        text: "高校详情"
    });
    header.appendChild(h1);
}

function initUniversity(){
    _university = new university();
    _university.universityId = getUniversityId();
    if(_university.isNew()){
        _university.afterAdd = function(){
            history.back();
        }
        initUniversityUI();
    }else{
        _university.afterLoad = function(){
            initUniversityUI()
        }
        _university.afterUpdate = function(){
            history.back();
        }
    }
}

function initUniversityUI() {
    var fragment = document.createDocumentFragment();

    var div_form_item_Icon = kf.base.divUI({ className:"ui-border-b" });
    $(div_form_item_Icon).css("padding", "0px 15px 0px 15px");
    fragment.appendChild(div_form_item_Icon);

    var label = kf.base.labelUI({ text: "高校校徽" });
    $(label).attr("style", "vertical-align:top;display:inline-block;width:95px;");
    div_form_item_Icon.appendChild(label);

    var input_file = document.createElement("input");
    $(input_file).prop("type", "file");
    div_form_item_Icon.appendChild(input_file);

    var img = document.createElement("img");
    div_form_item_Icon.appendChild(img);
    $(img).css({ height: "70px", width: "70px" }).click(function () {
        $(input_file).click()
    });
    if (_university.universityIcon != "") $(img).prop("src", "data:image/jpeg;base64," + _university.universityIcon);

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
            dataType: "",
            cache: false,
            processData: false,
            success: function (ret) {
                _university.universityIcon = ret;
                img.src = "data:image/jpeg;base64," + _university.universityIcon;
            }
        });
    });

    var formItem_universityName = new kf.components.formItem_text({
        label: "高校名称",
        value: _university.universityName,
        change: function (value) {
            _university.universityName = value;
        },
        clear: function () {
            _university.setUniversityName("");
        }
    });

    fragment.appendChild(formItem_universityName.export());

    var formItem_universityAddress = new kf.components.formItem_text({
        label: "高校地址",
        value: _university.universityAddress,
        change: function (value) {
            _university.universityAddress = value;
        },
        clear: function () {
            _university.universityAddress = "";
        }
    });
    fragment.appendChild(formItem_universityAddress.export());

    var formItem_undergraduateTotalNumber = new kf.components.formItem_text({
        label: "本科生人数",
        value: _university.undergraduateTotalNumber,
        change: function (value) {
            _university.undergraduateTotalNumber = value;
        },
        clear: function () {
            _university.undergraduateTotalNumber = 0;
        }
    });
    fragment.appendChild(formItem_undergraduateTotalNumber.export());

    var formItem_postgraduateTotalNumber = new kf.components.formItem_text({
        label: "研究生人数",
        value: _university.postgraduateTotalNumber,
        change: function (value) {
            _university.postgraduateTotalNumber = value;
        },
        clear: function () {
            _university.postgraduateTotalNumber = 0;
        }
    });
    fragment.appendChild(formItem_postgraduateTotalNumber.export());

    var formItem_overseasStudentTotalNumber = new kf.components.formItem_text({
        label: "留学生人数",
        value: _university.overseasStudentTotalNumber,
        change: function (value) {
            _university.overseasStudentTotalNumber = value;
        },
        clear: function () {
            _university.overseasStudentTotalNumber = 0;
        }
    });
    fragment.appendChild(formItem_overseasStudentTotalNumber.export());

    var div_Desc = kf.base.divUI({ className: "formItem-desc", text: "高校特性" });
    fragment.appendChild(div_Desc);

    var formItem_211 = new kf.components.formItem_checkbox({
        label: "211",
        checked: _university.Is211 == 1,
        click: function (checked) {
            _university.Is211 = checked ? 1 : 0;
        }
    });
    fragment.appendChild(formItem_211.export());

    var formItem_985 = new kf.components.formItem_checkbox({
        label: "985",
        checked: _university.Is985 == 1,
        click: function (checked) {
            _university.Is985 = checked ? 1 : 0;
        }
    });
    fragment.appendChild(formItem_985.export());

    var formItem_doubleClass = new kf.components.formItem_checkbox({
        label: "双一流",
        checked: _university.IsDoubleClass == 1,
        click: function (checked) {
            _university.IsDoubleClass = checked ? 1 : 0
        }
    });
    fragment.appendChild(formItem_doubleClass.export());

    var div_universityAbstract = kf.base.divUI({ className: "formItem-desc ui-border-b", text: "高校简介" });
    fragment.appendChild(div_universityAbstract);

    var textarea = kf.base.textareaUI({ id: "universityAbstract" });
    $(textarea).attr("id", "universityAbstract");
    fragment.appendChild(textarea);
    document.getElementById("university").appendChild(fragment);
    CKEDITOR.replace("universityAbstract");
    CKEDITOR.instances.universityAbstract.setData(_university.universityAbstract);
}

function getUniversityId() {
    if($.getQueryString("universityId") == null){
        return 0;
    }else{
        return parseInt($.getQueryString("universityId"));
    }
}



function initPageFooter() {
    var footer = document.getElementsByTagName("footer")[0];
    $(footer).addClass("ui-footer ui-footer-positive ui-btn-group");

    var btnOk = new kf.base.buttonUI({
        className: "ui-btn ui-btn-primary",
        text: "保存",
        click: function () {
            if (_university.isNew())
                _university.add();
            else
                _university.update();
        }
    });
    footer.appendChild(btnOk.export());
}