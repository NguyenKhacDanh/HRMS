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
    
    public partial class ChiTietDiCongTac
    {
        public int ID { get; set; }
        public Nullable<int> MaChamCong { get; set; }
        public Nullable<System.DateTime> Ngay { get; set; }
        public Nullable<System.DateTime> GioDi { get; set; }
        public Nullable<System.DateTime> GioVe { get; set; }
        public Nullable<decimal> TongGioCongTac { get; set; }
        public Nullable<decimal> CongTinhCongTac { get; set; }
        public string LyDo { get; set; }
    
        public virtual NHANVIEN NHANVIEN { get; set; }
    }
}
