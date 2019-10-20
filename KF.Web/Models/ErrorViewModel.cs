using System;
using Newtonsoft.Json;

namespace KF.Web.Models
{
    public class ErrorViewModel
    {
        public string ErrorMessage { get; set; }

        public string Serialize()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}