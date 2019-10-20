using KF.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.Data;
using System.IO;

namespace KF.Repository
{
    public class UniversityRepository : BaseRepository, IEntityRepository, IUniversityRepository
    {

        public Entity GetOne(int universityId)
        {
            string sql = " select UniversityId,UniversityName,UniversityAddress,CityId,UniversityAbstract,UniversityIcon,Undergraduate,Postgraduate,OverseasStudent,Is211,Is985,IsDoubleClass from University where UniversityId = @UniversityId ";
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
            return Query(GetOne, sql, prmUniversityId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("高校不存在");
                return null;
            }
            University university = new University();
            reader.Read();

            university.UniversityId = reader.GetInt32(0);
            university.UniversityName = reader.GetString(1);
            university.UniversityAddress = reader.GetString(2);
            university.CityId = reader.GetInt32(3);
            Stream sm = reader.GetStream(4);
            byte[] arrByte = new byte[sm.Length];
            sm.Read(arrByte, 0, Convert.ToInt32(sm.Length));
            university.UniversityAbstract = Encoding.UTF8.GetString(arrByte, 0, arrByte.Length);
            sm = reader.GetStream(5);
            arrByte = new byte[sm.Length];
            sm.Read(arrByte, 0, Convert.ToInt32(sm.Length));
            university.UniversityIcon = Convert.ToBase64String(arrByte);
            sm.Close();
            sm.Dispose();
            university.Undergraduate = reader.GetInt32(6);
            university.Postgraduate = reader.GetInt32(7);
            university.OverseasStudent = reader.GetInt32(8);
            university.Is211 = reader.GetInt32(9);
            university.Is985 = reader.GetInt32(10);
            university.IsDoubleClass = reader.GetInt32(11);
            return university;
        }

        public Entity GetOneBasic(int universityId)
        {
            string sql = " select UniversityId,UniversityName,UniversityAddress,CityId,UniversityAbstract,UniversityIcon,Undergraduate,Postgraduate,OverseasStudent,Is211,Is985,IsDoubleClass from University where UniversityId = @UniversityId ";
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
            return Query(GetOne, sql, prmUniversityId);
        }

        private Entity GetOneBasic(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("高校不存在");
                return null;
            }
            University university = new University();
            reader.Read();

            university.UniversityId = reader.GetInt32(0);
            university.UniversityName = reader.GetString(1);
            university.UniversityAddress = reader.GetString(2);
            university.CityId = reader.GetInt32(3);
            university.Undergraduate = reader.GetInt32(6);
            university.Postgraduate = reader.GetInt32(7);
            university.OverseasStudent = reader.GetInt32(8);
            university.Is211 = reader.GetInt32(9);
            university.Is985 = reader.GetInt32(10);
            university.IsDoubleClass = reader.GetInt32(11);
            return university;
        }

        public Entity Add(Entity entity)
        {
            University university = entity as University;
            if (!CheckUnique(university)) return null;
            string sql = @"insert into University(UniversityName,UniversityAddress,Undergraduate,Postgraduate,OverseasStudent,UniversityAbstract,CityId,
                                                    UniversityIcon,UniversityOrd,Is211,Is985,IsDoubleClass)
                           values(@UniversityName,@UniversityAddress,@Undergraduate,@Postgraduate,@OverseasStudent,@UniversityAbstract,@CityId,@UniversityIcon,(select isNull(max(UniversityOrd),0) + 1 from University),@Is211,@Is985,@IsDoubleClass);select @UniversityId = @@Identity";
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            SqlParameter prmUniversityName = new SqlParameter("@UniversityName", SqlDbType.VarChar, 200) { Value = university.UniversityName };
            SqlParameter prmUniversityAddress = new SqlParameter("@UniversityAddress", SqlDbType.VarChar, 200) { Value = university.UniversityAddress };
            SqlParameter prmUndergraduate = new SqlParameter("@Undergraduate", SqlDbType.Int) { Value = university.Undergraduate };
            SqlParameter prmPostgraduate = new SqlParameter("@Postgraduate", SqlDbType.Int) { Value = university.Postgraduate };
            SqlParameter prmOverseasStudent = new SqlParameter("@OverseasStudent", SqlDbType.Int) { Value = university.OverseasStudent };
            byte[] arrByte = Encoding.UTF8.GetBytes(university.UniversityAbstract);
            SqlParameter prmUniversityAbstract = new SqlParameter("@UniversityAbstract", SqlDbType.Image) { Value = arrByte };
            SqlParameter prmCityId = new SqlParameter("@CityId", SqlDbType.Int) { Value = university.CityId };
            SqlParameter prmUniversityIcon = new SqlParameter("@UniversityIcon", SqlDbType.Image);

