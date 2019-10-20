using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    /// <summary>
    /// 课程类型
    /// </summary>
    public enum CourseType
    {
        Basic = 1, //基础课程
        Profession //专业课程
    }

    /// <summary>
    /// 课程
    /// </summary>
    public class Course:Entity
    {
        /// <summary>
        /// 课程ID
        /// </summary>
        public int CourseId { get; set; }
        /// <summary>
        /// 课程名称
        /// </summary>
        public string CourseName { get; set; }
        /// <summary>
        /// 课程类型 1 基础课 2 专业课
        /// </summary>
        public CourseType CourseType { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if(filter.ContainsKey("courseId")) CourseId = int.Parse(filter["courseId"]);
            if(filter.ContainsKey("courseName")) CourseName = filter["courseName"];
            if(filter.ContainsKey("courseType")) CourseType = (CourseType)int.Parse(filter["courseType"]);
        }
    }
}
