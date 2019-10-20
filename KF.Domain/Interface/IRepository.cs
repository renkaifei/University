using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Specialized;
using KF.Domain.Model;

namespace KF.Domain.Interface
{
    public interface IEntityRepository:IError
    {
        Entity GetOne(int id);
        Entity Update(Entity entity);
        Entity Add(Entity entity);
        int Delete(int id);
    }
}
