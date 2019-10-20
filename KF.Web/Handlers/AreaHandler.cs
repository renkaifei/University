using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Interface;
using KF.Domain.Model;

namespace KF.Web.Handlers
{
    public class AreaHandler:BaseHandler
    {
        protected override void CustomProcessRequest(HttpContext context)
        {
            string option = Helper.GetParameterFromRequest("option").ToLower();
            if (option == "getlist")
            {
                GetList();
            }
        }

        private void GetList()
        {
            IEntityRepository Repo = factory.Create("area");
            IAreaRepository AreaRepo = Repo as IAreaRepository;
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            Entities entities = AreaRepo.GetList(provinceId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entities.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}