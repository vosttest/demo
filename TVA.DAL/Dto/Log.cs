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
    /// Log
    /// </summary>
    public class Log
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public Log() { }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Pin
        /// </summary>
        public string Pin { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// First name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Date
        /// </summary>
        public DateTime Date { get; set; }

        #endregion
    }
}