using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Model;
using KF.Domain.Interface;
using KF.Repository;

namespace KF.UniversityWeb.Handlers
{
    public class CityHandler:BaseHandler
    {
        protected override void CustomProcessRequest()
        {
            var option = Helper.GetParameterFromRequest("option").ToLower();
            if (option.Equals("getlist"))
            {
                GetList();
            }
        }

        private void GetList()
        {
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            ICityRepository Repo = new CityRepository();
            Entities entities;
            if (provinceId == 0)
            {
                entities = Repo.GetList();
            }
            else
            {
                entities = Repo.GetList(provinceId);
            }
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