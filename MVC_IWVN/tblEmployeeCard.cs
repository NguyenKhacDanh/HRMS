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
    
    public partial class tblEmployeeCard
    {
        public int ID { get; set; }
        public Nullable<int> EmployeeID { get; set; }
        public string EmployeeCardID { get; set; }
        public Nullable<int> TypeEmployeeCardID { get; set; }
        public string Note { get; set; }
        public Nullable<bool> isActive { get; set; }
        public Nullable<System.DateTime> DateCreated { get; set; }
        public string UserCreated { get; set; }
        public Nullable<System.DateTime> DateUpdated { get; set; }
        public string UserUpdated { get; set; }
    }
}