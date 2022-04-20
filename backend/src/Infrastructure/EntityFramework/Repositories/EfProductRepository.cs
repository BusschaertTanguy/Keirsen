using Domain.Products.Entities;
using Domain.Products.Repositories;
using Domain.Products.States;

namespace Infrastructure.EntityFramework.Repositories;

internal sealed class EfProductRepository : EfRepository<Product, ProductState>, IProductRepository
{
    public EfProductRepository(KeirsenDbContext context) : base(context)
    {
    }

    private protected override Product ToEntity(ProductState state)
    {
        return new Product(state);
    }
}