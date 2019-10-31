using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;
using KF.Repository;

namespace KF.UniversityWeb.Handlers
{
    public class UniversityHandler:BaseHandler 
    {
        protected override void CustomProcessRequest()
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();
            if (option == "getlist")
            {
                GetList();
            }
            else if(option == "getone")
            {
                GetOne();
            }
        }

        private void GetList()
        { 
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            int cityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));
            IUniversityRepository Repo = new UniversityRepository();
            Entities entities = Repo.GetList(provinceId, cityId, pageIndex, pageSize);
            IError error = Repo as IError;
            if (string.IsNullOrEmpty(error.ErrorMessage))
            {
                Helper.Response(entities.PageSerialize());
            }
            else
            {
                Helper.ResponseError(error.ErrorMessage);
            }
        }

        private void GetOne()
        {
            int universityId = int.Parse(Helper.GetParameterFromRequest("universityId"));
            IEntityRepository Repo = new UniversityRepository();
            Entity university = Repo.GetOne(universityId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(university.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}