using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Infrastructure.EntityFramework;

internal sealed class KeirsenDbService : BackgroundService
{
    private readonly IServiceProvider _provider;

    public KeirsenDbService(IServiceProvider provider)
    {
        _provider = provider;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await using var scope = _provider.CreateAsyncScope();

        var context = scope.ServiceProvider.GetRequiredService<KeirsenDbContext>();
        await context.Database.MigrateAsync(stoppingToken);
    }
}