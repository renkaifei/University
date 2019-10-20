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
    public class RoleRepository : BaseRepository, IEntityRepository
    {

        public Entity GetOne(int roleId)
        {
            string sql = "select RoleId,RoleName from Role where RoleId = @RoleId ";
            SqlParameter prmRoleId = new SqlParameter("@RoleId", SqlDbType.Int) { Value = roleId };
            return Query(GetOne, sql, prmRoleId);
        }

        private Entity GetOne(SqlDataReader reader)
        {
            reader.Read();
            Role role = new Role();
            role.RoleId = reader.GetInt32(0);
            role.RoleName = reader.GetString(1);
            return role;
        }

        public Entity Update(Entity entity)
        {
            Role role = entity as Role;
            string sql = "update Role Set RoleName = @RoleName where RoleId = @RoleId ";
            SqlParameter prmRoleId = new SqlParameter("@RoleId", SqlDbType.Int) { Value = role.RoleId };
            SqlParameter prmRoleName = new SqlParameter("@RoleName", SqlDbType.VarChar, 50) { Value = role.RoleName };
            ExecuteNoQuery(sql, prmRoleId, prmRoleName);
            return entity;
        }

        public Entity Add(Entity entity)
        {
            Role role = entity as Role;
            string sql = "insert into Role(RoleName) values(@RoleName);select @RoleId = @@Identity";
            SqlParameter prmRoleName = new SqlParameter("@RoleName", SqlDbType.VarChar, 50) { Value = role.RoleName };
            SqlParameter prmRoleId = new SqlParameter("@RoleId", SqlDbType.Int) { Direction = ParameterDirection.Output };
            ExecuteNoQuery(sql, prmRoleName, prmRoleId);
            role.RoleId = (int)prmRoleId.Value;
            return role;
        }

        public int Delete(int roleId)
        {
            string sql = "delete from Role where RoleId = @RoleId";
            SqlParameter prmRoleId = new SqlParameter("@RoleId", SqlDbType.Int) { Value = roleId };
            ExecuteNoQuery(sql, prmRoleId);
            return 1;
        }

        public Entities GetList()
        {
            string sql = " select RoleId,RoleName from Role ";
            return Query(Query, sql);
        }

        private Entities Query(SqlDataReader reader)
        {
            Role role;
            Entities entities = new Entities();
            while (reader.Read())
            {
                role = new Role();
                role.RoleId = reader.GetInt32(0);
                role.RoleName = reader.GetString(1);
                entities.Add(role);
            }
            return entities;
        }

    }
}
