using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Common;
using KF.Repo.Entities;
using KF.Repo;

namespace KF.UniversityWeb.Handlers
{
    public class CityHandler:IHttpHandler
    {

        private ContextHelper Helper { get; set; }

        public void ProcessRequest(HttpContext context)
        {
            Helper = new ContextHelper(context);

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
            Citys citys = new Citys();
            CitysRepo Repo = new CitysRepo(citys);
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            if (Repo.Query(provinceId))
            {
                Helper.Response(citys.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            City city = new City();
            city.CityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            CityRepo Repo = new CityRepo(city);
            if (Repo.Query())
            {
                Helper.Response(city.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }

        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}