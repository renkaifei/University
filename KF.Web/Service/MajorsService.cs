using KF.Web.Interface;
using System;
using System.Web;
using KF.Repo.Domain;
using KF.Repo.Entities;

namespace KF.Web.Service
{
    public class MajorsService:BaseService,IGetListBehavior
    {
        public MajorsService(HttpContext context):base(context)
        { }

        public void GetList()
        {
            Majors majors = new Majors();
            MajorsDomain domain = new MajorsDomain(majors);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(majors.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}