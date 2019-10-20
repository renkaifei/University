using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Web;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class CityService:BaseService,IGetOneBehavior
    {
        public CityService(HttpContext context):base(context)
        { 
        
        }

        public void GetOne()
        {
            City city = new City();
            city.CityId = int.Parse(GetParameterFromRequest("cityId"));
            CityDomain domain = new CityDomain(city);
            if (domain.GetOne())
            {
                Response(city.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}