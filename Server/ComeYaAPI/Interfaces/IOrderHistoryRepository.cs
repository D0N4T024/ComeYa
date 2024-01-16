using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.OrderDTOs;
using ComeYaAPI.Models.ResultsMessages;

namespace ComeYaAPI.Interfaces
{
    public interface IOrderHistoryRepository:IRepository<OrderHistory>
    {
        Task AddOrderHistory(int userId, int orderId);
        Task<EntityListResult<ReadOrderDTO>> GetAllOrders(int id, string? code, DateTime? date,int page);
    }
}
