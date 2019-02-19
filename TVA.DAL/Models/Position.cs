using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class Position
    {
        public int Id { get; set; }
        public string PositionName { get; set; }
        public string JobDescription { get; set; }
        public string JobLevel { get; set; }
        public string JobRequirement { get; set; }
        public string DepartmentId { get; set; }
        public string JobCategory { get; set; }
        public string WorkLocation { get; set; }
        public string SalaryType { get; set; }
        public string PreferLang { get; set; }
        public string PositionType { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
