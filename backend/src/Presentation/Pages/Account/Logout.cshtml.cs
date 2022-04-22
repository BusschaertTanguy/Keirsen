using Application.Accounts.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Presentation.Pages.Account;

public class LogoutModel : PageModel
{
    private readonly IMediator _mediator;

    public LogoutModel(IMediator mediator)
    {
        _mediator = mediator;
    }

    public async Task<IActionResult> OnPostAsync(string? returnUrl = null)
    {
        var logoutCommand = new Logout.Command();
        await _mediator.Send(logoutCommand);

        return string.IsNullOrWhiteSpace(returnUrl) ? RedirectToPage() : LocalRedirect(returnUrl);
    }
}