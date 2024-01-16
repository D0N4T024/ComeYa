using ComeYa.Interfaces;
using ComeYaAPI.Context;

using ComeYaAPI.Models.DTOs.CartDTOs;
using ComeYaAPI.Models.DTOs.StripeDTOs;
using ComeYaAPI.Services;
using ComeYaAPI.Services.Stripe;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Mvc;
using Nest;
using Newtonsoft.Json;
using Stripe;
using Stripe.Checkout;
using System.Security.Claims;

namespace Server.Controllers;

[ApiController]
[Route("ComeYa/[controller]")]
[ApiExplorerSettings(IgnoreApi = true)]
public class CheckoutController : ControllerBase
{
    private readonly IStripeService _stripe;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWebToken _webToken;
    private readonly ILogger<CheckoutController> _logger;
    const string endpointSecret = "whsec_fe44b56bb936c11723371fab977ba989fd52627f19cc26b23c0dae61b1bb4f27";
    
    public CheckoutController( IStripeService stripe, IUnitOfWork unitOfWork, IWebToken webToken, ILogger<CheckoutController> logger)
    {
        
        _stripe = stripe; 
        _unitOfWork = unitOfWork;
        _logger = logger;
        _webToken = webToken;
       

       // userId = _webToken.ValidateTokenUserId(User);
    }

    [HttpPost]
    [Route("CheckoutOrder")]
    public async Task<ActionResult<CheckoutUrlDTO>> CheckoutOrder(IEnumerable<ShowCartItemDTO> product)
    {
      
        
        try
        {
            
            // Construir la lista de lineItems según tus necesidades
            var lineItems = new List<SessionLineItemOptions>();

            foreach (var item in product)
            {
                
                var lineItem = new SessionLineItemOptions
                {
                    PriceData = new SessionLineItemPriceDataOptions
                    {
                        UnitAmountDecimal = Math.Round(item.Price * 1.18M * 100), // Precio en centavos e impuestos incluidos
                        Currency = "DOP",
                        ProductData = new SessionLineItemPriceDataProductDataOptions
                        {
                            Name = item.Name,
                            Images = new List<string> { item.Image},
                            Description = item.Description,
                        },
                    },
                    Quantity = item.Quantity,
                };

                lineItems.Add(lineItem);
            }

            // Construir las URLs de éxito y cancelación
            var successUrl = "https://localhost:7057/checkout/success";
            var cancelUrl = "https://localhost:7057/checkout/cancel";
            // var successUrl = $"{Request.Scheme}://{Request.Host}/checkout/success";
            //var cancelUrl = $"{Request.Scheme}://{Request.Host}/checkout/cancel";
            try {
                var session = await _stripe.CreateCheckoutSession(lineItems, successUrl, cancelUrl,_webToken.GetUserEmail());

                // Construir el DTO directamente
                var checkoutUrlDto = new CheckoutUrlDTO
                {
                    sessionId = session.Id,
                    url = session.Url
                };

                Console.WriteLine($"Session Object del DTO:\n\n {JsonConvert.SerializeObject(checkoutUrlDto)}\n\n\n");
                //Console.WriteLine($"Session ID: {session?.Id}");

                // Devuelve el DTO directamente en la respuesta
                return  checkoutUrlDto;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error en CheckoutOrder: {ex.Message}");
                return BadRequest($"Error al procesar el pedido: {ex.Message}");
            }
            
        }
        catch (Exception ex)
        {
            // Manejar cualquier excepción
            return BadRequest($"Error al procesar el pedido: {ex.Message}");
        }
    }

    [HttpPost("stripeWebhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        // Capturo el evento de stripe
        var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
        var stripeEvent = EventUtility.ConstructEvent(json,
                    Request.Headers["Stripe-Signature"], endpointSecret);
      
        if (stripeEvent.Type == Events.ChargeSucceeded)
        {
            // Declaro variables para almacenar lo necesario para la insercion
            var charge = stripeEvent.Data.Object as Charge ;

            string receipt = charge.ReceiptUrl;
            decimal amount;
            int id = await _unitOfWork.Users.GetIdUser(charge.BillingDetails.Email);
            var cartItems = await _unitOfWork.Cart.GetCartItems(id);



            try
            {
                _unitOfWork.BeginTransaction();
                int orderId = await _unitOfWork.Orders.Add(receipt);
                amount = _unitOfWork.OrderItem.AddOrderItem(orderId,id,cartItems.Entity);
                await _unitOfWork.OrderHistory.AddOrderHistory(id,orderId);
                
                
                await _unitOfWork.Cart.DeleteAllItems(id);
                await _unitOfWork.Complete();
                _unitOfWork.Dispose();

                return Ok();
            }
            catch (Exception ex)
            {
                
                _unitOfWork.Rollback();
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }
        else
        {
            return Ok();
        }

       
    }



    
}

