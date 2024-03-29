using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    public enum TechnicianRole
    {
        Undefined,
        Eletricician,
        Mechanic,
        Plumber
    }

    [Index(nameof(Email), IsUnique = true)]
    public class Technician
    {
        [Key] public int Id { get; set; }
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string Email { get; set; } = String.Empty;
        [Required] public string City { get; set; }
        [Required] public double CityCordinates { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public TechnicianRole Role { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}