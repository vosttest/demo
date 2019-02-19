#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 30/01/2019 19:23
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using SKG.Req;
using System.Collections.Generic;
using System.Linq;

namespace TVA.Web.Req
{
    using DAL.Models;

    /// <summary>
    /// Holiday request
    /// </summary>
    public class HolidayReq : BaseReq<Holiday>
    {
        #region -- Overrides --

        /// <summary>
        /// Convert the request to the model
        /// </summary>
        /// <returns>Return the result</returns>
        public override Holiday ToModel()
        {
            var res = new Holiday
            {
                Id = Id,
                Day = Day,
                Month = Month,
                Year = Year,
                TypeOfDay = TypeOfDay,
                Note = Note
            };

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public HolidayReq() { }

        /// <summary>
        /// Convert the requests to the models
        /// </summary>
        /// <param name="l">List requests</param>
        /// <returns>Return the result</returns>
        public static List<Holiday> ToModel(List<HolidayReq> l)
        {
            var res = new List<Holiday>();

            if (l != null)
            {
                res = l.Select(p => p.ToModel()).ToList();
            }

            return res;
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Day
        /// </summary>
        public string Day { get; set; }

        /// <summary>
        /// Month
        /// </summary>
        public string Month { get; set; }

        /// <summary>
        /// Year
        /// </summary>
        public string Year { get; set; }

        /// <summary>
        /// Type of day
        /// </summary>
        public string TypeOfDay { get; set; }

        /// <summary>
        /// Note
        /// </summary>
        public string Note { get; set; }

        #endregion
    }
}