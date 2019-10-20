using KF.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    /// <summary>
    /// 省份
    /// </summary>
    public class Province:Entity
    {
        /// <summary>
        /// 省份ID
        /// </summary>
        public int ProvinceId { get; set; }
        /// <summary>
        /// 省份名称
        /// </summary>
        public string ProvinceName { get; set; }

        public override void Initialize(Dictionary<string,string> filter)
        {
            
        }
    }
}
