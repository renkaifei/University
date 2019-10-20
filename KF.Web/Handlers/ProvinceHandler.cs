using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Common;
using System.Web.SessionState;
using KF.Repository;
using KF.Domain.Model;
using KF.Domain.Interface;
using System.Collections.Specialized;

namespace KF.Web.Handlers
{
    public class ProvinceHandler:BaseHandler
    {
        protected override void CustomProcessRequest(HttpContext context)
        {
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
            IEntityRepository Repo = CreateRepository("province");
            IProvinceRepository ProvinceRepo = Repo as IProvinceRepository;
            Entities provinces = ProvinceRepo.GetList();
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(provinces.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            IEntityRepository Repo = CreateRepository("province");

            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            Entity province = Repo.GetOne(provinceId);

            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(province.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}