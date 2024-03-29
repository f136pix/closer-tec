using server.Models;

namespace server.Dtos
{
    public class TechnicianCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public double CityCords { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public TechnicianRole? Role { get; set; }
    }
}