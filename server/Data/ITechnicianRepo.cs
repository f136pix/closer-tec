using System.Collections.Generic;
using System.Threading.Tasks;
using server.Dtos;
using server.Models;

namespace server.Data
{
    public interface ITechnicianRepo
    {
        Task<bool> SaveChanges();
        Task<IEnumerable<Technician>> GetAllTechnicians();
        Task<Technician> GetTechnicianById(int id);
        Task CreateTechnician(TechnicianCreateDto technicianCreateDto);
        Task<bool> UpdateTechnician(int id, Technician technician);
        Task<bool> DeleteTechnician(int id);
    }
}