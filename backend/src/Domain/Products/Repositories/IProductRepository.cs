using Domain.Products.Entities;
using Domain.Products.States;
using Domain.Repositories;

namespace Domain.Products.Repositories;

public interface IProductRepository : IRepository<Product, ProductState>
{
}