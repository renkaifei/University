using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Factory;
using KF.Web.Interface;

namespace KF.Web.Handlers
{
    public class RecordUpdateHandler : BaseHandler
    {

        protected override void CustomProcessRequest(HttpContext context)
        {
            UpdateFactory factory = new UpdateFactory(context);
            IUpdateBehavior updateBehavior = factory.Create();
            updateBehavior.Update();
        }
    }
}