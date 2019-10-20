using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Repo.Entities;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class MajorCourseService:BaseService,IAddBehavior,IDeleteBehavior
    {
        public MajorCourseService(HttpContext context)
            :base(context)
        { }

        public void Add()
        {
            MajorCourse majorCourse = new MajorCourse();
            majorCourse.MajorId = int.Parse(GetParameterFromRequest("majorId"));
            majorCourse.CourseId = int.Parse(GetParameterFromRequest("courseId"));
            MajorCourseDomain domain = new MajorCourseDomain(majorCourse);
            if (domain.Add())
            {
                Response(majorCourse.Serialize());
            }
        }

        public void Delete()
        {
            MajorCourse majorCourse = new MajorCourse();
            majorCourse.MajorId = int.Parse(GetParameterFromRequest("majorId"));
            majorCourse.CourseId = int.Parse(GetParameterFromRequest("courseId"));
            MajorCourseDomain domain = new MajorCourseDomain(majorCourse);
            if (domain.Delete())
            {
                Response("1");
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}