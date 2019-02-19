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
    using Dto;
    using Models;

    /// <summary>
    /// Leave repository
    /// </summary>
    public class LeaveRep : GenericRep<ZContext, Leave>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Create(Leave m)
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
        public override SingleRsp Create(List<Leave> l)
        {
            return base.Create(l); //TODO
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="p">Predicate</param>
        /// <returns>Return query data</returns>
        public override IQueryable<Leave> Read(Expression<Func<Leave, bool>> p)
        {
            return base.Read(p);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override Leave Read(long id)
        {
            var res = All.FirstOrDefault(p => p.Id == id);
            return res;
        }

        /// <summary>
        /// Update the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(Leave m)
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
        public override SingleRsp Update(List<Leave> l)
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
        public override IQueryable<Leave> All
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
        public LeaveRep() { }

        /// <summary>
        /// Get leave information
        /// </summary>
        /// <param name="groupId">Group Id</param>
        /// <param name="userId">User Id</param>
        /// <param name="year">Year</param>
        /// <returns>Return the result</returns>
        public List<LeaveDto> GetLeaveInfo(int groupId, int? userId, int year)
        {
            var res = new List<LeaveDto>();

            var cnn = (SqlConnection)Context.Database.GetDbConnection();
            cnn.Open();

            var cmd = cnn.CreateCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "SpLeave";
            cmd.Parameters.AddWithValue("@groupId", groupId);
            cmd.Parameters.AddWithValue("@userId", userId);
            cmd.Parameters.AddWithValue("@year", year);

            var r = cmd.ExecuteReader();
            if (r.HasRows)
            {
                while (r.Read())
                {
                    var x = new LeaveDto
                    {
                        Id = r.GetInt32(0),
                        UserId = r.GetInt32(1),
                        FullName = r.GetString(3) + ' ' + r.GetString(4),
                        LeaveType = r.IsDBNull(5) ? 0 : r.GetInt32(5),
                        RefId = r.IsDBNull(6) ? 0 : r.GetInt32(6),
                        FromTime = r.GetDateTime(7),
                        ToTime = r.GetDateTime(8)
                    };
                    res.Add(x);
                }
            }

            r.Close();
            cnn.Close();

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

            var status = isDeleted ? TEnum.Status.Deleted : TEnum.Status.Normal;
            m.Status = (short)status;
            res = base.Update(m);

            return res;
        }

        #endregion
    }
}