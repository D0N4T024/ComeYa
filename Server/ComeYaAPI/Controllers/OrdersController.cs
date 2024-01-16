using ComeYa.Interfaces;
using ComeYaAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComeYaAPI.Controllers
{
    [Route("ComeYa/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IWebToken _webToken;
        public OrdersController(IUnitOfWork unitOfWork, IWebToken webToken)
        {
            _unitOfWork = unitOfWork;
            _webToken = webToken;
        }

        [HttpGet("GetOrders")]
        public async Task<ActionResult> GetOrders( string? code, DateTime? date, int page = 1)
        {
            int id = _webToken.GetUserId();
            var orders = await _unitOfWork.OrderHistory.GetAllOrders(id,code,date,page);
            _unitOfWork.Dispose();

            return Ok(orders.Entity);
        }

    }
}
