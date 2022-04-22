using Application.Accounts.Commands;
using Infrastructure.Identity.Models;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity.Commands;

internal sealed class RegisterHandler : IRequestHandler<Register.Command, Register.Result>
{
    private readonly IUserStore<ApplicationUser> _userStore;
    private readonly UserManager<ApplicationUser> _userManager;

    public RegisterHandler(IUserStore<ApplicationUser> userStore, UserManager<ApplicationUser> userManager)
    {
        _userStore = userStore;
        _userManager = userManager;
    }

    public async Task<Register.Result> Handle(Register.Command request, CancellationToken cancellationToken)
    {
        var user = new ApplicationUser();

        await _userStore.SetUserNameAsync(user, request.Username, cancellationToken);
        var result = await _userManager.CreateAsync(user, request.Password);

        return new Register.Result(result.Succeeded, result.Errors.Select(error => error.Description));
    }
}