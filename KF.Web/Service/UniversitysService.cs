using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Web;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class UniversitysService:BaseService,IGetListBehavior
    {
        public UniversitysService(HttpContext context)
            : base(context)
        { 
            
        }

        public void GetList()
        {
            Universitys universitys = new Universitys();
            UniversitysDomain domain = new UniversitysDomain(universitys);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(universitys.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}