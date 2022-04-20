using Application.Products.DTO;
using Application.Products.Queries;
using Domain.Products.States;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.EntityFramework.Queries;

internal sealed class EfProductQueries : IProductQueries
{
    private readonly KeirsenDbContext _context;

    public EfProductQueries(KeirsenDbContext context)
    {
        _context = context;
    }

    public Task<List<ProductListDTO>> GetAll(int pageIndex, int pageSize)
    {
        return _context.Set<ProductState>()
            .AsNoTracking()
            .Skip(pageIndex * pageSize)
            .Take(pageSize)
            .Select(product => new ProductListDTO(product.Id, product.Name))
            .ToListAsync();
    }

    public Task<ProductDetailDTO?> GetById(Guid id)
    {
        return _context.Set<ProductState>()
            .AsNoTracking()
            .Where(product => product.Id == id)
            .Select(product => new ProductDetailDTO(product.Id, product.Name, product.Description))
            .FirstOrDefaultAsync();
    }
}