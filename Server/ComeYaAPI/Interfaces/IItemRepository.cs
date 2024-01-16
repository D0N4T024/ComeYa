using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.ItemDTOs;
using ComeYaAPI.Models.ResultsMessages;

namespace ComeYaAPI.Interfaces
{
    public interface IItemRepository: IRepository<Item>
    {
        // Metodo Get para mostrar todos los items
        Task<EntityListResult<ReadItemDTO>> GetAllItems(string? type, string? category, decimal price, int page,ulong combo, int restaurant, int rand);
        // Metodo Get para mostrar los combos (filtro: Precio, FoodType, Restaurante)
        Task<EntityResult<ReadItemDTO>> GetItemById(int id);
        // Metodo Get por tipo de comida (Hambuerguesa, Pizza, ...)(filtro: Precio, FoodType, Restaurante)
        // Metodo Get por categoria de comida (Si es Vegana o no) (filtro: Precio, FoodType, Restaurante)
        // Metodo Get por restaurante 

        // Son filtros los tres ultimos de arriba
    }

}
