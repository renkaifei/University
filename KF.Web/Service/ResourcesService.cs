using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class ResourcesService:BaseService,IGetListBehavior
    {
        public ResourcesService(HttpContext context)
            :base(context)
        { 
            
        }

        public void GetList()
        {
            Resources resources = new Resources();
            ResourcesDomain domain = new ResourcesDomain(resources);
            if (domain.GetList())
            {
                Response(resources.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}