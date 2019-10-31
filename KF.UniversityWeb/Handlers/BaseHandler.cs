using KF.Util;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace KF.UniversityWeb.Handlers
{
    public abstract class BaseHandler:IHttpHandler,IReadOnlySessionState
    {
        protected ContextHelper Helper { get; set; }
        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            Helper = new ContextHelper(context);
            if (context.Session["userId"] == null)
            {
                context.Response.Redirect("/login.html");
            }
            else
            { 
                CustomProcessRequest();
            }
        }

        protected abstract void CustomProcessRequest();
    }
}