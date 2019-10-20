using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class Company:Entity
    {
        public int CompanyId { get; set; }
        public string CompanyName { get; set; }
        public string CompanyAddress { get; set; }
        public int CityId { get; set; }
        public string CompanyAbstract { get; set; }
        public int CompanyOrd { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("companyId")) CompanyId = int.Parse(filter["companyId"]);
            if (filter.ContainsKey("companyName")) CompanyName = filter["companyName"];
            if (filter.ContainsKey("companyAddress")) CompanyAddress = filter["companyAddress"];
            if (filter.ContainsKey("cityId")) CityId = int.Parse(filter["cityId"]);
            if (filter.ContainsKey("companyAbstract")) CompanyAbstract = filter["companyAbstract"];
            if (filter.ContainsKey("companyOrd")) CompanyOrd = int.Parse(filter["companyOrd"]);

        }
    }


}
