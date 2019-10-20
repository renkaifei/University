using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Service;

namespace KF.Web.Factory
{
    public class GetListFactory
    {
        private HttpContext Context;
        public GetListFactory(HttpContext context)
        {
            Context = context;
        }

        public IGetListBehavior Create()
        {
            string service = Context.Request.Form["service"].ToLower();
            switch (service)
            { 
                case "province":
                    return new ProvincesService(Context);
                case "city":
                    return new CitysService(Context);
                case "university":
                    return new UniversitysService(Context);
                case "major":
                    return new MajorsService(Context);
                case "area":
                    return new AreasService(Context);
                case "hourseprice":
                    return new HoursePricesService(Context);
                case "course":
                    return new CoursesService(Context);
                case "enrollmentplan":
                    return new EnrollmentPlansService(Context);
                case "article":
                    return new ArticlesService(Context);
                case "scholarship":
                    return new ScholarShipsService(Context);
                case "category":
                    return new CategorysService(Context);
                case "user":
                    return new UsersService(Context);
                case "role":
                    return new RolesService(Context);
                case "userrole":
                    return new UserRolesService(Context);
                case "permission":
                    return new PermissionsService(Context);
                case "resource":
                    return new ResourcesService(Context);
                case "majorcourse":
                    return new MajorCoursesService(Context);
                default:
                    throw new ArgumentException("服务不存在");
            }
        }
    }
}