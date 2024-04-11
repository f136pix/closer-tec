using server.Models;

namespace server.Dtos;

public class TechnicianQueryDto
{
    public string? Name { get; set; }
    public string? City { get; set; }
    public TechnicianRole[]? Role { get; set; }
}