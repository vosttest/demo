#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 11/02/2019 09:18
 * Update       : 11/02/2019 09:18
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
    /// Role repository
    /// </summary>
    public class RoleRep : GenericRep<ZContext, Role>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Create(Role m)
        {
            var res = new SingleRsp();

            var t = Read(m.Description);
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
        public override SingleRsp Create(List<Role> l)
        {
            return base.Create(l); //TODO
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="p">Predicate</param>
        /// <returns>Return query data</returns>
        public override IQueryable<Role> Read(Expression<Func<Role, bool>> p)
        {
            return base.Read(p);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override Role Read(long id)
        {
            var res = All.FirstOrDefault(p => p.Id == id);
            return res;
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="code">Secondary key</param>
        /// <returns>Return the object</returns>
        public override Role Read(string code)
        {
            var res = All.FirstOrDefault(p => p.Description == code);
            return res;
        }

        /// <summary>
        /// Update the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(Role m)
        {
            var res = new SingleRsp();

            var t = m.Id > 0 ? Read(m.Id) : Read(m.Description);
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
        public override SingleRsp Update(List<Role> l)
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
        public override IQueryable<Role> All
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
        public RoleRep() { }

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