using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class RolesService:BaseService,IGetListBehavior
    {
        public RolesService(HttpContext context)
            :base(context)
        { }

        public void GetList()
        {
            Roles roles = new Roles();
            RolesDomain domain = new RolesDomain(roles);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(roles.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}