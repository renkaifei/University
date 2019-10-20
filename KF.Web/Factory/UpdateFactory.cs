using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Interface;
using KF.Web.Service;

namespace KF.Web.Factory
{
    public class UpdateFactory
    {
        private HttpContext Context;
        public UpdateFactory(HttpContext context)
        {
            Context = context;
        }

        public IUpdateBehavior Create()
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
                case "enrollmentPlan":
                    return new EnrollmentPlanService(Context);
                case "article":
                    return new ArticleService(Context);
                case "scholarship":
                    return new ScholarShipService(Context);
                case "user":
                    return new UserService(Context);
                case "role":
                    return new RoleService(Context);
                default:
                    throw new ArgumentException("服务不存在");
            }
        }
    }
}