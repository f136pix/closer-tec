using System.Threading.Tasks;
using server.Data;
using server.Models;
using server.Services;

public class Query
{
    // users : [User]
    public async Task<IEnumerable<User>> GetUsers([Service] IUserRepo userRepo)
    {
        return await userRepo.GetAllUsers();
    }

    // user(id: Int!) : User
    public async Task<User> GetUserById(int id, [Service] IUserRepo userRepo)
    {
        return await userRepo.GetUserById(id);
    }
    
    public async Task<IEnumerable<Technician>> GetTechnicians([Service] ITechnicianRepo technicianRepo)
    {
        return await technicianRepo.GetAllTechnicians();
    }
}