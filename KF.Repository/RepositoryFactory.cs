using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Interface;

namespace KF.Repository
{
    public class RepositoryFactory
    {
        public IEntityRepository Create(string type)
        {
            if (type == "province")
            {
                return new ProvinceRepository();
            }
            else if (type == "city")
            {
                return new CityRepository();
            }
            else if (type == "university")
            {
                return new UniversityRepository();
            }
            else if (type == "major")
            {
                return new MajorRepository();
            }
            else if (type == "course")
            {
                return new CourseRepository();
            }
            else if (type == "enrollmentplan")
            {
                return new EnrollmentPlanRepository();
            }
            else if (type == "area")
            {
                return new AreaRepository();
            }
            else if (type == "majorcourse")
            {
                return new MajorCourseRepository();
            }
            else if (type == "user")
            {
                return new UserRepository();   
            }
            else if (type == "hourseprice")
            {
                return new HoursePriceRepository();
            }
            else if (type == "role")
            {
                return new RoleRepository();
            }
            else if (type == "scholarship")
            {
                return new ScholarShipRepository();
            }
            else if (type == "company")
            {
                return new CompanyRepository();
            }
            else if (type == "recurit")
            {
                return new RecuritRepository();
            }
            else
            {
                throw new ArgumentException();
            }
        }
    }

    
}
