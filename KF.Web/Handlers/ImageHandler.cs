using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Common;
using System.Drawing;
using System.IO;

namespace KF.Web.Handlers
{
    public class ImageHandler:IHttpHandler 
    {
        public bool IsReusable
        {
            get { return true; }
        }

        private HttpContext Context;

        public void ProcessRequest(HttpContext context)
        {
            Context = context;

            string option = Context.Request.Form["option"];
            switch (option)
            {
                case "preview":
                    Preview();
                    break;
            }

        }

        private void Preview()
        {
            ContextHelper helper = new ContextHelper(Context);
            string imageBase64 = helper.GetImage("previewImage");
            helper.Response(imageBase64);
        }
    }
}