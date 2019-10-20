using KF.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;
using System.Data.SqlClient;
using System.Data;

namespace KF.Repository
{
    public class EnrollmentPlanRepository:BaseRepository,IEntityRepository,IEnrollmentPlanRepository
    {
        public Entity GetOne(int enrollmentPlanId)
        {
            string sql = " select EnrollmentPlanId,Year,UniversityId,PlanNumber,ProvinceId,Discipline,Tuition,MajorName,MajorCode,PlanType From EnrollmentPlan where EnrollmentPlanId = @EnrollmentPlanId ";
            SqlParameter prmEnrollmentPlanId = new SqlParameter("@EnrollmentPlanId", SqlDbType.Int) { Value = enrollmentPlanId };
            return Query(GetOne, sql, prmEnrollmentPlanId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("招生计划不存在");
                return null;
            }
            reader.Read();
            EnrollmentPlan enrollmentPlan = new EnrollmentPlan();
            enrollmentPlan.EnrollmentPlanId = reader.GetInt32(0);
            enrollmentPlan.Year = reader.GetInt32(1);
            enrollmentPlan.UniversityId = reader.GetInt32(2);
            enrollmentPlan.PlanNumber = reader.GetInt32(3);
            enrollmentPlan.ProvinceId = reader.GetInt32(4);
            enrollmentPlan.Discipline = reader.GetInt32(5);
            enrollmentPlan.Tuition = reader.GetInt32(6);
            enrollmentPlan.MajorName = reader.GetString(7);
            enrollmentPlan.MajorCode = reader.GetString(8);
            enrollmentPlan.PlanType = reader.GetInt32(9);
            return enrollmentPlan;
        }

        public Entity Update(Entity entity)
        {
            EnrollmentPlan enrollmentPlan = entity as EnrollmentPlan;
            if (!CheckUnique(enrollmentPlan)) return null;
            string sql = "update EnrollmentPlan set Year = @Year,PlanNumber = @PlanNumber,ProvinceId = @ProvinceId,Discipline = @Discipline,Tuition = @Tuition,MajorName = @MajorName,MajorCode = @MajorCode,PlanType = @PlanType where EnrollmentPlanId= @EnrollmentPlanId";
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = enrollmentPlan.Year };
            SqlParameter prmPlanNumber = new SqlParameter("@PlanNumber", SqlDbType.Int) { Value = enrollmentPlan.PlanNumber };
            SqlParameter prmProvinceId = new SqlParameter("@ProvinceId", SqlDbType.Int) { Value = enrollmentPlan.ProvinceId };
            SqlParameter prmEnrollmentPlanId = new SqlParameter("@EnrollmentPlanId", SqlDbType.Int) { Value = enrollmentPlan.EnrollmentPlanId };
            SqlParameter prmDiscipline = new SqlParameter("@Discipline", SqlDbType.Int) { Value = enrollmentPlan.Discipline };
            SqlParameter prmTuition = new SqlParameter("@Tuition", SqlDbType.Int) { Value = enrollmentPlan.Tuition };
            SqlParameter prmMajorName = new SqlParameter("@MajorName", SqlDbType.VarChar, 200) { Value = enrollmentPlan.MajorName };
            SqlParameter prmMajorCode = new SqlParameter("@MajorCode", SqlDbType.VarChar, 50) { Value = enrollmentPlan.MajorCode };
            SqlParameter prmPlanType = new SqlParameter("@PlanType", SqlDbType.Int) { Value = enrollmentPlan.PlanType };
            ExecuteNoQuery(sql, prmYear, prmPlanNumber, prmProvinceId, prmEnrollmentPlanId, prmDiscipline, prmTuition, prmMajorName, prmMajorCode, prmPlanType);
            return enrollmentPlan;
        }

