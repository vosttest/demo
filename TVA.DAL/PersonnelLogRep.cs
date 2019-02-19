#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
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
    /// Personnel log repository
    /// </summary>
    public class PersonnelLogRep : GenericRep<ZContext, PersonnelLog>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Create(PersonnelLog m)
        {
            var res = new SingleRsp();

            var t = Read(m.Pin);
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
        public override SingleRsp Create(List<PersonnelLog> l)
        {
            return base.Create(l); //TODO
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="p">Predicate</param>
        /// <returns>Return query data</returns>
        public override IQueryable<PersonnelLog> Read(Expression<Func<PersonnelLog, bool>> p)
        {
            return base.Read(p);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override PersonnelLog Read(long id)
        {
            var res = All.FirstOrDefault(p => p.Id == id);
            return res;
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="code">Secondary key</param>
        /// <returns>Return the object</returns>
        public override PersonnelLog Read(string code)
        {
            var res = All.FirstOrDefault(p => p.Pin == code);
            return res;
        }

        /// <summary>
        /// Update the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(PersonnelLog m)
        {
            var res = new SingleRsp();

            var t = m.Id > 0 ? Read(m.Id) : Read(m.Pin);
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
        public override SingleRsp Update(List<PersonnelLog> l)
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
        public override IQueryable<PersonnelLog> All
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
        public PersonnelLogRep() { }

        /// <summary>
        /// Check time
        /// </summary>
        /// <param name="d">Date & time</param>
        /// <param name="isCheckIn">Is check in</param>
        /// <returns>Return the result</returns>
        public List<Log> CheckTime(DateTime d, bool isCheckIn)
        {
            var res = new List<Log>();

            try
            {
                var cnn = (SqlConnection)Context.Database.GetDbConnection();
                cnn.Open();

                var cmd = cnn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = isCheckIn ? "SpCheckIn" : "SpCheckOut";
                cmd.Parameters.AddWithValue("@d", d);

                var r = cmd.ExecuteReader();
                if (r.HasRows)
                {
                    while (r.Read())
                    {
                        var x = new Log
                        {
                            Id = r.GetInt32(0),
                            Pin = r.GetString(1),
                            Email = r.GetString(2),
                            FirstName = r.GetString(3),
                            LastName = r.GetString(4),
                            Date = r.GetDateTime(5)

                        };
                        res.Add(x);
                    }
                }

                r.Close();
                cnn.Close();
            }
            catch { }

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