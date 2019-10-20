using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;
using KF.Repository;
using System.Collections.Specialized;

namespace KF.Web.Handlers
{
    public class CourseHandler:BaseHandler 
    {
        protected override void CustomProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option");
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
            else if (option == "getcoursecount")
            { 
                
            }
        }

        private void GetList()
        {
            IEntityRepository Repo = factory.Create("course");
            ICourseRepository CourseRepo = Repo as ICourseRepository;
            Entities entities = CourseRepo.GetList();
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
            Entity course = entityFactory.Create("course");
            course.Initialize(Helper.FormToDictionary());

            IEntityRepository Repo = factory.Create("course");
            Entity entity = Repo.Add(course);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(course.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            IEntityRepository Repo = factory.Create("course");
            int courseId = int.Parse(Helper.GetParameterFromRequest("courseId"));
            Entity entity = Repo.GetOne(courseId);
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
            Entity course = entityFactory.Create("course");
            course.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("course");
            course = Repo.Update(course);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(course.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Delete()
        {
            int courseId = int.Parse(Helper.GetParameterFromRequest("courseId"));
            //检查课程是否已经被分配到专业
            IEntityRepository Repo = factory.Create("majorcourse");

            IMajorCourseRepository majorCourseRepo = Repo as IMajorCourseRepository;
            int count = majorCourseRepo.CourseAssignToMajorCount(courseId);
            if (count > 0)
            {
                Helper.ResponseError(607);
                return;
            }

            IEntityRepository CourseRepo = factory.Create("course");
            int result = CourseRepo.Delete(courseId);
            if (result == 1)
            {
                Helper.Response("1");
            }
            else
            {
                Helper.ResponseError(CourseRepo.ErrorMessage);
            }
        }
    }
}