using KF.Repo;
using KF.Repo.Entities;
using KF.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace KF.UniversityWeb.Handlers
{
    public class MajorHandler:IHttpHandler
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
            else if (option == "getone")
            {
                GetOne();
            }
        }

        private void GetList()
        {
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            Majors majors = new Majors();
            MajorsRepo Repo = new MajorsRepo(majors);
            if (Repo.Query(universityId))
            {
                Helper.Response(majors.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            Major major = new Major();
            major.MajorId = int.Parse(Helper.GetParameterFromRequest("majorId"));
            MajorRepo Repo = new MajorRepo(major);
            if (Repo.Query())
            {
                Helper.Response(major.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}