using AutoMapper;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.CartDTOs;
using ComeYaAPI.Models.DTOs.ItemDTOs;
using ComeYaAPI.Models.DTOs.RestaurantDTOs;
using ComeYaAPI.Models.DTOs.UserDTOs;

namespace ComeYaAPI.Mapper
{
    public class Mapper: Profile
    {
        public Mapper() {

            CreateMap<LoginUserDTO, User>();
            CreateMap<CreateUserDTO, User>();
            CreateMap<User, ReadUserDTO>();
            CreateMap<CreateItemDTO,Item>();
            CreateMap<CreateRestaurantDTO, Restaurant>();

            CreateMap< AddCartItemDTO, UpdateQtyDTO>();
            CreateMap<AddCartItemDTO, Cart>();

            CreateMap<Restaurant, ReadRestaurantDTO>();


        }
    }
}
