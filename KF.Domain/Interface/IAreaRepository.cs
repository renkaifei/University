using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;

namespace KF.Domain.Interface
{
    public interface IAreaRepository
    {
        Entities GetList(int cityId);
    }
}
