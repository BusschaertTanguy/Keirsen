namespace Domain.Exceptions;

public sealed class DomainException : Exception
{
    public DomainException(string key, string message) : base(message)
    {
        Key = key;
    }

    public string Key { get; }
}