using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using KF.Web.Interface;
using KF.Repo.Entities;
using KF.Repo.Domain;

namespace KF.Web.Service
{
    public class UsersService : BaseService, IGetListBehavior
    {
        public UsersService(HttpContext context) :
            base(context)
        {

        }

        public void GetList()
        {
            Users users = new Users();
            UsersDomain domain = new UsersDomain(users);
            domain.SetFilter(GetAllParameters());
            if (domain.GetList())
            {
                Response(users.Serialize());
            }
            else
            {
                ResponseError(domain.ErrorMessage);
            }
        }
    }
}