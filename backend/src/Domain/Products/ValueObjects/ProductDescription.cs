using Domain.Exceptions;

namespace Domain.Products.ValueObjects;

public sealed record ProductDescription
{
    public const string EmptyMessage = "Product description can't be empty.";
    public const int MaxLength = 250;
    public const string MaxLengthMessage = "Product description can't exceed 250 characters";

    public ProductDescription(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new DomainException(EmptyMessage);
        }

        if (value.Length > MaxLength)
        {
            throw new DomainException(MaxLengthMessage);
        }

        Value = value;
    }

    public string Value { get; }
}