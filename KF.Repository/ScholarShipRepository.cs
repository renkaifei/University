using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Interface;
using KF.Domain.Model;
using System.Data.SqlClient;
using System.Data;
using System.IO;

namespace KF.Repository
{
    public class ScholarShipRepository : BaseRepository, IEntityRepository, IScholarShipRepository
    {

        public Entity GetOne(int scholarShipId)
        {
            string sql = "select ScholarShipId,ScholarShipName,ScholarShipAbstract,UniversityId,ScholarShipTotal,StartYear,EndYear from ScholarShip where ScholarShipId = @ScholarShipId ";
            SqlParameter prmScholarShipId = new SqlParameter("@ScholarShipId", SqlDbType.Int) { Value = scholarShipId };
            return Query(GetOne, sql, prmScholarShipId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("奖学金不存在");
                return null;
            }
            reader.Read();
            ScholarShip scholarShip = new ScholarShip();
            scholarShip.ScholarShipId = reader.GetInt32(0);
            scholarShip.ScholarShipName = reader.GetString(1);
            using (Stream stream = reader.GetStream(2))
            {
                byte[] arrByte = new byte[stream.Length];
                stream.Read(arrByte, 0, arrByte.Length);
                scholarShip.ScholarShipAbstract = Encoding.UTF8.GetString(arrByte);
            }
            scholarShip.UniversityId = reader.GetInt32(3);
            scholarShip.ScholarShipTotal = reader.GetInt32(4);
            scholarShip.StartYear = reader.GetInt32(5);
            scholarShip.EndYear = reader.GetInt32(6);
            return scholarShip;
        }

        public Entity Update(Entity entity)
        {
            ScholarShip scholarShip = entity as ScholarShip;
            string sql = @"update ScholarShip set ScholarShipName = @ScholarShipName,ScholarShipTotal = @ScholarShipTotal,ScholarShipAbstract = @ScholarShipAbstract,
                            StartYear = @StartYear,EndYear = @EndYear where ScholarShipId = @ScholarShipId";
            SqlParameter prmScholarShipId = new SqlParameter("@ScholarShipId", SqlDbType.Int) { Value = scholarShip.ScholarShipId };
            SqlParameter prmScholarShipName = new SqlParameter("@ScholarShipName", SqlDbType.VarChar, 200) { Value = scholarShip.ScholarShipName };
            SqlParameter prmScholarShipTotal = new SqlParameter("@ScholarShipTotal", SqlDbType.Int) { Value = scholarShip.ScholarShipTotal };
            byte[] arrbyte = Encoding.UTF8.GetBytes(scholarShip.ScholarShipAbstract);
            SqlParameter prmScholarShipAbstract = new SqlParameter("@ScholarShipAbstract", SqlDbType.Image) { Value = arrbyte };
            SqlParameter prmStartYear = new SqlParameter("@StartYear", SqlDbType.Int) { Value = scholarShip.StartYear };
            SqlParameter prmEndYear = new SqlParameter("@EndYear", SqlDbType.Int) { Value = scholarShip.EndYear };
            ExecuteNoQuery(sql, prmScholarShipId, prmScholarShipName, prmScholarShipAbstract,
                prmScholarShipTotal, prmStartYear, prmEndYear);
            return scholarShip;
        }

        public Entity Add(Entity entity)
        {
            ScholarShip scholarShip = entity as ScholarShip;
            string sql = @"insert into ScholarShip(ScholarShipName,ScholarShipAbstract,ScholarShipTotal,UniversityId,StartYear,EndYear)values
                            (@ScholarShipName,@ScholarShipAbstract,@ScholarShipTotal,@UniversityId,@StartYear,@EndYear);select @ScholarShipId = @@Identity";
            SqlParameter prmScholarShipId = new SqlParameter("@ScholarShipId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            SqlParameter prmScholarShipName = new SqlParameter("@ScholarShipName", SqlDbType.VarChar, 200) { Value = scholarShip.ScholarShipName };
            byte[] arrScholarShipAbstract = Encoding.UTF8.GetBytes(scholarShip.ScholarShipAbstract);
            SqlParameter prmScholarShipAbstract = new SqlParameter("@ScholarShipAbstract", SqlDbType.Image) { Value = arrScholarShipAbstract };
            SqlParameter prmScholarShipTotal = new SqlParameter("@ScholarShipTotal", SqlDbType.Int) { Value = scholarShip.ScholarShipTotal };
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = scholarShip.UniversityId };
            SqlParameter prmStartYear = new SqlParameter("@StartYear", SqlDbType.Int) { Value = scholarShip.StartYear };
            SqlParameter prmEndYear = new SqlParameter("@EndYear", SqlDbType.Int) { Value = scholarShip.EndYear };
            ExecuteNoQuery(sql, prmScholarShipId, prmScholarShipName,
                prmScholarShipTotal, prmScholarShipAbstract, prmStartYear, prmEndYear, prmUniversityId);
            return scholarShip;
        }

        public int Delete(int scholarShipId)
        {
            string sql = "delete from ScholarShip where ScholarShipId = @ScholarShipId";
            SqlParameter prmScholarShipId = new SqlParameter("@ScholarShipId", SqlDbType.Int) { Value = scholarShipId };
            ExecuteNoQuery(sql, prmScholarShipId);
            return 1;
        }

        public Entities GetList(int universityId, int pageIndex, int pageSize)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select * from ( ");
            sb.Append(@" select row_number() over(order by ScholarShipId) as rowNumber, ScholarShipId,ScholarShipName,ScholarShipTotal
                            from ScholarShip where UniversityId = @UniversityId ");
            sb.Append(string.Format(" ) a where a.rowNumber between {0} and {1}", (pageIndex - 1) * pageSize + 1, pageIndex * pageSize));
            SqlParameter prmUniversityId = new SqlParameter("@UniversityId", SqlDbType.Int) { Value = universityId };
            return Query(GetList, sb.ToString(), prmUniversityId);
            
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities entities = new Entities();
            ScholarShip scholarShip;
            while (reader.Read())
            {
                scholarShip = new ScholarShip()
                {
                    ScholarShipId = reader.GetInt32(1),
                    ScholarShipName = reader.GetString(2),
                    ScholarShipTotal = reader.GetInt32(3)
                };
                entities.Add(scholarShip);
            }
            return entities;
        }

    }
}
