using System;
using KF.Repo.Domain;
using KF.Repo.Entities;
using System.Web;
using KF.Web.Interface;
namespace KF.Web.Service
{
    public class CourseService:BaseService,IGetOneBehavior,IAddBehavior,IUpdateBehavior,IDeleteBehavior
    {
        public CourseService(HttpContext context):base(context)
        {
            
        }

        public void Add()
        {
            Course course = new Course();
            course.CourseName = GetParameterFromRequest("courseName");
            course.CoursePeriod = int.Parse(GetParameterFromRequest("coursePeriod"));
            course.UniversityId = int.Parse(GetParameterFromRequest("universityId"));
            course.CourseType = (CourseType)int.Parse(GetParameterFromRequest("courseType"));
            CourseDomain domain = new CourseDomain(course);
            if (domain.Add())
            {
                Response(course.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Update()
        {
            Course course = new Course();
            course.CourseId = int.Parse(GetParameterFromRequest("courseId"));
            course.CourseName = GetParameterFromRequest("courseName");
            course.CoursePeriod = int.Parse(GetParameterFromRequest("coursePeriod"));
            course.CourseType = (CourseType)int.Parse(GetParameterFromRequest("courseType"));
            CourseDomain domain = new CourseDomain(course);
            if (domain.Update())
            {
                Response(course.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void GetOne()
        {
            Course course = new Course();
            course.CourseId = int.Parse(GetParameterFromRequest("courseId"));
            CourseDomain domain = new CourseDomain(course);
            if (domain.GetOne())
            {
                Response(course.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            Course course = new Course();
            course.CourseId = int.Parse(GetParameterFromRequest("courseId"));
            CourseDomain domain = new CourseDomain(course);
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