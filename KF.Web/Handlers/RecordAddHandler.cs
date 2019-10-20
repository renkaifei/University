using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Factory;
using KF.Web.Interface;
using KF.Web.Common;
using KF.Web.Service;

namespace KF.Web.Handlers
{
    public class RecordAddHandler:BaseHandler
    {

        protected override void CustomProcessRequest(HttpContext context)
        {
            try
            {
                AddFactory factory = new AddFactory(context);
                IAddBehavior addBehavior = factory.Create();
                addBehavior.Add();
            }
            catch (Exception ex)
            {
                ContextHelper contextHelper = new ContextHelper(context);
                contextHelper.ResponseError(ex.Message);
            }
            
        }
    }
}