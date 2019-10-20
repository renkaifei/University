using KF.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using KF.Repository;
using KF.Domain.Model;
using KF.Domain.Interface;

namespace KF.Web.Handlers
{
    public abstract class BaseHandler : IHttpHandler, IReadOnlySessionState
    {
        protected EntityFactory entityFactory { get; set; }
        protected RepositoryFactory factory { get; set; }

        public bool IsReusable
        {
            get { return false; }
        }

        protected ContextHelper Helper { get; set; }

        public void ProcessRequest(HttpContext context)
        {
            Helper = new ContextHelper(context);
            factory = new RepositoryFactory();
            entityFactory = new EntityFactory();

            if (HttpContext.Current.Session["userId"] == null)
            {
                Helper.ResponseError(602);
            }
            else
            {
                CustomProcessRequest(context);
            }
        }

        protected abstract void CustomProcessRequest(HttpContext context);

        protected IEntityRepository CreateRepository(string type)
        {
            RepositoryFactory factory = new RepositoryFactory();
            return factory.Create(type);
        }
    }
}