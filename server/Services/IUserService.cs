using server.Dtos;
using server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace server.Services
{
    public interface IUserService
    {
        Task<(bool, string)> RegisterUser(UserCreateDto userCreateDto);
        Task<(bool, string)> LoginUser(UserLoginDto userLoginDto);
        Task<(bool, string)> UpdateUser(int id, UserUpdateDto userUpdateDto);
        Task<(bool, string)> DeleteUser(int id);
    }
}