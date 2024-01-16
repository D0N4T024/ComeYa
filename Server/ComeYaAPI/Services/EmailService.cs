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
            htmlBody += "<h1>Esto es un título</h1>";
            htmlBody += "<p>Este es un párrafo de ejemplo.</p>";
            htmlBody += $"<p>Puedes hacer clic en el siguiente enlace:</p>";
            htmlBody += $"<a href='javascript:void(0);' onclick='sendPatchRequest({code})'>Realizar PATCH</a>";
            htmlBody += "<script>";
            htmlBody += "function sendPatchRequest(parametro) {";
            htmlBody += "  var xhr = new XMLHttpRequest();";
            htmlBody += "  xhr.open('PATCH', 'https://tuapi.com/tu-endpoint', true);";
            htmlBody += "  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');";
            htmlBody += "  var payload = { parametro: parametro };";  // Reemplaza con tu estructura de payload
            htmlBody += "  xhr.send(JSON.stringify(payload));";
            htmlBody += "}";
            htmlBody += "</script>";
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
