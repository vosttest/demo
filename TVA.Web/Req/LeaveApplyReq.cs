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
using System;
using System.Collections.Generic;
using System.Linq;

namespace TVA.Web.Req
{
    using DAL.Models;

    /// <summary>
    /// LeaveApply request
    /// </summary>
    public class LeaveApplyReq : BaseReq<LeaveApply>
    {
        #region -- Overrides --

        /// <summary>
        /// Convert the request to the model
        /// </summary>
        /// <returns>Return the result</returns>
        public override LeaveApply ToModel()
        {
            var res = new LeaveApply
            {
                Id = Id,
                ApplyFor = ApplyFor,
                ApplyType = ApplyType,
                FromTime = FromTime,
                ToTime = ToTime,
                TotalWorkingHour = TotalWorkingHour,
                Note = Note,
                Status = (short)Status,
            };

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveApplyReq() { }

        /// <summary>
        /// Convert the requests to the models
        /// </summary>
        /// <param name="l">List requests</param>
        /// <returns>Return the result</returns>
        public static List<LeaveApply> ToModel(List<LeaveApplyReq> l)
        {
            var res = new List<LeaveApply>();

            if (l != null)
            {
                res = l.Select(p => p.ToModel()).ToList();
            }

            return res;
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Apply For User ID
        /// </summary>
        public int? ApplyFor { get; set; }

        /// <summary>
        /// Apply Type
        /// </summary>
        public int? ApplyType { get; set; }

        /// <summary>
        /// Apply Type
        /// </summary>
        public DateTime? FromTime { get; set; }

        /// <summary>
        /// Apply Type
        /// </summary>
        public DateTime? ToTime { get; set; }

        /// <summary>
        /// Total Working Hour(s)
        /// </summary>
        public decimal? TotalWorkingHour { get; set; }

        /// <summary>
        /// Note
        /// </summary>
        public string Note { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public TEnum.Status Status { get; set; }


        public int? TimeZoneOffset { get; set; }

        #endregion
    }
}