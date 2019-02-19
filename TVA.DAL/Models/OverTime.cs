using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class OverTime
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? ProjectId { get; set; }
        public DateTime? Fr { get; set; }
        public DateTime? To { get; set; }
        public string Note { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
