using KF.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Interface
{
    public interface IScholarShipRepository
    {
        Entities GetList(int universityId, int pageIndex, int pageSize);
    }
}
