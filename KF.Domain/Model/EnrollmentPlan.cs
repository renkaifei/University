using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class EnrollmentPlan:Entity
    {
        /// <summary>
        /// 招生计划ID
        /// </summary>
        public int EnrollmentPlanId { get; set; }
        /// <summary>
        /// 年份
        /// </summary>
        public int Year { get; set; }
        /// <summary>
        /// 高校ID
        /// </summary>
        public int UniversityId { get; set; }
        /// <summary>
        /// 招生人数
        /// </summary>
        public int PlanNumber { get; set; }
        /// <summary>
        /// 省份ID
        /// </summary>
        public int ProvinceId { get; set; }
        /// <summary>
        // 科类 1 艺术（文）,2 艺术（理）,3 体育（文）,4 体育（理）,5 理工，6 文史
        /// </summary>
        public int Discipline { get; set; }
        /// <summary>
        ///学费
        /// </summary>
        public int Tuition { get; set; }
        /// <summary>
        /// 专业名称,这里的内容跟专业中的名称不一样
        /// </summary>
        public string MajorName { get; set; }
        /// <summary>
        /// 专业编码
        /// </summary>
        public string MajorCode { get; set; }
        /// <summary>
        /// 计划类型 0:普通类招生计划,1 提前批艺术类招生计划，2 提前批体育类招生计划
        /// 3 提前批普通类招生计划，4 提前批国家专项计划，5 特殊类型批-高校专项计划
        /// 6 特殊类型批-自主招生计划，7 地方专项计划
        /// </summary>
        public int PlanType { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("enrollmentPlanId")) EnrollmentPlanId = int.Parse(filter["enrollmentPlanId"]);
            if (filter.ContainsKey("year")) Year = int.Parse(filter["year"]);
            if (filter.ContainsKey("universityId")) UniversityId = int.Parse(filter["universityId"]);
            if (filter.ContainsKey("planNumber")) PlanNumber = int.Parse(filter["planNumber"]);
            if (filter.ContainsKey("provinceId")) ProvinceId = int.Parse(filter["provinceId"]);
            if (filter.ContainsKey("discipline")) Discipline = int.Parse(filter["discipline"]);
            if (filter.ContainsKey("tuition")) Tuition = int.Parse(filter["tuition"]);
            if (filter.ContainsKey("majorName")) MajorName = filter["majorName"];
            if (filter.ContainsKey("majorCode")) MajorCode = filter["majorCode"];
            if (filter.ContainsKey("planType")) PlanType = int.Parse(filter["planType"]);
        }
    }
}
