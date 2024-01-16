using ComeYaAPI.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ComeYa.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository Users { get; }
        ICartRepository Cart { get; }
        IItemRepository Items { get; }
        IRestaurantRepository Restaurants { get; }
        
        IOrderRepository Orders { get; }
        IOrderItemRepository OrderItem { get; }
        IOrderHistoryRepository OrderHistory { get; }

        Task Complete();
        void BeginTransaction();
        void Rollback();
        void DisposeWithTransact();
        Task SaveChangesAsync();
        
    }
}

