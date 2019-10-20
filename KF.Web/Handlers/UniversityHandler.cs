using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Collections.Specialized;
using KF.Domain.Interface;
using KF.Repository;
using KF.Domain.Model;

namespace KF.Web.Handlers
{
    public class UniversityHandler:BaseHandler
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
            else if (option == "getbasic")
            {
                GetBasic();
            }
            else if (option == "getlistinrecurit")
            {
                GetListInRecurit();
            }
        }

        private void GetList()
        {
            IEntityRepository Repo = factory.Create("university");
            IUniversityRepository UniversityRepo = Repo as IUniversityRepository;
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            int cityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));
            string universityName = Helper.GetParameterFromRequest("universityName");

             Entities entities = new Entities();
             if (string.IsNullOrEmpty(universityName))
             {
                 entities = UniversityRepo.GetList(provinceId, cityId, pageIndex, pageSize);
             }
             else
             {
                 entities = UniversityRepo.GetList(universityName);
             }

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
            IEntityRepository Repo = factory.Create("university");
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            Entity entity = Repo.GetOne(universityId);
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
            Entity entity = entityFactory.Create("university");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("university");
            Entity entitis = Repo.Add(entity);
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
            Entity university = entityFactory.Create("university");
            university.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("university");
            Entity entity = Repo.Update(university);
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
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));

            //判断高校下是否存在专业
            IEntityRepository Repo = factory.Create("major");
            IMajorRepository majorRepo = Repo as IMajorRepository;
            int count = majorRepo.GetCountInUniversity(universityId);
            if (count > 0)
            {
                Helper.ResponseError(605);
                return;
            }

            //删除高校
            Repo = factory.Create("university");
            int result = Repo.Delete(universityId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response("1");
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetBasic()
        {
            IEntityRepository Repo = factory.Create("university");
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            IUniversityRepository UniversityRepo = Repo as IUniversityRepository;
            Entity entity = UniversityRepo.GetOneBasic(universityId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entity.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetListInRecurit() 
        {
            int companyId = int.Parse(Helper.GetParameterFromRequest("companyId"));
            int year = int.Parse(Helper.GetParameterFromRequest("year"));
            IEntityRepository Repo = factory.Create("university");
            IUniversityRepository UniversityRepo = Repo as IUniversityRepository;
            Entities entities =  UniversityRepo.GetList(companyId, year);
            if (string.IsNullOrEmpty(UniversityRepo.ErrorMessage))
            {
                Helper.Response(entities.Serialize());
            }
            else
            {
                Helper.ResponseError(UniversityRepo.ErrorMessage);
            }
        }
    }
}