using KF.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KF.Domain.Interface
{
    public interface IMajorRepository
    {
        int GetCountInUniversity(int universityId);
        Entities GetList(string majorName, int universityId);
        Entities GetList(int companyId, int year,int universityId);
    }
}
