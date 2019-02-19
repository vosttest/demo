#region Information
/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 15/02/2019 09:11
 * Update       : 15/02/2019 09:11
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using SKG;
using SKG.BLL;
using SKG.Rsp;
using System.Linq;

namespace TVA.BLL
{
    using DAL;
    using DAL.Models;
    using Newtonsoft.Json;
    using SKG.Ext;
    using SKG.Req;
    using System;
    using TVA.BLL.Filter;

    /// <summary>
    /// Position service
    /// </summary>
    public class PositionSvc : GenericSvc<PositionRep, Position>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the Position
        /// </summary>
        /// <param name="m">The Position</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(Position m)
        {
            return base.Create(m);
        }

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public PositionSvc() { }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        public SingleRsp ReadByKeyWord(string key)
        {
            var res = new SingleRsp
            {
                Data = All.Where(p => p.PositionName.Contains(key) || p.WorkLocation.Contains(key) || p.JobDescription.Contains(key)).ToList()
            };

            return res;
        }

        /// <summary>
        /// Read By KeyWord with paging
        /// </summary>
        /// <param name="req"></param>
        /// <returns></returns>
        public override SearchRsp Read(PagingReq req)
        {
            var res = new SearchRsp(req);

            try
            {
                // Get data
                var filter = new PositionFilter();
                if (req.Filter != null)
                {
                    filter = JsonConvert.DeserializeObject<PositionFilter>(req.Filter.ToString());
                }
                var page = req.Page;
                var size = req.Size;
                var offset = (page - 1) * size;
                var query = All;

                #region -- Filter --

                if (!string.IsNullOrEmpty(filter.Keyword))
                {
                    query = query.Where(p => p.PositionName.Contains(filter.Keyword) || p.WorkLocation.Contains(filter.Keyword) || p.JobDescription.Contains(filter.Keyword));
                }

                #endregion

                res.TotalRecords = query.Count();

                if (req.Paging)
                {
                    query = query.OrderByDescending(p => p.Id)
                        .Sort(req.Sort)
                        .Skip(offset)
                        .Take(size);
                }

                var t1 = from a in query
                         join b in All on a.CreatedBy equals b.Id into gB
                         from b in gB.DefaultIfEmpty()
                         join c in All on a.ModifiedBy equals c.Id into gC
                         from c in gC.DefaultIfEmpty()
                         select new
                         {
                             a.Id,
                             a.PositionName,
                             a.JobDescription,
                             a.JobCategory,
                             a.JobLevel,
                             a.JobRequirement,
                             a.WorkLocation,
                             a.DepartmentId,
                             a.SalaryType,
                             a.PreferLang,
                             a.Status,
                             a.CreatedBy,
                             a.CreatedOn,
                             a.ModifiedBy,
                             a.ModifiedOn
                         };

                var t2 = t1.ToList()
                    .Select(p => new
                    {
                        p.Id,
                        p.PositionName,
                        p.JobDescription,
                        p.JobCategory,
                        p.JobLevel,
                        p.JobRequirement,
                        p.WorkLocation,
                        p.DepartmentId,
                        p.SalaryType,
                        p.PreferLang,
                        Status = ((TEnum.Status)p.Status).ToDescription(),
                        p.CreatedBy,
                        p.CreatedOn,
                        p.ModifiedBy,
                        p.ModifiedOn
                    });

                res.Data = t2;
            }
            catch (Exception ex)
            {
                res.SetError(ex.StackTrace);
            }

            return res;
        }

        #endregion
    }
}