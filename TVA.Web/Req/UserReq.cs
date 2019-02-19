#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 30/01/2019 19:23
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using SKG.Req;
using System.Collections.Generic;
using System.Linq;

namespace TVA.Web.Req
{
    using DAL.Models;

    /// <summary>
    /// User request
    /// </summary>
    public class UserReq : BaseReq<User>
    {
        #region -- Overrides --

        /// <summary>
        /// Convert the request to the model
        /// </summary>
        /// <returns>Return the result</returns>
        public override User ToModel()
        {
            var res = new User
            {
                Id = Id,
                UserName = UserName,
                Password = Password,
                Email = Email,
                Phone = Phone,
                FirstName = FirstName,
                LastName = LastName
            };

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public UserReq() { }

        /// <summary>
        /// Convert the requests to the models
        /// </summary>
        /// <param name="l">List requests</param>
        /// <returns>Return the result</returns>
        public static List<User> ToModel(List<UserReq> l)
        {
            var res = new List<User>();

            if (l != null)
            {
                res = l.Select(p => p.ToModel()).ToList();
            }

            return res;
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// User name
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        public string Password { get; set; }


        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        public string Phone { get; set; }

        /// <summary>
        /// First Name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last Name
        /// </summary>
        public string LastName { get; set; }

        #endregion
    }
}