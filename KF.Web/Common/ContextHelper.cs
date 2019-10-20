using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;

namespace KF.Web.Common
{
    public class ContextHelper
    {
        private HttpContext Context;

        private static Dictionary<int, string> Error = new Dictionary<int, string>();

        static ContextHelper()
        {
            Error.Add(601, "用户名不能为空");
            Error.Add(602, "用户未登录");
            Error.Add(603, "密码不能为空");
            Error.Add(604, "密码错误");
            Error.Add(605, "请先删除高校下的专业");
            Error.Add(606, "请先删除高校下的课程");
            Error.Add(607, "请先删除专业下设置的课程");
            Error.Add(608, "请先删除专业下的招生计划");
        }

        public ContextHelper(HttpContext context)
        {
            Context = context;
        }

        public Dictionary<string, string> FormToDictionary()
        {
            Dictionary<string, string> dic = new Dictionary<string, string>();
            NameValueCollection filter = Context.Request.Form;
            foreach (string key in filter.Keys)
            {
                if (!dic.ContainsKey(key)) dic.Add(key, filter[key]);
            }
            return dic;
        }

        public string GetParameterFromRequest(string name)
        {
            return Context.Request.Form[name];
        }

        public string GetImage(string name)
        {
            if (Context.Request.Files.Count == 0) return null;
            Stream stream = Context.Request.Files[name].InputStream;
            Bitmap bitmap = new Bitmap(stream);
            MemoryStream ms = new MemoryStream();
            bitmap.Save(ms, ImageFormat.Jpeg);
            return Convert.ToBase64String(ms.ToArray());
        }

        public void Response(string str)
        {
            Context.Response.Write(str);
        }

        public void ResponseError(string error)
        {
            Context.Response.StatusCode = 601;
            byte[] arrbyte = Encoding.UTF8.GetBytes(error.ToCharArray());
            Context.Response.StatusDescription = string.Join(",",arrbyte);
        }

        public void ResponseError(int errorCode)
        {
            Context.Response.StatusCode = errorCode;
            byte[] arrbyte = Encoding.UTF8.GetBytes(Error[errorCode].ToCharArray());
            Context.Response.StatusDescription = string.Join(",", arrbyte);
        }

        public void ResponseError(int code, string error)
        {
            Context.Response.StatusCode = code;
            byte[] arrbyte = Encoding.UTF8.GetBytes(error.ToCharArray());
            Context.Response.StatusDescription = string.Join(",", arrbyte);
        }

        public HttpSessionState GetSession()
        {
            return Context.Session;
        }

        public void Redirect(string url)
        {
            Context.Response.Redirect(url);
        }
    }
}