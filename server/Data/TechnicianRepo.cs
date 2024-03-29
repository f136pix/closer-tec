using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Dtos;
using server.Models;

namespace server.Data;

public class TechnicianRepo : ITechnicianRepo
{
    private readonly DataContext _context;

    public TechnicianRepo(DataContext context)
    {
        _context = context;
    }

    public async Task<bool> SaveChanges()
    {
        return await _context.SaveChangesAsync() >= 0;
    }

    public async Task<IEnumerable<Technician>> GetAllTechnicians()
    {
        return await _context.Technicians.ToListAsync();
    }

    public async Task<Technician> GetTechnicianById(int id)
    {
        return await _context.Technicians.FirstOrDefaultAsync(technician => technician.Id == id);
    }

    public async Task CreateTechnician(TechnicianCreateDto technicianCreateDto)
    {
        var technician = new Technician
        {
            FirstName = technicianCreateDto.FirstName,
            LastName = technicianCreateDto.LastName,
            Email = technicianCreateDto.Email,
            City = technicianCreateDto.City,
            CityCordinates = technicianCreateDto.CityCords,
            Latitude = technicianCreateDto.Latitude,
            Longitude = technicianCreateDto.Longitude,
            Role = technicianCreateDto.Role ?? TechnicianRole.Undefined
        };
        
        var res = await _context.Technicians.AddAsync(technician);
        Console.Out.WriteLine("Result Add Async: " + res);
    }

    public async Task<bool> UpdateTechnician(int id, Technician technicianToUpdate)
    {
        var technician = await _context.Technicians.FirstOrDefaultAsync(t => t.Id == id);
        if (technician != null)
        {
            technician.FirstName = technicianToUpdate.FirstName;
            technician.LastName = technicianToUpdate.LastName;
            technician.Email = technicianToUpdate.Email;
            technician.City = technicianToUpdate.City;
            technician.Latitude = technicianToUpdate.Latitude;
            technician.Longitude = technicianToUpdate.Longitude;
            technician.Role = technicianToUpdate.Role;
            return await _context.SaveChangesAsync() >= 0;
        }

        return false;
    }

    public async Task<bool> DeleteTechnician(int id)
    {
        var technician = await _context.Technicians.FirstOrDefaultAsync(t => t.Id == id);
        if (technician != null)
        {
            _context.Technicians.Remove(technician);
            return await _context.SaveChangesAsync() >= 0;
        }

        return false;
    }
}