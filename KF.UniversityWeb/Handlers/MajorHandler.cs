using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;
using KF.Repository;

namespace KF.UniversityWeb.Handlers
{
    public class MajorHandler:BaseHandler 
    {
        protected override void CustomProcessRequest()
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();
            if (option.Equals("getlist"))
            {
                GetList();
            }
        }

        private void GetList()
        {
            IMajorRepository Repo = new MajorRepository();
            string majorName = Helper.GetParameterFromRequest("majorName");
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            Entities entities = Repo.GetList(majorName, universityId);
            IError error = Repo as IError;
            if (string.IsNullOrEmpty(error.ErrorMessage))
            {
                Helper.Response(entities.Serialize());
            }
            else
            {
                Helper.ResponseError(error.ErrorMessage);
            }
        }
    }
}