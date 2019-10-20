using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;

namespace KF.Domain.Interface
{
    public interface IUserRepository
    {
        User GetOne(string loginName);
        Entities GetList(int pageIndex, int pageSize);
    }
}
