using server.Data;
using server.Dtos;
using server.Services;

namespace server.GraphQL;

public class Mutation
{
    // updateUser(id: Int!, user: UserUpdateDto!) : UserUpdateDto
    public async Task<UserUpdateDto> UpdateUser(int id, UserUpdateDto userUpdateDto, [Service] IUserService userService)
    {
        var (result, message) = await userService.UpdateUser(id, userUpdateDto);

        return result switch
        {
            true => userUpdateDto,
            _ => message switch
            {
                "user_not_found" => throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage("There is no user with this Id").Build()),
                _ => throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage("There was an error updating the user").Build())
            }
        };
    }

    // deleteUser(id: Int!) : Boolean
    public async Task<bool> DeleteUser(int id, [Service] IUserService userService)
    {
        var (result, message) = await userService.DeleteUser(id);

        return result switch
        {
            true => true,
            _ => message switch
            {
                "user_not_found" => throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage("There is no user with this Id").Build()),
                _ => throw new GraphQLException(ErrorBuilder.New()
                    .SetMessage("There was an error deleting the user").Build())
            }
        };
    }


    // i dint created service class for technician, so i will use repo directly

    // createTechnician(technician: TechnicianCreateDto!) : TechnicianCreateDto
    public async Task<TechnicianCreateDto> CreateTechnician(TechnicianCreateDto technicianCreateDto,
        [Service] ITechnicianRepo technicianRepo)
    {
        var existingTechnician = (await technicianRepo.GetAllTechnicians())
            .FirstOrDefault(t => t.Email == technicianCreateDto.Email);
        
        if (existingTechnician != null)
        {
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("Technician with this email already exists").Build());
        }
        
        await technicianRepo.CreateTechnician(technicianCreateDto);
        var result = await technicianRepo.SaveChanges();
        return result switch
        {
            true => technicianCreateDto,
            _ => throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("There was an error creating the technician").Build())
        };
    }
}