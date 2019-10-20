using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class PermissionService:BaseService,IAddBehavior,IDeleteBehavior
    {
        public PermissionService(HttpContext context)
            :base(context)
        { }

        public void Add()
        {
            Permission permission = new Permission();
            permission.RoleId = int.Parse(GetParameterFromRequest("roleId"));
            permission.ResourceId = int.Parse(GetParameterFromRequest("resourceId"));
            permission.PermissionType = (PermissionType)int.Parse(GetParameterFromRequest("permissionType"));
            PermissionDomain domain = new PermissionDomain(permission);
            if (domain.Add())
            {
                Response(permission.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            Permission permission = new Permission();
            permission.ResourceId = int.Parse(GetParameterFromRequest("resourceId"));
            permission.RoleId = int.Parse(GetParameterFromRequest("roleId"));
            permission.PermissionType = (PermissionType)int.Parse(GetParameterFromRequest("permissionType"));
            PermissionDomain domain = new PermissionDomain(permission);
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