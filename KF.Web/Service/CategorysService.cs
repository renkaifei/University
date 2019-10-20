using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Web;

namespace KF.Web.Service
{
    public class CategorysService:BaseService,IGetListBehavior
    {
        public CategorysService(HttpContext context)
            : base(context)
        { }

        public void GetList()
        {
            Categorys categorys = new Categorys();
            CategorysDomain domain = new CategorysDomain(categorys);
            if (domain.GetList())
            {
                Response(categorys.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}