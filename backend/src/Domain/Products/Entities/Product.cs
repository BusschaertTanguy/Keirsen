using Domain.Entities;
using Domain.Products.States;
using Domain.Products.ValueObjects;

namespace Domain.Products.Entities;

public sealed class Product : RootEntity<ProductState>
{
    internal Product(ProductState state) : base(state)
    {
    }

    public Product(ProductName name, ProductDescription description) : base(Guid.NewGuid())
    {
        State.Name = name.Value;
        State.Description = description.Value;
    }

    public void ChangeInformation(ProductName name, ProductDescription description)
    {
        State.Name = name.Value;
        State.Description = description.Value;
    }
}