using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class UserInfo
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? PositionId { get; set; }
        public int? GroupId { get; set; }
        public DateTime? StartedOn { get; set; }
        public DateTime? EndedOn { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
