using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Web;

namespace KF.Web.Service
{
    public class CitysService:BaseService,IGetListBehavior
    {
        public CitysService(HttpContext context):base(context)
        { 
        
        }

        public void GetList()
        {
            Citys citys = new Citys();
            CitysDomain domain = new CitysDomain(citys);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(citys.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}