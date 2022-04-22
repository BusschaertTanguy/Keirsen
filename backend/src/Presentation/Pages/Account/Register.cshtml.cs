using System.ComponentModel.DataAnnotations;
using Application.Accounts.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Presentation.Pages.Account;

public class RegisterModel : PageModel
{
    private readonly IMediator _mediator;

    public RegisterModel(IMediator mediator)
    {
        _mediator = mediator;
    }

    [BindProperty]
    public InputModel Input { get; set; } = new();
    
    public string? ReturnUrl { get; set; }

    public IActionResult OnGet(string? returnUrl = null)
    {
        ReturnUrl = returnUrl;
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

        var registerCommand = new Register.Command(Input.Username, Input.Password);
        var registerResult = await _mediator.Send(registerCommand);

        if (!registerResult.Success)
        {
            foreach (var error in registerResult.Errors)
            {
                ModelState.AddModelError(string.Empty, error);
            }

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