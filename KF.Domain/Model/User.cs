using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Model
{
    public class User:Entity
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string LoginName { get; set; }
        public string Pwd { get; set; }
        public string AuthCode { get; set; }

        public override void Initialize(Dictionary<string, string> filter)
        {
            if (filter.ContainsKey("userId")) UserId = int.Parse(filter["userId"]);
            if (filter.ContainsKey("userName")) UserName = filter["userName"];
            if (filter.ContainsKey("loginName")) LoginName = filter["loginName"];
            if (filter.ContainsKey("pwd")) Pwd = filter["pwd"];
            if (filter.ContainsKey("authoCode")) AuthCode = filter["authCode"];
        }
    }
}
