#region Information
/*
 * Author       : Hao Lee
 * Email        : occbuu@gmail.com
 * Phone        : +84 919 004 169
 * ------------------------------- *
 * Create       : 07/02/2019 18:05
 * Update       : 08/02/2019 00:05
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using SKG.BLL;
using SKG.Rsp;
using SKG.Req;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace TVA.BLL
{
    using DAL;
    using DAL.Models;

    public class NotificationSvc : GenericSvc<NotificationRep, Notification>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the Leave
        /// </summary>
        /// <param name="m">The Leave</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(Notification m)
        {
            return base.Create(m);
        }

        #endregion

        #region -- Methods --
        /// <summary>
        /// Constructor
        /// </summary>
        public NotificationSvc()
        {           
        }

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">Notification</param>
        /// <param name="l">List NotificationInfo</param>
        /// <returns>Return the result</returns>
        public SingleRsp Create(Notification m, List<NotificationInfo> l)
        {
            return _rep.Create(m, l);
        }
        #endregion

    }
}
