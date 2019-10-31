using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Model;
using KF.Domain.Interface;
using KF.Repository;

namespace KF.UniversityWeb.Handlers
{
    public class ProvinceHandler:BaseHandler 
    {
        protected override void CustomProcessRequest()
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();
            if (option == "getlist")
            {
                GetList();
            }
        }

        private void GetList()
        {
            IProvinceRepository Repo = new ProvinceRepository();
            Entities entites = Repo.GetList();
            IError error = Repo as IError;
            if (string.IsNullOrEmpty(error.ErrorMessage))
            {
                Helper.Response(entites.Serialize());
            }
            else
            {
                Helper.ResponseError(error.ErrorMessage);
            }
        }
    }
}