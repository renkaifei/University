using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class EntityFactory
    {
        public Entity Create(string type)
        {
            if (type == "province")
            {
                return new Province();
            }
            else if (type == "city")
            {
                return new City();
            }
            else if (type == "university")
            {
                return new University();
            }
            else if (type == "major")
            {
                return new Major();
            }
            else if (type == "course")
            {
                return new Course();
            }
            else if (type == "enrollmentplan")
            {
                return new EnrollmentPlan();
            }
            else if (type == "majorcourse")
            {
                return new MajorCourse();
            }
            else if (type == "user")
            {
                return new User();
            }
            else if (type == "scholarship")
            {
                return new ScholarShip();
            }
            else if (type == "company")
            {
                return new Company();
            }
            else if (type == "recurit")
            {
                return new Recurit();
            }
            else
            {
                throw new ArgumentException("unexpected type:" + type);
            }
        }
    }
}
