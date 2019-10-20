using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;
using KF.Domain.Interface;
using System.Data.SqlClient;
using System.Data;

namespace KF.Repository
{
    public class AreaRepository : BaseRepository, IEntityRepository, IAreaRepository
    {
        public Entity Update(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entity Add(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entities GetList(int cityId)
        {
            string sql = " select AreaId,AreaName,CityId from Area where CityId = @CityId ";
            SqlParameter prmCityId = new SqlParameter("@CityId", SqlDbType.Int) { Value = cityId };
            return Query(GetList, sql, prmCityId);
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities entities = new Entities();
            Area area;
            while (reader.Read())
            {
                area = new Area()
                {
                    AreaId = reader.GetInt32(0),
                    AreaName = reader.GetString(1),
                    CityId = reader.GetInt32(2)
                };
                entities.Add(area);
            }
            return entities;
        }

        public Entity GetOne(int id)
        {
            throw new NotImplementedException();
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
