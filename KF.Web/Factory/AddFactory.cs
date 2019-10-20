using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Interface;
using KF.Web.Service;

namespace KF.Web.Factory
{
    public class AddFactory
    {
        private HttpContext Context { get; set; }
        public AddFactory(HttpContext context)
        {
            Context = context;
        }

        public IAddBehavior Create()
        {
            string service = Context.Request.Form["service"].ToLower();
            switch (service)
            { 
                case "university":
                    return new UniversityService(Context);
                case "major":
                    return new MajorService(Context);
                case "hourseprice":
                    return new HoursePriceService(Context);
                case "course":
                    return new CourseService(Context);
                case "enrollmentplan":
                    return new EnrollmentPlanService(Context);
                case "article":
                    return new ArticleService(Context);
                case "scholarship":
                    return new ScholarShipService(Context);
                case "user":
                    return new UserService(Context);
                case "role":
                    return new RoleService(Context);
                case "userrole":
                    return new UserRoleService(Context);
                case "permission":
                    return new PermissionService(Context);
                case "majorcourse":
                    return new MajorCourseService(Context);
                default:
                    throw new ArgumentException("该服务不存在");
            }
        }
    }
}