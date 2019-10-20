using System;
using System.Web;
using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;

namespace KF.Web.Service
{
    public class EnrollmentPlanService:BaseService,IAddBehavior,IUpdateBehavior,IDeleteBehavior,IGetOneBehavior
    {
        public EnrollmentPlanService(HttpContext context):base(context)
        {
            
        }

        public void GetOne()
        { 
            EnrollmentPlan enrollmentPlan = new EnrollmentPlan();
            enrollmentPlan.EnrollmentPlanId = int.Parse(GetParameterFromRequest("enrollmentPlanId"));
            EnrollmentPlanDomain domain = new EnrollmentPlanDomain(enrollmentPlan);
            if (domain.GetOne())
            {
                Response(enrollmentPlan.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Add()
        {
            EnrollmentPlan enrollmentPlan = new EnrollmentPlan();
            enrollmentPlan.MajorId = int.Parse(GetParameterFromRequest("majorId"));
            enrollmentPlan.PlanNumber = int.Parse(GetParameterFromRequest("planNumber"));
            enrollmentPlan.ProvinceId = int.Parse(GetParameterFromRequest("provinceId"));
            enrollmentPlan.Year = int.Parse(GetParameterFromRequest("year"));

            EnrollmentPlanDomain domain = new EnrollmentPlanDomain(enrollmentPlan);
            if (domain.Add())
            {
                Response(enrollmentPlan.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void GetList()
        {
            int year = int.Parse(GetParameterFromRequest("year"));
            int majorId = int.Parse(GetParameterFromRequest("majorId"));

            
        }

        public void Update()
        {
            EnrollmentPlan enrollmentPlan = new EnrollmentPlan();
            enrollmentPlan.EnrollmentPlanId = int.Parse(GetParameterFromRequest("enrollmentPlanId"));
            enrollmentPlan.Year = int.Parse(GetParameterFromRequest("year"));
            enrollmentPlan.PlanNumber = int.Parse(GetParameterFromRequest("planNumber"));
            enrollmentPlan.ProvinceId = int.Parse(GetParameterFromRequest("provinceId"));

            EnrollmentPlanDomain domain = new EnrollmentPlanDomain(enrollmentPlan);
            if (domain.Update())
            {
                Response(enrollmentPlan.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            EnrollmentPlan enrollmentPlan = new EnrollmentPlan();
            enrollmentPlan.EnrollmentPlanId = int.Parse(GetParameterFromRequest("enrollmentPlanId"));
            EnrollmentPlanDomain domain = new EnrollmentPlanDomain(enrollmentPlan);
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