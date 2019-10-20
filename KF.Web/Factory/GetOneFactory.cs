using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Service;

namespace KF.Web.Factory
{
    public class GetOneFactory
    {
        private HttpContext Context { get; set; }

        public GetOneFactory(HttpContext context)
        {
            Context = context;
        }

        public IGetOneBehavior Create()
        {
            string service = Context.Request.Form["service"].ToLower();
            switch (service)
            { 
                case "province":
                    return new ProvinceService(Context);
                case "city":
                    return new CityService(Context);
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
                case "enrollmentplanscondition":
                    return new EnrollmentPlansService(Context);
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