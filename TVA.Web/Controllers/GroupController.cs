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

using Microsoft.AspNetCore.Mvc;
using SKG.Req;

namespace TVA.Web.Controllers
{
    using BLL;
    using Microsoft.AspNetCore.Authorization;
    using Req;

    /// <summary>
    /// User controller
    /// </summary>
    public class GroupController : BaseController
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="svc">Service</param>
        public GroupController(GroupSvc svc)
        {
            _svc = svc;
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
        [HttpPost("read-by-keyword1")]
        public IActionResult ReadByKeyWord1([FromBody]PagingReq req)
        {
            req.UserId = UserId;
            var res = _svc.Read(req);
            return Ok(res);
        }

        #endregion

        #region -- Fields --

        /// <summary>
        /// Repository to handle the database
        /// </summary>
        private GroupSvc _svc;

        #endregion
    }
}