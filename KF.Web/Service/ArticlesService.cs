using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System;
using System.Web;

namespace KF.Web.Service
{
    public class ArticlesService:BaseService,IGetListBehavior
    {
        public ArticlesService(HttpContext context)
            : base(context)
        { }

        public void GetList()
        {
            Articles articles = new Articles();
            ArticlesDomain domain = new ArticlesDomain(articles);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(articles.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}