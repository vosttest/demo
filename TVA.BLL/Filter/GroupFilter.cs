#region Information
/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 17/02/2019 18:05
 * Update       : 17/02/2019 18:26
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using System;


namespace TVA.BLL.Filter
{
    /// <summary>
    /// Group filter
    /// </summary>
    public class GroupFilter
    {
        /// <summary>
        /// Constructor
        /// </summary>
        public GroupFilter() { }

        /// <summary>
        /// Level
        /// </summary>
        public int? Level { get; set; }

        /// <summary>
        /// Parents Id
        /// </summary>
        public int? Pid { get; set; }

        /// <summary>
        /// Initial Character (Capital letter)
        /// </summary>
        public string InitialChar { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Status
        /// </summary>
        public short? Status { get; set; }
    }
}
