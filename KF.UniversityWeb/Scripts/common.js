/// <reference path="jquery-1.12.4.js" />
/// <reference path="handlebars.js" />

Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function createTemplate(name) {
    var source = document.getElementById(name).innerHTML;
    var template = Handlebars.compile(source);
    return template;
}

; (function ($) {
    $.extend({
        createTemplate: function (name) {
            var source = document.getElementById(name).innerHTML;
            var template = Handlebars.compile(source);
            return template;
        },
        strToUTF8: function (data) {
            var result = [];
            var k = 0;
            for (var i = 0; i < data.length; i++) {
                var j = encodeURI(data[i]);
                if (j.length == 1) {
                    result[k++] = j.charCodeAt(0);
                } else {
                    var bytes = j.split("%");
                    for (var l = 1; l < bytes.length; l++) {
                        result[k++] = parseInt("0x" + bytes[l]);
                    }
                }
            }
            return result;
        },
        decodeUTF8: function (inputStr) {
            var outputStr = "";
            var code1, code2, code3, code4;
            inputStr = inputStr.split(",");
            for (var i = 0; i < inputStr.length; i++) {
                code1 = inputStr[i];

                if (code1 < 128) {
                    outputStr += String.fromCharCode(code1);
                }
                else if (code1 < 224) {
                    code2 = inputStr[++i];
                    outputStr += String.fromCharCode(((code1 & 31) << 6) | (code2 & 63));
                }
                else if (code1 < 240) {
                    code2 = inputStr[++i];
                    code3 = inputStr[++i];
                    outputStr += String.fromCharCode(((code1 & 15) << 12) | ((code2 & 63) << 6) | (code3 & 63));
                }
                else {
                    code2 = inputStr[++i];
                    code3 = inputStr[++i];
                    code4 = inputStr[++i];
                    outputStr += String.fromCharCode(((code1 & 7) << 18) | ((code2 & 63) << 12) | ((code3 & 63) << 6) | (code2 & 63));
                }
            }

            return outputStr;
        },
        getQueryString: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        showErrorMessage: function (errorMessage) {
            var fragment = document.createDocumentFragment();

            var dialogDiv = document.createElement("div");
            $(dialogDiv).addClass("ui-dialog show");
            fragment.appendChild(dialogDiv);

            var dialogCntDiv = document.createElement("div");
            $(dialogCntDiv).addClass("ui-dialog-cnt");
            dialogDiv.appendChild(dialogCntDiv);

            var dialogbdDiv = document.createElement("div");
            $(dialogbdDiv).addClass("ui-dialog-bd ui-border-b");
            dialogCntDiv.appendChild(dialogbdDiv);

            var h3 = document.createElement("h3");
            $(h3).text("提示");
            dialogbdDiv.appendChild(h3);

            var p = document.createElement("p");
            $(p).text(errorMessage);
            dialogbdDiv.appendChild(p);

            var footDiv = document.createElement("div");
            $(footDiv).addClass("ui-dialog-ft");
            dialogCntDiv.appendChild(footDiv);

            var btnOK = document.createElement("button");
            $(btnOK).text("确定").on("click", function () {
                $(dialogDiv).remove();
            });
            footDiv.appendChild(btnOK);

            document.body.appendChild(dialogDiv);
        }
    });
    $.ajaxSetup({
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        dataType:"json",
        error: function (xmlhttp, status, message) {
            if (xmlhttp.status == "602") {
                window.location.href = "/login.html";
            }
            var error = $.decodeUTF8(message);
            $.showErrorMessage(error);
        }
    });

  
})(jQuery);


function entities() {
    this.totalCount = 0;
    this.values = {};
    this.filter = {};
}

entities.prototype.add = function (key, value) {
    this.totalCount = this.totalCount + 1;
    this.values["key_" + key] = value;
}

entities.prototype.getOne = function (key) {
    return this.values["key_" + key];
}

entities.prototype.item = function (index) {
    var i = 0;
    var _self = this;
    var ret;
    $.each(_self.values, function (key, value) {
        if (i == index) {
            ret = value;
            return false;
        }
        i = i + 1;
    });
    return ret;
}

entities.prototype.clear = function () {
    this.values = {};
}

function entitiesPage() {
    entities.call(this);
    this.filter = {
        pageIndex: 1,
        pageSize: 50
    }
}

$.extend(entitiesPage.prototype, entities.prototype);

entitiesPage.prototype.nextPage = function () {
    this.filter.pageIndex = this.filter.pageIndex + 1;
}

entitiesPage.prototype.prePage = function () {
    this.filter.pageIndex = this.filter.pageIndex - 1;
}

entitiesPage.prototype.isLast = function () {
    return this.filter.pageIndex * this.filter.pageSize >= this.totalCount;
}

entitiesPage.prototype.isFirst = function () {
    return this.filter.pageIndex == 1;
}

function formItem_text(option) {
    var div_form_item = document.createElement("div");
    $(div_form_item).addClass("ui-form-item ui-border-t");

    var label = document.createElement("label");
    $(label).text(option.label).addClass("ui-border-r");
    div_form_item.appendChild(label);

    var input = document.createElement("input");
    $(input).val(option.value[option.fieldName]).blur(function () {
        option.value[option.fieldName] = $(this).val();
    });
    div_form_item.appendChild(input);

    var i_clear = document.createElement("i");
    $(i_clear).addClass("ui-icon-close").click(function () {
        $(input).val("");
        option.value[option.fieldName] = "";
    });
    div_form_item.appendChild(i_clear);

    return div_form_item;
}

