using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Web;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class MajorService:BaseService,IAddBehavior,IUpdateBehavior,IDeleteBehavior,IGetOneBehavior
    {
        public MajorService(HttpContext context):base(context)
        { }

        public void Add()
        {
            Major major = new Major();
            major.MajorName = GetParameterFromRequest("majorName");
            major.Address = GetParameterFromRequest("address");
            major.Code = GetParameterFromRequest("code");
            major.Degree = int.Parse(GetParameterFromRequest("degree"));
            major.Discipline = int.Parse(GetParameterFromRequest("discipline"));
            major.EducationalSystem = int.Parse(GetParameterFromRequest("educationalSystem"));
            major.Tuition = int.Parse(GetParameterFromRequest("tuition"));
            major.UniversityId = int.Parse(GetParameterFromRequest("universityId"));
            MajorDomain Domain = new MajorDomain(major);
            if (Domain.Add())
            {
                Response(major.Serialize());
            }
            else
            {
                ResponseError(Domain.ErrorMessage);
            }
        }

        public void Update()
        {
            Major major = new Major();
            major.MajorId = int.Parse(GetParameterFromRequest("majorId"));
            major.MajorName = GetParameterFromRequest("majorName");
            major.Address = GetParameterFromRequest("address");
            major.Code = GetParameterFromRequest("code");
            major.Degree = int.Parse(GetParameterFromRequest("degree"));
            major.Discipline = int.Parse(GetParameterFromRequest("discipline"));
            major.EducationalSystem = int.Parse(GetParameterFromRequest("educationalSystem"));
            major.Tuition = int.Parse(GetParameterFromRequest("tuition"));
            MajorDomain Domain = new MajorDomain(major);
            if (Domain.Update())
            {
                Response(major.Serialize());
            }
            else
            {
                ResponseError(Domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            Major major = new Major();
            major.MajorId = int.Parse(GetParameterFromRequest("majorId"));
            MajorDomain Domain = new MajorDomain(major);
            if (Domain.Delete())
            {
                Response(major.Serialize());
            }
            else
            {
                ResponseError(Domain.ErrorMessage);
            }
        }

        public void GetOne()
        {
            Major major = new Major();
            major.MajorId = int.Parse(GetParameterFromRequest("majorId"));
            MajorDomain domain = new MajorDomain(major);
            if (domain.GetOne())
            {
                Response(major.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}