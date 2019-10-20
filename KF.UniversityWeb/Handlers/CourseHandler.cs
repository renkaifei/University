using KF.Repo;
using KF.Repo.Entities;
using KF.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.UniversityWeb.Handlers
{
    public class CourseHandler:IHttpHandler 
    {
        private ContextHelper Helper { get; set; }

        public void CustomProcessRequest(HttpContext context)
        {
            Helper = new ContextHelper(context);

            string option = Helper.GetParameterFromRequest("option");
            if (option == "getlist")
            {
                GetList();
            }
            else if (option == "getone")
            {
                GetOne();
            }
        }

        private void GetList()
        {
            Courses courses = new Courses();
            CoursesRepo Repo = new CoursesRepo(courses);
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            if (Repo.Query(universityId))
            {
                Helper.Response(courses.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            Course course = new Course();
            course.CourseId = int.Parse(Helper.GetParameterFromRequest("courseId"));
            CourseRepo Repo = new CourseRepo(course);
            if (Repo.Query())
            {
                Helper.Response(course.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}