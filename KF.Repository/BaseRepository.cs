using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace KF.Repository
{
    /// <summary>
    /// 数据库操作
    /// </summary>
    public abstract class BaseRepository
    {
        private string ConnectionString = DBConnection.UniversityConnection;

        public string ErrorMessage { get; private set; }

        protected void SetError(string error)
        {
            ErrorMessage = error;
        }

        protected bool ExecuteNoQuery(string sql, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddRange(parameters);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    return true;
                }
            }
        }

        protected T Query<T>(Func<SqlDataReader, T> Query, string sql, params SqlParameter[] parameters)
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                using (SqlCommand cmd = new SqlCommand(sql, conn))
                {
                    cmd.Parameters.AddRange(parameters);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    return Query(reader);
                }
            }
        }

        protected string MakePageSql(string sql, int pageIndex, int pageSize)
        {
            return string.Format("select * from ({0}) a where rowNumber between {1} and {2}", sql, ((pageIndex - 1) * pageSize + 1).ToString(), (pageIndex * pageSize).ToString());
        }
    }
    
}
