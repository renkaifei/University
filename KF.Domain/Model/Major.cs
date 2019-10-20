using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    /// <summary>
    /// 专业
    /// </summary>
    public class Major:Entity
    {
        /// <summary>
        /// 专业ID
        /// </summary>
        public int MajorId { get; set; }
        /// <summary>
        /// 专业名
        /// </summary>
        public string MajorName { get; set; }
        /// <summary>
        /// 层次：1 专科，2 本科
        /// </summary>
        public int Degree { get; set; }
        /// <summary>
        /// 国标代码
        /// </summary>
        public string Code { get; set; }
        /// <summary>
        /// 学制 1 三年 2 四年 3 五年,4 5+3 医
        /// </summary>
        public int EducationalSystem { get; set; }
        /// <summary>
        /// 地址
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// 高校ID
        /// </summary>
        public int UniversityId { get; set; }
        /// <summary>
        /// 高校名称
        /// </summary>
        public string UniversityName { get; set; }
        /// <summary>
        /// 省级特色
        /// </summary>
        public int IsProvinceFeature { get; set; }
        /// <summary>
        /// 国家特色
        /// </summary>
        public int IsCountryFeature { get; set; }
        /// <summary>
        /// 专业介绍
        /// </summary>
        public string MajorIntroduction { get; set; }

        public Major()
        {
            MajorId = 0;
            MajorName = "";
            Degree = 0;
            Code = "";
            EducationalSystem = 0;
            Address = "";
            UniversityId = 0;
            UniversityName = "";
            IsProvinceFeature = 0;
            IsCountryFeature = 0;
            MajorIntroduction = "";
        }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("majorId")) MajorId = int.Parse(filter["majorId"]);
            if (filter.ContainsKey("majorName")) MajorName = filter["majorName"];
            if (filter.ContainsKey("degree")) Degree = int.Parse(filter["degree"]);
            if (filter.ContainsKey("code")) Code = filter["code"];
            if (filter.ContainsKey("educationalSystem")) EducationalSystem = int.Parse(filter["educationalSystem"]);
            if (filter.ContainsKey("universityId")) UniversityId = int.Parse(filter["universityId"]);
            if (filter.ContainsKey("isProvinceFeature")) IsProvinceFeature = int.Parse(filter["isProvinceFeature"]);
            if (filter.ContainsKey("isCountryFeature")) IsCountryFeature = int.Parse(filter["isCountryFeature"]);
            if (filter.ContainsKey("majorIntroduction")) MajorIntroduction = filter["majorIntroduction"];
        }
    }
}
