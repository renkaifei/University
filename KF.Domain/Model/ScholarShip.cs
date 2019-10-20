using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class ScholarShip:Entity
    {
        public int ScholarShipId { get; set; }
        public string ScholarShipName { get; set; }
        public string ScholarShipAbstract { get; set; }
        public int ScholarShipTotal { get; set; }
        public int UniversityId { get; set; }
        public int StartYear { get; set; }
        public int EndYear { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("scholarShipId")) ScholarShipId = int.Parse(filter["scholarShipId"]);
            if (filter.ContainsKey("scholarShipName")) ScholarShipName = filter["scholarShipName"];
            if (filter.ContainsKey("scholarShipAbstract")) ScholarShipAbstract = filter["scholarShipAbstract"];
            if (filter.ContainsKey("scholarShipTotal")) ScholarShipTotal = int.Parse(filter["scholarShipTotal"]);
            if (filter.ContainsKey("universityId")) UniversityId = int.Parse(filter["universityId"]);
            if (filter.ContainsKey("StartYear")) StartYear = int.Parse(filter["startYear"]);
            if (filter.ContainsKey("endYear")) EndYear = int.Parse(filter["endYear"]);
        }
    }
}
