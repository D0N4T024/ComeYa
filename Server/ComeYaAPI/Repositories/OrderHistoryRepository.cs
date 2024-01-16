using AutoMapper;
using ComeYa.Repositories;
using ComeYaAPI.Context;
using ComeYaAPI.Interfaces;
using ComeYaAPI.Models.DTOs.OrderDTOs;
using ComeYaAPI.Models.ResultsMessages;
using ComeYaAPI.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ComeYaAPI.Repositories
{
    public class OrderHistoryRepository:Repository<OrderHistory>, IOrderHistoryRepository
    {
        private readonly IMapper _mapper;
        public OrderHistoryRepository(ComeyaContext context, IMapper mapper) : base(context)
        {
            
            _mapper = mapper;
        }

        public ComeyaContext? ComeyaContext
        {
            get { return _context as ComeyaContext; }

        }

        public async Task AddOrderHistory(int userId, int orderId)
        {
            var order = new OrderHistory { OrderId = orderId, UserId = userId };
            await AddAsync(order);
        }

        public async Task<EntityListResult<ReadOrderDTO>> GetAllOrders(int id, string? code,DateTime? date, int page)
        {
            // Filtrar las Order por el usuario
            // Hacer un include en Order y OrderItem
            // Conseguir la lista 
            List<ReadOrderDTO> listOrderDTO = new();
            List<Func<OrderHistory,bool>> filters = new();
            EntityListResult<ReadOrderDTO> result = new();

            if(code != null) { filters.Add(x=> x.Order.OrderCode.Contains(code) ); }    
            if(date != null) { filters.Add(x=> x.Order.CreatedAt >  date); }

            var orders = await GetAllIncluding<OrderHistory>
               (x => x.UserId == id,
               x => x.Order,
               x=>x.Order.OrderStatus,
               x=>x.Order.OrderItems);
            var filteredOrders = Filter(orders,filters);
            var paginatedOrders = Paginate(filteredOrders, page, 2M);

            // Convertir ese objeto en el DTO
            foreach (var order in paginatedOrders)
            {
                await _context.Entry(order.Order)
                .Collection(o => o.OrderItems)
                .Query()
                .Include(oi => oi.Item)
                .LoadAsync();
                var newOrder = new ReadOrderDTO
                {
                    Code = order.Order.OrderCode,
                    Status = order.Order.OrderStatus.Description,
                    Receipt = order.Order.Receipt,
                    Date = order.Order.CreatedAt.ToString(),
                    Items = new(),
                };
                foreach (var orderItem in order.Order.OrderItems)
                {
                    var newOrderItem = new ReadOrderItemDTO
                    {
                       
                        Name = orderItem.Item.Name,
                        Quantity = orderItem.Quantity,
                        Price = orderItem.Item.Price,
                        Amount = Math.Round(orderItem.Item.Price * orderItem.Quantity,2),
                        Taxes = Math.Round(orderItem.Item.Price * orderItem.Quantity*0.18M,2)
                    };

                    newOrder.Items.Add(newOrderItem); // Agregamos el item a la lista
                    newOrder.Amount += newOrderItem.Amount;
                    newOrder.Amount = Math.Round(newOrder.Amount,2);
                    
                    newOrder.Taxes += newOrderItem.Taxes;
                    newOrder.Taxes = Math.Round(newOrder.Taxes, 2);
                }
                listOrderDTO.Add(newOrder);
            }
            result.Entity = listOrderDTO;
            result.StatusCode = 200;
            result.Message = "Ordenes enviadas exitosamente";
            return result;
        }
    }
}
