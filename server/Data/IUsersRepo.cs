using System.Collections.Generic;
using System.Threading.Tasks;
using server.Dtos;
using server.Models;

namespace server.Data
{
    public interface IUserRepo
    {
        Task<bool> SaveChanges();
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task CreateUser(UserCreateDto userCreateDto);
        Task<bool> UpdateUser(int id, UserUpdateDto user);
        Task<bool> DeleteUser(int Id);


    }
}