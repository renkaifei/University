using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;
using KF.Repository;

namespace KF.Web.Handlers
{
    public class EnrollmentPlanHandler:BaseHandler
    {
        protected override void CustomProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();

            if (option == "getlist")
            {
                GetList();
            }
            else if(option == "getone")
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
            IEntityRepository Repo = factory.Create("enrollmentplan");
            IEnrollmentPlanRepository EnrollmentPlanRepo = Repo as IEnrollmentPlanRepository;

            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            int year = int.Parse(Helper.GetParameterFromRequest("year"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));

            Entities entities = EnrollmentPlanRepo.GetList(universityId,year,pageIndex,pageSize);
            
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
            IEntityRepository Repo = factory.Create("enrollmentPlan");
            int enrollmentPlanId = int.Parse(Helper.GetParameterFromRequest("enrollmentPlanId"));
            Entity entity = Repo.GetOne(enrollmentPlanId);
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
            Entity entity = entityFactory.Create ("enrollmentplan");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("enrollmentplan");
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
            Entity entity = entityFactory.Create("enrollmentplan");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("enrollmentplan");
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
            IEntityRepository Repo = factory.Create("enrollmentplan");
            int enrollmentPlanId = int.Parse(Helper.GetParameterFromRequest("enrollmentPlanId"));
            int result = Repo.Delete(enrollmentPlanId);
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