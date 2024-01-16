using AutoMapper;
using ComeYa.Repositories;
using ComeYaAPI.Context;
using ComeYaAPI.Interfaces;
using ComeYaAPI.Models.DTOs.CartDTOs;
using ComeYaAPI.Models.ResultsMessages;
using Microsoft.AspNetCore.Mvc;

namespace ComeYaAPI.Repositories
{
    public class CartRepository: Repository<Cart>, ICartRepository
    {
        private readonly IMapper _mapper;   
        public CartRepository(ComeyaContext context, IMapper mapper): base(context)
        {
            _mapper = mapper;
        }

        public ComeyaContext? ComeyaContext
        {
            get { return _context as ComeyaContext; }

        }

        public async Task<EntityListResult<ShowCartItemDTO>> AddCartItem(AddCartItemDTO itemDTO) 
        {
            var cartItems = await GetAllIncluding<Cart>(u => u.UserId == itemDTO.UserId, x=> x.Item);
            var result = new EntityListResult<ShowCartItemDTO>();
            if (cartItems.Count() != 0) // Verifico si el carrito esta vacio
            {
                
                foreach (var i in cartItems)
                {
                    if (i.ItemId == itemDTO.ItemId)
                    {

                        var itemQtyUpdated = _mapper.Map<UpdateQtyDTO>(itemDTO);
                        itemQtyUpdated.Quantity = ++i.Quantity;
                       
                        await UpdateQty(itemQtyUpdated); // Si existe el item en el carrito, se le 
                        result.Message = "El articulo " + i.Item.Name + " ha sido actualizado.";
                        return result;
                    }
                }
            }
            
                var item = _mapper.Map<Cart>(itemDTO);
                item.UserId = itemDTO.UserId;
                await AddAsync(item);
                result = await GetCartItems(item.UserId);
                return result;
            
            
           
        }

        public async Task<EntityListResult<ShowCartItemDTO>> GetCartItems(int userId,int page = 1)
        {

            var result = new EntityListResult<ShowCartItemDTO>();
            result.Entity = null;
            result.StatusCode = 400;
            result.Message = "Agregue articulos a su carrito.";
            var cartList = await GetAllIncluding<Cart>(useritem => useritem.User.Id == userId,
                x=> x.Item
                );
            

             var pagedRecords =  Paginate(cartList, page,5M);
             var cartItemDTOList = cartList
                .Select(cart => new ShowCartItemDTO
             {
                 Id = cart.ItemId,
                // Description = cart.Item.Description,
                 Name = cart.Item.Name, // Supongo que hay una propiedad Description en la clase Item
                 Price = cart.Item.Price,              // Supongo que hay una propiedad Price en la clase Item
                 Quantity = cart.Quantity,
                 Amount = Math.Round(cart.Quantity * cart.Item.Price* 1.18M,2),  // Cálculo del monto total
                 Image = cart.Item.Image,
             }).ToList();

            result.Entity = cartItemDTOList;
            result.StatusCode = 200;
            return result;
        }

        public async Task<bool> CheckIfEmpty(int id) {

            var cart = await FindAllAsync(c => c.UserId == id);

            if (cart.Count() ==0 ) return true;

           
           

            return false;
        }


        public async Task UpdateQty(UpdateQtyDTO qty)
        {
            var item = await FindAsync(i => i.UserId == qty.UserId && i.ItemId == qty.ItemId);
            item.Quantity = qty.Quantity;

            await Update(item);
        }

        public Task<EntityListResult<ShowCartItemDTO>> AddCartItem(AddCartItemDTO itemDTO, int id)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteItem(DeleteCartItemDTO itemDTO)
        {
            var item = await FindAsync(x=> x.UserId == itemDTO.UserId && x.ItemId == itemDTO.ItemId);
            Delete(item);
        }

        public async Task DeleteAllItems(int id)
        {
            var items = await FindAllAsync(x => x.UserId == id);
            DeleteRange(items);
        }

        public async Task<decimal> GetCartBalance(int id)
        {
            var cart = await GetCartItems(id);
            decimal balance=0;

            foreach(var item in cart.Entity)
            {
                balance += item.Amount;
            }

            return balance;
        }
    }
}
