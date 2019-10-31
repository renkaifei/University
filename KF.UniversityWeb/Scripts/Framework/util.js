/// <reference path="/Libraries/jquery-1.12.4.min.js" />

var kf = (function (kf,$) {
    var util = kf.util = kf.util || {};

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
        },
        goback:function(){
            history.back();
        }
    });
    $.ajaxSetup({
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        dataType: "json",
        error: function (xmlhttp, status, message) {
            if (xmlhttp.status == "602") {
                window.location.href = "/login.html";
            }
            var error = $.decodeUTF8(message);
            $.showErrorMessage(error);
        }
    });

    util.entities = function () {
        this.values = {};
        this.filter = {};
    }

    util.entities.prototype.add = function (key, value) {
        this.values["key_" + key] = value;
    }

    util.entities.prototype.getOne = function (key) {
        return this.values["key_" + key];
    }

    util.entities.prototype.item = function (index) {
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

    util.entities.prototype.clear = function () {
        this.values = {};
    }

    util.entitiesPage = function() {
        util.entities.call(this);
        this.filter = {
            pageIndex: 1,
            pageSize: 50,
            totalCount:0
        }
    }

    $.extend(util.entitiesPage.prototype, util.entities.prototype);

    util.entitiesPage.prototype.nextPage = function () {
        this.filter.pageIndex = this.filter.pageIndex + 1;
    }

    util.entitiesPage.prototype.prePage = function () {
        this.filter.pageIndex = this.filter.pageIndex - 1;
    }

    util.entitiesPage.prototype.isLast = function () {
        return false;
    }

    util.entitiesPage.prototype.isFirst = function () {
        return this.filter.pageIndex == 1;
    }

    return kf;

})(window.kf || {}, jQuery);