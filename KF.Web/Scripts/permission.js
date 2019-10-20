function permission() {
    this.permissionId = 0;
    this.roleId = 0;
    this.resourceId = 0;
    this.permissionType = 0;
}

permission.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/addService",
        type: "post",
        dataType: "json",
        data: {
            service: "permission",
            roleId: _self.roleId,
            resourceId: _self.resourceId,
            permissionType:_self.permissionType
        },
        success: function (ret) {
            _self.permissionId = ret.PermissionId;
            _self.afterLoad();
        },
        error: function (xmlhttp, status, message) {
            var error = $.decodeUtf8(message);
            $.showErrorMessage(error);
        }
    });
}

permission.prototype.afterLoad = function () {

}

permission.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/deleteService",
        type: "post",
        data: {
            service: "permission",
            roleId: _self.roleId,
            resourceId: _self.resourceId,
            permissionType:_self.permissionType
        },
        success: function (ret) {
            _self.afterDelete();
        },
        error: function (xmlhttp, status, message) {
            var error = $.decodeUtf8(message);
            $.showErrorMessage(error);
        }
    });
}

permission.prototype.afterDelete = function () {

}


function permissions() {
    this.values = {};
    this.filter = {};
}

permissions.prototype.add = function (permissionObj) {
    this.values["key_" + permissionObj.permissionId] = permissionObj;
}

permissions.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/getlistService",
        type: "post",
        dataType: "json",
        data: {
            roleId: _self.filter.roleId,
            service:"permission"
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _permission = new permission();
                _permission.permissionId = item.PermissionId;
                _permission.roleId = item.RoleId;
                _permission.resourceId = item.ResourceId;
                _permission.permissionType = item.PermissionType;
                _self.add(_permission);
            });
            _self.afterLoad();
        }
    });
}

permissions.prototype.afterLoad = function () {

}

permissions.prototype.hasPermission = function (roleId, resourceId,permissionType) {
    var _self = this;
    var hasPermission = false;
    $.each(_self.values, function (i, item) {
        if (item.roleId == roleId && item.resourceId == resourceId && item.permissionType == permissionType) {
            hasPermission = true;
            return false;
        }
    });
    return hasPermission;
}
