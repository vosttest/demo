#region Information
/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 30/01/2019 18:05
 * Update       : 11/02/2019 08:47
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
    /// Leave request
    /// </summary>
    public class LeaveReq : BaseReq<Leave>
    {
        #region -- Overrides --

        /// <summary>
        /// Convert the request to the model
        /// </summary>
        /// <returns>Return the result</returns>
        public override Leave ToModel()
        {
            var res = new Leave
            {
                Id = Id,
                UserId = UserId,
                LeaveType = LeaveType,
                Year = Year,
                Balance = Balance,
                ExpiredDate = ExpiredDate,
                Status = (short)Status,
            };

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveReq() { }

        /// <summary>
        /// Convert the requests to the models
        /// </summary>
        /// <param name="l">List requests</param>
        /// <returns>Return the result</returns>
        public static List<Leave> ToModel(List<LeaveReq> l)
        {
            var res = new List<Leave>();

            if (l != null)
            {
                res = l.Select(p => p.ToModel()).ToList();
            }

            return res;
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// User ID
        /// </summary>
        public int? UserId { get; set; }

        /// <summary>
        /// Leave Type
        /// </summary>
        public int? LeaveType { get; set; }

        /// <summary>
        /// Year
        /// </summary>
        public int? Year { get; set; }

        /// <summary>
        /// Balance of Leave in Hours
        /// </summary>
        public decimal? Balance { get; set; }

        /// <summary>
        /// Expired Date of Leave
        /// </summary>
        public DateTime? ExpiredDate { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public TEnum.Status Status { get; set; }

        #endregion
    }
}