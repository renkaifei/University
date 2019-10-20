/// <reference path="common.js" />
function course() {
    this.courseId = 0;
    this.courseName = "";
    this.coursePeriod = 0;
    this.courseType = 0;
    this.universityId = 0;
    this.selected = false;
}

function courses() {
    entities.call(this);
}

$.extend(courses.prototype, entities.prototype);

courses.prototype.load = function () {
    var _self = this;
    return $.ajax({
        url: "/anonymousGetListService",
        data: {
            service: "course",
            universityId: _self.filter.majorId
        },
        success: function (ret) {
            _self.clear();
            $.each(ret, function (i, item) {
                var _course = new course();
                _course.courseId = item.CourseId;
                _course.courseName = item.CourseName;
                _course.coursePeriod = item.CoursePeriod;
                _course.majorId = item.MajorId;
                _self.add(_course.courseId, _course);
            });
            _self.afterLoad();
        }
    });
}

courses.prototype.afterLoad = function () {

}