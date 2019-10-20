using KF.Web.Interface;
using System;
using System.Web;
using KF.Repo.Domain;
using KF.Repo.Entities;

namespace KF.Web.Service
{
    public class EnrollmentPlansService:BaseService,IGetListBehavior,IGetOneBehavior
    {
        public EnrollmentPlansService(HttpContext context):base(context)
        { 
            
        }

        public void GetList()
        {
            EnrollmentPlans enrollmentPlans =new EnrollmentPlans();
            EnrollmentPlansDomain domain = new EnrollmentPlansDomain(enrollmentPlans);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(enrollmentPlans.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void GetOne()
        {
            EnrollmentPlansCondition condition = new EnrollmentPlansCondition();
            EnrollmentPlansConditionDomain domain = new EnrollmentPlansConditionDomain(condition);
            if (domain.GetOne())
            {
                Response(condition.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}