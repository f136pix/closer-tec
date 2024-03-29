using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices.JavaScript;
using Microsoft.EntityFrameworkCore;

namespace server.Models

{
    public enum Role
    {
        User,
        Admin
    }
    
    [Index(nameof(Username), IsUnique = true)]
    [Index(nameof(Email), IsUnique = true)]
    public class User
    {
        [Key] public int Id { get; set; }
        [Required] public string Username { get; set; }
        [Required] public string Email { get; set; }
        [Required] public string PasswordHash { get; set; }
        [Required] public Role Role { get; set; }   
    }
}