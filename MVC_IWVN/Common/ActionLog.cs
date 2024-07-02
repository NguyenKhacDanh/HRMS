using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MVC_IWVN.Common
{
    public class ActionLog
    {
        private IWVNEntities db = new IWVNEntities();
        public void InsertActionLog(string AccountName , int FunctionID , int ActionID , string ObjectID )
        {
            tblSysLog syslog = new tblSysLog();
            syslog.AccountLogin = AccountName;
            syslog.DateLog = DateTime.Now;
            syslog.FunctionLog = FunctionID;
            syslog.ActionLog = ActionID;
            syslog.ObjectLog = ObjectID;
            db.tblSysLog.Add( syslog );
            db.SaveChanges();
        }
    }
}