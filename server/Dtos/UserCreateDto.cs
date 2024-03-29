using System.ComponentModel.DataAnnotations;

namespace server.Dtos
{
    public class UserCreateDto
    {
        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string Password { get; set; }
    }
}