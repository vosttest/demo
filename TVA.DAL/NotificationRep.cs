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

using Microsoft.EntityFrameworkCore;
using SKG.DAL;
using SKG.Ext;
using SKG.Rsp;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Data.Common;
using System.Linq;
using System.Linq.Expressions;

namespace TVA.DAL
{
    using Models;
    public class NotificationRep : GenericRep<ZContext, Notification>
    {
        #region -- Overrides --
        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the object</returns>
        public override SingleRsp Create(Notification m)
        {
            var res = new SingleRsp();

            var t = Read(m.Id);
            if (t != null)
            {
                res.SetError("Exists data");
            }
            else
            {
                res = base.Create(m);
            }

            return res;
        }

        /// <summary>
        /// Create the models
        /// </summary>
        /// <param name="l">List model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Create(List<Notification> l)
        {
            return base.Create(l); //TODO
        }

        /// <summary>
        /// Read by
        /// </summary>
        /// <param name="p">Predicate</param>
        /// <returns>Return query data</returns>
        public override IQueryable<Notification> Read(Expression<Func<Notification, bool>> p)
        {
            return base.Read(p);
        }

        /// <summary>
        /// Read single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the object</returns>
        public override Notification Read(long id)
        {
            var res = All.FirstOrDefault(p => p.Id == id);
            return res;
        }

        /// <summary>
        /// Update the model
        /// </summary>
        /// <param name="m">The model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(Notification m)
        {
            var res = new SingleRsp();

            var t = Read(m.Id);
            if (t == null)
            {
                res.SetError("No data");
            }
            else
            {
                var ok = m.Differ(t);
                if (ok)
                {
                    m.Kopy(t);
                    res = base.Update(t);
                }
                else
                {
                    res.SetMessage("Nothing to update");
                }
            }

            return res;
        }

        /// <summary>
        /// Update the models
        /// </summary>
        /// <param name="l">List model</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Update(List<Notification> l)
        {
            return base.Update(l); //TODO
        }

        /// <summary>
        /// Delete single object
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Delete(long id)
        {
            return Update(id, null, true);
        }

        /// <summary>
        /// Delete single object
        /// </summary>
        /// <param name="id">Secondary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Delete(string code)
        {
            return Update(null, code, true);
        }

        /// <summary>
        /// Restore the model
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Restore(long id)
        {
            return Update(id, null, false);
        }

        /// <summary>
        /// Restore the model
        /// </summary>
        /// <param name="id">Secondary key</param>
        /// <returns>Return the result</returns>
        public override SingleRsp Restore(string code)
        {
            return Update(null, code, false);
        }

        /// <summary>
        /// Remove and not restore
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <returns>Number of affect</returns>
        public override int Remove(long id)
        {
            return base.Remove(id); //TODO
        }

        /// <summary>
        /// Return query all data
        /// </summary>
        public override IQueryable<Notification> All
        {
            get
            {
                return base.All;
            }
        }
        #endregion

        #region -- Methods --
        /// <summary>
        /// Update
        /// </summary>
        /// <param name="id">Primary key</param>
        /// <param name="code">Secondary key</param>
        /// <param name="isDeleted">Is deleted</param>
        /// <returns>Return the result</returns>
        private SingleRsp Update(long? id, string code, bool isDeleted)
        {
            var res = new SingleRsp();

            var m = id == null ? Read(code) : Read(id.Value);
            if (m == null)
            {
                res.SetError("No data");
            }

            var status = isDeleted ? TEnum.NotificationStatus.Deleted : TEnum.NotificationStatus.Active;
            m.Status = (short)status;
            res = base.Update(m);

            return res;
        }

