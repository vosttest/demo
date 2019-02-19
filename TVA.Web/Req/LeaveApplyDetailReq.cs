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

using SKG.Req;
using System.Collections.Generic;
using System.Linq;

namespace TVA.Web.Req
{
    using DAL.Models;

    /// <summary>
    /// LeaveApplyDetail request
    /// </summary>
    public class LeaveApplyDetailReq : BaseReq<LeaveApplyDetail>
    {
        #region -- Overrides --

        /// <summary>
        /// Convert the request to the model
        /// </summary>
        /// <returns>Return the result</returns>
        public override LeaveApplyDetail ToModel()
        {
            var res = new LeaveApplyDetail
            {
                Id = Id,
                LeaveApplyId = LeaveApplyId,
                ApplyDetailType = ApplyDetailType,
                ActionBy = ActionBy,
                Comment = Comment,
                Status = (short)Status,
            };

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveApplyDetailReq() { }

        /// <summary>
        /// Convert the requests to the models
        /// </summary>
        /// <param name="l">List requests</param>
        /// <returns>Return the result</returns>
        public static List<LeaveApplyDetail> ToModel(List<LeaveApplyDetailReq> l)
        {
            var res = new List<LeaveApplyDetail>();

            if (l != null)
            {
                res = l.Select(p => p.ToModel()).ToList();
            }

            return res;
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Leave Application ID
        /// </summary>
        public int LeaveApplyId { get; set; }

        /// <summary>
        /// Apply Detail Type (Inform / Approve)
        /// </summary>
        public string ApplyDetailType { get; set; }

        /// <summary>
        /// Action By ~ Informees and Approvers
        /// </summary>
        public int? ActionBy { get; set; }

        /// <summary>
        /// Comments of Approvers
        /// </summary>
        public string Comment { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public TEnum.Status Status { get; set; }

        #endregion
    }
}