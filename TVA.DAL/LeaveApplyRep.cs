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

using Microsoft.EntityFrameworkCore;
using SKG.DAL;
using SKG.Ext;
using SKG.Rsp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;

namespace TVA.DAL
{
    using Models;

    /// <summary>
    /// LeaveApply repository
    /// </summary>
    public class LeaveApplyRep : GenericRep<ZContext, LeaveApply>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Create(LeaveApply m)
        {
            var res = new SingleRsp();

            var t = Read(m.Id);
            if (t != null)
            {
                res.SetError("Exists data");
            }
            else
            {
                res = base.Create(m);
            }

            return res;
        }

        /// <summary>
        /// Create the models
        /// </summary>
        /// <param name="l">List model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(List<LeaveApply> l)
        {
            return base.Create(l); //TODO
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="p">Predicate</param>
        /// <returns>Return query data</returns>
        public override IQueryable<LeaveApply> Read(Expression<Func<LeaveApply, bool>> p)
        {
            return base.Read(p);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override LeaveApply Read(long id)
        {
            var res = All.FirstOrDefault(p => p.Id == id);
            return res;
        }

        /// <summary>
        /// Update the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(LeaveApply m)
        {
            var res = new SingleRsp();

            var t = Read(m.Id);
            if (t == null)
            {
                res.SetError("No data");
            }
            else
            {
                var ok = m.Differ(t);
                if (ok)
                {
                    m.Kopy(t);
                    res = base.Update(t);
                }
                else
                {
                    res.SetMessage("Nothing to update");
                }
            }

            return res;
        }

        /// <summary>
        /// Update the models
        /// </summary>
        /// <param name="l">List model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(List<LeaveApply> l)
        {
            return base.Update(l); //TODO
        }

        /// <summary>
        /// Delete single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Delete(long id)
        {
            return Update(id, null, true);
        }

        /// <summary>
        /// Delete object with related Notifiactions
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the result</returns>
        public SingleRsp Delete(long? id, int actor)
        {
            var res = new SingleRsp();
            var m = Read(id.Value);
            if (m == null)
            {
                res.SetError("No data");
            }
            var status = TEnum.LeaveApplyStatus.Deleted;
            m.Status = (short)status;
            res = base.Update(m);
            if (res.Success)
            {
                string err = "";
                _repNoti.Delete(m, actor, out err);
                if (err != "")
                {
                    res.SetError(err);
                }
            }
            return res;
        }

        /// <summary>
        /// Delete single object
        /// </summary>
        /// <param name="id">Secondary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Delete(string code)
        {
            return Update(null, code, true);
        }

        /// <summary>
        /// Restore the model
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Restore(long id)
        {
            return Update(id, null, false);
        }

        /// <summary>
        /// Restore the model
        /// </summary>
        /// <param name="id">Secondary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Restore(string code)
        {
            return Update(null, code, false);
        }

        /// <summary>
        /// Remove and not restore
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Number of affect</returns>
        public override int Remove(long id)
        {
            return base.Remove(id); //TODO
        }

        /// <summary>
        /// Return query all data
        /// </summary>
        public override IQueryable<LeaveApply> All
        {
            get
            {
                return base.All;
            }
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveApplyRep()
        {
            lsGroup = new List<int>();
            _repNoti = new NotificationRep();
        }

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">LeaveApply</param>
        /// <param name="l">List LeaveApplyDetail</param>
        /// <returns>Return the result</returns>
        public SingleRsp Create(LeaveApply m, List<LeaveApplyDetail> l)
        {
            var res = new SingleRsp();
            var n = Context.LeaveApply.Where(
                x => x.ApplyFor == m.ApplyFor &&
                ((x.FromTime.Value <= m.FromTime.Value && x.ToTime.Value >= m.FromTime.Value) ||
                (x.FromTime.Value <= m.ToTime.Value && x.ToTime.Value >= m.ToTime.Value))
                ).Count();
            if (n > 0)
            {
                res.SetError("Exists data");
                var data = Context.LeaveApply.Where(
                    x => x.ApplyFor == m.ApplyFor &&
                    ((x.FromTime.Value <= m.FromTime.Value && x.ToTime.Value >= m.FromTime.Value) ||
                    (x.FromTime.Value <= m.ToTime.Value && x.ToTime.Value >= m.ToTime.Value))
                    ).FirstOrDefault();
                res.Data = data;
            }
            else
            {
                var tran = Context.Database.BeginTransaction();
                try
                {
                    var now = DateTime.Now;

                    #region -- LeaveApply --
                    if (m.CreatedBy != null)
                    {
                        m.CreatedOn = now;
                    }

                    var t = Context.Set<LeaveApply>().Add(m);
                    Context.SaveChanges();
                    #endregion

                    #region -- LeaveApplyDetail --
                    foreach (var i in l)
                    {
                        if (m.CreatedBy != null)
                        {
                            i.CreatedBy = m.CreatedBy;
                            i.CreatedOn = now;
                        }
                        i.LeaveApplyId = t.Entity.Id;
                    }

                    Context.Set<LeaveApplyDetail>().AddRange(l);
                    Context.SaveChanges();
                    #endregion

                    res.Data = new
                    {
                        LeaveApply = t.Entity,
                        LeaveApplyDetail = l
                    };

                    tran.Commit();
                }
                catch (Exception ex)
                {
                    tran.Rollback();
                    res.SetError(ex.StackTrace);
                }
            }
            if (res.Success)
            {
                _repNoti.Create(m);
            }
            return res;
        }

        /// <summary>
        /// Update
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <param name="code">Secondary key</param>
        /// <param name="isDeleted">Is deleted</param>
        /// <returns>Return the result</returns>
        private SingleRsp Update(long? id, string code, bool isDeleted)
        {
            var res = new SingleRsp();

            var m = id == null ? Read(code) : Read(id.Value);
            if (m == null)
            {
                res.SetError("No data");
            }

            var status = isDeleted ? TEnum.LeaveApplyStatus.Deleted : TEnum.LeaveApplyStatus.PendingApproval;
            m.Status = (short)status;
            res = base.Update(m);

            return res;
        }

        public List<object> LoadLeaveApplyDetail(int id)
        {
            var res = new List<object>();

            var cnn = (SqlConnection)Context.Database.GetDbConnection();
            cnn.Open();
            try
            {
                var cmd = cnn.CreateCommand();
                //var adapt = cmd.Container.Components.
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "spLoadLeaveApplyDetail";
                cmd.Parameters.AddWithValue("@Id", id);
                //var dt = cmd.ExecuteReaderAsync<object>(cn)
                var r = cmd.ExecuteReader();
                if (r.HasRows)
                {
                    while (r.Read())
                    {
                        var x = new
                        {
                            Id = r.GetInt32(0),
                            ApplyDetailType = r.GetString(1),
                            ActionBy = r.GetInt32(2),
                            Comment = r.IsDBNull(3) ? "" : r.GetString(3),
                            Status = r.GetInt16(4),
                            CreatedBy = r.GetInt32(5),
                            CreatedOn = r.GetDateTime(6),
                            ModifiedBy = r.IsDBNull(7) ? 0 : r.GetInt32(7),
                            ModifiedOn = r.IsDBNull(8) ? "" : (r.GetDateTime(8).ToString("yyyy-MM-dd") + "T" + r.GetDateTime(8).ToString("HH:mm:ss") + ".00"),
                            LeaveApplyId = r.GetInt32(9),
                            GroupId = r.GetInt32(10),
                            GroupName = r.GetString(11),
                            PositionId = r.GetInt32(12),
                            PositionName = r.GetString(13),
                            DepartmentId = r.GetString(14),
                            DepName = r.GetString(15),
                            LastName = r.GetString(16),
                            FirstName = r.GetString(17)
                        };
                        res.Add(x);
                    }
                }

                r.Close();
                cnn.Close();
            }
            catch
            {
                cnn.Close();
            }
            return res;
        }

        public SingleRsp LoadLeaveBalance(int userid)
        {
            var res = new SingleRsp();
            var now = DateTime.Now;
            var thisYear = now.Year;
            var lastYear = thisYear - 1;

            decimal outStanding = 0;
            decimal balance = 0;

            var lastYear_LeaveApply = Context.LeaveApply.Where(
                x => x.ApplyFor == userid
                && x.FromTime.Value.Year == lastYear
                && x.Status == (short)TEnum.LeaveApplyStatus.PendingApproval
                && x.ApplyType == 1)
                .Sum(x => x.TotalWorkingHour);

            var thisYear_LeaveApply = Context.LeaveApply.Where(
                x => x.ApplyFor == userid
                && x.FromTime.Value.Year == thisYear
                && x.Status == (short)TEnum.LeaveApplyStatus.PendingApproval
                && x.ApplyType == 1)
                .Sum(x => x.TotalWorkingHour);

            var lastYear_Leave = Context.Leave.Where(x => x.UserId == userid && x.Year == lastYear).FirstOrDefault();
            if (lastYear_Leave.ExpiredDate > now && lastYear_Leave.Balance.HasValue)
            {
                balance = balance + lastYear_Leave.Balance.Value;
                outStanding = outStanding + lastYear_LeaveApply.Value;
            }
            var thisYear_Leave = Context.Leave.Where(x => x.UserId == userid && x.Year == thisYear).FirstOrDefault();
            if (thisYear_Leave.ExpiredDate > now && thisYear_Leave.Balance.HasValue)
            {
                balance = balance + thisYear_Leave.Balance.Value;
                outStanding = outStanding + thisYear_LeaveApply.Value;
            }

            var data = new { Balance = balance, OutStanding = outStanding };

            res.Data = data;
            return res;
        }

        public SingleRsp LoadCode(int userid)
        {
            var res = new SingleRsp();
            var lstStatus = new List<Object>();
            lstStatus.Add(new { value = TEnum.LeaveApplyStatus.Approved, displayAs = "Approved" });
            lstStatus.Add(new { value = TEnum.LeaveApplyStatus.Canceled, displayAs = "Canceled" });
            lstStatus.Add(new { value = TEnum.LeaveApplyStatus.Deleted, displayAs = "Deleted" });
            lstStatus.Add(new { value = TEnum.LeaveApplyStatus.PendingApproval, displayAs = "Pending Approval" });
            lstStatus.Add(new { value = TEnum.LeaveApplyStatus.Rejected, displayAs = "Rejected" });

            var lstStatusDetail = new List<Object>();
            lstStatusDetail.Add(new { value = TEnum.LeaveApplyDetailStatus.Pending, displayAs = "Pending" });
            lstStatusDetail.Add(new { value = TEnum.LeaveApplyDetailStatus.Canceled, displayAs = "Canceled" });
            lstStatusDetail.Add(new { value = TEnum.LeaveApplyDetailStatus.Deleted, displayAs = "Deleted" });
            lstStatusDetail.Add(new { value = TEnum.LeaveApplyDetailStatus.Done, displayAs = "Done" });
            lstStatusDetail.Add(new { value = TEnum.LeaveApplyDetailStatus.Rejected, displayAs = "Rejected" });

            var lstLeaveDetailType = Context.Code.Where(a => a.CodeType == "LeaveApplyDetailType" && a.Status == 1).Select(
                s => new { value = s.Value, displayAs = s.DisplayAs }).ToList();

            var lstLeaveType = Context.Code.Where(a => a.CodeType == "LeaveApplyType" && a.Status == 1).Select(
                s => new { value = s.Value, displayAs = s.DisplayAs }).ToList();

            var lsDep = Context.Code.Where(a => a.CodeType == "Department" && a.Status == 1);
            var cUser = Context.User.Join(Context.UserInfo, a => a.Id, b => b.UserId,
                (a, b) => new { a.Id, b.UserId, a.UserName, a.Birthday, a.Gender, a.Email, b.PositionId, b.GroupId, a.LastName, a.FirstName })
                .Join(Context.Position, c => c.PositionId, d => d.Id, (c, d) => new { c.Id, c.UserName, c.Birthday, c.PositionId, c.GroupId, c.Email, d.PositionName, d.DepartmentId, c.LastName, c.FirstName })
                .Join(Context.Group, e => e.GroupId, f => f.Id, (e, f) => new { e.Id, e.UserName, e.Birthday, e.PositionId, e.GroupId, e.PositionName, e.DepartmentId, e.Email, GroupInit = f.InitialChar, GroupName = f.Description, e.LastName, e.FirstName })
                .Join(lsDep, g => g.DepartmentId, h => h.Value, (g, h) => new { g.Id, g.UserName, g.Birthday, g.PositionId, g.GroupId, g.PositionName, g.DepartmentId, g.Email, g.GroupInit, g.GroupName, DepName = h.DisplayAs, g.LastName, g.FirstName, FullName = g.FirstName + " " + g.LastName })
                .Where(x => x.Id == userid)
                .FirstOrDefault();

            var cGroup = cUser.GroupId;
            var grp = Context.Group.Where(x => x.Id == cGroup).FirstOrDefault();

            getGroupUplin(cGroup.Value); //recursively
            var lstInformee = Context.UserInfo
                .Join(Context.User, a => a.UserId, b => b.Id, (a, b) => new { a.Id, a.GroupId, a.PositionId, b.UserName, b.Email, b.FirstName, b.LastName })
                .Join(Context.Position, c => c.PositionId, d => d.Id, (c, d) => new { c.Id, c.GroupId, c.PositionId, c.UserName, c.Email, c.FirstName, c.LastName, d.PositionName, d.JobLevel, d.DepartmentId })
                .Join(Context.Group, e => e.GroupId, f => f.Id, (e, f) => new { e.Id, e.GroupId, e.PositionId, e.UserName, e.Email, e.FirstName, e.LastName, e.PositionName, e.JobLevel, e.DepartmentId, GroupName = f.Description, GroupInit = f.InitialChar })
                .Join(lsDep, g => g.DepartmentId, h => h.Value, (g, h) => new { g.Id, g.GroupId, g.PositionId, g.UserName, g.Email, g.FirstName, g.LastName, g.PositionName, g.JobLevel, g.DepartmentId, g.GroupInit, g.GroupName, DepName = h.DisplayAs, FullName = g.FirstName + " " + g.LastName })
                .Where(x => lsGroup.Contains(x.GroupId.Value))
                .Where(x => x.DepartmentId == "1" && int.Parse(x.JobLevel) >= 4)
                .ToList();

            var lstApprover = Context.UserInfo
                .Join(Context.User, a => a.UserId, b => b.Id, (a, b) => new { a.Id, a.GroupId, a.PositionId, b.UserName, b.Email, b.FirstName, b.LastName })
                .Join(Context.Position, c => c.PositionId, d => d.Id, (c, d) => new { c.Id, c.GroupId, c.PositionId, c.UserName, c.Email, c.FirstName, c.LastName, d.PositionName, d.JobLevel, d.DepartmentId })
                .Join(Context.Group, e => e.GroupId, f => f.Id, (e, f) => new { e.Id, e.GroupId, e.PositionId, e.UserName, e.Email, e.FirstName, e.LastName, e.PositionName, e.JobLevel, e.DepartmentId, GroupName = f.Description, GroupInit = f.InitialChar })
                .Join(lsDep, g => g.DepartmentId, h => h.Value, (g, h) => new { g.Id, g.GroupId, g.PositionId, g.UserName, g.Email, g.FirstName, g.LastName, g.PositionName, g.JobLevel, g.DepartmentId, g.GroupInit, g.GroupName, DepName = h.DisplayAs, FullName = g.FirstName + " " + g.LastName })
                .Where(x => lsGroup.Contains(x.GroupId.Value))
                .Where(x => x.DepartmentId == cUser.DepartmentId && int.Parse(x.JobLevel) >= 5)
                .ToList();

            var now = DateTime.Now;
            var thisYear = now.Year;
            var lastYear = now.Year - 1;
            var lstHolidays = Context.Holiday.Where(
                x => (x.Year == thisYear.ToString() || x.Year == lastYear.ToString()) &&
                x.Status == (short)TEnum.HolidayStatus.Active)
                .ToList();

            var result = new
            {
                lsStatus = lstStatus,
                lsStatusDetail = lstStatusDetail,
                lsLeaveDetailType = lstLeaveDetailType,
                lsLeaveType = lstLeaveType,
                curUser = cUser,
                lsInformee = lstInformee,
                lsApprover = lstApprover,
                lsHolidays = lstHolidays
            };
            res.Data = result;
            return res;
        }

        //recursively, please contact HaoLee for info
        private void getGroupUplin(int id)
        {
            var grp = Context.Group.Where(x => x.Id == id).FirstOrDefault();
            if (grp != null) lsGroup.Add(grp.Id);
            if (grp.Pid.HasValue)
            {
                getGroupUplin(grp.Pid.Value);
            }
        }

        #endregion

        #region -- Fields --

        public List<int> lsGroup;

        public NotificationRep _repNoti;

        #endregion
    }
}