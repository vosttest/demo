using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class LeaveDetail
    {
        public int Id { get; set; }
        public int? LeaveId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? FromTime { get; set; }
        public DateTime? ToTime { get; set; }
        public int? RefId { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
