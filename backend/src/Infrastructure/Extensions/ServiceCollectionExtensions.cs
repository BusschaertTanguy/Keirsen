using Infrastructure.EntityFramework.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Extensions;

public static class ServiceCollectionExtensions
{
    public static void ConfigureInfrastructureLayer(this IServiceCollection services, IConfiguration configuration)
    {
        services.ConfigureEntityFramework(configuration);
    }
}