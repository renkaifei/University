using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Interface;
using KF.Domain.Model;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.Data;
using System.IO;

namespace KF.Repository
{
    public class MajorRepository : BaseRepository, IEntityRepository, IMajorRepository
    {
        public Entity GetOne(int majorId)
        {
            string sql = @" SELECT MajorId,MajorName,Degree,Code,EducationalSystem,Address,MajorOrd,UniversityId,IsProvinceFeature,IsCountryFeature,MajorIntroduction
                            FROM KF_Major 
                            Where MajorId = @MajorId";
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = majorId };
            return Query(GetOne, sql, prmMajorId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("该专业不存在");
                return null;
            }
            reader.Read();
            Major major = new Major();
            major.MajorId = reader.GetInt32(0);
            major.MajorName = reader.GetString(1);
            major.Degree = reader.GetInt32(2);
            major.Code = reader.GetString(3);
            major.EducationalSystem = reader.GetInt32(4);
            major.Address = reader.GetString(5);
            major.UniversityId = reader.GetInt32(7);
            major.IsProvinceFeature = reader.GetInt32(8);
            major.IsCountryFeature = reader.GetInt32(9);

            Stream sm = reader.GetStream(10);
            byte[] arrByte = new byte[sm.Length];
            sm.Read(arrByte, 0, Convert.ToInt32(sm.Length));
            major.MajorIntroduction = Encoding.UTF8.GetString(arrByte, 0, arrByte.Length);
            return major;
        }

