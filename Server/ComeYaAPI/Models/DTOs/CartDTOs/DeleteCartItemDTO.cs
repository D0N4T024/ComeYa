using ComeYaAPI.Interfaces;
using System.Security.Claims;

namespace ComeYaAPI.Models.DTOs.CartDTOs
{
    public class DeleteCartItemDTO:ICartDTO
    {
        
        public int UserId { get; private set; }
        public int ItemId { get; set; }

        public void AssignUserId(ClaimsPrincipal claims)
        {
            UserId = Convert.ToInt32(claims.Claims.FirstOrDefault(c => c.Type == "Id").Value);
        }
    }
}
