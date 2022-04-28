using Application.Commands;
using Application.Products.Queries;
using Domain.Products.Repositories;
using Infrastructure.EntityFramework.Commands;
using Infrastructure.EntityFramework.Queries;
using Infrastructure.EntityFramework.Repositories;
using Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.EntityFramework.Extensions;

internal static class ServiceCollectionExtensions
{
    public static void ConfigureEntityFramework(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("Postgres");

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new InfrastructureException("No connection string provided for Postgres");
        }

        services.AddDbContext<KeirsenDbContext>(options => options.UseNpgsql(connectionString));
        services.AddTransient<IUnitOfWork, EfUnitOfWork>();
        services.AddTransient<IProductRepository, EfProductRepository>();
        services.AddTransient<IProductQueries, EfProductQueries>();
        
        services.AddHostedService<KeirsenDbService>();
    }
}