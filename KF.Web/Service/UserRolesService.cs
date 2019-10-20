using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class UserRolesService:BaseService,IGetListBehavior
    {
        public UserRolesService(HttpContext context)
            :base(context)
        { 
        
        }

        public void GetList()
        {
            UserRoles userRoles = new UserRoles();
            UserRolesDomain domain = new UserRolesDomain(userRoles);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(userRoles.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);

            }
        }
    }
}