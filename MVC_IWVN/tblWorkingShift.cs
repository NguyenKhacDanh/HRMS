//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MVC_IWVN
{
    using System;
    using System.Collections.Generic;
    
    public partial class tblWorkingShift
    {
        public int ID { get; set; }
        public string WorkingShiftVN { get; set; }
        public string WorkingShiftEN { get; set; }
        public Nullable<System.TimeSpan> fromTimeAM { get; set; }
        public Nullable<System.TimeSpan> toTimeAM { get; set; }
        public Nullable<System.TimeSpan> fromTimePM { get; set; }
        public Nullable<System.TimeSpan> toTimePM { get; set; }
        public string Note { get; set; }
        public Nullable<bool> isActive { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
        public string UserCreated { get; set; }
        public Nullable<System.DateTime> DateUpdated { get; set; }
        public string UserUpdated { get; set; }
    }
}