using System;
using System.Web;
using KF.Web.Factory;
using KF.Web.Interface;
using KF.Web.Common;

namespace KF.Web.Handlers
{
    public class RecordDeleteHandler:BaseHandler
    {

        public bool IsReusable
        {
            get { return false; }
        }

        protected override void CustomProcessRequest(HttpContext context)
        {
            try
            {
                DeleteFactory factory = new DeleteFactory(context);
                IDeleteBehavior deleteBehavior = factory.Create();
                deleteBehavior.Delete();
            }
            catch (Exception ex)
            {
                ContextHelper helper = new ContextHelper(context);
                helper.ResponseError(ex.Message);
            }
        }
    }
}