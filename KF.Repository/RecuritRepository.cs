using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Interface;
using KF.Domain.Model;
using System.Data.SqlClient;
using System.Data;

namespace KF.Repository
{
    public class RecuritRepository:BaseRepository,IEntityRepository,IRecuritRepository
    {

        public Entity GetOne(int recuritId)
        {
            string sql = "select recuritId,companyId,year,majorId from Recurit where RecuritId = @RecuritId";
            SqlParameter prmRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Value = recuritId };
            return Query(GetOne, sql, prmRecuritId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("没有相关的记录");
                return null;
            }
            reader.Read();
            Recurit recurit = new Recurit();
            recurit.RecuritId = reader.GetInt32(0);
            recurit.CompanyId = reader.GetInt32(1);
            recurit.Year = reader.GetInt32(2);
            recurit.MajorId = reader.GetInt32(3);
            return recurit;
        }

        public Entity Update(Entity entity)
        {
            Recurit recurit = entity as Recurit;
            string sql = "update recurit set CompanyId = @CompanyId,Year = @Year,MajorId = @MajorId where RecuritId = @RecuritId ";
            SqlParameter prmRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Value = recurit.RecuritId };
            ExecuteNoQuery(sql, prmRecuritId);
            return entity;
        }

        public Entity Add(Entity entity)
        {
            Recurit recurit = entity as Recurit;
            string sql = "insert into Recurit(CompanyId,Year,MajorId)values(@CompanyId,@Year,@MajorId);select @RecuritId = @@Identity";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = recurit.CompanyId };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = recurit.Year };
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = recurit.MajorId };
            SqlParameter prmRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            ExecuteNoQuery(sql, prmCompanyId, prmYear, prmMajorId,prmRecuritId);
            recurit.RecuritId = (int)prmRecuritId.Value; 
            return recurit;
        }

        public int Delete(int recuritId)
        {
            string sql = "delete from Recurit where RecuritId = @RecuritId";
            SqlParameter prmRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Value = recuritId };
            ExecuteNoQuery(sql, prmRecuritId);
            return 1;
        }

       
    }
}
