using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class NotificationInfo
    {
        public int Id { get; set; }
        public int? NotiId { get; set; }
        public string SentType { get; set; }
        public string Recivers { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
