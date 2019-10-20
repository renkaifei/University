using KF.Domain.Interface;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class University:Entity
    {
        public int UniversityId { get; set; }
        public string UniversityName { get; set; }
        public string UniversityAddress { get; set; }
        public string UniversityAbstract { get; set; }
        public string UniversityIcon { get; set; }
        public int CityId { get; set; }
        public int Undergraduate { get; set; }
        public int Postgraduate { get; set; }
        public int OverseasStudent { get; set; }
        public int Is211 { get; set; }
        public int Is985 { get; set; }
        public int IsDoubleClass { get; set; }

        public override void Initialize(Dictionary<string,string> filter)
        {
            if (filter.ContainsKey("universityId")) this.UniversityId = int.Parse(filter["universityId"]);
            if (filter.ContainsKey("universityName")) this.UniversityName = filter["universityName"];
            if (filter.ContainsKey("universityAbstract")) this.UniversityAbstract = filter["universityAbstract"];
            if (filter.ContainsKey("universityIcon")) this.UniversityIcon = filter["universityIcon"];
            if (filter.ContainsKey("universityAddress")) this.UniversityAddress = filter["universityAddress"];
            if (filter.ContainsKey("undergraduateTotalNumber")) this.Undergraduate = int.Parse(filter["undergraduateTotalNumber"]);
            if (filter.ContainsKey("postgraduateTotalNumber")) this.Postgraduate = int.Parse(filter["postgraduateTotalNumber"]);
            if (filter.ContainsKey("overseasStudentTotalNumber")) this.OverseasStudent = int.Parse(filter["overseasStudentTotalNumber"]);
            if (filter.ContainsKey("cityId")) this.CityId = int.Parse(filter["cityId"]);
            if (filter.ContainsKey("Is211")) this.Is211 = int.Parse(filter["Is211"]);
            if (filter.ContainsKey("Is985")) this.Is985 = int.Parse(filter["Is985"]);
            if (filter.ContainsKey("IsDoubleClass")) this.IsDoubleClass = int.Parse(filter["IsDoubleClass"]);
        }
    }
}
