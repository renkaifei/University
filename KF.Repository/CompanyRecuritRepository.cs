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
    public class CompanyRecuritRepository:BaseRepository,IEntityRepository
    {
        public Entity GetOne(int recuritId)
        {
            string sql = "select RecuritId,CompanyId,UniversityId,Year from CompanyRecurit where RecuritId = @RecuritId";
            SqlParameter prmRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Value = recuritId };
            return Query(GetOne, sql, prmRecuritId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("招聘信息不存在");
                return null;
            }
            CompanyRecruit recurit = new CompanyRecruit();
            recurit.RecruitId = reader.GetInt32(0);
            recurit.CompanyId = reader.GetInt32(1);
            recurit.UniversityId = reader.GetInt32(2);
            recurit.Year = reader.GetInt32(3);
            return recurit;
        }

        public Entity Update(Entity entity)
        {
            CompanyRecruit companyRecurit = entity as CompanyRecruit;
            string sql = "update CompanyRecurit set CompanyId = @CompanyId,UniversityId = @UniversityId,Year = @Year where RecuritId = @RecuritId ";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = companyRecurit.CompanyId };
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = companyRecurit.UniversityId };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = companyRecurit.Year };
            SqlParameter prmCompanyRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Value = companyRecurit.RecruitId };
            ExecuteNoQuery(sql, prmCompanyId, prmUniversityId, prmYear, prmCompanyRecuritId);
            return entity;
        }

        

        public Entity Add(Entity entity)
        {
            CompanyRecruit companyRecurit = entity as CompanyRecruit;
            string sql = "insert CompanyRecurit(CompanyId,UniversityId,Year)values(@CompanyId,@UniversityId,@Year);select @RecuritId = @@IDentity ";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = companyRecurit.CompanyId };
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = companyRecurit.UniversityId };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = companyRecurit.Year };
            SqlParameter prmCompanyRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            ExecuteNoQuery(sql, prmCompanyId, prmUniversityId, prmYear, prmCompanyRecuritId);
            companyRecurit.RecruitId = (int)prmCompanyRecuritId.Value;
            return entity;
        }

        public int Delete(int recuritId)
        {
            string sql = " delete from CompanyRecurit where RecuritId = @RecuritId ";
            SqlParameter prmRecuritId = new SqlParameter("@RecuritId", SqlDbType.Int) { Value = recuritId };
            ExecuteNoQuery(sql, prmRecuritId);
            return 1;
        }
    }
}