        public Entity Add(Entity entity)
        {
            EnrollmentPlan enrollmentPlan = entity as EnrollmentPlan;
            if (!CheckUnique(enrollmentPlan)) return null;
            string sql = " insert into EnrollmentPlan(Year,UniversityId,PlanNumber,ProvinceId,Discipline,Tuition,MajorName,MajorCode,PlanType)values(@Year,@UniversityId,@PlanNumber,@ProvinceId,@Discipline,@Tuition,@MajorName,@MajorCode,@PlanType);select @EnrollmentPlanId = @@Identity";
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = enrollmentPlan.Year };
            SqlParameter prmMajorId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = enrollmentPlan.UniversityId };
            SqlParameter prmPlanNumber = new SqlParameter("@PlanNumber", SqlDbType.Int) { Value = enrollmentPlan.PlanNumber };
            SqlParameter prmProvinceId = new SqlParameter("@ProvinceId", SqlDbType.Int) { Value = enrollmentPlan.ProvinceId };
            SqlParameter prmDiscipline = new SqlParameter("@Discipline", SqlDbType.Int) { Value = enrollmentPlan.Discipline };
            SqlParameter prmTuition = new SqlParameter("@Tuition", SqlDbType.Int) { Value = enrollmentPlan.Tuition };
            SqlParameter prmMajorName = new SqlParameter("@MajorName", SqlDbType.VarChar, 100) { Value = enrollmentPlan.MajorName };
            SqlParameter prmMajorCode = new SqlParameter("@MajorCode", SqlDbType.VarChar, 50) { Value = enrollmentPlan.MajorCode };
            SqlParameter prmEnrollmentPlanId = new SqlParameter("@EnrollmentPlanId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            SqlParameter prmPlanType = new SqlParameter("@PlanType", SqlDbType.Int) { Value = enrollmentPlan.PlanType };
            ExecuteNoQuery(sql, prmYear, prmMajorId, prmPlanNumber, prmProvinceId, prmEnrollmentPlanId, prmDiscipline, prmTuition, prmMajorName, prmMajorCode, prmPlanType);
            return enrollmentPlan;
        }

        public int Delete(int enrollmentPlanId)
        {
            string sql = "delete from EnrollmentPlan where EnrollmentPlanId = @EnrollmentPlanId";
            SqlParameter prmEnrollmentPlanId = new SqlParameter("@EnrollmentPlanId", SqlDbType.Int) { Value = enrollmentPlanId };
            ExecuteNoQuery(sql, prmEnrollmentPlanId);
            return 1;
        }

        public Entities GetList(int universityId,int year,int pageIndex,int pageSize)
        {
            List<SqlParameter> lstPrm = new List<SqlParameter>();
            StringBuilder sb = new StringBuilder();
            sb.Append("select * from (");
            sb.Append("select row_number() over(Order by EnrollmentPlanId) rowNumber, EnrollmentPlanId,Year,PlanNumber,ProvinceId,Discipline,Tuition,MajorName,MajorCode,UniversityId from EnrollmentPlan where 1 = 1 ");
            if (universityId != 0)
            {
                sb.Append(" and UniversityId = @UniversityId ");
                SqlParameter prmMajorId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
                lstPrm.Add(prmMajorId);
            }
            if (year != 0)
            {
                sb.Append(" and Year = @Year ");
                SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = year };
                lstPrm.Add(prmYear);
            }
            else
            {
                sb.Append(string.Format(" and Year between {0} and {1} ", DateTime.Now.AddYears(-2).Year, DateTime.Now.Year));
            }
            sb.Append(string.Format(" ) a where a.rowNumber between {0} and {1}", (pageIndex - 1) * pageSize + 1, pageIndex * pageSize));
            return Query(GetList, sb.ToString(), lstPrm.ToArray());
        }

        private Entities GetList(SqlDataReader reader)
        {
            EnrollmentPlan enrollmentPlan;
            Entities entities = new Entities();
            while (reader.Read())
            {
                enrollmentPlan = new EnrollmentPlan();
                enrollmentPlan.EnrollmentPlanId = reader.GetInt32(1);
                enrollmentPlan.Year = reader.GetInt32(2);
                enrollmentPlan.PlanNumber = reader.GetInt32(3);
                enrollmentPlan.ProvinceId = reader.GetInt32(4);
                enrollmentPlan.Discipline = reader.GetInt32(5);
                enrollmentPlan.Tuition = reader.GetInt32(6);
                enrollmentPlan.MajorName = reader.GetString(7);
                enrollmentPlan.MajorCode = reader.GetString(8);
                enrollmentPlan.UniversityId = reader.GetInt32(9);
                entities.Add(enrollmentPlan);
            }
            return entities;
        }

        private bool CheckUnique(EnrollmentPlan enrollmentPlan)
        {
            string sql = @"select 1 from EnrollmentPlan 
                        where EnrollmentPlanId <> @EnrollmentPlanId and Discipline = @Discipline and MajorName = @MajorName
                        and Year = @Year and ProvinceId = @ProvinceId and PlanType = @PlanType";
            SqlParameter prmEnrollmentPlanId = new SqlParameter("@EnrollmentPlanId", SqlDbType.Int) { Value = enrollmentPlan.EnrollmentPlanId };
            SqlParameter prmDiscipline = new SqlParameter("@Discipline", SqlDbType.Int) { Value = enrollmentPlan.Discipline };
            SqlParameter prmMajorName = new SqlParameter("@MajorName", SqlDbType.VarChar, 100) { Value = enrollmentPlan.MajorName };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = enrollmentPlan.Year };
            SqlParameter prmProvinceId = new SqlParameter("@ProvinceId", SqlDbType.Int) { Value = enrollmentPlan.ProvinceId };
            SqlParameter prmPlanType = new SqlParameter("@PlanType", SqlDbType.Int) { Value = enrollmentPlan.PlanType };
            return Query(CheckUnique, sql, prmEnrollmentPlanId, prmDiscipline, prmMajorName, prmYear, prmProvinceId, prmPlanType);
        }

        private bool CheckUnique(SqlDataReader reader)
        {
            if (reader.HasRows)
            {
                SetError("招生计划已经存在");
                return false;
            }
            return true;
        }
    }
}
