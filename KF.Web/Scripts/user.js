/// <reference path="jquery-1.12.4.js" />
/// <reference path="handlebars.js" />
/// <reference path="common.js" />

function user() {
    this.userId = 0;
    this.userName = "";
    this.loginName = "";
    this.pwd = "";
};

user.prototype.isNew = function () {
    return this.userId == 0;
}

user.prototype.validate = function () {
    if (this.userName == "") {
        $.showErrorMessage("用户名不能为空");
        return false;
    }
    if (this.loginName == "") {
        $.showErrorMessage("登陆名不能为空");
        return false;
    }
    return true;
}

user.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/userService",
        data: {
            userId:_self.userId,
            option:"getone"
        },
        success: function (ret) {
            _self.userId = ret.UserId;
            _self.userName = ret.UserName;
            _self.loginName = ret.LoginName;
            _self.afterLoad();
        }
    });
}

user.prototype.afterLoad = function () {

}

user.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/userService",
        data:{
            userName: _self.userName,
            loginName: _self.loginName,
            pwd: _self.pwd,
            option:"add"
        },
        success: function (ret) {
            _self.userId = ret.UserId;
            _self.afterAdd();
        }
    });
}

user.prototype.afterAdd = function () {
    
}

user.prototype.update = function () {
    var _self = this;
    $.ajax({
        url: "/userService",
        data: {
            userId: _self.userId,
            userName: _self.userName,
            loginName: _self.loginName,
            pwd: _self.pwd,
            option:"update"
        },
        success: function (ret) {
            _self.afterUpdate();
        }
    });
}

user.prototype.afterUpdate = function () {

}

user.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/userService",
        data: {
            userId: _self.userId,
            option: "delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

user.prototype.afterDelete = function () {
}

user.prototype.login = function () {
    var _self = this;
    $.ajax({
        url: "/loginService",
        data: {
            loginName: _self.loginName,
            pwd: _self.pwd,
            option:"login"
        },
        success: function () {
            _self.afterLogin();
        }
    });
}

user.prototype.afterLogin = function () { }

user.prototype.listItemUI = function () {
    var _self = this;

    var li = liUI();

    var div_list_info = list_infoUI();
    li.appendChild(div_list_info);

    var p_loginName = pUI({ text:_self.loginName });
    div_list_info.appendChild(p_loginName);

    var div_operation = operationUI({
        detail: {
            text: "详细",
            click: function () {
                window.location.href = "/home/user/detail.html?userId=" + _self.userId;
            }
        },
        del: {
            text: "删除",
            click: function () {
                _self.delete();
            }
        },
        assignRole: {
            text: "设置角色",
            click: function () {
                window.location.href = "/home/user/assignRoles.html?userId=" + _self.userId;
            }
        }
    });
    div_list_info.appendChild(div_operation);

    return li;
}

user.prototype.detailUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();

    fragment.appendChild(formItem_text({ label: "用户名", value: _self, fieldName: "userName" }));
    fragment.appendChild(formItem_text({ label: "登陆名", value: _self, fieldName: "loginName" }));
    fragment.appendChild(formItem_text({ label: "密码", value: _self, fieldName: "pwd" }));
    return fragment;
}

function users() {
    entitiesPage.call(this);
}

$.extend(users.prototype, entitiesPage.prototype);


users.prototype.load = function () {
    var _self = this;
    $.ajax({
        url: "/userService",
        data: {
            pageIndex: _self.filter.pageIndex,
            pageSize: _self.filter.pageSize,
            option: "getlist"
        },
        success: function (ret) {
            _self.clear();
            _self.totalCount = ret.TotalCount;
            $.each(ret.Values, function (i, item) {
                var _user = new user();
                _user.userId = item.UserId;
                _user.userName = item.UserName;
                _user.loginName = item.LoginName;
                _self.add(_user.userId,_user);
            });
            _self.afterLoad();
        }
    });
};

users.prototype.afterLoad = function () {

};

users.prototype.listUI = function () {
    var _self = this;
    var fragment = document.createDocumentFragment();
    $.each(_self.values, function (i,item) {
        fragment.appendChild(item.listItemUI());
    });
    return fragment;
}

