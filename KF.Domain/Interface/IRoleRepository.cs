using KF.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Interface
{
    public interface IRoleRepository
    {
        Entities GetList();
    }
}
