#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 30/01/2019 16:17
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using SKG.BLL;
using SKG.Rsp;
using System;
using System.Collections.Generic;
using System.Linq;

namespace TVA.BLL
{
    using DAL;
    using DAL.Dto;
    using DAL.Models;

    /// <summary>
    /// Personnel log service
    /// </summary>
    public class PersonnelLogSvc : GenericSvc<PersonnelLogRep, PersonnelLog>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the PersonnelLog
        /// </summary>
        /// <param name="m">The PersonnelLog</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(PersonnelLog m)
        {
            return base.Create(m);
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public PersonnelLogSvc() { }

        /// <summary>
        /// Get lately
        /// </summary>
        /// <param name="d">Date & time</param>
        /// <returns>Return the result</returns>
        public List<Log> GetLately(DateTime d)
        {
            return _rep.CheckTime(d, true);
        }

        /// <summary>
        /// Get early
        /// </summary>
        /// <param name="d">Date & time</param>
        /// <returns>Return the result</returns>
        public List<Log> GetEarly(DateTime d)
        {
            return _rep.CheckTime(d, false);
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Latest check in
        /// </summary>
        public DateTime? LatestCheckIn
        {
            get
            {
                var res = _rep.All
                    .Where(p => p.IsCheckIn && p.Date != null)
                    .Select(p => p.Date)
                    .OrderByDescending(p => p.Value)
                    .FirstOrDefault();

                return res;
            }
        }

        /// <summary>
        /// Latest check out
        /// </summary>
        public DateTime? LatestCheckOut
        {
            get
            {
                var res = _rep.All
                    .Where(p => !p.IsCheckIn && p.Date != null)
                    .Select(p => p.Date)
                    .OrderByDescending(p => p.Value)
                    .FirstOrDefault();

                return res;
            }
        }

        #endregion
    }
}