using System;
using System.Text;
using System.Security.Cryptography;

namespace KF.Repository
{
    public class MD5Crypt
    {
        public string Encrypt(string pwd)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] arrByte = Encoding.UTF8.GetBytes(pwd);
                byte[] arrData = md5Hash.ComputeHash(arrByte);
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < arrData.Length; i++)
                {
                    sb.Append(arrData[i].ToString("x2"));
                }
                return sb.ToString();
            }
        }
    }
}