function formItem_editor(option) {
    var fragment = document.createDocumentFragment();

    var div_form_item = document.createElement("div");
    $(div_form_item).addClass("ui-form-item ui-border-t");
    fragment.appendChild(div_form_item);

    var label = document.createElement("label");
    $(label).text(option.label);
    div_form_item.appendChild(label);

    var textarea = document.createElement("textarea");
    $(textarea).prop("id", option.id);
    fragment.appendChild(textarea);
    return fragment;
}

function formItem_select(opt) {
    var fragment = document.createDocumentFragment();

    var div_form_item = document.createElement("div");
    $(div_form_item).addClass("ui-form-item ui-border-t");
    fragment.appendChild(div_form_item);

    var label = document.createElement("label");
    $(label).text(opt.label).addClass("ui-border-r");
    div_form_item.appendChild(label);

    var div_select = document.createElement("div");
    $(div_select).addClass("ui-select");
    div_form_item.appendChild(div_select);

    var select = document.createElement("select");
    div_select.appendChild(select);

    $.each(opt.initValues, function (i, item) {
        var option = document.createElement("option");
        option.value = item.value;
        option.text = item.text;
        select.appendChild(option);
    });

    $(select).val(opt.value[opt.fieldName]).change(function () {
        opt.value[opt.fieldName] = $(this).val();
    });

    return fragment;

}

function formItem_Checkbox(option) {
    var fragment = document.createDocumentFragment();

    var div_form_item = document.createElement("div");
    $(div_form_item).addClass("ui-form-item ui-form-item-switch ui-boder-t");
    fragment.appendChild(div_form_item);

    var p = document.createElement("p");
    $(p).text(option.label);
    div_form_item.appendChild(p);

    var label_ui_switch = document.createElement("label");
    $(label_ui_switch).addClass("ui-switch");
    div_form_item.appendChild(label_ui_switch);

    var checkbox = document.createElement("input");
    $(checkbox).prop("type", "checkbox").click(function (e) {
        option.click(e);
    });
    checkbox.checked = option.selected;
    label_ui_switch.appendChild(checkbox);

    return fragment;

}

function listItemUI(option) {
    var fragment = document.createDocumentFragment();

    var li = document.createElement("li");
    $(li).addClass("ui-border-t");
    fragment.appendChild(li);

    var div_list_info = document.createElement("div");
    $(div_list_info).addClass("ui-list-info");
    li.appendChild(div_list_info);

    var p = document.createElement("p");
    $(p).text(option.text);
    div_list_info.appendChild(p);

    if (option.operations) {
        var div_operations = document.createElement("div");
        $(div_operations).addClass("ui-label-list");
        $.each(option.operations, function (i, operation) {
            var label = document.createElement("label")
            $(label).text(operation.text).addClass("ui-label-s").click(operation.click);
            div_operations.appendChild(label);
        });
        fragment.appendChild(div_operations);
    }

    return fragment;
}

function labelSmallUI(option) {
    var label = document.createElement("label");
    $(label).addClass("ui-label-s").text(option.text);
    $.each(option.data, function (key, value) {
        $(label).data(key, value);
    })
    return label;
}

function listItemImageUI(option) {
    var fragment = document.createDocumentFragment();

    var li = document.createElement("li");
    $(li).addClass("ui-border-t");
    fragment.appendChild(li);

    var img = document.createElement("img");
    $(img).addClass("ui-avatar").attr("src", "data:image/jpeg;base64," + option.img);
    li.appendChild(img);

    var div_list_info = document.createElement("div");
    $(div_list_info).addClass("ui-list-info").click(option.click);
    li.appendChild(div_list_info);

    var p = document.createElement("p");
    $(p).text(option.text);
    div_list_info.appendChild(p);

    return fragment;
}

function listItemUI1(option) {
    var fragment = document.createDocumentFragment();

    var li = document.createElement("li");
    $(li).addClass("ui-border-t");
    fragment.appendChild(li);

    var div_list_info = document.createElement("div");
    $(div_list_info).addClass("ui-list-info").click(option.click);
    li.appendChild(div_list_info);

    var p = document.createElement("p");
    $(p).text(option.text);
    div_list_info.appendChild(p);

    return fragment;
}

function liUI() {
    var li = document.createElement("li");
    $(li).addClass("ui-border-t");
    return li;
}

function list_imgUI(option) {

    var img = document.createElement("img");
    $(img).attr("src", "data:image/jqeg;base64," + option.imgData);
    $(img).addClass("ui-avatar");

    return img;
}

function list_infoUI(option) {
    var div_list_info = document.createElement("div");
    $(div_list_info).addClass("ui-list-info");

    option = option || {};
    if (option.click) $(div_list_info).click(option.click);
    return div_list_info;
}

function labelUI(option) {
    var label = document.createElement("label");
    $(label).text(option.text);
    return label;
}

function tableUI() {
    var table = document.createElement("table");
    $(table).addClass("ui-table");
    var thead = table.createTHead();
    table.appendChild(thead);
    var tbody = table.createTBody();
    table.appendCchild(tbody);
    return table;
}

function trUI() {
    var tr = document.createElement("tr");
    return tr;
}

function tdUI() {
    var td = document.createElement("td");
    return td;
}

function pUI(option) {
    var p = document.createElement("p");
    $(p).text(option.text);
    if (option.click) $(p).click(option.click);
    return p;
}

function operationUI(option) {
    var div = document.createElement("div");
    $.each(option, function (i, item) {
        var label = document.createElement("label");
        $(label).addClass("ui-label-s").text(item.text);
        if (item.click) $(label).click(item.click);
        div.appendChild(label);
        $(div).append("&emsp;");
    });
    return div;
}

function spanUI(option) {
    var span = document.createElement("span");
    $(span).text(option.text);
    return span;
}

function imgAvatarUI(option) {
    var img = document.createElement("img");
    $(img).addClass("ui-avatar").prop("src", "data:image/jpeg;base64," + option.src);
    return img;
}







