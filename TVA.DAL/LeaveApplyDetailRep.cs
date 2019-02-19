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

using SKG.DAL;
using SKG.Ext;
using SKG.Rsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace TVA.DAL
{
    using Models;

    /// <summary>
    /// LeaveApplyDetail repository
    /// </summary>
    public class LeaveApplyDetailRep : GenericRep<ZContext, LeaveApplyDetail>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Create(LeaveApplyDetail m)
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
        public override SingleRsp Create(List<LeaveApplyDetail> l)
        {
            return base.Create(l); //TODO
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="p">Predicate</param>
        /// <returns>Return query data</returns>
        public override IQueryable<LeaveApplyDetail> Read(Expression<Func<LeaveApplyDetail, bool>> p)
        {
            return base.Read(p);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override LeaveApplyDetail Read(long id)
        {
            var res = All.FirstOrDefault(p => p.Id == id);
            return res;
        }

        /// <summary>
        /// Update the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(LeaveApplyDetail m)
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
        public override SingleRsp Update(List<LeaveApplyDetail> l)
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
        public override IQueryable<LeaveApplyDetail> All
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
        public LeaveApplyDetailRep() { }

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