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
        var exististsTechnician = (await technicianRepo.GetAllTechnicians())
            .FirstOrDefault(t => t.Email == technicianCreateDto.Email);

        if (exististsTechnician != null)
        {
            throw new GraphQLException(ErrorBuilder.New()
                .SetCode("404")
                .SetMessage("Technician with this email already exists").Build());
        }

        await technicianRepo.CreateTechnician(technicianCreateDto);
        var result = await technicianRepo.SaveChanges();
        return result switch
        {
            true => technicianCreateDto,
            _ => throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("There was an error creating the technician")
                .Build())
        };
    }

    public async Task<bool> DeleteTechnician(int id, [Service] ITechnicianRepo technicianRepo)
    {
        var technician = await technicianRepo.GetTechnicianById(id);
        if (technician == null)
        {
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("There is no technician with this Id").Build());
        }

        await technicianRepo.DeleteTechnician(id);
        var result = await technicianRepo.SaveChanges();
        if (!result)
        {
            throw new GraphQLException(ErrorBuilder.New()
                .SetMessage("There was an error deleting the technician").Build());
        }
        return result;
    }
}