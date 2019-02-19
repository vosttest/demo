#region Information
/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 30/01/2019 18:05
 * Update       : 31/01/2019 00:05
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using Microsoft.AspNetCore.Mvc;
using SKG.Req;

namespace TVA.Web.Controllers
{
    using BLL;
    using Req;

    /// <summary>
    /// Leave controller
    /// </summary>
    public class LeaveController : BaseController
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="svc">Service</param>
        public LeaveController(LeaveSvc svc)
        {
            _svc = svc;
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody]LeaveReq req)
        {
            var m = req.ToModel();
            m.CreatedBy = UserId;

            var res = _svc.Create(m);
            return Ok(res);
        }

        /// <summary>
        /// Read
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("read")]
        public IActionResult Read([FromBody]LeaveInfoReq req)
        {
            var res = _svc.GetLeaveInfo(req.GroupId, req.UserId, req.Year);
            return Ok(res);
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPut("update")]
        public IActionResult Update([FromBody]LeaveReq req)
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

        #endregion

        #region -- Fields --

        /// <summary>
        /// Repository to handle the database
        /// </summary>
        private LeaveSvc _svc;

        #endregion
    }
}