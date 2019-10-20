using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Repo.Entities;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class MajorCoursesService:BaseService,IGetListBehavior
    {
        public MajorCoursesService(HttpContext context)
            :base(context)
        { }

        public void GetList()
        {
            MajorCourses majorCourses = new MajorCourses();
            MajorCoursesDomain domain = new MajorCoursesDomain(majorCourses);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(majorCourses.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}