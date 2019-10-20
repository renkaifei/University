/// <reference path="jquery-1.12.4.js" />
function resource() {
    this.resourceId = 0;
    this.resourceName = "";
}

function resources() {
    this.values = {};
}

resources.prototype.add = function (resourceObj) {
    this.values["key_" + resourceObj.resourceId] = resourceObj;
}

resources.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/getlistService",
        type: "post",
        dataType: "json",
        data:{
            service:"resource"
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _resource = new resource();
                _resource.resourceId = item.ResourceId;
                _resource.resourceName = item.ResourceName;
                _self.add(_resource);
            });
            _self.afterLoad();
        },
        error: function (xmlhttp, status, message) {
            var error = $.decodeUtf8(message);
            $.showErrorMessage(error);
        }
    });
}

resources.prototype.afterLoad = function () {

}