namespace Domain.Exceptions;

public sealed class PropertyNullException : Exception
{
    public PropertyNullException(string propertyName) : base($"Property {propertyName} is not nullable")
    {
    }
}