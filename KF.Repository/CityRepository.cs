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

namespace KF.Repository
{
    public class CityRepository:BaseRepository,IEntityRepository,ICityRepository
    {  

        public Entities GetList(int provinceId)
        {
            string sql = "select cityid,cityname,provinceid from city where provinceid = @provinceid";
            SqlParameter prmProvinceId = new SqlParameter("@provinceid", SqlDbType.Int) { Value = provinceId };
            return Query<Entities>(GetList, sql, prmProvinceId);
        }

        private Entities GetList(SqlDataReader reader)
        {
            City city;
            Entities citys = new Entities();
            while (reader.Read())
            {
                city = new City();
                city.CityId = reader.GetInt32(0);
                city.CityName = reader.GetString(1);
                city.ProvinceId = reader.GetInt32(2);
                citys.Add(city);
            }
            return citys;
        }

        public Entity Update(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entity Add(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entity GetOne(int cityId)
        {
            string sql = "select cityid,cityname,provinceid from city where cityid = @cityid";
            SqlParameter prmCityId = new SqlParameter("@cityid", SqlDbType.Int) { Value = cityId };
            return Query(GetOne, sql, prmCityId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("该城市不存在");
                return null;
            }
            reader.Read();
            City city = new City();
            city.CityId = reader.GetInt32(0);
            city.CityName = reader.GetString(1);
            return city;
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
