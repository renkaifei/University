using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class RoleService:BaseService,IGetOneBehavior,IAddBehavior,IUpdateBehavior,IDeleteBehavior
    {
        public RoleService(HttpContext context):base(context)
        { }



        public void GetOne()
        {
            Role role = new Role();
            role.RoleId = int.Parse(GetParameterFromRequest("roleId"));
            RoleDomain domain = new RoleDomain(role);
            if (domain.GetOne())
            {
                Response(role.Serialize());
            }
            else
            {
                Response(domain.ErrorMessage);
            }
        }

        public void Add()
        {
            Role role = new Role();
            role.RoleName = GetParameterFromRequest("roleName");
            RoleDomain domain = new RoleDomain(role);
            if (domain.Add())
            {
                Response(role.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Update()
        {
            Role role = new Role();
            role.RoleId = int.Parse(GetParameterFromRequest("roleId"));
            role.RoleName = GetParameterFromRequest("roleName");
            RoleDomain domain = new RoleDomain(role);
            if (domain.Update())
            {
                Response(role.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            Role role = new Role();
            role.RoleId = int.Parse(GetParameterFromRequest("roleId"));
            RoleDomain domain = new RoleDomain(role);
            if (domain.Delete())
            {
                Response("1");
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}