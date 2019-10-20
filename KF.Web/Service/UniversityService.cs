using KF.Repo.Entities;
using System;
using System.Web;
using KF.Web.Interface;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class UniversityService : BaseService, IGetOneBehavior,IAddBehavior,IUpdateBehavior,IDeleteBehavior
    {
        public UniversityService(HttpContext context)
            : base(context)
        {
            
        }

        public void GetOne()
        {
            University university = new University();
            university.UniversityId = int.Parse(GetParameterFromRequest("universityId"));
            UniversityDomain domain = new UniversityDomain(university);
            if (domain.GetOne())
            {
                Response(university.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Add()
        {
            University university = new University();
            university.UniversityName = GetParameterFromRequest("universityName");
            university.UniversityAbstract = GetParameterFromRequest("universityAbstract");
            university.UniversityIcon = GetParameterFromRequest("universityIcon");
            university.UniversityAddress = GetParameterFromRequest("universityAddress");
            university.Undergraduate = int.Parse(GetParameterFromRequest("undergraduateTotalNumber"));
            university.Postgraduate = int.Parse(GetParameterFromRequest("postgraduateTotalNumber"));
            university.OverseasStudent = int.Parse(GetParameterFromRequest("overseasStudentTotalNumber"));
            university.CityId = int.Parse(GetParameterFromRequest("cityId"));
            UniversityDomain domain = new UniversityDomain(university);
            if (domain.Add())
            {
                Response(university.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }            
        }

        public void Update()
        {
            University university = new University();
            university.UniversityId = int.Parse(GetParameterFromRequest("universityId"));
            university.UniversityName = GetParameterFromRequest("universityName");
            university.UniversityAddress = GetParameterFromRequest("universityAddress");
            university.UniversityAbstract = GetParameterFromRequest("universityAbstract");
            university.UniversityIcon = GetParameterFromRequest("universityIcon");
            university.Undergraduate = int.Parse(GetParameterFromRequest("undergraduateTotalNumber"));
            university.Postgraduate = int.Parse(GetParameterFromRequest("postgraduateTotalNumber"));
            university.OverseasStudent = int.Parse(GetParameterFromRequest("overseasStudentTotalNumber"));
            UniversityDomain domain = new UniversityDomain(university);
            if (domain.Update())
            {
                Response(university.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            University university = new University();
            university.UniversityId = int.Parse(GetParameterFromRequest("universityId"));
            UniversityDomain domain = new UniversityDomain(university);
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