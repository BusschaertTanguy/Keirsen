namespace Application.Products.DTO;

public sealed record ProductListDTO(Guid Id, string Name);

public sealed record ProductDetailDTO(Guid Id, string Name, string Description);