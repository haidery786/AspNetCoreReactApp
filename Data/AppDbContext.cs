using Microsoft.EntityFrameworkCore;

namespace AspNetCoreReactSpa.Models
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Pie> Pies { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<City> Cities { get; set; }

  }
}