        /// <summary>
        /// Create the model
        /// </summary>
        /// <param name="m">Notification</param>
        /// <param name="l">Notification Info</param>
        /// <returns>Return the result</returns>
        public SingleRsp Create(Notification m, List<NotificationInfo> l)
        {
            var res = new SingleRsp();
            var tran = Context.Database.BeginTransaction();
            try
            {
                var now = DateTime.Now;

                #region -- Notification --
                if (m.CreatedBy != null)
                {
                    m.CreatedOn = now;
                }

                var t = Context.Set<Notification>().Add(m);
                Context.SaveChanges();
                #endregion

                #region -- NotificationInfo --
                List<NotificationLog> lsLog = new List<NotificationLog>();
                List<int> lsReciever = new List<int>();
                lsReciever = getListRecievers(m.ToUserIds);
                
                foreach (var i in l)
                {
                    if (m.CreatedBy != null)
                    {
                        i.CreatedBy = m.CreatedBy;
                        i.CreatedOn = now;
                    }
                    i.NotiId = t.Entity.Id;

                    foreach(int reciever in lsReciever)
                    {
                        NotificationLog log = new NotificationLog();
                        log.CreatedBy = m.CreatedBy;
                        log.CreatedOn = now;
                        log.NotiId = t.Entity.Id;
                        log.SentType = i.SentType;
                        log.Reciever = reciever;
                        log.Status = (short)TEnum.NotificationLogStatus.PendingSend;
                        lsLog.Add(log);
                    }
                }
                Context.Set<NotificationInfo>().AddRange(l);
                Context.Set<NotificationLog>().AddRange(lsLog);
                Context.SaveChanges();
                #endregion

                res.Data = new
                {
                    Notification = t.Entity,
                    NotificationInfo = l
                };

                tran.Commit();
            }
            catch (Exception ex)
            {
                res.SetError(ex.StackTrace);
                tran.Rollback();
            }
            return res;
        }

