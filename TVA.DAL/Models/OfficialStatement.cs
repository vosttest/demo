using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class OfficialStatement
    {
        public int Id { get; set; }
        public string StatementId { get; set; }
        public string StatementType { get; set; }
        public string Content { get; set; }
        public int? Group { get; set; }
        public string Title { get; set; }
        public bool? IsPublic { get; set; }
        public int? ApprovedBy { get; set; }
        public DateTime? ApprovedOn { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
