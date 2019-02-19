using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class LeaveApplyDetail
    {
        public int Id { get; set; }
        public int? LeaveApplyId { get; set; }
        public string ApplyDetailType { get; set; }
        public int? ActionBy { get; set; }
        public string Comment { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
