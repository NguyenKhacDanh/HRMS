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
    
    public partial class IWVNEntities : DbContext
    {
        public IWVNEntities()
            : base("name=IWVNEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<tblAllowance> tblAllowance { get; set; }
        public virtual DbSet<tblAllowanceCategory> tblAllowanceCategory { get; set; }
        public virtual DbSet<tblAnnualLeave> tblAnnualLeave { get; set; }
        public virtual DbSet<tblAnnualLeaveDetail> tblAnnualLeaveDetail { get; set; }
        public virtual DbSet<tblCompany> tblCompany { get; set; }
        public virtual DbSet<tblContract> tblContract { get; set; }
        public virtual DbSet<tblDegree> tblDegree { get; set; }
        public virtual DbSet<tblDepartment> tblDepartment { get; set; }
        public virtual DbSet<tblDiscipline> tblDiscipline { get; set; }
        public virtual DbSet<tblDisciplineType> tblDisciplineType { get; set; }
        public virtual DbSet<tblEducation> tblEducation { get; set; }
        public virtual DbSet<tblEmployee> tblEmployee { get; set; }
        public virtual DbSet<tblEmployeeCard> tblEmployeeCard { get; set; }
        public virtual DbSet<tblForeignLanguage> tblForeignLanguage { get; set; }
        public virtual DbSet<tblHistoryTimekeeping> tblHistoryTimekeeping { get; set; }
        public virtual DbSet<tblHistoryWork> tblHistoryWork { get; set; }
        public virtual DbSet<tblHoliday> tblHoliday { get; set; }
        public virtual DbSet<tblISalaryFormula> tblISalaryFormula { get; set; }
        public virtual DbSet<tblLeave> tblLeave { get; set; }
        public virtual DbSet<tblLeaveDetail> tblLeaveDetail { get; set; }
        public virtual DbSet<tblMaritalStatus> tblMaritalStatus { get; set; }
        public virtual DbSet<tblNation> tblNation { get; set; }
        public virtual DbSet<tblNationality> tblNationality { get; set; }
        public virtual DbSet<tblOvertime> tblOvertime { get; set; }
        public virtual DbSet<tblPosition> tblPosition { get; set; }
        public virtual DbSet<tblProvince> tblProvince { get; set; }
        public virtual DbSet<tblRelationship> tblRelationship { get; set; }
        public virtual DbSet<tblRelationshipType> tblRelationshipType { get; set; }
        public virtual DbSet<tblReligion> tblReligion { get; set; }
        public virtual DbSet<tblReward> tblReward { get; set; }
        public virtual DbSet<tblRewardForm> tblRewardForm { get; set; }
        public virtual DbSet<tblRole> tblRole { get; set; }
        public virtual DbSet<tblRoleCategory> tblRoleCategory { get; set; }
        public virtual DbSet<tblSalarySheet> tblSalarySheet { get; set; }
        public virtual DbSet<tblSalarySheetAllowance> tblSalarySheetAllowance { get; set; }
        public virtual DbSet<tblSalarySheetDetail> tblSalarySheetDetail { get; set; }
        public virtual DbSet<tblShiftArrange> tblShiftArrange { get; set; }
        public virtual DbSet<tblStatusWork> tblStatusWork { get; set; }
        public virtual DbSet<tblSysAction> tblSysAction { get; set; }
        public virtual DbSet<tblSysFunction> tblSysFunction { get; set; }
        public virtual DbSet<tblSysLog> tblSysLog { get; set; }
        public virtual DbSet<tblTimeKeeper> tblTimeKeeper { get; set; }
        public virtual DbSet<tblTimesheet> tblTimesheet { get; set; }
        public virtual DbSet<tblTimesheetDetail> tblTimesheetDetail { get; set; }
        public virtual DbSet<tblTypeContract> tblTypeContract { get; set; }
        public virtual DbSet<tblTypeEmployeeCard> tblTypeEmployeeCard { get; set; }
        public virtual DbSet<tblTypeInputTimekeeping> tblTypeInputTimekeeping { get; set; }
        public virtual DbSet<tblTypeLeave> tblTypeLeave { get; set; }
        public virtual DbSet<tblTypeReward> tblTypeReward { get; set; }
        public virtual DbSet<tblWorkingShift> tblWorkingShift { get; set; }
        public virtual DbSet<UserProfile> UserProfile { get; set; }
    }
}