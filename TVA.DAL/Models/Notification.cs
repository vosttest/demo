using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class Notification
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string ContentHtml { get; set; }
        public string ContentSms { get; set; }
        public int? FromUserId { get; set; }
        public int? MultiRecievers { get; set; }
        public string ToUserIds { get; set; }
        public string AffectUrl { get; set; }
        public string NotiType { get; set; }
        public int? RefId { get; set; }
        public string RefType { get; set; }
        public int? WarningLevel { get; set; }
        public string ContentType { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
