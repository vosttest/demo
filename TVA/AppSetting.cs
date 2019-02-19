#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 31/01/2019 00:05
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using Newtonsoft.Json.Linq;
using System.IO;

namespace TVA
{
    /// <summary>
    /// App setting
    /// </summary>
    public class AppSetting
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public AppSetting() { }

        /// <summary>
        /// Load file
        /// </summary>
        /// <param name="file">JSON file path</param>
        public static void Load(string file)
        {
            try
            {
                using (var r = new StreamReader(file))
                {
                    var t1 = r.ReadToEnd();
                    var t2 = JObject.Parse(t1);

                    var t3 = t2.GetValue(nameof(AppSetting));
                    S = t3.ToObject<AppSetting>();
                }
            }
            catch { }
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Administrator user ID
        /// </summary>
        public int AdminId { get; set; }

        /// <summary>
        /// JWT secret
        /// </summary>
        public string JwtSecret { get; set; }

        /// <summary>
        /// JWT Expires
        /// </summary>
        public double JwtExpires { get; set; }

        /// <summary>
        /// RSA public key
        /// </summary>
        public string RsaPublicKey { get; set; }

        /// <summary>
        /// RSA private key
        /// </summary>
        public string RsaPrivateKey { get; set; }

        /// <summary>
        /// Database connection string
        /// </summary>
        public string DbConnection { get; set; }

        /// <summary>
        /// Database user
        /// </summary>
        public string DbUser { get; set; }

        /// <summary>
        /// Database password
        /// </summary>
        public string DbPassword { get; set; }

        /// <summary>
        /// Setting
        /// </summary>
        public static AppSetting S { get; set; }

        #endregion
    }
}