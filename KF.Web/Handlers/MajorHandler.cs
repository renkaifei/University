using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface ;
using KF.Domain.Model ;
using KF.Repository ;
using System.Collections.Specialized;

namespace KF.Web.Handlers
{
    public class MajorHandler:BaseHandler
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
            else if (option == "getlistinrecurit")
            {
                GetListInRecurit();
            }
        }

        private void GetList()
        {
            IEntityRepository Repo = factory.Create("major");
            IMajorRepository MajorRepo = Repo as IMajorRepository;
            string majorName = Helper.GetParameterFromRequest("majorName");
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            Entities entities = MajorRepo.GetList(majorName,universityId);
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
            IEntityRepository Repo = factory.Create("major");
            int majorId = int.Parse(Helper.GetParameterFromRequest("majorId"));
            Entity entity = Repo.GetOne(majorId);
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
            Entity major = entityFactory.Create("major");
            major.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("major");
            Entity entity = Repo.Add(major);
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
            Entity major = entityFactory.Create("major");
            major.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("major");
            Entity entity = Repo.Update(major);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(major.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Delete()
        {
            int majorId = int.Parse(Helper.GetParameterFromRequest("majorId"));
            //判断专业下是否有课程
            IEntityRepository Repo = factory.Create("majorcourse");

            IMajorCourseRepository majorCourseRepo = Repo as IMajorCourseRepository;
            int count = majorCourseRepo.CourseInMajorCount(majorId);
            if (count > 0)
            {
                Helper.ResponseError(607);
                return;
            }

            Repo = factory.Create("major");
            int result = Repo.Delete(majorId);

            if (result == 1)
            {
                Helper.Response("1");
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
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            IEntityRepository Repo = factory.Create("major");
            IMajorRepository MajorRepo = Repo as IMajorRepository;
            Entities entities = MajorRepo.GetList(companyId, year,universityId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entities.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}