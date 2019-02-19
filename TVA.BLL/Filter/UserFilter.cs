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
    /// User filter
    /// </summary>
    public class UserFilter
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public UserFilter() { }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Pin
        /// </summary>
        public string Pin { get; set; }

        /// <summary>
        /// GroupId
        /// </summary>
        public int? GroupId { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// FirstName
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// LastName
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Gender
        /// </summary>
        public bool? Gender { get; set; }

        /// <summary>
        /// Joined
        /// </summary>
        public DateTime? Joined { get; set; }

        #endregion
    }
}