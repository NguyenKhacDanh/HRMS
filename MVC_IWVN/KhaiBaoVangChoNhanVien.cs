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
    
    public partial class KhaiBaoVangChoNhanVien
    {
        public int ID { get; set; }
        public Nullable<int> MaChamCong { get; set; }
        public Nullable<int> Nam { get; set; }
        public Nullable<int> Thang { get; set; }
        public Nullable<System.DateTime> NgayThang { get; set; }
        public string MaCacLoaiVang { get; set; }
        public string ApDung { get; set; }
        public Nullable<int> TongPhut { get; set; }
        public string NgayCong { get; set; }
        public string GhiChu { get; set; }
        public Nullable<bool> DuocHuongLuong { get; set; }
    
        public virtual NHANVIEN NHANVIEN { get; set; }
    }
}
