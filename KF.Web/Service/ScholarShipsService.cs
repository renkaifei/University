using KF.Web.Interface;
using System;
using System.Web;
using KF.Repo.Domain;
using KF.Repo.Entities;

namespace KF.Web.Service
{
    public class ScholarShipsService:BaseService,IGetListBehavior
    {

        public ScholarShipsService(HttpContext context):base(context)
        { }

        public void GetList()
        {
            ScholarShips scholarShips = new ScholarShips();
            ScholarShipsDomain domain = new ScholarShipsDomain(scholarShips);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(scholarShips.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}