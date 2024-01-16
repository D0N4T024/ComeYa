using AutoMapper;
using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Interfaces;
using ComeYaAPI.Repositories;
using ComeYaAPI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;

namespace ComeYaAPI.UnitOfWork
{
    public class UnitOfWork: IUnitOfWork
    {

        private readonly ComeyaContext _context;
    
        private IDbContextTransaction _transaction;
        public UnitOfWork(ComeyaContext context, IMapper mapper, Hasher hasher)
        {
            _context = context;
            Users = new UserRepository(context,mapper,hasher);
            Cart = new CartRepository(context,mapper);
            Items = new ItemRepository(context, mapper);
            Restaurants = new RestaurantRepository(context,mapper);
            Orders = new OrderRepository(context,mapper);
            OrderItem = new OrderItemRepository(context,mapper);
            OrderHistory = new OrderHistoryRepository(context,mapper);

        }

        public IRestaurantRepository Restaurants { get; private set; }
        public IUserRepository Users { get; private set; }
        public IItemRepository Items { get; private set; }
        public ICartRepository Cart {  get; private set; }
        public IOrderItemRepository OrderItem { get; private set; }
        public IOrderRepository Orders { get; private set; }
        public IOrderHistoryRepository OrderHistory { get; private set; }
        public async Task Complete()
        {
            await _context.SaveChangesAsync();
            await _transaction.CommitAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public void BeginTransaction()
        {
            _transaction = _context.Database.BeginTransaction();
        }

        

        public void Rollback()
        {
            _transaction.Rollback();
        }

        public void DisposeWithTransact()
        {
            _transaction?.Dispose();
            _context.Dispose();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}

