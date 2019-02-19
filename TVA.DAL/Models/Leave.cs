using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class Leave
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? LeaveType { get; set; }
        public int? Year { get; set; }
        public decimal? Balance { get; set; }
        public DateTime? ExpiredDate { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