            if (university.UniversityIcon == null)
            {
                prmUniversityIcon.Value = DBNull.Value;
            }
            else
            {
                prmUniversityIcon.Value = Convert.FromBase64String(university.UniversityIcon);
            }
            SqlParameter prmIs211 = new SqlParameter("@Is211", SqlDbType.Int) { Value = university.Is211 };
            SqlParameter prmIs985 = new SqlParameter("@Is985", SqlDbType.Int) { Value = university.Is985 };
            SqlParameter prmIsDoubleClass = new SqlParameter("@IsDoubleClass", SqlDbType.Int) { Value = university.IsDoubleClass };
            ExecuteNoQuery(sql, prmUniversityId, prmUniversityName, prmUniversityAddress, prmUniversityAbstract, prmUniversityIcon,
                prmUndergraduate, prmPostgraduate, prmOverseasStudent, prmCityId, prmIs211, prmIs985, prmIsDoubleClass);
            university.UniversityId = (int)prmUniversityId.Value;
            return entity;
        }

        public Entity Update(Entity entity)
        {
            University university = entity as University;
            if (!CheckUnique(university)) return null;
            string sql = @"update University Set UniversityName = @UniversityName,UniversityAddress = @UniversityAddress,Undergraduate = @Undergraduate,OverseasStudent= @OverseasStudent,
                        Postgraduate = @Postgraduate,UniversityAbstract = @UniversityAbstract,UniversityIcon = @UniversityIcon,Is211 = @Is211,Is985 = @Is985,IsDoubleClass = @IsDoubleClass
                        where UniversityId = @UniversityId ";
            SqlParameter prmUniverisityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = university.UniversityId };
            SqlParameter prmUniversityName = new SqlParameter("@UniversityName", SqlDbType.VarChar, 200) { Value = university.UniversityName };
            SqlParameter prmUndergraduate = new SqlParameter("@Undergraduate", SqlDbType.Int) { Value = university.Undergraduate };
            SqlParameter prmPostgraduate = new SqlParameter("@Postgraduate", SqlDbType.Int) { Value = university.Postgraduate };
            SqlParameter prmOverseasStudent = new SqlParameter("@OverseasStudent", SqlDbType.Int) { Value = university.OverseasStudent };
            SqlParameter prmUniversityAddress = new SqlParameter("@UniversityAddress", SqlDbType.VarChar, 200) { Value = university.UniversityAddress };
            SqlParameter prmCityId = new SqlParameter("@CityId", SqlDbType.Int) { Value = university.CityId };
            byte[] arrByte = Encoding.UTF8.GetBytes(university.UniversityAbstract);
            SqlParameter prmUniversityAbstract = new SqlParameter("@UniversityAbstract", SqlDbType.Image) { Value = arrByte };
            SqlParameter prmUniversityIcon = new SqlParameter("@UniversityIcon", SqlDbType.Image);
            if (university.UniversityIcon == null)
            {
                prmUniversityIcon.Value = DBNull.Value;
            }
            else
            {
                prmUniversityIcon.Value = Convert.FromBase64String(university.UniversityIcon);
            }
            SqlParameter prmIs211 = new SqlParameter("@Is211", SqlDbType.Int) { Value = university.Is211 };
            SqlParameter prmIs985 = new SqlParameter("@Is985", SqlDbType.Int) { Value = university.Is985 };
            SqlParameter prmIsDoubleClass = new SqlParameter("@IsDoubleClass", SqlDbType.Int) { Value = university.IsDoubleClass };
            ExecuteNoQuery(sql, prmUniverisityId, prmUniversityName, prmUniversityAddress, prmUniversityAbstract, prmUniversityIcon, prmUndergraduate,
                prmPostgraduate, prmOverseasStudent, prmIs211, prmIs985, prmIsDoubleClass);
            return entity;
        }

        public int Delete(int universityId)
        {
            string sql = "delete from University where UniversityId = @UniversityId";
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
            if (ExecuteNoQuery(sql, prmUniversityId))
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }

        public Entities GetList(int provinceId,int cityId,int pageIndex,int pageSize)
        { 
            List<SqlParameter> prmList = new List<SqlParameter>();
            StringBuilder sb = new StringBuilder();
            sb.Append(" select * from ( ");
            sb.Append("select row_number() over(order by UniversityOrd) rowNumber, UniversityId,UniversityName from University where 1 = 1 ");
            if (provinceId != 0)
            {
                sb.Append(" and exists (select 1 from City Where City.CityId = University.CityId and City.ProvinceId = @ProvinceId ) ");
                prmList.Add(new SqlParameter("@ProvinceId", SqlDbType.Int) { Value = provinceId });
            }
            if (cityId != 0)
            {
                sb.Append(" and CityId = @CityId ");
                prmList.Add(new SqlParameter("@CityId", SqlDbType.Int) { Value = cityId });
            }
            sb.Append(string.Format(" ) a where a.rowNumber between {0} and {1}", (pageIndex - 1) * pageSize + 1, pageIndex * pageSize));
            return Query(GetList, sb.ToString(), prmList.ToArray());
        }

        private Entities GetList(SqlDataReader reader)
        {
            University university;
            Entities entities = new Entities();
            while (reader.Read())
            {
                university = new University();
                university.UniversityId = reader.GetInt32(1);
                university.UniversityName = reader.GetString(2);
                entities.Add(university);
            }
            return entities;
        }

        public Entities GetList(string universityName)
        {
            string sql = "select UniversityId,UniversityName from University where UniversityName like @UniversityName order by UniversityOrd";
            SqlParameter prmUniversityName = new SqlParameter("@UniversityName", SqlDbType.VarChar, 200) { Value = string.Format("%{0}%", universityName) };
            return Query(GetListByName, sql, prmUniversityName);
        }

        private Entities GetListByName(SqlDataReader reader)
        {
            Entities entities = new Entities();
            University university;
            while (reader.Read())
            {
                university = new University();
                university.UniversityId = reader.GetInt32(0);
                university.UniversityName = reader.GetString(1);
                entities.Add(university);
            }
            return entities;
        }

        private bool CheckUnique(University university)
        {
            int universityId = university.UniversityId;
            string universityName = university.UniversityName;
            string sql = "select 1 from University where UniversityId <> @UniversityId and UniversityName = @UniversityName";
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
            SqlParameter prmUniversityName = new SqlParameter("@UniversityName", SqlDbType.VarChar, 200) { Value = universityName };
            return Query(CheckUnique, sql, prmUniversityId, prmUniversityName);
        }

        private bool CheckUnique(SqlDataReader reader)
        {
            if (reader.HasRows)
            {
                SetError("学校已经存在");
                return false;
            }
            return true;
        }

        public Entities GetList(int companyId, int year)
        {
            string sql = "select UniversityId,UniversityName from University where exists (select * from kf_Major where kf_Major.UniversityId = University.UniversityId and exists (select * from Recurit where KF_Major.MajorId = Recurit.MajorId and companyId = @CompanyId and Year = @Year))";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = companyId };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = year };
            return Query(GetListInRecurit, sql, prmCompanyId, prmYear);
        }

        private Entities GetListInRecurit(SqlDataReader reader)
        {
            Entities entities = new Entities();
            University university;
            while (reader.Read())
            {
                university = new University();
                university.UniversityId = reader.GetInt32(0);
                university.UniversityName = reader.GetString(1);
                entities.Add(university);
            }
            return entities;
        }
    }
}
