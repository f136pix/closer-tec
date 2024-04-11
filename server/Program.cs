using server.Data;
using server.GraphQL;
using server.Services;

var builder = WebApplication.CreateBuilder(args);

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
    policy.WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();
var configuration = app.Services.GetRequiredService<IConfiguration>();
//var allowedHosts = configuration.GetValue<string>("AllowedHosts");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    Console.WriteLine("--> Dev mode <--");
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("myAppCors");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGraphQL();

app.Run();