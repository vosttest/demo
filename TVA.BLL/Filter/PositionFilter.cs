#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 01/02/2019 10:05
 * Update       : 01/02/2019 10:26
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using System;

namespace TVA.BLL.Filter
{
    /// <summary>
    /// Position filter
    /// </summary>
    public class PositionFilter
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public PositionFilter() { }

        #endregion

        #region -- Properties --

        /// <summary>
        /// PositionName
        /// </summary>
        public string PositionName { get; set; }

        /// <summary>
        /// WorkLocation
        /// </summary>
        public string WorkLocation { get; set; }

        /// <summary>
        /// JobDescription
        /// </summary>
        public string JobDescription { get; set; }

        /// <summary>
        /// Keyword
        /// </summary>
        public string Keyword { get; set; }


        #endregion
    }
}