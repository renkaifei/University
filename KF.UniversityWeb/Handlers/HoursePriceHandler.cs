using KF.Repo;
using KF.Repo.Entities;
using KF.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.UniversityWeb.Handlers
{
    public class HoursePriceHandler:IHttpHandler
    {
        private ContextHelper Helper { get; set; }

        public void ProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();
            if (option == "getlist")
            {
                GetList();
            }
            else if (option == "getone")
            {
                GetOne();
            }
        }

        private void GetList()
        {
            HoursePrices hoursePrices = new HoursePrices();
            HoursePricesRepo Repo = new HoursePricesRepo(hoursePrices);
            int cityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            int areaId = int.Parse(Helper.GetParameterFromRequest("areaId"));
            int year = int.Parse(Helper.GetParameterFromRequest("year"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));
            if (Repo.Query(cityId, areaId, year, pageIndex, pageSize))
            {
                Helper.Response(hoursePrices.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            int hoursePriceId = int.Parse(Helper.GetParameterFromRequest("hoursePriceId"));
            HoursePrice hoursePrice = new HoursePrice();
            hoursePrice.HoursePriceId = hoursePriceId;
            HoursePriceRepo Repo = new HoursePriceRepo(hoursePrice);
            if (Repo.Query())
            {
                Helper.Response(hoursePrice.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}