using System.ComponentModel.DataAnnotations;
using Application.Accounts.Commands;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Presentation.Pages.Account;

public class LoginModel : PageModel
{
    private readonly IMediator _mediator;

    public LoginModel(IMediator mediator)
    {
        _mediator = mediator;
    }

    [BindProperty]
    public InputModel Input { get; set; } = new();

    public string? ReturnUrl { get; set; }

    public async Task<IActionResult> OnGet(string? returnUrl = null)
    {
        ReturnUrl = returnUrl;
        await HttpContext.SignOutAsync(IdentityConstants.ExternalScheme);

        return Page();
    }

    public async Task<IActionResult> OnPostAsync(string? returnUrl = null)
    {
        returnUrl ??= Url.Content("~/");

        if (!ModelState.IsValid)
        {
            return Page();
        }

        if (string.IsNullOrWhiteSpace(Input.Username) || string.IsNullOrWhiteSpace(Input.Password))
        {
            return Page();
        }

        var loginCommand = new Login.Command(Input.Username, Input.Password);
        var loginResult = await _mediator.Send(loginCommand);

        if (loginResult.Success)
        {
            return LocalRedirect(returnUrl);
        }

        return Page();
    }

    public class InputModel
    {
        [Required]
        public string? Username { get; set; }

        [Required]
        public string? Password { get; set; }
    }
}