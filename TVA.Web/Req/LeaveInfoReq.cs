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

using System;

namespace TVA.Web.Req
{
    /// <summary>
    /// LeaveInfoReq request
    /// </summary>
    public class LeaveInfoReq
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveInfoReq()
        {
            Year = DateTime.Now.Year;
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Group Id
        /// </summary>
        public int GroupId { get; set; }

        /// <summary>
        /// User Id
        /// </summary>
        public int? UserId { get; set; }

        /// <summary>
        /// Year
        /// </summary>
        public int Year { get; set; }

        #endregion
    }
}