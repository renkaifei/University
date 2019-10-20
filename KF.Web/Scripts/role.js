/// <reference path="jquery-1.12.4.js" />
/// <reference path="common.js" />

function role() {
    this.roleId = 0;
    this.roleName = "";
}

role.prototype.validate = function () {
    if (this.roleName == "") {
        $.showErrorMessage("角色名称不能为空");
        return false;
    }
    return true;
}

role.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/roleService",
        data: {
            roleId: _self.roleId,
            option:"getone"
        },
        success: function (ret) {
            _self.roleId = ret.RoleId;
            _self.roleName = ret.RoleName;
            _self.afterLoad();
        }
    });
}

role.prototype.afterLoad = function () {

}

role.prototype.isNew = function () {
    return this.roleId == 0;
}

role.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/roleService",
        data: {
            roleName: _self.roleName,
            option:"add"
        },
        success: function (ret) {

            _self.afterAdd();
        }
    });
}

role.prototype.afterAdd = function () {

}

role.prototype.update = function () {
    var _self = this;
    $.ajax({
        url: "/roleService",
        data: {
            roleId: _self.roleId,
            roleName: _self.roleName,
            option:"update"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}

role.prototype.afterUpdate = function () {

}

role.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/roleService",
        data: {
            roleId: _self.roleId,
            option:"delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

role.prototype.afterDelete = function () {

}

role.prototype.listItemUI = function (userId) {
     var _self = this;
    var fragment = document.createDocumentFragment();
    
    var div_form_item = document.createElement("div");
    $(div_form_item).addClass("ui-form-item ui-form-switch ui-border-tb");
    fragment.appendChild(div_form_item);

    var p = document.createElement("p");
    $(p).text(_self.roleName);
    div_form_item.appendChild(p);

    var label_checkbox = document.createElement("label");
    $(label_checkbox).addClass("ui-switch");
    div_form_item.appendChild(label_checkbox);

    var input = document.createElement("input");
    $(input).attr("type", "checkbox").click(function (e) {
        var target = e.target;
        var _userRole = new userRole();
        _userRole.roleId = _self.roleId;
        _userRole.userId = userId;
        if (target.checked) {
            _userRole.add();
        } else {
            _userRole.delete();
        }
    });
    input.checked = _self.selected;
   
    label_checkbox.appendChild(input);

    return fragment;
}

role.prototype.listItemUI1 = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var li = document.createElement("li");
    fragment.appendChild(li);

    var div_list_info = document.createElement("div");
    $(div_list_info).addClass("ui-list-info");
    li.appendChild(div_list_info);

    var p = document.createElement("p");
    $(p).text(_self.roleName);
    div_list_info.appendChild(p);

    var p_operation = document.createElement("p");
    $(p_operation).addClass("ui-label-list");
    div_list_info.appendChild(p_operation);

    var label_detail = document.createElement("label");
    $(label_detail).addClass("ui-label-s").text("详细").click(function () {
        window.location.href = "/home/role/detail.html?roleId=" + _self.roleId;
    });
    p_operation.appendChild(label_detail);

    var label_delete = document.createElement("label");
    $(label_delete).addClass("ui-label-s").text("删除").click(function () {
        _self.delete();
    });
    p_operation.appendChild(label_delete);

    var label_assignAuth = document.createElement("label");
    $(label_assignAuth).addClass("ui-label-s").text("设置权限").click(function () {
        window.location.href = "/home/role/assignAuth.html?roleId=" + _self.roleId;
    });
    p_operation.appendChild(label_assignAuth);

    return fragment;
}

role.prototype.detailUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    var div_form_item_roleName = document.createElement("div");
    $(div_form_item_roleName).addClass("ui-form-item");
    fragment.appendChild(div_form_item_roleName);

    var label_roleName = document.createElement("label");
    $(label_roleName).text("角色名");
    div_form_item_roleName.appendChild(label_roleName);

    var input_roleName = document.createElement("input");
    $(input_roleName).val(_self.roleName).blur(function () {
        _self.roleName = $(this).val();
    });
    div_form_item_roleName.appendChild(input_roleName);

    var i_roleName_close = document.createElement("i");
    $(i_roleName_close).addClass("ui-icon-close").click(function () {
        _self.roleName = "";
        $(input_roleName).val("");
    });
    div_form_item_roleName.appendChild(i_roleName_close);

    return fragment;
}

function roles() {
    entities.call(this);
}

$.extend(roles.prototype, entities.prototype);

roles.prototype.load = function () {
    var _self = this;
   return $.ajax({
        url: "/roleService",
        data:{
            option:"getlist"
        },
        success: function (ret) {
            $.each(ret, function (i,item) {
                var _role = new role();
                _role.roleId = item.RoleId;
                _role.roleName = item.RoleName;
                _self.add(_role.roleId,_role);
            });
            _self.afterLoad();
        }
    });
}

roles.prototype.afterLoad = function(){}
