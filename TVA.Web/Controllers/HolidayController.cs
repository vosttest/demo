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

using Microsoft.AspNetCore.Mvc;
using SKG.Req;

namespace TVA.Web.Controllers
{
    using BLL;
    using Req;

    /// <summary>
    /// Holiday controller
    /// </summary>
    public class HolidayController : BaseController
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="svc">Service</param>
        public HolidayController(HolidaySvc svc)
        {
            _svc = svc;
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody]HolidayReq req)
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
        [HttpPut("read")]
        public IActionResult Read([FromBody]SimpleReq req)
        {
            var res = _svc.Read(req.Id);
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
            var year = req.Keyword;
            var res = _svc.ReadByYear(year);
            return Ok(res);
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPut("update")]
        public IActionResult Update([FromBody]HolidayReq req)
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
        private HolidaySvc _svc;

        #endregion
    }
}