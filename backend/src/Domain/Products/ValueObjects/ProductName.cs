using Domain.Exceptions;

namespace Domain.Products.ValueObjects;

public sealed record ProductName
{
    public const string EmptyMessage = "Product name can't be empty.";
    public const int MaxLength = 50;
    public const string MaxLengthMessage = "Product name can't exceed 50 characters";

    public ProductName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new DomainException(nameof(ProductName), EmptyMessage);
        }

        if (value.Length > MaxLength)
        {
            throw new DomainException(nameof(ProductName), MaxLengthMessage);
        }

        Value = value;
    }

    public string Value { get; }
}