#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 11/02/2019 16:37
 * Update       : 11/02/2019 16:37
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

namespace TVA.DAL.Dto
{
    /// <summary>
    /// Payload
    /// </summary>
    public class Payload
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public Payload() { }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Id
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// User name
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// First name
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// FullName
        /// </summary>
        public string FullName { get; set; }

        #endregion
    }
}