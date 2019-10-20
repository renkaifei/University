using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Common;
using KF.Repository;
using KF.Domain.Interface;
using KF.Domain.Model;
using System.Collections.Specialized;

namespace KF.Web.Handlers
{
    public class CityHandler:BaseHandler 
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
            IEntityRepository Repo = factory.Create("city");
            ICityRepository CityRepo = Repo as ICityRepository;
            int provinceId = int.Parse(Helper.GetParameterFromRequest("provinceId"));
            Entities cities = CityRepo.GetList(provinceId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(cities.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            IEntityRepository Repo = factory.Create("city");
            int cityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            Entity city = Repo.GetOne(cityId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(city.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }

        }
    }
}