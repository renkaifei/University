using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class UserRoleService:BaseService,IAddBehavior,IDeleteBehavior
    {
        public UserRoleService(HttpContext context)
            :base(context)
        { }

        public void Add()
        {
            UserRole userRole = new UserRole();
            userRole.UserId = int.Parse(GetParameterFromRequest("userId"));
            userRole.RoleId = int.Parse(GetParameterFromRequest("roleId"));
            UserRoleDomain domain = new UserRoleDomain(userRole);
            if (domain.Add())
            {
                Response(userRole.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            UserRole userRole = new UserRole();
            userRole.UserId = int.Parse(GetParameterFromRequest("userId"));
            userRole.RoleId = int.Parse(GetParameterFromRequest("roleId"));
            UserRoleDomain domain = new UserRoleDomain(userRole);
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