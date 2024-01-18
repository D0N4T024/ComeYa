using System.Net.Mail;
using System.Net;

namespace ComeYaAPI.Services
{
    public class EmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration) 
        { 
            _configuration = configuration;
        }
        public async Task SendEmail(string toEmail, string code)
        {
            string htmlBody = "<html><body>";
            htmlBody += "<h1>ComeYa</h1>";
            htmlBody += "<p>Disfruta de las mejores comidas con el mejor servicio</p>";
            htmlBody += $"<p>Activa tu cuenta con el enlace de abajo usando este codigo {code}</p>";
            htmlBody += $"<a href='http://localhost:3000/Account/VerifyAccount'>VERIFICATE YA!</a>";
           
            htmlBody += "</body></html>";

            string fromMail = _configuration["EmailService:FromMail"]!;
            string password = _configuration["EmailService:FromPassword"]!;
            MailMessage message = new MailMessage();
            message.From = new MailAddress(fromMail);
            message.Subject = "Prueba";
            message.To.Add(new MailAddress(toEmail));
            message.Body = htmlBody;
            message.IsBodyHtml = true;

            var smtpClient = new SmtpClient(_configuration["EmailService:Server"])
            {
                Port = int.Parse(_configuration["EmailService:Port"]!),
                Credentials = new NetworkCredential(fromMail, password),
                EnableSsl = true
            };

           await smtpClient.SendMailAsync(message);
        }
    }
}
