using System;
using System.Web;
using KF.Repo.Entities;
using KF.Repo.Domain;
using KF.Web.Interface;

namespace KF.Web.Service
{
    public class AreasService:BaseService,IGetListBehavior
    {
       
        public AreasService(HttpContext context):base(context)
        {
            
        }

        public void GetList()
        {
            int cityId = int.Parse(GetParameterFromRequest("cityId"));
            Areas areas = new Areas();
            AreasDomain domain = new AreasDomain(areas);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                  Response(areas.Serialize());
                
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}