#region Information
/*
 * Author       : Hoan Nguyen
 * Email        : nvhoanbk14@gmail.com
 * Phone        : 
 * ------------------------------- *
 * Create       : 
 * Update       : 19/02/2019 08:19
 * Checklist    : 1.0
 * Status       : OK
 */
#endregion

using SKG;
using SKG.BLL;
using SKG.Rsp;
using System.Linq;
using System.Collections.Generic;

namespace TVA.BLL
{
    using DAL;
    using DAL.Models;

    /// <summary>
    /// Code service
    /// </summary>
    public class CodeSvc : GenericSvc<CodeRep, Code>
    {
        #region -- Overrides --

        /// <summary>
        /// Create the Code
        /// </summary>
        /// <param name="m">The Code</param>
        /// <returns>Return the result</returns>
        //public override SingleRsp Create(Code m)
        //{
        //    return base.Create(m);
        //}

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="code">Secondary key</param>
        /// <returns>Return the object</returns>
        //public override SingleRsp Read(string code)
        //{
        //    var res = new SingleRsp();

        //    try
        //    {
        //        var t = code.Split(ZConst.Char.VBar);
        //        var day = t[0];
        //        var month = t[1];
        //        var year = t[2];

        //        res.Data = _rep.Read(day, month, year);
        //    }
        //    catch { }

        //    return res;
        //}

        #endregion

        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public CodeSvc() { }

        /// <summary>
        /// Get all holidays of the year
        /// </summary>
        /// <param name="codeType">Year</param>
        /// <returns>Return the result</returns>
        public MultipleRsp ReadByCodeType(List<string> codeType)
        {
            MultipleRsp res = new MultipleRsp();
            foreach(string i in codeType)
            {
                var o = All.Where(p => p.CodeType.Contains(i)).ToList();
                res.SetData(i, o);
            };

            return res;
        }

        #endregion
    }
}