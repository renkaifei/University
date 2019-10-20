using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;
using KF.Domain.Interface;
using System.Data;
using System.Data.SqlClient;
using System.IO;

namespace KF.Repository
{
    public class CompanyRepository:BaseRepository,IEntityRepository,ICompanyRepository 
    {

        public Entity GetOne(int companyId)
        {
            string sql = "select CompanyId,CompanyName,CompanyAddress,CityId,CompanyAbstract from Company where CompanyId = @CompanyId ";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = companyId };
            return Query(GetOne, sql, prmCompanyId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("公司不存在");
                return null;
            }
            reader.Read();
            Company company = new Company();
            company.CompanyId = reader.GetInt32(0);
            company.CompanyName = reader.GetString(1);
            company.CompanyAddress = reader.GetString(2);
            company.CityId = reader.GetInt32(3);
            Stream sm = reader.GetStream(4);
            byte[] arrbyte = new byte[sm.Length];
            sm.Read(arrbyte, 0, arrbyte.Length);
            company.CompanyAbstract = Encoding.UTF8.GetString(arrbyte);
            return company;
        }

        public Entity Update(Entity entity)
        {
            Company company = entity as Company;
            string sql = "update Company set CompanyName = @CompanyName,CompanyAddress = @CompanyAddress,CityId = @CityId,CompanyAbstract = @CompanyAbstract where CompanyId = @CompanyId ";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = company.CompanyId };
            SqlParameter prmCompanyName = new SqlParameter("@CompanyName", SqlDbType.VarChar, 200) { Value = company.CompanyName };
            SqlParameter prmCompanyAddress = new SqlParameter("@CompanyAddress", SqlDbType.VarChar, 200) { Value = company.CompanyAddress };
            SqlParameter prmCityId = new SqlParameter("@CityId", SqlDbType.Int) { Value = company.CityId };
            SqlParameter prmCompanyAbstract = new SqlParameter("@CompanyAbstract", SqlDbType.Image) { Value = DBNull.Value };
            if (!string.IsNullOrEmpty(company.CompanyAbstract))
            {
                prmCompanyAbstract.Value = Encoding.UTF8.GetBytes(company.CompanyAbstract);
            }
            ExecuteNoQuery(sql, prmCompanyId, prmCompanyName, prmCompanyAddress, prmCityId, prmCompanyAbstract);
            return company;
        }

        public Entity Add(Entity entity)
        {
            Company company = entity as Company;
            string sql = " insert into Company(CompanyName,CompanyAddress,CityId,CompanyAbstract,CompanyOrd)values(@CompanyName,@CompanyAddress,@CityId,@CompanyAbstract,(select isNull(max(CompanyOrd),0) + 1 from Company));select @CompanyId = @@Identity ";
            SqlParameter prmCompanyName = new SqlParameter("@CompanyName", SqlDbType.VarChar, 200) { Value = company.CompanyName };
            SqlParameter prmCompanyAddress = new SqlParameter("@CompanyAddress", SqlDbType.VarChar, 500) { Value = company.CompanyAddress };
            SqlParameter prmCityId = new SqlParameter("@CityId", SqlDbType.Int) { Value = company.CityId };
           
            SqlParameter prmCompanyAbstract = new SqlParameter("@CompanyAbstract", SqlDbType.Image) { Value = DBNull.Value };
            if (!string.IsNullOrEmpty(company.CompanyAbstract))
            {
                prmCompanyAbstract.Value = Encoding.UTF8.GetBytes(company.CompanyAbstract);
            }
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            
            ExecuteNoQuery(sql, prmCompanyName, prmCompanyAddress, prmCityId, prmCompanyAbstract,prmCompanyId);
            company.CompanyId = (int)prmCompanyId.Value;
            return company;
            
        }

        public int Delete(int companyId)
        {
            string sql = "delete from Company where CompanyId = @CompanyId ";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = companyId };
            ExecuteNoQuery(sql, prmCompanyId);
            return 1;
        }

        public Entities GetList(int pageIndex, int pageSize)
        {
           string sql = " select row_number() over(order by CompanyOrd ) as rowNumber,CompanyId,CompanyName,CompanyAddress from company ";
           sql = MakePageSql(sql, pageIndex, pageSize);
           return Query(GetList, sql);
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities entities = new Entities();
            Company company;
            while (reader.Read())
            {
                company = new Company();
                company.CompanyId = reader.GetInt32(1);
                company.CompanyName = reader.GetString(2);
                company.CompanyAddress = reader.GetString(3);
                entities.Add(company);
            }
            return entities;
        }
    }
}
