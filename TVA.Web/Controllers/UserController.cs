#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 03/02/2019 12:03
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SKG.Req;
using SKG.Rsp;

namespace TVA.Web.Controllers
{
    using BLL;
    using Req;

    /// <summary>
    /// User controller
    /// </summary>
    public class UserController : BaseController
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="svc">Service</param>
        public UserController(UserSvc svc)
        {
            _svc = svc;
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [AllowAnonymous]
        [HttpPost("create")]
        public IActionResult Create([FromBody]UserReq req)
        {
            var m = req.ToModel();
            m.CreatedBy = AppSetting.S.AdminId;

            var res = _svc.Create(m);
            return Ok(res);
        }

        /// <summary>
        /// Read
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("read")]
        public IActionResult Read([FromBody]PagingReq req)
        {
            req.UserId = UserId;

            var res = _svc.Read(req);
            return Ok(res);
        }

        /// <summary>
        /// Read
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPut("read")]
        public IActionResult Read([FromBody]SimpleReq req)
        {
            var res = _svc.Read(req.Id);
            return Ok(res);
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPut("update")]
        public IActionResult Update([FromBody]UserReq req)
        {
            var m = req.ToModel();
            m.ModifiedBy = UserId;

            var res = _svc.Update(m);
            return Ok(res);
        }

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpDelete("delete")]
        public IActionResult Delete([FromBody]SimpleReq req)
        {
            var res = _svc.Delete(req.Id);
            return Ok(res);
        }

        /// <summary>
        /// Authenticate
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [AllowAnonymous]
        [HttpPost("z-auth")]
        public IActionResult Authenticate([FromBody]UserReq req)
        {
            var res = new SingleRsp();

            var t = _svc.GetJwt(req.UserName, req.Password);
            if (t == null)
            {
                res.SetError("User name or password is incorrect!");
            }
            else
            {
                res.Data = t;
            }

            return Ok(res);
        }

        #endregion

        #region -- Fields --

        /// <summary>
        /// Repository to handle the database
        /// </summary>
        private UserSvc _svc;

        #endregion
    }
}