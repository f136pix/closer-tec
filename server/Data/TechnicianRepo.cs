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

    public async Task<IEnumerable<Technician>> GetTechniciansByQuery(TechnicianQueryDto technicianQueryDto)
    {
        var query = _context.Technicians.AsQueryable();

        if (technicianQueryDto.Role != null && technicianQueryDto.Role.Length > 0)
        {
            query = query.Where(t => technicianQueryDto.Role.Contains(t.Role));
        }

        if (!string.IsNullOrEmpty(technicianQueryDto.Name))
        {
            query = query.Where(t => EF.Functions.Like(t.FirstName.ToLower() + " " + t.LastName.ToLower(),
                $"%{technicianQueryDto.Name}%".ToLower()));

            //     query = query.Where(t =>
            //         EF.Functions.Like(
            //             EF.Functions.Collate(t.FirstName + " " + t.LastName, "SQL_Latin1_General_CP1_CI_AI"),
            //             EF.Functions.Collate($"%{technicianQueryDto.Name}%", "SQL_Latin1_General_CP1_CI_AI")));
        }

        if (!string.IsNullOrEmpty(technicianQueryDto.City))
        {
            query = query.Where(t => EF.Functions.Like(t.City.ToLower(), $"%{technicianQueryDto.City}%".ToLower()));
        }

        return await query.ToListAsync();
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
            Address = technicianCreateDto.Address,
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