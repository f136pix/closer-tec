using server.Models;

namespace server.Dtos;

public class UserUpdateDto

{
    public string Username { get; set; }
    public string Email { get; set; }
    public Role Role { get; set; }
}