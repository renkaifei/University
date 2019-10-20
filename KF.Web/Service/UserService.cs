using System;
using System.Web;
using KF.Repo;
using KF.Repo.Entities;
using KF.Web.Interface;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class UserService:BaseService,IGetOneBehavior,IAddBehavior,IUpdateBehavior,IDeleteBehavior
    {
        public UserService(HttpContext context)
            : base(context)
        { 
        }

        public void GetOne()
        {
            User user = new User();
            user.UserId = int.Parse(GetParameterFromRequest("userId"));
            UserDomain domain = new UserDomain(user);
            if (domain.GetOne())
            {
                Response(user.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Add()
        {
            User user = new User();
            user.UserName = GetParameterFromRequest("userName");
            user.LoginName = GetParameterFromRequest("loginName");
            user.Pwd = GetParameterFromRequest("pwd");
            UserDomain domain = new UserDomain(user);
            if (domain.Add())
            {
                Response(user.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Update()
        {
            User user = new User();
            user.UserId = int.Parse(GetParameterFromRequest("userId"));
            user.UserName = GetParameterFromRequest("userName");
            user.LoginName = GetParameterFromRequest("loginName");
            user.Pwd = GetParameterFromRequest("pwd");
            UserDomain domain = new UserDomain(user);
            if (domain.Update())
            {
                Response(user.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void Delete()
        {
            User user = new User();
            user.UserId = int.Parse(GetParameterFromRequest("userId"));
            UserDomain domain = new UserDomain(user);
            if (domain.Delete())
            {
                Response("1");
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}