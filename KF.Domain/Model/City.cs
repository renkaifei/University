using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using KF.Domain.Interface;
using System.Collections.Specialized;

namespace KF.Domain.Model
{
    /// <summary>
    /// 城市
    /// </summary>
    public class City:Entity
    {
        /// <summary>
        /// 城市ID
        /// </summary>
        public int CityId { get; set; }
        /// <summary>
        /// 城市名称
        /// </summary>
        public string CityName { get; set; }
        /// <summary>
        /// 省份ID
        /// </summary>
        public int ProvinceId { get; set; }

        public override void Initialize(Dictionary<string,string> filter)
        {
            
        }
    }
}
