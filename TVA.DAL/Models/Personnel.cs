using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class Personnel
    {
        public int Id { get; set; }
        public string Pin { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int Privilege { get; set; }
        public string CardNumber { get; set; }
        public int? HashCode { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
