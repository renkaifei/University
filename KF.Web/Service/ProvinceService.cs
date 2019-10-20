using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Web;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class ProvinceService:BaseService,IGetOneBehavior
    {
        public ProvinceService(HttpContext context):base(context)
        {
            
        }
        public void GetOne()
        {
            Province province = new Province();
            province.ProvinceId = int.Parse(GetParameterFromRequest("provinceId"));
            ProvinceDomain domain = new ProvinceDomain(province);
            if (domain.GetOne())
            {
                Response(province.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}