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
    public class UserRepository:BaseRepository,IEntityRepository,IUserRepository
    {
        public Entity GetOne(int userId)
        {
            string sql = "select UserId,UserName,LoginName,Pwd from KF_User where UserId = @UserId ";
            SqlParameter prmUserId = new SqlParameter("@UserId", SqlDbType.Int) { Value = userId };
            return Query(GetOneByUserId, sql, prmUserId);
        }

        public Entity GetOneByUserId(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("用户不存在");
                return null;
            }
            reader.Read();
            User user = new User();
            user.UserId = reader.GetInt32(0);
            user.UserName = reader.GetString(1);
            user.LoginName = reader.GetString(2);
            user.Pwd = reader.GetString(3);
            return user;
        }

        public User GetOne(string loginName)
        {
            string sql = "select UserId,UserName,LoginName,Pwd from KF_User where LoginName = @LoginName ";
            SqlParameter prmLoginName = new SqlParameter("@LoginName", SqlDbType.VarChar,200) { Value = loginName };
            return Query(GetOneByLoginName, sql, prmLoginName);
        }

        public User GetOneByLoginName(SqlDataReader reader)
        {
            if (!reader.HasRows)
            {
                SetError("用户不存在");
                return null;
            }
            reader.Read();
            User user = new User();
            user.UserId = reader.GetInt32(0);
            user.UserName = reader.GetString(1);
            user.LoginName = reader.GetString(2);
            user.Pwd = reader.GetString(3);
            return user;
        }

        public Entity Update(Entity entity)
        {
            throw new NotImplementedException();
        }

        public Entity Add(Entity entity)
        {
            throw new NotImplementedException();
        }

        public int Delete(int userId)
        {
            throw new NotImplementedException();
        }

        public Entities GetList(int pageIndex, int pageSize)
        {
            StringBuilder sb = new StringBuilder();
            sb.Append("select * from ( ");
            sb.Append("select row_number() over(order by UserId) as rowNumber, UserId,UserName,LoginName from KF_User ");
            sb.Append(string.Format(" ) a where rowNumber between {0} and {1} ", (pageIndex - 1) * pageSize + 1, pageIndex * pageSize));
            return Query(GetList, sb.ToString());
        }

        private Entities GetList(SqlDataReader reader)
        {
            Entities entities = new Entities();
            User user;
            while (reader.Read())
            {
                user = new User();
                user.UserId = reader.GetInt32(1);
                user.UserName = reader.GetString(2);
                user.LoginName = reader.GetString(3);
                entities.Add(user);
            }
            return entities;
        }
    }
}
