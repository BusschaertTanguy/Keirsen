using Domain.Exceptions;
using Domain.States;

namespace Domain.Products.States;

public sealed class ProductState : BaseState
{
    private string? _name;
    private string? _description;

    public string Name
    {
        get => _name ?? throw new PropertyNullException(nameof(Name));
        set => _name = value;
    }

    public string Description
    {
        get => _description ?? throw new PropertyNullException(nameof(Description));
        set => _description = value;
    }
}