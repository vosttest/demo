using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class TimeKeepingDetail
    {
        public int Id { get; set; }
        public int? TimeKeepingId { get; set; }
        public int? UserId { get; set; }
        public int? DayOfMonth { get; set; }
        public decimal? TotalHour { get; set; }
        public string TypeOfDay { get; set; }
        public string Note { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
