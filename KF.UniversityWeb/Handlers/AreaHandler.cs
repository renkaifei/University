using KF.Repo;
using KF.Repo.Entities;
using KF.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.UniversityWeb.Handlers
{
    public class AreaHandler:IHttpHandler
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
        }

        private void GetList()
        {
            int cityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            Areas areas = new Areas();
            AreasRepo Repo = new AreasRepo(areas);
            if (Repo.Query(cityId))
            {
                Helper.Response(areas.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}