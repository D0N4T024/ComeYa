using ComeYaAPI.Models.DTOs.StripeDTOs;
using Stripe.Checkout;

namespace ComeYaAPI.Services.Stripe
{
    public interface IStripeService
    {
        Task<Session> CreateCheckoutSession(List<SessionLineItemOptions> lineItems, string successUrl, string cancelUrl, string email);
    }
}