        /// <summary>
        /// Create the Notification for Leave-Application, OT-Application
        /// </summary>
        /// <param name="apply">Notification</param>
        /// <param name="l">List NotificationInfo</param>
        /// <returns>Return the result</returns>
        public SingleRsp Create(LeaveApply apply)
        {
            SingleRsp res = new SingleRsp();
            var lsDep = Context.Code.Where(a => a.CodeType == "Department" && a.Status == 1);
            var user = Context.User.Join(Context.UserInfo, a => a.Id, b => b.UserId,
                (a, b) => new { a.Id, b.UserId, a.UserName, a.Birthday, a.Gender, a.Email, b.PositionId, b.GroupId, a.LastName, a.FirstName })
                .Join(Context.Position, c => c.PositionId, d => d.Id, (c, d) => new { c.Id, c.UserName, c.Birthday, c.PositionId, c.GroupId, c.Email, d.PositionName, d.DepartmentId, c.LastName, c.FirstName })
                .Join(Context.Group, e => e.GroupId, f => f.Id, (e, f) => new { e.Id, e.UserName, e.Birthday, e.PositionId, e.GroupId, e.PositionName, e.DepartmentId, e.Email, GroupInit = f.InitialChar, GroupName = f.Description, e.LastName, e.FirstName })
                .Join(lsDep, g => g.DepartmentId, h => h.Value, (g, h) => new { g.Id, g.UserName, g.Birthday, g.PositionId, g.GroupId, g.PositionName, g.DepartmentId, g.Email, g.GroupInit, g.GroupName, DepName = h.DisplayAs, g.LastName, g.FirstName, FullName = g.FirstName + " " + g.LastName })
                .Where(x => x.Id == apply.ApplyFor)
                .FirstOrDefault();

            var lsDetail_Inform = Context.LeaveApplyDetail.Where(
                x => x.LeaveApplyId == apply.Id &&
                x.Status == (short)TEnum.LeaveApplyDetailStatus.Pending &&
                x.ApplyDetailType == "Inform")
                .ToList();
            var lsDetail_Approve = Context.LeaveApplyDetail.Where(
                x => x.LeaveApplyId == apply.Id &&
                x.Status == (short)TEnum.LeaveApplyDetailStatus.Pending &&
                x.ApplyDetailType == "Approve")
                .ToList();
            string nUsers = "";
            foreach (LeaveApplyDetail item in lsDetail_Approve)
            {
                if(nUsers =="")
                    nUsers = nUsers + "[" + item.ActionBy + "]";
                else
                    nUsers = nUsers + ";[" + item.ActionBy + "]";
            }

            string nUsers1 = "";
            foreach (LeaveApplyDetail item in lsDetail_Inform)
            {
                if (nUsers1 == "")
                    nUsers1 = nUsers1 + "[" + item.ActionBy + "]";
                else
                    nUsers1 = nUsers1 + ";[" + item.ActionBy + "]";
            }
            //var lsSentType = new string[] { "Email", "Web", "Whatsapp", "Telegram" };
            var lsSentType = new string[] { "Email", "Web"};

            /// Get sample and bind data
            var sample_app = (apply.ApplyType.Value == 1 || apply.ApplyType.Value == 2) ? getSampleStr("NotificationSample", "APPROVE_LEAVE") : getSampleStr("ContentType", "APPROVE_OT");
            sample_app = sample_app.Replace("[REPORTER]", user.FullName);
            sample_app = sample_app.Replace("[APPLICATION-ID]", apply.Id.ToString());
            sample_app = sample_app.Replace("[DATE-FROM]", apply.FromTime.ToStrDateTime());
            sample_app = sample_app.Replace("[DATE-TO]", apply.ToTime.ToStrDateTime());
            sample_app = sample_app.Replace("[CREATED-DATE]", apply.CreatedOn.ToStrDateTime());
            sample_app = sample_app.Replace("[LEAVE-TYPE]", getSampleStr("LeaveApplyType", apply.ApplyType.ToString()));
            sample_app = sample_app.Replace("[TOTAL-HOURS]", apply.TotalWorkingHour.ToString());
            var arrSample_app = sample_app.Split('|');
            var contentSms_app = arrSample_app[1];
            var subject_app = arrSample_app[0];            

            Notification nApprove = new Notification();
            nApprove.RefId = apply.Id;            
            nApprove.NotiType = (apply.ApplyType.Value == 1 || apply.ApplyType.Value == 2) ? "APPROVE_LEAVE" : "APPROVE_OT";
            nApprove.ContentType = getSampleStr("ContentType", nApprove.NotiType);
            nApprove.RefType = "LeaveApply";
            nApprove.ContentSms = contentSms_app;
            nApprove.Subject = subject_app;
            nApprove.WarningLevel = 1;
            nApprove.Status = (short)TEnum.NotificationStatus.Active;
            nApprove.AffectUrl = getSampleStr("NotificationURL", nApprove.NotiType) + apply.Id.ToString();
            nApprove.MultiRecievers = lsDetail_Approve.Count();
            nApprove.ToUserIds = nUsers;
            nApprove.FromUserId = apply.ApplyFor;
            nApprove.CreatedBy = apply.CreatedBy;

            var listAppInfo = generateNotitficationInfo(nApprove, lsSentType);

            var sample_inf = (apply.ApplyType.Value == 1 || apply.ApplyType.Value == 2) ? getSampleStr("NotificationSample", "INFORM_LEAVE") : getSampleStr("ContentType", "INFORM_OT");
            sample_inf = sample_inf.Replace("[REPORTER]", user.FullName);
            sample_inf = sample_inf.Replace("[APPLICATION-ID]", apply.Id.ToString());
            sample_inf = sample_inf.Replace("[DATE-FROM]", apply.FromTime.ToStrDateTime());
            sample_inf = sample_inf.Replace("[DATE-TO]", apply.ToTime.ToStrDateTime());
            sample_inf = sample_inf.Replace("[CREATED-DATE]", apply.CreatedOn.ToStrDateTime());
            sample_inf = sample_inf.Replace("[LEAVE-TYPE]", getSampleStr("LeaveApplyType", apply.ApplyType.ToString()));
            sample_inf = sample_inf.Replace("[TOTAL-HOURS]", apply.TotalWorkingHour.ToString());
            var arrsample_inf = sample_inf.Split('|');
            var contentSms_inf = arrsample_inf[1];
            var subject_inf = arrsample_inf[0];

            Notification nInform = new Notification();
            nInform.RefId = apply.Id;            
            nInform.NotiType = (apply.ApplyType.Value == 1 || apply.ApplyType.Value == 2) ? "INFORM_LEAVE" : "INFORM_OT";
            nInform.ContentType = getSampleStr("ContentType", nInform.NotiType);
            nInform.RefType = "LeaveApply";
            nInform.ContentSms = contentSms_inf;
            nInform.Subject = subject_inf;
            nInform.WarningLevel = 1;
            nInform.Status = (short)TEnum.NotificationStatus.Active;
            nInform.AffectUrl = getSampleStr("NotificationURL", nInform.NotiType) + apply.Id.ToString();
            nInform.MultiRecievers = lsDetail_Inform.Count();
            nInform.ToUserIds = nUsers1;
            nInform.FromUserId = apply.ApplyFor;
            nInform.CreatedBy = apply.CreatedBy;
            var listInformInfo = generateNotitficationInfo(nInform, lsSentType);

            string err = "";
            var result = CreateNotification(nApprove, listAppInfo, out err);
            if(result)
                result = CreateNotification(nInform, listInformInfo, out err);

            if (!result)
                res.SetError(err);

            res.Data = result;
            return res;
        }

