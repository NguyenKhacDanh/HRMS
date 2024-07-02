using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;

namespace MVC_IWVN.Common
{
    public class EmailConfig
    {
        public void sendEmail(string toEmail,string fromEmail , string subjectEmail ,string bodyEmail)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(toEmail);
            mail.From = new MailAddress(fromEmail);
            mail.Subject = subjectEmail;
            string Body = bodyEmail;
            mail.Body = Body;
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.hrmiwvn.com";
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential("admin@hrmiwvn.com", "Conan1991@#"); // Enter seders User name and password       
            smtp.EnableSsl = true;
            smtp.Send(mail);
        }
    }
}