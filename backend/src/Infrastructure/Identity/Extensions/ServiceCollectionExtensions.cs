using Infrastructure.EntityFramework;
using Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Identity.Extensions;

internal static class ServiceCollectionExtensions
{
    public static void ConfigureIdentity(this IServiceCollection services)
    {
        services.AddDefaultIdentity<ApplicationUser>()
            .AddEntityFrameworkStores<KeirsenDbContext>();

        services.AddIdentityServer(options =>
            {
                options.UserInteraction.LoginUrl = "/Account/Login";
                options.UserInteraction.LogoutUrl = "/Account/Logout";
            })
            .AddApiAuthorization<ApplicationUser, KeirsenDbContext>();

        services.AddAuthentication()
            .AddIdentityServerJwt();
    }
}