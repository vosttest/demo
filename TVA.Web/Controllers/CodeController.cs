#region Information
/*
 * Author       : Nguyen Hoan
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ----------------14/02/2019 
 * Update       : 15/02/2019 08:19
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
    using System.Collections.Generic;

    /// <summary>
    /// Code controller
    /// </summary>
    public class CodeController : BaseController
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="svc">Service</param>
        public CodeController(CodeSvc svc)
        {
            _svc = svc;
        }

        /// <summary>
        /// Create
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        //[HttpPost("create")]
        //public IActionResult Create([FromBody]CodeReq req)
        //{
        //    var m = req.ToModel();
        //    m.CreatedBy = UserId;

        //    var res = _svc.Create(m);
        //    return Ok(res);
        //}

        /// <summary>
        /// Read
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        //[HttpPut("read")]
        //public IActionResult Read([FromBody]SimpleReq req)
        //{
        //    var res = _svc.Read(req.Id);
        //    return Ok(res);
        //}

        /// <summary>
        /// Get all holidays of the year
        /// </summary>
        /// <param name="req">Request (Keyword is year value)</param>
        /// <returns>Return the result</returns>
        [HttpPost("read-by-code-type")]
        public IActionResult ReadByCodeType(List<string> codeType)
        {
            var res = _svc.ReadByCodeType(codeType);
            return Ok(res);
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        //[HttpPut("update")]
        //public IActionResult Update([FromBody]CodeReq req)
        //{
        //    var m = req.ToModel();
        //    m.ModifiedBy = UserId;

        //    var res = _svc.Update(m);
        //    return Ok(res);
        //}

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="req">Request</param>
        /// <returns>Return the result</returns>
        //[HttpDelete("delete")]
        //public IActionResult Delete([FromBody]SimpleReq req)
        //{
        //    var res = _svc.Delete(req.Id);
        //    return Ok(res);
        //}

        #endregion

        #region -- Fields --

        /// <summary>
        /// Repository to handle the database
        /// </summary>
        private CodeSvc _svc;

        #endregion
    }
}