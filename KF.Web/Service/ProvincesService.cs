using System;
using System.Web;
using KF.Web.Interface;
using KF.Repo.Domain;
using KF.Repo.Entities;

namespace KF.Web.Service
{
    public class ProvincesService:BaseService,IGetListBehavior
    {
        public ProvincesService(HttpContext context):base(context)
        {
            
        }

        public void GetList()
        {
            Provinces provinces = new Provinces();
            ProvincesDomain domain = new ProvincesDomain(provinces);
            if (domain.GetList())
            {
                Response(provinces.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}