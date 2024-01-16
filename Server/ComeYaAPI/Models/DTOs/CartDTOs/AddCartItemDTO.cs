using ComeYaAPI.Interfaces;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using System.Security.Claims;

namespace ComeYaAPI.Models.DTOs.CartDTOs
{
    public class AddCartItemDTO: ICartDTO
    {
       


        public int UserId { get; private set; }
        public int ItemId { get; set;}
        public int Quantity { get; set; } = 1;

        public void AssignUserId(ClaimsPrincipal claims)
        {
            UserId = Convert.ToInt32(claims.Claims.FirstOrDefault(c => c.Type == "Id").Value);
        }
    }
}
