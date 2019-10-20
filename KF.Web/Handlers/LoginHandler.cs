using KF.Domain.Model;
using KF.Domain.Interface;
using KF.Repository;
using KF.Web.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;

namespace KF.Web.Handlers
{
    public class LoginHandler : IHttpHandler, IRequiresSessionState
    {
        public bool IsReusable
        {
            get { return false; }
        }

        private ContextHelper Helper { get; set; }

        public void ProcessRequest(HttpContext context)
        {
            Helper = new ContextHelper(context);

            string option = Helper.GetParameterFromRequest("option").ToLower();

            if (option == "login")
            {
                Login();
            }
            else if (option == "loginout")
            {
                LoginOut();
            }

        }

        private void Login()
        {
            RepositoryFactory factory = new RepositoryFactory();
            IEntityRepository Repo = factory.Create("user");

            string loginName = Helper.GetParameterFromRequest("loginName");
            IUserRepository UserRepo = Repo as IUserRepository;
            User user = UserRepo.GetOne(loginName);
            
            MD5Crypt md5 = new MD5Crypt();
            string pwd = md5.Encrypt(Helper.GetParameterFromRequest("pwd"));

            if (user.Pwd != pwd)
            {
                Helper.ResponseError(604);
                return;
            }

            Helper.GetSession().Add("userId", user.UserId);
            Helper.Response(user.Serialize());
        }

        private void LoginOut()
        {
            Helper.GetSession().Remove("userId");
            Helper.Redirect("/login.html");
        }
    }
}