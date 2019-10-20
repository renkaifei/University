using System;
using System.Web;
using KF.Repo.Entities;
using KF.Repo.Domain;
using KF.Web.Interface;

namespace KF.Web.Service
{
    public class CoursesService:BaseService,IGetListBehavior
    {
        public CoursesService(HttpContext context):base(context)
        { }

        public void GetList()
        {
            Courses courses = new Courses();
            CoursesDomain domain = new CoursesDomain(courses);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(courses.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}