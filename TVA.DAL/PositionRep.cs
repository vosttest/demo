﻿#region Information
/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 15/02/2019 08:30
 * Update       : 15/02/2019 09:11
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
    /// Position repository
    /// </summary>
    public class PositionRep : GenericRep<ZContext, Position>
    {
        #region -- Overrides --

        /// <summary>
        /// 
        /// </summary>
        /// <param name="m"></param>
        /// <returns></returns>
        public override SingleRsp Create(Position m)
        {
            var res = new SingleRsp();
            res = base.Create(m);
            res.Data = m;

            return res;
        }

        /// <summary>
        /// Create the models
        /// </summary>
        /// <param name="l">List model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(List<Position> l)
        {
            return base.Create(l); //TODO
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="p">Predicate</param>
        /// <returns>Return query data</returns>
        public override IQueryable<Position> Read(Expression<Func<Position, bool>> p)
        {
            return base.Read(p);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override Position Read(long id)
        {
            var res = All.FirstOrDefault(p => p.Id == id);
            return res;
        }

        /// <summary>
        /// Update the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(Position m)
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

                res.Data = t;
            }

            return res;
        }

        /// <summary>
        /// Update the models
        /// </summary>
        /// <param name="l">List model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(List<Position> l)
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
        public override IQueryable<Position> All
        {
            get
            {
                var t = (short)TEnum.HolidayStatus.Deleted;
                return base.All.Where(p => p.Status != t);
            }
        }

        #endregion

        #region -- Methods --

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

            var status = isDeleted ? TEnum.HolidayStatus.Deleted : TEnum.HolidayStatus.Active;
            m.Status = (short)status;
            res = base.Update(m);

            return res;
        }

        #endregion
    }
}