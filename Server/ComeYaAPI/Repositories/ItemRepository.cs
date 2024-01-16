using AutoMapper;
using ComeYa.Repositories;
using ComeYaAPI.Context;
using ComeYaAPI.Interfaces;
using ComeYaAPI.Models.DTOs.ItemDTOs;
using ComeYaAPI.Models.ResultsMessages;
using ComeYaAPI.Services;

namespace ComeYaAPI.Repositories
{
    public class ItemRepository: Repository<Item>, IItemRepository
    {
        private readonly IMapper _mapper;
        
        public ItemRepository(ComeyaContext context, IMapper mapper) : base(context)
        {
           
            _mapper = mapper;
        }
        public ComeyaContext? ComeyaContext
        {
            get { return _context as ComeyaContext; }
           
        }

        public async Task<EntityListResult<ReadItemDTO>> GetAllItems(string? type, string? category, decimal price , int page, ulong combo, int restaurant, int rand)
        {
            var filters = new List<Func<Item, bool>>();
            var result = new EntityListResult<ReadItemDTO>();

            if (!string.IsNullOrEmpty(type)) filters.Add(x => x.Food.FoodType.Description == type);
            if (price > 0) filters.Add(x => x.Price <= price);
            if (combo != 2) filters.Add(x=> x.Combo == combo);
            if (restaurant != 0) filters.Add(x => x.Restaurant.Id == restaurant);
            if(!string.IsNullOrEmpty(category)) filters.Add(x=> x.Food.CategoryType.Description==category); 
            

            var items = await GetAllIncluding<Item>(null,
                x => x.Food,
                x => x.Food.CategoryType,
                x=> x.Food.FoodType,
                x=> x.Restaurant
                );
            
            var filteredItems = Filter(items,filters);
            if (rand != 0) filteredItems = GetAllRandom(filteredItems);
            var pagedFilteredRecords = Paginate(filteredItems,page,4M);

            var itemsDTOList = pagedFilteredRecords.Select(x => new ReadItemDTO
            {
                Id = x.Id,
                Price = x.Price,
                Description = x.Description,
                Restaurant = x.Restaurant.Name,
                Image = x.Image,
                Name = x.Name,
                Combo = x.Combo,
                RestaurantId = x.RestaurantId,
                Food = x.Food.FoodType.Description,
                Category = x.Food.CategoryType.Description,
                MarketingImg1= x.MarketingImg1,
                MarketingImg2 = x.MarketingImg2,


            }).ToList();

           
            result.StatusCode = 200;
            result.Entity = itemsDTOList;
            return result;


        }

        

        public async Task<EntityResult<ReadItemDTO>> GetItemById(int id)
        {
            var result = new EntityResult<ReadItemDTO>();

            var item = await FindIncluding<Item>(null,
                x => x.Food,
                x => x.Food.CategoryType,
                x => x.Food.FoodType,
                x => x.Restaurant
                );

            var itemDTO = new ReadItemDTO
            {
                Id = item.Id,
                Price = item.Price,
                Description = item.Description,
                Restaurant = item.Restaurant.Name,
                Image = item.Image,
                Combo = item.Combo,
                Name = item.Name,
                RestaurantId=item.RestaurantId,
                Food = item.Food.FoodType.Description,
                Category = item.Food.CategoryType.Description
            };

            result.Entity = itemDTO;
            result.StatusCode = 200;
            result.Message = $"Articulo {item.Id}";

            return result;
        }
    }
}
