using Application.Accounts.Commands;
using Infrastructure.Identity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Commands;

internal sealed class LogoutHandler : IRequestHandler<Logout.Command>
{
    private readonly SignInManager<ApplicationUser> _signInManager;

    public LogoutHandler(SignInManager<ApplicationUser> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<Unit> Handle(Logout.Command request, CancellationToken cancellationToken)
    {
        await _signInManager.SignOutAsync();

        return Unit.Value;
    }
}