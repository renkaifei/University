using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;

namespace KF.Web.Handlers
{
    public class ScholarShipHandler:BaseHandler
    {

        protected override void CustomProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();
            if (option == "getlist")
            {
                GetList();
            }
            else if (option == "getone")
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
        }

        private void GetList()
        {
            IEntityRepository Repo = factory.Create("scholarship");
            IScholarShipRepository ScholarShipRepository = Repo as IScholarShipRepository;

            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));

            Entities entities = ScholarShipRepository.GetList(universityId,pageIndex,pageSize);

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
            IEntityRepository Repo = factory.Create("scholarship");
            int scholarshipId = int.Parse(Helper.GetParameterFromRequest("scholarShipId"));
            Entity entity = Repo.GetOne(scholarshipId);
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
            Entity entity = entityFactory.Create("scholarship");
            entity.Initialize(Helper.FormToDictionary());

            IEntityRepository Repo = factory.Create("scholarship");
            entity = Repo.Add(entity);
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
            Entity entity = entityFactory.Create("scholarship");
            entity.Initialize(Helper.FormToDictionary());

            IEntityRepository Repo = factory.Create("scholarship");
            entity = Repo.Update(entity);
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
            IEntityRepository Repo = factory.Create("scholarship");
            int scholarShipId = int.Parse(Helper.GetParameterFromRequest("scholarShipId"));
            int result = Repo.Delete(scholarShipId);
            if (result == 1)
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