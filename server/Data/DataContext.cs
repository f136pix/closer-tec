using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    // called when app is started
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(Configuration.GetConnectionString("ServerDatabase"));
    }
    
    // called when a model is created
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // set default value for Role
        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasDefaultValue(Role.User);

        modelBuilder.Entity<Technician>()
            .Property(t => t.Role)
            .HasDefaultValue(TechnicianRole.Undefined);
    }

    public DbSet<Technician> Technicians { get; set; }
    public DbSet<User> Users { get; set; }
}