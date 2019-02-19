#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 14:08
 * Update       : 30/01/2019 16:17
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using System;

namespace TVA.DAL.Dto
{
    /// <summary>
    /// LeaveDto
    /// </summary>
    public class LeaveDto
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public LeaveDto() { }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User id
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Full name
        /// </summary>
        public string FullName { get; set; }

        /// <summary>
        /// Ref id
        /// </summary>
        public int RefId { get; set; }

        /// <summary>
        /// Leave type
        /// </summary>
        public int LeaveType { get; set; }

        /// <summary>
        /// From time
        /// </summary>
        public DateTime FromTime { get; set; }

        /// <summary>
        /// To time
        /// </summary>
        public DateTime ToTime { get; set; }

        #endregion
    }
}