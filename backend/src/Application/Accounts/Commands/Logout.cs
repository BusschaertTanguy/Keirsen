using MediatR;

namespace Application.Accounts.Commands;

public static class Logout
{
    public sealed class Command : IRequest
    {
    }
}