        public Entity Update(Entity entity)
        {
            Major major = entity as Major;
            if (!CheckUnique(major)) return null;
            string sql = @"update KF_Major set MajorName = @MajorName,Degree = @Degree,Code=@Code,EducationalSystem=@EducationalSystem,
                          Address = @Address,IsProvinceFeature = @IsProvinceFeature,IsCountryFeature = @IsCountryFeature,MajorIntroduction = @MajorIntroduction where MajorId = @MajorId";
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = major.MajorId };
            SqlParameter prmMajorName = new SqlParameter("@MajorName", SqlDbType.VarChar, 200) { Value = major.MajorName };
            SqlParameter prmDegree = new SqlParameter("@Degree", SqlDbType.Int) { Value = major.Degree };
            SqlParameter prmCode = new SqlParameter("@Code", SqlDbType.VarChar, 20) { Value = major.Code };
            SqlParameter prmEducationalSystem = new SqlParameter("@EducationalSystem", SqlDbType.Int) { Value = major.EducationalSystem };
            SqlParameter prmAddress = new SqlParameter("@Address", SqlDbType.VarChar, 200) { Value = major.Address };
            SqlParameter prmIsProvinceFeature = new SqlParameter("@IsProvinceFeature", SqlDbType.Int) { Value = major.IsProvinceFeature };
            SqlParameter prmIsCountryFeature = new SqlParameter("@IsCountryFeature", SqlDbType.Int) { Value = major.IsCountryFeature };
            byte[] arrByte = Encoding.UTF8.GetBytes(major.MajorIntroduction);
            SqlParameter prmMajorIntroduction = new SqlParameter("@MajorIntroduction", SqlDbType.Image) { Value = arrByte };
            ExecuteNoQuery(sql, prmMajorId, prmMajorName, prmDegree, prmCode, prmEducationalSystem, prmAddress, prmIsProvinceFeature, prmIsCountryFeature, prmMajorIntroduction);
            return major;
        }

        public Entity Add(Entity entity)
        {
            Major major = entity as Major;
            if (!CheckUnique(major)) return null;
            string sql = @"insert into KF_Major(MajorName,Degree,Code,EducationalSystem,Address,MajorOrd,UniversityId,IsProvinceFeature,IsCountryFeature,MajorIntroduction)
                            values(@MajorName,@Degree,@Code,@EducationalSystem,@Address,(select isNull(max(MajorOrd),0) + 1 from KF_Major),@UniversityId,@IsProvinceFeature,@IsCountryFeature,@MajorIntroduction);
                            select @MajorId = @@Identity";
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            SqlParameter prmMajorName = new SqlParameter("@MajorName", SqlDbType.VarChar, 200) { Value = major.MajorName };
            SqlParameter prmDegree = new SqlParameter("@Degree", SqlDbType.Int) { Value = major.Degree };
            SqlParameter prmCode = new SqlParameter("@Code", SqlDbType.VarChar, 20) { Value = major.Code };
            SqlParameter prmEducationalSystem = new SqlParameter("@EducationalSystem", SqlDbType.Int) { Value = major.EducationalSystem };
            SqlParameter prmAddress = new SqlParameter("@Address", SqlDbType.VarChar, 200) { Value = major.Address };
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = major.UniversityId };
            SqlParameter prmIsProvinceFeature = new SqlParameter("@IsProvinceFeature", SqlDbType.Int) { Value = major.IsProvinceFeature };
            SqlParameter prmIsCountryFeature = new SqlParameter("@IsCountryFeature", SqlDbType.Int) { Value = major.IsCountryFeature };
            byte[] arrByte = Encoding.UTF8.GetBytes(major.MajorIntroduction);
            SqlParameter prmMajorIntroduction = new SqlParameter("@MajorIntroduction", SqlDbType.Image) { Value = arrByte };
            ExecuteNoQuery(sql, prmMajorId, prmMajorName, prmDegree, prmCode, prmEducationalSystem,
                prmAddress, prmUniversityId, prmIsCountryFeature, prmIsProvinceFeature, prmMajorIntroduction);
            return entity;
        }

        public int Delete(int majorId)
        {
            string sql = "delete from KF_Major where MajorId = @MajorId";
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = majorId };
            ExecuteNoQuery(sql, prmMajorId);
            return 1;
        }

        public Entities GetList(string majorName,int universityId)
        {
            List<SqlParameter> lstPrm = new List<SqlParameter>();
            string sql = @" SELECT MajorId,MajorName,Address,Code,IsProvinceFeature,IsCountryFeature
                            FROM KF_Major 
                            Where UniversityId = @UniversityId  ";
            if (!string.IsNullOrEmpty(majorName))
            {
                sql = sql + " and majorName like @MajorName ";
                lstPrm.Add(new SqlParameter("@MajorName", SqlDbType.VarChar, 200) { Value = string.Format("%{0}%", majorName) });
            }
            lstPrm.Add(new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId});
            sql = sql + " order by MajorOrd ";
            return Query(GetList, sql, lstPrm.ToArray());
        }

        private Entities GetList(SqlDataReader reader)
        {
            Major major;
            Entities entities = new Entities();
            while (reader.Read())
            {
                major = new Major();
                major.MajorId = reader.GetInt32(0);
                major.MajorName = reader.GetString(1);
                major.Address = reader.GetString(2);
                major.Code = reader.GetString(3);
                major.IsProvinceFeature = reader.GetInt32(4);
                major.IsCountryFeature = reader.GetInt32(5);
                entities.Add(major);
            }
            return entities;
        }

        private bool CheckUnique(Major major)
        {
            string sql = @"SELECT UniversityName ,MajorName
                            FROM KF_Major 
                            JOIN University ON KF_Major.UniversityId = University.UniversityId 
                            WHERE KF_Major.Code = @Code AND KF_Major.UniversityId = @UniversityId AND KF_Major.MajorId <> @MajorId";
            SqlParameter prmMajorName = new SqlParameter("@Code", SqlDbType.VarChar, 50) { Value = major.Code };
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = major.UniversityId };
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = major.MajorId };
            return Query(CheckUnique, sql, prmMajorId, prmMajorName, prmUniversityId);
        }

        private bool CheckUnique(SqlDataReader reader)
        {
            if (reader.HasRows)
            {
                SetError("专业已经存在");
                return false;
            }
            return true;
        }

        public int GetCountInUniversity(int universityId)
        {
            string sql = "select count(*) from KF_Major where UniversityId = @UniversityId";
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
            return Query<int>(GetCountInUniversity, sql, prmUniversityId);
        }

        private int GetCountInUniversity(SqlDataReader reader)
        {
            reader.Read();
            int count = reader.GetInt32(0);
            return count;
        }

        public Entities GetList(int companyId, int year,int universityId)
        {
            string sql = "select MajorId,MajorName from KF_Major where exists(select * from Recurit where  CompanyId = @CompanyId and Year = @Year and KF_Major.UniversityId = @UniversityId and KF_Major.MajorId = Recurit.MajorId )";
            SqlParameter prmCompanyId = new SqlParameter("@CompanyId", SqlDbType.Int) { Value = companyId };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = year };
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
            return Query(GetListInRecurit, sql, prmCompanyId, prmYear,prmUniversityId);
        }

        private Entities GetListInRecurit(SqlDataReader reader)
        {
            Major major;
            Entities entities = new Entities();
            while (reader.Read())
            {
                major = new Major();
                major.MajorId = reader.GetInt32(0);
                major.MajorName = reader.GetString(1);
                entities.Add(major);
            }
            return entities;
        }
    }
}
