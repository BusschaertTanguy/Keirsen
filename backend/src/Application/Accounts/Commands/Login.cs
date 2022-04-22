using MediatR;

namespace Application.Accounts.Commands;

public static class Login
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
        public Result(bool success)
        {
            Success = success;
        }

        public bool Success { get; }
    }
}