using System.Reflection;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityFramework;

internal sealed class KeirsenDbContext : DbContext
{
    public KeirsenDbContext(DbContextOptions options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}