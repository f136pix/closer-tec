using server.Data;
using server.Dtos;
using server.Models;

namespace server.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepo _userRepo;
        private readonly ITokenService _tokenService;

        public UserService(IUserRepo userRepo, ITokenService tokenService)
        {
            _userRepo = userRepo;
            _tokenService = tokenService;
        }

        public async Task<(bool, string)> RegisterUser(UserCreateDto userCreateDto)
        {
            var existingUser = (await _userRepo.GetAllUsers())
                .FirstOrDefault(u => u.Username == userCreateDto.Username || u.Email == userCreateDto.Email);

            if (existingUser != null)
            {
                return (false, "already_exists");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userCreateDto.Password);
            userCreateDto.Password = hashedPassword;

            await _userRepo.CreateUser(userCreateDto);
            return (await _userRepo.SaveChanges(), "internal_error");
        }

        public async Task<(bool, string)> LoginUser(UserLoginDto userLoginDto)
        {
            var user = (await _userRepo.GetAllUsers()).FirstOrDefault(u => u.Username == userLoginDto.Username);
            if (user == null)
            {
                return (false, "invalid_cred");
            }

            if (!BCrypt.Net.BCrypt.Verify(userLoginDto.Password, user.PasswordHash))
            {
                return (false, "invalid_cred");
            }

            return (true, _tokenService.GenerateToken(user));
        }

        public async Task<(bool, string)> UpdateUser(int id, UserUpdateDto userUpdateDto)
        {
            var userToUpdate = await _userRepo.GetUserById(id);
            if (userToUpdate == null)
            {
                return (false, "user_not_found");
            }

            var result = await _userRepo.UpdateUser(id, userUpdateDto);

            return (result, "internal_error");
        }
        
        public async Task<(bool, string)> DeleteUser(int Id)
        {
            var user = await _userRepo.GetUserById(Id);
            if (user == null)
            {
                return (false, "user_not_found");
            }

            var result = await _userRepo.DeleteUser(Id);

            return (result, "internal_error");
        }
    }
}