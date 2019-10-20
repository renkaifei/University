using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Factory;
using KF.Web.Common;
using KF.Web.Interface;
using System.Web.SessionState;

namespace KF.Web.Handlers
{
    public class RecordsGetListHandler : BaseHandler
    {
        protected sealed override void CustomProcessRequest(HttpContext context)
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