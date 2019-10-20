using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Repository;
using KF.Domain.Interface;
using KF.Domain.Model;

namespace KF.Web.Handlers
{
    public class RecuritHandler:BaseHandler 
    {
        protected override void CustomProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();
            if (option == "getone")
            {
                GetOne();
            }
            else if (option == "add")
            {
                Add();
            }
            else if (option == "update")
            {
                Update();
            }
            else if (option == "delete")
            {
                Delete();
            }
            else if (option == "getlist")
            {
                
            }
        }

        private void GetOne()
        {
            IEntityRepository Repo = factory.Create("recurit");
            int recuritId = int.Parse(Helper.GetParameterFromRequest("recuritId"));
            Entity entity = Repo.GetOne(recuritId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entity.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Add()
        {
            Entity entity = entityFactory.Create("recurit");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("recurit");
            Repo.Add(entity);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entity.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Update()
        {
            Entity entity = entityFactory.Create("recurit");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("recurit");
            Repo.Update(entity);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entity.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Delete()
        {
            int recuritId = int.Parse(Helper.GetParameterFromRequest("recuritId"));
            IEntityRepository Repo = factory.Create("recurit");
            Repo.Delete(recuritId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response("1");
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}