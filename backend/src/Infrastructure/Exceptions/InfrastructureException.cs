namespace Infrastructure.Exceptions;

public sealed class InfrastructureException : Exception
{
    public InfrastructureException(string message) : base(message)
    {
    }
}