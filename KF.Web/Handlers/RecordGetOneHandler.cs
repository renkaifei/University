using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Factory;
using KF.Web.Interface;
using KF.Web.Common;

namespace KF.Web.Handlers
{
    public class RecordGetOneHandler:BaseHandler 
    {

        protected override void CustomProcessRequest(HttpContext context)
        {
            try
            {
                GetOneFactory factory = new GetOneFactory(context);
                IGetOneBehavior getOneBehavior = factory.Create();
                getOneBehavior.GetOne();
            }
            catch (Exception ex)
            {
                ContextHelper ContextHelper = new ContextHelper(context);
                ContextHelper.ResponseError(ex.Message);
            }
        }
    }
}