using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using server.Data;
using server.Dtos;
using server.Services;

namespace server.Controllers;

[Route("api/Auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    private readonly ITechnicianRepo _technicianRepo;

    public AuthController(ITokenService tokenService, IConfiguration configuration, IUserService userService,
        ITechnicianRepo technicianRepo)
    {
        _tokenService = tokenService;
        _configuration = configuration;
        _userService = userService;
        _technicianRepo = technicianRepo;
    }

    // POST /api/Auth/register
    [HttpPost("register")]
    public async Task<ActionResult> Register(UserCreateDto userCreateDto)
    {
        Console.Out.WriteLine($"--> Registering User {userCreateDto.Username}");
        // duplet being returned
        var (result, message) = await _userService.RegisterUser(userCreateDto);

        return result switch
        {
            true => Created("", userCreateDto),
            false => message switch
            {
                "already_exists" => Conflict("User with this credentials already exists"),
                "internal_error" => StatusCode(500, "There was a error creating the user"),
                _ => BadRequest(message)
            }
        };
    }


    // POST /api/Auth/login
    [HttpPost("login")]
    public async Task<ActionResult> Login(UserLoginDto userLoginDto)
    {
        Console.Out.WriteLine($"--> Logging in User {userLoginDto.Username}");
        var (result, message) = await _userService.LoginUser(userLoginDto);

        return result switch
        {
            true => Ok(message),
            false => message switch
            {
                "invalid_cred" => Unauthorized("Invalid credentials"),
                _ => BadRequest("There was a Internal Error")
            }
        };
    }
    
    // POST /api/Auth/validate
    [HttpPost("validate")]
    public async Task<ActionResult> Validate(string token)
    {
        Console.Out.WriteLine($"--> Recieved Jwt {token}");
        var result = _tokenService.ValidateToken(token);

        return result switch
        {
            true => Ok("Token is valid"),
            false => Unauthorized("Token is invalid") 
        };
    }
}