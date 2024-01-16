using AutoMapper;
using ComeYa.Repositories;
using ComeYaAPI.Context;
using ComeYaAPI.Interfaces;
using ComeYaAPI.Models.DTOs.ItemDTOs;
using ComeYaAPI.Models.DTOs.RestaurantDTOs;
using ComeYaAPI.Models.ResultsMessages;
using Microsoft.EntityFrameworkCore;
using Nest;
using Stripe;
using Stripe.Climate;

namespace ComeYaAPI.Repositories
{
    public class RestaurantRepository:Repository<Restaurant>, IRestaurantRepository
    {
        private readonly IMapper _mapper;
        public RestaurantRepository(ComeyaContext context,IMapper mapper ) : base(context)
        {
            _mapper = mapper;
        }

        public ComeyaContext? ComeyaContext
        {
            get { return _context as ComeyaContext; }

        }

        public async Task<EntityListResult<ReadRestaurantDTO>> GetAllRestaurants(string? q, int page = 0, int rating = 0)
        {
            var filters = new List<Func<Restaurant, bool>>();
            var result = new EntityListResult<ReadRestaurantDTO>();

            switch (rating)
            {
                case 0:
                    break;
                case 1:
                    filters.Add(x => x.Rating <= 3.5M );
                    break;
                case 2:
                    filters.Add(x => x.Rating > 3.5M);
                    break;
            }

            if (!string.IsNullOrEmpty(q))
            {
               filters.Add(u => u.Name.Contains(q) || u.Description.Contains(q));
            }


            var restaurants = await GetAllAsync();
            var restaurantsQuery = restaurants.AsQueryable();
            var filteredRecords = Filter(restaurantsQuery, filters);
            var pagedFilteredRecords = Paginate(filteredRecords, page, 4M); ;
            var restaurantsDTO = _mapper.Map<IEnumerable<ReadRestaurantDTO>>(pagedFilteredRecords);
         
            result.Entity = restaurantsDTO;

            return result;
            

        }

        public async Task<EntityResult<ReadRestaurantDTO>> GetById(int id)
        {
            var result = new EntityResult<ReadRestaurantDTO>();
            result.StatusCode = 200;
            result.Message = $"El restaurante {id}";

            var restaurant = await GetByIdAsync(id);
            var restaurantDTO = _mapper.Map<ReadRestaurantDTO>(restaurant);
            result.Entity = restaurantDTO;  
            return result;
        }

        public async Task<EntityResult<ReadMenuDTO>> GetMenu(int id)
        {
            var restaurant = await FindAsync(x => x.Id == id);

            await _context.Entry(restaurant)
                .Collection(o => o.Items)
                .Query()
                .Include(oi=> oi.Food)
                .Include(oi=> oi.Food.CategoryType)
                .Include(oi => oi.Food.FoodType)
                .LoadAsync();
            var readMenuDTO = new ReadMenuDTO
            {
                Id = id,
                Name= restaurant.Name,
                Description = restaurant.Description,
                Logo = restaurant.Logo,
                Rating = restaurant.Rating,
                MarketingImg = restaurant.MarketingImg,
                Background = restaurant.Background,
                Items = restaurant.Items.Select(i => new ReadItemDTO
                {
                    
                    Id = i.Id,
                    Description = i.Description,
                    Name = i.Name,
                    Price = i.Price,
                    Image = i.Image,
                    MarketingImg1 = i.MarketingImg1,
                    MarketingImg2 = i.MarketingImg2,
                    Restaurant = restaurant.Name,
                    Food = i.Food.FoodType.Description,
                    Category = i.Food.CategoryType.Description,


                }).ToList()

            };

            var result = new EntityResult<ReadMenuDTO>();
            result.Entity = readMenuDTO;
            result.Message = $"Restaurante {id}";
            result.StatusCode = 200 ;   
            return result;

        }

        
    }
}
