using KF.Repo;
using KF.Repo.Entities;
using KF.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.UniversityWeb.Handlers
{
    public class ScholarShipHandler:IHttpHandler
    {

        private ContextHelper Helper { get; set; }

        protected override void CustomProcessRequest(HttpContext context)
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
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));
            ScholarShips scholarShips = new ScholarShips();
            ScholarShipsRepo Repo = new ScholarShipsRepo(scholarShips);
            if (Repo.Query(universityId, pageIndex, pageSize))
            {
                Helper.Response(scholarShips.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            int scholarShipId = int.Parse(Helper.GetParameterFromRequest("scholarShipId"));
            ScholarShip scholarShip = new ScholarShip();
            scholarShip.ScholarShipId = scholarShipId;
            ScholarShipRepo Repo = new ScholarShipRepo(scholarShip);
            if (Repo.Query())
            {
                Helper.Response(scholarShip.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

    }
}