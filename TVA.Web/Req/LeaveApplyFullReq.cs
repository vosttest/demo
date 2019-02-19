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

using System.Collections.Generic;

namespace TVA.Web.Req
{
    /// <summary>
    /// LeaveApplyFullReq request
    /// </summary>
    public class LeaveApplyFullReq
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveApplyFullReq()
        {
            LeaveApply = new LeaveApplyReq();
            LeaveApplyDetail = new List<LeaveApplyDetailReq>();
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Leave application
        /// </summary>
        public LeaveApplyReq LeaveApply { get; set; }

        /// <summary>
        /// Leave application details
        /// </summary>
        public List<LeaveApplyDetailReq> LeaveApplyDetail { get; set; }

        #endregion
    }
}