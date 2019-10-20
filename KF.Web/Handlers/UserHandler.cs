using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;

namespace KF.Web.Handlers
{
    public class UserHandler:BaseHandler
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
            IEntityRepository Repo = factory.Create("user");
            IUserRepository UserRepo = Repo as IUserRepository;
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));
            Entities entities = UserRepo.GetList(pageIndex,pageSize);
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
            IEntityRepository Repo = factory.Create("user");
            int userId = int.Parse(Helper.GetParameterFromRequest("userId"));
            Entity entity = Repo.GetOne(userId);
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
            Entity entity = entityFactory.Create("user");
            entity.Initialize(Helper.FormToDictionary());

            IEntityRepository Repo = factory.Create("user");
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
            Entity entity = entityFactory.Create("user");
            entity.Initialize(Helper.FormToDictionary());

            IEntityRepository Repo = factory.Create("user");
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
            IEntityRepository Repo = factory.Create("user");
            int userId = int.Parse(Helper.GetParameterFromRequest("userId"));
            int result = Repo.Delete(userId);
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