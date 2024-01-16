using AutoMapper;
using ComeYa.Repositories;
using ComeYaAPI.Context;
using ComeYaAPI.Interfaces;
using ComeYaAPI.Models.DTOs.CartDTOs;
using ComeYaAPI.Services;

namespace ComeYaAPI.Repositories
{
    public class OrderItemRepository: Repository<OrderItem>, IOrderItemRepository
    {
        private readonly IMapper _mapper;
        public OrderItemRepository(ComeyaContext context, IMapper mapper) : base(context)
        {
            
            _mapper = mapper;
        }

        public ComeyaContext? ComeyaContext
        {
            get { return _context as ComeyaContext; }

        }
        public decimal AddOrderItem(int orderId, int userId, IEnumerable<ShowCartItemDTO> items)
        {

            decimal balance = 0M;
            foreach (var item in items)
            {
                _context.Add(new OrderItem
                {
                    OrderId = orderId,
                    ItemId = item.Id,
                    Amount = Math.Round(item.Amount,2),
                    Quantity = item.Quantity,
                    Taxes = Math.Round(item.Amount*0.18M,2)
                    
                });
                balance += item.Amount;
                _context.SaveChanges();

            }

           return balance;
            



        }

    }
}
