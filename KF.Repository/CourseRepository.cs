using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;
using KF.Domain.Interface;
using System.Collections.Specialized;
using System.Data.SqlClient;
using System.Data;

namespace KF.Repository
{
    class CourseRepository : BaseRepository, IEntityRepository, ICourseRepository
    {
        public Entity GetOne(int courseId)
        {
            string sql = "select CourseId,CourseName,CourseType from Course Where CourseId = @CourseId";
            SqlParameter prmCourseId = new SqlParameter("@CourseId", SqlDbType.Int) { Value = courseId };
            return Query(GetOne, sql, prmCourseId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("课程不存在");
                return null;
            }
            reader.Read();
            Course course = new Course();
            course.CourseId = reader.GetInt32(0);
            course.CourseName = reader.GetString(1);
            course.CourseType = (CourseType)reader.GetInt32(2);
            return course;
        }

        public Entity Update(Entity entity)
        {
            Course course = entity as Course;
            if (!CheckUnique(course)) return null;
            string sql = "update course set coursename = @coursename,CourseType = @CourseType where courseid = @courseid";
            SqlParameter prmCourseName = new SqlParameter("@coursename", SqlDbType.VarChar, 200) { Value = course.CourseName };
            SqlParameter prmCourseType = new SqlParameter("@CourseType", SqlDbType.Int) { Value = (int)course.CourseType };
            SqlParameter prmCourseId = new SqlParameter("@courseid", SqlDbType.Int) { Value = course.CourseId };
            ExecuteNoQuery(sql, prmCourseId, prmCourseName, prmCourseType);
            return entity;
        }

        public Entity Add(Entity entity)
        {
            Course course = entity as Course;
            if (!CheckUnique(course)) return null;
            string sql = @"insert into course(coursename,courseord,courseType)
                         values(@coursename,(select isnull(max(courseord),0) + 1 from course),@CourseType);select @courseid = @@Identity";
            SqlParameter prmCourseName = new SqlParameter("@coursename", SqlDbType.VarChar, 200) { Value = course.CourseName };
            SqlParameter prmCourseType = new SqlParameter("@CourseType", SqlDbType.Int) { Value = (int)course.CourseType };
            SqlParameter prmCourseId = new SqlParameter("@courseid", SqlDbType.Int) { Direction = ParameterDirection.Output };
            ExecuteNoQuery(sql, prmCourseId, prmCourseName, prmCourseType);
            course.CourseId = (int)prmCourseId.Value;
            return entity;
        }

        public int Delete(int courseId)
        {

            string sql = "delete from course where courseid = @courseid";
            SqlParameter prmCourseId = new SqlParameter("@courseid", SqlDbType.Int) { Value = courseId };
            ExecuteNoQuery(sql, prmCourseId);
            return 1;
        }

        public Entities GetList() 
        {
            string sql = "select courseId,courseName,CourseType from Course order by CourseOrd";
            return Query(GetList, sql);
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities entities = new Entities();
            Course course;
            while (reader.Read())
            {
                course = new Course();
                course.CourseId = reader.GetInt32(0);
                course.CourseName = reader.GetString(1);
                course.CourseType = (CourseType)reader.GetInt32(2);
                entities.Add(course);
            }
            return entities;
        }

        private bool CheckUnique(Course course)
        {
            string sql = @" select 1
                            from course 
                            where courseid <> @courseid and courseName = @courseName ";
            SqlParameter prmcourseid = new SqlParameter("@courseid", SqlDbType.Int) { Value = course.CourseId };
            SqlParameter prmcourseName = new SqlParameter("@courseName", SqlDbType.VarChar, 50) { Value = course.CourseName };
            return Query(CheckUnique, sql, prmcourseid, prmcourseName);
        }

        private bool CheckUnique(SqlDataReader reader)
        {
            if (reader.HasRows)
            {
                SetError("课程已经存在");
                return false;
            }
            else
            {
                return true;
            }
        }
    }
}
