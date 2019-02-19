#region Information
/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 15/02/2019 08:30
 * Update       : 15/02/2019 09:09
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
    /// Position controller
    /// </summary>
    public class PositionController : BaseController
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="svc">Service</param>
        public PositionController(PositionSvc svc)
        {
            _svc = svc;
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPost("create")]
        public IActionResult Create([FromBody]PositionReq req)
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
        /// Search Position By Key word
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        [HttpPost("read-by-keyword")]
        public IActionResult ReadByKeyWord([FromBody]SimpleReq req)
        {
            var key = req.Keyword;
            var res = _svc.ReadByKeyWord(key);
            return Ok(res);
        }

        [HttpPost("read-by-keyword1")]
        public IActionResult ReadByKeyWord1([FromBody]PagingReq req)
        {
            req.UserId = UserId;
            var res = _svc.Read(req);
            return Ok(res);
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        [HttpPut("update")]
        public IActionResult Update([FromBody]PositionReq req)
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
        private PositionSvc _svc;

        #endregion
    }
}