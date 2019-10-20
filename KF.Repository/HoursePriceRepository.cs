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
    public class HoursePriceRepository:BaseRepository,IEntityRepository,IHoursePriceRepository
    {

        public Entity GetOne(int hoursePriceId)
        {
            string sql = "select HoursePriceId,AreaId,Year,Month,Price from HoursePrice where hoursePriceId = @HoursePriceId";
            SqlParameter prmHoursePriceId = new SqlParameter("@HoursePriceId", SqlDbType.Int) { Value = hoursePriceId };
            return Query(GetOne, sql, prmHoursePriceId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("房价记录不存在");
                return null;
            }
            reader.Read();
            HoursePrice hoursePrice = new HoursePrice();
            hoursePrice.HoursePriceId = reader.GetInt32(0);
            hoursePrice.AreaId = reader.GetInt32(1);
            hoursePrice.Year = reader.GetInt32(2);
            hoursePrice.Month = reader.GetInt32(3);
            hoursePrice.Price = reader.GetInt32(4);
            return hoursePrice;
        }

        public Entity Update(Entity entity)
        {
            HoursePrice hoursePrice = entity as HoursePrice;
            string sql = "update hoursePrice set Price = @Price,Year = @Year,Month=@Month,AreaId = @AreaId where HoursePriceId = @HoursePriceId";
            SqlParameter prmHoursePriceId = new SqlParameter("@HoursePriceId", SqlDbType.Int) { Value = hoursePrice.HoursePriceId };
            SqlParameter prmPrice = new SqlParameter("@Price", SqlDbType.Int) { Value = hoursePrice.Price };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = hoursePrice.Year };
            SqlParameter prmMonth = new SqlParameter("@Month", SqlDbType.Int) { Value = hoursePrice.Month };
            SqlParameter prmAreaId = new SqlParameter("@AreaId", SqlDbType.Int) { Value = hoursePrice.AreaId };
            ExecuteNoQuery(sql, prmHoursePriceId, prmPrice, prmYear, prmMonth, prmAreaId);
            return entity;
        }

        public Entity Add(Entity entity)
        {
            HoursePrice hoursePrice = entity as HoursePrice;
            string sql = "insert into HoursePrice(AreaId,Price,Year,Month)values(@AreaId,@Price,@Year,@Month);select @HoursePriceId = @@IDENTITY";
            SqlParameter prmHoursePriceId = new SqlParameter("@HoursePriceId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            SqlParameter prmCityId = new SqlParameter("@AreaId", SqlDbType.Int) { Value = hoursePrice.AreaId };
            SqlParameter prmPrice = new SqlParameter("@Price", SqlDbType.Int) { Value = hoursePrice.Price };
            SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = hoursePrice.Year };
            SqlParameter prmMonth = new SqlParameter("@Month", SqlDbType.Int) { Value = hoursePrice.Month };
            ExecuteNoQuery(sql, prmHoursePriceId, prmCityId, prmPrice, prmYear, prmMonth);
            hoursePrice.HoursePriceId = (int)prmHoursePriceId.Value;
            return hoursePrice;
        }

        public int Delete(int hoursePriceId)
        {
            string sql = "delete from hoursePrice where HoursePriceId = @HoursePriceId";
            SqlParameter prmHoursePriceId = new SqlParameter("@HoursePriceId", SqlDbType.Int) { Value = hoursePriceId };
            ExecuteNoQuery(sql, prmHoursePriceId);
            return 1;
            
        }

        public Entities GetList(int cityId,int year,int areaId,int pageIndex,int pageSize)
        {
            List<SqlParameter> lstPrm = new List<SqlParameter>();
            string sql = " select row_number() over(order by hoursePriceId) as rowNumber, HoursePriceId,AreaId,Year,Month,Price from HoursePrice where 1 = 1 ";
            sql = sql + " and exists(select 1 from area where CityId= @CityId and area.areaId = hoursePrice.areaId) ";
            SqlParameter prmCityId = new SqlParameter("@CityId", SqlDbType.Int) { Value = cityId };
            lstPrm.Add(prmCityId);
            if (year != 0)
            {
                sql = sql + " and Year = @Year ";
                SqlParameter prmYear = new SqlParameter("@Year", SqlDbType.Int) { Value = year };
                lstPrm.Add(prmYear);
            }
            if (areaId != 0)
            {
                sql = sql + " and AreaId = @AreaId ";
                SqlParameter prmAreaId = new SqlParameter("@AreaId", SqlDbType.Int) { Value = areaId };
                lstPrm.Add(prmAreaId);
            }
            sql = string.Format("select * from ({0}) a where rowNumber between {1} and {2}", sql, (pageIndex - 1) * pageSize + 1, pageIndex * pageSize);
            return Query(GetList, sql, lstPrm.ToArray());
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities entities = new Entities();
            HoursePrice hoursePrice;
            while (reader.Read())
            {
                hoursePrice = new HoursePrice()
                {
                    HoursePriceId = reader.GetInt32(1),
                    AreaId = reader.GetInt32(2),
                    Year = reader.GetInt32(3),
                    Month = reader.GetInt32(4),
                    Price = reader.GetInt32(5)
                };
                entities.Add(hoursePrice);
            }
            return entities;
        }
    }
}
