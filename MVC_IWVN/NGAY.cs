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
    
    public partial class NGAY
    {
        public string MaNgay { get; set; }
        public string MaLichTrinhCaLamViec { get; set; }
        public string ChuNhat { get; set; }
        public string ThuHai { get; set; }
        public string ThuBa { get; set; }
        public string ThuTu { get; set; }
        public string ThuNam { get; set; }
        public string ThuSau { get; set; }
        public string ThuBay { get; set; }
    
        public virtual LICHTRINHCHOCALAMVIEC LICHTRINHCHOCALAMVIEC { get; set; }
    }
}