using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace KF.Domain.Model
{
    public class Recurit:Entity
    {
        public int RecuritId { get; set; }
        public int CompanyId { get; set; }
        public int Year { get; set; }
        public int MajorId { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("recuritId")) RecuritId = int.Parse(filter["recuritId"]);
            if (filter.ContainsKey("companyId")) CompanyId = int.Parse(filter["companyId"]);
            if (filter.ContainsKey("year")) Year = int.Parse(filter["year"]);
            if (filter.ContainsKey("majorId")) MajorId = int.Parse(filter["majorId"]);
        }
    }
}
