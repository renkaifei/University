using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Common;
using System.Collections.Specialized;

namespace KF.Web.Service
{
    public abstract class BaseService
    {
        private ContextHelper ContextHelper { get; set; }
        public BaseService(HttpContext context)
        {
            ContextHelper = new ContextHelper(context);
        }

        public string GetParameterFromRequest(string name)
        {
            return ContextHelper.GetParameterFromRequest(name);
        }

        public NameValueCollection GetAllParameters()
        {
            return ContextHelper.GetFilter();
        }

        protected void Response(string s)
        {
            ContextHelper.Response(s);
        }

        protected void ResponseError(string s)
        {
            ContextHelper.ResponseError(s);
        }
    }
}