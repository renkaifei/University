using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class HoursePrice:Entity
    {
        public int HoursePriceId { get; set; }
        public int AreaId { get; set; }
        public int Price { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("hoursePriceId")) HoursePriceId = int.Parse(filter["hoursePriceId"]);
            if (filter.ContainsKey("areaId")) AreaId = int.Parse(filter["areaId"]);
            if (filter.ContainsKey("price")) Price = int.Parse(filter["price"]);
            if (filter.ContainsKey("year")) Year = int.Parse(filter["year"]);
            if (filter.ContainsKey("month")) Month = int.Parse(filter["month"]);
        }
    }
}
