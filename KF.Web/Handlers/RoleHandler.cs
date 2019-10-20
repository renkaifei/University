using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Repository;
using KF.Domain.Interface;
using KF.Domain.Model;

namespace KF.Web.Handlers
{
    public class RoleHandler:BaseHandler 
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
            IEntityRepository Repo = factory.Create("role");
            IRoleRepository RoleRepo = Repo as IRoleRepository;
            Entities entities = RoleRepo.GetList();
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
            IEntityRepository Repo = factory.Create("role");
            int roleId = int.Parse(Helper.GetParameterFromRequest("roleId"));
            Entity role = Repo.GetOne(roleId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(role.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Add()
        {
            Entity entity = entityFactory.Create("role");
            entity.Initialize(Helper.FormToDictionary());

            IEntityRepository Repo = factory.Create("role");
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
            Entity entity = entityFactory.Create("role");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("role");
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
            IEntityRepository Repo = factory.Create("role");
            int roleId = int.Parse(Helper.GetParameterFromRequest("roleId"));
            int result = Repo.Delete(roleId);

           
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