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

using SKG;
using SKG.BLL;
using SKG.Rsp;
using System.Linq;

namespace TVA.BLL
{
    using DAL;
    using DAL.Models;

    /// <summary>
    /// Holiday service
    /// </summary>
    public class HolidaySvc : GenericSvc<HolidayRep, Holiday>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the Holiday
        /// </summary>
        /// <param name="m">The Holiday</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(Holiday m)
        {
            return base.Create(m);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="code">Secondary key</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Read(string code)
        {
            var res = new SingleRsp();

            try
            {
                var t = code.Split(ZConst.Char.VBar);
                var day = t[0];
                var month = t[1];
                var year = t[2];

                res.Data = _rep.Read(day, month, year);
            }
            catch { }

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public HolidaySvc() { }

        /// <summary>
        /// Get all holidays of the year
        /// </summary>
        /// <param name="year">Year</param>
        /// <returns>Return the result</returns>
        public SingleRsp ReadByYear(string year)
        {
            var res = new SingleRsp
            {
                Data = All.Where(p => p.Year == year).ToList()
            };

            return res;
        }

        #endregion
    }
}