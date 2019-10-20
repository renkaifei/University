using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class MajorCourse:Entity
    {
        public int MajorCourseId { get; set; }
        public int MajorId { get; set; }
        public int CourseId { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("majorCourseId")) MajorCourseId = int.Parse(filter["majorCourseId"]);
            if (filter.ContainsKey("majorId")) MajorId = int.Parse(filter["majorId"]);
            if (filter.ContainsKey("courseId")) CourseId = int.Parse(filter["courseId"]);
        }
    }
}
