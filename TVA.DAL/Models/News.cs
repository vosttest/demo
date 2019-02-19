using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class News
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Brief { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public string NewsType { get; set; }
        public int? Group { get; set; }
        public string ImgUrl { get; set; }
        public string Thumbnail { get; set; }
        public int? NewsBy { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
