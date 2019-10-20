using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;

namespace KF.Web.Handlers
{
    public class CompanyHandler:BaseHandler
    {

        protected override void CustomProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option");
            if (option.Equals("getlist"))
            {
                GetList();
            }
            else if (option.Equals("getone"))
            {
                GetOne();
            }
            else if (option.Equals("add"))
            {
                Add();
            }
            else if (option.Equals("update"))
            {
                Update();
            }
            else if (option.Equals("delete"))
            {
                Delete();
            }
        }

        private void GetList()
        {
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));
            IEntityRepository Repo = factory.Create("company");
            ICompanyRepository CompanyRepo = Repo as ICompanyRepository;
            Entities entities = CompanyRepo.GetList(pageIndex,pageSize);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entities.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            int companyId = int.Parse(Helper.GetParameterFromRequest("companyId"));
            IEntityRepository Repo = factory.Create("company");
            Entity entity = Repo.GetOne(companyId);
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
            Entity entity = entityFactory.Create("company");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("company");
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
            Entity entity = entityFactory.Create("company");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("company");
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
            int companyId = int.Parse(Helper.GetParameterFromRequest("companyId"));
            IEntityRepository Repo = factory.Create("company");
            Repo.Delete(companyId);
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