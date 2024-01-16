using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.RestaurantDTOs;
using ComeYaAPI.Models.ResultsMessages;

namespace ComeYaAPI.Interfaces
{
    public interface IRestaurantRepository:IRepository<Restaurant>
    {
        Task<EntityListResult<ReadRestaurantDTO>> GetAllRestaurants(string? q, int page= 0, int rating = 0);
        Task<EntityResult<ReadRestaurantDTO>> GetById(int id);
        Task<EntityResult<ReadMenuDTO>> GetMenu(int id);
    }
}
