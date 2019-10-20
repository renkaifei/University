using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class PermissionsService:BaseService,IGetListBehavior
    {
        public PermissionsService(HttpContext context)
            :base(context)
        {}

        public void GetList()
        {
            Permissions permissions = new Permissions();
            PermissionsDomain domain = new PermissionsDomain(permissions);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(permissions.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}