        public bool Delete(LeaveApply apply, int actor, out string err)
        {
            err = "";
            bool res = false;
            var tran = Context.Database.BeginTransaction();
            try
            {
                var now = DateTime.Now;

                List<LeaveApplyDetail> lstDet = new List<LeaveApplyDetail>();
                var lsDet = Context.LeaveApplyDetail.Where(
                    x=>x.LeaveApplyId== apply.Id
                    && x.Status != (short)TEnum.LeaveApplyDetailStatus.Deleted).ToList();
                foreach(LeaveApplyDetail det in lsDet)
                {
                    det.Status = (short)TEnum.LeaveApplyDetailStatus.Deleted;
                    det.ModifiedOn = now;
                    det.ModifiedBy = actor;
                    lstDet.Add(det);
                }

                List<Notification> lst = new List<Notification>();
                List<NotificationInfo> lst1 = new List<NotificationInfo>();
                
                var lsNoti = Context.Notification.Where(x => x.RefId == apply.Id
                    && x.RefType == "LeaveApply"
                    && x.FromUserId == apply.ApplyFor
                    && x.Status != (short)TEnum.NotificationStatus.Deleted).ToList();
                foreach(Notification noti in lsNoti)
                {
                    noti.Status = (short)TEnum.NotificationStatus.Deleted;
                    noti.ModifiedOn = now;
                    noti.ModifiedBy = actor;
                    lst.Add(noti);
                    var lsNotiInfo = Context.NotificationInfo.Where(
                        x => x.NotiId == noti.Id
                        && x.Status != (short)TEnum.NotificationStatus.Deleted
                        ).ToList();
                    foreach(NotificationInfo notiInfo in lsNotiInfo)
                    {
                        notiInfo.Status = (short)TEnum.NotificationStatus.Deleted;
                        notiInfo.ModifiedOn = now;
                        notiInfo.ModifiedBy = actor;
                        lsNotiInfo.Add(notiInfo);
                    }
                }
                Context.Set<LeaveApplyDetail>().UpdateRange(lstDet);
                Context.Set<Notification>().UpdateRange(lst);
                Context.Set<NotificationInfo>().UpdateRange(lst1);
                tran.Commit();
                res = true;
            }
            catch(Exception ex)
            {
                tran.Rollback();
                err = ex.Message;
                res = false;
            }
            return res;
        }

