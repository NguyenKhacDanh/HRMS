﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class MITACOSQL2019Entities : DbContext
    {
        public MITACOSQL2019Entities()
            : base("name=MITACOSQL2019Entities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AAu_CaLamViec> AAu_CaLamViec { get; set; }
        public virtual DbSet<AAu_ChamCongTongHop> AAu_ChamCongTongHop { get; set; }
        public virtual DbSet<AAu_GiangVien> AAu_GiangVien { get; set; }
        public virtual DbSet<AAu_HinhThuc> AAu_HinhThuc { get; set; }
        public virtual DbSet<CACLOAIVANG> CACLOAIVANGs { get; set; }
        public virtual DbSet<CALAMVIEC> CALAMVIECs { get; set; }
        public virtual DbSet<CaLamViecNew> CaLamViecNews { get; set; }
        public virtual DbSet<CheckInOut> CheckInOuts { get; set; }
        public virtual DbSet<CheckInOut2> CheckInOut2 { get; set; }
        public virtual DbSet<CHUCVU> CHUCVUs { get; set; }
        public virtual DbSet<CHUCVUNHANVIEN> CHUCVUNHANVIENs { get; set; }
        public virtual DbSet<CONGTY> CONGTies { get; set; }
        public virtual DbSet<DanToc> DanTocs { get; set; }
        public virtual DbSet<KhaiBaoVangChoNhanVien> KhaiBaoVangChoNhanViens { get; set; }
        public virtual DbSet<KHUVUC> KHUVUCs { get; set; }
        public virtual DbSet<KYHIEUCHAMCONG> KYHIEUCHAMCONGs { get; set; }
        public virtual DbSet<LICHTRINHCHOCALAMVIEC> LICHTRINHCHOCALAMVIECs { get; set; }
        public virtual DbSet<LICHTRINHVAORA> LICHTRINHVAORAs { get; set; }
        public virtual DbSet<MAYCHAMCONG> MAYCHAMCONGs { get; set; }
        public virtual DbSet<Maychu> Maychus { get; set; }
        public virtual DbSet<NGAY> NGAYs { get; set; }
        public virtual DbSet<NGAYLE> NGAYLEs { get; set; }
        public virtual DbSet<NgayTinhCong> NgayTinhCongs { get; set; }
        public virtual DbSet<NGUOIDUNG> NGUOIDUNGs { get; set; }
        public virtual DbSet<NHANVIEN> NHANVIENs { get; set; }
        public virtual DbSet<NhanVien_Test_> NhanVien_Test_ { get; set; }
        public virtual DbSet<NhanVienChuyenPhongBan> NhanVienChuyenPhongBans { get; set; }
        public virtual DbSet<NHANVIEN1> NHANVIENs1 { get; set; }
        public virtual DbSet<NhanVienVirtual> NhanVienVirtuals { get; set; }
        public virtual DbSet<NhatKyHeThong> NhatKyHeThongs { get; set; }
        public virtual DbSet<PhanTheoGio> PhanTheoGios { get; set; }
        public virtual DbSet<PhoneNumber> PhoneNumbers { get; set; }
        public virtual DbSet<PHONGBAN> PHONGBANs { get; set; }
        public virtual DbSet<PHUCAP> PHUCAPs { get; set; }
        public virtual DbSet<QuocTich> QuocTiches { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<TINHTHANH> TINHTHANHs { get; set; }
        public virtual DbSet<TrinhDo> TrinhDoes { get; set; }
        public virtual DbSet<TUYCHON> TUYCHONs { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<ChiTietCongTruLuong> ChiTietCongTruLuongs { get; set; }
        public virtual DbSet<ChiTietDangKyTangCa> ChiTietDangKyTangCas { get; set; }
        public virtual DbSet<ChiTietDiCongTac> ChiTietDiCongTacs { get; set; }
        public virtual DbSet<ChiTietLichTrinhCaLamViec> ChiTietLichTrinhCaLamViecs { get; set; }
        public virtual DbSet<CHITIETPHUCAPNHANVIEN> CHITIETPHUCAPNHANVIENs { get; set; }
        public virtual DbSet<CHITIETTAMUNGLUONG> CHITIETTAMUNGLUONGs { get; set; }
        public virtual DbSet<ChiTietThuongNhanVien> ChiTietThuongNhanViens { get; set; }
        public virtual DbSet<Face> Faces { get; set; }
        public virtual DbSet<GioHenTaiTuDong> GioHenTaiTuDongs { get; set; }
        public virtual DbSet<PHEPNAM> PHEPNAMs { get; set; }
        public virtual DbSet<TEMPLATE> TEMPLATEs { get; set; }
        public virtual DbSet<TinhCong> TinhCongs { get; set; }
        public virtual DbSet<TuDongSaoLuu> TuDongSaoLuus { get; set; }
        public virtual DbSet<ViPham> ViPhams { get; set; }
    }
}