using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class Role:Entity
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("roleId")) RoleId = int.Parse(filter["roleId"]);
            if (filter.ContainsKey("roleName")) RoleName = filter["roleName"];
        }
    }
}
