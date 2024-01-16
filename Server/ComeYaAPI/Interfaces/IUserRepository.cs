using ComeYa.Interfaces;
using ComeYaAPI.Context;
using ComeYaAPI.Models.DTOs.UserDTOs;
using ComeYaAPI.Models.ResultsMessages;

namespace ComeYaAPI.Interfaces
{
    public interface IUserRepository: IRepository<User>
    {
        Task<EntityResult<User>> AddUser(CreateUserDTO userDTO);
        Task<EntityResult<User>> Login(LoginUserDTO userDTO);
        Task<EntityListResult<ReadUserDTO>> GetAllUsers(string? genre, int page);
        Task<EntityResult<User>> ActivateUser(string code);
        Task UpdateUser(int id, UpdateUserDTO userDTO);
        Task<int> GetIdUser(string email);
        void UpdateBalance(int id, decimal amount);
        Task<decimal> GetBalance(int id);
        Task<EntityResult<ReadUserDTO>> GetUserById(int id);

    }
}
