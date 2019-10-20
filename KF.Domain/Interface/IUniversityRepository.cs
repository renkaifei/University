using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;

namespace KF.Domain.Interface
{
    public interface IUniversityRepository:IError
    {
        Entity GetOneBasic(int universityId);
        Entities GetList(int provinceId, int cityId, int pageIndex, int pageSize);
        Entities GetList(string universityName);
        Entities GetList(int companyId, int year);
    }
}
