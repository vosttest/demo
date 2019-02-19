using System;
using System.Collections.Generic;

namespace TVA.DAL.Models
{
    public partial class PersonnelLog
    {
        public int Id { get; set; }
        public string Pin { get; set; }
        public DateTime? Date { get; set; }
        public int? Type { get; set; }
        public int? State { get; set; }
        public int? Code { get; set; }
        public string DeviceId { get; set; }
        public string Latitude { get; set; }
        public string Longtitude { get; set; }
        public string Altitude { get; set; }
        public string Address { get; set; }
        public bool IsCheckIn { get; set; }
        public int? HashCode { get; set; }
        public short Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedOn { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
    }
}
