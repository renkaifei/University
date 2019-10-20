using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace KF.Web.Models
{
    public class StaticsViewModel<T>
    {
        public T Value;
        public int TotalCount = 0;
        public string Serialize()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}