#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 11/02/2019 16:37
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using SKG;
using SKG.BLL;
using SKG.Ext;
using SKG.Req;
using SKG.Rsp;
using System;
using System.Linq;

namespace TVA.BLL
{
    using DAL;
    using DAL.Dto;
    using DAL.Models;
    using Filter;

    /// <summary>
    /// User service
    /// </summary>
    public class UserSvc : GenericSvc<UserRep, User>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the User
        /// </summary>
        /// <param name="m">The User</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(User m)
        {
            var t = _hasher.HashPassword(m, m.Password);
            m.Password = t;

            return base.Create(m);
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="req">Paging request</param>
        /// <returns>Return the result</returns>
        public override SearchRsp Read(PagingReq req)
        {
            var res = new SearchRsp(req);

            try
            {
                // Get data
                var filter = new UserFilter();
                if (req.Filter != null)
                {
                    filter = JsonConvert.DeserializeObject<UserFilter>(req.Filter.ToString());
                }
                var page = req.Page;
                var size = req.Size;
                var offset = (page - 1) * size;
                var query = All;

                #region -- Filter --

                if (!string.IsNullOrEmpty(filter.Pin))
                {
                    query = query.Where(p => p.Pin.Contains(filter.Pin));
                }

                if (!string.IsNullOrEmpty(filter.Email))
                {
                    query = query.Where(p => p.Email.Contains(filter.Email));
                }

                if (!string.IsNullOrEmpty(filter.UserName))
                {
                    query = query.Where(p => p.UserName.Contains(filter.UserName));
                }

                if (!string.IsNullOrEmpty(filter.FirstName))
                {
                    query = query.Where(p => p.FirstName.Contains(filter.FirstName));
                }

                if (!string.IsNullOrEmpty(filter.LastName))
                {
                    query = query.Where(p => p.LastName.Contains(filter.LastName));
                }

                if (filter.Gender != null)
                {
                    query = query.Where(p => p.Gender == filter.Gender);
                }

                if (filter.Joined != null)
                {
                    query = query.Where(p => p.Joined == filter.Joined);
                }

                if (filter.GroupId != null)
                {
                    var ids = _rep.Context.UserInfo
                        .Where(p => p.GroupId == filter.GroupId)
                        .Select(p => p.UserId).ToList();

                    query = query.Where(p => ids.Contains(p.Id));
                }

                #endregion

                res.TotalRecords = query.Count();

                if (req.Paging)
                {
                    query = query.OrderByDescending(p => p.Id)
                        .Sort(req.Sort)
                        .Skip(offset)
                        .Take(size);
                }

                var t1 = from a in query
                         join b in All on a.CreatedBy equals b.Id into gB
                         from b in gB.DefaultIfEmpty()
                         join c in All on a.ModifiedBy equals c.Id into gC
                         from c in gC.DefaultIfEmpty()
                         select new
                         {
                             a.Id,
                             a.Pin,
                             a.Email,
                             a.UserName,
                             a.FirstName,
                             a.LastName,
                             a.Gender,
                             a.Joined,
                             a.Birthday,
                             a.Phone,
                             a.Status,
                             CreatedBy = b == null
                                ? string.Empty
                                : b.FirstName + ZConst.String.Space + b.LastName,
                             a.CreatedOn,
                             ModifiedBy = c == null
                                ? string.Empty
                                : c.FirstName + ZConst.String.Space + c.LastName,
                             a.ModifiedOn
                         };

                var t2 = t1.ToList()
                    .Select(p => new
                    {
                        p.Id,
                        p.Pin,
                        p.Email,
                        UserName = p.UserName.ToStrDefault(),
                        FullName = p.FirstName + ZConst.String.Space + p.LastName,
                        p.Gender,
                        p.Joined,
                        p.Birthday,
                        p.Phone,
                        Status = ((TEnum.Status)p.Status).ToDescription(),
                        p.CreatedBy,
                        p.CreatedOn,
                        p.ModifiedBy,
                        p.ModifiedOn
                    });

                res.Data = t2;
            }
            catch (Exception ex)
            {
                res.SetError(ex.StackTrace);
            }

            return res;
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Read(long id)
        {
            var res = new SingleRsp();

            var t = _rep.Read(id);
            res.Data = new
            {
                t.Id,
                t.FirstName,
                t.LastName,
                t.UserName,
                t.Email,
                t.Gender,
                t.Phone,
                t.Birthday
            };


            return res;
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="code">Secondary key</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Read(string code)
        {
            var res = new SingleRsp();

            var t = _rep.Read(code);
            res.Data = new
            {
                t.FirstName,
                t.LastName
            };


            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public UserSvc()
        {
            _hasher = new PasswordHasher<User>();
        }

        /// <summary>
        /// Get JSON web token
        /// </summary>
        /// <param name="userName">User name</param>
        /// <param name="password">password</param>
        /// <returns>Return the result</returns>
        public string GetJwt(string userName, string password)
        {
            var m = _rep.Read(p => p.UserName == userName).FirstOrDefault();

            if (m == null)
            {
                return null;
            }

            var t = _hasher.VerifyHashedPassword(m, m.Password, password);
            if (t == PasswordVerificationResult.Success)
            {
                var firstName = string.Empty;
                var lastName = string.Empty;

                if (!string.IsNullOrEmpty(m.FirstName))
                {
                    firstName = m.FirstName;
                }
                if (!string.IsNullOrEmpty(m.LastName))
                {
                    lastName = m.LastName;
                }

                var fullName = firstName + ZConst.String.Space + lastName;
                var o = new Payload
                {
                    Id = m.Id,
                    UserName = m.UserName,
                    FirstName = firstName,
                    LastName = lastName,
                    FullName = fullName
                };

                var secret = AppSetting.S.JwtSecret;
                var expires = AppSetting.S.JwtExpires;
                var z = new ZToken(secret, o, expires);

                return z.Jwt;
            }

            return null;
        }

        #endregion

        #region -- Fields --

        /// <summary>
        /// Hasher
        /// </summary>
        private PasswordHasher<User> _hasher;

        #endregion
    }
}