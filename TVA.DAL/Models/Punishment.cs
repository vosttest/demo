﻿using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class Punishment
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? TypeId { get; set; }
        public string Content { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
