/// <reference path="zepto.min.js" />
/// <reference path="handlebars.js" />

function errorDialog() {
    this.title = "";
    this.message = "";
}

errorDialog.prototype.show = function () {
    var source = '<div class="ui-dialog" id="errorDialog"><div class="ui-dialog-cnt"><header class="ui-dialog-hd ui-border-b">';
    source = source + '<h3>{{title}}</h3></header><div class="ui-dialog-bd">{{message}}</div><div class="ui-dialog-ft"><button id="btnMsgOk" data-role="button">确定</button>'
    source = source + '</div></div></div>';
    var msgTmp = Handlebars.compile(source);
    var msgHtml = msgTmp({ title: this.title, message: this.message });
    $("body").append(msgHtml);
    $("#btnMsgOk").click(function () {
        $("#errorDialog").removeClass("show").remove();
    });
    $("#errorDialog").addClass("show");
}