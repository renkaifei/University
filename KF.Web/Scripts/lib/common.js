/// <reference path="jquery-1.12.4.js" />
/// <reference path="handlebars.js" />
//$.StrToUTF8 = function (data) {
//    var result = [];
//    var k = 0;
//    for (var i = 0; i < data.length; i++) {
//        var j = encodeURI(data[i]);
//        if (j.length == 1) {
//            result[k++] = j.charCodeAt(0);
//        } else {
//            var bytes = j.split("%");
//            for (var l = 1; l < bytes.length; l++) {
//                result[k++] = parseInt("0x" + bytes[l]);
//            }
//        }
//    }
//    return result;
//}
//$.decodeUtf8 = function (inputStr) {
//    var outputStr = "";
//    var code1, code2, code3, code4;
//    inputStr = inputStr.split(",");
//    for (var i = 0; i < inputStr.length; i++) {
//        code1 = inputStr[i];

//        if (code1 < 128) {
//            outputStr += String.fromCharCode(code1);
//        }
//        else if (code1 < 224) {
//            code2 = inputStr[++i];
//            outputStr += String.fromCharCode(((code1 & 31) << 6) | (code2 & 63));
//        }
//        else if (code1 < 240) {
//            code2 = inputStr[++i];
//            code3 = inputStr[++i];
//            outputStr += String.fromCharCode(((code1 & 15) << 12) | ((code2 & 63) << 6) | (code3 & 63));
//        }
//        else {
//            code2 = inputStr[++i];
//            code3 = inputStr[++i];
//            code4 = inputStr[++i];
//            outputStr += String.fromCharCode(((code1 & 7) << 18) | ((code2 & 63) << 12) | ((code3 & 63) << 6) | (code2 & 63));
//        }
//    }

//    return outputStr;
//}
//$.showErrorMessage = function (errorMessage) {
//    var source =  '<div class="ui-dialog" id="errorDialog">';
//    source = source + '<div class="ui-dialog-cnt">';
//    source = source + '<header class="ui-dialog-hd ui-border-b">';
//    source = source + '<h3>错误</h3>';
//    source = source + '</header>';
//    source = source + '<div class="ui-dialog-bd ui-border-b">';
//    source = source + '<p>{{errorMessage}}</p>';
//    source = source + '</div>';
//    source = source + '<div class="ui-dialog-ft">';
//    source = source + '<button id="errorDialogBtnOk" type="button" data-role="button">确定</button>';
//    source = source + '</div>';
//    source = source + '</div>';
//    source = source + '</div>';
//    var template = Handlebars.compile(source);
//    var html = template({ errorMessage: errorMessage });
//    $("body").append(html);
//    $("#errorDialogBtnOk").click(function () {
//        $("#errorDialog").removeClass("show").remove();
//    });
//    $("#errorDialog").addClass("show");
//}
//$.showMessage = function (title,message) {
//    var source = '<div class="ui-dialog" id="messageDialog">';
//    source = source + '<div class="ui-dialog-cnt">';
//    source = source + '<header class="ui-dialog-hd ui-border-b">';
//    source = source + '<h3>{{title}}</h3>';
//    source = source + '</header>';
//    source = source + '<div class="ui-dialog-bd ui-border-b">';
//    source = source + '<p>{{message}}</p>';
//    source = source + '</div>';
//    source = source + '<div class="ui-dialog-ft">';
//    source = source + '<button id="messageDialogBtnOk" type="button" data-role="button">确定</button>';
//    source = source + '</div>';
//    source = source + '</div>';
//    source = source + '</div>';
//    var template = Handlebars.compile(source);
//    var html = template({
//        title:title,
//        message: message
//    });
//    $("body").append(html);
//    $("#messageDialogBtnOk").click(function () {
//        $("#messageDialog").removeClass("show").remove();
//    });
//    $("#messageDialog").addClass("show");
//}
//$.getQueryString = function (name) {
//    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
//    var r = window.location.search.substr(1).match(reg);
//    if (r != null) {
//        return unescape(r[2]);
//    }
//    return null;
//}
//$.showErrorMsg = function (error) {
//    $.toast(error, "forbidden");
//}

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
            $(h3).text("错误");
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
        i = i+ 1;
    });
    return ret;
}

entities.prototype.clear = function () {
    this.values = {};
}



