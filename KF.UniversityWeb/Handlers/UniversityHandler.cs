using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Common;
using KF.Repo;
using KF.Repo.Entities;

namespace KF.UniversityWeb.Handlers
{
    public class UniversityHandler:IHttpHandler
    {
        private ContextHelper Helper {get;set;}

        public bool IsReusable
        {
            get { return false; }
        }

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
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            int cityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));

            Universitys universitys = new Universitys();
            UniversitysRepo Repo = new UniversitysRepo(universitys);
            if (Repo.Query(provinceId, cityId, pageIndex, pageSize))
            {
                Helper.Response(universitys.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            University university = new University();
            university.UniversityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            UniversityRepo Repo = new UniversityRepo(university);
            if (Repo.Query())
            {
                Helper.Response(university.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}