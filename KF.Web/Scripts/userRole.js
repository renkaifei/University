/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />


function userRole() {
    this.userRoleId = 0;
    this.userId = 0;
    this.roleId = 0;
}

userRole.prototype.isNew = function () {
    return this.userRoleId == 0;
}

userRole.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/addservice",
        data: {
            userId: _self.userId,
            roleId: _self.roleId,
            service:"userRole"
        },
        success: function (ret) {
            _self.userRoleId = ret.UserRoleId;
            _self.afterAdd();
        }
    })
}

userRole.prototype.afterAdd = function () { }

userRole.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/deleteService",
        data: {
            userId: _self.userId,
            roleId:_self.roleId,
            service:"userRole"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

userRole.prototype.afterDelete = function () {

}

function userRoles() {
    entities.call(this);
}

$.extend(userRoles.prototype, entities.prototype);

userRoles.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/getListService",
        data: {
            userId: _self.filter.userId,
            service:"userRole"
        },
        success: function (ret) {
            $.each(ret, function (i, item) {
                var _userRole = new userRole();
                _userRole.userRoleId = item.UserRoleId;
                _userRole.userId = item.UserId;
                _userRole.roleId = item.RoleId;
                _self.add(_userRole.userRoleId,_userRole);
            });
            _self.afterLoad();
        }
    });
}

userRoles.prototype.afterLoad = function () {

}





