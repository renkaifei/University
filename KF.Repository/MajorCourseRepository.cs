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
    public class MajorCourseRepository:BaseRepository,IEntityRepository,IMajorCourseRepository
    {

        public Entity GetOne(int majorCourseId)
        {
            throw new NotImplementedException();
        }

        public Entity Update(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entity Add(Entity entity)
        {
            MajorCourse majorCourse = entity as MajorCourse;
            string sql = "insert into MajorCourse(MajorId,CourseId)values(@MajorId,@CourseId);select @MajorCourseId = @@Identity";
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = majorCourse.MajorId };
            SqlParameter prmCourseId = new SqlParameter("@CourseId", SqlDbType.Int) { Value = majorCourse.CourseId };
            SqlParameter prmMajorCourseId = new SqlParameter("@MajorCourseId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            ExecuteNoQuery(sql, prmMajorId, prmCourseId, prmMajorCourseId);
            majorCourse.MajorCourseId = (int)prmMajorCourseId.Value;
            return majorCourse;
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }

        public int Delete(int majorId,int courseId)
        {
            string sql = "delete from MajorCourse where MajorId = @MajorId and CourseId = @CourseId";
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = majorId };
            SqlParameter prmCourseId = new SqlParameter("@CourseId", SqlDbType.Int) { Value = courseId };
            ExecuteNoQuery(sql, prmCourseId, prmMajorId);
            return 1;
        }

        public Entities GetList(int majorId)
        {
            List<SqlParameter> lstPrm = new List<SqlParameter>();
            StringBuilder sb = new StringBuilder("select MajorCourseId,MajorId,CourseId from MajorCourse where 1 = 1 ");
            if (majorId != 0)
            {
                sb.Append(string.Format(" and MajorId = @MajorId "));
                lstPrm.Add(new SqlParameter("@MajorId", SqlDbType.Int) { Value = majorId });
            }
            return Query(GetList, sb.ToString(), lstPrm.ToArray());
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities entities = new Entities();
            MajorCourse majorCourse;
            while (reader.Read())
            {
                majorCourse = new MajorCourse();
                majorCourse.MajorCourseId = reader.GetInt32(0);
                majorCourse.MajorId = reader.GetInt32(1);
                majorCourse.CourseId = reader.GetInt32(2);
                entities.Add(majorCourse);
            }
            return entities;
        }

        public int CourseAssignToMajorCount(int courseId)
        {
            string sql = "select count(*) from MajorCourse where CourseId = @CourseId ";
            SqlParameter prmCourseId = new SqlParameter("@CourseId", SqlDbType.Int) { Value = courseId };
            return Query<int>(CourseAssignToMajorCount, sql, prmCourseId);
        }

        private int CourseAssignToMajorCount(SqlDataReader reader)
        {
            reader.Read();
            int count = reader.GetInt32(0);
            return count;
        }

        public int CourseInMajorCount(int majorId)
        {
            string sql = " select count(*) from MajorCourse where MajorId = @MajorId ";
            SqlParameter prmMajorId = new SqlParameter("@MajorId", SqlDbType.Int) { Value = majorId };
            return Query<int>(CourseInMajorCount, sql, prmMajorId);
        }

        private int CourseInMajorCount(SqlDataReader reader)
        {
            reader.Read();
            int count = reader.GetInt32(0);
            return count;
        } 
    }
}
