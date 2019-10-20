using System;
using System.Web;
using KF.Repo.Entities;
using KF.Repo.Domain;
using KF.Web.Interface;

namespace KF.Web.Service
{
    public class HoursePriceService:BaseService,IAddBehavior,IUpdateBehavior,IDeleteBehavior,IGetOneBehavior
    {
        public HoursePriceService(HttpContext context):base(context)
        {
            
        }

        public void Add()
        {
            HoursePrice hoursePrice = new HoursePrice();
            hoursePrice.AreaId = int.Parse(GetParameterFromRequest("areaId"));
            hoursePrice.Year = int.Parse(GetParameterFromRequest("year"));
            hoursePrice.Month = int.Parse(GetParameterFromRequest("month"));
            hoursePrice.Price = int.Parse(GetParameterFromRequest("price"));
            HoursePriceDomain domain = new HoursePriceDomain(hoursePrice);
            if (domain.Add())
            {
                Response(hoursePrice.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Update()
        {
            HoursePrice hoursePrice = new HoursePrice();
            hoursePrice.HoursePriceId = int.Parse(GetParameterFromRequest("hoursePriceId"));
            hoursePrice.Year = int.Parse(GetParameterFromRequest("year"));
            hoursePrice.Month = int.Parse(GetParameterFromRequest("month"));
            hoursePrice.Price = int.Parse(GetParameterFromRequest("price"));
            hoursePrice.AreaId = int.Parse(GetParameterFromRequest("areaId"));
            HoursePriceDomain domain = new HoursePriceDomain(hoursePrice);
            if (domain.Update())
            {
                Response(hoursePrice.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            HoursePrice hoursePrice = new HoursePrice();
            hoursePrice.HoursePriceId = int.Parse(GetParameterFromRequest("hoursePriceId"));
            HoursePriceDomain domain = new HoursePriceDomain(hoursePrice);
            if (domain.Delete())
            {
                Response("1");
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void GetOne()
        {
            HoursePrice hoursePrice = new HoursePrice();
            hoursePrice.HoursePriceId = int.Parse(GetParameterFromRequest("hoursePriceId"));
            HoursePriceDomain domain =new HoursePriceDomain(hoursePrice);
            if (domain.GetOne())
            {
                Response(hoursePrice.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void GetList()
        {
            
        }
    }
}