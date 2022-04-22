using MediatR;

namespace Application.Accounts.Commands;

public class Register
{
    public sealed class Command : IRequest<Result>
    {
        public Command(string username, string password)
        {
            Username = username;
            Password = password;
        }

        public string Username { get; }
        public string Password { get; }
    }

    public sealed class Result
    {
        public Result(bool success, IEnumerable<string> errors)
        {
            Success = success;
            Errors = errors;
        }

        public bool Success { get; }
        public IEnumerable<string> Errors { get; }
    }
}