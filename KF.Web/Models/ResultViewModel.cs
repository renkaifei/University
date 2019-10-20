using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace KF.Web.Models
{
    public class ResultViewModel<T>
    {
        public string ErrorMessage = "";
        public T Value { get; set; }

        public string Serialize()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}