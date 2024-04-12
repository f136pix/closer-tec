using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Dtos;
using server.Models;

namespace server.Data;

public class UserRepo : IUserRepo
{
    private readonly DataContext _context;

    public UserRepo(DataContext context)
    {
        _context = context;
    }

    public async Task<bool> SaveChanges()
    {
        return await _context.SaveChangesAsync() >= 0;
    }

    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task CreateUser(UserCreateDto userCreateDto)
    {
        var user = new User
        {
            Username = userCreateDto.Username,
            Email = userCreateDto.Email,
            PasswordHash = userCreateDto.Password
        };
        await _context.Users.AddAsync(user);
    }

    public async Task<User> GetUserById(int id) =>
        await _context.Users.FirstOrDefaultAsync(user => user.Id == id);

    public async Task<bool> UpdateUser(int id, UserUpdateDto user)
    {
        var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (userToUpdate != null)
        {
            userToUpdate.Username = user.Username;
            userToUpdate.Email = user.Email;
            return await _context.SaveChangesAsync() >= 0;
        }

        return false;
    }

    public async Task<bool> DeleteUser(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
        if (user != null)
        {
            _context.Users.Remove(user);
            return await _context.SaveChangesAsync() >= 0;
        }

        return false;
    }
}