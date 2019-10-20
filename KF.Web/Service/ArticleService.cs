using KF.Repo.Domain;
using KF.Repo.Entities;
using KF.Web.Interface;
using System.Linq;
using System.Web;

namespace KF.Web.Service
{
    public class ArticleService:BaseService,IGetOneBehavior,IAddBehavior,IUpdateBehavior,IDeleteBehavior
    {
        public ArticleService(HttpContext context):base(context)
        { 
        
        }

        public void GetOne()
        {
            Article article = new Article();
            article.ArticleId = int.Parse(GetParameterFromRequest("articleId"));
            ArticleDomain domain = new ArticleDomain(article);
            if (domain.GetOne())
            {
                Response(article.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
                
            }
        }

        public void Add()
        {
            Article article = new Article();
            article.ArticleTitle = GetParameterFromRequest("articleTitle");
            article.ArticleContent = GetParameterFromRequest("articleContent");
            article.Author = GetParameterFromRequest("author");
            article.ArticleType = int.Parse(GetParameterFromRequest("articleType"));
            ArticleDomain domain = new ArticleDomain(article);
            if (domain.Add())
            {
                Response(article.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Update()
        {
            Article article = new Article();
            article.ArticleId = int.Parse(GetParameterFromRequest("articleId"));
            article.ArticleTitle = GetParameterFromRequest("articleTitle");
            article.ArticleContent = GetParameterFromRequest("articleContent");
            article.Author = GetParameterFromRequest("author");
            article.ArticleType = int.Parse(GetParameterFromRequest("articleType"));
            ArticleDomain domain = new ArticleDomain(article);
            if (domain.Update())
            {
                Response(article.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            Article article = new Article();
            article.ArticleId = int.Parse(GetParameterFromRequest("articleId"));
            ArticleDomain domain = new ArticleDomain(article);
            if (domain.Delete())
            {
                Response(article.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}