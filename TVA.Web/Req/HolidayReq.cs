#region Information
/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 15/02/2019 08:59
 * Update       : 15/02/2019 08:59
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
    /// Position request
    /// </summary>
    public class PositionReq : BaseReq<Position>
    {
        #region -- Overrides --

        /// <summary>
        /// Convert the request to the model
        /// </summary>
        /// <returns>Return the result</returns>
        public override Position ToModel()
        {
            var res = new Position
            {
                Id = Id,
                PositionName = PositionName,
                JobDescription = JobDescription,
                JobLevel = JobLevel,
                JobRequirement = JobRequirement,
                DepartmentId = DepartmentId,
                JobCategory = JobCategory,
                WorkLocation = WorkLocation,
                SalaryType = SalaryType,
                PreferLang = PreferLang,
                PositionType = PositionType
            };

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public PositionReq() { }

        /// <summary>
        /// Convert the requests to the models
        /// </summary>
        /// <param name="l">List requests</param>
        /// <returns>Return the result</returns>
        public static List<Position> ToModel(List<PositionReq> l)
        {
            var res = new List<Position>();

            if (l != null)
            {
                res = l.Select(p => p.ToModel()).ToList();
            }

            return res;
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// PositionName
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// JobDescription
        /// </summary>
        public string JobDescription { get; set; }

        /// <summary>
        /// JobLevel
        /// </summary>
        public string JobLevel { get; set; }

        /// <summary>
        /// JobRequirement
        /// </summary>
        public string JobRequirement { get; set; }

        /// <summary>
        /// DepartmentId
        /// </summary>
        public string DepartmentId { get; set; }

        /// <summary>
        /// JobCategory
        /// </summary>
        public string JobCategory { get; set; }

        /// <summary>
        /// WorkLocation
        /// </summary>
        public string WorkLocation { get; set; }

        /// <summary>
        /// Note
        /// </summary>
        public string SalaryType { get; set; }
        /// <summary>
        /// PreferLang
        /// </summary>
        public string PreferLang { get; set; }

        /// <summary>
        /// PositionType
        /// </summary>
        public string PositionType { get; set; }

        #endregion
    }
}