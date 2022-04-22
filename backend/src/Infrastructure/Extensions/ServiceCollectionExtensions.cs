using System.Reflection;
using Infrastructure.EntityFramework.Extensions;
using Infrastructure.Identity.Extensions;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void ConfigureInfrastructureLayer(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddMediatR(Assembly.GetExecutingAssembly());
        services.ConfigureEntityFramework(configuration);
        services.ConfigureIdentity();
    }
}