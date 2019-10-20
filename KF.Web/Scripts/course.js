/// <reference path="common.js" />
function course() {
    this.courseId = 0;
    this.courseName = "";
    this.courseType = 0;
    this.selected = false;
}

course.prototype.isNew = function () {
    return this.courseId == 0;
}

course.prototype.validate = function () {
    if (this.courseName == "") {
        $.showErrorMessage("课程名称不能为空");
        return false;
    }
    return true;
}

course.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/courseService",
        data: {
            courseName: _self.courseName,
            courseType: _self.courseType,
            option: "add"
        },
        success: function (ret) {
            _self.courseId = ret.CourseId;
            _self.courseName = ret.CourseName;
            _self.courseType = ret.CourseType;
            _self.afterAdd()
        }
    });
}

course.prototype.afterAdd = function () {

}

course.prototype.update = function () {
    var _self = this;
    $.ajax({
        url: "/courseService",
        data: {
            courseId: _self.courseId,
            courseName: _self.courseName,
            courseType: _self.courseType,
            option: "update"
        },
        success: function (ret) {
            _self.courseId = ret.CourseId;
            _self.courseName = ret.CourseName;
            _self.courseType = ret.CourseType;
            _self.afterUpdate();
        }
    });
}

course.prototype.afterUpdate = function () {

}

course.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/courseService",
        data: {
            courseId: _self.courseId,
            option: "getone"
        },
        success: function (ret) {
            _self.courseId = ret.CourseId;
            _self.courseName = ret.CourseName;
            _self.courseType = ret.CourseType;
            _self.afterLoad();
        }
    });
}

course.prototype.afterLoad = function () {

}

course.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/courseService",
        data: {
            courseId: _self.courseId,
            option: "delete"
        },
        success: function (ret) {
            _self.afterDelete();
        }
    });
}

course.prototype.afterDelete = function () {

}

course.prototype.assignToMajor = function (majorId) {
    var _self = this;
    var _majorCourse = new majorCourse();
    _majorCourse.majorId = majorId;
    _majorCourse.courseId = _self.courseId;
    _majorCourse.add();
}

course.prototype.cancelToMajor = function (majorId) {
    var _self = this;
    var _majorCourse = new majorCourse();
    _majorCourse.majorId = majorId;
    _majorCourse.courseId = _self.courseId;
    _majorCourse.delete();
}

course.prototype.assignCourseUI = function (majorId) {
    var _self = this;
    var fragment = document.createDocumentFragment();

    fragment.appendChild(formItem_Checkbox({
        label:  _self.courseName,
        labelClick:function(){
            window.location.href = "/home/province/city/university/course/detail.html?courseId=" + _self.courseId;
        },
        selected: _self.selected,
        click: function (e) {
            var target = e.target;
            if (target.checked) {
                _self.assignToMajor(majorId);
            } else {
                _self.cancelToMajor(majorId);
            }
        }
    }));
    return fragment;
}

function courses() {
    kf.util.entities.call(this);
}

$.extend(courses.prototype, kf.util.entities.prototype);

courses.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/courseService",
        data: {
            option: "getlist"
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i, item) {
                var _course = new course();
                _course.courseId = item.CourseId;
                _course.courseName = item.CourseName;
                _self.add(_course.courseId,_course);
            });
            _self.afterLoad();
        }
    });
}

courses.prototype.afterLoad = function () {

}

function majorCourse() {
    this.majorCourseId = 0;
    this.majorId = 0;
    this.courseId = 0;
}

majorCourse.prototype.add = function () {
    var _self = this;
    $.ajax({
        url: "/majorCourseService",
        data: {
            majorId: _self.majorId,
            courseId: _self.courseId,
            option:"add"
        },
        success: function (ret) {
            _self.majorCourseId = ret.MajorCourseId;
            _self.afterAdd();
        }
    });
}

majorCourse.prototype.afterAdd = function () {

}

majorCourse.prototype.delete = function () {
    var _self = this;
    $.ajax({
        url: "/majorCourseService",
        data:{
            majorId: _self.majorId,
            courseId: _self.courseId,
            option:"delete"
        },
        success: function () {
            _self.afterDelete();
        }
    });
}

majorCourse.prototype.afterDelete = function(){
    
}

function majorCourses() {
    kf.util.entities.call(this);
}

$.extend(majorCourses.prototype, kf.util.entities.prototype);

majorCourses.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/majorCourseService",
        data: {
            majorId: _self.filter.majorId,
            courseId: _self.filter.courseId,
            option:"getlist"
        },
        success: function (ret) {
            _self.values = {};
            $.each(ret, function (i, item) {
                var _majorCourse = new majorCourse();
                _majorCourse.majorCourseId = item.MajorCourseId;
                _majorCourse.majorId = item.MajorId;
                _majorCourse.courseId = item.CourseId;
                _self.add(_majorCourse.majorCourseId,_majorCourse);
            });
            _self.afterLoad();
        }
    });
}

majorCourses.prototype.afterLoad = function () {

}


