/// <reference path="jquery-1.12.4.js" />
/// <reference path="handlebars.js" />
/// <reference path="common.js" />

function user() {
    this.userId = 0;
    this.userName = "";
    this.loginName = "";
    this.pwd = "";

    this.loadObservers = [];
    this.createObservers = [];
    this.updateObservers = [];
    this.deleteObservers = [];
    this.loginObservers = [];
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
    $.ajax({
        url: "/userService",
        data: {
            userId:this.userId,
            option:"getone"
        },
        success:$.proxy(function (ret) {
            this.userId = ret.UserId;
            this.userName = ret.UserName;
            this.loginName = ret.LoginName;
           
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        },this)
    });
}

user.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

user.prototype.add = function () {
    $.ajax({
        url: "/userService",
        data:{
            userName: this.userName,
            loginName: this.loginName,
            pwd: this.pwd,
            option:"add"
        },
        success: $.proxy(function (ret) {
            this.userId = ret.UserId;
            var count = this.createObservers.length;
            for (var i = 0; i < count; i++) {
                this.createObservers[i](this);
            }
        },this)
    });
}

user.prototype.addCreateObserver = function (observer) {
    this.createObservers.push(observer);
}

user.prototype.update = function () {
    $.ajax({
        url: "/userService",
        data: {
            userId: _self.userId,
            userName: _self.userName,
            loginName: _self.loginName,
            pwd: _self.pwd,
            option:"update"
        },
        success: $.proxy(function (ret) {
            this.userId = ret.UserId;
            var count = this.updateObservers.length;
            for (var i = 0; i < count; i++) {
                this.updateObservers[i](this);
            }
        },this)
    });
}

user.prototype.addUpdateObserver = function (observer) {
    this.updateObservers.push(observer);
}

user.prototype.delete = function () {
    $.ajax({
        url: "/userService",
        data: {
            userId: this.userId,
            option: "delete"
        },
        success:$.proxy(function (ret) {
            var count = this.deleteObservers.length;
            for (var i = 0; i < count; i++) {
                this.deleteObservers[i](this);
            }
        },this)
    });
}

user.prototype.addDeleteObserver = function (observer) {
    this.deleteObservers.push(observer);
}

user.prototype.login = function () {
    $.ajax({
        url: "/loginService",
        data: {
            loginName: this.loginName,
            pwd: this.pwd,
            option:"login"
        },
        success:$.proxy(function () {
            var count = this.loginObservers.length;
            for (var i = 0; i < count; i++) {
                this.loginObservers[i](this);
            }
        },this)
    });
}

user.prototype.addLoginObserver = function (observer) {
    this.loginObservers.push(observer);
}

function users() {
    kf.util.entitiesPage.call(this);
    this.loadObservers = [];
}

$.extend(users.prototype, kf.util.entitiesPage.prototype);


users.prototype.load = function () {
    $.ajax({
        url: "/userService",
        data: {
            pageIndex: this.filter.pageIndex,
            pageSize: this.filter.pageSize,
            option: "getlist"
        },
        success: $.proxy(function (ret) {
            var _self = this;
            $.each(ret, function (i, item) {
                var _user = new user();
                _user.userId = item.UserId;
                _user.userName = item.UserName;
                _user.loginName = item.LoginName;
                _self.add(_user.userId, _user);
            });
           
            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        },this)
    });
};

users.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}

