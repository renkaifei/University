using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Domain.Model;
using KF.Domain.Interface;

namespace KF.Web.Handlers
{
    public class HoursePriceHandler:BaseHandler
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
            else if (option == "add")
            {
                Add();
            }
            else if (option == "update")
            {
                Update();
            }
            else if (option == "delete")
            {
                Delete();
            }
        }

        private void GetList()
        {
            IEntityRepository Repo = factory.Create("hourseprice");
            IHoursePriceRepository HoursePriceRepository = Repo as IHoursePriceRepository;
            int cityId = int.Parse(Helper.GetParameterFromRequest("cityId"));
            int year = int.Parse(Helper.GetParameterFromRequest("year"));
            int areaId = int.Parse(Helper.GetParameterFromRequest("areaId"));
            int pageIndex = int.Parse(Helper.GetParameterFromRequest("pageIndex"));
            int pageSize = int.Parse(Helper.GetParameterFromRequest("pageSize"));

            Entities entities = HoursePriceRepository.GetList(cityId,year,areaId,pageIndex,pageSize);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entities.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void GetOne()
        {
            IEntityRepository Repo = factory.Create("hourseprice");
            int hoursePriceId = int.Parse(Helper.GetParameterFromRequest("hoursePriceId"));
            Entity hoursePrice = Repo.GetOne(hoursePriceId);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(hoursePrice.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Add()
        {
            Entity entity = entityFactory.Create("hourseprice");
            entity.Initialize(Helper.FormToDictionary());

            IEntityRepository Repo = factory.Create("hourseprice");
            entity = Repo.Add(entity);
            if (string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entity.Serialize());
            }
        }

        private void Update()
        {
            Entity entity = entityFactory.Create("hourseprice");
            entity.Initialize(Helper.FormToDictionary());
            IEntityRepository Repo = factory.Create("hourseprice");
            entity = Repo.Update(entity);
            if(string.IsNullOrEmpty(Repo.ErrorMessage))
            {
                Helper.Response(entity.Serialize());
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }

        private void Delete()
        {
            IEntityRepository Repo = factory.Create("hourseprice");
            int hoursePriceId = int.Parse(Helper.GetParameterFromRequest("hoursePriceId"));
            int result = Repo.Delete(hoursePriceId);
            if (result == 1)
            {
                Helper.Response("1");
            }
            else
            {
                Helper.ResponseError(Repo.ErrorMessage);
            }
        }
    }
}