using System.Security.Claims;

namespace ComeYaAPI.Interfaces
{
    public interface ICartDTO
    {
        void AssignUserId(ClaimsPrincipal claims);
    }
}
