#region Information
/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 30/01/2019 18:05
 * Update       : 30/01/2019 19:23
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using SKG.BLL;
using SKG.Rsp;
using System;

namespace TVA.BLL
{
    using DAL;
    using DAL.Models;
    using System.Collections.Generic;
    using TVA.DAL.Dto;

    /// <summary>
    /// Leave service
    /// </summary>
    public class LeaveSvc : GenericSvc<LeaveRep, Leave>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the Leave
        /// </summary>
        /// <param name="m">The Leave</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(Leave m)
        {
            return base.Create(m);
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveSvc() { }

        /// <summary>
        /// Get leave information
        /// </summary>
        /// <param name="groupId">Group Id</param>
        /// <param name="userId">User Id</param>
        /// <param name="year">Year</param>
        /// <returns>Return the result</returns>
        public SingleRsp GetLeaveInfo(int groupId, int? userId, int year)
        {
            var res = new SingleRsp();
            try
            {
                List<LeaveDto> raw = _rep.GetLeaveInfo(groupId, userId, year);
                List<object> leaveInfo = new List<object>();

                foreach (var el in raw)
                {
                    List<object> leaveDays = new List<object>();
                    for (var dt = el.FromTime; dt <= el.ToTime; dt = dt.AddDays(1))
                    {
                        var leave = new
                        {
                            date = dt,
                            type = TConst.Leave.ApprovalLeave
                        };
                        leaveDays.Add(leave);
                    }

                    var item = res.Data = new
                    {
                        el.FullName,
                        leaveDays
                    };
                    leaveInfo.Add(item);
                }

                res.Data = leaveInfo;
            }
            catch (Exception ex)
            {
                res.SetError(ex.StackTrace);
            }

            return res;
        }

        #endregion
    }
}