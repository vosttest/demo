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

using SKG.BLL;
using SKG.Rsp;
using SKG.Req;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace TVA.BLL
{
    using DAL;
    using DAL.Models;

    public class LeaveApplySvc : GenericSvc<LeaveApplyRep, LeaveApply>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the Leave
        /// </summary>
        /// <param name="m">The Leave</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(LeaveApply m)
        {
            return base.Create(m);
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveApplySvc()
        {
            _repDetail = new LeaveApplyDetailRep();
        }

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">LeaveApply</param>
        /// <param name="l">List LeaveApplyDetail</param>
        /// <returns>Return the result</returns>
        public SingleRsp Create(LeaveApply m, List<LeaveApplyDetail> l)
        {
            var res = _rep.Create(m, l);            
            return res;
        }

        /// <summary>
        /// Create the LeaveApplyDetail
        /// </summary>
        /// <param name="m">The LeaveApplyDetail</param>
        /// <returns>Return the result</returns>
        public SingleRsp Create(LeaveApplyDetail m)
        {
            return _repDetail.Create(m);
        }

        /// <summary>
        /// Update the LeaveApplyDetail
        /// </summary>
        /// <param name="m">The LeaveApplyDetail</param>
        /// <returns>Return the result</returns>
        public SingleRsp Update(LeaveApplyDetail m)
        {
            return _repDetail.Update(m);
        }

        /// <summary>
        /// Delete single LeaveApplyDetail object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the result</returns>
        public SingleRsp DeleteDetail(long id)
        {
            return _repDetail.Delete(1);
        }

        /// <summary>
        /// Delete
        /// </summary>
        /// <param name="id">Primary key</param>     
        /// <returns>Return the result</returns>
        private SingleRsp Delete(long? id)
        {
            return _rep.Delete(id.Value);
        }

        public SingleRsp Delete(long? id, int actor)
        {
            return _rep.Delete(id.Value, actor);
        }

        public SingleRsp LoadCode(int userId)
        {
            return _rep.LoadCode(userId);
        }

        public SingleRsp LoadLeaveApplyDetail(int id)
        {
            var res = new SingleRsp();
            try
            {
                var data = _rep.LoadLeaveApplyDetail(id);                
                res.Data = data;
            }
            catch(System.Exception ex)
            {
                res.SetError(ex.Message);
            }
            return res;
        }

        public SingleRsp LoadLeaveBalance(int userId)
        {
            return _rep.LoadLeaveBalance(userId);
        }

        /// <summary>
        /// Get all User Leave Application of the year
        /// </summary>
        /// <param name="year">Year</param>
        /// <returns>Return the result</returns>
        public SingleRsp ReadByYear(string year, int userId, int page, int size)
        {
            var res = new SingleRsp();
            try
            {
                var offset = (page - 1) * size;
                var query = _rep.All.Where(x => x.FromTime.Value.Year == int.Parse(year)
                && x.ApplyFor == userId
                && x.Status != (short)TEnum.LeaveApplyStatus.Deleted)
                .OrderByDescending(x => x.FromTime);
                var total = query.Count();
                int totalPage = (total % size) == 0 ? (int)(total / size) : (int)((total / size) + 1);
                var data = query.Skip(offset).Take(size);
                var statistic = getLeaveApplyStatistic(year, userId);
                var returnData = new { Data = data, TotalRecords = total, Page = page, Size = size, TotalPages = totalPage, Statistic = statistic };
                res.Data = returnData;                
            }
            catch(System.Exception ex)
            {
                res.SetError(ex.Message);
            }

            return res;
        }

        public object getLeaveApplyStatistic(string year, int uid)
        {
            var returnData = new List<int>();
            var query = _rep.All.Where(
                x => x.FromTime.Value.Year == int.Parse(year)
                && x.ApplyFor == uid);
            var status1 = query.Where(x => x.Status == (short)TEnum.LeaveApplyStatus.PendingApproval).Count();
            var status0 = query.Where(x => x.Status == (short)TEnum.LeaveApplyStatus.Deleted).Count();
            var status3 = query.Where(x => x.Status == (short)TEnum.LeaveApplyStatus.Approved).Count();
            var status4 = query.Where(x => x.Status == (short)TEnum.LeaveApplyStatus.Rejected).Count();
            returnData.Add(status1);
            returnData.Add(status0);
            returnData.Add(status3);
            returnData.Add(status4);
            return returnData;
        }

        #endregion

        #region -- Fields --

        /// <summary>
        /// The repository
        /// </summary>
        private LeaveApplyDetailRep _repDetail;

        #endregion
    }
}