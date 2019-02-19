#region Information
/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 07/02/2019 18:05
 * Update       : 08/02/2019 00:05
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
    /// LeaveApply controller
    /// </summary>
    public class LeaveApplyController : BaseController
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="svc">Service</param>
        public LeaveApplyController(LeaveApplySvc svc)
        {
            _svc = svc;
        }

        /// <summary>
        /// Create Full (including details)
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("create-full")]
        public IActionResult Create([FromBody]LeaveApplyFullReq req)
        {
            var m = req.LeaveApply.ToModel();
            var offsetTime = 0-req.LeaveApply.TimeZoneOffset.Value;
            //var begin = m.FromTime.Value.AddMinutes(offsetTime);
            //var end = m.ToTime.Value.AddMinutes(offsetTime);
            //m.FromTime = begin;
            //m.ToTime = end;
            m.CreatedBy = UserId;
            var mDetail = LeaveApplyDetailReq.ToModel(req.LeaveApplyDetail);

            var res = _svc.Create(m, mDetail);
            return Ok(res);
        }

        /// <summary>
        /// Load Code Table
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("load-code")]
        public IActionResult LoadCode([FromBody]SimpleReq req)
        {    
            var res = _svc.LoadCode(req.Id);
            return Ok(res);
        }

        /// <summary>
        /// Load Code Table
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("load-leave-apply-detail")]
        public IActionResult LoadLeaveApplyDetail([FromBody]SimpleReq req)
        {
            var res = _svc.LoadLeaveApplyDetail(req.Id);
            return Ok(res);
        }

        /// <summary>
        /// Load Levave Balance
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("load-leave-balance")]
        public IActionResult LoadLeaveBalance([FromBody]SimpleReq req)
        {
            var res = _svc.LoadLeaveBalance(req.Id);
            return Ok(res);
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody]LeaveApplyReq req)
        {
            var m = req.ToModel();
            m.CreatedBy = UserId;

            var res = _svc.Create(m);
            return Ok(res);
        }

        /// <summary>
        /// Get all holidays of the year
        /// </summary>
        /// <param name="req">Request (Keyword is year value)</param>
        /// <returns>Return the result</returns>
        [HttpPost("read-by-year")]
        public IActionResult ReadByYear([FromBody]SimpleReq req)
        {
            var keyword = req.Keyword.Split('-');
            var year = keyword[0];
            var curPage = int.Parse(keyword[1]);
            var nRec =  int.Parse(keyword[2]);
            var uid = req.Id;
            var res = _svc.ReadByYear(year, uid, curPage, nRec);
            return Ok(res);
        }

        /// <summary>
        /// Create detail
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("create-detail")]
        public IActionResult CreateDetail([FromBody]LeaveApplyDetailReq req)
        {
            var m = req.ToModel();
            m.CreatedBy = UserId;

            var res = _svc.Create(m);
            return Ok(res);
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPut("update")]
        public IActionResult Update([FromBody]LeaveApplyReq req)
        {
            var m = req.ToModel();
            m.ModifiedBy = UserId;

            var res = _svc.Update(m);
            return Ok(res);
        }

        /// <summary>
        /// Update Detail
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPut("update-detail")]
        public IActionResult UpdateDetail([FromBody]LeaveApplyDetailReq req)
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
            var _uid = UserId;
            var res = _svc.Delete(req.Id, _uid);
            return Ok(res);
        }

        /// <summary>
        /// Delete Detail
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpDelete("delete-detail")]
        public IActionResult DeleteDetail([FromBody]SimpleReq req)
        {
            var res = _svc.DeleteDetail(req.Id);
            return Ok(res);
        }

        #endregion

        #region -- Fields --

        /// <summary>
        /// Repository to handle the database
        /// </summary>
        private LeaveApplySvc _svc;

        #endregion
    }
}