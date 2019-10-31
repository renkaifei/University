function user() {
    this.userId = 0;
    this.userName = "";
    this.loginName = "";
    this.pwd = "";

    this.loadObservers = [];
};

user.prototype.validate = function () {
    if (this.loginName == "") {
        $.showErrorMessage("登陆名不能为空");
        return false;
    }
    return true;
}

user.prototype.login = function () {
    $.ajax({
        url: "/userService",
        data: {
            loginName: this.loginName,
            pwd:this.pwd,
            option: "login"
        },
        success: $.proxy(function (ret) {
            this.userId = ret.UserId;
            this.userName = ret.UserName;
            this.loginName = ret.LoginName;

            var count = this.loadObservers.length;
            for (var i = 0; i < count; i++) {
                this.loadObservers[i](this);
            }
        }, this)
    });
}

user.prototype.addLoadObserver = function (observer) {
    this.loadObservers.push(observer);
}