using Stripe.Checkout;
using Stripe;
using ComeYaAPI.Models.DTOs.StripeDTOs;
using Newtonsoft.Json;
using Nest;

namespace ComeYaAPI.Services.Stripe
{
    public class StripeService : IStripeService
    {
        private readonly IConfiguration _configuration;
        
         

        public StripeService(IConfiguration configuration)
        {
            _configuration = configuration;
            StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];
        }

        public async Task<Session> CreateCheckoutSession(List<SessionLineItemOptions> lineItems, string successUrl, string cancelUrl, string email)
        {
            
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = lineItems,
                Mode = "payment",
                SuccessUrl = successUrl,
                CancelUrl = cancelUrl,
                CustomerEmail= email
                
            };
             
            var service = new SessionService();
            var session = await service.CreateAsync(options);
            Console.WriteLine($"Session Object del metodo CreateCheckoutSession:\n\n {JsonConvert.SerializeObject(session)}\n\n\n");

            return session;
        }
    }

}
