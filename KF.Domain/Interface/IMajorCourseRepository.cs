using KF.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Interface
{
    public interface IMajorCourseRepository
    {
        Entities GetList(int majorId);
        int Delete(int majorId, int courseId);
        int CourseAssignToMajorCount(int courseId);
        int CourseInMajorCount(int majorId);
    }
}
