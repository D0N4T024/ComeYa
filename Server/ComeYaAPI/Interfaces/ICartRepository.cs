using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.CartDTOs;
using ComeYaAPI.Models.ResultsMessages;
using Microsoft.AspNetCore.Mvc;

namespace ComeYaAPI.Interfaces
{
    public interface ICartRepository: IRepository<Cart>
    {
        Task<EntityListResult<ShowCartItemDTO>> GetCartItems(int userId, int page=1);
        Task<EntityListResult<ShowCartItemDTO>> AddCartItem(AddCartItemDTO itemDTO);
        Task UpdateQty(UpdateQtyDTO qty);
        Task<bool> CheckIfEmpty(int id);
        Task DeleteItem(DeleteCartItemDTO itemDTO);
        Task DeleteAllItems(int id);

        Task<decimal> GetCartBalance(int id);
        

    }
}
