using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Common;
using KF.Repo;
using KF.Repo.Entities;
using System.Web.SessionState;

namespace KF.UniversityWeb.Handlers
{
    public class ProvinceHandler : IHttpHandler
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
            Provinces provinces = new Provinces();
            ProvincesRepo Repo = new ProvincesRepo(provinces);
            if (Repo.Query())
            {
                Helper.Response(provinces.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            Province province = new Province() { ProvinceId = provinceId };
            ProvinceRepo Repo = new ProvinceRepo(province);
            if (Repo.Query())
            {
                Helper.Response(province.Serialize());
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