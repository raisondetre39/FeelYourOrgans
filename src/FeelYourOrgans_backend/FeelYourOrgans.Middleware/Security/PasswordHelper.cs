using System;
using System.Security.Cryptography;
using System.Text;

namespace FeelYourOrgans.Middleware.Security
{
    public static class PasswordHelper
    {
        public static string GetCryptedString(this String str)
        {
            using (var md5Hash = MD5.Create())
            {
                return GetMd5Hash(md5Hash, str);
            }
        }

        public static bool CompareHashedStrings(this String str, string stringToCheck)
        {
            using (var md5Hash = MD5.Create())
            {
                return VerifyMd5Hash(md5Hash, stringToCheck, str);
            }
        }

        static string GetMd5Hash(MD5 md5Hash, string input)
        {
            var data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
            var sBuilder = new StringBuilder();

            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            return sBuilder.ToString();
        }

        static bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
        {
            var hashOfInput = GetMd5Hash(md5Hash, input);

            var comparer = StringComparer.OrdinalIgnoreCase;

            return 0 == comparer.Compare(hashOfInput, hash);
        }
    }
}
