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
            throw new DomainException(nameof(ProductDescription), EmptyMessage);
        }

        if (value.Length > MaxLength)
        {
            throw new DomainException(nameof(ProductDescription), MaxLengthMessage);
        }

        Value = value;
    }

    public string Value { get; }
}