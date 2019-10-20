using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Repo.Entities;
using KF.Repo.Domain;
using KF.Repo.Common;
using System.Web.Security;

namespace KF.Web.Service
{
    public class LoginService:BaseService
    {
        public LoginService(HttpContext context)
            :base(context)
        { }

        public void Login()
        {
            User user = new User();
            user.LoginName = GetParameterFromRequest("loginName");

            UserDomain domain = new UserDomain(user);
            if (domain.GetOne())
            {
                MD5Crypt md5 = new MD5Crypt();
                string pwd = md5.Encrypt(GetParameterFromRequest("pwd"));
                if (user.Pwd == pwd)
                {
                    HttpContext.Current.Session["userId"] = user.UserId;
                    Response(user.Serialize());
                }
                else
                {
                    ResponseError("用户名或密码不正确");
                }
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }

        public void LoginOut() 
        {
            HttpContext.Current.Session.Remove("userId");
        }
    }
}