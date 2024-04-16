using Microsoft.AspNetCore;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.GraphQL;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// add our DataContext
//builder.Services.AddSingleton<DataContext>();
builder.Services.AddDbContext<DataContext>();
// services
builder.Services.AddScoped<IUserRepo, UserRepo>();
builder.Services.AddScoped<ITechnicianRepo, TechnicianRepo>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IUserService, UserService>();
// graphql
builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();
// cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("myAppCors", policy =>
    {
        // allow one origin
        policy.WithOrigins(configuration["AppSettings:AllowedHosts"]!)
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
    
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("myAppProdCors", policy =>
    {
        // allow one origin
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
    
});

var app = builder.Build();
//var configuration = app.Services.GetRequiredService<IConfiguration>();
var serviceScopeFactory = app.Services.GetRequiredService<IServiceScopeFactory>();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    Console.WriteLine("--> Dev mode <--");
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("myAppCors");
    Console.WriteLine("--> Allowed Origins -> " + configuration["AppSettings:AllowedHosts"]);
}

if (app.Environment.IsProduction())
{
    Console.WriteLine("--> Prod mode <--");
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("myAppProdCors");

    using (var scope = serviceScopeFactory.CreateScope())
    {
        // Get the DataContext
        var context = scope.ServiceProvider.GetRequiredService<DataContext>();
        
        // Check if any migrations have been applied (i.e., tables have been created)
        var appliedMigrations = context.Database.GetAppliedMigrations().ToList();

        Console.Write("--> Applied migrations : ", appliedMigrations ,"\n");
        
        if (!appliedMigrations.Any())
        {
            
            Console.WriteLine("--> Applying migrations");
            // If no migrations have been applied, apply the migrations
            context.Database.Migrate();
            Console.WriteLine("--> Migrations applied");
        }
    }
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGraphQL();

app.Run();