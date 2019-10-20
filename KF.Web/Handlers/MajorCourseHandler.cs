using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Model;
using KF.Domain.Interface;

namespace KF.Web.Handlers
{
    public class MajorCourseHandler:BaseHandler
    {

        protected override void CustomProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();

            if (option == "getlist")
            {
                GetList();
            }
            else if (option == "add")
            { 
                Add();
            }
            else if (option == "delete")
            {
                Delete();
            }
        }

        private void GetList()
        {
            IEntityRepository Repo = factory.Create("majorcourse");
            IMajorCourseRepository MajorCourseRepo = Repo as IMajorCourseRepository;
            int majorId = int.Parse(Helper.GetParameterFromRequest("majorId"));
            Entities entities = MajorCourseRepo.GetList(majorId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entities.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Add()
        {
            Entity entity = entityFactory.Create("majorcourse");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("majorcourse");
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

        private void Delete()
        {
            IEntityRepository Repo = factory.Create("majorcourse");
            IMajorCourseRepository MajorCourseRepository = Repo as IMajorCourseRepository;
            int majorId = int.Parse(Helper.GetParameterFromRequest("majorId"));
            int courseId = int.Parse(Helper.GetParameterFromRequest("courseId"));

            int result = MajorCourseRepository.Delete(majorId,courseId);
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