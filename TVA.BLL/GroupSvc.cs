#region Information
/*
 * Author       : Zng Tfy
 * Email        : nvt87x@gmail.com
 * Phone        : +84 345 515 010
 * ------------------------------- *
 * Create       : 24/01/2019 09:24
 * Update       : 11/02/2019 16:37
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using SKG;
using SKG.BLL;
using SKG.Ext;
using SKG.Req;
using SKG.Rsp;
using System;
using System.Linq;

namespace TVA.BLL
{
    using DAL;
    using DAL.Dto;
    using DAL.Models;
    using Filter;

    /// <summary>
    /// Group service
    /// </summary>
    public class GroupSvc : GenericSvc<GroupRep, Group>
    {
        #region -- Overrides --

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="req">Paging request</param>
        /// <returns>Return the result</returns>
        public override SearchRsp Read(PagingReq req)
        {
            var res = new SearchRsp(req);

            try
            {
                // Get data
                var filter = new GroupFilter();
                if (req.Filter != null)
                {
                    filter = JsonConvert.DeserializeObject<GroupFilter>(req.Filter.ToString());
                }
                var page = req.Page;
                var size = req.Size;
                var offset = (page - 1) * size;
                var query = All;

                #region -- Filter --

                if (!string.IsNullOrEmpty(filter.InitialChar))
                {
                    query = query.Where(p => p.InitialChar.Contains(filter.InitialChar));
                }
                if (filter.Level.HasValue)
                {
                    query = query.Where(p => p.Level == filter.Level );
                }
                if (filter.Pid.HasValue)
                {
                    query = query.Where(p => p.Pid == filter.Pid);
                }
                if (filter.Status.HasValue)
                {
                    query = query.Where(p => p.Status == filter.Status);
                }

                #endregion

                res.TotalRecords = query.Count();
                UserSvc usrSvc = new UserSvc();
                var allUser = usrSvc.All;

                if (req.Paging)
                {
                    query = query.OrderByDescending(p => p.Id)
                        .Sort(req.Sort)
                        .Skip(offset)
                        .Take(size);
                }

                var t1 = from a in query
                         join b in allUser on a.CreatedBy equals b.Id into gB
                         from b in gB.DefaultIfEmpty()
                         join c in allUser on a.ModifiedBy equals c.Id into gC
                         from c in gC.DefaultIfEmpty()
                         select new
                         {
                             a.Id,
                             a.Level,
                             a.InitialChar,
                             a.Pid,
                             a.Description,
                             a.Status,
                             //StatusDesc = ((TEnum.Status)a.Status).ToDescription(),
                             CreatedOn = a.CreatedOn.HasValue ? null : a.CreatedOn,
                             a.CreatedBy,
                             CreatedByName = b == null
                                ? string.Empty
                                : b.FirstName + ZConst.String.Space + b.LastName,
                             ModifiedOn = a.ModifiedOn.HasValue ? null : a.ModifiedOn,
                             a.ModifiedBy,
                             ModifiedByName = c == null
                                ? string.Empty
                                : c.FirstName + ZConst.String.Space + c.LastName,
                         };


                res.Data = t1.ToList();

            }
            catch (Exception ex)
            {
                res.SetError(ex.StackTrace);
            }

            return res;
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public GroupSvc() {}

        #endregion
        
    }
}