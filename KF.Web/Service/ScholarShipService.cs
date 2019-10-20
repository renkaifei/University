using System;
using System.Web;
using KF.Repo;
using KF.Repo.Entities;
using KF.Web.Interface;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class ScholarShipService:BaseService,IGetOneBehavior,IAddBehavior,IUpdateBehavior,IDeleteBehavior
    {
        
        public ScholarShipService(HttpContext context):base(context)
        {
            
        }

        public void Add()
        {
            ScholarShip scholarShip = new ScholarShip();
            scholarShip.ScholarShipName = GetParameterFromRequest("ScholarShipName");
            scholarShip.ScholarShipAbstract = GetParameterFromRequest("ScholarShipAbstract");
            scholarShip.UniversityId = int.Parse(GetParameterFromRequest("UniversityId"));
            scholarShip.ScholarShipTotal = int.Parse(GetParameterFromRequest("scholarShipTotal"));
            scholarShip.StartYear = int.Parse(GetParameterFromRequest("StartYear"));
            scholarShip.EndYear = int.Parse(GetParameterFromRequest("EndYear"));
            ScholarShipDomain domain = new ScholarShipDomain(scholarShip);
            if (domain.Add())
            {
                Response(scholarShip.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Update()
        {
            ScholarShip scholarShip = new ScholarShip();
            scholarShip.ScholarShipId = int.Parse(GetParameterFromRequest("scholarShipId"));
            scholarShip.ScholarShipName = GetParameterFromRequest("scholarShipName");
            scholarShip.ScholarShipAbstract = GetParameterFromRequest("scholarShipAbstract");
            scholarShip.ScholarShipTotal = int.Parse(GetParameterFromRequest("scholarShipTotal"));
            scholarShip.StartYear = int.Parse(GetParameterFromRequest("StartYear"));
            scholarShip.EndYear = int.Parse(GetParameterFromRequest("EndYear"));

            ScholarShipDomain domain = new ScholarShipDomain(scholarShip);
            if (domain.Update())
            {
                Response(scholarShip.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void GetOne()
        {
            int scholarShipId = int.Parse(GetParameterFromRequest("scholarShipId"));
            ScholarShip scholarShip = new ScholarShip();
            scholarShip.ScholarShipId = scholarShipId;
            ScholarShipDomain domain = new ScholarShipDomain(scholarShip);
            if (domain.GetOne())
            {
                Response(scholarShip.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            int scholarShipId = int.Parse(GetParameterFromRequest("scholarShipId"));
            ScholarShip scholarShip = new ScholarShip();
            scholarShip.ScholarShipId = scholarShipId;
            ScholarShipDomain domain = new ScholarShipDomain(scholarShip);
            if (domain.Delete())
            {
                Response("1");
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}