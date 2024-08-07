﻿using MVC_IWVN.Common;
using MVC_IWVN.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_IWVN.Controllers
{
    public class HistoryTimekeepingController : Controller
    {
        IWVNEntities db = new IWVNEntities();
        MITACOSQL2019Entities _context = new MITACOSQL2019Entities();
        LoadData loaddb = new LoadData();
        ActionLog action = new ActionLog();
        int typeLog = 66;

        // GET: Leave
        [HttpGet]
        public ActionResult Index()
        {
            if (ModelState.IsValid && Session["UserID"] != null)
            {
                List<tblHistoryTimekeeping> historyTimekeepings = db.tblHistoryTimekeeping.ToList();
                List<tblTimeKeeper> timeKeepers = db.tblTimeKeeper.ToList();
                List<tblEmployee> employees = db.tblEmployee.Where(x => x.isActive == true).ToList();
                List<tblDepartment> departments = db.tblDepartment.Where(x => x.isActive == true).ToList();
                List<tblTypeInputTimekeeping> typeInputTimekeepings = db.tblTypeInputTimekeeping.Where(x => x.isActive == true).ToList();
                List<tblPosition> positions = db.tblPosition.Where(x => x.isActive == true).ToList();
                var item = from ht in historyTimekeepings
                           join t in timeKeepers on ht.TimeKeeperID equals t.ID into table1
                           from t in table1.ToList()
                           join e in employees on ht.EmployeeID equals e.ID into table2
                           from e in table2.ToList()
                           join d in departments on e.DepartmentID equals d.ID into table3
                           from d in table3.ToList()
                           join tit in typeInputTimekeepings on ht.TypeInputID equals tit.ID into table4
                           from tit in table4.ToList()
                           join p in positions on e.PositionID equals p.ID into table5
                           from p in table5.ToList()
                           orderby ht.ID descending
                           select new ViewModel
                           {
                               employee = e,
                               department = d,
                               timeKeeper = t,
                               historyTimekeeping = ht,
                               typeInputTimekeeping = tit,
                               position = p,
                           };
                string NhanVien = "";
                DateTime now = DateTime.Now;
                DateTime DateFrom = new DateTime(now.Year, now.Month, 1);
                DateTime DateTo = DateFrom.AddMonths(1).AddDays(-1);
                var parameters = new[]
                {
                    new SqlParameter("@dateFrom", SqlDbType.DateTime) { Value = DateFrom },
                    new SqlParameter("@dateTo", SqlDbType.DateTime) { Value = DateTo },
                    new SqlParameter("@machamcongs", SqlDbType.NVarChar, 200) { Value = (object)NhanVien ?? DBNull.Value }
                };
                var result = _context.Database.SqlQuery<ChamCongVm>("AAu_Export_ChamCongNV @dateFrom, @dateTo, @machamcongs", parameters.ToArray()).ToList();
                action.InsertActionLog(Session["UserName"].ToString(), typeLog, 6, "");
                var filteredResult = result
                        .GroupBy(r => r.MaChamCong)
                        .Where(g => g.Any(r => (r.GioVao != null && r.GioVao != DateTime.Parse("1900-01-01 00:00:00")) ||
                                               (r.GioRa != null && r.GioRa != DateTime.Parse("1900-01-01 00:00:00"))))
                        .SelectMany(g => g)
                        .ToList();
                IEnumerable<ChamCongVm> resultEnumerable = filteredResult;
                return View(resultEnumerable); 

            }
            else return RedirectToAction("Login", "Home");
        }

        [HttpGet]
        public ActionResult Details(int? id)
        {
            if (ModelState.IsValid && id != null)
            {
                try
                {
                    if (Session["UserID"] != null)
                    {
                        var item = db.tblOvertime.Where(a => a.ID == id).FirstOrDefault();
                        SetViewBagForDetails(item);
                        action.InsertActionLog(Session["UserName"].ToString(), typeLog, 11, "");
                        return View(item);
                    }
                    else return RedirectToAction("Login", "Home");
                }
                catch
                {
                    return RedirectToAction("Login", "Home");
                }
            }
            else return RedirectToAction("Login", "Home");
        }

        [HttpPost]
        public ActionResult Details(int id, FormCollection collection)
        {
            if (ModelState.IsValid)
            {
                if (Session["UserID"] != null)
                {
                    var item = db.tblOvertime.Where(a => a.ID.Equals(id)).FirstOrDefault();
                    item.EmployeeID = (collection["EmployeeID"].ToString() != "") ? int.Parse(collection["EmployeeID"]) : 0;
                    item.Reason = collection["Reason"];
                    if (collection["DateOvertime"].ToString() != "")
                        item.DateOvertime = DateTime.Parse(collection["DateOvertime"]);

                    if (collection["FromTime"].ToString() != "" && collection["FromTime"].ToString().Length > 4)
                    {
                        item.FromTime = TimeSpan.Parse(collection["FromTime"].ToString().Substring(0, 5));
                    }


                    if (collection["ToTime"].ToString() != "" && collection["ToTime"].ToString().Length > 4)
                    {
                        item.ToTime = TimeSpan.Parse(collection["ToTime"].ToString().Substring(0, 5));
                    }



                    item.totalHours = (collection["totalHours"].ToString() != "") ? double.Parse(collection["totalHours"]) : 0;
                    item.DateUpdated = DateTime.Now;
                    item.UserUpdated = Encryptor.EncryptString(Session["UserID"].ToString());
                    db.Entry(item).State = EntityState.Modified;
                    db.SaveChanges();
                    TempData["update"] = "Cập nhật thành công";
                    action.InsertActionLog(Session["UserName"].ToString(), typeLog, 8, item.EmployeeID.ToString());

                    return RedirectToAction("Index");
                }
                else
                {
                    return RedirectToAction("Login", "Home");
                }
            }
            else return RedirectToAction("Login", "Home");
        }



        [HttpGet]
        public ActionResult Create()
        {
            if (Session["UserID"] != null)
            {
                getViewBagforCreate();
                return View();
            }
            else return RedirectToAction("Login", "Home");
        }

        // POST: Position/Create
        [HttpPost]
        public ActionResult Create(tblOvertime item)
        {
            if (Session["UserID"] != null)
            {
                try
                {
                    using (IWVNEntities db = new IWVNEntities())
                    {
                        // TODO: Add insert logic here
                        item.isActive = true;
                        item.UserCreated = Encryptor.EncryptString(Session["UserID"].ToString());
                        item.DateCreated = DateTime.Now;

                        db.tblOvertime.Add(item);
                        getViewBagforCreate();
                        db.SaveChanges();
                        action.InsertActionLog(Session["UserName"].ToString(), typeLog, 7, item.EmployeeID.ToString());
                        TempData["insert"] = "Thêm mới thành công";
                        return RedirectToAction("Index");
                    }
                }
                catch
                {
                    return View();
                }
            }
            else return RedirectToAction("Login", "Home");
        }


        #region Set ViewBag
        public void SetViewBagForDetails(tblOvertime item)
        {
            ViewBag.EmployeeList = new SelectList(db.tblEmployee.ToList(), "ID", "EmployeeCode", item.EmployeeID);


            //info Employee
            var employee = db.tblEmployee.Where(x => x.ID == item.EmployeeID).FirstOrDefault();
            ViewBag.Fullname = employee.FirstName + " " + employee.FullName;
            ViewBag.DepartmentName = db.tblDepartment.Where(x => x.ID == employee.DepartmentID).FirstOrDefault().NameDepartmentVN;
            ViewBag.PositionName = db.tblPosition.Where(x => x.ID == employee.PositionID).FirstOrDefault().PositionNameVN;

            //Info time overtime
            ViewBag.Dateovertime = DateTime.Parse(item.DateOvertime.ToString()).ToString("yyyy-MM-dd");
            ViewBag.hourStart = DateTime.Parse(item.FromTime.ToString()).ToString("HH:mm:ss");
            ViewBag.hourEnd = DateTime.Parse(item.ToTime.ToString()).ToString("HH:mm:ss");
        }

        public void getViewBagforCreate()
        {
            ViewBag.EmployeeList = new SelectList(db.tblEmployee.ToList(), "ID", "EmployeeCode");
        }

        #endregion
    }
}