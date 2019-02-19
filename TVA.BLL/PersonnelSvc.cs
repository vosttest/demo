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

namespace TVA.BLL
{
    using DAL;
    using DAL.Models;

    /// <summary>
    /// Personnel service
    /// </summary>
    public class PersonnelSvc : GenericSvc<PersonnelRep, Personnel>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the Personnel
        /// </summary>
        /// <param name="m">The Personnel</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(Personnel m)
        {
            return base.Create(m);
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public PersonnelSvc() { }

        #endregion
    }
}