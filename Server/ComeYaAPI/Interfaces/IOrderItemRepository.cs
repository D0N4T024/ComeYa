using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.CartDTOs;

namespace ComeYaAPI.Interfaces
{
    public interface IOrderItemRepository: IRepository<OrderItem>
    {
        decimal AddOrderItem(int orderId, int userId, IEnumerable<ShowCartItemDTO> items);
    }
}
