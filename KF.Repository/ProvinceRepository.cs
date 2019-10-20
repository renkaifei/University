using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KF.Domain.Model;
using KF.Domain.Interface;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Specialized;

namespace KF.Repository
{
    /// <summary>
    /// 省份仓库
    /// </summary>
    public class ProvinceRepository:BaseRepository,IEntityRepository,IProvinceRepository
    {

        public Entities GetList()
        {
            string sql = "select provinceId,provinceName from province";
            return Query<Entities>(GetList, sql);
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities provinces = new Entities();
            Province province;
            while (reader.Read())
            {
                province = new Province();
                province.ProvinceId = reader.GetInt32(0);
                province.ProvinceName = reader.GetString(1);
                provinces.Add(province);
            }
            return provinces;
        }

        public Entity Update(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entity Add(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entity GetOne(int provinceId)
        {
            string sql = "select provinceid,provincename from province where provinceid = @provinceid";
            SqlParameter prmProvinceId = new SqlParameter("@provinceid", SqlDbType.Int) { Value = provinceId };
            return Query(GetOneById, sql, prmProvinceId);
        }

        private Entity GetOneById(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("省份不存在不存在");
                return null;
            }
            reader.Read();
            Province province = new Province();
            province.ProvinceId = reader.GetInt32(0);
            province.ProvinceName = reader.GetString(1);
            return province;
        }

        public int Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
