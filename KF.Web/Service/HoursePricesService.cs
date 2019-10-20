using System;
using System.Web;
using KF.Web.Interface;
using KF.Repo.Entities;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class HoursePricesService:BaseService,IGetListBehavior
    {
        public HoursePricesService(HttpContext context):base(context)
        { }

        public void GetList()
        {
            HoursePrices hoursePrices = new HoursePrices();
            HoursePricesDomain domain = new HoursePricesDomain(hoursePrices);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(hoursePrices.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}