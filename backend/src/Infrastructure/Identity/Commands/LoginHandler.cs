using Application.Accounts.Commands;
using Infrastructure.Identity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Commands;

internal sealed class LoginHandler : IRequestHandler<Login.Command, Login.Result>
{
    private readonly SignInManager<ApplicationUser> _signInManager;

    public LoginHandler(SignInManager<ApplicationUser> signInManager)
    {
        _signInManager = signInManager;
    }

    public async Task<Login.Result> Handle(Login.Command request, CancellationToken cancellationToken)
    {
        var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, isPersistent: false, lockoutOnFailure: false);

        return new Login.Result(result.Succeeded);
    }
}