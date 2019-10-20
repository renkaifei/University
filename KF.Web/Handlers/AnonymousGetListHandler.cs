using KF.Web.Common;
using KF.Web.Factory;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Handlers
{
    public class AnonymousGetListHandler:IHttpHandler 
    {

        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                GetListFactory factory = new GetListFactory(context);
                IGetListBehavior getlistBehavior = factory.Create();
                getlistBehavior.GetList();
            }
            catch (Exception ex)
            {
                ContextHelper ContextHelper = new ContextHelper(context);
                ContextHelper.ResponseError(ex.Message);
            }
        }
    }
}