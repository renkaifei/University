using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    /// <summary>
    /// 区
    /// </summary>
    public class Area:Entity
    {
        /// <summary>
        /// 区ID
        /// </summary>
        public int AreaId { get; set; }
        /// <summary>
        /// 区名称
        /// </summary>
        public string AreaName { get; set; }
        /// <summary>
        /// 城市ID
        /// </summary>
        public int CityId { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            
        }
    }
}
