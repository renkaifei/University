using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using KF.Domain.Model;
using KF.Domain.Interface;
using KF.Repository;
using KF.Util;
using System.Text;

namespace KF.UniversityWeb.Handlers
{
    public class UserHandler : IHttpHandler, IRequiresSessionState
    {

        public bool IsReusable
        {
            get { return false; }
        }

        public void ProcessRequest(HttpContext context)
        {
            string option = context.Request.Form["option"].ToLower();
            if (option == "login")
            {
                IUserRepository Repo = new UserRepository();
                string loginName = context.Request.Form["loginName"];
                string pwd = context.Request.Form["pwd"];
                User user = Repo.GetOne(loginName);
                MD5Crypt md5 = new MD5Crypt();
                pwd = md5.Encrypt(pwd);
                if (user.Pwd.Equals(pwd))
                {
                    context.Session["userId"] = user.UserId;
                    user.Pwd = "";
                    context.Response.Write(user.Serialize());
                }
                else
                {
                    context.Response.StatusCode = 604;
                    byte[] arrbyte = Encoding.UTF8.GetBytes("用户名密码错误");
                    context.Response.StatusDescription = string.Join(",", arrbyte);
                }
            }
        }
    }
}