        private bool CreateNotification(Notification m, List<NotificationInfo> l, out string err)
        {
            err = "";
            var res = false;
            var tran = Context.Database.BeginTransaction();
            try
            {
                var now = DateTime.Now;

                #region -- Notification --
                if (m.CreatedBy != null)
                {
                    m.CreatedOn = now;
                }

                var t = Context.Set<Notification>().Add(m);
                Context.SaveChanges();
                #endregion

                #region -- NotificationInfo --
                List<NotificationLog> lsLog = new List<NotificationLog>();
                List<int> lsReciever = new List<int>();

                lsReciever = getListRecievers(m.ToUserIds);

                foreach (var i in l)
                {
                    if (m.CreatedBy != null)
                    {
                        i.CreatedBy = m.CreatedBy;
                        i.CreatedOn = now;
                    }
                    i.NotiId = t.Entity.Id;

                    foreach (int reciever in lsReciever)
                    {
                        NotificationLog log = new NotificationLog();
                        log.CreatedBy = m.CreatedBy;
                        log.CreatedOn = now;
                        log.NotiId = t.Entity.Id;
                        log.SentType = i.SentType;
                        log.Reciever = reciever;
                        log.Status = (short)TEnum.NotificationLogStatus.PendingSend;
                        lsLog.Add(log);
                    }
                }
                Context.Set<NotificationInfo>().AddRange(l);
                Context.Set<NotificationLog>().AddRange(lsLog);
                Context.SaveChanges();
                #endregion

                res = true;

                tran.Commit();
            }
            catch (Exception ex)
            {
                res = false;
                err = ex.Message;
                tran.Rollback();
            }
            return res;
        }

        private List<NotificationInfo> generateNotitficationInfo(Notification m, string[] sentTypes)
        {
            List<NotificationInfo> res = new List<NotificationInfo>();
            foreach (string type in sentTypes)
            {
                NotificationInfo info = new NotificationInfo();
                info.SentType = type;
                info.Recivers = m.ToUserIds;
                info.Status = (short)TEnum.NotificationStatus.Active;
                //info.NotiId = m.Id;
                res.Add(info);
            }
            return res;
        }

        private string getSampleStr(string type, string value)
        {
            string res = "";
            if(type== "ContentType")
            {
                res = value;
            }
            else if(type == "RefType")
            {
                switch(value)
                {
                    case "APPROVE_LEAVE":
                        {
                            res = "LeaveApply"; //Table name
                            break;
                        }
                    case "APPROVE_OT":
                        {
                            res = "LeaveApply"; //Table name
                            break;
                        }
                    case "IMFORM_LEAVE":
                        {
                            res = "LeaveApply"; //Table name
                            break;
                        }
                    case "IMFORM_OT":
                        {
                            res = "LeaveApply"; //Table name
                            break;
                        }
                    case "LATENCY_NOTE":
                        {
                            res = "LatencyNote"; //Table name
                            break;
                        }
                    case "SOON_LEAVE":
                        {
                            res = "LatencyNote"; //Table name
                            break;
                        }
                    default:
                        {
                            res = "";
                            break;
                        }
                }
            }
            else
            {
                res = Context.Code.Where(
                x => x.CodeType == type &&
                x.Value == value)
                .Select(x => x.DisplayAs).FirstOrDefault().ToString();
            }
            return res;
        }

        private List<int> getListRecievers(string toUids)
        {
            // toUids ~ [1];[3];[4]
            List<int> res = new List<int>();
            var lst = toUids.Split(';');
            foreach(string uid in lst)
            {
                string item = uid;
                item = item.Replace("[", "");
                item = item.Replace("]", "");
                res.Add(int.Parse(item));
            }
            return res;
        }
        #endregion
    }
}
