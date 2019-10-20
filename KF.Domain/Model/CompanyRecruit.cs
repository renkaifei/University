using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class CompanyRecruit:Entity
    {
        public int RecruitId { get; set; }
        public int CompanyId { get; set; }
        public int UniversityId { get; set; }
        public int Year { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey(filter["recruitId"])) RecruitId = int.Parse(filter["recruitId"]);
            if (filter.ContainsKey(filter["companyId"])) CompanyId = int.Parse(filter["companyId"]);
            if (filter.ContainsKey(filter["universityId"])) UniversityId = int.Parse(filter["universityId"]);
            if (filter.ContainsKey(filter["year"])) Year = int.Parse(filter["year"]);
        }
    }
}
