using ComeYa.Interfaces;
using ComeYaAPI.Context;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ComeYaAPI.Controllers
{
    [Route("ComeYa/[controller]")]
    [ApiController]
    public class RestaurantsController : ControllerBase
    {
        
        private readonly IUnitOfWork _unitOfWork;
        public RestaurantsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllRestaurants(string? q, int page = 0, int rating = 0)
        {
            var restaurants = await  _unitOfWork.Restaurants.GetAllRestaurants(q,page,rating);
            _unitOfWork.Dispose();

            return Ok(restaurants.Entity);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            var restaurant = await _unitOfWork.Restaurants.GetById(id);
            _unitOfWork.Dispose();

            return Ok(restaurant.Entity);
        }

        
    }
}
