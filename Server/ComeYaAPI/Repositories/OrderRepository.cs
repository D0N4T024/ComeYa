using AutoMapper;
using ComeYa.Repositories;
using ComeYaAPI.Context;
using ComeYaAPI.Interfaces;
using System;

namespace ComeYaAPI.Repositories
{
    public class OrderRepository: Repository<Order>, IOrderRepository 
    {
        private readonly IMapper _mapper;
        public ComeyaContext? ComeyaContext
        {
            get { return _context as ComeyaContext; }

        }
        public OrderRepository(ComeyaContext context, IMapper mapper):base(context)
        {
                _mapper = mapper;
        }

        public async Task<Order> GetOrder(string code)
        {
            var order = await FindAsync(x=> x.OrderCode == code);
            return order;
        }

        public async Task<int> Add(string receipt)
        {
            Guid guid = Guid.NewGuid();
            string code = $"ORDER-{guid.ToString("N").Substring(0, 9)}";
            var order = new Order { OrderCode = code, Receipt = receipt};
             _context.Add(order);
            _context.SaveChanges();
            var newOrder = await GetOrder(code);
            return newOrder.Id;
        }

        //public async void Add()
        //{
        //    
        //    string code = uniqueGuid.ToString();
        //    var order = new Order {OrderCode = code};
        //    await AddAsync(order);

        //}
    }
}
