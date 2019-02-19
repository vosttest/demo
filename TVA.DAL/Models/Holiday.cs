using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class Holiday
    {
        public int Id { get; set; }
        public string Day { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public string TypeOfDay { get; set; }
        public string Note { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
