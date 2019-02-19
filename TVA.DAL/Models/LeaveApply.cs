using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class LeaveApply
    {
        public int Id { get; set; }
        public int? ApplyFor { get; set; }
        public int? ApplyType { get; set; }
        public DateTime? FromTime { get; set; }
        public DateTime? ToTime { get; set; }
        public decimal? TotalWorkingHour { get; set; }
        public string Note { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
