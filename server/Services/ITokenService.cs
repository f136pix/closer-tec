using server.Dtos;
using server.Models;

namespace server.Services;

public interface ITokenService
{
    public string GenerateToken(User user);
    public bool ValidateToken(string token);
}